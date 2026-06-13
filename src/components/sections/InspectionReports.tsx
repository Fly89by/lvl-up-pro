import { useTranslations } from "next-intl";
import { FileText, CheckCircle } from "lucide-react";

export default function InspectionReports() {
  const t = useTranslations("inspectionReports");

  return (
    <section className="section-padding bg-zinc-50">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-zinc-500 mb-2">
              {t("subtitle")}
            </p>
            <p className="text-zinc-600 leading-relaxed mb-8">
              {t("description")}
            </p>
            <ul className="space-y-3">
              {["Photos & Video", "Digital Signature", "Auto Scoring", "PDF Reports"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-zinc-700">
                  <CheckCircle className="w-5 h-5 text-accent-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-[4/3] rounded-2xl bg-white border border-zinc-200 shadow-xl flex items-center justify-center">
              <FileText className="w-12 h-12 text-zinc-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
