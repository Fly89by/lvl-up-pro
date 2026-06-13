import { useTranslations } from "next-intl";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-surface-950 text-surface-400 border-t border-surface-800/50">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-all">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Tamayuz</span>
            </Link>
            <p className="text-sm leading-relaxed text-surface-500 max-w-sm">{t("description") || "Integrated platform for branch performance analysis and smart inspection powered by AI."}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t("platform") || "Platform"}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#features" className="text-surface-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Features</Link></li>
              <li><Link href="#pricing" className="text-surface-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-surface-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t("company") || "Company"}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-surface-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">About</Link></li>
              <li><Link href="#" className="text-surface-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Blog</Link></li>
              <li><Link href="#contact" className="text-surface-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t("legal") || "Legal"}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-surface-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">{t("privacy")}</Link></li>
              <li><Link href="#" className="text-surface-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">{t("terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Tamayuz. {t("rights")}.</p>
          <div className="flex items-center gap-4 text-surface-500">
            <span>AI-Powered Analytics</span>
            <span className="w-1 h-1 rounded-full bg-surface-600" />
            <span>SOC 2 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
