"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Wrench,
  Cpu,
  MonitorSmartphone,
  Pen,
  Database,
  Radio,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import GlowHeading from "@/components/ui/GlowHeading";
import ToolIcon from "@/components/ui/ToolIcon";
import {
  tools,
  categoryMeta,
  type ToolCategory,
  type Tool,
} from "@/data/toolsData";
import { projects } from "@/data/projects";
import AIShowcase from "@/components/AIShowcase";

const categoryIcons: Record<ToolCategory, React.ReactNode> = {
  hardware: <Cpu className="w-5 h-5" />,
  software: <MonitorSmartphone className="w-5 h-5" />,
  design: <Pen className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  communication: <Radio className="w-5 h-5" />,
};

const categoryOrder: ToolCategory[] = [
  "hardware",
  "software",
  "design",
  "database",
  "communication",
];

function getProjectTitle(slug: string): string {
  const project = projects.find((p) => p.slug === slug);
  return project?.title ?? slug;
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { lang } = useLanguage();
  const meta = categoryMeta[tool.category];
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 40px ${tool.color}22`,
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-gray-900/60 backdrop-blur-sm border ${meta.border} rounded-2xl p-6 cursor-pointer transition-all hover:bg-gray-900/80 group`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="relative shrink-0">
          <ToolIcon
            siSlug={tool.siSlug}
            name={tool.name}
            color={tool.color}
            size={44}
          />
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity blur-lg"
            style={{ backgroundColor: tool.color }}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + Category */}
          <h3 className="text-white font-bold text-lg leading-tight">
            {tool.name}
          </h3>
          <span className={`text-xs font-mono ${meta.color}`}>
            {lang === "th" ? meta.labelTh : meta.label}
          </span>

          {/* Proficiency Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">
                {lang === "th" ? "ความชำนาญ" : "Proficiency"}
              </span>
              <span className="font-mono" style={{ color: tool.color }}>
                {tool.proficiency}%
              </span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${tool.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.04 + 0.3 }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${tool.color}88, ${tool.color})`,
                  boxShadow: `0 0 10px ${tool.color}66`,
                }}
              />
            </div>
          </div>

          {/* Project Count */}
          <p className="text-gray-500 text-xs mt-2 font-mono">
            {lang === "th" ? "ใช้ใน" : "Used in"} {tool.usedIn.length}{" "}
            {lang === "th" ? "โปรเจค" : "projects"}
          </p>
        </div>
      </div>

      {/* Expanded: Project list */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-white/5 space-y-2"
        >
          {tool.usedIn.map((slug) => (
            <Link
              key={slug}
              href={`/projects/${slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {getProjectTitle(slug)}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ToolkitPage() {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">(
    "all",
  );

  const grouped = categoryOrder.reduce(
    (acc, cat) => {
      acc[cat] = tools.filter((tool) => tool.category === cat);
      return acc;
    },
    {} as Record<ToolCategory, Tool[]>,
  );

  const totalTools = tools.length;
  const totalProjects = new Set(tools.flatMap((t) => t.usedIn)).size;
  const avgProficiency = Math.round(
    tools.reduce((sum, t) => sum + t.proficiency, 0) / tools.length,
  );

  return (
    <main className="bg-[#020202] text-white min-h-screen">
      {/* ─── Header ─── */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-mono mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {lang === "th" ? "กลับหน้าหลัก" : "Back to Home"}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <Wrench className="w-8 h-8 text-blue-400" />
            <h1 className="text-5xl md:text-6xl font-bold">
              <GlowHeading tone="cyan">{t("toolkit.pageTitle")}</GlowHeading>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl"
          >
            {t("toolkit.pageSubtitle")}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 mt-8"
          >
            {[
              {
                value: totalTools,
                label: lang === "th" ? "เครื่องมือ" : "Tools",
                color: "text-cyan-400",
              },
              {
                value: totalProjects,
                label: lang === "th" ? "โปรเจค" : "Projects",
                color: "text-blue-400",
              },
              {
                value: `${avgProficiency}%`,
                label: lang === "th" ? "เฉลี่ยความชำนาญ" : "Avg. Proficiency",
                color: "text-purple-400",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className={`text-3xl font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-gray-500 text-xs font-mono">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Filter Tabs ─── */}
      <section className="sticky top-0 z-40 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all border ${
              activeCategory === "all"
                ? "bg-white/10 border-white/30 text-white"
                : "border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/20"
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            {lang === "th" ? "ทั้งหมด" : "All"} ({totalTools})
          </button>
          {categoryOrder.map((cat) => {
            const meta = categoryMeta[cat];
            const count = grouped[cat].length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all border ${
                  activeCategory === cat
                    ? `${meta.bg} ${meta.border} ${meta.color}`
                    : "border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/20"
                }`}
              >
                {categoryIcons[cat]}
                {lang === "th" ? meta.labelTh : meta.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Tools by Category ─── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {categoryOrder
            .filter(
              (cat) => activeCategory === "all" || activeCategory === cat,
            )
            .map((cat) => {
              const meta = categoryMeta[cat];
              const catTools = grouped[cat];

              return (
                <div key={cat}>
                  {/* Category Header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div
                      className={`p-2 rounded-lg ${meta.bg} border ${meta.border}`}
                    >
                      <span className={meta.color}>
                        {categoryIcons[cat]}
                      </span>
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${meta.color}`}>
                        {lang === "th" ? meta.labelTh : meta.label}
                      </h2>
                      <p className="text-gray-500 text-xs font-mono">
                        {catTools.length}{" "}
                        {lang === "th" ? "เครื่องมือ" : "tools"}
                      </p>
                    </div>
                  </motion.div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catTools.map((tool, i) => (
                      <ToolCard key={tool.id} tool={tool} index={i} />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* ─── AI in Production ─── */}
      <AIShowcase />
    </main>
  );
}
