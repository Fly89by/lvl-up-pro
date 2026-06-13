"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  LayoutDashboard, Store, Users, ClipboardCheck, ShieldCheck,
  AlertTriangle, ListChecks, BarChart3, LogOut, Menu, X,
  ChevronLeft, ChevronRight, Building2, Settings, Bell, QrCode, ChevronRight as ChevronRightIcon
} from "lucide-react";
import AIAssistant from "@/components/dashboard/AIAssistant";

const sidebarLinks = [
  { href: "", icon: LayoutDashboard, key: "overview" },
  { href: "/branches", icon: Store, key: "branches" },
  { href: "/users", icon: Users, key: "users" },
  { href: "/templates", icon: ClipboardCheck, key: "templates" },
  { href: "/inspections", icon: ShieldCheck, key: "inspections" },
  { href: "/issues", icon: AlertTriangle, key: "issues" },
  { href: "/tasks", icon: ListChecks, key: "tasks" },
  { href: "/reports", icon: BarChart3, key: "reports" },
  { href: "/notifications", icon: Bell, key: "notifications" },
  { href: "/qr", icon: QrCode, key: "qr" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
  }, [supabase, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-950">
        <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 flex">
      <aside className={`fixed top-0 bottom-0 z-40 flex flex-col glass border-r border-brand-500/10 transition-all duration-300 left-0 ${sidebarOpen ? "w-64" : "w-16"}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-brand-500/10">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">LVL UP</span>
            </Link>
          )}
          {!sidebarOpen && <Link href="/"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 mx-auto" /></Link>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg text-surface-400 hover:text-white hover:bg-white/5 transition-colors">
            <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarOpen ? "" : "rotate-180"}`} />
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === `/dashboard${link.href}`;
            return (
              <Link key={link.key} href={`/dashboard${link.href}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-500/15 text-brand-300 border border-brand-500/20"
                    : "text-surface-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span>{t(link.key)}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-brand-500/10 p-2 space-y-1">
          <Link href="/dashboard/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              pathname.includes("/settings") ? "bg-brand-500/15 text-brand-300" : "text-surface-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>{t("settings")}</span>}
          </Link>
          <button onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>{t("signOut")}</span>}
          </button>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <header className="sticky top-0 z-30 h-16 glass border-b border-brand-500/10 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl text-surface-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl text-surface-400 hover:text-white hover:bg-white/5 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-surface-300 max-w-[120px] truncate">{user?.email}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
        <AIAssistant />
      </div>
    </div>
  );
}
