"use client";

import { motion } from "framer-motion";
import { Zap, Target, TrendingUp, BrainCircuit } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import GlowHeading from "@/components/ui/GlowHeading";

export default function WhyAI() {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: <Zap className="w-7 h-7 text-yellow-400" />,
      metric: t("whyAI.speedMetric"),
      title: t("whyAI.speedTitle"),
      desc: t("whyAI.speedDesc"),
      color: "border-yellow-500/30",
      glow: "shadow-yellow-500/10",
    },
    {
      icon: <Target className="w-7 h-7 text-cyan-400" />,
      metric: t("whyAI.accuracyMetric"),
      title: t("whyAI.accuracyTitle"),
      desc: t("whyAI.accuracyDesc"),
      color: "border-cyan-500/30",
      glow: "shadow-cyan-500/10",
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-green-400" />,
      metric: t("whyAI.roiMetric"),
      title: t("whyAI.roiTitle"),
      desc: t("whyAI.roiDesc"),
      color: "border-green-500/30",
      glow: "shadow-green-500/10",
    },
  ];

  return (
    <section id="why-ai" className="py-24 px-6 bg-[#060606] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 border border-cyan-500/30 rounded-full bg-cyan-900/10 mb-4 backdrop-blur-md"
          >
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-xs font-mono tracking-widest uppercase">{t("whyAI.badge")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            <GlowHeading tone="cyan">{t("whyAI.heading")}</GlowHeading>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            {t("whyAI.subheading")}
          </motion.p>
        </div>

        {/* 3 Reason Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`bg-gray-900/50 backdrop-blur-xl border ${r.color} p-8 rounded-3xl relative overflow-hidden group hover:shadow-lg ${r.glow} transition-all`}
            >
              {/* Icon */}
              <div className="mb-6 p-3 bg-black/40 rounded-2xl inline-block border border-white/5">
                {r.icon}
              </div>

              {/* Metric */}
              <div className="text-4xl font-bold text-white font-mono mb-2">
                {r.metric}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">{r.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>

              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Bottom philosophical note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm font-mono italic">
            {t("whyAI.philosophy")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
