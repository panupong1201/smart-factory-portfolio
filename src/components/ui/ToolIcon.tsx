"use client";

import { useEffect, useState } from "react";

interface ToolIconProps {
  siSlug: string | null;
  name: string;
  color: string;
  size?: number;
}

/* ── Custom SVG paths for proprietary/hardware tools ── */
const customIcons: Record<string, string> = {
  // PLC chip icon
  "Mitsubishi PLC":
    "M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h2v2H8V8zm4 0h2v2h-2V8zm-4 4h2v2H8v-2zm4 0h2v2h-2v-2zM2 8H0v2h2V8zm0 4H0v2h2v-2zm20-4h2v2h-2V8zm0 4h2v2h-2v-2zM8 2V0h2v2H8zm4 0V0h2v2h-2zM8 22v2h2v-2H8zm4 0v2h2v-2h-2z",
  "LS PLC (XGB)":
    "M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h2v2H8V8zm4 0h2v2h-2V8zm-4 4h2v2H8v-2zm4 0h2v2h-2v-2zM2 8H0v2h2V8zm0 4H0v2h2v-2zm20-4h2v2h-2V8zm0 4h2v2h-2v-2zM8 2V0h2v2H8zm4 0V0h2v2h-2zM8 22v2h2v-2H8zm4 0v2h2v-2h-2z",
  // HMI touch screen
  HMI: "M2 3h20v14H2V3zm2 2v10h16V5H4zm3 12h10v2H7v-2zm5-9a2 2 0 110 4 2 2 0 010-4z",
  // GOT terminal
  "LS GOT1000-2000":
    "M3 2h18v16H3V2zm2 2v12h14V4H5zm2 2h10v8H7V6zm-3 14h16v2H4v-2z",
  // Network monitor
  Cimon:
    "M12 2a10 10 0 110 20 10 10 0 010-20zm0 2a8 8 0 100 16 8 8 0 000-16zm0 3a1 1 0 011 1v4l3 2a1 1 0 01-1 1.73l-3.5-2.2A1 1 0 0111 13V8a1 1 0 011-1z",
  // ProFace HMI panel
  ProFace:
    "M2 4h20v13H2V4zm2 2v9h16V6H4zm5 11h6v2H9v-2zm-5-8h3v5H4V9zm13 0h3v5h-3V9z",
  // IoT gateway box
  "V-Box IoT Gateway":
    "M2 6h20v12H2V6zm9 2v8h2V8h-2zm-5 2v4h2v-4H6zm10 0v4h2v-4h-2zM7 2l2 3h6l2-3H7z",
  // Camera lens
  "AI Vision IV4":
    "M12 2a10 10 0 110 20 10 10 0 010-20zm0 4a6 6 0 100 12 6 6 0 000-12zm0 3a3 3 0 110 6 3 3 0 010-6z",
  // CCTV camera
  "CCTV System":
    "M18 4l4 4v8l-4 4H6l-4-4V8l4-4h12zm-6 4a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4zm8-3h2v2h-2V7z",
  // Zustand bear
  Zustand:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-2-5c-1.66 0-3-.9-3-2s1.34-2 3-2 3 .9 3 2-1.34 2-3 2z",
  // ZWcad pencil/ruler
  ZWcad:
    "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
};

export default function ToolIcon({ siSlug, name, color, size = 32 }: ToolIconProps) {
  const [svgPath, setSvgPath] = useState<string | null>(null);

  useEffect(() => {
    if (!siSlug) return;

    // Dynamically import from simple-icons
    import("simple-icons")
      .then((mod) => {
        // simple-icons exports named constants like siReact, siNextdotjs, etc.
        const key = `si${siSlug.charAt(0).toUpperCase()}${siSlug.slice(1)}`;
        const icon = (mod as unknown as Record<string, { path: string }>)[key];
        if (icon?.path) {
          setSvgPath(icon.path);
        }
      })
      .catch(() => {
        // Fallback: no icon found
      });
  }, [siSlug]);

  // Custom icon path
  if (!siSlug && customIcons[name]) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        aria-label={name}
      >
        <path d={customIcons[name]} />
      </svg>
    );
  }

  // SimpleIcons loaded
  if (svgPath) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        aria-label={name}
      >
        <path d={svgPath} />
      </svg>
    );
  }

  // Fallback: first letter
  return (
    <div
      className="flex items-center justify-center rounded-lg font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: `${color}22`,
        color: color,
        fontSize: size * 0.45,
      }}
      aria-label={name}
    >
      {name.charAt(0)}
    </div>
  );
}
