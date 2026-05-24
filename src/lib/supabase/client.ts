import { createClient } from "@supabase/supabase-js";

let singleton: ReturnType<typeof createClient> | null = null;

/** Retorna cliente Supabase para SPA (somente anon key segura para o navegador). */
export function getSupabaseBrowserClient() {
  if (singleton) return singleton;
  const url = import.meta.env.VITE_SUPABASE_URL ?? "";
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
  singleton = createClient(url, anon);
  return singleton;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL?.trim()) && Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY?.trim());
}
