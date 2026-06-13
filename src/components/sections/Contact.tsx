"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Send } from "lucide-react";

export default function Contact() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-brand-50 to-accent-50">
      <div className="container-main max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-900 mb-4 animate-fade-in-up">
            {t("title")}
          </h2>
          <p className="text-lg text-surface-600">
            {t("subtitle")}
          </p>
        </div>

        {sent ? (
          <div className="glass-card bg-white rounded-2xl p-8 text-center shadow-lg border border-green-100">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium text-surface-900">{t("success")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card bg-white rounded-2xl p-8 shadow-lg border border-surface-100 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">{t("name")}</label>
                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">{t("email")}</label>
                <input type="email" required className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">{t("company")}</label>
                <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">{t("phone")}</label>
                <input type="tel" className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">{t("message")}</label>
              <textarea rows={4} required className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 text-white gradient-brand rounded-xl px-6 py-3 font-medium hover:opacity-90 transition-opacity">
              {t("submit")}
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
