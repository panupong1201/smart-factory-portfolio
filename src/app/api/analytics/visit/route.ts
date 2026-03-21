import { NextRequest, NextResponse } from "next/server";
import { createVisitorId, getVisitSummary, logVisit } from "@/lib/visitorStore";

type GeoInfo = {
  country: string;
  region: string;
  city: string;
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
    };
  }

  if (!isPublicIp(ip)) {
    return { country: "unknown", region: "unknown", city: "unknown" };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800);

    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return { country: "unknown", region: "unknown", city: "unknown" };
    }

    const data = (await response.json()) as {
      success?: boolean;
      country?: string;
      region?: string;
      city?: string;
    };

    if (data.success === false) {
      return { country: "unknown", region: "unknown", city: "unknown" };
    }

    return {
      country: data.country || "unknown",
      region: data.region || "unknown",
      city: data.city || "unknown",
    };
  } catch {
    return { country: "unknown", region: "unknown", city: "unknown" };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { ip, userAgent, language } = getClientMeta(req);
    const identity = `${ip}|${userAgent}|${language}`;
    const visitorId = createVisitorId(identity);

    let version = "v1";
    try {
      const body = (await req.json()) as { version?: unknown };
      if (typeof body?.version === "string" && body.version.trim()) {
        version = body.version.trim();
      }
    } catch {
      // body is optional
    }

    const geo = await resolveGeo(req, ip);

    await logVisit({
      visitorId,
      version,
      ip,
      userAgent,
      language,
      country: geo.country,
      region: geo.region,
      city: geo.city,
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
