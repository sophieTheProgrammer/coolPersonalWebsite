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
  spotlight?: boolean;
  accent?: "rose" | "teal" | "gold" | "violet";
  links: {
    label: string;
    href: string;
  }[];
};

export const codingProjects: CodingProject[] = [
  {
    title: "Nand2Tetris",
    slug: "nand2tetris",
    status: "learning",
    summary: "Building a computer from first principles",
    stack: ["HDL"],
    spotlight: false,
    accent: "teal",
    links: [
      {
        label: "Repo",
        href: "https://github.com/sophieTheProgrammer/coolPersonalWebsite",
      },
    ],
  },
  {
    title: "Cool Personal Website",
    slug: "cool-personal-website",
    status: "building",
    summary:
      "A static personal website for my three loves in life: skill toys, art, and coding. Completely vibecoded.",
    stack: ["Astro", "TypeScript", "Tailwind", "GitHub Pages", "ChatGPT"],
    spotlight: false,
    accent: "teal",
    links: [
      {
        label: "Repo",
        href: "https://github.com/sophieTheProgrammer/coolPersonalWebsite",
      },
      {
        label:
          "You are looking at this very website : [link it when publihsed]",
        href: "",
      },
    ],
  },

  {
    title: "Godot Game Jams",
    slug: "godot-game-jams",
    status: "complete",
    summary:
      "SUPER FUN game jams made in only a couple days with a SUPER AWESOME TEAM! I did all the art.",
    stack: ["Godot", "Github", "Procreate"],
    spotlight: true,
    accent: "gold",
    links: [
      {
        label: "Itch.io profile",
        href: "https://itch.io/profile/sophietheprogrammer",
      },
    ],
  },
  {
    title: "MK3 Sportz",
    slug: "mk3-sportz",
    status: "complete",
    summary: "Sports info website for Mr. Floyd",
    stack: ["Bootstrap", "Mustache", "Hostinger", "Also vibecoded"],
    spotlight: false,
    accent: "teal",
    links: [
      {
        label: "Website",
        href: "https://mk3sportz.org/",
      },
    ],
  },
  {
    title: "CS50x",
    slug: "cs50x",
    status: "complete",
    spotlight: true,
    summary:
      "Semester long intro to computer science from Harvard, from our very goat David Malan and ddb.",
    stack: ["C", "Python", "SQL", "HTML/CSS/JS", "Flask", "Jinja"],
    accent: "gold",
    links: [
      { label: "View coursework [login get link]", href: "art/" },
      {
        label: "The course!",
        href: "https://cs50.harvard.edu/x/",
      },
      {
        label: "Final Project",
        href: "https://www.youtube.com/watch?v=6KGUI3v9m-o",
      },
    ],
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
