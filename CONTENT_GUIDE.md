# Content Guide

Use this file as the quick map for replacing placeholders with your real stuff.

## Start Here

Most content lives in `src/data/`.

```txt
src/data/site.ts            homepage text, footer text, edit map
src/data/skillToys.ts       skill toy progress, tricks, combo logs, video embeds
src/data/artworks.ts        art gallery, process slider, palette lab
src/data/codingProjects.ts  coding projects, terminal text, current status
```

After edits, run:

```bash
npm run build
```

## Homepage

Edit `homeContent` in `src/data/site.ts`.

You can change:

- `eyebrow`
- `headline`
- `intro`
- homepage section cards

## Skill Toys

Edit `src/data/skillToys.ts`.

Toy progress is in `skillToys`:

```ts
{
  name: "Kendama",
  slug: "kendama",
  progressScore: 64,
  clipCount: 8,
  currentFocus: "Cleaner catches and longer flow lines.",
  status: "active",
  latestComboId: "kendama-lunar-line-01",
}
```

Trick/video entries are in `comboLogs`:

```ts
{
  id: "kendama-lunar-line-01",
  toySlug: "kendama",
  title: "Lunar line practice",
  date: "2026-06-11",
  status: "landed",
  embedUrl: "",
  notes: "Working on smoother setup and catch control.",
  featured: true,
}
```

Put YouTube/Vimeo embed URLs in `embedUrl`.

## Art

Edit `src/data/artworks.ts`.

- `artVolumes`: top-level drawing packs/collections on the Art page
- `artworks`: individual drawings inside volume pages and art detail pages
- `currentArtwork`: what the process widget says you are working on
- `processStages`: process slider stages

To add a new volume, add an item to `artVolumes` and list drawing slugs in
`drawingSlugs`:

```ts
{
  title: "Drawings Vol. 03",
  slug: "drawings-vol-03",
  subtitle: "A short description of the pack",
  year: "2026",
  note: "What this volume contains.",
  coverPalette: ["#e4577a", "#2d9c8c", "#f4d35e"],
  drawingSlugs: ["signal-garden", "line-memory"],
}
```

To add a drawing, add an item to `artworks`, then add its `slug` to one or more
volume `drawingSlugs` arrays.

## Coding

Edit `src/data/codingProjects.ts`.

- `codingNow`: status cards
- `codingProjects`: project entries
- `terminalCommands`: tiny terminal text

## Future GUI Upload Feature

A future version should add a private editor/admin GUI so you can upload art,
paste video links, add projects, and update progress without touching code.
Good future options:

- Decap CMS or another Git-backed CMS
- A local-only admin page that writes JSON/Markdown
- A hosted CMS if the site moves from GitHub Pages to Netlify or Vercel

## Easter Egg Ideas

- Hidden clickable marks on volume covers that swap the palette.
- A random sketch button inside each volume.
- A tiny “page corner” hover reveal with a handwritten note.
- Secret keyboard shortcut on the Art page that opens a sketchbook mode.
- Hidden “studio stamps” users can find across Coding, Art, and Skill Toys.
