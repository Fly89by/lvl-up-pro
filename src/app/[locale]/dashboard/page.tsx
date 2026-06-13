"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Store, ShieldCheck, AlertTriangle, TrendingUp, Building2, Users, ClipboardCheck, ListChecks } from "lucide-react";
import AIRecommendations from "@/components/dashboard/AIRecommendations";

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
}

function StatCard({ label, value, icon, trend, trendUp, color }: StatCard) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{label}</p>
          <p className="text-2xl font-bold text-zinc-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-xs font-medium mt-1 ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardOverview() {
  const t = useTranslations("dashboard");
  const supabase = createClient();
  const [stats, setStats] = useState({ branches: 0, inspections: 0, openIssues: 0, avgScore: 0, users: 0, pendingTasks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
      if (!profile) return;

      const orgId = profile.org_id;
      const [branchesRes, inspectionsRes, issuesRes, usersRes, tasksRes] = await Promise.all([
        supabase.from("branches").select("id", { count: "exact", head: true }).eq("org_id", orgId).eq("is_active", true),
        supabase.from("inspections").select("score").eq("org_id", orgId).neq("status", "draft"),
        supabase.from("issues").select("id", { count: "exact", head: true }).eq("org_id", orgId).neq("status", "closed"),
        supabase.from("users").select("id", { count: "exact", head: true }).eq("org_id", orgId),
        supabase.from("tasks").select("id", { count: "exact", head: true }).eq("org_id", orgId).neq("status", "completed").neq("status", "cancelled"),
      ]);

      const inspections = inspectionsRes.data || [];
      const avgScore = inspections.length > 0
        ? Math.round(inspections.reduce((sum, i) => sum + (i.score || 0), 0) / inspections.length)
        : 0;

      setStats({
        branches: branchesRes.count || 0,
        inspections: inspectionsRes.count || 0,
        openIssues: issuesRes.count || 0,
        avgScore,
        users: usersRes.count || 0,
        pendingTasks: tasksRes.count || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const cards: StatCard[] = [
    { label: t("totalBranches"), value: stats.branches, icon: <Store className="w-6 h-6 text-white" />, color: "bg-violet-500", trend: "", trendUp: true },
    { label: t("totalUsers"), value: stats.users, icon: <Users className="w-6 h-6 text-white" />, color: "bg-blue-500", trend: "", trendUp: true },
    { label: t("activeInspections"), value: stats.inspections, icon: <ShieldCheck className="w-6 h-6 text-white" />, color: "bg-emerald-500", trend: "", trendUp: true },
    { label: t("openIssues"), value: stats.openIssues, icon: <AlertTriangle className="w-6 h-6 text-white" />, color: "bg-amber-500", trend: "", trendUp: false },
    { label: t("avgScore"), value: `${stats.avgScore}%`, icon: <TrendingUp className="w-6 h-6 text-white" />, color: "bg-rose-500", trend: "", trendUp: true },
    { label: t("pendingTasks"), value: stats.pendingTasks, icon: <ListChecks className="w-6 h-6 text-white" />, color: "bg-cyan-500", trend: "", trendUp: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-zinc-900">{t("welcome")}</h1>
        <p className="text-zinc-500 text-sm mt-1">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <AIRecommendations />
    </div>
  );
}
