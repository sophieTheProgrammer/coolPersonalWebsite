# Personal Website MVP Plan

## Summary

Build a polished static personal website with a simple animated homepage, a skill toy page focused on video cards, a coding page for projects and current work, and an art gallery page. The MVP should feel clean, playful, and easy to update without needing a backend.

The first priority is the skill toy page: each card represents a toy or practice area, such as Kendama or Begleri, and includes an embedded video showing the most recent trick combo or practice clip.

## Pages

### Home

- Simple polished landing page with your name, short intro, and links to the main sections.
- Small animation on load, such as floating objects, subtle text reveal, or a looping canvas background.
- Featured links to Skill Toys, Coding, and Art.
- Short "what I'm up to" line that can be edited from a content file.

### Skill Toys

- Main MVP feature.
- Card grid for different skill toys and hobbies.
- Initial cards can include:
  - Kendama
  - Begleri
  - Other future toys or practice hobbies
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

## Later Enhancements

- Add a private GUI editor/admin page for uploading art, pasting video links,
  adding coding projects, and updating skill toy progress without editing code.
- Add art Easter eggs such as hidden palette swaps, random sketch buttons, page
  corner reveals, and secret sketchbook mode.
- Add trick history per skill toy.
- Add a "latest combo" badge that highlights the newest video.
- Add filters for toy type, status, or tags.
- Add a small combo timeline for Kendama and Begleri.
- Add a random explore button.
- Add theme switching.
- Add project detail pages.
- Add art process sliders or sketchbook mode.
- Add search or command palette once there is enough content.
