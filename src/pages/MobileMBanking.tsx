import { Card } from "@/components/ui/card";
import { Banknote, Smartphone } from "lucide-react";

export default function MobileMBanking() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Mobile
          </h1>
          <div className="text-base font-semibold text-slate-500">M-Banking</div>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-200">
              <Banknote className="h-6 w-6" />
            </span>

            <div className="min-w-0">
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                M-Banking
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Halaman ini disiapkan untuk pengaturan dan monitoring aplikasi
                M-Banking.
              </p>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                Konten M-Banking masih berupa halaman awal prototype.
              </div>
            </div>
          </div>

          <div className="sr-only">
            <Smartphone />
          </div>
        </Card>
      </div>
    </div>
  );
}