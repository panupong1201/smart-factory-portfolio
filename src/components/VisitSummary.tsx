"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type VisitSummaryData = {
  total: number;
  versions: Array<{
    version: string;
    visitors: number;
  }>;
};

export default function VisitSummary() {
  const pathname = usePathname();
  const [summary, setSummary] = useState<VisitSummaryData | null>(null);
  const [hasError, setHasError] = useState(false);

  const locale = pathname?.startsWith("/en") ? "en" : "th";
  const text =
    locale === "en"
      ? {
          title: "Visitor Overview",
          loading: "Loading visitor analytics...",
          error: "Unable to load visitor analytics right now.",
          total: "Total Visitors",
          byVersion: "By Version",
          noVersion: "No version data yet",
        }
      : {
          title: "ภาพรวมผู้เข้าชม",
          loading: "กำลังโหลดสถิติผู้เข้าชม...",
          error: "ไม่สามารถโหลดสถิติผู้เข้าชมได้ชั่วคราว",
          total: "ผู้เข้าชมรวมทั้งหมด",
          byVersion: "ตามเวอร์ชัน",
          noVersion: "ยังไม่มีข้อมูลเวอร์ชัน",
        };

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await fetch("/api/analytics/summary", { cache: "no-store" });
        if (!response.ok) {
          setHasError(true);
          return;
        }

        const result = await response.json();
        if (!result?.summary) {
          setHasError(true);
          return;
        }

        setSummary(result.summary);
      } catch {
        setHasError(true);
      }
    };

    loadSummary();
  }, []);

  if (hasError) {
    return (
      <div className="mb-4 rounded-lg border border-red-900/50 bg-red-950/20 px-3 py-2 text-xs text-red-300/80">
        {text.error}
      </div>
    );
  }

  if (!summary) {
    return <div className="mb-4 text-xs text-gray-500">{text.loading}</div>;
  }

  return (
    <div className="mb-5 max-w-3xl mx-auto rounded-xl border border-gray-800/80 bg-linear-to-b from-gray-900/70 to-gray-950/70 p-3 shadow-sm">
      <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-gray-400">{text.title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div className="rounded-lg border border-gray-800 bg-black/20 px-3 py-2.5">
          <p className="text-[11px] text-gray-400">{text.total}</p>
          <p className="mt-0.5 text-2xl font-semibold leading-none text-white">{summary.total}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-black/20 px-3 py-2.5">
          <p className="text-[11px] text-gray-400">{text.byVersion}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {summary.versions.map((item) => (
              <div
                key={item.version}
                className="inline-flex items-center gap-1.5 rounded-md border border-gray-700 bg-gray-900/70 px-2 py-1"
              >
                <span className="text-xs text-gray-300">{item.version}</span>
                <span className="text-xs font-semibold text-white">{item.visitors}</span>
              </div>
            ))}
            {summary.versions.length === 0 && (
              <p className="text-sm text-gray-400">{text.noVersion}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
