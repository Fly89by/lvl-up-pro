"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, DollarSign, Users } from "lucide-react";

const stats = [
  { key: "quality", icon: TrendingUp, suffix: "%", color: "text-emerald-400" },
  { key: "issues", icon: AlertTriangle, suffix: "%", color: "text-red-400" },
  { key: "sales", icon: DollarSign, suffix: "%", color: "text-amber-400" },
  { key: "satisfaction", icon: Users, suffix: "%", color: "text-brand-400" },
];

export default function ROI() {
  const t = useTranslations("roi");

  return (
    <section className="section-light section-padding">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-[0.2em]">{t("subtitle")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 mt-4 mb-4">{t("title")}</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={stat.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card-light rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${i === 0 ? 'from-emerald-500/20 to-emerald-600/20' : i === 1 ? 'from-red-500/20 to-red-600/20' : i === 2 ? 'from-amber-500/20 to-amber-600/20' : 'from-brand-500/20 to-brand-600/20'} flex items-center justify-center mx-auto mb-5`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {t(`${stat.key}Value`) || (stat.key === "quality" ? "40" : stat.key === "issues" ? "60" : stat.key === "sales" ? "25" : "95")}{stat.suffix}
              </div>
              <div className="text-surface-600 font-medium text-sm">{t(stat.key)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
