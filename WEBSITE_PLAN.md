# Personal Website Roadmap

## What This Site Is

A small personal studio website for skill toy clips, coding projects, and art. It should feel polished, playful, and personal, with hand-drawn details added over time.

## Current Pages

- **Home** - intro, section links, and a studio avatar slot.
- **Skill Toys** - progress chart, active practice clips, combo log, toy detail pages, and latest badges.
- **Coding** - project cards and a tiny terminal.
- **Art** - drawing packet covers, collection pages, process slider, sketchbook tile, page-fold notes, and animated garden background.

## Where To Edit Content

- `src/data/site.ts` - homepage text, section links, doodle sticker filenames, coding doodle filename.
- `src/data/skillToys.ts` - toy progress, toy icons, combo logs, video embeds, notes.
- `src/data/artworks.ts` - artwork entries, drawing packets, cover doodle filenames, process slider text.
- `src/data/codingProjects.ts` - coding projects, terminal commands, links.
- `public/doodles/` - transparent PNG drawings you make.
- `DRAWING_TODO.md` - checklist of drawings, animations, and remaining placeholders.

## Hand-Drawn Studio Identity

- Use transparent PNG drawings in `public/doodles/`.
- Missing PNGs automatically show polished placeholders, so unfinished art will not break the site.
- Current drawing slots:
  - `studio-avatar.png` on the homepage.
  - Skill toy icons like `kendama-icon.png` and `begleri-icon.png`.
  - Stickers like `latest-sticker.png`, `practice-sticker.png`, `trick-sticker.png`, and `combo-sticker.png`.
  - Art packet covers like `drawings-vol-01-cover.png`.
  - `terminal-note.png` on the coding page.
- Keep animations gentle: float, bob, wiggle, and page-corner reveals.

## Next Features

- Add your first real transparent PNGs from `DRAWING_TODO.md`.
- Replace empty skill toy video embeds with real clips.
- Add real artwork images and better art packet covers.
- Add project screenshots and real coding project links.
- Later: try an ArtStation-style popup for art packets if page navigation feels too heavy.
- Later: make terminal commands clickable and add filters for coding/skill toy pages.

## Deployment Notes

- GitHub Pages build: `npm run build`.
- Root `public_html` build: `PUBLIC_BASE=/ npm run build`.
- Manual upload zip: `coolPersonalWebsite-public_html.zip`.
- After a root build, zip the contents of `dist/` for upload.

## Done Recently

- Added a reusable doodle image system with missing-file fallbacks.
- Added homepage avatar, skill toy icon, sticker, art cover, and terminal accent slots.
- Added `public/doodles/` for future transparent PNG drawings.
- Added `DRAWING_TODO.md` as the drawing and placeholder checklist.
- Simplified Art packet cards so they click into collection pages instead of expanding inline.
- Added page-fold Easter eggs and an animated garden background on the Art page.
- Removed Palette Lab and other stale art-card complexity.
