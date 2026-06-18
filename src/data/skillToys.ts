export type SkillToyStatus = "active" | "paused" | "archive";
export type ComboLogTag = "practice" | "trick" | "combo";

export type SkillToy = {
  name: string;
  slug: string;
  currentFocus: string;
  doodleIcon: string;
  clipCount: number;
  status: SkillToyStatus;
  latestComboId: string;
};

export type ComboLog = {
  id: string;
  toySlug: string;
  title: string;
  date: string;
  tag: ComboLogTag;
  embedUrl: string;
  youtubeId?: string;
  notes: string;
  featured: boolean;
};

type SkillToyEntry = Omit<
  SkillToy,
  "clipCount" | "status" | "latestComboId" | "doodleIcon"
>;

type ComboLogEntry = Omit<ComboLog, "embedUrl" | "featured"> & {
  embedUrl?: string;
  youtubeId?: string;
  videoUrl?: string;
  featured?: boolean;
};

const activeAfterDays = 30;
const archiveAfterDays = 120;
const today = new Date();

// Add and edit toys here. Clip count, latest clip, and status are automatic.
const skillToyEntries: SkillToyEntry[] = [
  {
    name: "Kendama",
    slug: "kendama",
    currentFocus: "Cleaner catches and longer flow lines.",
  },
  {
    name: "Begleri",
    slug: "begleri",
    currentFocus: "Smoother transfers and longer unbroken sequences.",
  },
  {
    name: "Yoyo",
    slug: "yoyo",
    currentFocus: "Basic string control and cleaner binds.",
  },
  {
    name: "Pen Spinning",
    slug: "pen-spinning",
    currentFocus:
      "not really learning anything rn. but i would want to get good enough for playing takons",
  },
  {
    name: "Juggling",
    slug: "juggling",
    currentFocus: "the box",
  },
  {
    name: "Freestyle Football",
    slug: "freestyle-football",
    currentFocus:
      "A fun way to get exercise at my pace. I'm learning the noob tricks like toe and knee kicks.",
  },
];

// Add new tricks here. Paste either youtubeId, videoUrl, or embedUrl.
const comboLogEntries: ComboLogEntry[] = [
  {
    id: "kendama-lighthouse-flip-01",
    toySlug: "kendama",
    title: "Lunar Flip",
    date: "2026-06-11",
    tag: "trick",
    youtubeId: "-0ThsN6z6hE",
    notes: "",
  },
  {
    id: "kendama-inward-whirlwind-01",
    toySlug: "kendama",
    title: "Inward Whirlwind",
    date: "2026-06-13",
    tag: "trick",
    youtubeId: "9lxmVI3U8dU",
    notes: "",
  },
  {
    id: "freestyle-football-toekicks-01",
    toySlug: "freestyle-football",
    title: "First Toe Kicks",
    date: "2026-06-12",
    tag: "practice",
    youtubeId: "npdo_oqOpw0",
    notes: "Some of my very first toe kicks, wowie!!",
  },
  {
    id: "kendama-earth-turn-01",
    toySlug: "kendama",
    title: "x10 Earth Turn",
    date: "2026-06-06",
    tag: "practice",
    youtubeId: "LKVaUBB1Xoo",
    notes: "Practicing consistency with Skill Addicts record section.",
  },
  {
    id: "freestyle-football-first-knee-kicks-01",
    toySlug: "freestyle-football",
    title: "First Knee Kicks",
    date: "2026-06-12",
    tag: "practice",
    youtubeId: "El5o2PazF8A",
    notes: "",
  },
  {
    id: "freestyle-football-inside-kicks-01",
    toySlug: "freestyle-football",
    title: "First Inside Kicks",
    date: "2026-06-13",
    tag: "practice",
    youtubeId: "n6nJIT22rOQ",
    notes: "",
  },
  {
    id: "begleri-mapo-beginner-combo-01",
    toySlug: "begleri",
    title: "Mapo Beginner Combo Practice",
    date: "2026-06-14",
    tag: "practice",
    youtubeId: "dfpk6vVJxSg",
    notes: "",
  },
  {
    id: "kendama-stilt-01",
    toySlug: "kendama",
    title: "Stilt",
    date: "2026-06-17",
    tag: "practice",
    youtubeId: "wwd6BWKajAA",
    notes: "caught stilt on cam!",
  },
  {
    id: "kendama-ufo-01",
    toySlug: "kendama",
    title: "UFO!!",
    date: "2026-06-17",
    tag: "trick",
    youtubeId: "pG1_A5sLaSc",
    notes: "",
  },
  {
    id: "kendama-palm-balance-01",
    toySlug: "kendama",
    title: "palm balance",
    date: "2026-06-17",
    tag: "trick",
    youtubeId: "pRlrnV7WINw",
    notes: "Almost finished it! Just needed a downspike",
  },
  {
    id: "freestyle-football-flickups-2026-06-17",
    toySlug: "freestyle-football",
    title: "flickups",
    date: "2026-06-17",
    tag: "practice",
    youtubeId: "exCtpbmJF2M",
    notes: "just practice, then i can see how good I am at them later",
  },
  {
    id: "freestyle-football-v-shape-first-practice-2026-06-17",
    toySlug: "freestyle-football",
    title: "v-shape first practice",
    date: "2026-06-17",
    tag: "practice",
    youtubeId: "l6kH2e5SRdA",
    notes:
      "got like 15 reps in EVER from the first time practicing it. just logging it so i can compare my progress",
  },
];

