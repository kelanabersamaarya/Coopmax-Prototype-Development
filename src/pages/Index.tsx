import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import SidebarAnggotaMenu from "@/components/SidebarAnggotaMenu";
import SidebarPinjamanMenu from "@/components/SidebarPinjamanMenu";
import SidebarLaporanMenu from "@/components/SidebarLaporanMenu";
import SidebarObsMenu from "@/components/SidebarObsMenu";
import SidebarPengaturanUmumMenu from "@/components/SidebarPengaturanUmumMenu";
import SidebarMobileMenu from "@/components/SidebarMobileMenu";
import SidebarSakSimpananMenu from "@/components/SidebarSakSimpananMenu";
import SidebarSakSimpananBerjangkaMenu from "@/components/SidebarSakSimpananBerjangkaMenu";
import SidebarSakAkuntingMenu from "@/components/SidebarSakAkuntingMenu";
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
      // Anggota akan dirender sebagai menu collapsible khusus (lihat SidebarAnggotaMenu)
      { to: "/pinjaman", label: "Pinjaman", icon: HandCoins },
    ],
  },
];

// Routes yang benar-benar ada saat ini
const implementedRoutes = new Set([
  "/dashboard",
  "/sak-ep-cabang/dashboard",
  "/obs-samudra-harta",
  "/pengaturan-umum",
  "/loan-products",
  "/loan-products/new",
  "/loans/new",
  "/loans/applications",
  "/loans/applications/new",
  "/anggota/transaksi",
  "/laporan/kolektibilitas",
  "/mobile/e-kolektor",
  "/mobile/m-banking",
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
        className={cn(common, "bg-white hover:bg-slate-50 text-slate-900")}
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
            : "bg-white hover:bg-slate-50 text-slate-900",
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
  const isMobileArea = location.pathname.startsWith("/mobile");
  const isMBankingArea = location.pathname.startsWith("/mobile/m-banking");
  const isSakCabangArea = location.pathname.startsWith("/sak-ep-cabang");

  const isPinjamanArea =
    location.pathname.startsWith("/loan-products") ||
    location.pathname.startsWith("/loans") ||
    location.pathname.startsWith("/anggota/transaksi") ||
    location.pathname.startsWith("/laporan") ||
    location.pathname.startsWith("/pengaturan-umum") ||
    location.pathname.startsWith("/mobile") ||
    location.pathname.startsWith("/sak-ep-cabang");

  const isObsArea =
    location.pathname.startsWith("/obs-samudra-harta") ||
    location.pathname.startsWith("/obs-web");

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-[var(--shell-gutter)] py-6 md:py-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div />
          <div className="hidden md:block" />
        </header>

        <div
          className={cn(
            "mt-6 grid min-w-0 gap-[var(--shell-gap)]",
            isDashboard
              ? "grid-cols-1"
              : "md:[grid-template-columns:var(--sidebar-w)_minmax(0,1fr)]",
          )}
        >
          {!isDashboard ? (
            <aside className="min-w-0 space-y-4 px-0">
              <Card className="min-w-0 rounded-[5px] border-slate-200/70 bg-white p-2 shadow-sm">
                {/* no scroll on sidebar */}
                <div className="px-0 py-1">
                  <div className="space-y-1">
                    {isMBankingArea ? (
                      <div className="px-0">
                        <div className="space-y-1 px-2">
                          <SidebarMobileMenu />
                        </div>
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
                            {/* Dashboard */}
                            <SidebarNavItem item={g.items[0]!} />

                            {/* Area SAK EP Cabang: Dashboard + Simpanan + Pinjaman + Simpanan Berjangka + Akunting */}
                            {isSakCabangArea ? (
                              <>
                                <SidebarSakSimpananMenu />
                                <SidebarPinjamanMenu />
                                <SidebarSakSimpananBerjangkaMenu />
                                <SidebarSakAkuntingMenu />
                              </>
                            ) : (
                              <>
                                {/* Anggota (collapsible) - hide in OBS area */}
                                {!isObsArea ? <SidebarAnggotaMenu /> : null}

                                {/* Pinjaman (collapsible) */}
                                <SidebarPinjamanMenu />

                                {/* Mobile (collapsible) - hide in OBS area */}
                                {!isObsArea ? <SidebarMobileMenu /> : null}

                                {/* Online Banking / OBS (collapsible) - hidden when in Pinjaman Billing area */}
                                {!isPinjamanArea ? <SidebarObsMenu /> : null}

                                {/* Laporan (collapsible) - hide in OBS area */}
                                {!isObsArea ? <SidebarLaporanMenu /> : null}

                                {/* Pengaturan Umum - hide in OBS area */}
                                {!isObsArea ? <SidebarPengaturanUmumMenu /> : null}

                                {/* Pinjaman (link simple) - optional, keeps old behavior if you ever want it */}
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

          {/* Konten: min-w-0 penting agar tidak "dorong" grid melebar saat zoom */}
          <main
            className={cn(
              "min-w-0 overflow-x-hidden",
              isMobileArea ? "h-[calc(100vh-7rem)] min-h-[640px] overflow-hidden" : "",
            )}
          >
            {isHome ? <Outlet /> : <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
}