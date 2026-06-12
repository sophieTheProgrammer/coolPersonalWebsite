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
  studioAvatarDoodle: "studio-avatar.png",
  socialLinks: [
    {
      label: "YouTube",
      href: "https://www.youtube.com/",
      note: "clips",
    },
    {
      label: "GitHub",
      href: siteInfo.repo,
      note: "code",
    },
  ],
  sections: [
    {
      label: "Start here",
      title: "Skill Toys",
      description: "Kendama, Juggling, and more!",
      href: "skill-toys/",
      featured: true,
    },
    {
      title: "Coding",
      description: "Projects, courses, and portfolio",
      href: "coding/",
      featured: false,
    },
    {
      title: "Art",
      description: "A personal collection of illustrations and sketches.",
      href: "art/",
      featured: false,
    },
  ],
};

export const doodleStickers = {
  latest: "latest-sticker.png",
  practice: "practice-sticker.png",
  trick: "trick-sticker.png",
  combo: "combo-sticker.png",
  favorite: "favorite-sticker.png",
};

export const codingDoodles = {
  terminalAccent: "terminal-note.png",
};

export const editMap = [
  {
    label: "Skill toy progress and combo logs",
    path: "src/data/skillToys.ts",
  },
  {
    label: "Art packets, process slider, and sketchbook",
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
