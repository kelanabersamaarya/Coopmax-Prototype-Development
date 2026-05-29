import * as React from "react";
import { Card } from "@/components/ui/card";
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

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
      <div className="text-[13px] font-normal text-black">{label}</div>
      <div className="w-full md:max-w-[440px]">{children}</div>
    </div>
  );
}

export default function LaporanProduktivitas() {
  const [cabangAo, setCabangAo] = React.useState("-- Semua --");
  const [kolektorAo, setKolektorAo] = React.useState("-- Semua --");
  const [bulan, setBulan] = React.useState("Mei");
  const [tahun, setTahun] = React.useState("2026");
  const [jenisLaporan, setJenisLaporan] = React.useState("Laporan Produktivitas");
  const [showReport, setShowReport] = React.useState(false);

  const selectedCabangAo = cabangAo === "-- Semua --" ? undefined : cabangAo;
  const selectedKolektorAo = kolektorAo === "-- Semua --" ? undefined : kolektorAo;

  const months = React.useMemo(
    () => [
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
    ],
    [],
  );

  const years = React.useMemo(() => ["2024", "2025", "2026", "2027"], []);

  const selectTriggerCls =
    "h-[30px] rounded-[5px] border-slate-200 bg-white px-3 text-[12.5px] font-normal text-black shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0";

  const selectContentCls = cn(
    "overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-xl",
    "[&_[data-radix-select-viewport]]:p-0",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.right-2]:hidden",
  );

  const selectItemCls = cn(
    "rounded-none px-5 py-3 text-[14px] font-normal text-black",
    "transition-colors",
    "focus:bg-violet-600 focus:text-white",
    "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
    "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
    "data-[state=checked]:focus:bg-violet-600 data-[state=checked]:focus:text-white",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.right-2]:hidden",
  );

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
              <FieldRow label="Cabang AO/Kolektor Terdaftar">
                <Select value={cabangAo} onValueChange={setCabangAo}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentCls}>
                    <SelectItem value="-- Semua --" className={selectItemCls}>
                      -- Semua --
                    </SelectItem>
                    <SelectItem value="Kantor Pusat" className={selectItemCls}>
                      Kantor Pusat
                    </SelectItem>
                    <SelectItem value="Ubud" className={selectItemCls}>
                      Ubud
                    </SelectItem>
                    <SelectItem value="Gianyar" className={selectItemCls}>
                      Gianyar
                    </SelectItem>
                    <SelectItem value="Denpasar" className={selectItemCls}>
                      Denpasar
                    </SelectItem>
                    <SelectItem value="Badung" className={selectItemCls}>
                      Badung
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="Kolektor / AO">
                <Select value={kolektorAo} onValueChange={setKolektorAo}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentCls}>
                    <SelectItem value="-- Semua --" className={selectItemCls}>
                      -- Semua --
                    </SelectItem>
                    <SelectItem value="Gina Farida M.M." className={selectItemCls}>
                      Gina Farida M.M.
                    </SelectItem>
                    <SelectItem value="Dinda Sudiati" className={selectItemCls}>
                      Dinda Sudiati
                    </SelectItem>
                    <SelectItem value="Kolektor A" className={selectItemCls}>
                      Kolektor A
                    </SelectItem>
                    <SelectItem value="Kolektor B" className={selectItemCls}>
                      Kolektor B
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="Periode">
                <div className="grid gap-2 md:grid-cols-[1fr_0.9fr]">
                  <Select value={bulan} onValueChange={setBulan}>
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      {months.map((month) => (
                        <SelectItem
                          key={month}
                          value={month}
                          className={selectItemCls}
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={tahun} onValueChange={setTahun}>
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      {years.map((year) => (
                        <SelectItem
                          key={year}
                          value={year}
                          className={selectItemCls}
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FieldRow>

              <FieldRow label="Jenis Laporan">
                <Select value={jenisLaporan} onValueChange={setJenisLaporan}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentCls}>
                    <SelectItem
                      value="Laporan Produktivitas"
                      className={selectItemCls}
                    >
                      Laporan Produktivitas
                    </SelectItem>
                    <SelectItem value="Detail NPL" className={selectItemCls}>
                      Detail NPL
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <div className="grid gap-1 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
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

        {showReport ? (
          <LaporanProduktivitasReportTable
            selectedCabangAo={selectedCabangAo}
            selectedKolektorAo={selectedKolektorAo}
          />
        ) : null}

        <div className="sr-only">
          {cabangAo} {kolektorAo} {bulan} {tahun} {jenisLaporan}
        </div>
      </div>
    </div>
  );
}