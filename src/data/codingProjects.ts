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
  spotlight?: boolean;
  accent?: "rose" | "teal" | "gold" | "violet";
  links: {
    label: string;
    href: string;
  }[];
};

export const codingProjects: CodingProject[] = [
  {
    title: "Cool Personal Website",
    slug: "cool-personal-website",
    status: "building",
    summary:
      "A static personal website for my three loves in life: skill toys, art, and coding. Completely vibecoded.",
    stack: ["Astro", "TypeScript", "Tailwind", "GitHub Pages", "ChatGPT"],
    focus: "Replacing placeholders, and adding fun easter eggs.",
    progress: 78,
    spotlight: true,
    accent: "teal",
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
    accent: "gold",
    links: [{ label: "View gallery", href: "art/" }],
  },
];

export const terminalCommands = [
  {
    command: "now",
    output: "polishing this VERY personal site and replacing placeholders",
  },
  {
    command: "stack",
    output: "astro / typescript / tailwind / chart.js",
  },
  {
    command: "learning",
    output: "working on Nand2Tetris to build a computer from scratch",
  },
];
