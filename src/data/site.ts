export const siteInfo = {
  name: "Personal Studio",
  description:
    "A tiny workshop for skill toys, coding projects, art studies, and experiments.",
  status: "MVP complete",
  repo: "https://github.com/sophieTheProgrammer/coolPersonalWebsite",
};

export const homeContent = {
  eyebrow: "Personal studio",
  headline: "A tiny workshop for motion, making, and experiments.",
  intro:
    "A simple personal site for latest skill toy clips, coding projects, and a small art portfolio. The first real feature is the skill toy wall.",
  sections: [
    {
      label: "Start here",
      title: "Skill Toys",
      description: "Kendama, Begleri, and latest trick combo videos.",
      href: "/coolPersonalWebsite/skill-toys/",
      featured: true,
    },
    {
      title: "Coding",
      description: "Projects, current builds, and experiments.",
      href: "/coolPersonalWebsite/coding/",
      featured: false,
    },
    {
      title: "Art",
      description: "A small gallery for finished pieces and studies.",
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
