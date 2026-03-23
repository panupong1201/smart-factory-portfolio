"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Monitor, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { useLanguage } from "./LanguageProvider";
import GlowHeading from "@/components/ui/GlowHeading";

export default function Projects() {
  const { t, lang } = useLanguage();

  const getProjectText = (
    project: (typeof projects)[number],
    field: string,
  ) => {
    const key = `projects.${project.slug}.${field}`;
    const translated = t(key);
    const fallback = project[field as keyof typeof project];

    if (translated !== key && translated.trim() !== "") {
      return translated;
    }

    return typeof fallback === "string" ? fallback : key;
  };

  return (
    <section
      id="projects"
      className="py-24 px-6 bg-[#050505] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-blue-400 mb-3"
            >
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-sm font-mono tracking-widest uppercase">
                <GlowHeading tone="blue">{t("projects.projectDatabase")}</GlowHeading>
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              <GlowHeading tone="blue">{t("projects.selectedWorks")}</GlowHeading>
            </motion.h2>
          </div>
          
          <div className="hidden md:flex flex-col items-end">
             <div className="flex items-center gap-2 mb-1">
                <div className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <p className="text-green-400 text-sm font-mono tracking-wider">
                    {t("projects.statusOnline")}
                </p>
             </div>
             <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-gray-500 text-xs font-mono"
             >
                {t("projects.showingAll")}
             </motion.p>
          </div>
        </div>

        {/* Projects Grid — first project spans 2 cols on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            const hasVideo = project.videoDemo && /\.(mp4|webm|ogg)(\?.*)?$/i.test(project.videoDemo);

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={isFeatured ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <Link href={`/${lang}/projects/${project.slug}`} className="block h-full group">
                  <motion.div 
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className={`relative h-full bg-gray-900/40 backdrop-blur-xl border rounded-2xl overflow-hidden flex flex-col transition-all duration-500 ${
                        isFeatured
                          ? "border-blue-500/30 hover:border-blue-400/60 hover:shadow-[0_0_60px_rgba(59,130,246,0.2)]"
                          : "border-gray-800 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]"
                      }`}
                  >
                    {/* Animated gradient border glow on hover */}
                    <div className="absolute -inset-px bg-linear-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/10 group-hover:to-cyan-500/20 rounded-2xl transition-all duration-700 -z-10 blur-sm" />
                    
                    {/* 1. Image Thumbnail */}
                    <div className={`relative w-full overflow-hidden bg-gray-800 ${isFeatured ? "h-64 md:h-80" : "h-56"}`}>
                      <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent z-10 opacity-60" />
                      
                      <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out">
                        <Image
                          src={project.image}
                          alt={getProjectText(project, "title")}
                          fill
                          loading={index < 3 ? "eager" : "lazy"}
                          unoptimized
                          className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay opacity-40 group-hover:opacity-10 transition-opacity" />
                      </div>

                      {/* Project Number */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="text-white/20 font-mono text-4xl font-black leading-none select-none group-hover:text-white/30 transition-colors">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Year + Category Badge */}
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                        <span className="bg-blue-600/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white border border-blue-400/30 shadow-lg">
                          {project.year}
                        </span>
                        <span className="bg-black/60 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-mono text-white border border-white/10 shadow-lg">
                          {project.tech ? project.tech[0] : t("projects.projectFallback")}
                        </span>
                      </div>

                      {/* Video indicator */}
                      {hasVideo && (
                        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                            <Play className="w-3 h-3 text-red-400 fill-red-400" />
                            <span className="text-white text-[10px] font-mono">DEMO</span>
                          </div>
                        </div>
                      )}

                      {/* Featured badge */}
                      {isFeatured && (
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="bg-linear-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                            ★ Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 2. Content Section */}
                    <div className="p-6 flex flex-col grow relative">
                      
                      <div className="flex justify-between items-start mb-3">
                          <h3 className={`font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 ${isFeatured ? "text-2xl" : "text-xl"}`}>
                            <GlowHeading tone="cyan">{getProjectText(project, "title")}</GlowHeading>
                          </h3>
                          <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-2" />
                      </div>

                      <p className={`text-gray-400 text-sm leading-relaxed mb-6 grow font-light ${isFeatured ? "line-clamp-3" : "line-clamp-2"}`}>
                        {getProjectText(project, "description")}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech?.slice(0, isFeatured ? 5 : 3).map((techItem) => (
                          <span
                            key={techItem}
                            className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 group-hover:border-blue-500/30 group-hover:text-blue-300 transition-colors"
                          >
                            {techItem}
                          </span>
                        ))}
                        {project.tech && project.tech.length > (isFeatured ? 5 : 3) && (
                            <span className="text-[10px] font-mono text-gray-500 px-1 py-1">+{project.tech.length - (isFeatured ? 5 : 3)}</span>
                        )}
                      </div>

                      {/* Footer Metrics */}
                      <div className="pt-4 border-t border-white/5 flex items-center gap-3 mt-auto">
                          <div className="flex h-2 w-2 relative shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </div>
                          <p className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors truncate">
                            {getProjectText(project, "impact")}
                          </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}