import { useTranslations } from "next-intl";

const logos = Array.from({ length: 8 }, (_, i) => i + 1);

export default function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <section className="py-12 bg-surface-50 border-y border-surface-100">
      <div className="container-main">
        <p className="text-xs font-medium text-surface-400 text-center uppercase tracking-widest mb-8">
          {t("title")}
        </p>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex gap-16 animate-[scroll_30s_linear_infinite] min-w-full shrink-0">
            {logos.map((i) => (
              <div key={`a-${i}`} className="flex items-center justify-center h-8 w-24 shrink-0">
                <div className="w-full h-full rounded bg-surface-200/50 flex items-center justify-center">
                  <span className="text-xs text-surface-400 font-medium">Logo {i}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-16 animate-[scroll_30s_linear_infinite] min-w-full shrink-0">
            {logos.map((i) => (
              <div key={`b-${i}`} className="flex items-center justify-center h-8 w-24 shrink-0">
                <div className="w-full h-full rounded bg-surface-200/50 flex items-center justify-center">
                  <span className="text-xs text-surface-400 font-medium">Logo {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
