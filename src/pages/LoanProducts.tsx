import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getLoanProducts } from "@/lib/loanProductsStore";
import { Plus, Sparkles } from "lucide-react";

export default function LoanProducts() {
  const products = getLoanProducts();

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--app-accent))]" />
              Setup & kelola katalog produk
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Produk Pinjaman
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Buat dan simpan konfigurasi produk pinjaman. Produk yang disimpan akan
              muncul di halaman pembuatan pinjaman baru.
            </p>
          </div>

          <Button asChild className="rounded-full bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-2))]">
            <Link to="/loan-products/new">
              <Plus className="mr-2 h-4 w-4" /> Tambah Produk
            </Link>
          </Button>
        </div>

        <Separator className="my-6 bg-slate-200/70" />

        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <Card key={p.id} className="rounded-3xl border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-slate-900">
                    {p.name}
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    Tenor {p.tenorMonths} bulan • Bunga {p.interestRateYearly}%/th
                  </div>
                </div>
                <Badge className="rounded-full bg-slate-900 text-white hover:bg-slate-900">
                  {p.billingScheme}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <div className="text-[11px] font-medium text-slate-600">
                    Grace period
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {p.gracePeriodDays} hari
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <div className="text-[11px] font-medium text-slate-600">
                    Skema billing
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {p.billingScheme}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
