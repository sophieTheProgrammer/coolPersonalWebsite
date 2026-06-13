# Content Guide

Most content lives in `src/data/`.

## Quick Helper

Open `/admin/` locally to generate copy-paste snippets for:

- New art scans/PDFs
- New YouTube trick clips

## Art

Put files in:

```txt
public/art/
```

Then add one entry to `src/data/artworks.ts`:

```ts
{
  title: "Sketchbook scan",
  src: "sketchbook-scan-01.jpg",
  alt: "Sketchbook page with figure studies",
  note: "Optional note.",
}
```

PDFs work too:

```ts
{
  title: "June drawing packet",
  src: "june-drawings.pdf",
}
```

## Skill Toys

Edit `src/data/skillToys.ts`.

Toy status, clip count, and latest clip are automatic. For new clips, add:

```ts
{
  id: "kendama-new-trick-2026-06-13",
  toySlug: "kendama",
  title: "New trick",
  date: "2026-06-13",
  tag: "practice",
  youtubeId: "YOUTUBE_ID",
  notes: "Short note.",
}
```

The site does not currently read YouTube title/description automatically.
That needs a YouTube Data API sync script.

## Coding

Edit `src/data/codingProjects.ts`.

- `status` controls color automatically.
- `spotlight: true` marks a big project.
- No manual accent color is needed.

## Homepage

Edit `src/data/site.ts` for intro text and social links.
