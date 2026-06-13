export type SkillToyStatus = "active" | "paused" | "archive";
export type ComboLogTag = "practice" | "trick" | "combo";

export type SkillToy = {
  name: string;
  slug: string;
  progressScore: number;
  currentFocus: string;
  doodleIcon?: string;
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
  notes: string;
  featured: boolean;
};

type SkillToyEntry = Omit<SkillToy, "clipCount" | "status" | "latestComboId">;

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
    progressScore: 64,
    currentFocus: "Cleaner catches and longer flow lines.",
    doodleIcon: "kendama-icon.png",
  },
  {
    name: "Begleri",
    slug: "begleri",
    progressScore: 47,
    currentFocus: "Smoother transfers and longer unbroken sequences.",
    doodleIcon: "begleri-icon.png",
  },
  {
    name: "Yoyo",
    slug: "yoyo",
    progressScore: 38,
    currentFocus: "Basic string control and cleaner binds.",
    doodleIcon: "yoyo-icon.png",
  },
  {
    name: "Pen Spinning",
    slug: "pen-spinning",
    progressScore: 11,
    currentFocus: "ThumbAround consistency and simple links.",
    doodleIcon: "pen-spinning-icon.png",
  },
  {
    name: "Juggling",
    slug: "juggling",
    progressScore: 35,
    currentFocus: "Three-ball rhythm and relaxed throws.",
    doodleIcon: "juggling-icon.png",
  },
  {
    name: "Freestyle Football",
    slug: "freestyle-football",
    progressScore: 2,
    currentFocus: "Learning beginning tricks like toe and knee kicks.",
    doodleIcon: "freestyle-football-icon.png",
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
    notes: "idk",
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
    id: "yoyo-frontstyle-reset-01",
    toySlug: "freestyle-football",
    title: "First Knee Kicks",
    youtubeId: "El5o2PazF8A",
    date: "2026-06-08",
    tag: "practice",
    notes: "Some of my very first knee kicks, AWESOME!!",
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
    id: "kendama-spike-flow-01",
    toySlug: "kendama",
    title: "Spike flow",
    date: "2026-05-31",
    tag: "combo",
    notes: "A faster line that still needs a cleaner finish.",
  },
  {
    id: "pen-spinning-thumbaround-01",
    toySlug: "pen-spinning",
    title: "ThumbAround drill",
    date: "2026-05-28",
    tag: "practice",
    notes: "Tiny desk-session clip for tracking consistency.",
  },
  {
    id: "juggling-cascade-check-01",
    toySlug: "juggling",
    title: "Cascade check",
    date: "2026-05-25",
    tag: "practice",
    notes: "Watching throw height and timing.",
  },
  {
    id: "kendama-cup-flow-01",
    toySlug: "kendama",
    title: "Cup flow warmup",
    date: "2026-05-15",
    tag: "practice",
    notes: "Basic flow warmup before trying harder tricks.",
    featured: false,
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
