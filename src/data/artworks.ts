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
  featured?: boolean;
  processSrc?: string;
  processSrcs?: string[];
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
  drawingSlugs: string[];
};

export const artworks: Artwork[] = [
  {
    title: "graphite selfportrait",
    slug: "graphite-selfportrait",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/horrors-from-the-1-2-class-page-4-913ae0e3.png",
    featured: true,
    processSrcs: ["/art/horrors-from-the-1-2-class-page-2-5a63cffd.png"],
  },
  {
    title: "geometric form still life",
    slug: "geometric-form-still-life",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/horrors-from-the-1-2-class-page-5-696c7098.png",
    processSrcs: ["/art/horrors-from-the-1-2-class-page-8-459b4150.png","/art/horrors-from-the-1-2-class-page-9-ceabc500.png"],
  },
  {
    title: "capybara graphite",
    slug: "capybara-graphite",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/horrors-from-the-1-2-class-page-6-65446cdf.png",
    featured: true,
    processSrcs: ["/art/horrors-from-the-1-2-class-page-1-2364f9f1.png","/art/horrors-from-the-1-2-class-page-12-5fc5ba11.png"],
  },
  {
    title: "tempura paint color wheel",
    slug: "tempura-paint-color-wheel",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/horrors-from-the-1-2-class-page-7-04b0f8ab.png",
  },
  {
    title: "negative space study",
    slug: "negative-space-study",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/horrors-from-the-1-2-class-page-13-09f787fd.png",
    processSrcs: ["/art/horrors-from-the-1-2-class-page-10-182bcae0.png","/art/horrors-from-the-1-2-class-page-11-58302573.png"],
  },
  {
    title: "graphite value scale",
    slug: "graphite-value-scale",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/horrors-from-the-1-2-class-page-14-4b4723af.png",
  },
  {
    title: "tempura mountain landscape",
    slug: "tempura-mountain-landscape",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/horrors-from-the-1-2-class-page-15-b0cf78f4.png",
    featured: true,
    processSrcs: ["/art/horrors-from-the-1-2-class-page-3-15f7a691.png"],
  },
  {
    title: "pov drawing",
    slug: "pov-drawing",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/notebook-scanss-page-1-f8702a85.png",
  },
  {
    title: "shoe sketchin",
    slug: "shoe-sketchin",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/notebook-scanss-page-2-c49aeb3a.png",
  },
  {
    title: "sketchin",
    slug: "sketchin",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/notebook-scanss-page-3-aeda9e43.png",
  },
  {
    title: "the scarlet ibis",
    slug: "the-scarlet-ibis",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/notebook-scanss-page-4-afd3da8a.png",
  },
  {
    title: "hands sketches",
    slug: "hands-sketches",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/notebook-scanss-page-5-8ec2db40.png",
  },
  {
    title: "of mice and of men: a saga",
    slug: "of-mice-and-of-men-a-saga",
    year: "2026",
    medium: "PDF page",
    mood: "study",
    status: "study",
    note: "Extracted from an uploaded PDF.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/notebook-scanss-page-6-cb0d2470.png",
    processSrc: "/art/notebook-scanss-page-7-947825df.png",
  },
  {
    title: "kymm from purple hyacinth!!!",
    slug: "kymm-from-purple-hyacinth",
    year: "2026",
    medium: "Uploaded scan",
    mood: "study",
    status: "study",
    note: "Uploaded from the local admin helper.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/26-1-2-kymmmm-d50310d1.png",
  },
  {
    title: "Everest",
    slug: "everest",
    year: "2026",
    medium: "Uploaded scan",
    mood: "study",
    status: "study",
    note: "Uploaded from the local admin helper.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc:
      "/art/26-4-18-everest-form-ref-hehe-back-from-hiatus-2e49fdef.png",
  },
  {
    title: "Drawings from Chinese School",
    slug: "drawings-from-chinese-school",
    year: "2026",
    medium: "Uploaded PDF",
    mood: "study",
    status: "study",
    note: "Uploaded from the local admin helper.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    imageSrc: "/art/drawings-from-chinese-school-a85462d0.pdf",
  },
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
    drawingSlugs: [
      "signal-garden",
      "pocket-orbit",
      "line-memory",
      "drawings-from-chinese-school",
      "everest",
    ],
  },
  {
    title: "Studio Studies",
    slug: "studio-studies",
    subtitle: "Rooms, interfaces, posters, and composition practice",
    year: "2025",
    note: "A second pack for more finished-looking studies and placeholders for future drawing batches.",
    drawingSlugs: [
      "quiet-interface",
      "practice-room",
      "tiny-poster",
      "kymm-from-purple-hyacinth",
    ],
  },
  {
    title: "Pocket Sketchbook",
    slug: "pocket-sketchbook",
    subtitle: "Warmups, half-ideas, little discoveries",
    year: "2024-2026",
    note: "A flexible volume for rougher drawings and quick uploads that should not need a full polished gallery entry.",
    drawingSlugs: [
      "line-memory",
      "signal-garden",
      "practice-room",
      "pocket-orbit",
    ],
  },
  {
    title: "HARROWING DRAWINGS FROM CHINESE SCHOOL",
    slug: "harrowing-drawings-from-chinese-school",
    subtitle: "notebook scanss pages",
    year: "2026",
    note: "Created from a PDF upload.",
    drawingSlugs: [
      "pov-drawing",
      "shoe-sketchin",
      "sketchin",
      "the-scarlet-ibis",
      "hands-sketches",
      "of-mice-and-of-men-a-saga",
    ],
  },
  {
    title: "Drawing Painting 1-2",
    slug: "drawing-painting-1-2",
    subtitle: "horrors from the 1-2 class pages",
    year: "2026",
    note: "Created from a PDF upload.",
    drawingSlugs: [
      "graphite-selfportrait",
      "geometric-form-still-life",
      "capybara-graphite",
      "tempura-paint-color-wheel",
      "negative-space-study",
      "graphite-value-scale",
      "tempura-mountain-landscape",
    ],
  },
];

