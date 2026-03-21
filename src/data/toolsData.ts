export type ToolCategory =
  | "hardware"
  | "software"
  | "design"
  | "database"
  | "communication";

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  proficiency: number; // 0-100
  color: string; // brand hex color
  usedIn: string[]; // project slugs
  /** SimpleIcons slug (https://simpleicons.org) — null means use custom SVG */
  siSlug: string | null;
}

export const categoryMeta: Record<
  ToolCategory,
  { label: string; labelTh: string; color: string; border: string; bg: string }
> = {
  hardware: {
    label: "Hardware / IoT",
    labelTh: "ฮาร์ดแวร์ / IoT",
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-900/20",
  },
  software: {
    label: "Software / Frameworks",
    labelTh: "ซอฟต์แวร์ / เฟรมเวิร์ก",
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-900/20",
  },
  design: {
    label: "Design / CAD",
    labelTh: "ออกแบบ / CAD",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-900/20",
  },
  database: {
    label: "Database / Data",
    labelTh: "ฐานข้อมูล / ข้อมูล",
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-900/20",
  },
  communication: {
    label: "Communication / Analytics",
    labelTh: "การสื่อสาร / วิเคราะห์",
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-900/20",
  },
};

export const tools: Tool[] = [
  // ── HARDWARE / IoT ──────────────────────────────────────────────
  {
    id: "mitsubishi-plc",
    name: "Mitsubishi PLC",
    category: "hardware",
    proficiency: 95,
    color: "#E60012",
    usedIn: ["line-stop-monitoring", "dj-mes-smart-utility-dashboard", "vision-ai"],
    siSlug: null,
  },
  {
    id: "ls-plc",
    name: "LS PLC (XGB)",
    category: "hardware",
    proficiency: 85,
    color: "#0066B3",
    usedIn: ["dj-mes-smart-utility-dashboard"],
    siSlug: null,
  },
  {
    id: "hmi",
    name: "HMI",
    category: "hardware",
    proficiency: 85,
    color: "#00A6ED",
    usedIn: ["line-stop-monitoring", "dj-mes-smart-utility-dashboard"],
    siSlug: null,
  },
  {
    id: "ls-got",
    name: "LS GOT1000-2000",
    category: "hardware",
    proficiency: 80,
    color: "#0066B3",
    usedIn: ["dj-mes-smart-utility-dashboard"],
    siSlug: null,
  },
  {
    id: "cimon",
    name: "Cimon",
    category: "hardware",
    proficiency: 75,
    color: "#4CAF50",
    usedIn: ["dj-mes-smart-utility-dashboard"],
    siSlug: null,
  },
  {
    id: "proface",
    name: "ProFace",
    category: "hardware",
    proficiency: 75,
    color: "#1B3C73",
    usedIn: ["dj-mes-smart-utility-dashboard"],
    siSlug: null,
  },
  {
    id: "vbox",
    name: "V-Box IoT Gateway",
    category: "hardware",
    proficiency: 90,
    color: "#33B5E5",
    usedIn: ["line-stop-monitoring"],
    siSlug: null,
  },
  {
    id: "ai-vision",
    name: "AI Vision IV4",
    category: "hardware",
    proficiency: 85,
    color: "#FF6F00",
    usedIn: ["vision-ai"],
    siSlug: null,
  },
  {
    id: "mqtt",
    name: "MQTT",
    category: "hardware",
    proficiency: 80,
    color: "#660066",
    usedIn: ["line-stop-monitoring", "dj-mes-smart-utility-dashboard"],
    siSlug: "mqtt",
  },
  {
    id: "cctv",
    name: "CCTV System",
    category: "hardware",
    proficiency: 75,
    color: "#607D8B",
    usedIn: ["vision-ai"],
    siSlug: null,
  },

  // ── SOFTWARE / FRAMEWORKS ──────────────────────────────────────
  {
    id: "nextjs",
    name: "Next.js",
    category: "software",
    proficiency: 92,
    color: "#000000",
    usedIn: [
      "line-stop-monitoring",
      "vision-ai",
      "dj-mes-smart-utility-dashboard",
      "pe-dashboard",
      "dongjin-planning-system",
    ],
    siSlug: "nextdotjs",
  },
  {
    id: "react",
    name: "React",
    category: "software",
    proficiency: 90,
    color: "#61DAFB",
    usedIn: ["vision-ai", "dongjin-planning-system"],
    siSlug: "react",
  },
  {
    id: "react-native",
    name: "React Native",
    category: "software",
    proficiency: 75,
    color: "#61DAFB",
    usedIn: ["dj-mes-smart-utility-dashboard"],
    siSlug: "react",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "software",
    proficiency: 88,
    color: "#3178C6",
    usedIn: [
      "dj-mes-smart-utility-dashboard",
      "pe-dashboard",
      "dongjin-planning-system",
    ],
    siSlug: "typescript",
  },
  {
    id: "python",
    name: "Python",
    category: "software",
    proficiency: 80,
    color: "#3776AB",
    usedIn: ["dj-mes-smart-utility-dashboard"],
    siSlug: "python",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "software",
    proficiency: 90,
    color: "#06B6D4",
    usedIn: ["pe-dashboard"],
    siSlug: "tailwindcss",
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "software",
    proficiency: 82,
    color: "#2D3748",
    usedIn: ["pe-dashboard"],
    siSlug: "prisma",
  },
  {
    id: "zustand",
    name: "Zustand",
    category: "software",
    proficiency: 78,
    color: "#764ABC",
    usedIn: ["dongjin-planning-system"],
    siSlug: null,
  },
  {
    id: "framer-motion",
    name: "Framer Motion",
    category: "software",
    proficiency: 85,
    color: "#0055FF",
    usedIn: ["pe-dashboard"],
    siSlug: "framer",
  },
  {
    id: "excel-parser",
    name: "Excel Parser (XLSX)",
    category: "software",
    proficiency: 80,
    color: "#217346",
    usedIn: ["dongjin-planning-system"],
    siSlug: "microsoftexcel",
  },

  // ── DESIGN / CAD ───────────────────────────────────────────────
  {
    id: "sketchup",
    name: "SketchUp 3D",
    category: "design",
    proficiency: 90,
    color: "#005F9E",
    usedIn: ["3d-factory-simulation", "cart-part-design"],
    siSlug: "sketchup",
  },
  {
    id: "autocad",
    name: "AutoCAD",
    category: "design",
    proficiency: 88,
    color: "#E51937",
    usedIn: ["3d-factory-simulation", "cart-part-design"],
    siSlug: "autocad",
  },
  {
    id: "zwcad",
    name: "ZWcad",
    category: "design",
    proficiency: 80,
    color: "#0078D4",
    usedIn: ["cart-part-design"],
    siSlug: null,
  },

  // ── DATABASE / DATA ────────────────────────────────────────────
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    proficiency: 88,
    color: "#4169E1",
    usedIn: [
      "line-stop-monitoring",
      "dj-mes-smart-utility-dashboard",
      "pe-dashboard",
    ],
    siSlug: "postgresql",
  },

  // ── COMMUNICATION / ANALYTICS ──────────────────────────────────
  {
    id: "line-api",
    name: "LINE Messaging API",
    category: "communication",
    proficiency: 82,
    color: "#00C300",
    usedIn: ["dj-mes-smart-utility-dashboard"],
    siSlug: "line",
  },
  {
    id: "telegram",
    name: "Telegram Bot",
    category: "communication",
    proficiency: 78,
    color: "#26A5E4",
    usedIn: ["pe-dashboard"],
    siSlug: "telegram",
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    category: "communication",
    proficiency: 70,
    color: "#E37400",
    usedIn: ["pe-dashboard"],
    siSlug: "googleanalytics",
  },
];
