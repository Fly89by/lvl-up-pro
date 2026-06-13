"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Bell, BellRing, ShieldCheck, RefreshCw } from "lucide-react";

const features = [
  { icon: BellRing, label: "Instant Alerts" },
  { icon: RefreshCw, label: "24/7 Monitoring" },
  { icon: ShieldCheck, label: "Real-time Reports" },
  { icon: Bell, label: "Smart Notifications" },
];

export default function ContinuousMonitoring() {
  const t = useTranslations("continuousMonitoring");

  return (
    <section className="section-dark section-padding">
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-[0.2em]">{t("subtitle")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">{t("title")}</h2>
            <p className="text-surface-400 leading-relaxed mb-8">{t("description")}</p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-3 text-sm text-surface-300 glass-card rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-amber-400" />
                  </div>
                  {f.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass-card rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=700&q=80" alt="Monitoring Dashboard" className="w-full h-auto" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
