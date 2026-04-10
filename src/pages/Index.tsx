import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
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
  ChevronDown,
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
      // Pinjaman dipindah tepat di bawah Simpanan (sesuai permintaan)
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
const implementedRoutes = new Set(["/loan-products", "/loan-products/new", "/loans/new"]);

const loanSubmenu: Array<{ label: string; to: string }> = [
  { label: "Pengajuan Baru", to: "/loans/new" },
  { label: "Daftar Pengajuan Pinjaman", to: "/pinjaman/daftar-pengajuan" },
  { label: "Rekening Pinjaman", to: "/pinjaman/rekening" },
  { label: "Transaksi Pinjaman", to: "/pinjaman/transaksi" },
  { label: "Pinjaman Lunas", to: "/pinjaman/lunas" },
  { label: "Perpanjangan Pinjaman", to: "/pinjaman/perpanjangan" },
  { label: "Produk Pinjaman", to: "/loan-products" },
  { label: "Sektor Pinjaman", to: "/pinjaman/sektor" },
  { label: "Tujuan Pinjaman", to: "/pinjaman/tujuan" },
  { label: "Cetak Buku", to: "/pinjaman/cetak-buku" },
  { label: "Prima Nota", to: "/pinjaman/prima-nota" },
];

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
  const isReal = implementedRoutes.has(item.to);

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
      to={item.to}
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

function SidebarLoanSection() {
  const location = useLocation();
  const shouldOpen = React.useMemo(() => {
    const p = location.pathname;
    return (
      p.startsWith("/pinjaman") ||
      p.startsWith("/loan-products") ||
      p.startsWith("/loans")
    );
  }, [location.pathname]);

  const [open, setOpen] = React.useState<boolean>(shouldOpen);

  React.useEffect(() => {
    setOpen(shouldOpen);
  }, [shouldOpen]);

  const isActive =
    location.pathname.startsWith("/pinjaman") ||
    location.pathname.startsWith("/loan-products") ||
    location.pathname.startsWith("/loans");

  return (
    <div className="px-2 pb-2 pt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left ring-1 transition",
          isActive
            ? "bg-violet-50 text-slate-900 ring-violet-200"
            : "bg-white text-slate-900 ring-slate-200 hover:bg-slate-50",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <HandCoins className="h-5 w-5" />
          </span>
          <span className="text-[15px] font-semibold">Pinjaman</span>
        </div>

        <span
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition",
            open ? "rotate-180" : "rotate-0",
          )}
        >
          <ChevronDown className="h-4.5 w-4.5" />
        </span>
      </button>

      {open ? (
        <div className="mt-2 space-y-1 pl-[52px]">
          {loanSubmenu.map((s) => {
            const isReal = implementedRoutes.has(s.to);
            const isSubActive = location.pathname === s.to;

            if (!isReal) {
              return (
                <button
                  key={s.to}
                  type="button"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-[15px] font-semibold transition",
                    "text-slate-700 hover:bg-slate-50",
                  )}
                >
                  <span className="truncate">{s.label}</span>
                  <ChevronRight className="h-5 w-5 text-slate-200" />
                </button>
              );
            }

            return (
              <NavLink
                key={s.to}
                to={s.to}
                className={() =>
                  cn(
                    "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-[15px] font-semibold transition",
                    isSubActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-50",
                  )
                }
              >
                <span className="truncate">{s.label}</span>
                <ChevronRight
                  className={cn(
                    "h-5 w-5",
                    isSubActive ? "text-white/70" : "text-slate-200",
                  )}
                />
              </NavLink>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function Index() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Header title + action buttons dihapus sesuai permintaan */}
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--app-accent))] text-white shadow-sm">
              <CreditCard className="h-5 w-5" />
            </div>
          </Link>

          <div className="hidden md:block" />
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <SidebarPromo />

            <Card className="rounded-3xl border-slate-200/70 bg-white p-2 shadow-sm">
              <div className="max-h-[70vh] overflow-auto px-1 py-1">
                <div className="space-y-1">
                  {/* Posisi Pinjaman sekarang berada tepat setelah Simpanan dalam urutan menu */}
                  <SidebarLoanSection />

                  <Separator className="my-2 bg-slate-100" />

                  {nav.map((g, idx) => (
                    <div key={g.group ?? idx} className="px-1">
                      {g.group ? (
                        <div className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          {g.group}
                        </div>
                      ) : null}

                      <div className="space-y-1">
                        {g.items
                          .filter((it) => it.label !== "Pinjaman")
                          .map((it) => (
                            <SidebarNavItem key={it.to} item={it} />
                          ))}
                      </div>
                    </div>
                  ))}
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