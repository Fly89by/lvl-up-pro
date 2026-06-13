"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, LayoutDashboard, Bot, UserPlus, Sparkles } from "lucide-react";

const icons = [TrendingUp, LayoutDashboard, Bot, UserPlus];

export default function AllInOne() {
  const t = useTranslations("allInOne");

  const items = [
    { title: t("item1.title"), desc: t("item1.desc") },
    { title: t("item2.title"), desc: t("item2.desc") },
    { title: t("item3.title"), desc: t("item3.desc") },
    { title: t("item4.title"), desc: t("item4.desc") },
  ];

  return (
    <section id="capabilities" className="section-light section-padding">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-[0.2em]">ALL-IN-ONE</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 mt-4">{t("title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group glass-card-light rounded-2xl p-8 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-5 shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/30 transition-all">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{item.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 glass-card-light rounded-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-4 h-4" /> AI-POWERED
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-surface-900 mb-4">{t("aiTitle") || "AI Assistant & Recommendations"}</h3>
              <p className="text-surface-500 leading-relaxed mb-6">{t("aiDesc") || "Built-in AI that analyzes performance, detects anomalies, and suggests improvements automatically."}</p>
              <ul className="space-y-3 text-sm text-surface-600">
                {["Anomaly Detection", "Smart Recommendations", "Auto Task Assignment", "Performance Predictions"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[300px] bg-gradient-to-br from-brand-50 to-accent-50 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&q=80" alt="AI Analytics" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
