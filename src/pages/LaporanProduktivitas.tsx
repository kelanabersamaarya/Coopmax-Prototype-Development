import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FileSpreadsheet, FileText, Printer, Search } from "lucide-react";
import { toast } from "sonner";
import LaporanProduktivitasReportTable from "@/components/laporan/LaporanProduktivitasReportTable";
import PlainFilterSelect from "@/components/laporan/PlainFilterSelect";

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
                <PlainFilterSelect
                  value={cabangAo}
                  onValueChange={setCabangAo}
                  options={[
                    "-- Semua --",
                    "Kantor Pusat",
                    "Ubud",
                    "Gianyar",
                    "Denpasar",
                    "Badung",
                  ]}
                  triggerClassName={selectTriggerCls}
                />
              </FieldRow>

              <FieldRow label="Kolektor / AO">
                <PlainFilterSelect
                  value={kolektorAo}
                  onValueChange={setKolektorAo}
                  options={[
                    "-- Semua --",
                    "Gina Farida M.M.",
                    "Dinda Sudiati",
                    "Kolektor A",
                    "Kolektor B",
                  ]}
                  triggerClassName={selectTriggerCls}
                />
              </FieldRow>

              <FieldRow label="Periode">
                <div className="grid gap-2 md:grid-cols-[1fr_0.9fr]">
                  <PlainFilterSelect
                    value={bulan}
                    onValueChange={setBulan}
                    options={months}
                    triggerClassName={selectTriggerCls}
                  />

                  <PlainFilterSelect
                    value={tahun}
                    onValueChange={setTahun}
                    options={years}
                    triggerClassName={selectTriggerCls}
                  />
                </div>
              </FieldRow>

              <FieldRow label="Jenis Laporan">
                <PlainFilterSelect
                  value={jenisLaporan}
                  onValueChange={setJenisLaporan}
                  options={["Laporan Produktivitas", "Detail NPL"]}
                  triggerClassName={selectTriggerCls}
                />
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