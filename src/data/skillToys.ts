export type SkillToyStatus = "active" | "paused" | "archive";

export type SkillToy = {
  name: string;
  slug: string;
  progressScore: number;
  clipCount: number;
  currentFocus: string;
  status: SkillToyStatus;
  latestComboId: string;
};

export type ComboLog = {
  id: string;
  toySlug: string;
  title: string;
  date: string;
  status: string;
  embedUrl: string;
  notes: string;
  featured: boolean;
};

export const skillToys: SkillToy[] = [
  {
    name: "Kendama",
    slug: "kendama",
    progressScore: 64,
    clipCount: 8,
    currentFocus: "Cleaner catches and longer flow lines.",
    status: "active",
    latestComboId: "kendama-lunar-line-01",
  },
  {
    name: "Begleri",
    slug: "begleri",
    progressScore: 47,
    clipCount: 5,
    currentFocus: "Smoother transfers and longer unbroken sequences.",
    status: "active",
    latestComboId: "begleri-rebound-flow-01",
  },
  {
    name: "Yoyo",
    slug: "yoyo",
    progressScore: 38,
    clipCount: 3,
    currentFocus: "Basic string control and cleaner binds.",
    status: "paused",
    latestComboId: "yoyo-frontstyle-reset-01",
  },
  {
    name: "Cardistry",
    slug: "cardistry",
    progressScore: 32,
    clipCount: 2,
    currentFocus: "Packet control and smooth openers.",
    status: "paused",
    latestComboId: "cardistry-packet-opener-01",
  },
  {
    name: "Pen Spinning",
    slug: "pen-spinning",
    progressScore: 28,
    clipCount: 2,
    currentFocus: "ThumbAround consistency and simple links.",
    status: "paused",
    latestComboId: "pen-spinning-thumbaround-01",
  },
  {
    name: "Juggling",
    slug: "juggling",
    progressScore: 35,
    clipCount: 2,
    currentFocus: "Three-ball rhythm and relaxed throws.",
    status: "paused",
    latestComboId: "juggling-cascade-check-01",
  },
  {
    name: "Knucklebone",
    slug: "knucklebone",
    progressScore: 24,
    clipCount: 1,
    currentFocus: "Simple rolls and catches.",
    status: "archive",
    latestComboId: "knucklebone-roll-catch-01",
  },
  {
    name: "Contact Ball",
    slug: "contact-ball",
    progressScore: 21,
    clipCount: 1,
    currentFocus: "Palm isolation and calm movement.",
    status: "archive",
    latestComboId: "contact-ball-isolation-01",
  },
];

