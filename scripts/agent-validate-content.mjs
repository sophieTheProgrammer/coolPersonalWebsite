import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(path.join(root, file), "utf8");
const matchAll = (source, regex) => [...source.matchAll(regex)];

const report = [];
const fail = (message) => report.push(message);

const getArrayBody = (source, name) => {
  const start = source.search(new RegExp(`(?:export\\s+)?const\\s+${name}\\b`));
  if (start === -1) return "";

  const arrayStart = source.indexOf("[", start);
  const arrayEnd = source.indexOf("];", arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) return "";

  return source.slice(arrayStart, arrayEnd);
};

const findDuplicates = (label, values) => {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  for (const value of duplicates) fail(`${label} duplicate: ${value}`);
};

const validateAssets = (label, source) => {
  const assetRefs = matchAll(source, /"(\/(?:art|doodles)\/[^"]+)"/g).map(
    (match) => match[1],
  );

  for (const assetRef of assetRefs) {
    const localPath = path.join(root, "public", assetRef);
    if (!existsSync(localPath)) fail(`${label} missing asset: ${assetRef}`);
  }
};

const skillSource = read("src/data/skillToys.ts");
const artSource = read("src/data/artworks.ts");
const codingSource = read("src/data/codingProjects.ts");

const skillToyBody = getArrayBody(skillSource, "skillToyEntries");
const comboBody = getArrayBody(skillSource, "comboLogEntries");
const artworkBody = getArrayBody(artSource, "artworks");
const volumeBody = getArrayBody(artSource, "artVolumes");
const projectBody = getArrayBody(codingSource, "codingProjects");

const toySlugs = matchAll(skillToyBody, /slug:\s*"([^"]+)"/g).map(
  (match) => match[1],
);
const comboToySlugs = matchAll(comboBody, /toySlug:\s*"([^"]+)"/g).map(
  (match) => match[1],
);
const comboIds = matchAll(comboBody, /id:\s*"([^"]+)"/g).map((match) => match[1]);
const artworkSlugs = matchAll(artworkBody, /slug:\s*"([^"]+)"/g).map(
  (match) => match[1],
);
const volumeSlugs = matchAll(volumeBody, /slug:\s*"([^"]+)"/g).map(
  (match) => match[1],
);
const drawingSlugs = matchAll(volumeBody, /drawingSlugs:\s*\[([\s\S]*?)\]/g)
  .flatMap((match) => matchAll(match[1], /"([^"]+)"/g))
  .map((match) => match[1]);
const projectSlugs = matchAll(projectBody, /slug:\s*"([^"]+)"/g).map(
  (match) => match[1],
);

findDuplicates("skill toy slug", toySlugs);
findDuplicates("combo id", comboIds);
findDuplicates("artwork slug", artworkSlugs);
findDuplicates("art volume slug", volumeSlugs);
findDuplicates("coding project slug", projectSlugs);

for (const toySlug of comboToySlugs) {
  if (!toySlugs.includes(toySlug)) fail(`combo references unknown toy: ${toySlug}`);
}

for (const drawingSlug of drawingSlugs) {
  if (!artworkSlugs.includes(drawingSlug)) {
    fail(`art volume references unknown artwork: ${drawingSlug}`);
  }
}

validateAssets("artworks", artSource);
validateAssets("site", read("src/data/site.ts"));

if (report.length) {
  console.error("Agent content validation failed:");
  for (const line of report) console.error(`- ${line}`);
  process.exit(1);
}

console.log("Agent content validation passed.");
