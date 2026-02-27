import { NextRequest, NextResponse } from "next/server";
import { createVisitorId, getVisitSummary, logVisit } from "@/lib/visitorStore";

function getClientIdentity(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() || realIp || "unknown";

  const userAgent = req.headers.get("user-agent") || "unknown";
  const language = req.headers.get("accept-language") || "unknown";

  return `${ip}|${userAgent}|${language}`;
}

export async function POST(req: NextRequest) {
  try {
    const identity = getClientIdentity(req);
    const visitorId = createVisitorId(identity);

    await logVisit(visitorId);
    const summary = await getVisitSummary();

    return NextResponse.json({ success: true, summary });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to log visit" },
      { status: 500 }
    );
  }
}
