import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aiAnalyze } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const { type, data } = await req.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const systemPrompts: Record<string, string> = {
      inspection: "You are an expert quality analyst. Analyze this inspection data and provide a concise summary with strengths, weaknesses, and actionable recommendations in English. Return as JSON with: summary, strengths (array), weaknesses (array), recommendations (array), score_breakdown (object).",
      report: "You are a business intelligence analyst. Analyze this operational data and provide strategic insights in English. Return as JSON with: overview, key_insights (array), trends (array), recommendations (array).",
      task: "You are a project management expert. Analyze these tasks and suggest optimal assignments, priorities, and scheduling. Return as JSON with: analysis, suggestions (array), priority_changes (array).",
      branch: "You are a branch performance analyst. Analyze this branch data and provide performance insights. Return as JSON with: overall_assessment, strengths (array), improvements (array), risk_factors (array).",
    };

    const systemPrompt = systemPrompts[type] || systemPrompts.report;
    const completion = await aiAnalyze(systemPrompt, JSON.stringify(data));
    const content = completion.choices[0]?.message?.content || "";

    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: content };
    } catch {
      parsed = { raw: content };
    }

    return NextResponse.json({ success: true, analysis: parsed });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "AI analysis failed" }, { status: 500 });
  }
}