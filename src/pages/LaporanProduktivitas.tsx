import * as React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FileSpreadsheet, FileText, Printer, Search } from "lucide-react";
import { toast } from "sonner";
import LaporanProduktivitasReportTable from "@/components/laporan/LaporanProduktivitasReportTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type JenisLaporan = "Laporan Produktivitas" | "Detail NPL";

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
        "text-[13px] font-normal text-slate-700",
        "ring-1 ring-slate-200 shadow-sm transition hover:bg-slate-50",
      )}
    >
      <Icon className="h-4 w-4 text-slate-500" />
      {label}
    </button>
  );
}

export default function LaporanProduktivitas() {
  const [kolektor, setKolektor] = React.useState("-- Semua --");
  const [bulan, setBulan] = React.useState("Mei");
  const [tahun, setTahun] = React.useState("2026");
  const [jenisLaporan, setJenisLaporan] =
    React.useState<JenisLaporan>("Laporan Produktivitas");
  const [showReport, setShowReport] = React.useState(false);

  const inputCls =
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] font-normal shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0";

  const selectTriggerCls =
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] font-normal shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Produktivitas
          </h1>

          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
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

        <Card className="mt-5 rounded-3xl border-0 bg-transparent p-0 shadow-none">
          <div className="w-full max-w-[760px]">
            <div className="grid gap-[15px]">
              <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div className="text-[13px] font-normal text-slate-900">
                  Kolektor
                </div>
                <div className="w-full md:max-w-[440px]">
                  <Select value={kolektor} onValueChange={setKolektor}>
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px] border-slate-200">
                      <SelectItem value="-- Semua --">-- Semua --</SelectItem>
                      <SelectItem value="Gina Farida M.M.">
                        Gina Farida M.M.
                      </SelectItem>
                      <SelectItem value="Dinda Sudiati">Dinda Sudiati</SelectItem>
                      <SelectItem value="Kolektor A">Kolektor A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div className="text-[13px] font-normal text-slate-900">
                  Periode
                </div>
                <div className="grid w-full gap-2 md:max-w-[440px] md:grid-cols-2">
                  <Select value={bulan} onValueChange={setBulan}>
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px] border-slate-200">
                      {[
                        "Januari",
                        "Februari",
                        "Maret",
                        "April",
                        "Mei",
                        "Juni",
                        "Juli",
                        "Agustus",
                        "September",
                        "Oktober",
                        "November",
                        "Desember",
                      ].map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    className={inputCls}
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div className="text-[13px] font-normal text-slate-900">
                  Jenis Laporan
                </div>
                <div className="w-full md:max-w-[440px]">
                  <Select
                    value={jenisLaporan}
                    onValueChange={(value) =>
                      setJenisLaporan(value as JenisLaporan)
                    }
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-[5px] border-slate-200">
                      <SelectItem value="Laporan Produktivitas">
                        Laporan Produktivitas
                      </SelectItem>
                      <SelectItem value="Detail NPL">Detail NPL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div />
                <div className="flex w-full justify-end md:max-w-[440px]">
                  <button
                    type="button"
                    onClick={() => setShowReport(true)}
                    className={cn(
                      "inline-flex h-[30px] w-[61px] items-center justify-center gap-1.5 rounded-[5px]",
                      "bg-[#3BB001] text-[13px] font-normal text-white",
                      "ring-1 ring-[#3BB001]/25 transition hover:bg-[#349d01]",
                    )}
                  >
                    <Search className="h-3.5 w-3.5" />
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {showReport ? <LaporanProduktivitasReportTable /> : null}
      </div>
    </div>
  );
}