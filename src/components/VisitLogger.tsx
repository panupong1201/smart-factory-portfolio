"use client";

import { useEffect } from "react";

const APP_VERSION = process.env.NEXT_PUBLIC_PORTFOLIO_VERSION || "v1";
const SESSION_KEY = `visit_logged_${APP_VERSION}`;

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
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            version: APP_VERSION,
            path: window.location.pathname,
          }),
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
