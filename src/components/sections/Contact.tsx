"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="section-dark section-padding">
      <div className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-[0.2em]">CONTACT</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">{t("title")}</h2>
          <p className="text-surface-400">{t("subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, label: "Email", value: "hello@lvlup.sa" },
              { icon: Phone, label: "Phone", value: "+966 55 123 4567" },
              { icon: MapPin, label: "Location", value: "Riyadh, Saudi Arabia" },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <div className="text-xs text-surface-400">{item.label}</div>
                  <div className="text-sm text-white font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {sent ? (
              <div className="glass-card rounded-2xl p-8 text-center border border-emerald-500/20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-white">{t("success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-300 mb-1.5">{t("name")}</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder={t("namePlh") || "Your name"} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-300 mb-1.5">{t("email")}</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" placeholder={t("emailPlh") || "your@email.com"} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-300 mb-1.5">{t("company")}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-300 mb-1.5">{t("phone")}</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-1.5">{t("message")}</label>
                  <textarea rows={4} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full gap-2 py-3.5">
                  {t("submit")}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
