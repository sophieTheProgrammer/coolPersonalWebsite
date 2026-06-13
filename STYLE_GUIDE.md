# Style Guide

## Current Direction

Playful personal studio, not generic portfolio. The site should feel like a
clean desk with hand-drawn labels, trick clips, tiny tools, and art scans.

## Typography

- Main headings: `Pangolin`
- Body text: `Atkinson Hyperlegible`
- UI/card headings: `Bricolage Grotesque`
- Code, stats, terminal, metadata: `IBM Plex Mono`

Preview the options at `/style/`.

## Restricted Palette

- Ink: `#24202c`
- Paper: `#fff8ed`
- Card: `#fffdf8`
- Rose accent: `#d94f68`
- Leaf accent: `#247d70`
- Muted text: `#706779`

Use rose for primary action, latest badges, and warm highlights. Use leaf for
secondary progress, garden shapes, and calm accents. Avoid adding new strong
colors unless a hand-drawn asset really needs one.

## Skill Toy Asset Colors

Keep skill toy icons mostly one-color so they read clearly against the hands or
background shapes. Suggested format:

- Transparent PNG
- One dark ink drawing: `#24202c`
- Optional soft background blob using rose or leaf at low opacity
- Export around `512x512`
- Keep the toy silhouette larger than the hands

Suggested backgrounds:

- Kendama: soft rose blob
- Begleri: soft leaf blob
- Yoyo: paper blob with rose edge
- Pen spinning: leaf blob with ink pen
- Juggling: rose dots on paper
- Freestyle football: leaf blob with ink ball

## Hand-Drawn Rules

- Use transparent PNGs in `public/doodles/`.
- Keep doodles simple and readable at small sizes.
- Prefer one-color ink drawings with tiny accent fills.
- Let drawings add personality; keep the website palette steady.

## Future Upload Flow

Best next upgrade: add an `npm run add:trick` helper that asks for toy, title,
date, tag, YouTube URL, and notes, then updates `src/data/skillToys.ts`.

Later upgrade: YouTube playlist import that drafts new trick logs from recent
uploads.
