import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FileSpreadsheet, FileText, Printer, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DetailPinjamanReportTable from "@/components/laporan/DetailPinjamanReportTable";
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
      <div className="text-[13px] font-normal tracking-tight text-black">
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function FieldWrap({ children }: { children: React.ReactNode }) {
  return <div className="w-full md:w-[440px] -mt-0.5">{children}</div>;
}

export default function LaporanPortofolioPinjamanCabang() {
  const [cabang, setCabang] = React.useState("-- Semua --");
  const [namaNoRek, setNamaNoRek] = React.useState("");
  const [kolektor, setKolektor] = React.useState("-- Semua --");
  const [showReport, setShowReport] = React.useState(false);

  const actions = [
    {
      label: "Export Excel",
      icon: FileSpreadsheet,
      onClick: () => toast("Export Excel (prototype)"),
    },
    {
      label: "Export PDF",
      icon: FileText,
      onClick: () => toast("Export PDF (prototype)"),
    },
    {
      label: "Cetak",
      icon: Printer,
      onClick: () => toast("Cetak (prototype)"),
    },
  ] as const;

  const inputCls = cn(
    "h-[30px] w-full rounded-[5px] border border-slate-200 bg-white px-3",
    "text-[12.5px] font-normal text-slate-900 shadow-sm",
    "placeholder:text-[#64748B]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const selectTriggerCls = cn(
    "h-[30px] rounded-[5px] border-slate-200 bg-white px-3",
    "text-[12.5px] font-normal text-black shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))] text-[13px] font-normal">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Portofolio Pinjaman Cabang
          </h1>

          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
            {actions.map((action) => (
              <ActionPill
                key={action.label}
                icon={action.icon}
                label={action.label}
                onClick={action.onClick}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Card className="w-full rounded-3xl border-0 bg-transparent p-0 shadow-none xl:w-[660px]">
            <div className="grid gap-4">
              <FieldRow label="Cabang">
                <FieldWrap>
                  <PlainFilterSelect
                    value={cabang}
                    onValueChange={setCabang}
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
                </FieldWrap>
              </FieldRow>

              <FieldRow label="Nama/No Rekening">
                <FieldWrap>
                  <Input
                    value={namaNoRek}
                    onChange={(e) => setNamaNoRek(e.target.value)}
                    placeholder="Masukkan Nama/No Rekening"
                    className={inputCls}
                  />
                </FieldWrap>
              </FieldRow>

              <FieldRow label="Kolektor/AO">
                <FieldWrap>
                  <PlainFilterSelect
                    value={kolektor}
                    onValueChange={setKolektor}
                    options={[
                      "-- Semua --",
                      "Gina Farida M.M.",
                      "Dinda Sudiati",
                      "Kolektor A",
                      "Kolektor B",
                    ]}
                    triggerClassName={selectTriggerCls}
                  />
                </FieldWrap>
              </FieldRow>

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
          </Card>
        </div>

        {showReport ? <DetailPinjamanReportTable /> : null}

        <div className="sr-only">
          {cabang} {namaNoRek} {kolektor}
        </div>
      </div>
    </div>
  );
}