"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

type CompareImage = {
  before: string;
  after: string;
  label?: string;
};

export default function CompareGallery({ data }: { data: CompareImage | CompareImage[] }) {
  const { t } = useLanguage();
  const images = Array.isArray(data) ? data : [data];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const startDrag = useCallback((clientX: number) => {
    setIsDragging(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPos((x / rect.width) * 100);
    }
  }, []);

  useEffect(() => {
    const onEnd = () => setIsDragging(false);
    const onMouseMove = (e: MouseEvent) => { if (isDragging) handleMove(e.clientX); };
    const onTouchMove = (e: TouchEvent) => { if (isDragging) handleMove(e.touches[0].clientX); };
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchend", onEnd);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [isDragging, handleMove]);

  useEffect(() => { setSliderPos(50); }, [currentIndex]);

  const currentPair = images[currentIndex];
  const dragToCompareText = t("projects.dragToCompare");
  const resolveLabel = (lbl?: string) => {
    if (!lbl) return "";
    const key = `compareLabels.${lbl}`;
    const translated = t(key);
    return translated === key ? lbl : translated;
  };

  const nextImage = () => setCurrentIndex((p) => (p + 1) % images.length);
  const prevImage = () => setCurrentIndex((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="mx-auto max-w-6xl w-full space-y-6">
      {/* Interactive Slider */}
      <div
        ref={containerRef}
        className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 select-none bg-neutral-900/50 group/slider"
        style={{ cursor: isDragging ? "col-resize" : "default" }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      >
        {/* After Image (Full Background) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`after-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image src={currentPair.after} alt="After" fill unoptimized className="object-contain p-2" draggable={false} />
            <div className="absolute inset-0 bg-green-500/5" />
          </motion.div>
        </AnimatePresence>

        {/* Before Image (Clipped from right) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`before-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <Image src={currentPair.before} alt="Before" fill unoptimized className="object-contain p-2" draggable={false} />
            <div className="absolute inset-0 bg-red-900/5" />
          </motion.div>
        </AnimatePresence>

        {/* Divider Line + Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          {/* Vertical Line */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-[0_0_24px_rgba(255,255,255,0.5)] flex items-center justify-center pointer-events-auto cursor-col-resize border-2 border-white/50 hover:scale-110 transition-transform">
            <GripVertical className="w-5 h-5 text-gray-700" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
            {t("projects.before")}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <span className="bg-green-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1">
            ✓ {t("projects.after")}
          </span>
        </div>

        {/* Label Badge (bottom center) */}
        {currentPair.label && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <span className="bg-black/70 backdrop-blur-md text-white text-sm font-mono px-5 py-2 rounded-full border border-white/20 shadow-lg">
              {resolveLabel(currentPair.label)}
            </span>
          </div>
        )}

        {/* Drag hint (shows briefly) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <span className="bg-white/10 backdrop-blur-md text-white/70 text-xs px-4 py-1.5 rounded-full border border-white/10">
            ← {dragToCompareText === "projects.dragToCompare" ? "drag to compare" : dragToCompareText} →
          </span>
        </motion.div>
      </div>

      {/* Navigation (multiple pairs) */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-6">
          <button onClick={prevImage} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-blue-500 w-8 h-1.5" : "bg-gray-700 w-2 h-1.5 hover:bg-gray-500"
                }`}
              >
                <span className="sr-only">{img.label || `Pair ${idx + 1}`}</span>
              </button>
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