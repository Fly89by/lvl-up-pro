"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const t = useTranslations("dashboard");
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("en");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user: u } } = await supabase.auth.getUser();
      if (!u) return;
      setUser(u);
      const { data: p } = await supabase.from("users").select("*").eq("id", u.id).single();
      if (p) {
        setProfile(p);
        setFullName(p.full_name);
        setPhone(p.phone || "");
        setLanguage(p.language);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await supabase.from("users").update({ full_name: fullName, phone, language }).eq("id", user.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleLanguageChange(newLang: string) {
    setLanguage(newLang);
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-zinc-900">{t("settings")}</h1>
        <p className="text-zinc-500 text-sm mt-1">Personal Account Settings</p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
        <div className="flex items-center gap-4 pb-6 border-b border-zinc-100">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white text-xl font-bold">
            {fullName.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">{fullName}</h2>
            <p className="text-sm text-zinc-500">{user?.email}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700">
              {profile?.role === "org_admin" ? "Org Admin" : profile?.role === "manager" ? "Manager" : profile?.role === "inspector" ? "Inspector" : profile?.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5 pt-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Language</label>
            <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none">
              <option value="ar">Arabic</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : t("save")}
            </button>
            {saved && (
              <span className="text-sm text-emerald-600 font-medium">Saved successfully</span>
            )}
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-900 mb-3">AI Integration</h3>
          <div className="bg-gradient-to-br from-purple-50 to-brand-50 rounded-2xl border border-purple-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-zinc-800">Nemotron 3 Ultra</span>
              <span className="text-[10px] text-zinc-400 bg-white px-1.5 py-0.5 rounded">Free Tier</span>
            </div>
            <p className="text-xs text-zinc-600">AI analysis, recommendations, and smart assistant are active and powered by Nemotron 3 Ultra via OpenRouter.</p>
          </div>
        </div>
      </div>
    </div>
  );
}