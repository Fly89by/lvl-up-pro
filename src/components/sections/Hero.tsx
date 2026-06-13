"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, BarChart3, Shield, Zap, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface-950">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="hero-glow top-[-200px] left-[-200px]" />
      <div className="hero-glow bottom-[-300px] right-[-200px]"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/3 rounded-full blur-[150px]" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full px-4 py-1.5 text-sm text-brand-300 border border-brand-500/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                {t.raw("badge") || "AI-Powered Analytics Platform"}
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-8"
            >
              {t.raw("title").split("\n").map((line: string, i: number) => (
                <span key={i} className="block">
                  {i === 0 ? (
                    <span className="text-white">{line}</span>
                  ) : (
                    <span className="gradient-text">{line}</span>
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-surface-400 leading-relaxed mb-10 max-w-lg"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/register" className="btn-primary gap-2 px-8 py-3.5 text-base shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30">
                {t("ctaSecondary") || "ابدأ الآن"}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#demo" className="btn-secondary gap-2 px-8 py-3.5 text-base">
                <Play className="w-4 h-4" />
                {t("ctaPrimary")}
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 mt-10 text-sm text-surface-500"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>SOC 2</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-400" />
                <span>10K+ Branches</span>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              <div className="glass-card rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80"
                  alt="Analytics Dashboard"
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-surface-400">Performance</div>
                    <div className="text-lg font-bold text-white">+32.5%</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 glass-card rounded-xl p-4 animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-surface-400">Efficiency</div>
                    <div className="text-lg font-bold text-white">94.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
