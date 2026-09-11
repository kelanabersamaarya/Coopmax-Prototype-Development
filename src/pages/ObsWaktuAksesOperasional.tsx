import { Clock3 } from "lucide-react";

export default function ObsWaktuAksesOperasional() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Clock3 className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Waktu Akses Operasional
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Pengaturan waktu akses operasional khusus modul Kebutuhan Koperasi Samudra Harta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
