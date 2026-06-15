"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("auth");
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message === "Invalid login credentials" ? t("invalidCredentials") : authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950 px-4">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="hero-glow top-[-300px] left-[-200px]" />
      <div className="hero-glow bottom-[-300px] right-[-200px]" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-all">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">LVL UP</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">{t("signIn")}</h1>
          <p className="text-surface-400 mt-1">{t("accessAccount")}</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card rounded-2xl p-8 space-y-5 animate-fade-in-up">
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">{t("email")}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"
              placeholder={t("emailPlaceholder")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">{t("password")}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"
              placeholder={t("enterPassword")}
            />
          </div>

          {error && <div className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20">{error}</div>}

          <button type="submit" disabled={loading} className="w-full btn-primary py-3.5">
            {loading ? t("signingIn") : t("signIn")}
          </button>

          <p className="text-center text-sm text-surface-500">
            {t("noAccount")}{" "}
            <Link href="/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">{t("createOne")}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
