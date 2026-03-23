import { NextRequest, NextResponse } from "next/server";
import { getVisitLogs } from "@/lib/visitorStore";

export const runtime = "nodejs";

function isAuthorized(req: NextRequest) {
  const token = process.env.ANALYTICS_API_KEY;
  if (!token) return true;

  const provided = req.headers.get("x-analytics-key") || "";
  return provided === token;
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limitRaw = searchParams.get("limit");
    const version = searchParams.get("version") || undefined;

    const limit = limitRaw ? Number(limitRaw) : undefined;
    const data = await getVisitLogs({ limit, version });

    return NextResponse.json({ success: true, ...data });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to load logs" },
      { status: 500 }
    );
  }
}
