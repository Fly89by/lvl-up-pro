"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BarChart3, Target, TrendingUp } from "lucide-react";

export default function AccuracyScale() {
  const t = useTranslations("accuracy");

  return (
    <section className="section-dark section-padding">
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-[0.2em]">{t("subtitle")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">{t("title")}</h2>
            <p className="text-surface-400 leading-relaxed mb-8">{t("description")}</p>
            <div className="flex flex-wrap gap-3">
              {[t("tag1") || "Real-time Tracking", t("tag2") || "Smart Reports", t("tag3") || "Advanced Analytics", t("tag4") || "Seamless Integration"].map((tag) => (
                <span key={tag} className="text-sm bg-brand-500/10 text-brand-300 rounded-full px-4 py-1.5 font-medium border border-brand-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80" alt="Analytics Dashboard" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="absolute -bottom-4 -right-4 glass-card rounded-xl p-4 animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <div className="text-xs text-surface-400">Accuracy</div>
                  <div className="text-lg font-bold text-white">98.7%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
