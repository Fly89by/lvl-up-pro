"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import GlassyOrbVideo from "@/components/ui/GlassyOrbVideo";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-surface-950">
      <div className="absolute inset-0 bg-grid opacity-15 z-0" />
      <div className="glow-orb glow-orb-1 animate-orb-drift z-0" />
      <div className="glow-orb glow-orb-2 animate-orb-drift-2 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-500/3 rounded-full blur-[150px] z-0" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full px-4 py-1.5 text-sm text-brand-300 border border-brand-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              {t.raw("badge") || "AI-Powered Analytics Platform"}
            </div>

            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4" fill="#FF801E" color="#FF801E" />
              ))}
              <span className="text-sm text-surface-400 ml-2">Rated 4.9/5 by 2,700+ customers</span>
            </div>

            <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[4.75rem] font-bold leading-[1.05] tracking-[-0.02em] mb-6">
              {t.raw("title").split("\n").map((line: string, i: number) => (
                <span key={i} className="block">
                  {i === 0 ? (
                    <span className="text-white">{line}</span>
                  ) : (
                    <span className="gradient-text">{line}</span>
                  )}
                </span>
              ))}
            </h1>

            <p className="text-lg text-surface-400 leading-relaxed mb-8 max-w-lg tracking-[-0.01em]">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/register"
                className="btn-primary gap-2 px-8 py-3.5 text-base"
              >
                {t("ctaSecondary") || "ابدأ الآن"}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#demo"
                className="btn-secondary gap-2 px-8 py-3.5 text-base"
              >
                <Play className="w-4 h-4" />
                {t("ctaPrimary")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center relative min-h-[500px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <GlassyOrbVideo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
