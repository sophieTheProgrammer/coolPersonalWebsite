import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(path.join(root, file), "utf8");

const getJson = (file) => JSON.parse(read(file));
const matchAll = (source, regex) => [...source.matchAll(regex)];
const unique = (items) => [...new Set(items)].sort((a, b) => a.localeCompare(b));

const listFiles = (dir) => {
  const fullDir = path.join(root, dir);
  if (!existsSync(fullDir)) return [];

  return readdirSync(fullDir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(entryPath);
    return entryPath;
  });
};

const routeFromPage = (file) => {
  const route = file
    .replace(/^src\/pages/, "")
    .replace(/\/index\.astro$/, "/")
    .replace(/\.astro$/, "")
    .replace(/\[([^\]]+)\]/g, ":$1");

  return route === "" ? "/" : route;
};

const changedFiles = () => {
  try {
    return execFileSync("git", ["status", "--short"], {
      cwd: root,
      encoding: "utf8",
    })
      .trim()
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
};

const dataFileSummary = (file) => {
  const source = read(file);
  const exports = matchAll(source, /export const (\w+)/g).map((match) => match[1]);
  const functions = matchAll(source, /export function (\w+)/g).map(
    (match) => match[1],
  );
  const types = matchAll(source, /export type (\w+)/g).map((match) => match[1]);

  return { file, exports, functions, types };
};

const getArrayBody = (source, name) => {
  const start = source.search(new RegExp(`(?:export\\s+)?const\\s+${name}\\b`));
  if (start === -1) return "";

  const arrayStart = source.indexOf("[", start);
  const arrayEnd = source.indexOf("];", arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) return "";

  return source.slice(arrayStart, arrayEnd);
};

const getPackageScripts = () => getJson("package.json").scripts ?? {};
const packageScripts = getPackageScripts();
const astroConfig = read("astro.config.mjs");
const baseMatch = astroConfig.match(/PUBLIC_BASE\s*\?\?\s*"([^"]+)"/);

const pageFiles = listFiles("src/pages").filter((file) => file.endsWith(".astro"));
const componentFiles = listFiles("src/components").filter((file) =>
  file.endsWith(".astro"),
);
const dataFiles = listFiles("src/data").filter((file) => file.endsWith(".ts"));
const publicFiles = listFiles("public");
const artAssetCount = publicFiles.filter((file) => file.startsWith("public/art/")).length;
const doodleAssetCount = publicFiles.filter((file) =>
  file.startsWith("public/doodles/"),
).length;

const skillSource = read("src/data/skillToys.ts");
const codingSource = read("src/data/codingProjects.ts");
const artSource = read("src/data/artworks.ts");

const skillToyBody = getArrayBody(skillSource, "skillToyEntries");
const comboBody = getArrayBody(skillSource, "comboLogEntries");
const projectBody = getArrayBody(codingSource, "codingProjects");
const artworkBody = getArrayBody(artSource, "artworks");
const volumeBody = getArrayBody(artSource, "artVolumes");

const skillToyNames = matchAll(skillToyBody, /name:\s*"([^"]+)"/g).map(
  (match) => match[1],
);
const comboTitles = matchAll(comboBody, /title:\s*"([^"]+)"/g).map(
  (match) => match[1],
);
const projectTitles = matchAll(projectBody, /title:\s*"([^"]+)"/g).map(
  (match) => match[1],
);
const artStatuses = unique(matchAll(artworkBody, /status:\s*"([^"]+)"/g).map(
  (match) => match[1],
));

const fileSize = (file) => statSync(path.join(root, file)).size;
const largestSourceFiles = [...pageFiles, ...componentFiles, ...dataFiles]
  .map((file) => ({ file, bytes: fileSize(file) }))
  .sort((a, b) => b.bytes - a.bytes)
  .slice(0, 8);

const sections = [
  ["Repo", ["Astro static site", `Base path: ${baseMatch?.[1] ?? "see astro.config.mjs"}`]],
  [
    "Commands",
    Object.entries(packageScripts).map(([name, command]) => `${name}: ${command}`),
  ],
  ["Routes", pageFiles.map((file) => `${routeFromPage(file)} -> ${file}`).sort()],
  [
    "Content Data",
    [
      `skill toys: ${matchAll(skillToyBody, /slug:\s*"([^"]+)"/g).length} (${skillToyNames.join(", ")})`,
      `combo logs: ${matchAll(comboBody, /id:\s*"([^"]+)"/g).length} latest titles include ${comboTitles.slice(-3).join(", ")}`,
      `coding projects: ${matchAll(projectBody, /slug:\s*"([^"]+)"/g).length} (${projectTitles.join(", ")})`,
      `artworks: ${matchAll(artworkBody, /slug:\s*"([^"]+)"/g).length} statuses: ${artStatuses.join(", ")}`,
      `art volumes: ${matchAll(volumeBody, /slug:\s*"([^"]+)"/g).length}`,
    ],
  ],
  [
    "Data Modules",
    dataFiles.map((file) => {
      const summary = dataFileSummary(file);
      const names = [
        summary.exports.length ? `exports ${summary.exports.join(", ")}` : "",
        summary.functions.length ? `functions ${summary.functions.join(", ")}` : "",
        summary.types.length ? `types ${summary.types.join(", ")}` : "",
      ].filter(Boolean);
      return `${file}: ${names.join("; ")}`;
    }),
  ],
  [
    "Assets",
    [
      `public/art files: ${artAssetCount}`,
      `public/doodles files: ${doodleAssetCount}`,
      "Use /art/name.ext and /doodles/name.ext in content data.",
    ],
  ],
  [
    "Largest Source Files",
    largestSourceFiles.map(({ file, bytes }) => `${file}: ${bytes} bytes`),
  ],
  [
    "Current Git Changes",
    changedFiles().length ? changedFiles() : ["clean working tree"],
  ],
  [
    "Agent Pointers",
    [
      "Edit content in src/data/*.ts before touching page components.",
      "Run npm run agent:validate after content edits.",
      "Run npm run build before committing.",
      "Admin helper lives at /admin/ and scripts/admin-server.mjs.",
    ],
  ],
];

for (const [title, lines] of sections) {
  console.log(`\n## ${title}`);
  for (const line of lines) console.log(`- ${line}`);
}
