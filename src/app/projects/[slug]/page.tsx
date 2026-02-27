"use client";

import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/components/LanguageProvider";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Layers,
  CheckCircle,
  AlertCircle,
  Mail,
  Lightbulb // ✅ นำเข้าไอคอนใหม่
} from "lucide-react";

import CompareGallery from "@/components/project/CompareGallery";
import SystemArchitecture from "@/components/project/SystemArchitecture";
import Gallery from "@/components/Gallery";

type HeadingTone = "blue" | "red" | "green" | "purple";

function GlowHeading({
  children,
  tone = "blue",
  className = "",
}: {
  children: ReactNode;
  tone?: HeadingTone;
  className?: string;
}) {
  const tones = {
    blue: {
      text: "bg-linear-to-r from-white via-blue-100 to-cyan-300",
      line: "bg-linear-to-r from-transparent via-cyan-400/80 to-transparent",
      glow: "drop-shadow-[0_0_14px_rgba(56,189,248,0.35)]",
    },
    red: {
      text: "bg-linear-to-r from-white via-red-100 to-red-300",
      line: "bg-linear-to-r from-transparent via-red-400/80 to-transparent",
      glow: "drop-shadow-[0_0_14px_rgba(248,113,113,0.35)]",
    },
    green: {
      text: "bg-linear-to-r from-white via-emerald-100 to-green-300",
      line: "bg-linear-to-r from-transparent via-emerald-400/80 to-transparent",
      glow: "drop-shadow-[0_0_14px_rgba(52,211,153,0.35)]",
    },
    purple: {
      text: "bg-linear-to-r from-white via-purple-100 to-fuchsia-300",
      line: "bg-linear-to-r from-transparent via-purple-400/80 to-transparent",
      glow: "drop-shadow-[0_0_14px_rgba(192,132,252,0.35)]",
    },
  } as const;

  const selectedTone = tones[tone];

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={`text-transparent bg-clip-text ${selectedTone.text} ${selectedTone.glow}`}>
        {children}
      </span>
      <span className={`pointer-events-none absolute -bottom-1 left-0 h-px w-full ${selectedTone.line}`} />
    </span>
  );
}

