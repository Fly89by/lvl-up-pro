"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl" />

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            Integrated Performance Analysis Platform
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 leading-tight mb-6">
            {t.raw("title").split("\n").map((line: string, i: number) => (
              <span key={i}>
                {i === 0 ? line : <><br />{line}</>}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-white gradient-brand rounded-full px-8 py-3.5 text-base font-medium hover:opacity-90 transition-opacity shadow-lg shadow-brand-200"
            >
              {t("ctaPrimary")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-zinc-700 bg-white border border-zinc-200 rounded-full px-8 py-3.5 text-base font-medium hover:border-brand-200 hover:text-brand-700 transition-colors"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="mt-16 relative mx-auto max-w-5xl">
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 border border-white/50 shadow-2xl flex items-center justify-center">
            <div className="text-center text-zinc-400">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/80 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-zinc-500">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}