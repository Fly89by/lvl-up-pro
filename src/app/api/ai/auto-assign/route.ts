import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aiAnalyze } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const { taskDescription, branchName } = await req.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("users").select("org_id").eq("id", user.id).single();
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const { data: team } = await supabase.from("users").select("id, full_name, role").eq("org_id", profile.org_id);
    const { data: tasks } = await supabase.from("tasks").select("assigned_to, status").eq("org_id", profile.org_id);

    const workload = (tasks || []).reduce((acc: Record<string, number>, t: any) => {
      if (t.assigned_to) acc[t.assigned_to] = (acc[t.assigned_to] || 0) + 1;
      return acc;
    }, {});

    const teamWithWorkload = (team || []).map((m: any) => ({
      ...m,
      currentTasks: workload[m.id] || 0,
    }));

    const completion = await aiAnalyze(
      `You are a team lead. Given a task and team members with their current workloads, suggest the best person to assign this task to.
Consider: role suitability, current workload, and expertise.
Return ONLY a JSON object: { suggested_user_id: string, reason: string, estimated_hours: number }`,
      JSON.stringify({ taskDescription, branchName, team: teamWithWorkload })
    );

    const content = completion.choices[0]?.message?.content || "{}";
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      parsed = {};
    }

    return NextResponse.json({ success: true, ...parsed });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Auto-assign failed" }, { status: 500 });
  }
}