export type CodingProject = {
  title: string;
  slug: string;
  status:
    | "building"
    | "shipped"
    | "experiment"
    | "paused"
    | "learning"
    | "complete";
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
    value: "Finishing this very website!",
    tone: "hot",
  },
  {
    label: "Learning",
    value: "Nand2Tetris Course",
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
      "A static personal website for my three loves in life: skill toys, art, and coding. Completely vibecoded",
    stack: ["Astro", "TypeScript", "Tailwind", "GitHub Pages", "ChatGPT"],
    focus: "Replacing placeholders, and adding fun easter eggs.",
    progress: 78,
    links: [
      {
        label: "Repo",
        href: "https://github.com/sophieTheProgrammer/coolPersonalWebsite",
      },
    ],
  },
  {
    title: "CS50x",
    slug: "cs50x",
    status: "complete",
    summary:
      "Semester long intro to computer science from Harvard. Our very goat David Malan.",
    stack: ["C", "Python", "SQL", "HTML/CSS/JS", "Flask", "Jinja"],
    focus: "Learning the foundations of CS : s).",
    progress: 100,
    links: [{ label: "View gallery", href: "/coolPersonalWebsite/art/" }],
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
