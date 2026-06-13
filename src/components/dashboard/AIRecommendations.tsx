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

  const priorityColors: Record<string, string> = {
    high: "bg-red-50 border-red-200",
    medium: "bg-amber-50 border-amber-200",
    low: "bg-blue-50 border-blue-200",
  };
  const priorityTextColors: Record<string, string> = {
    high: "text-red-700",
    medium: "text-amber-700",
    low: "text-blue-700",
  };
  const priorityBadge: Record<string, string> = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-zinc-900">AI Recommendations</h3>
          <span className="text-[10px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">Nemotron 3 Ultra</span>
        </div>
        <button onClick={load} className="p-1.5 rounded-lg text-zinc-400 hover:text-brand-600 hover:bg-brand-50 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {data.critical_issues?.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Critical Issues
          </p>
          {data.critical_issues.map((ci, i) => (
            <div key={i} className="bg-red-50 rounded-xl px-3 py-2 border border-red-100">
              <p className="text-xs font-medium text-red-800">{ci.issue}</p>
              <p className="text-xs text-red-600 mt-0.5">{ci.action}</p>
            </div>
          ))}
        </div>
      )}

      {data.recommendations?.length > 0 && (
        <div className="space-y-2">
          {data.recommendations.map((rec, i) => (
            <div key={i} className={`rounded-xl px-3 py-2.5 border ${priorityColors[rec.priority] || priorityColors.low}`}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-zinc-800">{rec.title}</p>
                <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium ${priorityBadge[rec.priority] || priorityBadge.low}`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-xs text-zinc-600 mt-1">{rec.description}</p>
              {rec.category && (
                <span className="inline-block mt-1 text-[10px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">{rec.category}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}