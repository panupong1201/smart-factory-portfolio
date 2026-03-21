"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wrench, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import GlowHeading from "@/components/ui/GlowHeading";
import ToolIcon from "@/components/ui/ToolIcon";
import {
  tools,
  categoryMeta,
  type ToolCategory,
  type Tool,
} from "@/data/toolsData";
import { projects } from "@/data/projects";

const categories: ToolCategory[] = [
  "hardware",
  "software",
  "design",
  "database",
  "communication",
];

/* ── Particle burst component ── */
function ParticleBurst({ color, active }: { color: string; active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: 1,
            x: Math.cos((i * 60 * Math.PI) / 180) * 40,
            y: Math.sin((i * 60 * Math.PI) / 180) * 40,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

/* ── Tool chip with particle effect ── */
function ToolChip({
  tool,
  index,
  isSelected,
  onSelect,
}: {
  tool: Tool;
  index: number;
  isSelected: boolean;
  onSelect: (tool: Tool) => void;
}) {
  const [showParticles, setShowParticles] = useState(false);
  const hasAnimated = useRef(false);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: { delay: index * 0.04, type: "spring", stiffness: 200 },
      }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => {
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 600);
          }, index * 40 + 200);
        }
      }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(tool)}
      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
        isSelected
          ? "bg-white/10 border-white/30 shadow-lg"
          : "bg-gray-900/40 border-white/5 hover:border-white/15 hover:bg-gray-900/60"
      }`}
      style={
        isSelected
          ? { boxShadow: `0 0 25px ${tool.color}33` }
          : undefined
      }
    >
      <ParticleBurst color={tool.color} active={showParticles} />
      <div className="relative">
        <ToolIcon
          siSlug={tool.siSlug}
          name={tool.name}
          color={tool.color}
          size={28}
        />
      </div>
      <span className="text-[11px] text-gray-300 font-medium text-center leading-tight whitespace-nowrap">
        {tool.name}
      </span>
    </motion.button>
  );
}

function getProjectTitle(slug: string): string {
  const p = projects.find((pr) => pr.slug === slug);
  return p?.title ?? slug;
}

export default function Toolkit() {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ToolCategory>(
    "hardware",
  );
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const filtered = useMemo(
    () => tools.filter((tool) => tool.category === activeCategory),
    [activeCategory],
  );

  const handleSelect = useCallback((tool: Tool) => {
    setSelectedTool((prev) => (prev?.id === tool.id ? null : tool));
  }, []);

  const handleCategoryChange = useCallback((cat: ToolCategory) => {
    setActiveCategory(cat);
    setSelectedTool(null);
  }, []);

  return (
    <section
      id="toolkit"
      className="py-24 px-6 bg-[#050505] relative overflow-hidden"
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(circle at center, black 20%, transparent 80%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ─── Header ─── */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 border border-white/10 rounded-full bg-white/5 mb-4 backdrop-blur-md"
          >
            <Wrench className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-xs font-mono tracking-widest uppercase">
              {t("toolkit.badge")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            <GlowHeading tone="cyan">{t("toolkit.title")}</GlowHeading>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-xl mx-auto text-sm"
          >
            {t("toolkit.subtitle")}
          </motion.p>
        </div>

        {/* ─── Category Tabs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => {
            const meta = categoryMeta[cat];
            const count = tools.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all border ${
                  activeCategory === cat
                    ? `${meta.bg} ${meta.border} ${meta.color}`
                    : "border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/20"
                }`}
              >
                {lang === "th" ? meta.labelTh : meta.label}{" "}
                <span className="opacity-50">({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* ─── Interactive Tool Chips + Detail Panel ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Tool chips grid */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
              >
                {filtered.map((tool, i) => (
                  <ToolChip
                    key={tool.id}
                    tool={tool}
                    index={i}
                    isSelected={selectedTool?.id === tool.id}
                    onSelect={handleSelect}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Detail panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedTool ? (
                <motion.div
                  key={selectedTool.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  className="bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24"
                >
                  {/* Tool header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative">
                      <ToolIcon
                        siSlug={selectedTool.siSlug}
                        name={selectedTool.name}
                        color={selectedTool.color}
                        size={48}
                      />
                      <div
                        className="absolute inset-0 rounded-full opacity-30 blur-xl"
                        style={{ backgroundColor: selectedTool.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {selectedTool.name}
                      </h3>
                      <span
                        className="text-xs font-mono"
                        style={{ color: selectedTool.color }}
                      >
                        {lang === "th"
                          ? categoryMeta[selectedTool.category].labelTh
                          : categoryMeta[selectedTool.category].label}
                      </span>
                    </div>
                  </div>

                  {/* Proficiency bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-400">
                        {lang === "th" ? "ความชำนาญ" : "Proficiency"}
                      </span>
                      <span
                        className="font-mono font-bold"
                        style={{ color: selectedTool.color }}
                      >
                        {selectedTool.proficiency}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${selectedTool.proficiency}%`,
                        }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${selectedTool.color}88, ${selectedTool.color})`,
                          boxShadow: `0 0 12px ${selectedTool.color}66`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Projects used in */}
                  <div>
                    <p className="text-gray-400 text-xs font-mono mb-2 uppercase tracking-wider">
                      {lang === "th" ? "ใช้ในโปรเจค" : "Used in Projects"}
                    </p>
                    <div className="space-y-2">
                      {selectedTool.usedIn.map((slug) => (
                        <Link
                          key={slug}
                          href={`/projects/${slug}`}
                          className="flex items-center justify-between px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors group"
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor: selectedTool.color,
                              }}
                            />
                            {getProjectTitle(slug)}
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-900/30 border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[280px]"
                >
                  <Wrench className="w-10 h-10 text-gray-600 mb-3" />
                  <p className="text-gray-500 text-sm">
                    {lang === "th"
                      ? "คลิกเครื่องมือเพื่อดูรายละเอียด"
                      : "Click a tool to see details"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── CTA → Full Toolkit Page ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/toolkit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-full font-mono text-sm hover:bg-blue-600/30 hover:border-blue-400 transition-all group"
          >
            {t("toolkit.viewFull")}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
