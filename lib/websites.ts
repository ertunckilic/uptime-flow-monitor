import { supabase } from "@/lib/supabase";

export type Website = {
  id: string;
  url: string;
  status: string;
  ssl_days_left: number | null;
  created_at: string;
};

export async function getWebsites(): Promise<Website[]> {
  const { data, error } = await supabase
    .from("websites")
    .select("id, url, status, ssl_days_left, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch websites: ${error.message}`);
  }

  return data ?? [];
}

export async function addWebsite(url: string): Promise<Website> {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    throw new Error("URL is required");
  }

  const { data, error } = await supabase
    .from("websites")
    .insert({ url: trimmedUrl })
    .select("id, url, status, ssl_days_left, created_at")
    .single();

  if (error) {
    throw new Error(`Failed to add website: ${error.message}`);
  }

  return data;
}
