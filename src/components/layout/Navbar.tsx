"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe, BarChart3, ArrowRight, LayoutDashboard, Building2, Library } from "lucide-react";

const navSections = [
  { key: "features", href: "#features" },
  { key: "solutions", href: "#capabilities" },
  { key: "pricing", href: "#pricing" },
  { key: "contact", href: "#contact" },
];

const productLinks = [
  { key: "platform", href: "/dashboard", icon: LayoutDashboard },
  { key: "industries", href: "/dashboard/branches", icon: Building2 },
  { key: "library", href: "/dashboard/templates", icon: Library },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const switchLocale = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setIsProductsOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const isLanding =
    !pathname.includes("/dashboard") &&
    !pathname.includes("/login") &&
    !pathname.includes("/register");

  return (
    <header className="fixed left-0 right-0 z-50 mx-auto w-full px-4 md:px-6" style={{ top: "16px" }}>
      <div className="liquid-glass-nav rounded-[20px] mx-auto max-w-[1800px]">
        <div className="relative flex min-h-14 md:min-h-16 items-center justify-between px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-all duration-300 group-hover:scale-105">
              <BarChart3 className="w-5 h-5 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-base md:text-lg font-bold text-white tracking-wide">LVL UP</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 mx-6 flex-1 justify-center">
            {navSections.map((section) => {
              if (section.key === "solutions") {
                return (
                  <div key={section.key} className="relative" ref={productsRef}>
                    <button
                      onClick={() => setIsProductsOpen((prev) => !prev)}
                      onMouseEnter={() => setIsProductsOpen(true)}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-surface-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
                    >
                      {t("products")}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isProductsOpen && (
                      <div
                        onMouseEnter={() => setIsProductsOpen(true)}
                        onMouseLeave={() => setIsProductsOpen(false)}
                        className="absolute top-full start-1/2 -translate-x-1/2 pt-3"
                      >
                        <div className="w-64 glass-card rounded-2xl py-3 animate-scale-in shadow-2xl shadow-emerald-500/5">
                          <div className="px-4 pb-2 mb-2 border-b border-white/5">
                            <div className="text-xs font-medium text-surface-500 uppercase tracking-wider">{t("products")}</div>
                          </div>
                          {productLinks.map(({ key, href, icon: Icon }) => (
                            <Link
                              key={key}
                              href={href}
                              onClick={() => { setIsProductsOpen(false); setIsMenuOpen(false); }}
                              className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-all duration-150 group/item"
                            >
                              <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-brand-500/20 transition-colors">
                                <Icon className="w-4.5 h-4.5 text-brand-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{t(`productsDropdown.${key}`)}</div>
                                <div className="text-xs text-surface-400 mt-0.5">{t(`productsDropdown.${key}Desc`)}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              if (isLanding) {
                return (
                  <a key={section.key} href={section.href}
                    onClick={(e) => handleNavClick(e, section.href)}
                    className="px-4 py-2 text-sm font-medium text-surface-400 hover:text-white rounded-lg hover:bg-brand-500/10 transition-all duration-200 whitespace-nowrap"
                  >
                    {t(section.key)}
                  </a>
                );
              }
              return (
                <Link key={section.key} href={section.href}
                  className="px-4 py-2 text-sm font-medium text-surface-400 hover:text-white rounded-lg hover:bg-brand-500/10 transition-all duration-200 whitespace-nowrap"
                >
                  {t(section.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="btn-ghost gap-1.5 px-3 py-2"
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
            <Link href="/login" className="btn-ghost px-4 py-2">{t("login")}</Link>
            <Link href="/register" className="btn-primary text-sm gap-2 px-6 py-2.5">
              {t("getStarted")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <button className="lg:hidden p-2.5 text-surface-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-[1800px] glass rounded-[20px] border border-brand-500/10 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navSections.map((section) => {
              if (section.key === "solutions") {
                return (
                  <div key={section.key} className="space-y-1">
                    <div className="text-sm font-medium text-surface-400 px-3 py-2.5">{t("products")}</div>
                    {productLinks.map(({ key, href, icon: Icon }) => (
                      <Link key={key} href={href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-500/10 transition-colors"
                      >
                        <Icon className="w-4.5 h-4.5 text-brand-400 shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-white">{t(`productsDropdown.${key}`)}</div>
                          <div className="text-xs text-surface-400">{t(`productsDropdown.${key}Desc`)}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                );
              }
              return (
                <a key={section.key} href={section.href}
                  onClick={(e) => handleNavClick(e, section.href)}
                  className="block text-sm font-medium text-surface-400 hover:text-white py-2.5 px-3 rounded-lg hover:bg-brand-500/10 transition-colors"
                >
                  {t(section.key)}
                </a>
              );
            })}
            <div className="flex gap-3 pt-4 px-3">
              <Link href={pathname} locale={switchLocale} className="flex-1 text-center btn-ghost text-sm border border-white/10 py-2.5">
                <Globe className="w-4 h-4 inline" /> {locale === "ar" ? "English" : "العربية"}
              </Link>
              <Link href="/register" className="flex-1 text-center btn-primary text-sm gap-2 py-2.5">
                {t("getStarted")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
