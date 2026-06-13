"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

export default function Pricing() {
  const t = useTranslations("pricing");
  const [yearly, setYearly] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      key: "free",
      price: 0,
      yearlyPrice: 0,
      features: t.raw("free.features") as string[],
    },
    {
      key: "growth",
      price: 99,
      yearlyPrice: 990,
      features: t.raw("growth.features") as string[],
      popular: true,
    },
    {
      key: "pro",
      price: null,
      features: t.raw("pro.features") as string[],
      custom: true,
    },
  ];

  return (
    <section id="pricing" className="section-dark section-padding">
      <div className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-[0.2em]">PRICING</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">{t("title")}</h2>
          <p className="text-surface-400">{t("subtitle")}</p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 glass-card rounded-full p-1">
            <button onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${!yearly ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' : 'text-surface-400 hover:text-white'}`}
            >
              {t("monthly")}
            </button>
            <button onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${yearly ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' : 'text-surface-400 hover:text-white'}`}
            >
              {t("yearly")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const isPro = plan.key === "pro";
            const price = yearly ? plan.yearlyPrice : plan.price;

            return (
              <motion.div key={plan.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                onMouseEnter={() => setHoveredPlan(plan.key)} onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${plan.popular ? 'glass-card border-brand-500/40 scale-105 md:scale-105' : 'glass-card hover:border-brand-500/20'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-brand-500/30">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <h3 className="text-lg font-semibold text-white mb-1">{t(`${plan.key}.name`)}</h3>
                <p className="text-sm text-surface-400 mb-6">{t(`${plan.key}.desc`)}</p>

                <div className="mb-8">
                  {isPro ? (
                    <div className="text-3xl font-bold gradient-text">{t("pro.cta")}</div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">{price}</span>
                      <span className="text-surface-400 ml-1">{t(`${plan.key}.currency`)}{!isPro && !plan.key.includes("free") && (yearly ? "/year" : "/month")}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-surface-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full rounded-full py-3 text-sm font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'btn-primary shadow-lg'
                    : 'border border-white/10 text-surface-300 hover:bg-white/5 hover:text-white'
                }`}>
                  {isPro ? t("pro.cta") : t("cta") || "Start Now"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
