"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [1, 2, 3, 4, 5, 6];

export default function FAQ() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-dark section-padding">
      <div className="container-main max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-[0.2em]">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">{t("title")}</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="font-medium text-white">{t(`q${i}`)}</span>
                  <ChevronDown className={`w-5 h-5 text-surface-400 transition-all duration-300 ${isOpen ? "rotate-180 text-brand-400" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                  <div className="px-6 pb-5 text-surface-400 leading-relaxed text-sm border-t border-surface-700/50 pt-4">
                    {t(`a${i}`)}
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
