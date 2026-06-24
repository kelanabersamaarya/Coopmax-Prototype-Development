import { Card } from "@/components/ui/card";

export default function SakProductPlaceholder({
  title,
  subtitle = "Daftar",
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            {title}
          </h1>
          <div className="text-sm font-semibold text-slate-500">{subtitle}</div>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="text-sm font-semibold text-slate-900">
            Halaman ini sudah tersedia di sidebar.
          </div>
          <div className="mt-2 text-sm leading-relaxed text-slate-600">
            Konten detail untuk menu ini masih placeholder dan bisa dikembangkan
            sesuai kebutuhan berikutnya.
          </div>
        </Card>
      </div>
    </div>
  );
}