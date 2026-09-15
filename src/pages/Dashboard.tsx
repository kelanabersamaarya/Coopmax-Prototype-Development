import { Building2, Handshake, Link2, ReceiptText, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Pinjaman Billing",
    subtitle: "Alur pinjaman dengan penjadwalan billing & pembayaran angsuran.",
    icon: ReceiptText,
    accent: "sky",
    to: "/anggota/transaksi",
  },
  {
    title: "Kebutuhan Koperasi Samudra Harta",
    subtitle: "Menu kebutuhan koperasi untuk monitoring & aktivitas operasional (prototype).",
    icon: Building2,
    accent: "emerald",
    to: "/obs-samudra-harta",
  },
  {
    title: "Coopmax - SAK EP Cabang",
    subtitle: "Modul cabang untuk operasional SAK EP Coopmax (prototype).",
    icon: Building2,
    accent: "emerald",
    to: "/sak-ep-cabang/loan-products",
  },
  {
    title: "New_Mbanking",
    subtitle: "Akses cepat ke prototype aplikasi M-Banking terbaru.",
    icon: Smartphone,
    accent: "sky",
    to: "/mobile/new-mbanking",
  },
  {
    title: "Payment Link",
    subtitle: "Buat dan kelola link pembayaran untuk dibagikan ke anggota.",
    icon: Link2,
    accent: "violet",
    to: "/payment-link/loan-products",
  },
  {
    title: "Kebutuhan Koperasi Mitra Karya",
    subtitle: "Langsung membuka laporan anggota untuk kebutuhan Koperasi Mitra Karya.",
    icon: Handshake,
    accent: "emerald",
    to: "/mitra-karya/laporan/anggota",
  },
  {
    title: "Kebutuhan Koperasi Astiti Dana Lestari",
    subtitle: "Akses kebutuhan operasional Koperasi Astiti Dana Lestari.",
    icon: Handshake,
    accent: "violet",
    to: "/astiti-dana-lestari/akunting",
  },
] as const;

const accentClasses = {
  sky: "bg-sky-50 text-sky-600 ring-sky-200",
  emerald: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  violet: "bg-violet-50 text-violet-600 ring-violet-200",
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-2rem)] bg-[#f8f9fc] p-4 text-[#15233d] sm:p-6">
      <div className="rounded-[5px] border border-slate-200 bg-[#f7f8fb] p-3">
        <header className="flex items-center gap-3 rounded-[5px] border border-slate-200 bg-white px-3 py-4 sm:px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-slate-200 bg-white text-violet-500">
            <span className="text-xl font-bold">◕</span>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">Hi, Admin</h1>
            <p className="mt-1 text-[11px] font-semibold text-slate-600">
              Selamat datang di dashboard pengembangan <span className="text-violet-600">Coopmax</span>
            </p>
          </div>
        </header>

        <section className="mt-3 grid gap-2 border border-slate-200 bg-[#f7f8fb] p-3 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.to)}
                className="flex min-h-[65px] items-center gap-3 rounded-[5px] border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-violet-300 hover:shadow-sm"
              >
                <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] ring-1", accentClasses[card.accent])}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-bold text-[#17233b]">{card.title}</span>
                  <span className="mt-1 block text-[10px] leading-tight text-slate-600">{card.subtitle}</span>
                </span>
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}
