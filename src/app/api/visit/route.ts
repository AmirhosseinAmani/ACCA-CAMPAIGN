import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { visitorToken } = await req.json();

    if (!visitorToken) {
      return NextResponse.json({ error: "visitorToken is required" }, { status: 400 });
    }

    const { data: existing } = await supabaseAdmin
      .from("visitors")
      .select("id")
      .eq("visitor_token", visitorToken)
      .maybeSingle();

    if (!existing) {
      await supabaseAdmin.from("visitors").insert({
        visitor_token: visitorToken,
      });
    }

    const { count } = await supabaseAdmin
      .from("visitors")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { count } = await supabaseAdmin
      .from("visitors")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
