"use client";

import { useEffect } from "react";

const SESSION_KEY = "visit_logged";

export default function VisitLogger() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
      return;
    }

    const logVisit = async () => {
      try {
        await fetch("/api/analytics/visit", {
          method: "POST",
          cache: "no-store",
        });
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // no-op
      }
    };

    logVisit();
  }, []);

  return null;
}
