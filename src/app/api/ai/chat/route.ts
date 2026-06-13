import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { aiChat } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("users").select("org_id, full_name, role").eq("id", user.id).single();
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const { data: org } = await supabase.from("organizations").select("name").eq("id", profile.org_id).single();
    const orgName = org?.name || "Your Organization";

    const systemMessage = {
      role: "system" as const,
      content: `You are LVL Up AI, an intelligent assistant for branch performance management at "${orgName}". 
You help managers improve their branch operations through inspections, tasks, and data-driven insights.
You are helpful, concise, and data-focused. Keep responses under 300 words.
User: ${profile.full_name} (${profile.role})`,
    };

    const completion = await aiChat([systemMessage, ...messages]);
    const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

    return NextResponse.json({ success: true, message: reply });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "AI chat failed" }, { status: 500 });
  }
}