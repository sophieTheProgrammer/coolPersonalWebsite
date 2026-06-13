export type Artwork = {
  title: string;
  slug: string;
  year: string;
  medium: string;
  mood: string;
  status: "finished" | "study" | "wip";
  note: string;
  palette: string[];
  imageSrc?: string;
  processSrc?: string;
};

export type ProcessStage = {
  label: string;
  title: string;
  description: string;
  palette: string[];
};

export type CurrentArtwork = {
  title: string;
  status: string;
  note: string;
  nextStep: string;
};

export type ArtVolume = {
  title: string;
  slug: string;
  subtitle: string;
  year: string;
  note: string;
  coverPalette: string[];
  coverDoodle?: string;
  drawingSlugs: string[];
};

export const artworks: Artwork[] = [
  {
    title: "Signal Garden",
    slug: "signal-garden",
    year: "2026",
    medium: "Digital sketch",
    mood: "playful",
    status: "wip",
    note: "Placeholder for a bright experiment with shapes, symbols, and loose motion.",
    palette: ["#e4577a", "#2d9c8c", "#f4d35e"],
  },
  {
    title: "Pocket Orbit",
    slug: "pocket-orbit",
    year: "2026",
    medium: "Illustration",
    mood: "motion",
    status: "study",
    note: "A future spot for toy-inspired motion studies and object drawings.",
    palette: ["#1e1b2e", "#7c6cff", "#fbfaf7"],
  },
  {
    title: "Quiet Interface",
    slug: "quiet-interface",
    year: "2025",
    medium: "UI study",
    mood: "calm",
    status: "finished",
    note: "A clean composition placeholder for interface, layout, or poster work.",
    palette: ["#fbfaf7", "#686176", "#2d9c8c"],
  },
  {
    title: "Practice Room",
    slug: "practice-room",
    year: "2025",
    medium: "Scene study",
    mood: "cozy",
    status: "wip",
    note: "A gallery slot for environments, desks, shelves, or personal spaces.",
    palette: ["#f7b267", "#e4577a", "#1e1b2e"],
  },
  {
    title: "Line Memory",
    slug: "line-memory",
    year: "2025",
    medium: "Sketchbook",
    mood: "study",
    status: "study",
    note: "A placeholder for sketches, warmups, and process work.",
    palette: ["#ffffff", "#1e1b2e", "#d8d3c8"],
  },
  {
    title: "Tiny Poster",
    slug: "tiny-poster",
    year: "2024",
    medium: "Graphic design",
    mood: "bold",
    status: "finished",
    note: "A future home for finished graphic pieces or poster experiments.",
    palette: ["#2d9c8c", "#f4d35e", "#e4577a"],
  },
];

export const artVolumes: ArtVolume[] = [
  {
    title: "Drawings Vol. 01",
    slug: "drawings-vol-01",
    subtitle: "Loose symbols, motion studies, and tiny visual systems",
    year: "2026",
    note: "A starter pack for sketches that feel like UI fragments, toy motion, and abstract little studio notes.",
    coverPalette: ["#e4577a", "#2d9c8c", "#f4d35e"],
    coverDoodle: "drawings-vol-01-cover.png",
    drawingSlugs: ["signal-garden", "pocket-orbit", "line-memory"],
  },
  {
    title: "Studio Studies",
    slug: "studio-studies",
    subtitle: "Rooms, interfaces, posters, and composition practice",
    year: "2025",
    note: "A second pack for more finished-looking studies and placeholders for future drawing batches.",
    coverPalette: ["#1e1b2e", "#fbfaf7", "#7c6cff"],
    coverDoodle: "studio-studies-cover.png",
    drawingSlugs: ["quiet-interface", "practice-room", "tiny-poster"],
  },
  {
    title: "Pocket Sketchbook",
    slug: "pocket-sketchbook",
    subtitle: "Warmups, half-ideas, little discoveries",
    year: "2024-2026",
    note: "A flexible volume for rougher drawings and quick uploads that should not need a full polished gallery entry.",
    coverPalette: ["#f7b267", "#e4577a", "#fbfaf7"],
    coverDoodle: "pocket-sketchbook-cover.png",
    drawingSlugs: [
      "line-memory",
      "signal-garden",
      "practice-room",
      "pocket-orbit",
    ],
  },
];

export const currentArtwork: CurrentArtwork = {
  title: "Signal Garden",
  status: "Blocking in",
  note: "Building a visual language with loose symbols, UI fragments, and toy-like motion shapes.",
  nextStep:
    "Replace placeholder colors with real sketch screenshots and process images.",
};

export const processStages: ProcessStage[] = [
  {
    label: "01",
    title: "Sketch",
    description:
      "Loose thumbnail pass: composition, rhythm, and the first readable idea.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
  },
  {
    label: "02",
    title: "Shape",
    description:
      "Big graphic blocks and visual weight before small details get in the way.",
    palette: ["#e4577a", "#fbfaf7", "#2d9c8c"],
  },
  {
    label: "03",
    title: "Color",
    description:
      "Palette testing, contrast checks, and mood before the final pass.",
    palette: ["#f4d35e", "#e4577a", "#7c6cff"],
  },
  {
    label: "04",
    title: "Finish",
    description:
      "Clean edges, texture, export notes, and a final gallery-ready version.",
    palette: ["#1e1b2e", "#2d9c8c", "#fbfaf7"],
  },
];

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function getArtVolumeBySlug(slug: string) {
  return artVolumes.find((volume) => volume.slug === slug);
}

export function getArtworksForVolume(slug: string) {
  const volume = getArtVolumeBySlug(slug);
  if (!volume) return [];

  return volume.drawingSlugs
    .map((drawingSlug) => getArtworkBySlug(drawingSlug))
    .filter((artwork): artwork is Artwork => Boolean(artwork));
}