export const comboLogs: ComboLog[] = [
  {
    id: "kendama-lunar-line-01",
    toySlug: "kendama",
    title: "Lunar line practice",
    date: "2026-06-11",
    status: "landed",
    embedUrl: "",
    notes: "Working on smoother setup and catch control.",
    featured: true,
  },
  {
    id: "begleri-rebound-flow-01",
    toySlug: "begleri",
    title: "Rebound flow",
    date: "2026-06-10",
    status: "cleaning",
    embedUrl: "",
    notes: "Trying to keep the beads relaxed through the transfer.",
    featured: true,
  },
  {
    id: "kendama-around-japan-01",
    toySlug: "kendama",
    title: "Around Japan reset",
    date: "2026-06-08",
    status: "landed",
    embedUrl: "",
    notes: "A small consistency check before harder lines.",
    featured: true,
  },
  {
    id: "yoyo-frontstyle-reset-01",
    toySlug: "yoyo",
    title: "Frontstyle reset",
    date: "2026-06-07",
    status: "practice",
    embedUrl: "",
    notes: "Keeping this in the log as a baseline for future yoyo clips.",
    featured: true,
  },
  {
    id: "begleri-transfer-check-01",
    toySlug: "begleri",
    title: "Transfer check",
    date: "2026-06-04",
    status: "practice",
    embedUrl: "",
    notes: "Short clip for seeing where the rhythm breaks.",
    featured: true,
  },
  {
    id: "cardistry-packet-opener-01",
    toySlug: "cardistry",
    title: "Packet opener",
    date: "2026-06-02",
    status: "rough",
    embedUrl: "",
    notes: "Messy but useful for watching hand position.",
    featured: true,
  },
  {
    id: "kendama-spike-flow-01",
    toySlug: "kendama",
    title: "Spike flow",
    date: "2026-05-31",
    status: "landed",
    embedUrl: "",
    notes: "A faster line that still needs a cleaner finish.",
    featured: true,
  },
  {
    id: "pen-spinning-thumbaround-01",
    toySlug: "pen-spinning",
    title: "ThumbAround drill",
    date: "2026-05-28",
    status: "practice",
    embedUrl: "",
    notes: "Tiny desk-session clip for tracking consistency.",
    featured: true,
  },
  {
    id: "juggling-cascade-check-01",
    toySlug: "juggling",
    title: "Cascade check",
    date: "2026-05-25",
    status: "practice",
    embedUrl: "",
    notes: "Watching throw height and timing.",
    featured: true,
  },
  {
    id: "knucklebone-roll-catch-01",
    toySlug: "knucklebone",
    title: "Roll and catch",
    date: "2026-05-21",
    status: "archive",
    embedUrl: "",
    notes: "Older clip kept around for variety in the log.",
    featured: true,
  },
  {
    id: "contact-ball-isolation-01",
    toySlug: "contact-ball",
    title: "Palm isolation",
    date: "2026-05-18",
    status: "archive",
    embedUrl: "",
    notes: "Slow control practice from the archive.",
    featured: true,
  },
  {
    id: "kendama-cup-flow-01",
    toySlug: "kendama",
    title: "Cup flow warmup",
    date: "2026-05-15",
    status: "practice",
    embedUrl: "",
    notes: "Basic flow warmup before trying harder tricks.",
    featured: false,
  },
];

export function getToyBySlug(slug: string) {
  return skillToys.find((toy) => toy.slug === slug);
}

export function getComboById(id: string) {
  return comboLogs.find((combo) => combo.id === id);
}

export function getCombosForToy(slug: string) {
  return comboLogs
    .filter((combo) => combo.toySlug === slug)
    .sort((first, second) => second.date.localeCompare(first.date));
}

export function getWeightedProgressLog(limit = 12) {
  const activeSlugs = skillToys
    .filter((toy) => toy.status === "active")
    .map((toy) => toy.slug);
  const selected: ComboLog[] = [];
  const selectedIds = new Set<string>();

  const addCombo = (combo: ComboLog | undefined) => {
    if (!combo || selectedIds.has(combo.id) || selected.length >= limit) return;

    const previousTwo = selected.slice(-2);
    const wouldRepeatThree =
      previousTwo.length === 2 &&
      previousTwo.every((item) => item.toySlug === combo.toySlug);

    if (wouldRepeatThree) return;

    selected.push(combo);
    selectedIds.add(combo.id);
  };

  for (const slug of activeSlugs) {
    const activeCombos = getCombosForToy(slug).filter((combo) => combo.featured);
    addCombo(activeCombos[0]);
    addCombo(activeCombos[1]);
  }

  for (const toy of skillToys.filter((item) => !activeSlugs.includes(item.slug))) {
    addCombo(getCombosForToy(toy.slug).find((combo) => combo.featured));
  }

  for (const combo of [...comboLogs].sort((first, second) => second.date.localeCompare(first.date))) {
    addCombo(combo);
  }

  return selected.slice(0, limit);
}

export function getActivePracticeClips(limit = 5) {
  const activeSlugs = skillToys
    .filter((toy) => toy.status === "active")
    .map((toy) => toy.slug);

  return comboLogs
    .filter((combo) => activeSlugs.includes(combo.toySlug))
    .sort((first, second) => second.date.localeCompare(first.date))
    .slice(0, limit);
}
