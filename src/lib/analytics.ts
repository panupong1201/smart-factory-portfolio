"use client";

type ContactChannel = "send_message" | "line";

export function trackContactClick(channel: ContactChannel) {
  if (typeof window === "undefined") return;

  const payload = {
    event_category: "contact",
    event_label: channel,
    channel,
  };

  const win = window as Window & {
    gtag?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, properties?: Record<string, unknown>) => void };
  };

  if (typeof win.gtag === "function") {
    win.gtag("event", "contact_click", payload);
  }

  if (win.posthog?.capture) {
    win.posthog.capture("contact_click", payload);
  }
}
