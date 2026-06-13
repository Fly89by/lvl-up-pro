"use client";

import { useEffect, useState } from "react";
import { Lightbulb, AlertTriangle, TrendingUp, Loader2, RefreshCw } from "lucide-react";

interface Recommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
}

export default function AIRecommendations() {
  const [data, setData] = useState<{ summary: string; recommendations: Recommendation[]; critical_issues: { issue: string; action: string }[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/recommend", { method: "POST" });
      const json = await res.json();
      if (json.success) setData(json);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return null;

  if (!data || (!data.recommendations?.length && !data.critical_issues?.length)) return null;

  const priorityBorder: Record<string, string> = {
    high: "border-red-500/30 bg-red-500/5",
    medium: "border-amber-500/30 bg-amber-500/5",
    low: "border-blue-500/30 bg-blue-500/5",
  };
  const priorityBadge: Record<string, string> = {
    high: "bg-red-500/15 text-red-400 border border-red-500/20",
    medium: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    low: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white">AI Recommendations</h3>
          <span className="text-[10px] text-surface-500 bg-white/5 px-1.5 py-0.5 rounded">Nemotron 3 Ultra</span>
        </div>
        <button onClick={load} className="p-1.5 rounded-lg text-surface-400 hover:text-brand-400 hover:bg-brand-500/10 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {data.critical_issues?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-red-400 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Critical Issues
          </p>
          {data.critical_issues.map((ci, i) => (
            <div key={i} className="bg-red-500/10 rounded-xl px-3 py-2 border border-red-500/20">
              <p className="text-xs font-medium text-red-300">{ci.issue}</p>
              <p className="text-xs text-red-400/80 mt-0.5">{ci.action}</p>
            </div>
          ))}
        </div>
      )}

      {data.recommendations?.length > 0 && (
        <div className="space-y-2">
          {data.recommendations.map((rec, i) => (
            <div key={i} className={`rounded-xl px-3 py-2.5 border ${priorityBorder[rec.priority] || priorityBorder.low}`}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-white">{rec.title}</p>
                <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium ${priorityBadge[rec.priority] || priorityBadge.low}`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-xs text-surface-400 mt-1">{rec.description}</p>
              {rec.category && (
                <span className="inline-block mt-1 text-[10px] text-surface-500 bg-white/5 px-1.5 py-0.5 rounded">{rec.category}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
