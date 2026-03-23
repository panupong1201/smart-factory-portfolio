import { prisma } from "@/lib/prisma";

const DEFAULT_INDUSTRIAL_ZONE_KEYWORDS = [
  { keyword: "amata", zone: "Amata Industrial Estate" },
  { keyword: "rojana", zone: "Rojana Industrial Park" },
  { keyword: "wha", zone: "WHA Industrial Estate" },
  { keyword: "eastern seaboard", zone: "Eastern Seaboard Industrial Estate" },
  { keyword: "map ta phut", zone: "Map Ta Phut Industrial Estate" },
  { keyword: "นิคม", zone: "Industrial Estate (Matched Keyword)" },
];

function normalizeOrganization(value?: string | null) {
  return value?.trim().toLowerCase() || "";
}

export async function detectIndustrialZone(organization?: string | null) {
  const normalizedOrganization = normalizeOrganization(organization);
  if (!normalizedOrganization || normalizedOrganization === "unknown") {
    return null;
  }

  const records = await prisma.ipEnrichment.findMany({
    where: { category: "industrial_zone" },
    select: { keyword: true, description: true },
  });

  const databaseMatch = records.find((record) =>
    normalizedOrganization.includes(record.keyword.toLowerCase())
  );

  if (databaseMatch) {
    return databaseMatch.description || databaseMatch.keyword;
  }

  const fallbackMatch = DEFAULT_INDUSTRIAL_ZONE_KEYWORDS.find((record) =>
    normalizedOrganization.includes(record.keyword)
  );

  return fallbackMatch?.zone || null;
}