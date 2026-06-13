import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const orgId = searchParams.get("org_id");

  switch (type) {
    case "branch_performance": {
      const { data, error } = await supabase.from("v_branch_performance").select("*");
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ data });
    }

    case "user_activity": {
      const { data, error } = await supabase.from("v_user_activity").select("*");
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ data });
    }

    case "org_summary": {
      if (!orgId) return NextResponse.json({ error: "org_id required" }, { status: 400 });
      const { data, error } = await supabase.from("v_org_summary").select("*").eq("org_id", orgId).single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ data });
    }

    case "inspection_trends": {
      const { data, error } = await supabase.from("v_inspection_trends").select("*").order("inspection_date", { ascending: false }).limit(30);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ data });
    }

    case "issue_summary": {
      const { data, error } = await supabase.from("v_issue_summary").select("*");
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ data });
    }

    default:
      return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
  }
}
