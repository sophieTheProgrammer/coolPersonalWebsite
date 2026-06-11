# Personal Website MVP Plan

## Summary

Build a polished static personal website with a simple animated homepage, a skill toy page focused on video cards, a coding page for projects and current work, and an art gallery page. The MVP should feel clean, playful, and easy to update without needing a backend.

The first priority is the skill toy page: each card represents a toy or practice area, such as Kendama or Begleri, and includes an embedded video showing the most recent trick combo or practice clip.

## Pages

### Home

- Simple polished landing page with your name, short intro, and links to the main sections.
- Small animation on load, such as floating objects, subtle text reveal, or a looping canvas background, including drawn animated picture of me animated on hover
- Featured links to Skill Toys, Coding, and Art.
- Short "what I'm up to" line that can be edited from a content file.

### Skill Toys

- Main MVP feature.
- Card grid for different skill toys and hobbies.
- Each card includes:
  - Toy name
  - Short description
  - Current focus or latest trick
  - Embedded video for the most recent combo or practice clip
  - Tags such as `learning`, `combo`, `flow`, `daily practice`
- Use lightweight hover/focus animation so cards feel tactile.
- Keep video embeds responsive and mobile-friendly.

### Coding

- Simple project portfolio page.
- Cards for coding projects with title, summary, tech stack, status, GitHub link, and live demo link when available.
- Include a "what I'm up to" section for current builds, experiments, or learning goals.
- MVP can use placeholder project content until real projects are added.

### Art

- Simple gallery page.
- Responsive image grid with title, medium, year/date, and optional notes.
- Clicking an artwork opens a larger view.
- MVP can start with placeholder artwork entries and local image placeholders.

## Technology Stack

### Core Framework

- **Astro** for the static site framework.
  - Works well for GitHub Pages.
  - Fast by default.
  - Great for mostly static pages with small interactive pieces.
  - Supports Markdown/MDX content collections cleanly.

- **TypeScript** for safer component props, content schemas, and future maintainability.

### Styling

- **Tailwind CSS** for styling.
  - Good for fast iteration.
  - Keeps the design consistent across pages.
  - Easy to create responsive layouts and polished cards.

- **CSS custom properties** for theme colors and reusable design tokens.
  - Use variables for background, text, accent colors, card borders, and shadows.

### Content

- **Astro Content Collections** for editable content.
  - `skill-toys` collection for Kendama, Begleri, and other toy cards.
  - `projects` collection for coding projects.
  - `art` collection for gallery items.
  - `site` or config file for homepage intro and "what I'm up to" text.

- **Markdown / MDX** for content files.
  - Markdown is enough for most cards and descriptions.
  - MDX can be added later if a page needs custom interactive content inside an entry.

### Video Embeds

- Use responsive iframe embeds for YouTube, Vimeo, or other video platforms.
- Store video provider and video URL in each skill toy content file.
- Build a reusable `VideoEmbed` component that:
  - Keeps a stable aspect ratio.
  - Supports lazy loading.
  - Has a title for accessibility.
  - Falls back to an external link if the embed URL is missing.

### Interactivity and Animation

- **Astro view transitions** for smooth page navigation where supported.
- **CSS animations** for the homepage intro and card hover states.
- **Framer Motion is not needed for MVP** because most animation can be handled with CSS.
- **Canvas or simple CSS motion** can power the homepage animation.
  - MVP recommendation: use CSS motion first to avoid unnecessary JavaScript.
  - Add canvas later if the homepage needs a more playful interactive background.

### Icons

- **Lucide Icons** for small interface icons.
  - Use for external links, play indicators, GitHub links, gallery expand buttons, and navigation details.

### Images

- Use Astro's built-in image handling where practical.
- Keep gallery images in a local assets folder.
- Use optimized sizes for thumbnails and full gallery views.

### Deployment

- **GitHub Pages** as the hosting target.
- Use Astro's static output.
- Add a GitHub Actions workflow to build and deploy the `dist` output.
- Configure Astro's `site` and `base` values correctly if the site is deployed under a repository path.

## Recommended File Structure

```txt
src/
  components/
    Layout.astro
    Nav.astro
    SkillToyCard.astro
    VideoEmbed.astro
    ProjectCard.astro
    ArtGallery.astro
  content/
    skill-toys/
    projects/
    art/
  data/
    site.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    skill-toys.astro
    coding.astro
    art.astro
  styles/
    global.css
public/
  images/
    art/
    placeholders/
```

## MVP Implementation Order

