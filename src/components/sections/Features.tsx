import { useTranslations } from "next-intl";
import { Search, CheckCircle2, TrendingUp } from "lucide-react";

const icons = [Search, CheckCircle2, TrendingUp];

export default function Features() {
  const t = useTranslations("features");

  const items = [
    { title: t("item1.title"), desc: t("item1.desc") },
    { title: t("item2.title"), desc: t("item2.desc") },
    { title: t("item3.title"), desc: t("item3.desc") },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-zinc-600">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="group relative bg-white border border-zinc-100 rounded-2xl p-8 hover:border-brand-100 hover:shadow-lg hover:shadow-brand-50/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
