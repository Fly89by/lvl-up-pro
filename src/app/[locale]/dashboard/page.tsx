"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Store, ShieldCheck, AlertTriangle, TrendingUp, Users, ListChecks } from "lucide-react";
import AIRecommendations from "@/components/dashboard/AIRecommendations";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ label, value, icon, color, gradient, trend, trendUp }: StatCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:border-brand-500/20 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-surface-400">{label}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {trend && (
            <p className={`text-xs font-medium mt-1 ${trendUp ? "text-emerald-400" : "text-red-400"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
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

  const cards: StatCardProps[] = [
    { label: t("totalBranches"), value: stats.branches, icon: <Store className="w-6 h-6 text-white" />, gradient: "from-violet-500 to-violet-700", color: "violet" },
    { label: t("totalUsers"), value: stats.users, icon: <Users className="w-6 h-6 text-white" />, gradient: "from-blue-500 to-blue-700", color: "blue" },
    { label: t("activeInspections"), value: stats.inspections, icon: <ShieldCheck className="w-6 h-6 text-white" />, gradient: "from-emerald-500 to-emerald-700", color: "emerald" },
    { label: t("openIssues"), value: stats.openIssues, icon: <AlertTriangle className="w-6 h-6 text-white" />, gradient: "from-amber-500 to-amber-700", color: "amber" },
    { label: t("avgScore"), value: `${stats.avgScore}%`, icon: <TrendingUp className="w-6 h-6 text-white" />, gradient: "from-rose-500 to-rose-700", color: "rose" },
    { label: t("pendingTasks"), value: stats.pendingTasks, icon: <ListChecks className="w-6 h-6 text-white" />, gradient: "from-cyan-500 to-cyan-700", color: "cyan" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white animate-fade-in-up">{t("welcome")}</h1>
        <p className="text-surface-400 text-sm mt-1">{t("subtitle")}</p>
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
