"use client";

import { useEffect, useState } from "react";

type VisitSummaryData = {
  today: number;
  week: number;
  month: number;
  year: number;
};

export default function VisitSummary() {
  const [summary, setSummary] = useState<VisitSummaryData | null>(null);
  const [hasError, setHasError] = useState(false);

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
      <div className="mb-4 text-xs text-red-400/70">
        ไม่สามารถโหลดสถิติผู้เข้าชมได้ชั่วคราว
      </div>
    );
  }

  if (!summary) {
    return <div className="mb-4 text-xs text-gray-500">กำลังโหลดสถิติผู้เข้าชม...</div>;
  }

  return (
    <div className="mb-5 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Visitor Summary</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="rounded-lg border border-gray-800 bg-gray-900/40 px-3 py-2">
          <p className="text-[11px] text-gray-400">วันนี้</p>
          <p className="text-lg font-semibold text-white">{summary.today}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/40 px-3 py-2">
          <p className="text-[11px] text-gray-400">สัปดาห์นี้</p>
          <p className="text-lg font-semibold text-white">{summary.week}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/40 px-3 py-2">
          <p className="text-[11px] text-gray-400">เดือนนี้</p>
          <p className="text-lg font-semibold text-white">{summary.month}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/40 px-3 py-2">
          <p className="text-[11px] text-gray-400">ปีนี้</p>
          <p className="text-lg font-semibold text-white">{summary.year}</p>
        </div>
      </div>
    </div>
  );
}
