"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { AlertTriangle, Search, Filter } from "lucide-react";

const severityColors: Record<string, string> = {
  low: "bg-surface-100 text-surface-600 border border-surface-200",
  medium: "bg-amber-50 text-amber-700 border border-amber-200",
  high: "bg-orange-50 text-orange-700 border border-orange-200",
  critical: "bg-red-50 text-red-700 border border-red-200",
};

const statusColors: Record<string, string> = {
  open: "bg-red-50 text-red-700 border border-red-200",
  in_progress: "bg-blue-50 text-blue-700 border border-blue-200",
  resolved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  closed: "bg-surface-100 text-surface-500 border border-surface-200",
};

export default function IssuesPage() {
  const t = useTranslations("dashboard");
  const supabase = createClient();
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
  }, []);

  async function loadIssues() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) return;

    const { data } = await supabase.from("issues")
      .select("*, branches(name)")
      .eq("org_id", profile.org_id)
      .order("created_at", { ascending: false });
    if (data) setIssues(data);
    setLoading(false);
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-surface-900 animate-fade-in-up">{t("issues")}</h1>
        <p className="text-surface-500 text-sm mt-1">Track open issues and tickets</p>
      </div>

      <div className="grid gap-3">
        {issues.length === 0 && <p className="text-center py-12 text-surface-400 text-sm">{t("noData")}</p>}
        {issues.map((issue) => (
          <div key={issue.id} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-surface-100 shadow-sm p-4 glass-card">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  issue.severity === "critical" ? "bg-red-50" : issue.severity === "high" ? "bg-orange-50" : "bg-amber-50"
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    issue.severity === "critical" ? "text-red-600" : issue.severity === "high" ? "text-orange-600" : "text-amber-600"
                  }`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-surface-900">{issue.title}</h3>
                  {issue.description && <p className="text-xs text-surface-500 mt-0.5 line-clamp-1">{issue.description}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${severityColors[issue.severity]}`}>
                      {issue.severity === "critical" ? "Critical" : issue.severity === "high" ? "High" : issue.severity === "medium" ? "Medium" : "Low"}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[issue.status]}`}>
                      {issue.status === "open" ? "Open" : issue.status === "in_progress" ? "In Progress" : issue.status === "resolved" ? "Resolved" : "Closed"}
                    </span>
                    {issue.branches?.name && (
                      <span className="text-xs text-surface-400">{issue.branches.name}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
