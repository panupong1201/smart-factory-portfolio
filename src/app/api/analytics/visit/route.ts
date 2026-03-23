import { NextRequest, NextResponse } from "next/server";
import { getAppVersion } from "@/lib/appVersion";
import { detectIndustrialZone } from "@/lib/ipEnrichment";
import { createVisitorId, getVisitSummary, logVisit } from "@/lib/visitorStore";

export const runtime = "nodejs";

type GeoInfo = {
  country: string;
  region: string;
  city: string;
  isp: string;
  organization: string;
  industrialZone: string | null;
};

function getClientMeta(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() || realIp || "unknown";

  const userAgent = req.headers.get("user-agent") || "unknown";
  const language = req.headers.get("accept-language") || "unknown";

  return { ip, userAgent, language };
}

function isPublicIp(ip: string) {
  if (!ip || ip === "unknown") return false;
  if (ip === "::1" || ip === "127.0.0.1") return false;

  const privateIpv4Patterns = [/^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[0-1])\./, /^169\.254\./];
  if (privateIpv4Patterns.some((pattern) => pattern.test(ip))) return false;

  if (ip.startsWith("fc") || ip.startsWith("fd") || ip.startsWith("fe80")) return false;
  return true;
}

async function resolveGeo(req: NextRequest, ip: string): Promise<GeoInfo> {
  const headerCountry = req.headers.get("x-vercel-ip-country") || "";
  const headerRegion = req.headers.get("x-vercel-ip-country-region") || "";
  const headerCity = req.headers.get("x-vercel-ip-city") || "";

  if (headerCountry || headerRegion || headerCity) {
    return {
      country: headerCountry || "unknown",
      region: headerRegion || "unknown",
      city: headerCity || "unknown",
      isp: "unknown",
      organization: "unknown",
      industrialZone: null,
    };
  }

  if (!isPublicIp(ip)) {
    return {
      country: "unknown",
      region: "unknown",
      city: "unknown",
      isp: "unknown",
      organization: "unknown",
      industrialZone: null,
    };
  }

  const ipInfoToken = process.env.IPINFO_TOKEN?.trim();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800);

    const response = ipInfoToken
      ? await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}?token=${encodeURIComponent(ipInfoToken)}`, {
          cache: "no-store",
          signal: controller.signal,
        })
      : await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
    clearTimeout(timeout);

    if (!response.ok) {
      return {
        country: "unknown",
        region: "unknown",
        city: "unknown",
        isp: "unknown",
        organization: "unknown",
        industrialZone: null,
      };
    }

    const data = (await response.json()) as {
      success?: boolean;
      country?: string;
      country_code?: string;
      region?: string;
      city?: string;
      org?: string;
      company?: { name?: string };
      connection?: { isp?: string; org?: string };
    };

    if (data.success === false) {
      return {
        country: "unknown",
        region: "unknown",
        city: "unknown",
        isp: "unknown",
        organization: "unknown",
        industrialZone: null,
      };
    }

    const organization =
      data.org || data.company?.name || data.connection?.org || "unknown";
    const isp = data.connection?.isp || organization || "unknown";
    const industrialZone = await detectIndustrialZone(organization);

    return {
      country: data.country_code || data.country || "unknown",
      region: data.region || "unknown",
      city: data.city || "unknown",
      isp,
      organization,
      industrialZone,
    };
  } catch {
    return {
      country: "unknown",
      region: "unknown",
      city: "unknown",
      isp: "unknown",
      organization: "unknown",
      industrialZone: null,
    };
  }
}

function extractProjectSlug(pathname?: string) {
  if (!pathname) return null;
  const match = pathname.match(/(?:^|\/)projects\/([^/?#]+)/i);
  return match?.[1] || null;
}

export async function POST(req: NextRequest) {
  try {
    const { ip, userAgent, language } = getClientMeta(req);
    const identity = `${ip}|${userAgent}|${language}`;
    const visitorId = createVisitorId(identity);

    let version = getAppVersion();
    let sourcePath: string | undefined;
    try {
      const body = (await req.json()) as { version?: unknown; path?: unknown };
      if (typeof body?.version === "string" && body.version.trim()) {
        version = body.version.trim();
      }
      if (typeof body?.path === "string" && body.path.trim()) {
        sourcePath = body.path.trim();
      }
    } catch {
      // body is optional
    }

    const geo = await resolveGeo(req, ip);
    const pathname = sourcePath || req.nextUrl.pathname;
    const projectSlug = extractProjectSlug(pathname);

    await logVisit({
      visitorId,
      version,
      ip,
      userAgent,
      language,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      isp: geo.isp,
      organization: geo.organization,
      industrialZone: geo.industrialZone,
      sourcePath: pathname,
      projectSlug,
      isBot: /bot|crawler|spider|curl|wget|python/i.test(userAgent),
    });
    const summary = await getVisitSummary();

    return NextResponse.json({ success: true, summary });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to log visit" },
      { status: 500 }
    );
  }
}
