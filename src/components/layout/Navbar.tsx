"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe, BarChart3, ArrowRight } from "lucide-react";

const navSections = [
  { key: "features", href: "#features" },
  { key: "solutions", href: "#capabilities" },
  { key: "pricing", href: "#pricing" },
  { key: "contact", href: "#contact" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const switchLocale = locale === "ar" ? "en" : "ar";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const isLanding = !pathname.includes("/dashboard") && !pathname.includes("/login") && !pathname.includes("/register");

  return (
    <header className="fixed left-0 right-0 z-50 mx-auto w-full max-w-[1689px] px-6" style={{ top: "16px" }}>
      <div className="liquid-glass-nav rounded-[16px] md:rounded-[20px]">
        <div className="relative flex min-h-13 md:min-h-16 items-center justify-between px-4 lg:pl-6 lg:pr-1.5">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-all duration-300 group-hover:scale-105">
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-base md:text-lg font-bold text-white tracking-wide hidden sm:block">LVL UP</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 mx-4">
            {navSections.map((section) => {
              if (section.key === "solutions") {
                return (
                  <div key={section.key} className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-surface-400 hover:text-white rounded-lg hover:bg-brand-500/10 transition-all duration-200">
                      {t("products")}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" style={{ transform: isProductsOpen ? "rotate(180deg)" : "rotate(0)" }} />
                    </button>
                    {isProductsOpen && (
                      <div className="absolute top-full start-0 mt-2 w-56 glass-card rounded-xl py-2 animate-scale-in">
                        <Link href="/dashboard" className="block px-4 py-3 hover:bg-brand-500/10 transition-all duration-150">
                          <div className="text-sm font-medium text-white">{t("productsDropdown.platform")}</div>
                          <div className="text-xs text-surface-400">{t("productsDropdown.platformDesc")}</div>
                        </Link>
                        <Link href="/dashboard/branches" className="block px-4 py-3 hover:bg-brand-500/10 transition-all duration-150">
                          <div className="text-sm font-medium text-white">{t("productsDropdown.industries")}</div>
                          <div className="text-xs text-surface-400">{t("productsDropdown.industriesDesc")}</div>
                        </Link>
                        <Link href="/dashboard/templates" className="block px-4 py-3 hover:bg-brand-500/10 transition-all duration-150">
                          <div className="text-sm font-medium text-white">{t("productsDropdown.library")}</div>
                          <div className="text-xs text-surface-400">{t("productsDropdown.libraryDesc")}</div>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }
              if (isLanding) {
                return (
                  <a key={section.key} href={section.href}
                    onClick={(e) => handleNavClick(e, section.href)}
                    className="px-3 py-2 text-sm font-medium text-surface-400 hover:text-white rounded-lg hover:bg-brand-500/10 transition-all duration-200"
                  >
                    {t(section.key)}
                  </a>
                );
              }
              return (
                <Link key={section.key} href={section.href}
                  className="px-3 py-2 text-sm font-medium text-surface-400 hover:text-white rounded-lg hover:bg-brand-500/10 transition-all duration-200"
                >
                  {t(section.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="btn-ghost gap-1.5"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-mono uppercase">{locale}</span>
              </button>
              {isLangOpen && (
                <div className="absolute top-full end-0 mt-2 w-32 glass-card rounded-xl py-1 animate-scale-in">
                  <Link href={pathname} locale="ar" onClick={() => setIsLangOpen(false)}
                    className={`block w-full text-center px-4 py-2 text-sm transition-all duration-150 ${
                      locale === "ar" ? "text-brand-400 font-medium bg-brand-500/10" : "text-surface-400 hover:text-white hover:bg-brand-500/10"
                    }`}>
                    العربية
                  </Link>
                  <Link href={pathname} locale="en" onClick={() => setIsLangOpen(false)}
                    className={`block w-full text-center px-4 py-2 text-sm transition-all duration-150 ${
                      locale === "en" ? "text-brand-400 font-medium bg-brand-500/10" : "text-surface-400 hover:text-white hover:bg-brand-500/10"
                    }`}>
                    English
                  </Link>
                </div>
              )}
            </div>
            <Link href="/login" className="btn-ghost">{t("login")}</Link>
            <Link href="/register" className="btn-primary text-sm gap-2">
              {t("getStarted")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <button className="lg:hidden p-2 text-surface-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-2 glass rounded-[16px] border border-brand-500/10 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navSections.map((section) => (
              <a key={section.key} href={section.href}
                onClick={(e) => handleNavClick(e, section.href)}
                className="block text-sm font-medium text-surface-400 hover:text-white py-2.5 px-3 rounded-lg hover:bg-brand-500/10 transition-colors"
              >
                {t(section.key)}
              </a>
            ))}
            <div className="flex gap-2 pt-3 px-3">
              <Link href={pathname} locale={switchLocale} className="flex-1 text-center btn-ghost text-sm border border-white/10">
                <Globe className="w-4 h-4 inline" /> {locale === "ar" ? "English" : "العربية"}
              </Link>
              <Link href="/register" className="flex-1 text-center btn-primary text-sm gap-2">
                {t("getStarted")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
