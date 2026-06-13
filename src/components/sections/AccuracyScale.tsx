import { useTranslations } from "next-intl";

export default function AccuracyScale() {
  const t = useTranslations("accuracy");

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center gap-12">
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
            <div className="flex flex-wrap gap-4">
              {["Real-time Tracking", "Smart Reports", "Advanced Analytics", "Seamless Integration"].map((tag) => (
                <span key={tag} className="text-sm bg-brand-50 text-brand-700 rounded-full px-4 py-1.5 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 border border-brand-100 shadow-xl flex items-center justify-center">
              <p className="text-zinc-400 text-sm font-medium">Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
