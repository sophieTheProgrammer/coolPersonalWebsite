export const siteInfo = {
  name: "Personal Studio",
  description:
    "A tiny workshop for skill toys, coding projects, art studies, and experiments.",
  status: "MVP complete",
  repo: "https://github.com/sophieTheProgrammer/coolPersonalWebsite",
};

export const homeContent = {
  eyebrow: "Personal studio",
  headline: "Hi! I'm Sophie, I keep cool stuff here",
  intro: "Personal site for my skill toy clips, coding projects, and art.",
  sections: [
    {
      label: "Start here",
      title: "Skill Toys",
      description: "Kendama, Juggling, and more!",
      href: "/coolPersonalWebsite/skill-toys/",
      featured: true,
    },
    {
      title: "Coding",
      description: "Projects, courses, and portfolio",
      href: "/coolPersonalWebsite/coding/",
      featured: false,
    },
    {
      title: "Art",
      description: "A personal collection of illustrations and sketches.",
      href: "/coolPersonalWebsite/art/",
      featured: false,
    },
  ],
};

export const editMap = [
  {
    label: "Skill toy progress and combo logs",
    path: "src/data/skillToys.ts",
  },
  {
    label: "Art gallery, palette lab, and process slider",
    path: "src/data/artworks.ts",
  },
  {
    label: "Coding projects and tiny terminal",
    path: "src/data/codingProjects.ts",
  },
  {
    label: "Homepage hero and section links",
    path: "src/data/site.ts",
  },
];
