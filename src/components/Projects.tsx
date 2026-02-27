"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Monitor } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { useLanguage } from "./LanguageProvider";
import GlowHeading from "@/components/ui/GlowHeading";

export default function Projects() {
  const { t, lang } = useLanguage();
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${lang}/projects/${project.slug}`} className="block h-full group">
                <motion.div 
                    whileHover={{ y: -10 }} // 🚀 Effect 1: ลอยขึ้นเมื่อ Hover
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative h-full bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden flex flex-col hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300"
                >
                  
                  {/* 1. Image Thumbnail with Zoom Effect */}
                  <div className="relative w-full h-56 overflow-hidden bg-gray-800">
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent z-10 opacity-60" />
                    
                    {/* 🚀 Effect 2: รูปภาพซูมเข้าช้าๆ */}
                    <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        loading={index < 3 ? "eager" : "lazy"}
                        unoptimized
                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      {/* Color Overlay */}
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay opacity-40 group-hover:opacity-20 transition-opacity" />
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-20">
                        <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-white border border-white/10 shadow-lg">
                        {project.tech ? project.tech[0] : t("projects.projectFallback")}
                        </span>
                    </div>
                  </div>

                  {/* 2. Content Section */}
                  <div className="p-6 flex flex-col grow relative">
                    
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                          <GlowHeading tone="cyan">{t(`projects.${project.slug}.title`)}</GlowHeading>
                        </h3>
                        {/* 🚀 Effect 3: ลูกศรพุ่งเฉียง */}
                        <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 grow font-light">
                      {t(`projects.${project.slug}.description`)}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech?.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:border-blue-500/30 group-hover:text-blue-300 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech && project.tech.length > 3 && (
                          <span className="text-[10px] font-mono text-gray-500 px-1 py-1">+</span>
                      )}
                    </div>

                    {/* Footer Metrics */}
                    <div className="pt-4 border-t border-white/5 flex items-center gap-3 mt-auto">
                        <div className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                        <p className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors truncate">
                          {t(`projects.${project.slug}.impact`)}
                        </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}