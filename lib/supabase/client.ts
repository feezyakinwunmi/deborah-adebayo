// lib/supabase/client.ts
import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

let supabase: SupabaseClient<Database>;

export function createClient(): SupabaseClient<Database> {
  if (!supabase) {
    supabase = createSupabaseClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return supabase;
}
