import { Handshake, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function AstitiDanaLestariDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-2rem)] rounded-[5px] bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur md:p-6">
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-[12px] font-bold text-violet-800 ring-1 ring-violet-200">
        <Handshake className="h-3.5 w-3.5" />
        Koperasi Astiti Dana Lestari
      </div>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
        Dashboard Pengembangan
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
        Ringkasan akses kebutuhan pengembangan Koperasi Astiti Dana Lestari.
      </p>

      <button
        type="button"
        onClick={() => navigate("/astiti-dana-lestari/akunting")}
        className="mt-6 w-full rounded-xl border border-violet-200 bg-white p-5 text-left shadow-sm transition hover:bg-violet-50 md:max-w-md"
      >
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Akunting</h2>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              Kelola transaksi, laporan, dan pengaturan akuntansi koperasi.
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
