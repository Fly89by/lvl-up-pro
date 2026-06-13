"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Target, Eye, FileText, Users, Lightbulb, ArrowUpRight } from "lucide-react";

const icons = [Target, Eye, FileText, Users];

export default function Challenges() {
  const t = useTranslations("challenges");

  const items = [
    { title: t("item1.title"), desc: t("item1.desc") },
    { title: t("item2.title"), desc: t("item2.desc") },
    { title: t("item3.title"), desc: t("item3.desc") },
    { title: t("item4.title"), desc: t("item4.desc") },
  ];

  return (
    <section className="section-dark section-padding">
      <div className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-[0.2em]">SOLUTIONS</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">{t("title")}</h2>
          <p className="text-surface-400 text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="group glass-card rounded-2xl p-6 h-full hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-4 shadow-lg shadow-brand-500/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
