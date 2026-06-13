"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { BarChart3, Download, TrendingUp, TrendingDown, Minus, Sparkles, X, Loader2 } from "lucide-react";

type ReportType = "branches" | "users" | "inspections" | "issues" | "tasks";

interface ReportData {
  labels: string[];
  values: number[];
  total: number;
}

export default function ReportsPage() {
  const t = useTranslations("dashboard");
  const supabase = createClient();
  const [activeReport, setActiveReport] = useState<ReportType>("inspections");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReportData>({ labels: [], values: [], total: 0 });
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    loadReport(activeReport);
  }, [activeReport]);

  async function loadReport(type: ReportType) {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) { setLoading(false); return; }

    const orgId = profile.org_id;
    let result: ReportData = { labels: [], values: [], total: 0 };

    if (type === "branches") {
      const { data: branches } = await supabase.from("branches").select("name, city").eq("org_id", orgId).eq("is_active", true);
      if (branches) {
        const cityMap: Record<string, number> = {};
        branches.forEach((b) => { const c = b.city || "Other"; cityMap[c] = (cityMap[c] || 0) + 1; });
        result = { labels: Object.keys(cityMap), values: Object.values(cityMap), total: branches.length };
      }
    } else if (type === "inspections") {
      const { data: inspections } = await supabase.from("inspections").select("status").eq("org_id", orgId);
      if (inspections) {
        const statusMap: Record<string, number> = {};
        inspections.forEach((i) => { statusMap[i.status] = (statusMap[i.status] || 0) + 1; });
        result = { labels: Object.keys(statusMap), values: Object.values(statusMap), total: inspections.length };
      }
    } else if (type === "issues") {
      const { data: issues } = await supabase.from("issues").select("severity").eq("org_id", orgId);
      if (issues) {
        const sevMap: Record<string, number> = {};
        issues.forEach((i) => { sevMap[i.severity] = (sevMap[i.severity] || 0) + 1; });
        result = { labels: Object.keys(sevMap), values: Object.values(sevMap), total: issues.length };
      }
    } else if (type === "users") {
      const { data: users } = await supabase.from("users").select("role").eq("org_id", orgId);
      if (users) {
        const roleMap: Record<string, number> = {};
        users.forEach((u) => { roleMap[u.role] = (roleMap[u.role] || 0) + 1; });
        result = { labels: Object.keys(roleMap), values: Object.values(roleMap), total: users.length };
      }
    } else if (type === "tasks") {
      const { data: tasks } = await supabase.from("tasks").select("status").eq("org_id", orgId);
      if (tasks) {
        const statusMap: Record<string, number> = {};
        tasks.forEach((t) => { statusMap[t.status] = (statusMap[t.status] || 0) + 1; });
        result = { labels: Object.keys(statusMap), values: Object.values(statusMap), total: tasks.length };
      }
    }

    setData(result);
    setLoading(false);
  }

  const reportTabs: { key: ReportType; labelAr: string; labelEn: string }[] = [
    { key: "inspections", labelAr: "Inspections", labelEn: "Inspections" },
    { key: "branches", labelAr: "Branches", labelEn: "Branches" },
    { key: "users", labelAr: "Users", labelEn: "Users" },
    { key: "issues", labelAr: "Issues", labelEn: "Issues" },
    { key: "tasks", labelAr: "Tasks", labelEn: "Tasks" },
  ];

  const maxValue = Math.max(...data.values, 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{t("reports")}</h1>
          <p className="text-zinc-500 text-sm mt-1">Performance Reports & Analytics</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {reportTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveReport(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeReport === tab.key
                ? "bg-brand-600 text-white"
                : "bg-white text-zinc-600 border border-zinc-200 hover:border-brand-200"
            }`}
          >
            {tab.labelAr}
          </button>
        ))}
        <button
          onClick={async () => {
            setAiLoading(true);
            const res = await fetch("/api/ai/analyze", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ type: "report", data }),
            });
            const json = await res.json();
            setAiAnalysis(json.analysis);
            setAiLoading(false);
          }}
          disabled={aiLoading || data.total === 0}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-purple-600 to-brand-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          {aiLoading ? "Analyzing..." : "AI Analysis"}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
          <div className="text-center mb-6">
            <p className="text-3xl font-bold text-zinc-900">{data.total}</p>
            <p className="text-sm text-zinc-500 mt-1">Total {reportTabs.find((t) => t.key === activeReport)?.labelAr}</p>
          </div>

          <div className="space-y-3">
            {data.labels.length === 0 && (
              <p className="text-center py-8 text-zinc-400 text-sm">{t("noData")}</p>
            )}
            {data.labels.map((label, idx) => {
              const pct = maxValue > 0 ? (data.values[idx] / maxValue) * 100 : 0;
              return (
                <div key={label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-zinc-700 font-medium">{label}</span>
                    <span className="text-zinc-500">{data.values[idx]}</span>
                  </div>
                  <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-brand transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {aiAnalysis && (
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-brand-50 rounded-2xl border border-purple-100 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" /> AI Analysis
            </h3>
            <button onClick={() => setAiAnalysis(null)} className="text-zinc-400 hover:text-zinc-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          {aiAnalysis.summary && <p className="text-sm text-zinc-700">{aiAnalysis.summary}</p>}
          {aiAnalysis.key_insights?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-zinc-600 mb-1">Key Insights</p>
              <ul className="space-y-1">{aiAnalysis.key_insights.map((ins: string, i: number) => <li key={i} className="text-sm text-zinc-700 flex gap-2"><span className="text-purple-500">•</span>{ins}</li>)}</ul>
            </div>
          )}
          {aiAnalysis.recommendations?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-zinc-600 mb-1">Recommendations</p>
              <ul className="space-y-1">{aiAnalysis.recommendations.map((rec: string, i: number) => <li key={i} className="text-sm text-zinc-700 flex gap-2"><span className="text-brand-500">→</span>{rec}</li>)}</ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