const getYouTubeId = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? "";
    }
    if (parsed.pathname.startsWith("/shorts/")) {
      return parsed.pathname.split("/").filter(Boolean)[1] ?? "";
    }
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/").filter(Boolean)[1] ?? "";
    }
    return parsed.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
};

const getEmbedUrl = (combo: ComboLogEntry) => {
  const youtubeId =
    combo.youtubeId ?? (combo.videoUrl ? getYouTubeId(combo.videoUrl) : "");
  if (youtubeId) {
    return `https://www.youtube-nocookie.com/embed/${youtubeId}`;
  }
  if (combo.embedUrl) {
    return combo.embedUrl.replace(
      "youtube.com/embed",
      "youtube-nocookie.com/embed",
    );
  }
  return "";
};

const daysSince = (date: string) => {
  const updatedAt = new Date(`${date}T00:00:00`);
  return Math.floor((today.getTime() - updatedAt.getTime()) / 86_400_000);
};

const getStatusFromLatestDate = (date: string | undefined): SkillToyStatus => {
  if (!date) return "archive";
  const age = daysSince(date);
  if (age <= activeAfterDays) return "active";
  if (age <= archiveAfterDays) return "paused";
  return "archive";
};

export const comboLogs: ComboLog[] = comboLogEntries.map((combo) => ({
  ...combo,
  embedUrl: getEmbedUrl(combo),
  featured: combo.featured ?? true,
}));

export const skillToys: SkillToy[] = skillToyEntries.map((toy) => {
  const combos = comboLogs
    .filter((combo) => combo.toySlug === toy.slug)
    .sort((first, second) => second.date.localeCompare(first.date));
  const latestCombo = combos[0];

  return {
    ...toy,
    doodleIcon: `${toy.slug}-icon.png`,
    clipCount: combos.length,
    status: getStatusFromLatestDate(latestCombo?.date),
    latestComboId: latestCombo?.id ?? "",
  };
});

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
    const activeCombos = getCombosForToy(slug).filter(
      (combo) => combo.featured,
    );
    addCombo(activeCombos[0]);
    addCombo(activeCombos[1]);
  }

  for (const toy of skillToys.filter(
    (item) => !activeSlugs.includes(item.slug),
  )) {
    addCombo(getCombosForToy(toy.slug).find((combo) => combo.featured));
  }

  for (const combo of [...comboLogs].sort((first, second) =>
    second.date.localeCompare(first.date),
  )) {
    addCombo(combo);
  }

  return selected.slice(0, limit);
}

export function getActivePracticeClips(limit = 6) {
  const activeSlugs = skillToys
    .filter((toy) => toy.status === "active")
    .map((toy) => toy.slug);

  return comboLogs
    .filter((combo) => activeSlugs.includes(combo.toySlug))
    .sort((first, second) => second.date.localeCompare(first.date))
    .slice(0, limit);
}

export function getPracticeNowPool(limit = 12): ComboLog[] {
  const recentCutoffDays = 75;
  const recentCombos = comboLogs.filter(
    (combo) => combo.featured && daysSince(combo.date) <= recentCutoffDays,
  );
  const recentIds = new Set(recentCombos.map((combo) => combo.id));
  const weightedLog = getWeightedProgressLog(limit * 2).filter((combo) =>
    recentIds.has(combo.id),
  );
  const newestCombos = [...recentCombos].sort((first, second) =>
    second.date.localeCompare(first.date),
  );
  const selected: ComboLog[] = [];
  const selectedIds = new Set<string>();

  const addCombo = (combo: ComboLog | undefined) => {
    if (!combo || selectedIds.has(combo.id) || selected.length >= limit) return;
    selected.push(combo);
    selectedIds.add(combo.id);
  };

  weightedLog.forEach(addCombo);
  newestCombos.forEach(addCombo);

  return selected.slice(0, limit);
}
