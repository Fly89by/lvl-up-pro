"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const switchLocale = locale === "ar" ? "en" : "ar";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-200/50">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl gradient-brand transition-transform duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-500/25" />
            <span className="text-lg font-bold text-surface-900">LVL Up</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-surface-600 hover:text-brand-600 transition-all duration-200 hover:-translate-y-0.5">
              {t("features")}
            </Link>

            <div className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-surface-600 hover:text-brand-600 transition-all duration-200">
                {t("products")}
                <ChevronDown className="w-4 h-4 transition-transform duration-200" style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0)" }} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full start-0 mt-2 w-56 glass-card py-2 animate-scale-in">
                  <Link href="/platform" className="block px-4 py-3 hover:bg-surface-50 transition-all duration-150">
                    <div className="text-sm font-medium text-surface-900">{t("productsDropdown.platform")}</div>
                    <div className="text-xs text-surface-500">{t("productsDropdown.platformDesc")}</div>
                  </Link>
                  <Link href="/industries" className="block px-4 py-3 hover:bg-surface-50 transition-all duration-150">
                    <div className="text-sm font-medium text-surface-900">{t("productsDropdown.industries")}</div>
                    <div className="text-xs text-surface-500">{t("productsDropdown.industriesDesc")}</div>
                  </Link>
                  <Link href="/library" className="block px-4 py-3 hover:bg-surface-50 transition-all duration-150">
                    <div className="text-sm font-medium text-surface-900">{t("productsDropdown.library")}</div>
                    <div className="text-xs text-surface-500">{t("productsDropdown.libraryDesc")}</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/pricing" className="text-sm font-medium text-surface-600 hover:text-brand-600 transition-all duration-200 hover:-translate-y-0.5">
              {t("pricing")}
            </Link>
            <Link href="/contact" className="text-sm font-medium text-surface-600 hover:text-brand-600 transition-all duration-200 hover:-translate-y-0.5">
              {t("contact")}
            </Link>
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
                <div className="absolute top-full end-0 mt-2 w-32 glass-card py-1 animate-scale-in">
                  <Link href={pathname} locale="ar" onClick={() => setIsLangOpen(false)}
                    className={`block w-full text-center px-4 py-2 text-sm transition-all duration-150 ${
                      locale === "ar" ? "text-brand-600 bg-brand-50 font-medium" : "text-surface-600 hover:bg-surface-50"
                    }`}>
                    العربية
                  </Link>
                  <Link href={pathname} locale="en" onClick={() => setIsLangOpen(false)}
                    className={`block w-full text-center px-4 py-2 text-sm transition-all duration-150 ${
                      locale === "en" ? "text-brand-600 bg-brand-50 font-medium" : "text-surface-600 hover:bg-surface-50"
                    }`}>
                    English
                  </Link>
                </div>
              )}
            </div>
            <Link href="/login" className="btn-ghost">
              {t("login")}
            </Link>
            <Link href="/contact" className="btn-primary">
              {t("getStarted")}
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-surface-600 hover:text-surface-900 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-surface-200/50 py-4 space-y-2 animate-fade-in">
            <Link href="/" className="block text-sm font-medium text-surface-600 py-2 px-2 hover:text-brand-600 transition-colors">{t("features")}</Link>
            <Link href="/pricing" className="block text-sm font-medium text-surface-600 py-2 px-2 hover:text-brand-600 transition-colors">{t("pricing")}</Link>
            <Link href="/contact" className="block text-sm font-medium text-surface-600 py-2 px-2 hover:text-brand-600 transition-colors">{t("contact")}</Link>
            <div className="flex gap-2 pt-2 px-2">
              <Link href={pathname} locale={switchLocale} className="flex-1 text-center btn-ghost text-sm">
                <Globe className="w-4 h-4 inline" /> {locale === "ar" ? "English" : "العربية"}
              </Link>
              <Link href="/contact" className="flex-1 text-center btn-primary text-sm">
                {t("getStarted")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
