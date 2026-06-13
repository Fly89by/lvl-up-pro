"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, Search, Eye, Filter, Plus } from "lucide-react";

interface Inspection {
  id: string;
  branch_id: string;
  template_id: string;
  inspector_id: string;
  status: string;
  score: number | null;
  submitted_at: string | null;
}

const statusColors: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-600",
  in_progress: "bg-blue-50 text-blue-700",
  submitted: "bg-amber-50 text-amber-700",
  reviewed: "bg-violet-50 text-violet-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

const statusNames: Record<string, string> = {
  draft: "Draft",
  in_progress: "In Progress",
  submitted: "Submitted",
  reviewed: "Reviewed",
  approved: "Approved",
  rejected: "Rejected",
};

export default function InspectionsPage() {
  const t = useTranslations("dashboard");
  const supabase = createClient();
  const [inspections, setInspections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInspections();
  }, []);

  async function loadInspections() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) return;

    const { data } = await supabase.from("inspections")
      .select("*, branches(name), templates(title)")
      .eq("org_id", profile.org_id)
      .order("created_at", { ascending: false });
    if (data) setInspections(data);
    setLoading(false);
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{t("inspections")}</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage Inspections</p>
        </div>
        <Link href="/dashboard/inspections/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors">
          <Plus className="w-4 h-4" />
          {t("create")}
        </Link>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search")}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none" />
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">{t("branch")}</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">{t("template")}</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">{t("status")}</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">{t("score")}</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">{t("date")}</th>
              </tr>
            </thead>
            <tbody>
              {inspections.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-zinc-400 text-sm">{t("noData")}</td></tr>
              )}
              {inspections.map((ins) => (
                <tr key={ins.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">{ins.branches?.name || "-"}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{ins.templates?.title || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ins.status] || "bg-zinc-100"}`}>
                      {statusNames[ins.status] || ins.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ins.score != null ? (
                      <span className={`text-sm font-semibold ${ins.score >= 80 ? "text-emerald-600" : ins.score >= 50 ? "text-amber-600" : "text-red-600"}`}>
                        {ins.score}%
                      </span>
                    ) : (
                      <span className="text-sm text-zinc-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {ins.submitted_at ? new Date(ins.submitted_at).toLocaleDateString("en-US") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
