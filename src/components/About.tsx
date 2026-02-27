"use client";

import { motion } from "framer-motion";
import { User, Award, Cpu, Zap, Activity, Terminal } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 px-6 bg-[#080808] relative overflow-hidden flex items-center justify-center">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT COLUMN: "The Core System" (ย้าย Stats มาเน้นตรงนี้แทนรูปคน) --- */}
        <div className="relative">
            {/* Tech Decoration Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-dashed border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

            <div className="grid grid-cols-1 gap-4 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-6 h-6 text-blue-400 animate-pulse" />
                    <h3 className="text-xl font-bold text-white tracking-widest uppercase">{t("about.systemCapabilities")}</h3>
                </div>

                {/* Attributes Grid (ขยายใหญ่ขึ้น) */}
                {[
                    { label: t("about.problemSolving"), val: "100%", icon: <Cpu className="w-5 h-5" />, color: "bg-blue-500", desc: t("about.rootCause") },
                    { label: t("about.systemArchitecture"), val: "95%", icon: <Zap className="w-5 h-5" />, color: "bg-yellow-500", desc: t("about.scalableIoT") },
                    { label: t("about.leadership"), val: "90%", icon: <User className="w-5 h-5" />, color: "bg-green-500", desc: t("about.teamManagement") },
                    { label: t("about.resilience"), val: "100%", icon: <Award className="w-5 h-5" />, color: "bg-red-500", desc: t("about.production24x7") },
                ].map((attr, i) => (
                    <motion.div 
                        key={i}
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="bg-gray-900/80 backdrop-blur-md border border-gray-800 p-5 rounded-2xl flex items-center gap-4 hover:border-blue-500/30 transition-all shadow-lg"
                    >
                        <div className={`p-3 rounded-xl ${attr.color} bg-opacity-20 text-white`}>
                            {attr.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-end mb-1">
                                <h4 className="font-bold text-white text-lg">{attr.label}</h4>
                                <span className="font-mono text-blue-300 font-bold">{attr.val}</span>
                            </div>
                            <p className="text-xs text-gray-400 font-light">{attr.desc}</p>
                            
                            {/* Progress Bar */}
                            <div className="h-1.5 w-full bg-gray-800 rounded-full mt-3 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: attr.val }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className={`h-full ${attr.color} shadow-[0_0_10px_currentColor]`} 
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* --- RIGHT COLUMN: The Story (เนื้อหาล้วนๆ) --- */}
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-blue-500" />
                <span className="text-blue-400 font-mono tracking-widest text-sm uppercase">{t("about.operatorDossier")}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
                <span className="block text-white/95 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">{t("about.notJustCode")}</span>
                <span className="relative inline-block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 drop-shadow-[0_0_16px_rgba(99,102,241,0.35)]">
                    {t("about.itsEngineering")}
                    <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-purple-400/80 to-transparent" />
                </span>
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-light border-l-2 border-gray-800 pl-6">
                <p>
                    {t("about.intro")}
                </p>
                <p>
                    {t("about.todayBuild")}
                </p>
                <p>
                    <strong className="text-white">{t("about.mission")}</strong>
                </p>
            </div>

            {/* Signature / Quote */}
            <div className="mt-10 pt-8 border-t border-white/5">
                <p className="font-mono text-sm text-gray-500">{t("about.quote")}</p>
                <p className="mt-2 text-white font-bold">{t("about.signature")}</p>
            </div>

        </div>

      </div>
    </section>
  );
}