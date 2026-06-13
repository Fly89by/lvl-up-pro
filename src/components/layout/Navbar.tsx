"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand" />
            <span className="text-lg font-bold text-zinc-900">Joynt</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-brand-600 transition-colors">
              {t("features")}
            </Link>

            <div className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-brand-600 transition-colors">
                {t("products")}
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-zinc-100 py-2">
                  <Link href="/platform" className="block px-4 py-3 hover:bg-zinc-50 transition-colors">
                    <div className="text-sm font-medium text-zinc-900">{t("productsDropdown.platform")}</div>
                    <div className="text-xs text-zinc-500">{t("productsDropdown.platformDesc")}</div>
                  </Link>
                  <Link href="/industries" className="block px-4 py-3 hover:bg-zinc-50 transition-colors">
                    <div className="text-sm font-medium text-zinc-900">{t("productsDropdown.industries")}</div>
                    <div className="text-xs text-zinc-500">{t("productsDropdown.industriesDesc")}</div>
                  </Link>
                  <Link href="/library" className="block px-4 py-3 hover:bg-zinc-50 transition-colors">
                    <div className="text-sm font-medium text-zinc-900">{t("productsDropdown.library")}</div>
                    <div className="text-xs text-zinc-500">{t("productsDropdown.libraryDesc")}</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/pricing" className="text-sm font-medium text-zinc-600 hover:text-brand-600 transition-colors">
              {t("pricing")}
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 hover:text-brand-600 transition-colors">
              {t("blog")}
            </Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-brand-600 transition-colors">
              {t("contact")}
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-600 hover:text-brand-600 transition-colors px-3 py-2"
            >
              {t("login")}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-white gradient-brand rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
              {t("getStarted")}
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-zinc-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-zinc-100 py-4 space-y-3">
            <Link href="/" className="block text-sm font-medium text-zinc-600 py-2">{t("features")}</Link>
            <Link href="/pricing" className="block text-sm font-medium text-zinc-600 py-2">{t("pricing")}</Link>
            <Link href="/blog" className="block text-sm font-medium text-zinc-600 py-2">{t("blog")}</Link>
            <Link href="/contact" className="block text-sm font-medium text-zinc-600 py-2">{t("contact")}</Link>
            <div className="flex gap-3 pt-2">
              <Link href="/contact" className="flex-1 text-center text-sm font-medium text-white gradient-brand rounded-full px-5 py-2.5">
                {t("getStarted")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}