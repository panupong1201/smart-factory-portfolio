import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

type SummaryVisit = {
  visitorId: string;
  appVersion: string | null;
  countryCode: string | null;
  region: string | null;
  city: string | null;
  createdAt: Date;
};

type VisitLogRow = {
  visitorId: string;
  createdAt: Date;
  appVersion: string | null;
  ipAddress: string;
  userAgent: string | null;
  language: string | null;
  countryCode: string | null;
  region: string | null;
  city: string | null;
  isp: string | null;
  organization: string | null;
  industrialZone: string | null;
  sourcePath: string | null;
  projectSlug: string | null;
  isBot: boolean;
  isRepeat: boolean;
};

type GetVisitLogsOptions = {
  limit?: number;
  version?: string;
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
  isp?: string;
  organization?: string;
  industrialZone?: string | null;
  sourcePath?: string;
  projectSlug?: string | null;
  isBot?: boolean;
  timestamp?: string | Date;
};

function parseDate(value: string | Date | undefined) {
  if (!value) return new Date();
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
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

function normalizeVersion(version?: string | null) {
  const value = (version || "").trim();
  if (!value) return "v1";
  return value.startsWith("v") ? value : `v${value}`;
}

function normalizeLimit(limit?: number) {
  if (!Number.isFinite(limit)) return 200;
  const value = Math.floor(limit as number);
  if (value < 1) return 1;
  if (value > 2000) return 2000;
  return value;
}

function normalizeText(value?: string | null, fallback = "unknown") {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : fallback;
}

function normalizeNullableText(value?: string | null) {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : null;
}

function pickTop(entries: Record<string, number>, limit = 5) {
  return Object.entries(entries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

function countUniqueWithinRange(visits: SummaryVisit[], fromDate: Date, toDate: Date) {
  const unique = new Set<string>();

  for (const visit of visits) {
    if (visit.createdAt >= fromDate && visit.createdAt <= toDate) {
      unique.add(visit.visitorId);
    }
  }

  return unique.size;
}

export function createVisitorId(rawIdentity: string) {
  return createHash("sha256").update(rawIdentity).digest("hex");
}

export async function logVisit(input: LogVisitInput) {
  const now = parseDate(input.timestamp);
  const version = normalizeVersion(input.version);
  const visitorId = input.visitorId;

  await prisma.$transaction(async (tx) => {
    const existingVisitCount = await tx.visit.count({
      where: { visitorId },
    });

    await tx.visitor.upsert({
      where: { visitorId },
      create: {
        visitorId,
        firstVisit: now,
        lastVisit: now,
        visitCount: 1,
      },
      update: {
        lastVisit: now,
        visitCount: {
          increment: 1,
        },
      },
    });

    await tx.visit.create({
      data: {
        visitorId,
        appVersion: version,
        ipAddress: normalizeText(input.ip),
        userAgent: normalizeText(input.userAgent),
        language: normalizeText(input.language),
        countryCode: normalizeNullableText(input.country)?.slice(0, 2).toUpperCase() ?? null,
        region: normalizeNullableText(input.region),
        city: normalizeNullableText(input.city),
        isp: normalizeNullableText(input.isp),
        organization: normalizeNullableText(input.organization),
        industrialZone: normalizeNullableText(input.industrialZone),
        sourcePath: normalizeNullableText(input.sourcePath),
        projectSlug: normalizeNullableText(input.projectSlug),
        isBot: Boolean(input.isBot),
        isRepeat: existingVisitCount > 0,
        createdAt: now,
      },
    });
  });
}

export async function getVisitSummary() {
  const visits = await prisma.visit.findMany({
    select: {
      visitorId: true,
      appVersion: true,
      countryCode: true,
      region: true,
      city: true,
      createdAt: true,
    },
  });

  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfWeek = getStartOfIsoWeek(now);
  const startOfMonth = getStartOfMonth(now);
  const startOfYear = getStartOfYear(now);

  const totalUnique = new Set(visits.map((visit) => visit.visitorId)).size;

  const byVersionMap = new Map<string, Set<string>>();
  const countryCounts: Record<string, number> = {};
  const regionCounts: Record<string, number> = {};
  const cityCounts: Record<string, number> = {};

  for (const visit of visits) {
    const version = normalizeVersion(visit.appVersion);
    if (!byVersionMap.has(version)) {
      byVersionMap.set(version, new Set<string>());
    }
    byVersionMap.get(version)?.add(visit.visitorId);

    if (visit.countryCode) {
      countryCounts[visit.countryCode] = (countryCounts[visit.countryCode] || 0) + 1;
    }
    if (visit.region) {
      regionCounts[visit.region] = (regionCounts[visit.region] || 0) + 1;
    }
    if (visit.city) {
      cityCounts[visit.city] = (cityCounts[visit.city] || 0) + 1;
    }
  }

  const versions = Array.from(byVersionMap.entries())
    .map(([version, visitors]) => ({ version, visitors: visitors.size }))
    .sort((a, b) => a.version.localeCompare(b.version, undefined, { numeric: true }));

  return {
    total: totalUnique,
    versions,
    today: countUniqueWithinRange(visits, startOfToday, now),
    week: countUniqueWithinRange(visits, startOfWeek, now),
    month: countUniqueWithinRange(visits, startOfMonth, now),
    year: countUniqueWithinRange(visits, startOfYear, now),
    geo: {
      topCountries: pickTop(countryCounts),
      topRegions: pickTop(regionCounts),
      topCities: pickTop(cityCounts),
    },
    updatedAt: now.toISOString(),
  };
}

export async function getVisitLogs(options?: GetVisitLogsOptions) {
  const limit = normalizeLimit(options?.limit);
  const versionFilter = options?.version?.trim();
  const where = versionFilter
    ? { appVersion: normalizeVersion(versionFilter) }
    : undefined;

  const [total, visits] = await Promise.all([
    prisma.visit.count({ where }),
    prisma.visit.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        visitorId: true,
        createdAt: true,
        appVersion: true,
        ipAddress: true,
        userAgent: true,
        language: true,
        countryCode: true,
        region: true,
        city: true,
        isp: true,
        organization: true,
        industrialZone: true,
        sourcePath: true,
        projectSlug: true,
        isBot: true,
        isRepeat: true,
      },
    }),
  ]);

  const logs = visits.map((visit: VisitLogRow) => ({
    visitorId: visit.visitorId,
    timestamp: visit.createdAt.toISOString(),
    version: normalizeVersion(visit.appVersion),
    ip: visit.ipAddress,
    userAgent: visit.userAgent || "unknown",
    language: visit.language || "unknown",
    country: visit.countryCode || "unknown",
    region: visit.region || "unknown",
    city: visit.city || "unknown",
    isp: visit.isp || "unknown",
    organization: visit.organization || "unknown",
    industrialZone: visit.industrialZone || null,
    sourcePath: visit.sourcePath || null,
    projectSlug: visit.projectSlug || null,
    isBot: visit.isBot,
    isRepeat: visit.isRepeat,
  }));

  return {
    total,
    count: logs.length,
    logs,
  };
}
