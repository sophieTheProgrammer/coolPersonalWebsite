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
  notes?: string;
  nextAction?: string;
  spotlight?: boolean;
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
    notes: "Current focus: keep the course notes and HDL experiments easy to revisit.",
    nextAction: "Open the syllabus, then continue the next HDL chip.",
    spotlight: false,
    links: [
      {
        label: "My Coursework",
        href: "https://github.com/sophieTheProgrammer/coolPersonalWebsite",
      },
      {
        label: "Syllabus",
        href: "https://acastano.com/wp-content/uploads/Nand2Tetris-Harvard-2005.pdf",
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
    notes: "Main personal site workbench: art uploads, skill toy logs, and coding projects.",
    nextAction: "Run npm run dev and polish the next page section.",
    spotlight: false,
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
      "SUPER FUN game jams submissions made in only a couple days with a SUPER AWESOME TEAM! I did the art, and a bit of coding.",
    stack: ["Godot", "Github", "Procreate"],
    notes: "Archive the best jam builds and write short postmortems for what worked.",
    nextAction: "Pick one jam and add screenshots or notes.",
    spotlight: true,
    links: [
      {
        label: "Itch.io page",
        href: "https://itch.io/profile/sophietheprogrammer",
      },
      {
        label: "My favorite submission",
        href: "https://superduperpotato.itch.io/broke-photographer",
      },
    ],
  },
  {
    title: "MK3 Sportz",
    slug: "mk3-sportz",
    status: "complete",
    summary: "Sports info website for Mr. Floyd",
    stack: ["Bootstrap", "Mustache", "Hostinger", "Also vibecoded"],
    notes: "Maintenance-style project with practical updates and hosting work.",
    nextAction: "Check the live site and make a tiny update list.",
    spotlight: false,
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
    notes: "Coursework archive with a final project video and course links.",
    nextAction: "Replace placeholder coursework link when the archive is ready.",
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
