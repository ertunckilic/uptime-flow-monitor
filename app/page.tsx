import { getWebsites, addWebsite } from "@/lib/websites";
import { revalidatePath } from "next/cache";
import { PlusCircle, Globe, CheckCircle2, AlertTriangle, Clock3, CalendarClock, Activity } from "lucide-react";
import Favicon from "@/components/Favicon";

export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: string }) {
  if (status === 'Online') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Online
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Clock3 className="w-3.5 h-3.5" />
        Bekliyor
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
      <AlertTriangle className="w-3.5 h-3.5" />
      Hata
    </span>
  );
}

export default async function Home() {
  const sites = await getWebsites();

  async function handleAdd(formData: FormData) {
    "use server";
    const url = formData.get("url") as string;
    if (url) {
      await addWebsite(url);
      revalidatePath("/");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 selection:bg-blue-500/30">
      <main className="max-w-6xl mx-auto p-6 md:p-10">
        
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-neutral-800/50">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Activity className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Uptime<span className="text-blue-500">Flow</span>
              </h1>
            </div>
            <p className="text-neutral-500 mt-2 text-sm max-w-md">Sistem erişilebilirliğini ve SSL durumlarını gerçek zamanlı izle.</p>
          </div>
        </header>

        <div className="bg-neutral-900/50 p-1.5 rounded-2xl border border-neutral-800 mb-10 backdrop-blur-xl">
          <form action={handleAdd} className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input 
                name="url"
                type="url" 
                placeholder="https://hedef-sistem.com" 
                required
                className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-sm text-neutral-200 placeholder:text-neutral-600"
              />
            </div>
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-500 transition-all active:scale-95 text-sm shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
            >
              <PlusCircle className="w-4 h-4" />
              Sistemi Ekle
            </button>
          </form>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-4 px-6 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:grid">
            <div className="col-span-6">Hedef URL</div>
            <div className="col-span-3 text-center">Durum</div>
            <div className="col-span-3 text-right">SSL Kalan</div>
          </div>

          {sites.length === 0 ? (
            <div className="text-center bg-neutral-900/30 rounded-2xl border border-neutral-800/50 p-16">
              <Activity className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-300">İzlenen sistem bulunamadı</h3>
              <p className="text-neutral-500 mt-2 text-sm">İlk hedefi ekleyerek izleme motorunu başlat.</p>
            </div>
          ) : (
            sites.map((site) => (
              <div 
                key={site.id} 
                className="grid grid-cols-12 gap-4 items-center bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all group"
              >
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                  <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center justify-center">
                  <Favicon url={site.url} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-200 truncate">{site.url}</p>
                    <p className="text-xs text-neutral-600 mt-0.5">Eklenme: {new Date(site.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>

                <div className="col-span-6 md:col-span-3 flex md:justify-center items-center">
                  <StatusBadge status={site.status || 'Pending'} />
                </div>

                <div className="col-span-6 md:col-span-3 flex md:justify-end items-center gap-2 text-sm">
                  <CalendarClock className="w-4 h-4 text-neutral-600 md:hidden" />
                  {site.ssl_days_left !== null ? (
                    <div className="text-right flex items-baseline gap-1">
                      <span className={`font-mono text-base ${site.ssl_days_left > 10 ? 'text-neutral-300' : 'text-rose-400'}`}>
                        {site.ssl_days_left}
                      </span>
                      <span className="text-xs text-neutral-600">gün</span>
                    </div>
                  ) : (
                    <span className="text-neutral-600 text-xs bg-neutral-950 px-2 py-1 rounded border border-neutral-800">Hesaplanıyor</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}