export type CodingProject = {
  title: string;
  slug: string;
  status: "building" | "shipped" | "experiment" | "paused";
  summary: string;
  stack: string[];
  focus: string;
  progress: number;
  links: {
    label: string;
    href: string;
  }[];
};

export type CodingNowItem = {
  label: string;
  value: string;
  tone: "hot" | "cool" | "quiet";
};

export const codingNow: CodingNowItem[] = [
  {
    label: "Current build",
    value: "Personal site MVP",
    tone: "hot",
  },
  {
    label: "Learning",
    value: "Astro, static content systems, visual polish",
    tone: "cool",
  },
  {
    label: "Next push",
    value: "Project detail pages and real links",
    tone: "quiet",
  },
];

export const codingProjects: CodingProject[] = [
  {
    title: "Cool Personal Website",
    slug: "cool-personal-website",
    status: "building",
    summary:
      "A static personal website for skill toys, art, coding work, and current experiments.",
    stack: ["Astro", "TypeScript", "Tailwind", "GitHub Pages"],
    focus: "Building the first real sections and making each page feel distinct.",
    progress: 58,
    links: [
      { label: "Repo", href: "https://github.com/sophieTheProgrammer/coolPersonalWebsite" },
    ],
  },
  {
    title: "Skill Toy Progress System",
    slug: "skill-toy-progress-system",
    status: "experiment",
    summary:
      "A local-data progression tracker for active hobbies, trick logs, and video placeholders.",
    stack: ["Astro", "Chart.js", "TypeScript"],
    focus: "Balancing active practice with variety across archived toys.",
    progress: 42,
    links: [{ label: "View section", href: "/coolPersonalWebsite/skill-toys/" }],
  },
  {
    title: "Art Gallery System",
    slug: "art-gallery-system",
    status: "experiment",
    summary:
      "An editorial gallery layout with placeholder tiles, mood chips, and future lightbox hooks.",
    stack: ["Astro", "CSS", "Content data"],
    focus: "Making placeholder work feel intentional before real images land.",
    progress: 31,
    links: [{ label: "View gallery", href: "/coolPersonalWebsite/art/" }],
  },
  {
    title: "Tiny Browser Tools",
    slug: "tiny-browser-tools",
    status: "paused",
    summary:
      "A future bucket for small web tools, creative toys, bookmarklets, and useful utilities.",
    stack: ["JavaScript", "Canvas", "Local storage"],
    focus: "Collecting ideas before choosing the first tiny tool.",
    progress: 12,
    links: [],
  },
];

export const terminalCommands = [
  {
    command: "now",
    output: "building the personal site and shaping the first project pages",
  },
  {
    command: "stack",
    output: "astro / typescript / tailwind / chart.js",
  },
  {
    command: "next",
    output: "replace placeholders with real projects, videos, and artwork",
  },
];
