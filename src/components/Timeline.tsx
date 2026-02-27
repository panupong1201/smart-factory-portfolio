"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  PenTool, 
  Box, 
  Cpu, 
  Rocket,
  GitCommit
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Timeline() {
  const { t } = useLanguage();
  
  const items = [
  { 
    year: "2022", 
    version: "v1.0",
    title: t("timeline.v1Title"), 
    desc: t("timeline.v1Desc"),
    tech: t("timeline.v1Tech"),
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    color: "border-yellow-500/50 shadow-yellow-500/20"
  },
  { 
    year: "2023", 
    version: "v2.0",
    title: t("timeline.v2Title"), 
    desc: t("timeline.v2Desc"),
    tech: t("timeline.v2Tech"),
    icon: <PenTool className="w-5 h-5 text-blue-400" />,
    color: "border-blue-500/50 shadow-blue-500/20"
  },
  { 
    year: "2024", 
    version: "v3.0",
    title: t("timeline.v3Title"), 
    desc: t("timeline.v3Desc"),
    tech: t("timeline.v3Tech"),
    icon: <Box className="w-5 h-5 text-green-400" />,
    color: "border-green-500/50 shadow-green-500/20"
  },
  { 
    year: "2025", 
    version: "v4.0",
    title: t("timeline.v4Title"), 
    desc: t("timeline.v4Desc"),
    tech: t("timeline.v4Tech"),
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    color: "border-purple-500/50 shadow-purple-500/20"
  },
  { 
    year: "2026", 
    version: "v5.0 Future",
    title: t("timeline.v5Title"), 
    desc: t("timeline.v5Desc"),
    tech: t("timeline.v5Tech"),
    icon: <Rocket className="w-5 h-5 text-red-500" />,
    color: "border-red-500/50 shadow-red-500/20"
  }
];

  return (
    // ✅ Section ยังคง z-20 และ overflow-visible เพื่อให้การ์ดลอยทับ Projects ได้
    <section id="timeline" className="py-24 px-6 bg-[#050505] relative z-20 overflow-visible">
      
      {/* Background Circuit Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #1e1b4b 0%, #000 70%)`
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
             initial={{ opacity: 0, scale: 0.5 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1 border border-purple-500/30 rounded-full bg-purple-900/10 mb-4 backdrop-blur-md"
          >
            <GitCommit className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-xs font-mono tracking-widest uppercase">{t("timeline.versionHistory")}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-2"
          >
            {t("timeline.systemEvolution")}
          </motion.h2>
        </div>

        {/* --- DESKTOP VIEW (Horizontal Circuit) --- */}
        <div className="hidden lg:block relative h-[450px]">
          
          {/* Main Glowing Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 rounded-full transform -translate-y-1/2 overflow-hidden">
             <motion.div 
               initial={{ x: "-100%" }}
               whileInView={{ x: "0%" }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-full w-full bg-gradient-to-r from-blue-900 via-purple-500 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
             />
          </div>

          {/* 🔥 THE ROCKET IS BACK! 🔥 */}
          <motion.div 
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute top-1/2 right-[-30px] transform -translate-y-1/2 translate-x-1/2 z-30"
          >
            <div className="relative group cursor-pointer">
              <Rocket className="w-16 h-16 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] rotate-45 transform group-hover:scale-110 transition-transform" />
              <div className="absolute top-1/2 left-0 w-32 h-16 bg-gradient-to-l from-orange-500 via-red-600 to-transparent blur-2xl transform -translate-y-1/2 -translate-x-full opacity-80 animate-pulse" />
              <div className="absolute top-1/2 left-0 w-40 h-1 bg-blue-400 blur-md transform -translate-y-1/2 -translate-x-full" />
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-5 gap-4 h-full">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                // ✅ Wrapper ยังคงมี hover:z-[100] เพื่อแก้ปัญหาการ์ดซ้อนทับ
                <div key={index} className="relative flex flex-col items-center justify-center h-full group hover:z-[100]">
                  
                  {/* Vertical Connector Line */}
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 60, opacity: 1 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className={`absolute left-1/2 w-[2px] bg-gray-700 transform -translate-x-1/2 group-hover:bg-purple-500 transition-colors duration-300 ${
                      isEven ? "top-1/2 origin-top" : "bottom-1/2 origin-bottom"
                    }`} 
                  />

                  {/* Icon Node */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`absolute top-1/2 left-1/2 w-12 h-12 bg-[#0a0a0a] border-2 ${item.color.split(" ")[0]} rounded-xl flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-125 transition-transform duration-300`}
                  >
                    {item.icon}
                  </motion.div>
                  
                  {/* --- Content Card --- */}
                  <motion.div 
                    initial={{ opacity: 0, y: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.25 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute w-full px-2 cursor-default ${isEven ? "top-[65%]" : "bottom-[65%]"}`}
                  >
                    <div className={`
                        bg-gray-900/95 backdrop-blur-xl border border-gray-700 p-5 rounded-2xl 
                        hover:border-purple-500/50 transition-all 
                        group-hover:shadow-[0_0_50px_rgba(0,0,0,0.8)] group-hover:bg-[#050505]
                        relative overflow-hidden ${item.color}
                        flex flex-col h-auto min-h-[200px]
                    `}>
                      
                      {/* Top Part */}
                      <div>
                        <span className="absolute top-3 right-3 text-[10px] font-mono text-gray-400 bg-black/50 px-2 py-0.5 rounded border border-gray-700">{item.version}</span>
                        <span className="text-blue-400 font-mono font-bold text-sm block mb-1">{item.year}</span>
                        <h3 className="text-base font-bold text-white mb-2 leading-tight">{item.title}</h3>
                        
                        {/* ข้อความ: ปกติซ่อน (...) แต่พอ Hover จะโชว์หมด (line-clamp-none) */}
                        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                            {item.desc}
                        </p>
                      </div>

                      {/* Bottom Part (Tech) */}
                      <div className="pt-2 border-t border-gray-800 flex items-center gap-2 mt-auto">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-[10px] text-purple-300 font-mono truncate">{item.tech}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="lg:hidden relative pl-4">
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-900 via-purple-500 to-blue-500 opacity-50" />
          <div className="space-y-12">
            {items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }} 
                transition={{ delay: index * 0.1 }}
                className="relative pl-12"
              >
                <div className={`absolute left-0 top-0 w-10 h-10 bg-[#0a0a0a] border-2 ${item.color.split(" ")[0]} rounded-lg flex items-center justify-center z-10 shadow-lg`}>
                  {item.icon}
                </div>
                <div className="bg-gray-900/50 border border-gray-800 p-5 rounded-xl backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-blue-400 font-mono text-sm font-bold block">{item.year}</span>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded">{item.version}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    <span className="text-xs text-purple-300 font-mono">{item.tech}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}