import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

type VisitRecord = {
  visitorId: string;
  timestamp: string;
  version: string;
};

type VisitLog = {
  visitorId: string;
  timestamp: string;
  version: string;
  ip: string;
  userAgent: string;
  language: string;
  country: string;
  region: string;
  city: string;
};

type GetVisitLogsOptions = {
  limit?: number;
  version?: string;
};

type VisitStore = {
  visits: VisitRecord[];
  logs: VisitLog[];
};

type LogVisitInput = {
  visitorId: string;
  version?: string;
  ip?: string;
  userAgent?: string;
  language?: string;
  country?: string;
  region?: string;
  city?: string;
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
    const initial: VisitStore = { visits: [], logs: [] };
    await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
}

async function readStore(): Promise<VisitStore> {
  await ensureStoreFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");

  try {
    const parsed = JSON.parse(raw) as Partial<VisitStore>;
    const visits = Array.isArray(parsed.visits)
      ? parsed.visits
          .filter((visit): visit is VisitRecord => {
            return (
              !!visit &&
              typeof visit.visitorId === "string" &&
              typeof visit.timestamp === "string"
            );
          })
          .map((visit) => ({
            visitorId: visit.visitorId,
            timestamp: visit.timestamp,
            version:
              typeof visit.version === "string" &&
              visit.version.trim().length > 0
                ? visit.version.trim()
                : "v1",
          }))
      : [];

    const logs = Array.isArray(parsed.logs)
      ? parsed.logs.filter((log): log is VisitLog => {
          return (
            !!log &&
            typeof log.visitorId === "string" &&
            typeof log.timestamp === "string" &&
            typeof log.version === "string" &&
            typeof log.ip === "string" &&
            typeof log.userAgent === "string" &&
            typeof log.language === "string" &&
            typeof log.country === "string" &&
            typeof log.region === "string" &&
            typeof log.city === "string"
          );
        })
      : [];

    return { visits, logs };
  } catch {
    return { visits: [], logs: [] };
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

function normalizeVersion(version?: string) {
  const value = (version || "").trim();
  return value.length > 0 ? value : "v1";
}

function normalizeLimit(limit?: number) {
  if (!Number.isFinite(limit)) return 200;
  const value = Math.floor(limit as number);
  if (value < 1) return 1;
  if (value > 2000) return 2000;
  return value;
}

function pickTop(entries: Record<string, number>, limit = 5) {
  return Object.entries(entries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

export function createVisitorId(rawIdentity: string) {
  return createHash("sha256").update(rawIdentity).digest("hex");
}

export async function logVisit(input: LogVisitInput) {
  const store = await readStore();
  const now = new Date();
  const todayKey = getDayKey(now);
  const version = normalizeVersion(input.version);
  const visitorId = input.visitorId;

  const alreadyLoggedToday = store.visits.some((visit) => {
    if (visit.visitorId !== visitorId) return false;
    const date = parseDate(visit.timestamp);
    return date ? getDayKey(date) === todayKey : false;
  });

  if (!alreadyLoggedToday) {
    store.visits.push({
      visitorId,
      timestamp: now.toISOString(),
      version,
    });
  }

  store.logs.push({
    visitorId,
    timestamp: now.toISOString(),
    version,
    ip: (input.ip || "unknown").trim() || "unknown",
    userAgent: (input.userAgent || "unknown").trim() || "unknown",
    language: (input.language || "unknown").trim() || "unknown",
    country: (input.country || "unknown").trim() || "unknown",
    region: (input.region || "unknown").trim() || "unknown",
    city: (input.city || "unknown").trim() || "unknown",
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

  const totalUnique = new Set(store.visits.map((visit) => visit.visitorId))
    .size;

  const byVersionMap = new Map<string, Set<string>>();
  for (const visit of store.visits) {
    const version = normalizeVersion(visit.version);
    if (!byVersionMap.has(version)) {
      byVersionMap.set(version, new Set<string>());
    }
    byVersionMap.get(version)?.add(visit.visitorId);
  }

  const versions = Array.from(byVersionMap.entries())
    .map(([version, visitors]) => ({ version, visitors: visitors.size }))
    .sort((a, b) => {
      const aNum = Number(a.version.replace(/^v/i, ""));
      const bNum = Number(b.version.replace(/^v/i, ""));
      const aValid = Number.isFinite(aNum);
      const bValid = Number.isFinite(bNum);

      if (aValid && bValid) return aNum - bNum;
      if (aValid) return -1;
      if (bValid) return 1;
      return a.version.localeCompare(b.version);
    });

  const countryCounts: Record<string, number> = {};
  const regionCounts: Record<string, number> = {};
  const cityCounts: Record<string, number> = {};
  for (const log of store.logs) {
    if (log.country && log.country !== "unknown") {
      countryCounts[log.country] = (countryCounts[log.country] || 0) + 1;
    }
    if (log.region && log.region !== "unknown") {
      regionCounts[log.region] = (regionCounts[log.region] || 0) + 1;
    }
    if (log.city && log.city !== "unknown") {
      cityCounts[log.city] = (cityCounts[log.city] || 0) + 1;
    }
  }

  return {
    total: totalUnique,
    versions,
    today: dedupeByPeriod(store.visits, startOfToday, now),
    week: dedupeByPeriod(store.visits, startOfWeek, now),
    month: dedupeByPeriod(store.visits, startOfMonth, now),
    year: dedupeByPeriod(store.visits, startOfYear, now),
    geo: {
      topCountries: pickTop(countryCounts),
      topRegions: pickTop(regionCounts),
      topCities: pickTop(cityCounts),
    },
    updatedAt: now.toISOString(),
  };
}

export async function getVisitLogs(options?: GetVisitLogsOptions) {
  const store = await readStore();
  const limit = normalizeLimit(options?.limit);
  const versionFilter = options?.version?.trim();

  const filtered = store.logs.filter((log) => {
    if (!versionFilter) return true;
    return normalizeVersion(log.version) === normalizeVersion(versionFilter);
  });

  const logs = filtered
    .slice()
    .sort((a, b) => {
      const aTime = parseDate(a.timestamp)?.getTime() || 0;
      const bTime = parseDate(b.timestamp)?.getTime() || 0;
      return bTime - aTime;
    })
    .slice(0, limit);

  return {
    total: filtered.length,
    count: logs.length,
    logs,
  };
}
