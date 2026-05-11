import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = () => {
  return supabaseUrl.length > 0 && supabaseAnonKey.length > 0;
};

const fallbackSupabaseUrl = "https://placeholder.supabase.co";
const fallbackSupabaseAnonKey = "placeholder-anon-key";

export const supabase = createClient<Database>(
  isSupabaseConfigured() ? supabaseUrl : fallbackSupabaseUrl,
  isSupabaseConfigured() ? supabaseAnonKey : fallbackSupabaseAnonKey
);
