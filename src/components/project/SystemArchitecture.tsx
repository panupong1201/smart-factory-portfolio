"use client";

import { 
  Cpu, Wifi, Database, Monitor, Code, Camera, 
  Settings, Cloud, Smartphone, PenTool, Box, Play, Hammer, FileText,
  Activity, Server, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

// Map Icons
const iconMap: Record<string, React.ElementType> = {
  Cpu, Wifi, Database, Monitor, Code, Camera, Settings, Cloud, 
  Smartphone, PenTool, Box, Play, Hammer, FileText
};

export default function SystemArchitecture({ data }: { data: { icon: string; name: string; detail: string }[] }) {
    const { t } = useLanguage();
  if (!data) return null;

  return (
    <div className="w-full relative">
        
        {/* Terminal Header Decor */}
        <div className="flex items-center gap-2 mb-6 font-mono text-xs text-blue-400 opacity-70">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>{t("projects.systemArchitectureLive")}</span>
            <div className="h-px flex-1 bg-linear-to-r from-blue-500/50 to-transparent" />
        </div>

        {/* Main Container */}
        {/* ❌ เอา overflow-x-auto ออก และลบ min-w เพื่อไม่ให้มี Scrollbar */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-blue-500/10 rounded-3xl p-8 md:p-12 relative group w-full">
            
            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

            {/* 🔥 Flex Layout: มือถือ=แนวตั้ง / คอม=แนวนอน (justify-between เพื่อกระจายเต็มจอ) */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 relative z-10 w-full">
                
                {data.map((node, index) => {
                    const IconComponent = iconMap[node.icon] || Cpu;
                    const isLast = index === data.length - 1;
                    const nameKey = `architectureLabels.${node.name}`;
                    const detailKey = `architectureDetails.${node.detail}`;
                    const translatedName = t(nameKey);
                    const translatedDetail = t(detailKey);
                    const displayName = translatedName === nameKey ? node.name : translatedName;
                    const displayDetail = translatedDetail === detailKey ? node.detail : translatedDetail;

                    return (
                        <div key={index} className="flex flex-col lg:flex-row items-center w-full lg:w-auto relative group/node">
                            
                            {/* --- NODE CARD --- */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.15 }}
                                className="relative z-10 w-full lg:w-auto flex justify-center"
                            >
                                <div className="w-full max-w-[200px] h-32 lg:w-36 lg:h-40 relative group/card perspective-1000">
                                    
                                    {/* Card Container */}
                                    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-500 group-hover/card:border-blue-400/50 group-hover/card:shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover/card:scale-105">
                                        
                                        {/* Scanning Line Effect */}
                                        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/50 shadow-[0_0_10px_#60a5fa] -translate-y-full group-hover/card:animate-[scan_2s_linear_infinite]" />
                                        </div>

                                        {/* Icon Wrapper with Pulse */}
                                        <div className="relative mb-3">
                                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                                            <div className="relative w-12 h-12 bg-black/50 border border-blue-500/30 rounded-xl flex items-center justify-center">
                                                <IconComponent className="w-6 h-6 text-blue-300 group-hover/card:text-white transition-colors" />
                                            </div>
                                            
                                            {/* Status Dot */}
                                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black animate-ping" />
                                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
                                        </div>

                                        {/* Text Info */}
                                        <div className="text-center w-full">
                                            <h4 className="text-white font-bold text-sm tracking-wide truncate group-hover/card:text-blue-300 transition-colors">
                                                {displayName}
                                            </h4>
                                            <div className="mt-1.5 inline-block px-2 py-0.5 bg-blue-900/30 border border-blue-500/20 rounded text-[9px] text-blue-200 font-mono truncate max-w-full">
                                                {displayDetail}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>

                            {/* --- CONNECTING LINE (DESKTOP) --- */}
                            {/* แสดงเฉพาะจอใหญ่ (lg ขึ้นไป) */}
                            {!isLast && (
                                <div className="hidden lg:flex flex-1 items-center justify-center relative w-12 xl:w-20 mx-2">
                                    <div className="w-full h-[2px] bg-gray-800 rounded-full overflow-hidden relative">
                                        <motion.div 
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{ 
                                                duration: 1.5, 
                                                repeat: Infinity, 
                                                ease: "linear",
                                                delay: index * 0.2 
                                            }}
                                            className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-blue-500 to-transparent blur-[2px]"
                                        />
                                    </div>

                                    {/* Flying Data Packet */}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 20, opacity: [0, 1, 0] }}
                                        transition={{ 
                                            duration: 1.5, 
                                            repeat: Infinity, 
                                            ease: "linear",
                                            delay: index * 0.2
                                        }}
                                        className="absolute -top-1.5"
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                                    </motion.div>
                                </div>
                            )}

                            {/* --- CONNECTING LINE (MOBILE) --- */}
                            {/* แสดงเฉพาะจอเล็ก (ซ่อนเมื่อถึงจอ lg) */}
                            {!isLast && (
                                <div className="lg:hidden h-12 w-[2px] bg-gray-800 my-1 relative overflow-hidden">
                                     <motion.div 
                                        initial={{ y: "-100%" }}
                                        animate={{ y: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                                        className="absolute w-full h-1/2 bg-linear-to-b from-transparent via-blue-500 to-transparent"
                                    />
                                    {/* Mobile Data Packet */}
                                    <motion.div
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 20, opacity: [0, 1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                                        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
                                    />
                                </div>
                            )}

                        </div>
                    );
                })}
            </div>
            
            {/* Footer Tech Decor */}
            <div className="absolute bottom-4 left-6 flex items-center gap-4 text-[10px] text-gray-600 font-mono">
                <div className="flex items-center gap-1">
                    <Server className="w-3 h-3" />
                    <span>{t("projects.latency")}: 12ms</span>
                </div>
                <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-500/50" />
                    <span>{t("projects.powerStable")}</span>
                </div>
            </div>

        </div>
    </div>
  );
}