import * as React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import SidebarAnggotaMenu from "@/components/SidebarAnggotaMenu";
import SidebarPinjamanMenu from "@/components/SidebarPinjamanMenu";
import SidebarSimpananMenu from "@/components/SidebarSimpananMenu";
import SidebarLaporanMenu from "@/components/SidebarLaporanMenu";
import SidebarObsMenu from "@/components/SidebarObsMenu";
import SidebarObsSuperAdminMenu from "@/components/SidebarObsSuperAdminMenu";
import SidebarPengaturanUmumMenu from "@/components/SidebarPengaturanUmumMenu";
import SidebarMobileMenu from "@/components/SidebarMobileMenu";
import SidebarSakSimpananMenu from "@/components/SidebarSakSimpananMenu";
import SidebarSakSimpananBerjangkaMenu from "@/components/SidebarSakSimpananBerjangkaMenu";
import SidebarSakAkuntingMenu from "@/components/SidebarSakAkuntingMenu";
import SidebarDjoinpayMenu from "@/components/SidebarDjoinpayMenu";
import SidebarDashboardMenu from "@/components/SidebarDashboardMenu";
import SidebarMBankingMenu from "@/components/SidebarMBankingMenu";
import SidebarMitraKaryaMenu from "@/components/SidebarMitraKaryaMenu";
import SidebarAstitiDanaLestariMenu from "@/components/SidebarAstitiDanaLestariMenu";
import SidebarTermSavingsMenu from "@/components/SidebarTermSavingsMenu";
import SidebarLoginMenu from "@/components/SidebarLoginMenu";
import { HandCoins, Home, ChevronRight, Sparkles } from "lucide-react";
import LoanTopBar from "@/components/navigation/LoanTopBar";

type NavItem = {
  to: string;
  label: string;
  icon: any;
};

const nav: Array<{ group?: string; items: NavItem[] }> = [
  {
    items: [
      { to: "/dashboard", label: "Dashboard Pengembangan", icon: Home },
      { to: "/pinjaman", label: "Pinjaman", icon: HandCoins },
    ],
  },
];

const implementedRoutes = new Set([
  "/dashboard",
  "/dashboard-simpanan",
  "/simpanan/rekening",
  "/sak-ep-cabang/dashboard",
  "/obs-samudra-harta",
  "/pengaturan-umum",
  "/loan-products",
  "/loan-products/new",
  "/loans/new",
  "/loans/applications",
  "/anggota/transaksi",
  "/laporan/kolektibilitas",
  "/mobile/e-kolektor",
  "/mobile/m-banking",
  "/mobile/mbanking-transactions",
  "/mobile/new-mbanking",
  "/payment-link",
  "/mitra-karya/dashboard",
  "/mitra-karya/anggota",
  "/mitra-karya/anggota/pendaftaran",
  "/mitra-karya/akunting",
  "/mitra-karya/laporan/anggota",
]);

function resolveNavTo(to: string) {
  if (to === "/pinjaman") return "/loan-products";
  return to;
}

function SidebarNavItem({ item }: { item: NavItem }) {
  const Icon = item.icon;
  const resolvedTo = resolveNavTo(item.to);
  const isReal = implementedRoutes.has(resolvedTo);

  const common =
    "group flex w-full items-center gap-2.5 rounded-[5px] px-2.5 py-2.5 text-left transition";

  if (!isReal) {
    return (
      <button
        type="button"
        className={cn(common, "bg-white text-slate-900 hover:bg-slate-50")}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] bg-slate-100 text-slate-700">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
          {item.label}
        </span>
        <ChevronRight className="h-4.5 w-4.5 text-slate-300 group-hover:text-slate-400" />
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
            : "bg-white text-slate-900 hover:bg-slate-50",
        )
      }
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] bg-slate-100 text-slate-700">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
        {item.label}
      </span>
      <ChevronRight className="h-4.5 w-4.5 text-slate-300 group-hover:text-slate-400" />
    </NavLink>
  );
}

