import { useEffect, useState } from "react";
import { Bell, ChevronsUpDown, Eye, Pencil, Plus, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import MBankingBannerNotificationPreview from "@/components/mitra-karya/MBankingBannerNotificationPreview";

type Banner = { id: string; name: string; start: string; end: string; active: boolean; userNotification?: boolean; content: string; images: string[] };

const defaultBanners: Banner[] = [
  ["Selamat Hari Suci Galungan dan Kuningan", "24-09-2026", "24-09-2026", true],
  ["Selamat Hari Raya Nyepi", "24-09-2026", "30-09-2026", true],
  ["Selamat Hari Raya Galungan", "10-06-2025", "30-06-2025", false],
  ["Selamat Hari Raya", "01-10-2022", "14-10-2022", true],
  ["Promo Deposito Seru", "11-06-2025", "30-06-2025", true],
  ["Hari raya", "24-09-2026", "24-09-2026", true],
  ["Galungan", "24-09-2026", "30-09-2026", true],
].map(([name, start, end, active], index) => ({ id: `default-${index + 1}`, name: name as string, start: start as string, end: end as string, active: active as boolean, content: "", images: [] }));

const bannerStorageKey = "mbanking-banners";
const headerClass = "px-2.5 py-2 text-left text-[12px] font-bold uppercase tracking-wide text-[#102d58]";
const notificationTooltip = "Aktifkan agar pengguna mendapatkan notifikasi promo, ucapan dan informasi lainnya";

function normalizeBanner(banner: Partial<Banner>, index: number): Banner {
  return { id: banner.id || `saved-${index}`, name: banner.name || "Banner Baru", start: banner.start || "-", end: banner.end || "-", active: Boolean(banner.active), userNotification: Boolean(banner.userNotification), content: banner.content || "", images: Array.isArray(banner.images) ? banner.images : [] };
}

export default function MBankingBanners() {
  const navigate = useNavigate();
  const location = useLocation();
  const route = (path: string) => location.pathname.startsWith("/mitra-karya/") ? `/mitra-karya${path}` : `/mobile${path}`;
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [previewBanner, setPreviewBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const storedBanners = window.localStorage.getItem(bannerStorageKey);
    if (storedBanners) setBanners([...(JSON.parse(storedBanners) as Partial<Banner>[]).map(normalizeBanner).reverse(), ...defaultBanners]);
  }, []);

  const toggleUserNotification = (id: string) => {
    setBanners((currentBanners) => {
      const nextBanners = currentBanners.map((banner) => banner.id === id ? { ...banner, userNotification: !banner.userNotification } : banner);
      const storedBanners = JSON.parse(window.localStorage.getItem(bannerStorageKey) || "[]") as Partial<Banner>[];
      window.localStorage.setItem(bannerStorageKey, JSON.stringify(storedBanners.map((banner) => banner.id === id ? { ...banner, userNotification: !banner.userNotification } : banner)));
      return nextBanners;
    });
  };

  const handleNotificationClick = (banner: Banner) => {
    setPreviewBanner(banner);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] px-4 py-6 text-[#102d58] md:px-8 md:py-8">
      <div className="flex items-center justify-between gap-4 px-1"><h1 className="text-[22px] font-semibold tracking-tight">Banner <span className="text-[16px] font-normal">Daftar</span></h1><Button onClick={() => navigate(route("/mbanking-banners/tambah"))} className="h-10 rounded-full bg-white px-5 text-[13px] font-medium text-[#526784] shadow-sm hover:bg-slate-50"><Plus className="mr-2 h-4 w-4" />Tambah</Button></div>
      <section className="mt-8 min-h-[515px] rounded-[22px] bg-white px-5 py-6 shadow-[0_5px_24px_rgba(58,77,126,0.04)] md:px-6">
        <div className="mb-4 flex items-center text-[13px] text-slate-800">Tampilkan<select className="mx-1 h-7 rounded border border-slate-300 bg-white px-1 text-[13px] text-slate-900"><option>20</option></select>entri</div>
        <div className="overflow-x-auto"><table className="w-full min-w-0 table-fixed border-collapse text-[12px]"><colgroup><col className="w-[5%]" /><col className="w-[32%]" /><col className="w-[18%]" /><col className="w-[18%]" /><col className="w-[12%]" /><col className="w-[15%]" /></colgroup>
          <thead><tr className="bg-white"><th className={headerClass}>No.</th><th className={cn(headerClass, "bg-[#eef0f4]")}>Judul Banner <span className="float-right">⌄</span></th>{["Tanggal Publikasi", "Tanggal Kadaluarsa", "Status", "Aksi"].map((label) => <th key={label} className={cn(headerClass, label === "Status" && "px-1.5")}>{label}<ChevronsUpDown className="float-right h-3.5 w-3.5 text-[#102d58]" strokeWidth={2.2} /></th>)}</tr><tr className="border-b border-slate-300"><th /><th className="px-2.5 py-2"><Input className="h-8 text-[12px]" /></th><th className="px-2.5 py-2"><div className="flex h-8 overflow-hidden rounded border border-slate-300"><Input className="h-full min-w-0 flex-1 rounded-none border-0 text-[12px] shadow-none focus-visible:ring-0" /><button className="w-8 bg-[#8494af] text-white">×</button></div></th><th className="px-2.5 py-2"><div className="flex h-8 overflow-hidden rounded border border-slate-300"><Input className="h-full min-w-0 flex-1 rounded-none border-0 text-[12px] shadow-none focus-visible:ring-0" /><button className="w-8 bg-[#8494af] text-white">×</button></div></th><th className="px-2.5 py-2"><select className="h-8 w-full rounded border border-slate-300 bg-white px-2 text-[12px] text-slate-500"><option>-- Semua --</option></select></th><th /></tr></thead>
          <tbody><TooltipProvider delayDuration={150}>{banners.map((banner, index) => <tr key={banner.id} className="border-b border-[#cbd5e1] text-[#123664]"><td className="px-1 py-2">{index + 1}</td><td className="bg-[#f0f1f4] px-2.5 py-2">{banner.name}</td><td className="px-2.5 py-2">{banner.start}</td><td className="px-2.5 py-2">{banner.end}</td><td className="px-1.5 py-2"><span className={cn("rounded px-1 py-1 text-[10px] font-bold text-white", banner.active ? "bg-green-600" : "bg-red-500")}>{banner.active ? "Aktif" : "Tidak Aktif"}</span></td><td className="px-1.5 py-2"><div className="flex min-w-[102px] items-center gap-2"><Tooltip><TooltipTrigger asChild><button type="button" aria-label="Lihat banner" onClick={() => navigate(route(`/mbanking-banners/${banner.id}`))} className="text-[#7b879d] transition-colors hover:text-[#526784]"><Eye className="h-[18px] w-[18px]" strokeWidth={2.2} /></button></TooltipTrigger><TooltipContent side="top" sideOffset={8} className="rounded-none bg-[#102d58] px-3 py-2 text-center text-[12px] leading-4 text-white shadow-lg">Lihat</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><button type="button" aria-label="Ubah banner" onClick={() => navigate(route(`/mbanking-banners/${banner.id}/ubah`))} className="text-[#315fff] transition-colors hover:text-[#2448c7]"><Pencil className="h-[19px] w-[19px]" strokeWidth={2.3} /></button></TooltipTrigger><TooltipContent side="top" sideOffset={8} className="rounded-none bg-[#102d58] px-3 py-2 text-center text-[12px] leading-4 text-white shadow-lg">Ubah</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><button type="button" aria-label={banner.userNotification ? "Nonaktifkan notifikasi pengguna" : "Aktifkan notifikasi pengguna"} onClick={() => setPreviewBanner({ ...banner })} className={cn("flex h-[22px] w-[22px] items-center justify-center rounded-full transition-colors", banner.userNotification ? "bg-[#3768f5] text-white" : "text-[#7b879d] hover:bg-[#e9efff] hover:text-[#315fff]")}><Bell className="h-[16px] w-[16px]" strokeWidth={2.3} /></button></TooltipTrigger><TooltipContent side="top" sideOffset={8} className="max-w-[255px] rounded-none bg-[#102d58] px-3 py-2 text-center text-[12px] leading-4 text-white shadow-lg">{notificationTooltip}</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><button type="button" aria-label="Hapus banner" className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#e52d4f] text-white transition-colors hover:bg-[#c91f3e]"><X className="h-[11px] w-[11px]" strokeWidth={3} /></button></TooltipTrigger><TooltipContent side="top" sideOffset={8} className="rounded-none bg-[#102d58] px-3 py-2 text-center text-[12px] leading-4 text-white shadow-lg">Hapus</TooltipContent></Tooltip></div></td></tr>)}</TooltipProvider></tbody>
        </table></div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-[13px] text-slate-700"><span>Menampilkan 1 sampai {banners.length} dari {banners.length} entri</span><div className="flex items-center"><button className="bg-[#eef1f5] px-3 py-2 text-slate-300">Sebelumnya</button><button className="bg-violet-600 px-3 py-2 text-white">1</button><button className="bg-[#eef1f5] px-3 py-2 text-slate-300">Selanjutnya</button></div></div>
      </section>
      {previewBanner ? <MBankingBannerNotificationPreview banner={previewBanner} isActive={previewBanner.userNotification} onToggle={() => { toggleUserNotification(previewBanner.id); setPreviewBanner(null); }} onClose={() => setPreviewBanner(null)} /> : null}
    </div>
  );
}
