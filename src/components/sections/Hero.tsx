"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50" />
      <div className="absolute top-20 left-1/4 w-[30rem] h-[30rem] bg-brand-300/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-20 right-1/4 w-[25rem] h-[25rem] bg-accent-300/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.03)_0%,_transparent_70%)]" />

      <div className="container-main relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 text-sm font-medium text-brand-700 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent-500" />
            Integrated Performance Analysis Platform
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-surface-900 leading-[1.1] mb-8 animate-fade-in-up">
            {t.raw("title").split("\n").map((line: string, i: number) => (
              <span key={i}>
                {i === 0 ? (
                  <>{line}</>
                ) : (
                  <><br /><span className="gradient-text">{line}</span></>
                )}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-surface-600 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link
              href="/contact"
              className="btn-primary gap-2 rounded-full px-8 py-3.5 text-base shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30"
            >
              {t("ctaPrimary")}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/register"
              className="btn-secondary rounded-full px-8 py-3.5 text-base"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="mt-20 relative mx-auto max-w-5xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-brand-500/10">
            <div className="aspect-video bg-gradient-to-br from-brand-600/5 via-surface-50 to-accent-500/5 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2RjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0wIDM2YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzek01NCAzNmMxLjY1NyAwIDMtMS4zNDMgMy0zcy0xLjM0My0zLTMtMy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgM3oiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
              <div className="text-center relative z-10 p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl glass-card flex items-center justify-center">
                  <svg className="w-10 h-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-base font-medium text-surface-600 mb-2">Dashboard Preview</p>
                <div className="flex items-center justify-center gap-2 text-sm text-surface-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Live Demo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
