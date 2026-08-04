import { BarChart3, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function MitraKaryaDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Dashboard Pengembangan
          </h1>
          <span className="text-sm font-semibold text-slate-500">
            Koperasi Mitra Karya
          </span>
        </div>

        <Card className="mt-6 max-w-3xl rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 ring-1 ring-violet-200">
              <UsersRound className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Kebutuhan Koperasi Mitra Karya
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Area pengembangan untuk kebutuhan operasional dan pelaporan
                Koperasi Mitra Karya.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/mitra-karya/laporan/anggota")}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <BarChart3 className="h-4 w-4" />
            Buka Laporan Anggota
          </button>
        </Card>
      </div>
    </div>
  );
}