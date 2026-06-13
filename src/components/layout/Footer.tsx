import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-surface-900 text-surface-400 section-padding">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg gradient-brand transition-transform duration-200 group-hover:scale-105" />
              <span className="text-lg font-bold text-white">LVL Up</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Integrated platform for branch performance analysis and smart inspection
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">{t("privacy")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">{t("terms")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-800 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} LVL Up. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}
