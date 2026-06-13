"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, MapPin, Phone, Building2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface Branch {
  id: string;
  name: string;
  city: string | null;
  address: string | null;
  phone: string | null;
  is_active: boolean;
}

export default function BranchesPage() {
  const t = useTranslations("dashboard");
  const supabase = createClient();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBranches();
  }, []);

  async function loadBranches() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) return;

    const { data } = await supabase.from("branches")
      .select("*")
      .eq("org_id", profile.org_id)
      .order("created_at", { ascending: false });
    if (data) setBranches(data);
    setLoading(false);
  }

  const filtered = branches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    (b.city?.toLowerCase() || "").includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{t("branches")}</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage Organization Branches</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors">
          <Plus className="w-4 h-4" />
          {t("create")}
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search")}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none"
        />
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">{t("branch")}</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">City</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">Phone</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-zinc-400 text-sm">{t("noData")}</td></tr>
              )}
              {filtered.map((branch) => (
                <tr key={branch.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-brand-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">{branch.name}</p>
                        {branch.address && <p className="text-xs text-zinc-400">{branch.address}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{branch.city || "-"}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600">{branch.phone || "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      branch.is_active ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                    }`}>
                      {branch.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg text-zinc-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
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
