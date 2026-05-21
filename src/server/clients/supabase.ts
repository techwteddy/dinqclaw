import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "~/env";

export function isSupabaseConfigured(): boolean {
  return !!(env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
}

const globalForSupabase = globalThis as typeof globalThis & {
  supabaseAdmin?: SupabaseClient;
};

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  globalForSupabase.supabaseAdmin ??= createClient(
    url,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  return globalForSupabase.supabaseAdmin;
}
