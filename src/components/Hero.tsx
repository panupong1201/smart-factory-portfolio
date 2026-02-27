"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, Terminal, Cpu, Database, Wifi } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "./LanguageProvider";

// --- 1. Hacker Text Decode Component ---
const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

const HackerText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let iterations = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) return text[index];
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3; // ความเร็วในการ Decode
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  // ป้องกัน Hydration Mismatch
  if (!mounted) return <span className={className}>{text}</span>;

  return <span className={className}>{displayText}</span>;
};

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  // --- 2. 3D Mouse Parallax Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // คำนวณตำแหน่งเมาส์ (-0.5 ถึง 0.5)
    const xPct = clientX / innerWidth - 0.5;
    const yPct = clientY / innerHeight - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  // แปลงค่าเมาส์เป็นองศาการหมุน (3D Rotation)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]); // ก้มเงย
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]); // หันซ้ายขวา
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-50, 50]); // ขยับซ้ายขวา

  return (
    <section 
        ref={ref}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020202] perspective-1000"
        style={{ perspective: "1200px" }} // สำคัญ: กำหนด Perspective ให้ดูมีความลึก
    >
      
      {/* 🔥 3. 3D Moving Floor (พื้นหลังที่ขยับตามเมาส์) */}
      <motion.div 
        style={{ 
            rotateX: rotateX, 
            rotateY: rotateY,
            translateX: translateX,
            transformStyle: "preserve-3d" 
        }}
        className="absolute inset-[-20%] w-[140%] h-[140%] pointer-events-none z-0"
      >
         {/* Grid Floor */}
         <div 
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `
                    linear-gradient(to right, #3b82f6 1px, transparent 1px),
                    linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                transform: "perspective(500px) rotateX(60deg) translateY(100px) scale(2)",
                maskImage: "linear-gradient(to bottom, transparent, black 40%, transparent)"
            }}
         />
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen" />
      </motion.div>

      {/* Content Layer */}
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- LEFT: TEXT CONTENT --- */}
        <div className="space-y-8">
            
            {/* Status Badge */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-blue-950/30 border border-blue-500/30 rounded-full backdrop-blur-md"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-400 text-xs font-mono tracking-widest uppercase">{t("hero.systemOnline")}</span>
            </motion.div>

            {/* Hacker Title */}
            <div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    I BUILD <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
                        <HackerText text="SMART FACTORIES" />
                    </span>
                </h1>
            </div>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed border-l-2 border-blue-500/50 pl-6"
            >
                {t("hero.greeting")}
                Transforming manual production lines into automated intelligence.
            </motion.p>

            {/* Buttons */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="flex flex-wrap gap-4"
            >
                <a href="#projects" className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite]" />
                    <span className="flex items-center gap-2 relative z-10">
                        {t("buttons.exploreSystem")} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </a>
                <a href="/resume.pdf" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-bold transition-all hover:scale-105">
                    {t("buttons.downloadCV")} <Download className="w-5 h-5" />
                </a>
            </motion.div>
        </div>

        {/* --- RIGHT: 3D FLOATING PROFILE --- */}
        <motion.div
            style={{ 
                rotateX: useTransform(mouseY, [-0.5, 0.5], [-10, 10]), // หมุนสวนทางกับพื้นหลัง
                rotateY: useTransform(mouseX, [-0.5, 0.5], [10, -10]),
            }}
            className="relative flex justify-center md:justify-end perspective-1000"
        >
            {/* Tech Ring (วงแหวนหมุน) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-dashed border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />

            {/* Profile Card Container */}
            <div className="relative w-[380px] h-[500px] bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl group">
                
                {/* ⚠️ GLITCH IMAGE LAYER ⚠️ */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/profile/profile2.png" // ใส่รูปจริงของคุณที่นี่
                        alt="Ton"
                        fill
                        className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                        priority
                    />
                    {/* Glitch Overlay (Color Shift) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500 via-transparent to-transparent opacity-0 group-hover:opacity-20 mix-blend-overlay transition-opacity duration-300" />
                </div>

                {/* Floating HUD Elements inside Card */}
                <div className="absolute top-6 right-6 p-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/20">
                    <Wifi className="w-5 h-5 text-green-400 animate-pulse" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Cpu className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-mono uppercase">{t("hero.currentRoleLabel")}</p>
                            <p className="text-white font-bold">{t("hero.currentRole")}</p>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-800 rounded-full mt-4 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ delay: 1, duration: 1.5 }}
                            className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" 
                        />
                    </div>
                    <div className="flex justify-between text-xs font-mono text-gray-500 mt-2">
                        <span>{t("hero.syncing")}</span>
                        <span>{t("hero.syncPercent")}</span>
                    </div>
                </div>

            </div>
        </motion.div>

      </div>
    </section>
  );
}