export default function ProjectPage() {
  const { t, lang } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
    return null;
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <PageTransition>
      <main className="bg-[#050505] text-white min-h-screen pb-24">
        {/* 1. Hero Section */}
        <div className="relative h-[60vh] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#050505]/80 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
              <Link
                href={`/${lang}#projects`}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
                {t("projectDetail.backToProjects")}
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
                <GlowHeading tone="blue">{t(`projects.${project.slug}.title`)}</GlowHeading>
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full text-xs font-mono backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 -mt-10">
          
          {/* 2. Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl mb-16">
            {[
              { icon: User, label: t("projectDetail.role"), val: t(`projects.${project.slug}.role`) },
              { icon: Calendar, label: t("projectDetail.year"), val: project.year },
              { icon: Clock, label: t("projectDetail.duration"), val: t(`projects.${project.slug}.duration`) },
              { icon: Layers, label: t("projectDetail.type"), val: t("projectDetail.industrialAutomation") },
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-mono uppercase mb-1">
                  <stat.icon className="w-4 h-4" /> {stat.label}
                </div>
                <p className="font-semibold text-white">{stat.val}</p>
              </div>
            ))}
          </div>

          {/* 3. Challenge vs Solution */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-red-900/5 border border-red-500/10 p-8 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  <GlowHeading tone="red">{t("projectDetail.theChallenge")}</GlowHeading>
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg relative z-10">
                {t(`projects.${project.slug}.problem`)}
              </p>
            </div>
            <div className="bg-blue-900/5 border border-blue-500/10 p-8 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  <GlowHeading tone="blue">{t("projectDetail.theSolution")}</GlowHeading>
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg relative z-10">
                {t(`projects.${project.slug}.solution`)}
              </p>
            </div>
          </div>

          {/* 4. Transformation Evidence */}
          {project.compareImages && (
            <div className="mb-24">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                <GlowHeading tone="purple">{t("projectDetail.transformationEvidence")}</GlowHeading>
              </h3>
              <CompareGallery data={project.compareImages} />
            </div>
          )}

          {/* 5. Video Demo */}
          {project.videoDemo && (
            <div className="mb-24">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />{" "}
                <GlowHeading tone="red">{t("projectDetail.systemDemo")}</GlowHeading>
              </h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
                {!project.videoDemo.includes("youtube") ? (
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster={project.image}
                  >
                    <source src={project.videoDemo} type="video/mp4" />
                  </video>
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    src={project.videoDemo.replace("watch?v=", "embed/")}
                    className="absolute inset-0"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          )}

          {/* 6. System Architecture */}
          {project.architecture && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                <GlowHeading tone="blue">{t("projectDetail.systemArchitecture")}</GlowHeading>
              </h3>
              <SystemArchitecture data={project.architecture} />
            </div>
          )}

          {/* 🔥 7. [NEW] Lessons Learned & Challenges Overcome 🔥 */}
          {project.lessonsLearned && (
            <div className="mb-24 bg-linear-to-br from-blue-900/10 to-transparent border border-blue-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-700 pointer-events-none">
                    <Lightbulb className="w-48 h-48 text-blue-500" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <Lightbulb className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          <GlowHeading tone="purple">{t("projectDetail.lessonsLearned")}</GlowHeading>
                        </h3>
                    </div>
                    <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line space-y-4">
                      {t(`projects.${project.slug}.lessonsLearned`)}
                    </div>
                </div>
            </div>
          )}

          {/* 8. Business Impact */}
          <div className="mb-20 text-center">
            <h3 className="text-2xl font-bold text-white mb-8">
              <GlowHeading tone="green">{t("projectDetail.businessImpact")}</GlowHeading>
            </h3>
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />
              <div className="relative bg-black/60 border border-green-500/30 px-12 py-8 rounded-3xl backdrop-blur-md">
                <span className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">
                  {t(`projects.${project.slug}.impact`)}
                </span>
              </div>
            </div>
          </div>

          {/* 9. Detailed Content & Tech */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="md:col-span-2 prose prose-invert prose-lg max-w-none text-gray-300">
              <h3 className="text-2xl font-bold text-white mb-4">
                <GlowHeading tone="blue">{t("projects.detailHeading")}</GlowHeading>
              </h3>
              <p className="whitespace-pre-line leading-relaxed">
                {t(`projects.${project.slug}.content`)}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
              <h4 className="font-bold text-white mb-4">
                <GlowHeading tone="blue">{t("projects.technologies")}</GlowHeading>
              </h4>
              <ul className="space-y-3">
                {project.tech.map((t: string) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 text-sm text-gray-400"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 10. Project Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-24">
              <Gallery images={project.gallery} />
            </div>
          )}

          {/* 🔥 11. Call to Action (CTA) 🔥 */}
          <div className="mb-24 bg-linear-to-r from-blue-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    <GlowHeading tone="purple">{t("projects.needSystem")}</GlowHeading>
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                      {t("projects.ctaText")}
                  </p>
                  <Link 
                      href={`/${lang}#contact`} 
                      className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                  >
                      <Mail className="w-5 h-5 text-blue-600" /> {t("projects.discussProject")}
                  </Link>
              </div>
          </div>

          {/* 12. Next Project Nav */}
          <div className="border-t border-white/10 pt-12">
            <p className="text-sm text-gray-500 font-mono mb-4">{t("projectDetail.nextProject")}</p>
            <Link
              href={`/${lang}/projects/${nextProject.slug}`}
              className="group block"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    <GlowHeading tone="blue">{t(`projects.${nextProject.slug}.title`)}</GlowHeading>
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {nextProject.tech.slice(0, 3).join(" • ")}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}