// src/data/certificatesData.ts
import {
  Trophy,
  CheckCircle2,
  Cpu,
  Zap,
  ShieldCheck,
  Award,
  Monitor,
  Truck,
  Star,
} from "lucide-react";

export const certificatesData = [
  // =========================================================
  // 📅 YEAR 2026 (LATEST)
  // =========================================================
  {
    id: "2026-ceo",
    title: "CEO Special Achievement Award",
    issuer: "Executive Management",
    year: "2026",
    category: "Award",
    description: "Special Achievement Award received directly from the CEO.",
    details: [
      "Awarded for exceptional contribution to company goals.",
      "Recognized for leadership in Smart Factory initiatives.",
      "Acknowledged for driving IT-based office innovation.",
    ],
    image: "/certs/ceo-award.jpg",
    icon: Star,
    color: "border-purple-500/50 hover:border-purple-400",
    glow: "shadow-purple-500/40",
  },
  {
    id: "2026-md",
    title: "MD Special Award",
    issuer: "Managing Director",
    year: "2026",
    category: "Award",
    description:
      "Special recognition from the Managing Director for outstanding performance.",
    details: [
      "Special recognition for exceptional contributions.",
      "Leadership in innovation and system improvement.",
    ],
    image: "/certs/md-award.jpg",
    icon: Trophy,
    color: "border-purple-500/50 hover:border-purple-400",
    glow: "shadow-purple-500/40",
  },
  {
    id: "2026-notebooklm",
    title: "NotebookLM Training",
    issuer: "Ministry of Education & UNICEF Thailand",
    year: "Jan 8, 2026",
    category: "Certificate",
    description:
      "Training on NotebookLM: AI Tools for Education & Knowledge Management.",
    details: [
      "Topic: NotebookLM (AI-driven data synthesis).",
      "Program: ONE TEACHER Thailand Live 2026.",
      "Focus on applying AI for effective knowledge management.",
    ],
    image: "/certs/notebook-lm.jpg",
    icon: Monitor,
    color: "border-blue-500/30 hover:border-blue-400",
    glow: "shadow-blue-500/20",
  },

  // =========================================================
  // 📅 YEAR 2025
  // =========================================================
  {
    id: "2025-esd-100",
    title: "ESD Achievement Award (Score: 100%)",
    issuer: "Quality Assurance Dept",
    year: "Nov 2025",
    category: "Award",
    description:
      "Perfect score (100%) in Electrostatic Discharge (ESD) Control Audit.",
    details: [
      "Achieved 100% score in ESD Audit.",
      "Demonstrated excellence in quality control standards.",
    ],
    image: "/certs/esd-100.jpg",
    icon: CheckCircle2,
    color: "border-emerald-500/30 hover:border-emerald-400",
    glow: "shadow-emerald-500/20",
  },
  {
    id: "2025-iot",
    title: "IoT & Remote Motor Control",
    issuer: "Technical Training",
    year: "2025",
    category: "Certificate",
    description: "Training on Industrial IoT and Remote Motor Control Systems.",
    details: [
      "Duration: 2 Days.",
      "Industrial IoT implementation using ESP32.",
      "Remote control systems via Cloud/Network.",
    ],
    image: "/certs/iot-motor.jpg",
    icon: Cpu,
    color: "border-cyan-500/30 hover:border-cyan-400",
    glow: "shadow-cyan-500/20",
  },
  {
    id: "2025-rookie",
    title: "Rookie Award – Excellent Performance",
    issuer: "Company Annual Awards",
    year: "2025",
    category: "Award",
    description:
      "Awarded to the most outstanding new employee for excellent performance.",
    details: [
      "Recognized for fast learning and adaptability.",
      "High contribution to team KPIs in the first year.",
    ],
    image: "/certs/rookie-award.jpg",
    icon: Trophy,
    color: "border-yellow-500/50 hover:border-yellow-400",
    glow: "shadow-yellow-500/40",
  },
  {
    id: "2025-memo",
    title: "Best Memo Award",
    issuer: "In-direct Department",
    year: "2025",
    category: "Award",
    description:
      "Award for excellence in internal communication and reporting.",
    details: [
      "Recognized for clear, concise, and effective reporting.",
      "Excellence in administrative communication.",
    ],
    image: "/certs/best-memo.jpg",
    icon: Award,
    color: "border-orange-500/30 hover:border-orange-400",
    glow: "shadow-orange-500/20",
  },

  // =========================================================
  // 📅 YEAR 2024
  // =========================================================
  {
    id: "2024-hmi",
    title: "HMI Programming Course",
    issuer: "Automation Training",
    year: "Feb 2024",
    category: "Certificate",
    description:
      "Training course on Human Machine Interface (HMI) Programming.",
    details: [
      "Duration: 2 Days.",
      "Screen design, tag linking, and alarm configuration.",
      "Data Logging setup.",
    ],
    image: "/certs/hmi-course.jpg",
    icon: Monitor,
    color: "border-purple-500/30 hover:border-purple-400",
    glow: "shadow-purple-500/20",
  },
  {
    id: "2024-plc",
    title: "Basic PLC Programming (Mitsubishi)",
    issuer: "Automation Skills",
    year: "2024",
    category: "Certificate",
    description:
      "Training course on Basic PLC Programming (Mitsubishi FX Series).",
    details: [
      "Duration: 2 Days.",
      "GX Works usage & Ladder Logic design.",
      "Basic sequence control & troubleshooting.",
    ],
    image: "/certs/plc-basic.jpg",
    icon: Cpu,
    color: "border-blue-500/30 hover:border-blue-400",
    glow: "shadow-blue-500/20",
  },
  {
    id: "2024-safety",
    title: "Safety Officer – Supervisor Level",
    issuer: "Occupational Safety",
    year: "2024",
    category: "Certificate",
    description: "Certified Safety Officer at Supervisor Level.",
    details: [
      "Duration: 2 Days.",
      "Legal requirements for safety supervisors.",
      "Risk assessment & accident prevention.",
    ],
    image: "/certs/safety-supervisor.jpg",
    icon: ShieldCheck,
    color: "border-green-500/30 hover:border-green-400",
    glow: "shadow-green-500/20",
  },
  {
    id: "2024-supervisor",
    title: "Supervisor Skills Development",
    issuer: "HR & Leadership Dept",
    year: "2024",
    category: "Certificate",
    description: "Development program for Supervisor skills and leadership.",
    details: [
      "Duration: 1 Day.",
      "Team management & effective communication.",
      "Leadership mindset & problem solving.",
    ],
    image: "/certs/supervisor-skills.jpg",
    icon: Award,
    color: "border-orange-500/30 hover:border-orange-400",
    glow: "shadow-orange-500/20",
  },

  // =========================================================
  // 📅 YEAR 2023
  // =========================================================
  {
    id: "2023-elec",
    title: "Building Electrical Technician Lvl 1",
    issuer: "Department of Skill Development",
    year: "2023",
    category: "Certificate",
    description:
      "National Skill Standard Certification: Building Electrician Level 1.",
    details: [
      "Duration: 2 Days.",
      "National Skill Standard Testing.",
      "Building wiring standards & safety compliance.",
    ],
    image: "/certs/elec-level1.jpg",
    icon: Zap,
    color: "border-yellow-500/30 hover:border-yellow-400",
    glow: "shadow-yellow-500/20",
  },
  {
    id: "2023-forklift",
    title: "Safety & Electrical / Forklift Inspection",
    issuer: "Safety Training",
    year: "2023",
    category: "Certificate",
    description: "Training on Forklift Safety & Inspection.",
    details: [
      "Duration: 6 Hours.",
      "Pre-operation inspection checklist.",
      "Safe driving practices & load handling.",
    ],
    image: "/certs/forklift-safety.jpg",
    icon: Truck,
    color: "border-red-500/30 hover:border-red-400",
    glow: "shadow-red-500/20",
  },

  // =========================================================
  // 🚀 ACHIEVEMENTS
  // =========================================================
];
