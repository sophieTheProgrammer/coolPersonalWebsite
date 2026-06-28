# Agent Utilities

Use these before opening large files.

```bash
npm run agent:context
npm run agent:validate
```

## What They Do

- `agent:context`: prints routes, npm scripts, content counts, data exports, asset counts, largest source files, and current git changes.
- `agent:validate`: checks duplicate content slugs, combo logs pointing at missing toys, art volumes pointing at missing drawings, and local `/art` or `/doodles` asset paths.

## Useful Editing Map

- Site shell: `src/layouts/BaseLayout.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`
- Homepage copy and links: `src/data/site.ts`
- Skill toy content: `src/data/skillToys.ts`
- Coding page content: `src/data/codingProjects.ts`
- Art content and collection membership: `src/data/artworks.ts`
- Admin upload helper: `src/pages/admin.astro`, `scripts/admin-server.mjs`
- Global design tokens and shared styles: `src/styles/global.css`

## Suggested Agent Loop

1. Run `npm run agent:context`.
2. Edit the smallest matching data or component file.
3. Run `npm run agent:validate` for content edits.
4. Run `npm run build`.
5. Leave `npm run dev` running for review.
