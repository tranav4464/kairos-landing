import { createClient } from "@supabase/supabase-js";

export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY) as string;
  if (!url || !serviceKey) {
    throw new Error("Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL or SUPABASE keys");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}


