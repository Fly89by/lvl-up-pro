import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aiAnalyze } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const [branches, inspections, issues, tasks, users] = await Promise.all([
      supabase.from("branches").select("*").eq("org_id", profile.org_id),
      supabase.from("inspections").select("*").eq("org_id", profile.org_id).order("created_at", { ascending: false }).limit(20),
      supabase.from("issues").select("*").eq("org_id", profile.org_id).neq("status", "closed").limit(10),
      supabase.from("tasks").select("*, branches(name)").eq("org_id", profile.org_id).neq("status", "completed").limit(10),
      supabase.from("users").select("id, full_name, role").eq("org_id", profile.org_id),
    ]);

    const completion = await aiAnalyze(
      `You are an expert operations consultant. Analyze this organization's data and provide:
1. A brief executive summary (2-3 sentences)
2. Top 3-5 specific, actionable recommendations 
3. Any critical issues that need immediate attention

Return as JSON: { summary, recommendations: [{ title, description, priority: "high"|"medium"|"low", category }], critical_issues: [{ issue, action }] }`,
      JSON.stringify({
        branches: branches.data?.length || 0,
        inspections: inspections.data || [],
        openIssues: issues.data || [],
        openTasks: tasks.data || [],
        teamMembers: users.data || [],
      })
    );

    const content = completion.choices[0]?.message?.content || "{}";
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: content };
    } catch {
      parsed = { recommendations: [{ title: "Analysis unavailable", description: "Could not parse AI response", priority: "low", category: "general" }] };
    }

    return NextResponse.json({ success: true, ...parsed });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "AI recommendation failed" }, { status: 500 });
  }
}