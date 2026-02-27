"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Cpu, 
  Briefcase, 
  Activity, 
  Database, 
  Wifi, 
  Users, 
  TrendingUp, 
  ClipboardCheck, 
  MonitorPlay 
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, scale: 0.5 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1 border border-white/10 rounded-full bg-white/5 mb-4 backdrop-blur-md"
          >
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-xs font-mono tracking-widest uppercase">{t("skills.title")}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t("skills.professionalSkillSet")}
          </motion.h2>
        </div>

        {/* 3 COLUMNS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. AUTOMATION (Hardware & Power) - Style: Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900/40 backdrop-blur-xl border border-yellow-500/30 p-8 rounded-3xl relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
               <Zap className="w-16 h-16 text-yellow-500" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
               <span className="w-2 h-8 bg-yellow-500 rounded-full"/> {t("skills.automation")}
            </h3>
            <p className="text-yellow-500/80 text-sm font-mono mb-8">{t("skills.industrialControl")}</p>

            <div className="space-y-6">
               {[
                 { name: "PLC (Mitsubishi FX / LS XGB)", val: 95 },
                 { name: "Electrical Design (Load Calc)", val: 90 },
                 { name: "HMI & SCADA Systems", val: 85 },
                 { name: "Sensors & Instrumentation", val: 90 },
                 { name: "Machine Wiring & Assembly", val: 95 },
               ].map((skill, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-sm mb-1 text-gray-300">
                      <span>{skill.name}</span>
                      <span className="text-yellow-400 font-mono">{skill.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.val}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                      />
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>


          {/* 2. AI & SOFTWARE (Digital & Logic) - Style: Tech Tags/Nodes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/40 backdrop-blur-xl border border-cyan-500/30 p-8 rounded-3xl relative group overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
               <Cpu className="w-16 h-16 text-cyan-500" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
               <span className="w-2 h-8 bg-cyan-500 rounded-full"/> {t("skills.aiSoftware")}
            </h3>
            <p className="text-cyan-500/80 text-sm font-mono mb-8">{t("skills.digitalTwin")}</p>

            <div className="flex flex-wrap gap-3">
               {[
                 { name: "Python / YOLO AI", icon: <MonitorPlay className="w-4 h-4"/> },
                 { name: "Next.js / React", icon: <Database className="w-4 h-4"/> },
                 { name: "IoT / ESP32 / MQTT", icon: <Wifi className="w-4 h-4"/> },
                 { name: "TypeScript", icon: <Cpu className="w-4 h-4"/> },
                 { name: "PostgreSQL / SQL", icon: <Database className="w-4 h-4"/> },
                 { name: "Line API Integration", icon: <Wifi className="w-4 h-4"/> },
                 { name: "Real-time Dashboards", icon: <Activity className="w-4 h-4"/> },
               ].map((skill, i) => (
                 <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 py-2 bg-cyan-900/20 border border-cyan-500/30 rounded-lg text-cyan-100 text-sm hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors cursor-default"
                 >
                    {skill.icon}
                    {skill.name}
                 </motion.div>
               ))}
            </div>
            
            {/* Additional Info for Software */}
            <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-gray-400 leading-relaxed">
                  {t("skills.focusGap")} <span className="text-cyan-400">{t("skills.operationalTech")}</span> {t("skills.informationTech")} {t("skills.realtimeDecision")}
                </p>
            </div>
          </motion.div>


          {/* 3. MANAGEMENT (Strategy & People) - Style: Achievement Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/40 backdrop-blur-xl border border-purple-500/30 p-8 rounded-3xl relative group overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
               <Briefcase className="w-16 h-16 text-purple-500" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
               <span className="w-2 h-8 bg-purple-500 rounded-full"/> {t("skills.management")}
            </h3>
            <p className="text-purple-500/80 text-sm font-mono mb-8">{t("skills.leadershipDesc")}</p>

            <div className="space-y-4">
               {[
                 { 
                   title: t("skills.maintenanceLeader"), 
                   sub: t("skills.teamTraining"),
                   icon: <Users className="w-5 h-5 text-purple-300"/> 
                 },
                 { 
                   title: t("skills.costSaving"), 
                   sub: t("skills.optimizationProjects"),
                   icon: <TrendingUp className="w-5 h-5 text-green-400"/> 
                 },
                 { 
                   title: t("skills.pmSystem"), 
                   sub: t("skills.preventiveMaintenance"),
                   icon: <ClipboardCheck className="w-5 h-5 text-blue-300"/> 
                 },
                 { 
                   title: "Project Management", 
                   sub: "3D Sim & Relocation Planning",
                   icon: <Briefcase className="w-5 h-5 text-orange-300"/> 
                 },
               ].map((item, i) => (
                 <motion.div 
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors"
                 >
                    <div className="p-2 bg-black/50 rounded-lg">{item.icon}</div>
                    <div>
                        <h4 className="text-white font-bold text-sm">{item.title}</h4>
                        <p className="text-gray-500 text-xs">{item.sub}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}