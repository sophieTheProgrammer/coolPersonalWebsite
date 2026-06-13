export type Artwork = {
  title?: string;
  src: string;
  alt?: string;
  note?: string;
};

// Add art here. Put images or PDFs in public/art/, then add one entry below.
export const artworks: Artwork[] = [
  {
    title: "Signal Garden",
    src: "signal-garden-placeholder.png",
    alt: "Placeholder art for Signal Garden",
    note: "Replace this with a real scan or drawing.",
  },
  {
    title: "Pocket Orbit",
    src: "pocket-orbit-placeholder.png",
    alt: "Placeholder art for Pocket Orbit",
  },
  {
    title: "Line Memory",
    src: "line-memory-placeholder.png",
    alt: "Placeholder art for Line Memory",
  },
  {
    title: "Practice Room",
    src: "practice-room-placeholder.png",
    alt: "Placeholder art for Practice Room",
  },
];

export const getArtAssetPath = (src: string) => {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}art/${src}`;
};

export const isPdfArtwork = (src: string) => src.toLowerCase().endsWith(".pdf");