1. Scaffold Astro, TypeScript, and Tailwind.
2. Configure GitHub Pages build settings.
3. Create global layout, navigation, typography, and theme tokens.
4. Build the homepage with simple animation and section links.
5. Build the skill toy content collection and video card grid.
6. Add reusable responsive video embed component.
7. Build simple coding project cards and "what I'm up to" section.
8. Build the art gallery grid and enlarged image view.
9. Add placeholder content for all pages.
10. Run build checks and visually test desktop and mobile layouts.

## MVP Acceptance Criteria

- Site builds as a static Astro site.
- Main navigation has only:
  - Home
  - Skill Toys
  - Coding
  - Art
- Skill Toys includes a progress chart, practice board, combo log, and toy detail pages.
- Homepage has a CSS person, motion, and section links.
- Coding page displays current work, a tiny terminal, and project cards.
- Art page displays drawing volumes, collection detail pages, a visual board,
  process slider, palette lab, sketchbook tile, and artwork detail pages.
- Content can be updated through simple data files in `src/data`.
- Site builds and is ready to deploy to GitHub Pages.

## Enhancement Roadmap

### Content Editing

- Add a private GUI editor/admin page for uploading art, pasting video links,
  adding coding projects, editing homepage copy, and updating skill toy progress
  without touching code.
- Keep the current `src/data` files as the source of truth until the GUI exists.
- Good future options:
  - Decap CMS or another Git-backed CMS.
  - A local-only admin page that writes JSON or Markdown.
  - A hosted CMS if the site moves from GitHub Pages to Netlify or Vercel.

### Home

- Add small cards or buttons for YouTube and GitHub near the homepage studio
  area.
- Keep the CSS person/workshop scene, but add more hover reactions and small
  idle animations.
- Let the homepage show a tiny "latest update" pulled from skill toys, coding,
  or art data.

### Skill Toys

- Keep the compact toy percentage scroller at the bottom of the Skill Toys page
  as a quick-jump area.
- Add a "latest combo" badge for the newest clip.
- Add a simple manual type field for combo logs:
  - `practice`
  - `trick`
  - `hard combo`
- Use that type to control visual emphasis so difficult or important combos get
  more attention without hiding normal practice clips.
- Add filters for toy, status, and combo type once there are more real clips.
- Add richer toy detail pages with personal notes, milestones, favorite combos,
  and embedded clip history.

### Art Gallery

- Make art collections feel more like expandable drawing packets or volumes:
  click a volume, enter a focused collection page, then browse the drawings
  inside it.
- Add a polished opening animation when entering an art packet.
- Keep the process widget as a two-column/two-slot feature when space allows.
- Add a sketchbook or palette graphic that feels like a custom studio object,
  not just another grid card.
- Make sure new art packets can be added by editing data only, without changing
  page code.

### Coding

- Keep status updates inside the tiny terminal instead of separate "Current
  build / Learning / Next push" cards.
- Make terminal commands clickable later, so they can filter projects or jump to
  related sections.
- Add a small coding-side interactive prop near CS50 or the project cards.
- Make project tags smarter:
  - Completed projects fill their progress bar automatically.
  - Completed status tags turn green.
  - Active/building projects keep a warmer accent.
- Add project detail pages with screenshots, lessons learned, demos, and repo
  links.

### Easter Eggs and Micro-Interactions

- Add hidden palette swaps on art volume covers.
- Add a random sketch button inside each art volume.
- Add page-corner hover reveals with short handwritten-style notes.
- Add a secret sketchbook mode on the Art page.
- Add hidden "studio stamps" users can discover across Coding, Art, and Skill
  Toys.
- Add seasonal decorations or small temporary UI effects.
- Add mobile/tablet motion effects later, such as shake-to-scatter objects.
- Consider an animation library only after the core interactions are chosen.
  Start with CSS for simple effects.
- Consider Elevator.js on long scroll pages, especially Art or Skill Toys.

### Time Tracker / Practice Tracker App

- Plan a separate tracker section or app for importing drawing hours from iHour
  and tracking projects over time.
- MVP tracker data model:
  - project name
  - category, such as drawing, coding, skill toys, study
  - start/end time or duration
  - date
  - notes
  - optional energy/focus rating
- Import path:
  - Export from iHour as CSV if available.
  - Normalize the CSV into a local data file first.
  - Later, build an upload/import screen for CSV files.
- Useful views:
  - weekly hours
  - project streaks
  - time by category
  - recent sessions
  - project timeline
- Behavioral science ideas:
  - Show progress trends instead of only totals.
  - Reward consistency, not just huge sessions.
  - Use small reflection prompts after sessions.
  - Keep goals adjustable so missing a day does not feel like failure.
  - Highlight "next tiny action" for each project.
