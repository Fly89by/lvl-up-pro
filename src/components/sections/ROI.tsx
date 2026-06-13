"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const stats = [
  { key: "quality", value: 92, suffix: "%" },
  { key: "issues", value: 78, suffix: "%" },
  { key: "sales", value: 35, suffix: "%" },
  { key: "hours", value: 40, suffix: "%" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-4xl md:text-5xl font-bold gradient-text">
      {current}{suffix}
    </span>
  );
}

export default function ROI() {
  const t = useTranslations("roi");

  return (
    <section className="section-padding bg-gradient-to-br from-brand-900 via-brand-800 to-accent-900 text-white">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-white/70">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-white/80 font-medium">
                {t(stat.key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
