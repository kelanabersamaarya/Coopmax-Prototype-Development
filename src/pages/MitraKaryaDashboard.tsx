import { useNavigate } from "react-router-dom";
import { ArrowRight, FileBarChart2, Handshake, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function MitraKaryaDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-2rem)] rounded-[5px] bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur md:p-6">
      <div className="flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[12px] font-bold text-emerald-800 ring-1 ring-emerald-200">
          <Handshake className="h-3.5 w-3.5" />
          Koperasi Mitra Karya
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
          Dashboard Pengembangan
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
          Ringkasan akses kebutuhan pengembangan dan laporan anggota Koperasi
          Mitra Karya.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="rounded-[12px] border-emerald-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-emerald-100 text-emerald-700">
              <UsersRound className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <h2 className="text-[16px] font-extrabold text-slate-900">
                Data Anggota
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                Akses kebutuhan data dan informasi anggota Koperasi Mitra Karya.
              </p>
            </div>
          </div>
        </Card>

        <button
          type="button"
          onClick={() => navigate("/mitra-karya/laporan/anggota")}
          className={cn(
            "group rounded-[12px] border border-sky-200 bg-white p-5 text-left shadow-sm",
            "transition hover:bg-sky-50",
          )}
        >
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-sky-100 text-sky-700">
              <FileBarChart2 className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-[16px] font-extrabold text-slate-900">
                Laporan Anggota
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                Lihat laporan simpanan dan data anggota Koperasi Mitra Karya.
              </p>
            </div>

            <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-sky-600 transition group-hover:translate-x-1" />
          </div>
        </button>
      </div>
    </div>
  );
}