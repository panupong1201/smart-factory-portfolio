import { NextResponse } from "next/server";
import { getVisitSummary } from "@/lib/visitorStore";

export const runtime = "nodejs";

export async function GET() {
  try {
    const summary = await getVisitSummary();
    return NextResponse.json({ success: true, summary });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to load summary" },
      { status: 500 }
    );
  }
}
