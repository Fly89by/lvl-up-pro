"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

export default function Pricing() {
  const t = useTranslations("pricing");
  const [yearly, setYearly] = useState(false);

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
    <section className="section-padding bg-surface-50">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 animate-fade-in-up">
            {t("title")}
          </h2>
          <p className="text-lg text-surface-600 mb-8">
            {t("subtitle")}
          </p>

          <div className="inline-flex items-center gap-3 bg-white border border-surface-200 rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!yearly ? "btn-primary" : "text-surface-600"}`}
            >
              {t("monthly")}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${yearly ? "btn-primary" : "text-surface-600"}`}
            >
              {t("yearly")}
              <span className="mr-1 text-xs opacity-80">{t("save")}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const isFree = plan.key === "free";
            const isPro = plan.key === "pro";
            const price = yearly ? plan.yearlyPrice : plan.price;

            return (
              <div
                key={plan.key}
                className={`glass-card relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-white border-2 border-brand-500 shadow-xl shadow-brand-100 scale-105"
                    : "bg-white border border-surface-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-surface-900">
                    {t(`${plan.key}.name`)}
                  </h3>
                  <p className="text-sm text-surface-500 mt-1">
                    {t(`${plan.key}.desc`)}
                  </p>
                </div>

                <div className="mb-8">
                  {isPro ? (
                    <div className="text-2xl font-bold text-surface-900">
                      {t("pro.cta")}
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-surface-900">
                        {price}
                      </span>
                      <span className="text-surface-500">
                        {t(`${plan.key}.currency`)}
                        {!isFree && (yearly ? "/year" : "/month")}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-surface-700">
                      <Check className="w-4 h-4 text-accent-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-full py-3 text-sm font-semibold transition-all ${
                    plan.popular
                      ? "btn-primary"
                      : "btn-secondary border border-surface-300 text-surface-700 hover:border-brand-300 hover:text-brand-700"
                  }`}
                >
                  {isPro ? t("pro.cta") : "Start Now"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
