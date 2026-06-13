"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const faqs = [1, 2, 3, 4];

export default function FAQ() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-main max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            {t("title")}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border border-zinc-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-right"
                >
                  <span className="font-medium text-zinc-900">{t(`q${i}`)}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-zinc-600 leading-relaxed">
                    {t(`a${i}`)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
