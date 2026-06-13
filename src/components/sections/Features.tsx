"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, CheckCircle2, TrendingUp, Eye, BarChart3, BrainCircuit } from "lucide-react";

const allIcons = [Search, BrainCircuit, TrendingUp, Eye, CheckCircle2, BarChart3];

const features = [
  {
    icon: BrainCircuit,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
  },
  {
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    icon: Search,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
];

export default function Features() {
  const t = useTranslations("features");

  const items = [
    { title: t("item1.title"), desc: t("item1.desc") },
    { title: t("item2.title"), desc: t("item2.desc") },
    { title: t("item3.title"), desc: t("item3.desc") },
  ];

  return (
    <section id="features" className="section-dark section-padding">
      <div className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-[0.2em]">{t("subtitle")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">{t("title")}</h2>
          <p className="text-surface-400 text-lg">{t("subtitle2") || t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => {
            const Icon = features[i].icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="glass-card rounded-2xl overflow-hidden h-full hover:border-brand-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-brand-500/5">
                  <div className="relative h-48 overflow-hidden">
                    <img src={features[i].image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/50 to-transparent" />
                  </div>
                  <div className="p-6 -mt-8 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/25 mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-surface-400 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
