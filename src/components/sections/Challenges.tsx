import { useTranslations } from "next-intl";
import { Target, Eye, FileText, Users } from "lucide-react";

const icons = [Target, Eye, FileText, Users];

export default function Challenges() {
  const t = useTranslations("challenges");

  const items = [
    { title: t("item1.title"), desc: t("item1.desc") },
    { title: t("item2.title"), desc: t("item2.desc") },
    { title: t("item3.title"), desc: t("item3.desc") },
    { title: t("item4.title"), desc: t("item4.desc") },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 opacity-0 group-hover:opacity-100 transition-opacity blur" />
                <div className="relative bg-white rounded-2xl p-6 border border-zinc-100 group-hover:border-transparent transition-all">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-600">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
