import * as React from "react";
import { Card } from "@/components/ui/card";

export default function LaporanPinjaman() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Pinjaman
          </h1>
          <div className="text-sm font-semibold text-slate-500">Prototype</div>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold text-slate-900">
            Halaman Laporan Pinjaman
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Silakan beri tahu format laporan pinjaman yang Anda inginkan (kolom,
            filter, dan data apa saja), nanti saya rapikan khusus bagian laporan.
          </div>
        </Card>
      </div>
    </div>
  );
}