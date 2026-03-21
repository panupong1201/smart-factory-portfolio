"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Eye,
  TrendingUp,
  CalendarClock,
  AlertTriangle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import GlowHeading from "@/components/ui/GlowHeading";

interface AIUseCase {
  icon: React.ReactNode;
  titleEn: string;
  titleTh: string;
  descEn: string;
  descTh: string;
  techEn: string;
  techTh: string;
  resultEn: string;
  resultTh: string;
  projectSlug: string | null;
  color: string;
  status: "production" | "prototype" | "planned";
}

const aiUseCases: AIUseCase[] = [
  {
    icon: <Eye className="w-6 h-6" />,
    titleEn: "Computer Vision Inspection",
    titleTh: "ตรวจสอบด้วย Computer Vision",
    descEn:
      "Real-time defect detection using AI Vision IV4 camera integrated with PLC reject logic.",
    descTh:
      "ตรวจจับข้อบกพร่องแบบเรียลไทม์ด้วยกล้อง AI Vision IV4 เชื่อมกับ PLC สำหรับคัดออก",
    techEn: "AI Vision IV4 · PLC · Real-time Streaming",
    techTh: "AI Vision IV4 · PLC · Real-time Streaming",
    resultEn: "Detection speed 30x faster than manual",
    resultTh: "ตรวจจับเร็วกว่าคน 30 เท่า",
    projectSlug: "vision-ai",
    color: "#FF6F00",
    status: "production",
  },
  {
    icon: <CalendarClock className="w-6 h-6" />,
    titleEn: "AI Production Planning",
    titleTh: "วางแผนการผลิตด้วย AI",
    descEn:
      "AI copilot analyzes historical production data and Excel imports to optimize shift scheduling.",
    descTh:
      "AI Copilot วิเคราะห์ข้อมูลการผลิตย้อนหลังและ Excel เพื่อปรับแผนกะให้เหมาะสม",
    techEn: "Next.js · AI Planning Engine · Excel Parser",
    techTh: "Next.js · AI Planning Engine · Excel Parser",
    resultEn: "Reduces planning time by 70%",
    resultTh: "ลดเวลาวางแผนลง 70%",
    projectSlug: "dongjin-planning-system",
    color: "#3178C6",
    status: "production",
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    titleEn: "Anomaly Detection",
    titleTh: "ตรวจจับความผิดปกติ",
    descEn:
      "Dashboard identifies abnormal production patterns and equipment performance drops using statistical analysis.",
    descTh:
      "แดชบอร์ดระบุรูปแบบผิดปกติของการผลิตและประสิทธิภาพเครื่องจักรที่ลดลงด้วยการวิเคราะห์เชิงสถิติ",
    techEn: "PostgreSQL · Prisma · AI Insights · Telegram",
    techTh: "PostgreSQL · Prisma · AI Insights · Telegram",
    resultEn: "Early detection 3-5 days before failure",
    resultTh: "ตรวจพบล่วงหน้า 3-5 วันก่อนเสียหาย",
    projectSlug: "pe-dashboard",
    color: "#E37400",
    status: "production",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    titleEn: "Predictive Maintenance",
    titleTh: "บำรุงรักษาเชิงพยากรณ์",
    descEn:
      "ML model forecasts equipment breakdown based on historical downtime patterns and sensor data.",
    descTh:
      "โมเดล ML พยากรณ์เครื่องจักรเสียจากข้อมูลหยุดทำงานย้อนหลังและข้อมูลเซนเซอร์",
    techEn: "Python · Time Series · PostgreSQL",
    techTh: "Python · Time Series · PostgreSQL",
    resultEn: "Target: reduce unplanned downtime 40%",
    resultTh: "เป้าหมาย: ลดหยุดงานไม่มีแผน 40%",
    projectSlug: null,
    color: "#4CAF50",
    status: "planned",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    titleEn: "AI-Powered Notifications",
    titleTh: "แจ้งเตือนอัจฉริยะด้วย AI",
    descEn:
      "Smart alert system via LINE & Telegram with contextual messages based on event severity and operator roles.",
    descTh:
      "ระบบแจ้งเตือนอัจฉริยะผ่าน LINE และ Telegram ส่งข้อความตามความรุนแรงและบทบาทผู้ใช้",
    techEn: "LINE API · Telegram Bot · Smart Routing",
    techTh: "LINE API · Telegram Bot · Smart Routing",
    resultEn: "Response time reduced 80%",
    resultTh: "เวลาตอบสนองลดลง 80%",
    projectSlug: "dj-mes-smart-utility-dashboard",
    color: "#00C300",
    status: "production",
  },
];

const statusBadge = {
  production: {
    en: "In Production",
    th: "ใช้งานจริง",
    cls: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  prototype: {
    en: "Prototype",
    th: "ต้นแบบ",
    cls: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  planned: {
    en: "Planned",
    th: "วางแผน",
    cls: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
};

export default function AIShowcase() {
  const { lang } = useLanguage();

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="p-2 rounded-lg bg-purple-900/30 border border-purple-500/30">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <GlowHeading tone="purple">
              {lang === "th"
                ? "AI ในงานจริง"
                : "AI in Production"}
            </GlowHeading>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mb-10 text-sm"
        >
          {lang === "th"
            ? "การนำ AI ไปประยุกต์ใช้งานจริงในสายการผลิต — ไม่ใช่แค่ทฤษฎี แต่สร้างผลลัพธ์ที่วัดได้"
            : "Real-world AI applications in production lines — not just theory, but measurable results."}
        </motion.p>

        {/* Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiUseCases.map((uc, i) => {
            const badge = statusBadge[uc.status];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: `0 0 30px ${uc.color}22` }}
                className="bg-gray-900/50 border border-white/5 rounded-2xl p-6 flex flex-col group hover:border-white/15 transition-all"
              >
                {/* Top: icon + status */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{
                      backgroundColor: `${uc.color}15`,
                      color: uc.color,
                    }}
                  >
                    {uc.icon}
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badge.cls}`}
                  >
                    {lang === "th" ? badge.th : badge.en}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg mb-2">
                  {lang === "th" ? uc.titleTh : uc.titleEn}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {lang === "th" ? uc.descTh : uc.descEn}
                </p>

                {/* Tech stack */}
                <p className="text-xs font-mono text-gray-500 mb-3">
                  {lang === "th" ? uc.techTh : uc.techEn}
                </p>

                {/* Result highlight */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium mb-4"
                  style={{
                    backgroundColor: `${uc.color}10`,
                    color: uc.color,
                  }}
                >
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  {lang === "th" ? uc.resultTh : uc.resultEn}
                </div>

                {/* Link to project */}
                {uc.projectSlug && (
                  <Link
                    href={`/projects/${uc.projectSlug}`}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors group/link"
                  >
                    {lang === "th" ? "ดูโปรเจค" : "View Project"}
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
