# Personal Website Roadmap

## What This Site Is

A playful personal studio for skill toy clips, coding projects, and art scans.

## Current Pages

- **Home** - intro, section links, studio avatar slot, YouTube/GitHub buttons.
- **Skill Toys** - six-card practice board, progress chart, combo log, toy detail pages, looping toy orbit.
- **Coding** - project cards, automatic status colors, spotlight flag for big projects, tiny terminal.
- **Art** - simple image/PDF gallery with a garden background.
- **Style** - font and palette preview.
- **Admin** - local helper that generates art/trick data snippets.

## Where To Edit Content

- `src/data/site.ts` - homepage text and social links.
- `src/data/skillToys.ts` - skill toys and combo logs.
- `src/data/artworks.ts` - simple art scan/PDF entries.
- `src/data/codingProjects.ts` - coding projects and terminal commands.
- `public/art/` - art images and PDFs.
- `public/doodles/` - transparent PNG doodles.

## Next Features

- Add real art files to `public/art/`.
- Add a real YouTube sync script for titles/descriptions.
- Turn `/admin/` from snippet generator into a real local writer.
- Add real hand-drawn doodles and stickers.

## Deployment Notes

- GitHub Pages build: `npm run build`.
- Root `public_html` build: `PUBLIC_BASE=/ npm run build`.
- Manual upload zip: `coolPersonalWebsite-public_html.zip`.

## Done Recently

- Simplified Art into a flat scan/PDF gallery.
- Added `/admin/` snippet generator for art and trick entries.
- Moved the Skill Toys chart below the main practice board.
- Made the toy orbit loop continuously.
- Kept only a couple Skill Toys videos autoplaying; the rest load on click.
