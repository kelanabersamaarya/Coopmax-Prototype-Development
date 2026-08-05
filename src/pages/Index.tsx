import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import SidebarAnggotaMenu from "@/components/SidebarAnggotaMenu";
import SidebarPinjamanMenu from "@/components/SidebarPinjamanMenu";
import SidebarSimpananMenu from "@/components/SidebarSimpananMenu";
import SidebarLaporanMenu from "@/components/SidebarLaporanMenu";
import SidebarObsMenu from "@/components/SidebarObsMenu";
import SidebarPengaturanUmumMenu from "@/components/SidebarPengaturanUmumMenu";
import SidebarMobileMenu from "@/components/SidebarMobileMenu";
import SidebarSakSimpananMenu from "@/components/SidebarSakSimpananMenu";
import SidebarSakSimpananBerjangkaMenu from "@/components/SidebarSakSimpananBerjangkaMenu";
import SidebarSakAkuntingMenu from "@/components/SidebarSakAkuntingMenu";
import SidebarDjoinpayMenu from "@/components/SidebarDjoinpayMenu";
import SidebarMitraKaryaMenu from "@/components/SidebarMitraKaryaMenu";
import { HandCoins, Home, ChevronRight } from "lucide-react";

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
  "/mobile/new-mbanking",
  "/payment-link",
  "/mitra-karya/dashboard",
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
  const isHome = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";
  const isMitraKaryaDashboard =
    location.pathname === "/mitra-karya/dashboard";
  const hideSidebar = isDashboard || isMitraKaryaDashboard;
  const isMobileArea = location.pathname.startsWith("/mobile");
  const isNewMBankingArea = location.pathname.startsWith("/mobile/new-mbanking");
  const isSakCabangArea = location.pathname.startsWith("/sak-ep-cabang");
  const isMitraKaryaArea = location.pathname.startsWith("/mitra-karya");

  const isPinjamanArea =
    location.pathname.startsWith("/payment-link") ||
    location.pathname.startsWith("/loan-products") ||
    location.pathname.startsWith("/loans") ||
    location.pathname.startsWith("/anggota/transaksi") ||
    location.pathname.startsWith("/laporan") ||
    location.pathname.startsWith("/pengaturan-umum") ||
    location.pathname.startsWith("/sak-ep-cabang");

  const isObsArea =
    location.pathname.startsWith("/obs-samudra-harta") ||
    location.pathname.startsWith("/obs-web");

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div
        className={cn(
          "w-full",
          isMobileArea
            ? "px-0 py-0 md:px-[var(--shell-gutter)] md:py-5"
            : "px-[var(--shell-gutter)] py-6 md:py-8",
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
            isMobileArea ? "mt-0" : "mt-6",
            hideSidebar
              ? "grid-cols-1"
              : "grid-cols-1 md:[grid-template-columns:var(--sidebar-w)_minmax(0,1fr)]",
          )}
        >
          {!hideSidebar ? (
            <aside className="hidden min-w-0 space-y-4 px-0 md:block">
              <Card className="min-w-0 rounded-[5px] border-slate-200/70 bg-white p-2 shadow-sm">
                <div className="px-0 py-1">
                  <div className="space-y-1">
                    {isMitraKaryaArea ? (
                      <div className="px-2">
                        <SidebarMitraKaryaMenu />
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
                                {!isObsArea ? <SidebarMobileMenu /> : null}
                                {!isPinjamanArea && !isMobileArea ? (
                                  <SidebarObsMenu />
                                ) : null}
                                {!isObsArea ? <SidebarLaporanMenu /> : null}
                                {!isObsArea ? (
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