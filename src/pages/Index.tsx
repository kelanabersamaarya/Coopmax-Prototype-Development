import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  FileText,
  LayoutGrid,
  Package2,
  Sparkles,
} from "lucide-react";

const nav = [
  {
    group: "Pinjaman",
    items: [
      {
        to: "/loan-products",
        label: "Produk Pinjaman",
        icon: Package2,
      },
      {
        to: "/loans/new",
        label: "Buat Pinjaman Baru",
        icon: FileText,
      },
    ],
  },
];

export default function Index() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--app-accent))] text-white shadow-sm">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-slate-900">
                Loan Studio
              </div>
              <div className="text-xs text-slate-600">
                Prototype setup produk & pinjaman
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-200 bg-white/60 hover:bg-white"
            >
              <Link to="/loan-products/new">
                <Sparkles className="mr-2 h-4 w-4" /> Setup Produk
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-2))]"
            >
              <Link to="/loans/new">
                <FileText className="mr-2 h-4 w-4" /> Buat Pinjaman
              </Link>
            </Button>
          </div>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-[280px_1fr]">
          <Card className="rounded-3xl border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <LayoutGrid className="h-4 w-4 text-[hsl(var(--app-accent-2))]" />
              Menu
            </div>
            <Separator className="my-4 bg-slate-200/70" />

            <div className="space-y-5">
              {nav.map((g) => (
                <div key={g.group}>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    {g.group}
                  </div>
                  <div className="mt-2 space-y-1">
                    {g.items.map((it) => {
                      const Icon = it.icon;
                      return (
                        <NavLink
                          key={it.to}
                          to={it.to}
                          className={({ isActive }) =>
                            `flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm ring-1 transition ${
                              isActive
                                ? "bg-slate-900 text-white ring-slate-900"
                                : "bg-white/60 text-slate-900 ring-slate-200 hover:bg-white"
                            }`
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[hsl(var(--app-accent))]/10 text-[hsl(var(--app-accent-2))]">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="font-semibold">{it.label}</div>
                          </div>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div>
            {isHome ? (
              <Card className="rounded-3xl border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--app-accent))]/10 px-3 py-1 text-xs font-medium text-[hsl(var(--app-accent-2))]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Revisi scope: wizard produk + pinjaman 1 halaman
                </div>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                  Mulai dari katalog produk, lalu buat pinjaman.
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  Wizard setup produk memakai free navigation (sidebar steps bisa
                  diklik kapan saja). Sementara pembuatan pinjaman baru cukup 1
                  halaman untuk memilih produk.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Card className="rounded-3xl border-slate-200/70 bg-slate-50 p-5">
                    <div className="text-sm font-semibold text-slate-900">
                      Setup Produk (Wizard)
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      Buat produk pinjaman, simpan ke localStorage.
                    </p>
                    <Button
                      asChild
                      className="mt-4 w-full rounded-full bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-2))]"
                    >
                      <Link to="/loan-products/new">Mulai setup</Link>
                    </Button>
                  </Card>

                  <Card className="rounded-3xl border-slate-200/70 bg-slate-50 p-5">
                    <div className="text-sm font-semibold text-slate-900">
                      Buat Pinjaman Baru
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      Pilih produk, lihat ringkasan, simpan draft.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-4 w-full rounded-full border-slate-200 bg-white hover:bg-white"
                    >
                      <Link to="/loans/new">Pilih produk</Link>
                    </Button>
                  </Card>
                </div>
              </Card>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
