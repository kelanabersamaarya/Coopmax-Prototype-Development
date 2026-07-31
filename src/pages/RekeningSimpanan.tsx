import { Card } from "@/components/ui/card";

export default function RekeningSimpanan() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Rekening Simpanan
          </h1>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="text-sm font-semibold text-slate-900">
            Halaman Rekening Simpanan
          </div>
          <div className="mt-2 text-sm leading-relaxed text-slate-600">
            Konten untuk modul Simpanan akan dikembangkan sesuai kebutuhan berikutnya.
          </div>
        </Card>
      </div>
    </div>
  );
}