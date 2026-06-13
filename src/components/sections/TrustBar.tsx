"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const logoLabels = ["Saudi Telecom", "Al Rajhi Bank", "STC", "SABIC", "Maaden", "Zain", "Mobily", "Jarir"];

export default function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <section className="py-16 bg-surface-950 border-y border-surface-800/50">
      <div className="container-main">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-medium text-surface-500 text-center uppercase tracking-[0.2em] mb-10"
        >
          {t("title")}
        </motion.p>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-16 items-center animate-[scroll_40s_linear_infinite] min-w-full shrink-0">
            {logoLabels.map((label, i) => (
              <div key={`a-${i}`} className="flex items-center justify-center h-10 shrink-0 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-700/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-brand-500/40" />
                  </div>
                  <span className="text-sm font-medium text-surface-400 whitespace-nowrap">{label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-16 items-center animate-[scroll_40s_linear_infinite] min-w-full shrink-0">
            {logoLabels.map((label, i) => (
              <div key={`b-${i}`} className="flex items-center justify-center h-10 shrink-0 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-700/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-brand-500/40" />
                  </div>
                  <span className="text-sm font-medium text-surface-400 whitespace-nowrap">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
