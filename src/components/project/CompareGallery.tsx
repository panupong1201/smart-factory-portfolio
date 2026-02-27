"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

type CompareImage = {
  before: string;
  after: string;
  label?: string;
};

export default function CompareGallery({ data }: { data: CompareImage | CompareImage[] }) {
  const { t } = useLanguage();
  // แปลงข้อมูลให้เป็น Array เสมอ (รองรับทั้งแบบเก่าและแบบใหม่)
  const images = Array.isArray(data) ? data : [data];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const currentPair = images[currentIndex];
  const beforeLabel = currentPair.label
    ? (t(`compareLabels.${currentPair.label}`) === `compareLabels.${currentPair.label}`
        ? currentPair.label
        : t(`compareLabels.${currentPair.label}`))
    : t("projects.legacySystem");
  const afterLabel = currentPair.label
    ? (t(`compareLabels.${currentPair.label}`) === `compareLabels.${currentPair.label}`
        ? currentPair.label
        : t(`compareLabels.${currentPair.label}`))
    : t("projects.automatedSolution");

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-6 relative">
        
        {/* BEFORE CARD */}
        <div className="group relative rounded-2xl overflow-hidden border border-red-500/30 bg-gray-900 h-64 md:h-80 transition-all duration-500 hover:border-red-500/60">
          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {t("projects.before")}: {beforeLabel}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPair.before}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image src={currentPair.before} alt="Before" fill unoptimized className="object-cover" />
              <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AFTER CARD */}
        <div className="group relative rounded-2xl overflow-hidden border border-green-500/30 bg-gray-900 h-64 md:h-80 shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-500 hover:border-green-500/60 hover:shadow-[0_0_50px_rgba(34,197,94,0.3)]">
          <div className="absolute top-4 left-4 z-10 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
            <CheckCircle className="w-3 h-3" /> {t("projects.after")}: {afterLabel}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPair.after}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image src={currentPair.after} alt="After" fill unoptimized className="object-cover" />
              <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center Arrow */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#050505] border border-white/20 rounded-full items-center justify-center z-20">
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Navigation Controls (Show only if multiple pairs) */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-6 mt-8">
          <button onClick={prevImage} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
          
          <div className="flex gap-2">
            {images.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-blue-500 w-8" : "bg-gray-700 w-2"}`} />
            ))}
          </div>

          <button onClick={nextImage} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
        </div>
      )}
    </div>
  );
}