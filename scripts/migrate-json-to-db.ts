import { promises as fs } from "fs";
import path from "path";
import { config as loadEnv } from "dotenv";

type LegacyVisitRecord = {
  visitorId: string;
  timestamp: string;
  version?: string;
};

type LegacyVisitLog = {
  visitorId: string;
  timestamp: string;
  version?: string;
  ip?: string;
  userAgent?: string;
  language?: string;
  country?: string;
  region?: string;
  city?: string;
};

type LegacyVisitStore = {
  visits?: LegacyVisitRecord[];
  logs?: LegacyVisitLog[];
};

type ImportEntry = Required<Pick<LegacyVisitLog, "visitorId" | "timestamp">> &
  Omit<LegacyVisitLog, "visitorId" | "timestamp">;

const DATA_FILE = path.join(process.cwd(), "storage", "visits.json");
const IMPORT_SOURCE = "legacy-import";
let prismaClient: { $disconnect: () => Promise<void> } | null = null;

loadEnv({ path: ".env.local" });
loadEnv();

function entryKey(entry: { visitorId: string; timestamp: string }) {
  return `${entry.visitorId}|${entry.timestamp}`;
}

async function loadLegacyStore() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw) as LegacyVisitStore;

  return {
    visits: Array.isArray(parsed.visits) ? parsed.visits : [],
    logs: Array.isArray(parsed.logs) ? parsed.logs : [],
  };
}

function buildImportEntries(store: { visits: LegacyVisitRecord[]; logs: LegacyVisitLog[] }) {
  const entries = new Map<string, ImportEntry>();

  for (const log of store.logs) {
    if (!log.visitorId || !log.timestamp) continue;
    entries.set(entryKey(log), {
      visitorId: log.visitorId,
      timestamp: log.timestamp,
      version: log.version,
      ip: log.ip,
      userAgent: log.userAgent,
      language: log.language,
      country: log.country,
      region: log.region,
      city: log.city,
    });
  }

  for (const visit of store.visits) {
    if (!visit.visitorId || !visit.timestamp) continue;

    const key = entryKey(visit);
    if (entries.has(key)) continue;

    entries.set(key, {
      visitorId: visit.visitorId,
      timestamp: visit.timestamp,
      version: visit.version,
      ip: "unknown",
      userAgent: "unknown",
      language: "unknown",
      country: "unknown",
      region: "unknown",
      city: "unknown",
    });
  }

  return Array.from(entries.values()).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}

async function main() {
  const [{ logVisit }, { prisma }] = await Promise.all([
    import("../src/lib/visitorStore"),
    import("../src/lib/prisma"),
  ]);
  prismaClient = prisma;

  const legacyImportCount = await prisma.visit.count({
    where: { sourcePath: IMPORT_SOURCE },
  });

  if (legacyImportCount > 0) {
    console.log(`Legacy import already exists (${legacyImportCount} rows). Skipping.`);
    return;
  }

  const store = await loadLegacyStore();
  const entries = buildImportEntries(store);

  if (entries.length === 0) {
    console.log("No legacy visits found in storage/visits.json");
    return;
  }

  let imported = 0;
  let skipped = 0;

  for (const entry of entries) {
    const existing = await prisma.visit.findFirst({
      where: {
        visitorId: entry.visitorId,
        createdAt: new Date(entry.timestamp),
        sourcePath: IMPORT_SOURCE,
      },
      select: { id: true },
    });

    if (existing) {
      skipped += 1;
      continue;
    }

    await logVisit({
      visitorId: entry.visitorId,
      version: entry.version,
      ip: entry.ip,
      userAgent: entry.userAgent,
      language: entry.language,
      country: entry.country,
      region: entry.region,
      city: entry.city,
      timestamp: entry.timestamp,
      sourcePath: IMPORT_SOURCE,
    });
    imported += 1;
  }

  console.log(`Legacy analytics migration completed. Imported=${imported}, Skipped=${skipped}`);
}

main()
  .catch((error) => {
    console.error("Failed to migrate legacy visits.json into PostgreSQL");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prismaClient?.$disconnect();
  });