import * as React from "react";
import { Card } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function PengaturanUmum() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Pengaturan Umum
          </h1>
          <div className="text-sm font-semibold text-slate-500">Menu</div>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 ring-1 ring-violet-200">
              <Wrench className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <div className="text-base font-semibold tracking-tight text-slate-900">
                Pengaturan Umum
              </div>
              <div className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">
                Halaman ini disiapkan sebagai tempat konfigurasi umum aplikasi.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}