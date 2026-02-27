import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

type VisitRecord = {
  visitorId: string;
  timestamp: string;
};

type VisitStore = {
  visits: VisitRecord[];
};

const DATA_DIR = path.join(process.cwd(), "storage");
const DATA_FILE = path.join(DATA_DIR, "visits.json");

let writeQueue: Promise<void> = Promise.resolve();

function getDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getStartOfIsoWeek(now: Date) {
  const date = new Date(now);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getStartOfMonth(now: Date) {
  return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
}

function getStartOfYear(now: Date) {
  return new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
}

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DATA_FILE);
  } catch {
    const initial: VisitStore = { visits: [] };
    await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
}

async function readStore(): Promise<VisitStore> {
  await ensureStoreFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");

  try {
    const parsed = JSON.parse(raw) as VisitStore;
    if (!Array.isArray(parsed.visits)) {
      return { visits: [] };
    }
    return parsed;
  } catch {
    return { visits: [] };
  }
}

async function writeStore(store: VisitStore) {
  writeQueue = writeQueue.then(async () => {
    await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
  });
  await writeQueue;
}

function dedupeByPeriod(visits: VisitRecord[], fromDate: Date, toDate: Date) {
  const unique = new Set<string>();

  for (const visit of visits) {
    const date = parseDate(visit.timestamp);
    if (!date) continue;
    if (date >= fromDate && date <= toDate) {
      unique.add(visit.visitorId);
    }
  }

  return unique.size;
}

export function createVisitorId(rawIdentity: string) {
  return createHash("sha256").update(rawIdentity).digest("hex");
}

export async function logVisit(visitorId: string) {
  const store = await readStore();
  const now = new Date();
  const todayKey = getDayKey(now);

  const alreadyLoggedToday = store.visits.some((visit) => {
    if (visit.visitorId !== visitorId) return false;
    const date = parseDate(visit.timestamp);
    return date ? getDayKey(date) === todayKey : false;
  });

  if (!alreadyLoggedToday) {
    store.visits.push({
      visitorId,
      timestamp: now.toISOString(),
    });
  }

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  store.visits = store.visits.filter((visit) => {
    const date = parseDate(visit.timestamp);
    return !!date && date >= oneYearAgo;
  });

  await writeStore(store);
}

export async function getVisitSummary() {
  const store = await readStore();
  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfWeek = getStartOfIsoWeek(now);
  const startOfMonth = getStartOfMonth(now);
  const startOfYear = getStartOfYear(now);

  return {
    today: dedupeByPeriod(store.visits, startOfToday, now),
    week: dedupeByPeriod(store.visits, startOfWeek, now),
    month: dedupeByPeriod(store.visits, startOfMonth, now),
    year: dedupeByPeriod(store.visits, startOfYear, now),
    updatedAt: now.toISOString(),
  };
}
