import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedParams = await searchParams;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  const { data: sites } = await supabase
    .from("websites")
    .select("*")
    .order("created_at", { ascending: false });

  async function handleAdd(formData: FormData) {
    "use server";
    let url = formData.get("url") as string;
    
    if (!url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      const parsedUrl = new URL(url);
      url = url.replace(/\/$/, "");
    } catch {
      return redirect("/?error=invalid");
    }

    const sb = await createClient();
    const { data: { user: currentUser } } = await sb.auth.getUser();
    
    if (currentUser) {
      // Limit Kontrolü ve Premium Doğrulaması
      const { data: sub } = await sb.from("subscriptions").select("is_premium").eq("user_id", currentUser.id).single();
      const isPremium = sub?.is_premium || false;

      const { count: totalSites } = await sb
        .from("websites")
        .select("*", { count: "exact", head: true })
        .eq("user_id", currentUser.id);

      // Sadece ücretsiz kullanıcıysa ve 3 siteyi geçtiyse engelle
      if (!isPremium && totalSites !== null && totalSites >= 3) {
        return redirect("/?error=limit");
      }

      const { data: existing } = await sb
        .from("websites")
        .select("id")
        .eq("url", url)
        .eq("user_id", currentUser.id)
        .single();

      if (existing) {
        return redirect("/?error=duplicate");
      }

      await sb.from("websites").insert([{ url, user_id: currentUser.id }]);
      revalidatePath("/");
      redirect("/");
    }
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) {
      const sb = await createClient();
      await sb.from("websites").delete().eq("id", id);
      revalidatePath("/");
    }
  }

  async function handleLogout() {
    "use server";
    const sb = await createClient();
    await sb.auth.signOut();
    return redirect("/login");
  }

  return (
    <DashboardClient 
      sites={sites || []} 
      onAdd={handleAdd} 
      onLogout={handleLogout} 
      onDelete={handleDelete}
      error={resolvedParams?.error}
      success={resolvedParams?.success}
    />
  );
}