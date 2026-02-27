"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, Award, FileText } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { certificatesData } from "@/data/certificatesData";

type Props = {
  data: typeof certificatesData[0];
  onClose: () => void;
};

export default function CertificateModal({ data, onClose }: Props) {
  const { t } = useLanguage();
  const localize = (key: string, fallback: string) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    // ป้องกันการ Scroll ที่ Body ขณะเปิด Modal
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  const Icon = data.icon;
  const localizedTitle = localize(`certificatesData.${data.id}.title`, data.title);
  const localizedCategory = localize(
    `certificates.categories.${String(data.category).toLowerCase()}`,
    data.category
  );
  const localizedIssuer = localize(`certificatesData.${data.id}.issuer`, data.issuer);
  const localizedDescription = localize(
    `certificatesData.${data.id}.description`,
    data.description
  );
  const localizedDetails = data.details.map((detail: string, index: number) =>
    localize(`certificatesData.${data.id}.details.${index}`, detail)
  );

  // ถ้ายังไม่ Mount (Server-side) ให้ return null ไปก่อน
  if (!mounted) return null;

  // ใช้ createPortal เพื่อยิง Modal ไปที่ document.body โดยตรง (ทะลุทุก Layer)
  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center px-4 py-6">
      
      {/* พื้นหลังดำจางๆ */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />

      {/* กล่อง Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#0f0f0f] border border-gray-700 w-full md:w-[70vw] h-[85vh] md:h-[75vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-full transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* ฝั่งซ้าย: รูปภาพใหญ่ */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-black relative flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-800">
           <Image 
              src={data.image} 
              alt={localizedTitle}
              fill
              className="object-contain p-4"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
           />
           {/* Fallback Icon */}
           <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-10">
              <Icon className="w-32 h-32 text-white" />
           </div>
        </div>

        {/* ฝั่งขวา: รายละเอียด (Scroll ได้) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 flex flex-col overflow-y-auto custom-scrollbar">
            
            <div className="flex items-center gap-4 mb-6">
               <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${data.glow} shrink-0`}>
                  <Icon className="w-8 h-8 text-white" />
               </div>
               <div>
                <p className="text-sm text-blue-400 font-mono uppercase tracking-widest mb-1">{localizedCategory}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{localizedTitle}</h3>
               </div>
            </div>

            <div className="space-y-6">
                {/* Issuer Info */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                  <p className="text-xs text-gray-500 uppercase font-mono mb-1">{localize("ui.issuedBy", "Issued By")}</p>
                  <p className="text-lg text-white font-medium">{localizedIssuer}</p>
                    <p className="text-sm text-gray-400">{data.year}</p>
                </div>

                {/* Description */}
                <div>
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-400" /> {localize("ui.descriptionLabel", "Description")}
                    </h4>
                    <p className="text-gray-300 text-base leading-relaxed">
                    {localizedDescription}
                    </p>
                </div>

                {/* Key Details */}
                <div>
                    <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-gray-400" /> {localize("ui.keyAchievements", "Key Achievements")}
                    </h4>
                    <ul className="space-y-3">
                    {localizedDetails.map((detail: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                <span className="leading-relaxed">{detail}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-800">
               <button onClick={onClose} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-colors">
                {localize("ui.closeWindow", "Close Window")}
               </button>
            </div>
        </div>
      </motion.div>
    </div>,
    document.body // <-- ยิงไปที่ body โดยตรง
  );
}