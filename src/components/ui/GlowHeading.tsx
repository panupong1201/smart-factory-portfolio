"use client";

import type { ReactNode } from "react";

type GlowTone = "blue" | "purple" | "red" | "green" | "cyan";

type Props = {
  children: ReactNode;
  tone?: GlowTone;
  className?: string;
};

const toneMap: Record<GlowTone, { text: string; glow: string; line: string }> = {
  blue: {
    text: "bg-linear-to-r from-white via-blue-100 to-cyan-300",
    glow: "drop-shadow-[0_0_14px_rgba(56,189,248,0.35)]",
    line: "bg-linear-to-r from-transparent via-cyan-400/80 to-transparent",
  },
  purple: {
    text: "bg-linear-to-r from-white via-purple-100 to-fuchsia-300",
    glow: "drop-shadow-[0_0_14px_rgba(192,132,252,0.35)]",
    line: "bg-linear-to-r from-transparent via-purple-400/80 to-transparent",
  },
  red: {
    text: "bg-linear-to-r from-white via-red-100 to-red-300",
    glow: "drop-shadow-[0_0_14px_rgba(248,113,113,0.35)]",
    line: "bg-linear-to-r from-transparent via-red-400/80 to-transparent",
  },
  green: {
    text: "bg-linear-to-r from-white via-emerald-100 to-green-300",
    glow: "drop-shadow-[0_0_14px_rgba(52,211,153,0.35)]",
    line: "bg-linear-to-r from-transparent via-emerald-400/80 to-transparent",
  },
  cyan: {
    text: "bg-linear-to-r from-white via-cyan-100 to-sky-300",
    glow: "drop-shadow-[0_0_14px_rgba(34,211,238,0.35)]",
    line: "bg-linear-to-r from-transparent via-cyan-400/80 to-transparent",
  },
};

export default function GlowHeading({ children, tone = "blue", className = "" }: Props) {
  const selectedTone = toneMap[tone];

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={`text-transparent bg-clip-text ${selectedTone.text} ${selectedTone.glow}`}>
        {children}
      </span>
      <span className={`pointer-events-none absolute -bottom-1 left-0 h-px w-full ${selectedTone.line}`} />
    </span>
  );
}
