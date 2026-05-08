import * as React from "react";

export default function LoanPemutihanDaftar() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Pemutihan Pinjaman
          </h1>
          <div className="text-base font-semibold text-slate-600">Daftar</div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur">
          <div className="text-sm font-medium text-slate-700">
            Halaman daftar pemutihan pinjaman (prototype).
          </div>
        </div>
      </div>
    </div>
  );
}