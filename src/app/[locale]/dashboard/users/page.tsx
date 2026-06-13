"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Users, Search, Shield, BadgeCheck, MoreHorizontal } from "lucide-react";

interface AppUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  last_login: string | null;
}

const roleColors: Record<string, string> = {
  org_admin: "bg-violet-50 text-violet-700",
  manager: "bg-blue-50 text-blue-700",
  inspector: "bg-emerald-50 text-emerald-700",
};

const roleNames: Record<string, string> = {
  org_admin: "Org Admin",
  manager: "Manager",
  inspector: "Inspector",
};

export default function UsersPage() {
  const t = useTranslations("dashboard");
  const supabase = createClient();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) return;

    const { data } = await supabase.from("users")
      .select("*")
      .eq("org_id", profile.org_id)
      .order("created_at", { ascending: false });
    if (data) setUsers(data);
    setLoading(false);
  }

  const filtered = users.filter((u) =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{t("users")}</h1>
          <p className="text-zinc-500 text-sm mt-1">User Management & Permissions</p>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search")}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-50 outline-none" />
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 && <p className="text-center py-12 text-zinc-400 text-sm">{t("noData")}</p>}
        {filtered.map((u) => (
          <div key={u.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-sm">
                {u.full_name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-zinc-900">{u.full_name}</p>
                  {u.is_active && <BadgeCheck className="w-4 h-4 text-emerald-500" />}
                </div>
                <p className="text-xs text-zinc-400">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[u.role] || "bg-zinc-100 text-zinc-600"}`}>
                {roleNames[u.role] || u.role}
              </span>
              {!u.is_active && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-500">Inactive</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
