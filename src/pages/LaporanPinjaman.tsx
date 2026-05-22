import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  FileSpreadsheet,
  FileText,
  Printer,
  RefreshCw,
  Table2,
} from "lucide-react";

function ActionPill({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full bg-white px-4",
        "text-[12.5px] font-semibold text-slate-700",
        "ring-1 ring-slate-200 shadow-sm transition hover:bg-slate-50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
      )}
    >
      <Icon className="h-4 w-4 text-slate-500" />
      {label}
    </button>
  );
}

export default function LaporanPinjaman() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Pinjaman
          </h1>

          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
            <ActionPill
              icon={Table2}
              label="Rekapitulasi Kolektibilitas"
              onClick={() =>
                toast("Rekapitulasi Kolektibilitas (prototype)", {
                  description: "Aksi ini belum dihubungkan.",
                })
              }
            />
            <ActionPill
              icon={RefreshCw}
              label="Proses Kolektibilitas"
              onClick={() =>
                toast("Proses Kolektibilitas (prototype)", {
                  description: "Aksi ini belum dihubungkan.",
                })
              }
            />
            <ActionPill
              icon={FileSpreadsheet}
              label="Export Excel"
              onClick={() => toast("Export Excel (prototype)")}
            />
            <ActionPill
              icon={FileText}
              label="Export PDF"
              onClick={() => toast("Export PDF (prototype)")}
            />
            <ActionPill
              icon={Printer}
              label="Cetak"
              onClick={() => toast("Cetak (prototype)")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}