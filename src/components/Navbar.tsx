"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);

    if (latest > previous && latest > 150) setIsHidden(true);
    else setIsHidden(false);
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_0_30px_rgba(124,58,237,0.1)]" 
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      {/* เส้นแสงวิ่งที่ขอบล่างเมื่อ Scroll */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      )}

      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex justify-between items-center relative">
        
        {/* LOGO: Neon Glow Effect */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 bg-black border border-gray-800 rounded overflow-hidden group-hover:border-purple-500 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
             <span className="font-bold text-white text-xl z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-tr group-hover:from-blue-400 group-hover:to-purple-500 transition-all">P</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-white tracking-wider group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all">
              PANUPONG
            </span>
            <span className="text-[10px] text-gray-500 font-mono tracking-widest group-hover:text-gray-300">
              ENGINEER.DEV
            </span>
          </div>
        </a>

        {/* DESKTOP MENU: เรียงใหม่ให้ตรงกับหน้าเว็บ */}
        <div className="hidden md:flex gap-0.5 items-center bg-white/5 px-2 py-1 rounded-full border border-white/10 backdrop-blur-md">
          {/* navigation items translated */}
          {['about', 'skills', 'toolkit', 'timeline', 'projects', 'certificates', 'contact'].map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="relative px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors font-mono tracking-wide group overflow-hidden rounded-full"
            >
              <span className="absolute top-0 left-1/2 h-0.5 w-1/2 bg-linear-to-r from-transparent via-blue-500 to-transparent -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_#3b82f6]" />
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              {t(`nav.${key}`)}
            </a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          
          {/* Language Switch */}
          <div className="relative flex bg-black/50 rounded-lg p-1 border border-white/10">
            <motion.div 
              layout
              className={`absolute top-1 bottom-1 w-8.5 bg-linear-to-br from-blue-600 to-purple-600 rounded shadow-[0_0_10px_rgba(124,58,237,0.4)]`}
              initial={false}
              animate={{ x: lang === "en" ? 0 : 38 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <button onClick={() => setLang("en")} className={`relative z-10 w-8.5 px-2 py-1 text-center text-xs font-bold transition-colors ${lang === "en" ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>{t("navbar.en")}</button>
            <button onClick={() => setLang("th")} className={`relative z-10 w-8.5 px-2 py-1 text-center text-xs font-bold transition-colors ${lang === "th" ? "text-white" : "text-gray-400 hover:text-gray-200"}`}>{t("navbar.th")}</button>
          </div>

          {/* Hire Me Button */}
          <a
            href="#projects"
            className="hidden lg:flex items-center gap-2 px-5 py-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] group"
          >
            <span>{t("navbar.showcase")}</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_5px_#4ade80]" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}