export default function Index() {
  const location = useLocation();
  const [loanSidebarOpen, setLoanSidebarOpen] = React.useState(true);
  const isHome = location.pathname === "/";
  const isMitraKaryaDashboard =
    location.pathname === "/mitra-karya/dashboard";
  const isDashboardDevelopment = location.pathname === "/dashboard";
  const hideSidebar = isMitraKaryaDashboard || isDashboardDevelopment;
  const isMitraKaryaMBankingArea =
    location.pathname.startsWith("/mitra-karya/m-banking") ||
    location.pathname.startsWith("/mitra-karya/mbanking-");
  const isEKolektorArea =
    location.pathname === "/mobile/e-kolektor" ||
    location.pathname.startsWith("/mobile/e-kolektor/") ||
    location.pathname === "/mobile/e-kolektor-wajah";
  const isMobileArea =
    isEKolektorArea || location.pathname.startsWith("/mobile") || isMitraKaryaMBankingArea;
  const isNewMBankingArea = location.pathname.startsWith("/mobile/new-mbanking");
  const isSakCabangArea = location.pathname.startsWith("/sak-ep-cabang");
  const isMitraKaryaArea = location.pathname.startsWith("/mitra-karya");
  const isAstitiDanaLestariArea = location.pathname.startsWith("/astiti-dana-lestari");
  const isSamudraHartaArea =
    isDashboardDevelopment ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/obs-samudra-harta") ||
    location.pathname.startsWith("/obs-web");

  const isPinjamanArea =
    isEKolektorArea ||
    location.pathname.startsWith("/payment-link") ||
    location.pathname.startsWith("/loans") ||
    location.pathname.startsWith("/sak-ep-cabang");
  const showLoanTopBar = true;

  const isObsArea =
    location.pathname.startsWith("/obs-samudra-harta") ||
    location.pathname.startsWith("/obs-web") ||
    location.pathname.startsWith("/login");

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      {showLoanTopBar ? (
        <LoanTopBar
          sidebarOpen={loanSidebarOpen}
          onToggleSidebar={() => setLoanSidebarOpen((open) => !open)}
        />
      ) : null}
      <div
        className={cn(
          "w-full",
        isMobileArea
          ? "px-0 py-0 md:px-[var(--shell-gutter)] md:py-5"
          : "px-[var(--shell-gutter)] py-0 md:py-0",
        )}
      >
        {!isMobileArea ? (
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div />
            <div className="hidden md:block" />
          </header>
        ) : null}

        <div
          className={cn(
            "grid min-w-0 gap-[var(--shell-gap)]",
            isMobileArea ? "mt-0" : "mt-0",
            hideSidebar || (showLoanTopBar && !loanSidebarOpen)
              ? "grid-cols-1"
              : "grid-cols-1 md:[grid-template-columns:var(--sidebar-w)_minmax(0,1fr)]",
          )}
        >
          {!hideSidebar && !(showLoanTopBar && !loanSidebarOpen) ? (
            <aside className="-ml-[var(--shell-gutter)] hidden min-w-0 space-y-4 px-0 md:block">
              <div className="mx-2 rounded-b-[14px] border-x-4 border-b-4 border-t-0 border-[#7631e9] bg-white p-3 shadow-[inset_0_-4px_0_#d979dc]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[17px] font-bold tracking-tight text-[#8436e8]">Kocek</span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#f22e55]"><span className="h-2 w-2 rounded-full bg-[#f22e55]" />Belum Terhubung</span>
                </div>
                <p className="mt-1 text-[11px] font-bold text-[#9134ea]">Rekomendasi Pinjaman Cepat ✨</p>
                <p className="mt-2 text-[11px] leading-[1.45] text-[#223c68]">Ingin analisa cepat dan tepat?<br />gunakan layanan KocKec sekarang!</p>
                <button type="button" className="mt-5 flex w-full items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[#8738ed] to-[#d16edc] px-2 py-2 text-[10px] font-semibold text-white shadow-sm transition hover:brightness-105">
                  <Sparkles className="h-3 w-3" /> Analisa Rekomendasi Pinjaman ✨
                </button>
              </div>
              <Card className="min-w-0 rounded-r-[5px] rounded-l-none border-slate-200/70 bg-white p-2 shadow-sm">
                <div className="px-0 py-1">
                  <div className="space-y-1">
                    {isMitraKaryaArea ? (
                      <div className="px-2">
                        <SidebarMitraKaryaMenu />
                      </div>
                    ) : isAstitiDanaLestariArea ? (
                      <div className="px-2">
                        <SidebarAstitiDanaLestariMenu />
                      </div>
                    ) : isSamudraHartaArea ? (
                      <div className="space-y-1 px-2">
                        <SidebarNavItem item={nav[0].items[0]!} />
                        <SidebarObsMenu />
                        <SidebarLoginMenu />
                        <SidebarObsSuperAdminMenu />
                      </div>
                    ) : (
                      nav.map((g, idx) => (
                        <div key={g.group ?? idx} className="px-0">
                          {g.group ? (
                            <div className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                              {g.group}
                            </div>
                          ) : null}

                          <div className="space-y-1 px-2">
                            <SidebarNavItem item={g.items[0]!} />
                            {!isObsArea ? <SidebarDashboardMenu /> : null}

                            {isNewMBankingArea ? (
                              <SidebarMobileMenu />
                            ) : isSakCabangArea ? (
                              <>
                                <SidebarSakSimpananMenu />
                                <SidebarPinjamanMenu />
                                <SidebarSakSimpananBerjangkaMenu />
                                <SidebarSakAkuntingMenu />
                              </>
                            ) : (
                              <>
                                {!isObsArea ? <SidebarDjoinpayMenu /> : null}
                                {!isObsArea ? <SidebarSimpananMenu /> : null}
                                {!isObsArea ? <SidebarAnggotaMenu /> : null}
                                <SidebarPinjamanMenu />
                                {!isObsArea ? <SidebarTermSavingsMenu /> : null}
                                {!isObsArea ? <SidebarMobileMenu /> : null}
                                {!isObsArea ? <SidebarMBankingMenu /> : null}
                                {!isPinjamanArea && !isMobileArea ? (
                                  <SidebarObsMenu />
                                ) : null}
                                {!isPinjamanArea && !isMobileArea ? (
                                  <SidebarLoginMenu />
                                ) : null}
                                {isObsArea ? <SidebarObsSuperAdminMenu /> : null}
                                {!isObsArea ? <SidebarLaporanMenu /> : null}
                                {!isObsArea && !location.pathname.startsWith("/obs-samudra-harta") ? (
                                  <SidebarPengaturanUmumMenu />
                                ) : null}
                                {g.items
                                  .slice(1)
                                  .filter((it) => it.to !== "/pinjaman")
                                  .map((it) => (
                                    <SidebarNavItem key={it.to} item={it} />
                                  ))}
                              </>
                            )}
                          </div>
                        </div>
                      ))
                    )}

                    <Separator className="my-2 bg-slate-100" />
                  </div>
                </div>
              </Card>
            </aside>
          ) : null}

          <main
            className={cn(
              "min-w-0 overflow-x-hidden",
              isMobileArea
                ? "h-[100dvh] min-h-[100dvh] overflow-hidden md:h-[calc(100vh-40px)] md:min-h-0"
                : "",
            )}
          >
            {isHome ? <Outlet /> : <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
}