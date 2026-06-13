"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ClipboardCheck, Search, Plus, FileText, Eye } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  is_public: boolean;
  sections: any[];
  version: number;
  created_at: string;
}

export default function TemplatesPage() {
  const t = useTranslations("dashboard");
  const supabase = createClient();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) return;

    const { data } = await supabase.from("templates")
      .select("*")
      .or(`org_id.eq.${profile.org_id},is_public.eq.true`)
      .order("created_at", { ascending: false });
    if (data) setTemplates(data);
    setLoading(false);
  }

  const filtered = templates.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-surface-900 animate-fade-in-up">{t("templates")}</h1>
          <p className="text-surface-500 text-sm mt-1">Ready-made and custom inspection templates</p>
        </div>
        <Link href="/dashboard/templates/new" className="btn-primary">
          <Plus className="w-4 h-4" />
          {t("create")}
        </Link>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search")}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-surface-200 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && <p className="col-span-full text-center py-12 text-surface-400 text-sm">{t("noData")}</p>}
        {filtered.map((tmpl) => (
          <div key={tmpl.id} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-5 hover:shadow-md transition-shadow glass-card">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand-600" />
              </div>
              {tmpl.is_public && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">Public</span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-surface-900 mt-3">{tmpl.title}</h3>
            {tmpl.description && <p className="text-xs text-surface-500 mt-1 line-clamp-2">{tmpl.description}</p>}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-50">
              <span className="text-xs text-surface-400">{tmpl.sections?.length || 0} sections</span>
              <span className="text-xs text-surface-400">Version {tmpl.version}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
