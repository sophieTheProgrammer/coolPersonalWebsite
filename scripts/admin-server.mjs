import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { randomUUID } from "node:crypto";

const root = new URL("../", import.meta.url);
const artDir = new URL("public/art/", root);
const artDataFile = new URL("src/data/artworks.ts", root);
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
      files[name] = {
        filename,
        data: Buffer.from(value, "latin1"),
        type: rawHeaders.match(/Content-Type:\s*([^\r\n]+)/i)?.[1] ?? "application/octet-stream",
      };
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
    const processSrc = String(entry.processSrc ?? "").trim();
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
    imageSrc: ${JSON.stringify(imageSrc)},${processSrc ? `\n    processSrc: ${JSON.stringify(processSrc)},` : ""}
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
      processSrc: entry.processSrc,
      note: entry.note,
      medium: kind === "pdf" ? "Uploaded PDF" : "Uploaded scan",
    },
  ]);

  return { slug: result.slugs[0] };
};

const savePdfPages = async (entry) => {
  const packetSlug = String(entry.packetSlug ?? "").trim();
  const title = String(entry.title ?? "").trim();
  const note = String(entry.note ?? "").trim();
  const pages = Array.isArray(entry.pages) ? entry.pages : [];

  if (!packetSlug || !title || pages.length === 0) {
    throw new Error("Packet, title, and selected PDF pages are required.");
  }

  await mkdir(artDir, { recursive: true });

  const artworkEntries = await Promise.all(
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
        title: pages.length === 1 ? title : `${title} p. ${pageNumber}`,
        imageSrc: `/art/${filename}`,
        medium: "PDF page",
        note: note || "Extracted from an uploaded PDF.",
      };
    }),
  );

  return writeArtworkEntries(packetSlug, artworkEntries);
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

    if (request.method === "POST" && url.pathname === "/api/upload") {
      const body = await readBody(request);
      const { files } = parseMultipart(body, request.headers["content-type"] ?? "");
      if (!files.file) throw new Error("Missing upload file.");
      send(response, 200, { ok: true, file: await saveUpload(files.file) });
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

    send(response, 404, { ok: false, error: "Not found." });
  } catch (error) {
    send(response, 400, { ok: false, error: error.message });
  }
}).listen(port, host, () => {
  console.log(`Local admin writer listening at http://${host}:${port}`);
});
