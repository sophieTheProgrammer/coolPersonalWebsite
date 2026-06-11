# Cool Personal Website

A static Astro personal studio for skill toys, coding projects, and art.

## Run Locally

```bash
npm install
npm run dev
```

Local URL:

```txt
http://127.0.0.1:4321/coolPersonalWebsite/
```

## Build

```bash
npm run build
```

## Edit Content

- Main editing guide: `CONTENT_GUIDE.md`
- Homepage copy: `src/data/site.ts`
- Skill toys, progress scores, active status, combo logs, video embeds: `src/data/skillToys.ts`
- Art gallery, process slider, palette lab: `src/data/artworks.ts`
- Coding projects, status cards, terminal commands: `src/data/codingProjects.ts`
- Site footer/edit map: `src/data/site.ts`

## MVP Sections

- Home: animated CSS person, section links
- Skill Toys: Chart.js progress graph, active practice board, practice picker, trick logs, toy detail pages
- Coding: dashboard/workbench, animated tiny terminal, project cards
- Art: drawing volumes, visual board, process slider, palette lab, sketchbook tile, collection pages, artwork detail pages

## Deploy

The site is configured for GitHub Pages with Astro static output and a GitHub Actions workflow in `.github/workflows/deploy.yml`.
