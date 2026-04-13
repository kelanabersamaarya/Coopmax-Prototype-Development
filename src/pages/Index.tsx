import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import * as React from "react";
import {
  BadgeDollarSign,
  Bookmark,
  BookOpenText,
  Boxes,
  BriefcaseBusiness,
  Calculator,
  ClipboardList,
  CreditCard,
  FileText,
  HandCoins,
  Home,
  Landmark,
  Package2,
  Receipt,
  ScrollText,
  Settings,
  Shield,
  Smartphone,
  Store,
  Tags,
  Users,
  Wallet,
  ChevronRight,
  Sparkles,
} from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: any;
};

const nav: Array<{ group?: string; items: NavItem[] }> = [
  {
    items: [
      { to: "/dashboard", label: "Dashboard", icon: Home },
      { to: "/anggota", label: "Anggota", icon: Users },
      { to: "/simpanan", label: "Simpanan", icon: Wallet },
      { to: "/pinjaman", label: "Pinjaman", icon: HandCoins },
      { to: "/simpanan-berjangka", label: "Simpanan Berjangka", icon: Landmark },
      {
        to: "/modal-penyertaan",
        label: "Modal Penyertaan",
        icon: BriefcaseBusiness,
      },
      { to: "/ppob", label: "PPOB", icon: Receipt },
      { to: "/mbanking", label: "MBanking", icon: Smartphone },
      { to: "/shu", label: "SHU", icon: BadgeDollarSign },
      { to: "/transaksi-kas", label: "Transaksi Kas", icon: ClipboardList },
      { to: "/inventaris", label: "Inventaris", icon: Boxes },
      { to: "/keuangan", label: "Keuangan", icon: Calculator },
      { to: "/akunting", label: "Akunting", icon: BookOpenText },
      { to: "/laporan", label: "Laporan", icon: ScrollText },
      { to: "/kolektor", label: "Kolektor", icon: Users },
      { to: "/kupon", label: "Kupon", icon: Tags },
      { to: "/pegawai", label: "Pegawai", icon: Users },
      { to: "/laporan-shu", label: "Laporan SHU", icon: Bookmark },
      { to: "/mitra", label: "Mitra", icon: Store },
      { to: "/pengaturan-umum", label: "Pengaturan Umum", icon: Settings },
      {
        to: "/administrasi-koperasi",
        label: "Administrasi Koperasi",
        icon: CreditCard,
      },
      { to: "/tagihan", label: "Tagihan", icon: FileText },
      { to: "/online-banking", label: "Online Banking", icon: Landmark },
      { to: "/superadmin", label: "Superadmin", icon: Shield },
      {
        to: "/penilaian-kesehatan",
        label: "Penilaian Kesehatan",
        icon: ClipboardList,
      },
      { to: "/backup-database", label: "Backup Database", icon: Package2 },
    ],
  },
];

// Routes yang benar-benar ada saat ini
const implementedRoutes = new Set([
  "/loan-products",
  "/loan-products/new",
  "/loans/new",
  "/anggota/transaksi",
]);

function resolveNavTo(to: string) {
  if (to === "/anggota") return "/anggota/transaksi";
  if (to === "/pinjaman") return "/loan-products";
  return to;
}

function SidebarPromo() {
  return (
    <div className="rounded-3xl border border-violet-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 ring-1 ring-violet-200">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="text-sm font-semibold tracking-tight text-slate-900">
          KOCEK
        </div>
      </div>

      <div className="mt-3 text-sm font-semibold text-fuchsia-700">
        Rekomendasi Pinjaman Cepat ✨
      </div>
      <div className="mt-2 text-sm leading-relaxed text-slate-700">
        Ingin analisa cepat dan tepat? gunakan layanan{" "}
        <span className="font-semibold text-violet-700">KOCEK</span> sekarang!
      </div>

      <Button
        className="mt-4 w-full rounded-full bg-violet-600 text-white hover:bg-violet-700"
        onClick={() => {
          window.location.href = "/loan-products/new";
        }}
      >
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
          <Sparkles className="h-4 w-4" />
        </span>
        Analisa Rekomendasi Pinjaman
      </Button>

      <div className="mt-3 text-center text-sm font-semibold text-violet-700 underline underline-offset-4">
        Lihat Penggunaan & Sisa Kuota
      </div>
    </div>
  );
}

function SidebarNavItem({ item }: { item: NavItem }) {
  const Icon = item.icon;

  const resolvedTo = resolveNavTo(item.to);
  const isReal = implementedRoutes.has(resolvedTo);

  const common =
    "group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition";

  if (!isReal) {
    return (
      <button
        type="button"
        className={cn(common, "bg-white hover:bg-slate-50 text-slate-900")}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[15px] font-semibold">
          {item.label}
        </span>
        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-400" />
      </button>
    );
  }

  return (
    <NavLink
      to={resolvedTo}
      className={({ isActive }) =>
        cn(
          common,
          isActive
            ? "bg-violet-50 text-slate-900 ring-1 ring-violet-200"
            : "bg-white hover:bg-slate-50 text-slate-900",
        )
      }
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1 truncate text-[15px] font-semibold">
        {item.label}
      </span>
      <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-400" />
    </NavLink>
  );
}

export default function Index() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div />
          <div className="hidden md:block" />
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-[320px_1fr]">
          <aside className="space-y-4 px-0">
            <SidebarPromo />

            <Card className="rounded-3xl border-slate-200/70 bg-white p-2 shadow-sm">
              <div className="max-h-[70vh] overflow-auto px-0 py-1">
                <div className="space-y-1">
                  {nav.map((g, idx) => (
                    <div key={g.group ?? idx} className="px-0">
                      {g.group ? (
                        <div className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          {g.group}
                        </div>
                      ) : null}

                      <div className="space-y-1 px-2">
                        {g.items.map((it) => (
                          <SidebarNavItem key={it.to} item={it} />
                        ))}
                      </div>
                    </div>
                  ))}

                  <Separator className="my-2 bg-slate-100" />
                </div>
              </div>
            </Card>
          </aside>

          <div>{isHome ? <Outlet /> : <Outlet />}</div>
        </div>
      </div>
    </div>
  );
}