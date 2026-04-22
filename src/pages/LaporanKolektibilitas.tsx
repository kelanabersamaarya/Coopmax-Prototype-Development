import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart3, ShieldCheck } from "lucide-react";

export default function LaporanKolektibilitas() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 backdrop-blur">
            <BarChart3 className="h-3.5 w-3.5 text-[hsl(var(--app-accent))]" />
            Laporan
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              Laporan Kolektibilitas
            </h1>
            <Badge className="rounded-full bg-emerald-600 text-white hover:bg-emerald-600">
              Prototype
            </Badge>
          </div>

          <p className="max-w-2xl text-sm text-slate-600">
            Halaman laporan untuk ringkasan status kolektibilitas pinjaman (UI
            prototype).
          </p>
        </div>

        <Separator className="my-6 bg-slate-200/70" />

        <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 ring-1 ring-violet-200">
              <ShieldCheck className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900">
                Ringkasan kolektibilitas (placeholder)
              </div>
              <div className="mt-1 text-sm leading-relaxed text-slate-600">
                Berikutnya kita bisa tambahkan filter tanggal, unit/kolektor,
                tabel kategori (Lancar, Dalam Perhatian Khusus, Kurang Lancar,
                Diragukan, Macet), dan export.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}