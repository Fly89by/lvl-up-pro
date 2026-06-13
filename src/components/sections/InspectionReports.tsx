"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Camera, PenSquare, BarChart3, FileSpreadsheet } from "lucide-react";

const features = [
  { icon: Camera, label: "Photos & Video" },
  { icon: PenSquare, label: "Digital Signature" },
  { icon: BarChart3, label: "Auto Scoring" },
  { icon: FileSpreadsheet, label: "PDF Reports" },
];

export default function InspectionReports() {
  const t = useTranslations("inspectionReports");

  return (
    <section className="section-dark section-padding">
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=700&q=80" alt="Inspection Report" className="w-full h-auto" loading="lazy" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-[0.2em]">{t("subtitle")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">{t("title")}</h2>
            <p className="text-surface-400 leading-relaxed mb-8">{t("description")}</p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-3 text-sm text-surface-300 glass-card rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/15 flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-brand-400" />
                  </div>
                  {f.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
