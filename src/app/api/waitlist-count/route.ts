import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from("live_stats")
      .select("total_signups")
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    const count = (data?.total_signups as number) ?? 0;
    const limit = 1500;
    return NextResponse.json({ count, limit });
  } catch {
    // Fallback to a safe floor to avoid empty look in early stage
    return NextResponse.json({ count: 500, limit: 1500 });
  }
}


