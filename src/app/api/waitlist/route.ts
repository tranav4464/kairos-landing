import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSupabase } from "@/lib/supabaseServer";

const bodySchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional().nullable(),
  role: z.string().min(1).optional().nullable(),
  challenge: z.string().optional().nullable(),
  time: z.string().optional().nullable(),
});

export async function POST(request: Request) {
  try {
    // Be tolerant of slightly malformed payloads
    const json = await request
      .json()
      .catch(() => ({} as unknown));
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      // Attempt minimal validation to allow email-only submissions
      const maybeEmail = (json as any)?.email;
      if (typeof maybeEmail === "string" && /[^\s@]+@[^\s@]+\.[^\s@]+/.test(maybeEmail.trim())) {
        parsed.data = { email: maybeEmail.trim(), name: null, role: null, challenge: null, time: null } as any;
      } else {
        return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten?.() ?? null }, { status: 400 });
      }
    }
    const { email, name, role, challenge, time } = parsed.data as any;
    const supabase = getServerSupabase();
    const table = process.env.SUPABASE_WAITLIST_TABLE || "subscribers";

    const { error: insertError } = await supabase
      .from(table)
      .insert({ email, name, role, challenge, time });
    if (insertError && !insertError.message.includes("duplicate")) {
      return NextResponse.json({ error: "Insert failed", details: insertError.message }, { status: 500 });
    }

    // Try to bump the live counter; ignore errors if RPC doesn't exist
    const { error: rpcError } = await supabase.rpc("increment_live_signups");
    if (rpcError) {
      // swallow; insert already succeeded
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: "Invalid request", details: message }, { status: 400 });
  }
}


