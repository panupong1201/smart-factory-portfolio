"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Mail, MapPin, ArrowRight, Terminal, X, SendHorizontal, MessageCircle } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import GlowHeading from "@/components/ui/GlowHeading";
import { trackContactClick } from "@/lib/analytics";

export default function Contact() {
  const { t } = useLanguage();
    const lineUrl = "https://line.me/ti/p/86DDhrg2oQ";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitState, setSubmitState] = useState<{ type: "success" | "error"; message: string } | null>(null);
  
  // ✅ เพิ่ม State เช็คว่าโหลดหน้าเว็บเสร็จหรือยัง
  const [isMounted, setIsMounted] = useState(false);

  // ✅ รอให้ useEffect ทำงาน (แสดงว่าเป็น Client แล้ว) ค่อยให้ render จุด
  useEffect(() => {
    setIsMounted(true);
  }, []);

    useEffect(() => {
        if (!isModalOpen) return;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitState(null);

        if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
            setSubmitState({ type: "error", message: t("contact.requiredFields") });
            return;
        }

        if (!emailPattern.test(form.email.trim())) {
            setSubmitState({ type: "error", message: t("contact.invalidEmail") });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await response.json();
            if (!response.ok) {
                setSubmitState({ type: "error", message: result?.message || t("contact.errorGeneric") });
                return;
            }

            setSubmitState({ type: "success", message: t("contact.successMessage") });
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch {
            setSubmitState({ type: "error", message: t("contact.errorGeneric") });
        } finally {
            setIsSubmitting(false);
        }
    }

  return (
    <section id="contact" className="py-24 px-6 bg-[#050505] relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      
      {/* Background World/Network Effect with Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full animate-pulse duration-[5s]" />
         <div 
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
            }}
         />
         
         {/* ✅ แก้ไข: Render เฉพาะเมื่อ isMounted = true เพื่อป้องกัน Hydration Error */}
         {isMounted && [...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{ 
                    // ใช้ window.innerWidth เพื่อให้กระจายทั่วจอจริง
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000), 
                    y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800), 
                    opacity: 0 
                }}
                animate={{ 
                    y: [0, -100], 
                    opacity: [0, 1, 0] 
                }}
                transition={{ 
                    duration: Math.random() * 5 + 5, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                }}
            />
         ))}
      </div>

      <div className="max-w-4xl w-full relative z-10">
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group"
        >
            {/* Holographic Ripple Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(59, 130, 246, 0.1),
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* Holographic Border Glow */}
            <div className="absolute inset-0 border border-blue-500/20 rounded-3xl z-0 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50" />
            
            {/* Status Bar */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 border border-green-500/30 rounded-full mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-400 text-xs font-mono tracking-widest uppercase">{t("contact.signalOnline")}</span>
            </div>

            {/* Main Content with Typing Effect */}
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                <GlowHeading tone="blue">{t("contact.readyToUpgrade")}</GlowHeading>
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
                {t("contact.servicesList")}
                <br className="hidden md:block" /><br className="hidden md:block" />
                {t("contact.letsCollaborate")}
            </p>

            {/* Contact Actions Grid */}
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 relative z-10">
                
                {/* Email Button (Primary) with Border Flow */}
                <a 
                                        href="#contact-form"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            trackContactClick("send_message");
                                            setSubmitState(null);
                                            setIsModalOpen(true);
                                        }}
                    className="relative flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-bold text-lg overflow-hidden group/btn hover:scale-105 transition-transform"
                >
                    {/* Running Light Border */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                    
                    <Mail className="w-5 h-5 text-blue-600 relative z-10" />
                    <span className="relative z-10">{t("contact.openForm")}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all relative z-10" />
                </a>

                <a
                    href={lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactClick("line")}
                    className="relative flex items-center justify-center gap-3 bg-[#06C755]/15 border border-[#06C755]/40 text-[#d3ffe1] px-6 py-4 rounded-xl font-bold text-lg overflow-hidden hover:scale-105 transition-transform"
                >
                    <MessageCircle className="w-5 h-5 text-[#06C755]" />
                    <span>{t("contact.lineChat")}</span>
                </a>

                {/* Location/Info Card (Secondary) */}
                <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-gray-300 hover:bg-white/10 transition-colors cursor-default hover:border-blue-500/30">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="font-mono text-sm">{t("contact.location")}</span>
                </div>
            </div>

            {/* Footer Terminal Text */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600 relative z-10">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    <span>{t("contact.systemReady")}</span>
                </div>
                <p>{t("contact.copyright")}</p>
            </div>

        </motion.div>

      </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-9999 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.96 }}
                            className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                        >
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-4 top-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6">
                                <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">{t("contact.formLabel")}</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">
                                    <GlowHeading tone="blue">{t("contact.formTitle")}</GlowHeading>
                                </h3>
                                <p className="text-gray-400 mt-2">{t("contact.formSubtitle")}</p>
                            </div>

                            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2">{t("contact.nameLabel")}</label>
                                        <input
                                            value={form.name}
                                            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                                            placeholder={t("contact.namePlaceholder")}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/60"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2">{t("contact.emailLabel")}</label>
                                        <input
                                            value={form.email}
                                            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                                            placeholder={t("contact.emailPlaceholder")}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/60"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">{t("contact.subjectLabel")}</label>
                                    <input
                                        value={form.subject}
                                        onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                                        placeholder={t("contact.subjectPlaceholder")}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/60"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">{t("contact.messageLabel")}</label>
                                    <textarea
                                        rows={5}
                                        value={form.message}
                                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                                        placeholder={t("contact.messagePlaceholder")}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/60 resize-none"
                                    />
                                </div>

                                {submitState && (
                                    <div
                                        className={`text-sm rounded-lg px-4 py-3 border ${
                                            submitState.type === "success"
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                                : "bg-red-500/10 border-red-500/30 text-red-300"
                                        }`}
                                    >
                                        {submitState.message}
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="md:w-40 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                                    >
                                        {t("contact.cancel")}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold hover:scale-[1.01] transition disabled:opacity-60"
                                    >
                                        <SendHorizontal className="w-4 h-4" />
                                        {isSubmitting ? t("contact.sending") : t("contact.sendNow")}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
    </section>
  );
}