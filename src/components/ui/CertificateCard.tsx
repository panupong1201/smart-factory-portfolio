"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { certificatesData } from "@/data/certificatesData";

type Props = {
  data: typeof certificatesData[0];
  onClick: () => void;
};

export default function CertificateCard({ data, onClick }: Props) {
  const { t } = useLanguage();
  const localize = (key: string, fallback: string) => {
    const translated = t(key);
    return translated === key ? fallback : translated;
  };

  const Icon = data.icon;
  const localizedTitle = localize(`certificatesData.${data.id}.title`, data.title);
  const localizedCategory = localize(
    `certificates.categories.${String(data.category).toLowerCase()}`,
    data.category
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`relative bg-gray-900/60 backdrop-blur-md border ${data.color} rounded-2xl overflow-hidden cursor-pointer group hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
    >
      {/* ส่วนรูปภาพด้านบน */}
      <div className="relative h-40 w-full bg-black/50 overflow-hidden border-b border-white/5">
        <Image 
          src={data.image} 
          alt={localizedTitle}
          fill
          className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          onError={(e) => { e.currentTarget.style.display = 'none'; }} 
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent opacity-80" />
        
        {/* ไอคอนลอย */}
        <div className={`absolute top-4 right-4 p-2 rounded-lg bg-black/60 border border-white/10 backdrop-blur ${data.glow}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* ส่วนเนื้อหาด้านล่าง */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-mono text-blue-300 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-500/20">
             {localizedCategory}
          </span>
          <span className="text-xs text-gray-500 font-mono">{data.year}</span>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-blue-300 transition-colors">
            {localizedTitle}
        </h3>
        
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-600 group-hover:text-white transition-colors">
           <Maximize2 className="w-3 h-3" />
           <span>{localize("ui.tapToView", "Tap to view")}</span>
        </div>
      </div>
    </motion.div>
  );
}