import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  FileSpreadsheet,
  FileText,
  Printer,
  RefreshCw,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DetailPinjamanReportTable from "@/components/laporan/DetailPinjamanReportTable";
import ClearableDatePickerField from "@/components/laporan/ClearableDatePickerField";
import LoanTypeMultiSelect from "@/components/laporan/LoanTypeMultiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const loanOptions = [
  "Pinjaman Billing",
  "Pinjaman Bulanan",
  "Pinjaman Bulanan 1",
  "Pinjaman Bulanan 9",
  "Pinjaman Harian",
  "Pinjaman RC",
] as const;

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

export default function LaporanDetailPinjaman() {
  const [jenisPinjaman, setJenisPinjaman] = React.useState<string[]>([]);
  const [namaNoRek, setNamaNoRek] = React.useState("");
  const [kolektor, setKolektor] = React.useState("-- Semua --");
  const [statusPinjaman, setStatusPinjaman] = React.useState("-- Semua --");
  const [tanggalStart, setTanggalStart] = React.useState("");
  const [tanggalEnd, setTanggalEnd] = React.useState("");
  const [jatuhTempoStart, setJatuhTempoStart] = React.useState("");
  const [jatuhTempoEnd, setJatuhTempoEnd] = React.useState("");
  const [showReport, setShowReport] = React.useState(false);

  const actions = [
    {
      label: "Refresh",
      icon: RefreshCw,
      onClick: () =>
        toast("Refresh laporan (prototype)", {
          description: "Data laporan ditampilkan ulang.",
        }),
    },
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
    "h-[30px] w-full justify-between rounded-[6px] border border-slate-200 bg-white px-3",
    "text-[12.5px] font-normal text-[#596882] shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-500",
  );

  const selectContentCls = cn(
    "rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.right-2]:hidden",
    "[&_[data-radix-collection-item]]:pl-4",
    "[&_[data-radix-collection-item]]:pr-4",
  );

  const selectItemCls = cn(
    "rounded-none px-4 py-2.5 text-[14px] font-normal text-black",
    "transition-colors",
    "hover:bg-violet-600 hover:text-white",
    "focus:bg-violet-600 focus:text-white",
    "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
    "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.right-2]:hidden",
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))] text-[13px] font-normal">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Detail Pinjaman
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
              <FieldRow label="Jenis Pinjaman">
                <FieldWrap>
                  <LoanTypeMultiSelect
                    options={[...loanOptions]}
                    value={jenisPinjaman}
                    onChange={setJenisPinjaman}
                    placeholder="Pilih pinjaman"
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

              <FieldRow label="Kolektor">
                <FieldWrap>
                  <Select value={kolektor} onValueChange={setKolektor}>
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
                </FieldWrap>
              </FieldRow>

              <FieldRow label="Status Pinjaman">
                <FieldWrap>
                  <Select
                    value={statusPinjaman}
                    onValueChange={setStatusPinjaman}
                  >
                    <SelectTrigger className={selectTriggerCls}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentCls}>
                      <SelectItem value="-- Semua --" className={selectItemCls}>
                        -- Semua --
                      </SelectItem>
                      <SelectItem
                        value="Aktif / Sudah Dicairkan"
                        className={selectItemCls}
                      >
                        Aktif / Sudah Dicairkan
                      </SelectItem>
                      <SelectItem value="Lunas" className={selectItemCls}>
                        Lunas
                      </SelectItem>
                      <SelectItem value="Macet" className={selectItemCls}>
                        Macet
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FieldWrap>
              </FieldRow>

              <FieldRow label="Tanggal Pinjaman">
                <FieldWrap>
                  <div className="grid gap-2 md:grid-cols-2">
                    <ClearableDatePickerField
                      value={tanggalStart}
                      onChange={setTanggalStart}
                      placeholder="Tanggal awal"
                    />
                    <ClearableDatePickerField
                      value={tanggalEnd}
                      onChange={setTanggalEnd}
                      placeholder="Tanggal akhir"
                    />
                  </div>
                </FieldWrap>
              </FieldRow>

              <FieldRow label="Tanggal Jatuh Tempo">
                <FieldWrap>
                  <div className="grid gap-2 md:grid-cols-2">
                    <ClearableDatePickerField
                      value={jatuhTempoStart}
                      onChange={setJatuhTempoStart}
                      placeholder="Tanggal awal"
                    />
                    <ClearableDatePickerField
                      value={jatuhTempoEnd}
                      onChange={setJatuhTempoEnd}
                      placeholder="Tanggal akhir"
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
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
                </FieldWrap>
              </FieldRow>
            </div>
          </Card>
        </div>

        {showReport ? <DetailPinjamanReportTable /> : null}
      </div>
    </div>
  );
}