export const currentArtwork: CurrentArtwork = {
  title: "Drawing process for this sunset",
  status: "Blocking in",
  note: "Building a visual language with loose symbols, UI fragments, and toy-like motion shapes.",
  nextStep:
    "Replace placeholder colors with real sketch screenshots and process images.",
};

export const processStages: ProcessStage[] = [
  {
    label: "01",
    title: "Sketch",
    description: "Just trying to get my idea down.",
    palette: ["#fbfaf7", "#1e1b2e", "#d8d3c8"],
    ...{ imageSrc: "/art/img-4453-a8a356bd.jpg" },
  },
  {
    label: "02",
    title: "Lineart",
    description:
      "Putting it really messy lineart. I tried to clean it up but then it lost all the charm, so I kept this one. I used some structure undersketches to check my anatomy since I didn't use a reference. I also set the background grey to keep my eyes from dying.",
    palette: ["#e4577a", "#fbfaf7", "#2d9c8c"],
    ...{ imageSrc: "/art/img-4455-368b249d.jpg" },
  },
  {
    label: "03",
    title: "Color",
    description:
      "Put in base colors, shadows and highlights.\nUsing Add blend mode made it look REALLY COOL.",
    palette: ["#f4d35e", "#e4577a", "#7c6cff"],
    ...{ imageSrc: "/art/img-4458-424ed1c8.jpg" },
  },
  {
    label: "04",
    title: "Cleanup",
    description:
      "I merged all my layers and cleaned up, though I feel like it looks worse than the other phase, because my values weren't really working with this new background I think.",
    palette: ["#1e1b2e", "#2d9c8c", "#fbfaf7"],
    ...{ imageSrc: "/art/img-4459-d3bd589f.jpg" },
  },
  {
    label: "05",
    title: "Moar cleanup",
    description:
      "Used curves to make it look more vibrant and checked it in greyscale so they pop better against background. I also did EVEN MORE cleanup, and caught more mistakes in the lighting. It looks nicer now",
    palette: ["#fff8ed", "#d94f68", "#247d70"],
    ...{ imageSrc: "/art/img-4460-2333f54c.jpg" },
  },
  {
    label: "06",
    title: "Add Background",
    description:
      "I was fumbling with the background until I looked at some backgrounds, looked around at the colors and now wowza it's amazing. The background turned out way better than I thought.",
    palette: ["#fff8ed", "#d94f68", "#247d70"],
    ...{ imageSrc: "/art/img-4461-41be3c23.jpg" },
  },
  {
    label: "07",
    title: "Final touches",
    description:
      "Added more bounce light (HOW DID I FORGET ABOUT THAT.) some overlay layers and stuff around characters to make it pop. and these bokeh lights to fill up that side of the drawing. and just final touches I was procrastinating on. DRAWING DONE!",
    palette: ["#fff8ed", "#d94f68", "#247d70"],
    ...{ imageSrc: "/art/img-4462-3a4d4f31.jpg" },
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
