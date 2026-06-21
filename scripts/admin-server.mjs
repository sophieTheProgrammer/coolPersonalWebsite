import { createServer } from "node:http";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { randomUUID } from "node:crypto";

const root = new URL("../", import.meta.url);
const artDir = new URL("public/art/", root);
const artDataFile = new URL("src/data/artworks.ts", root);
const skillToyDataFile = new URL("src/data/skillToys.ts", root);
const port = Number(process.env.ADMIN_PORT ?? 8787);
const host = process.env.ADMIN_HOST ?? "127.0.0.1";

const send = (response, status, body) => {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(body));
};

const readBody = (request) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);

const getYouTubeId = (value) => {
  try {
    const parsed = new URL(value);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? "";
    }
    if (parsed.pathname.startsWith("/shorts/")) {
      return parsed.pathname.split("/").filter(Boolean)[1] ?? "";
    }
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/").filter(Boolean)[1] ?? "";
    }
    return parsed.searchParams.get("v") ?? "";
  } catch {
    return value.trim();
  }
};

const decodeHtml = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const getMetaContent = (html, pattern) => {
  const match = html.match(pattern);
  return match?.[1] ? decodeHtml(match[1].trim()) : "";
};

const getYouTubeMetadata = async (value) => {
  const youtubeId = getYouTubeId(String(value ?? ""));

  if (!youtubeId) {
    throw new Error("YouTube URL or ID is required.");
  }

  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  let title = "";
  let description = "";

  try {
    const oembed = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`);
    if (oembed.ok) {
      const data = await oembed.json();
      title = String(data.title ?? "");
    }
  } catch {
    // Fall back to the watch page scrape below.
  }

  try {
    const page = await fetch(watchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 local-admin-helper",
      },
    });
    if (page.ok) {
      const html = await page.text();
      title ||= getMetaContent(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i);
      description =
        getMetaContent(html, /<meta\s+name="description"\s+content="([^"]*)"/i) ||
        getMetaContent(html, /<meta\s+property="og:description"\s+content="([^"]*)"/i);
    }
  } catch {
    // Some networks block YouTube HTML. Returning the video ID is still useful.
  }

  return {
    youtubeId,
    title: title || "YouTube title",
    description,
    url: watchUrl,
  };
};

const parseMultipart = (body, contentType) => {
  const boundary = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/)?.[1] ?? contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/)?.[2];
  if (!boundary) throw new Error("Missing multipart boundary.");

  const parts = body.toString("latin1").split(`--${boundary}`);
  const fields = {};
  const files = {};

  for (const part of parts) {
    if (!part.includes("Content-Disposition")) continue;

    const [rawHeaders, rawValue = ""] = part.split("\r\n\r\n");
    const name = rawHeaders.match(/name="([^"]+)"/)?.[1];
    const filename = rawHeaders.match(/filename="([^"]*)"/)?.[1];
    if (!name) continue;

    const value = rawValue.replace(/\r\n--$/, "").replace(/\r\n$/, "");
    if (filename) {
      const upload = {
        filename,
        data: Buffer.from(value, "latin1"),
        type: rawHeaders.match(/Content-Type:\s*([^\r\n]+)/i)?.[1] ?? "application/octet-stream",
      };
      files[name] = files[name]
        ? [...(Array.isArray(files[name]) ? files[name] : [files[name]]), upload]
        : upload;
    } else {
      fields[name] = value;
    }
  }

  return { fields, files };
};

const saveUpload = async (file) => {
  const original = file.filename || "upload";
  const extension = extname(original).toLowerCase();
  const allowed = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".pdf"]);

  if (!allowed.has(extension)) {
    throw new Error("Only image and PDF uploads are supported.");
  }

  await mkdir(artDir, { recursive: true });

  const baseName = slugify(original.replace(/\.[^.]+$/, "")) || "art-upload";
  const filename = `${baseName}-${randomUUID().slice(0, 8)}${extension}`;
  await writeFile(join(artDir.pathname, filename), file.data);

  return {
    filename,
    src: `/art/${filename}`,
    kind: extension === ".pdf" ? "pdf" : "image",
  };
};

const writeArtworkEntries = async (packetSlug, entries) => {
  const source = await readFile(artDataFile, "utf8");
  const volumePattern = new RegExp(`(slug: "${packetSlug}",[\\s\\S]*?drawingSlugs: \\[)([\\s\\S]*?)(\\])`);

  if (!volumePattern.test(source)) {
    throw new Error(`Packet not found: ${packetSlug}`);
  }

  const usedSlugs = new Set([...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
  const slugs = [];
  const objects = entries.map((entry) => {
    const title = String(entry.title ?? "").trim();
    const imageSrc = String(entry.imageSrc ?? "").trim();
    const processSrcs = (Array.isArray(entry.processSrcs) ? entry.processSrcs : [entry.processSrc])
      .map((src) => String(src ?? "").trim())
      .filter((src) => src.startsWith("/art/"));
    const featured = Boolean(entry.featured);
    const medium = String(entry.medium ?? "Uploaded scan").trim();
    const note = String(entry.note ?? "").trim();

    if (!title || !imageSrc.startsWith("/art/")) {
      throw new Error("Title and uploaded art file are required.");
    }

    const baseSlug = slugify(title) || "uploaded-drawing";
    let slug = baseSlug;
    let counter = 2;

    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    usedSlugs.add(slug);
    slugs.push(slug);

    return `  {
    title: ${JSON.stringify(title)},
    slug: ${JSON.stringify(slug)},
    year: ${JSON.stringify(String(new Date().getFullYear()))},
    medium: ${JSON.stringify(medium)},
    mood: "study",
    status: "study",
    note: ${JSON.stringify(note || "Uploaded from the local admin helper.")},
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: ${JSON.stringify(imageSrc)},${featured ? "\n    featured: true," : ""}${processSrcs.length ? `\n    processSrcs: ${JSON.stringify(processSrcs)},` : ""}
  },`;
  });

  let next = source.replace(
    /export const artworks: Artwork\[] = \[\n/,
    (match) => `${match}${objects.join("\n")}\n`,
  );

  next = next.replace(volumePattern, (_match, before, drawings, after) => {
    const trimmed = drawings.trim();
    const prefix = trimmed ? `${drawings.trimEnd()},\n      ` : "\n      ";
    return `${before}${prefix}${slugs.map((slug) => JSON.stringify(slug)).join(",\n      ")},\n    ${after}`;
  });

  await writeFile(artDataFile, next);
  return { slugs };
};

const createArtVolume = async ({ title, subtitle, note }) => {
  const packetTitle = String(title ?? "").trim();

  if (!packetTitle) {
    throw new Error("New packet title is required.");
  }

  const source = await readFile(artDataFile, "utf8");
  const usedSlugs = new Set([...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
  const baseSlug = slugify(packetTitle) || "drawing-packet";
  let slug = baseSlug;
  let counter = 2;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  const packet = `  {
    title: ${JSON.stringify(packetTitle)},
    slug: ${JSON.stringify(slug)},
    subtitle: ${JSON.stringify(String(subtitle ?? "Uploaded PDF packet").trim() || "Uploaded PDF packet")},
    year: ${JSON.stringify(String(new Date().getFullYear()))},
    note: ${JSON.stringify(String(note ?? "Created from a PDF upload.").trim() || "Created from a PDF upload.")},
    drawingSlugs: [],
  },
`;

  const next = source.replace(
    /\n\];\n\nexport const currentArtwork/,
    `\n${packet}];\n\nexport const currentArtwork`,
  );

  if (next === source) {
    throw new Error("Could not find art volume list.");
  }

  await writeFile(artDataFile, next);
  return { slug, title: packetTitle };
};

const createArtwork = async (entry) => {
  const packetSlug = String(entry.packetSlug ?? "").trim();
  const kind = String(entry.kind ?? "").trim();

  if (!packetSlug) {
    throw new Error("Packet slug is required.");
  }

  const result = await writeArtworkEntries(packetSlug, [
    {
      title: entry.title,
      imageSrc: entry.imageSrc,
      processSrcs: entry.processSrcs,
      featured: entry.featured,
      note: entry.note,
      medium: kind === "pdf" ? "Uploaded PDF" : "Uploaded scan",
    },
  ]);

  return { slug: result.slugs[0] };
};

const savePdfPages = async (entry) => {
  const packetSlug = String(entry.packetSlug ?? "").trim();
  const newPacketTitle = String(entry.newPacketTitle ?? "").trim();
  const title = String(entry.title ?? "").trim();
  const note = String(entry.note ?? "").trim();
  const pages = Array.isArray(entry.pages) ? entry.pages : [];

  if ((!packetSlug && !newPacketTitle) || !title || pages.length === 0) {
    throw new Error("Packet or new packet title, drawing title, and selected PDF pages are required.");
  }

  const createdPacket = newPacketTitle
    ? await createArtVolume({
        title: newPacketTitle,
        subtitle: `${title} pages`,
        note: note || "Created from a PDF upload.",
      })
    : null;
  const targetPacketSlug = createdPacket?.slug ?? packetSlug;

  await mkdir(artDir, { recursive: true });

  const savedPages = await Promise.all(
    pages.map(async (page) => {
      const pageNumber = Number(page.pageNumber);
      const dataUrl = String(page.dataUrl ?? "");
      const match = dataUrl.match(/^data:image\/png;base64,([a-z0-9+/=]+)$/i);

      if (!Number.isFinite(pageNumber) || !match) {
        throw new Error("Invalid rendered PDF page.");
      }

      const filename = `${slugify(title) || "pdf-page"}-page-${pageNumber}-${randomUUID().slice(0, 8)}.png`;
      await writeFile(join(artDir.pathname, filename), Buffer.from(match[1], "base64"));

      return {
        ...page,
        pageNumber,
        src: `/art/${filename}`,
      };
    }),
  );

  const srcByPage = new Map(savedPages.map((page) => [page.pageNumber, page.src]));
  const finalPages = savedPages.filter((page) => page.role !== "process");

  if (finalPages.length === 0) {
    throw new Error("Choose at least one finished/gallery PDF page.");
  }

  const artworkEntries = finalPages.map((page) => {
    const pageTitle = String(page.title ?? "").trim();
    const processSrcs = (Array.isArray(page.processPageNumbers) ? page.processPageNumbers : [])
      .map((pageNumber) => srcByPage.get(Number(pageNumber)))
      .filter(Boolean);

    return {
      title: pageTitle || (finalPages.length === 1 ? title : `${title} p. ${page.pageNumber}`),
      imageSrc: page.src,
      processSrcs,
      featured: Boolean(page.featured),
      medium: "PDF page",
      note: note || "Extracted from an uploaded PDF.",
    };
  });

  const result = await writeArtworkEntries(targetPacketSlug, artworkEntries);
  return {
    ...result,
    packetSlug: targetPacketSlug,
    packetTitle: createdPacket?.title,
    createdPacket,
  };
};

const saveProcessSlider = async (fields, files) => {
  const sliderTitle = String(fields.title ?? "").trim() || "Sunset";
  const stages = JSON.parse(String(fields.stages ?? "[]"));

  if (!Array.isArray(stages) || stages.length === 0 || stages.length > 12) {
    throw new Error("Add between 1 and 12 process stages.");
  }

  const savedStages = await Promise.all(
    stages.map(async (stage, index) => {
      const upload = files[`stageFile-${index}`];
      if (upload && extname(upload.filename || "").toLowerCase() === ".pdf") {
        throw new Error("Process stages must use image files.");
      }

      const uploaded = upload ? await saveUpload(upload) : null;
      const existingImageSrc = String(stage.imageSrc ?? "").trim();
      const palette = Array.isArray(stage.palette) && stage.palette.length >= 3
        ? stage.palette.slice(0, 3).map(String)
        : ["#fff8ed", "#d94f68", "#247d70"];

      return {
        label: String(index + 1).padStart(2, "0"),
        title: String(stage.title ?? "").trim() || `Stage ${index + 1}`,
        description: String(stage.description ?? "").trim(),
        palette,
        imageSrc: uploaded?.src || (existingImageSrc.startsWith("/art/") ? existingImageSrc : ""),
      };
    }),
  );

  const source = await readFile(artDataFile, "utf8");
  const objects = savedStages.map((stage) => `  {
    label: ${JSON.stringify(stage.label)},
    title: ${JSON.stringify(stage.title)},
    description: ${JSON.stringify(stage.description)},
    palette: ${JSON.stringify(stage.palette)},${stage.imageSrc ? `\n    ...{ imageSrc: ${JSON.stringify(stage.imageSrc)} },` : ""}
  },`);
  const pattern = /export const processStages: ProcessStage\[] = \[[\s\S]*?\n\];/;
  const titlePattern = /(export const currentArtwork: CurrentArtwork = \{\n\s*title:\s*)"[^"]*"/;

  if (!pattern.test(source) || !titlePattern.test(source)) {
    throw new Error("Could not find process slider data.");
  }

  let next = source.replace(
    pattern,
    `export const processStages: ProcessStage[] = [\n${objects.join("\n")}\n];`,
  );
  next = next.replace(titlePattern, `$1${JSON.stringify(sliderTitle)}`);

  await writeFile(artDataFile, next);
  return { title: sliderTitle, stages: savedStages };
};

const deleteArtLibraryItems = async (entry) => {
  const packetSlug = String(entry.packetSlug ?? "").trim();
  const mode = entry.mode === "packet" ? "packet" : "drawings";
  const selectedSlugs = new Set(
    (Array.isArray(entry.drawingSlugs) ? entry.drawingSlugs : [])
      .map((slug) => String(slug).trim())
      .filter(Boolean),
  );

  if (!packetSlug) throw new Error("Choose a packet first.");
  if (mode === "drawings" && selectedSlugs.size === 0) {
    throw new Error("Choose at least one drawing to delete.");
  }

  const source = await readFile(artDataFile, "utf8");
  const artworkSection = source.match(/(export const artworks: Artwork\[] = \[\n)([\s\S]*?)(\n\];\n\nexport const artVolumes)/);
  const volumeSection = source.match(/(export const artVolumes: ArtVolume\[] = \[\n)([\s\S]*?)(\n\];\n\nexport const currentArtwork)/);

  if (!artworkSection || !volumeSection) {
    throw new Error("Could not read the art library data.");
  }

  const objectBlocks = (body) => body.match(/  \{\n[\s\S]*?\n  \},/g) ?? [];
  const blockSlug = (block) => block.match(/\n\s*slug:\s*"([^"]+)"/)?.[1] ?? "";
  const blockDrawingSlugs = (block) =>
    [...(block.match(/drawingSlugs:\s*\[([\s\S]*?)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)]
      .map((match) => match[1]);

  const artworkBlocks = objectBlocks(artworkSection[2]);
  const volumeBlocks = objectBlocks(volumeSection[2]);
  const targetVolume = volumeBlocks.find((block) => blockSlug(block) === packetSlug);

  if (!targetVolume) throw new Error(`Packet not found: ${packetSlug}`);

  const packetDrawingSlugs = blockDrawingSlugs(targetVolume);
  const removedFromPacket = mode === "packet"
    ? packetDrawingSlugs
    : packetDrawingSlugs.filter((slug) => selectedSlugs.has(slug));
  const removedSet = new Set(removedFromPacket);

  let nextVolumeBlocks;
  if (mode === "packet") {
    nextVolumeBlocks = volumeBlocks.filter((block) => blockSlug(block) !== packetSlug);
  } else {
    const remaining = packetDrawingSlugs.filter((slug) => !removedSet.has(slug));
    const drawingList = remaining.length
      ? `drawingSlugs: [\n${remaining.map((slug) => `      ${JSON.stringify(slug)},`).join("\n")}\n    ]`
      : "drawingSlugs: []";
    nextVolumeBlocks = volumeBlocks.map((block) =>
      blockSlug(block) === packetSlug
        ? block.replace(/drawingSlugs:\s*\[[\s\S]*?\]/, drawingList)
        : block,
    );
  }

  const stillReferenced = new Set(nextVolumeBlocks.flatMap(blockDrawingSlugs));
  const orphanedSlugs = new Set(removedFromPacket.filter((slug) => !stillReferenced.has(slug)));
  const removedArtworkBlocks = artworkBlocks.filter((block) => orphanedSlugs.has(blockSlug(block)));
  const nextArtworkBlocks = artworkBlocks.filter((block) => !orphanedSlugs.has(blockSlug(block)));

  let next = source.replace(
    volumeSection[0],
    `${volumeSection[1]}${nextVolumeBlocks.join("\n")}${volumeSection[3]}`,
  );
  next = next.replace(
    artworkSection[0],
    `${artworkSection[1]}${nextArtworkBlocks.join("\n")}${artworkSection[3]}`,
  );

  await writeFile(artDataFile, next);

  const removedAssets = new Set(
    removedArtworkBlocks.flatMap((block) =>
      [...block.matchAll(/"(\/art\/[^"\n]+)"/g)].map((match) => match[1]),
    ),
  );
  await Promise.all(
    [...removedAssets]
      .filter((src) => !next.includes(JSON.stringify(src)))
      .map((src) => unlink(join(artDir.pathname, src.replace(/^\/art\//, ""))).catch(() => undefined)),
  );

  return {
    mode,
    packetSlug,
    removedFromPacket,
    deletedArtworkSlugs: [...orphanedSlugs],
    deletedAssets: [...removedAssets].filter((src) => !next.includes(JSON.stringify(src))),
  };
};

const saveSkillToyClip = async (entry) => {
  const id = String(entry.id ?? "").trim();
  const toySlug = String(entry.toySlug ?? "").trim();
  const title = String(entry.title ?? "").trim();
  const date = String(entry.date ?? "").trim();
  const tag = String(entry.tag ?? "practice").trim();
  const youtubeId = getYouTubeId(String(entry.youtubeId ?? "").trim());
  const notes = String(entry.notes ?? "").trim();

  if (!id || !toySlug || !title || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !youtubeId) {
    throw new Error("Toy, title, date, trick id, and YouTube URL or ID are required.");
  }
  if (!["practice", "trick", "combo"].includes(tag)) {
    throw new Error("Invalid clip tag.");
  }

  const source = await readFile(skillToyDataFile, "utf8");
  const entryList = source.match(/const skillToyEntries: SkillToyEntry\[] = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const toySlugs = new Set([...entryList.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
  const comboIds = new Set([...source.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]));
  const youtubeIds = new Set([...source.matchAll(/\byoutubeId:\s*"([^"]+)"/g)].map((match) => match[1]));

  if (!toySlugs.has(toySlug)) throw new Error(`Unknown skill toy: ${toySlug}`);
  if (comboIds.has(id)) throw new Error(`A clip with id ${id} already exists.`);
  if (youtubeIds.has(youtubeId)) throw new Error("That YouTube clip is already in the log.");

  const clip = `  {
    id: ${JSON.stringify(id)},
    toySlug: ${JSON.stringify(toySlug)},
    title: ${JSON.stringify(title)},
    date: ${JSON.stringify(date)},
    tag: ${JSON.stringify(tag)},
    youtubeId: ${JSON.stringify(youtubeId)},
    notes: ${JSON.stringify(notes)},
  },\n`;
  const marker = /\n\];\n\nconst getYouTubeId/;

  if (!marker.test(source)) {
    throw new Error("Could not find the skill toy clip list.");
  }

  await writeFile(skillToyDataFile, source.replace(marker, `\n${clip}];\n\nconst getYouTubeId`));
  return { id, toySlug, title, youtubeId };
};

createServer(async (request, response) => {
  try {
    if (request.method === "OPTIONS") {
      send(response, 200, { ok: true });
      return;
    }

    const url = new URL(request.url ?? "/", `http://localhost:${port}`);

    if (request.method === "GET" && url.pathname === "/health") {
      send(response, 200, { ok: true, artDir: artDir.pathname });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/youtube-metadata") {
      send(response, 200, { ok: true, video: await getYouTubeMetadata(url.searchParams.get("url")) });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/upload") {
      const body = await readBody(request);
      const { files } = parseMultipart(body, request.headers["content-type"] ?? "");
      if (!files.file) throw new Error("Missing upload file.");
      const file = await saveUpload(files.file);
      const processUploads = files.processFile
        ? (Array.isArray(files.processFile) ? files.processFile : [files.processFile])
        : [];
      const processFiles = await Promise.all(processUploads.map((upload) => saveUpload(upload)));

      if (processFiles.some((processFile) => processFile.kind === "pdf")) {
        throw new Error("Process uploads must be images.");
      }

      send(response, 200, { ok: true, file, processFiles });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/artwork") {
      const body = await readBody(request);
      const entry = JSON.parse(body.toString("utf8"));
      send(response, 200, { ok: true, artwork: await createArtwork(entry) });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/pdf-pages") {
      const body = await readBody(request);
      const entry = JSON.parse(body.toString("utf8"));
      send(response, 200, { ok: true, artwork: await savePdfPages(entry) });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/art-library/delete") {
      const body = await readBody(request);
      const entry = JSON.parse(body.toString("utf8"));
      send(response, 200, { ok: true, result: await deleteArtLibraryItems(entry) });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/process-slider") {
      const body = await readBody(request);
      const { fields, files } = parseMultipart(body, request.headers["content-type"] ?? "");
      send(response, 200, { ok: true, ...await saveProcessSlider(fields, files) });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/skilltoy-clip") {
      const body = await readBody(request);
      const entry = JSON.parse(body.toString("utf8"));
      send(response, 200, { ok: true, clip: await saveSkillToyClip(entry) });
      return;
    }

    send(response, 404, { ok: false, error: "Not found." });
  } catch (error) {
    send(response, 400, { ok: false, error: error.message });
  }
}).listen(port, host, () => {
  console.log(`Local admin writer listening at http://${host}:${port}`);
});
