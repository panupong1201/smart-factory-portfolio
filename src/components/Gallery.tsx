"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Gallery({ images }: { images: string[] }) {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false); // ✅ เพิ่ม State สำหรับย่อ/ขยาย

  // กำหนดจำนวนรูปที่จะโชว์ตอนแรก (เช่น 3 รูป)
  const INITIAL_COUNT = 3;
  const displayedImages = showAll ? images : images.slice(0, INITIAL_COUNT);

  // --- Lightbox Logic (เหมือนเดิม) ---
  const closeGallery = useCallback(() => setSelectedIndex(null), []);
  
  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => 
      prev === null ? null : (prev + 1) % images.length
    );
  }, [images.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => 
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeGallery, nextImage, prevImage]);

  return (
    <div className="mt-24 border-t border-white/10 pt-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <ImageIcon className="w-6 h-6" />
            </div>
          <h2 className="text-3xl font-bold text-white">{t("projects.systemGallery")}</h2>
        </div>
        
        <span className="text-sm font-mono text-gray-500">
          {t("projects.totalAssets")}: {images.length}
        </span>
      </div>

      {/* --- Thumbnails Grid (พร้อม Animation ย่อ/ขยาย) --- */}
      <motion.div 
        layout // ✅ ทำให้ Grid ขยับจัดเรียงตัวเองแบบ Smooth
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
            {displayedImages.map((img, i) => (
            <motion.div
                layout // ✅ ให้แต่ละการ์ดขยับเนียนๆ
                key={i} // **สำคัญ: ใช้ index หรือ unique id ที่ไม่เปลี่ยน**
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-video border border-white/10 bg-gray-900 shadow-lg"
                onClick={() => setSelectedIndex(i)} // เปิด Lightbox รูปที่ถูกต้อง
            >
                <Image
                    src={img}
                  alt={`${t("projects.systemGallery")} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                </div>
                
                {/* Tech Line Decor */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* --- View More / Show Less Button --- */}
      {images.length > INITIAL_COUNT && (
        <div className="mt-12 text-center">
            <button 
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all hover:scale-105 border border-white/10 backdrop-blur-sm group"
            >
                {showAll ? (
                    <>
                    {t("projects.showLess")} <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    </>
                ) : (
                    <>
                    {t("projects.viewAllGallery")} ({images.length}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </>
                )}
            </button>
        </div>
      )}

      {/* --- Fullscreen Lightbox Modal (เหมือนเดิมเป๊ะ) --- */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={closeGallery}
          >
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-red-500/20 text-white/70 hover:text-red-400 rounded-full transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all z-50 hidden md:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all z-50 hidden md:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              layoutId={`gallery-img-${selectedIndex}`} // ถ้าใช้ layoutId ต้องระวังเรื่อง index
              className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]}
                alt="Full screen view"
                fill
                className="object-contain"
                quality={100}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 text-white text-sm font-mono">
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}