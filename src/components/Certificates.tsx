"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { certificatesData } from "@/data/certificatesData"; // ดึงข้อมูลมา
import CertificateCard from "@/components/ui/CertificateCard"; // ดึงการ์ดมา
import CertificateModal from "@/components/ui/CertificateModal"; // ดึง Modal มา
import { useLanguage } from "./LanguageProvider";

const categories = ["All", "Achievement", "Award", "Certificate"];

export default function Certificates() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [showAll, setShowAll] = useState(false); // state สำหรับปุ่ม View More

  const filteredCerts = activeCategory === "All" 
    ? certificatesData 
    : certificatesData.filter(c => c.category === activeCategory);

  // ตัดข้อมูลให้เหลือแค่ 3 อัน ถ้ายังไม่ได้กดดูทั้งหมด
  const displayedCerts = showAll ? filteredCerts : filteredCerts.slice(0, 3);

  // ฟังก์ชันเปลี่ยนหมวดหมู่ (พร้อมรีเซ็ตการแสดงผลให้ย่อกลับ)
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowAll(false);
  };

  return (
    <section id="certificates" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
             initial={{ opacity: 0, scale: 0.5 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1 border border-yellow-500/30 rounded-full bg-yellow-500/10 mb-4 backdrop-blur-md"
          >
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-200 text-xs font-mono tracking-widest uppercase">{t("certificates.verified")}</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("certificates.achievements")}</h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2 rounded-full text-sm font-mono transition-all border ${
                  activeCategory === cat 
                    ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]" 
                    : "bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid แสดงการ์ด */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedCerts.map((cert) => (
              <CertificateCard 
                key={cert.id} 
                data={cert} 
                onClick={() => setSelectedCert(cert)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ปุ่ม View More / Show Less */}
        {filteredCerts.length > 3 && (
            <div className="mt-12 text-center">
                <button 
                    onClick={() => setShowAll(!showAll)}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all hover:scale-105 border border-white/10 backdrop-blur-sm group"
                >
                    {showAll ? (
                        <>
                            {t("certificates.showLess")} <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        </>
                    ) : (
                        <>
                            {t("certificates.viewAllCollection")} ({filteredCerts.length}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        )}

        {/* Modal Popup */}
        <AnimatePresence>
          {selectedCert && (
            <CertificateModal 
              data={selectedCert} 
              onClose={() => setSelectedCert(null)} 
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}