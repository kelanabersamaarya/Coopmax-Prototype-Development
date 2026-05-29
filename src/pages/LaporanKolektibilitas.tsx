import * as React from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  RefreshCw,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import KolektibilitasReportTable, {
  type KolektibilitasRow,
} from "@/components/laporan/KolektibilitasReportTable";
import LoanTypeMultiSelect from "@/components/laporan/LoanTypeMultiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type KolektibilitasType =
  | "-- Semua --"
  | "Lancar"
  | "Dalam Perhatian Khusus"
  | "Kurang Lancar"
  | "Diragukan"
  | "Macet";

type StatusAnggota = "Semua" | "Anggota" | "Calon";

const months = [
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
] as const;

const loanOptions = [
  "Pinjaman Bulanan 9",
  "Pinjaman Harian",
  "Pinjaman Bulanan 17",
  "Pinjaman Emas",
  "Pinjaman Bulanan 18",
  "Pinjaman Bulanan 8",
  "Pinjaman Bulanan 3",
  "Pinjaman Bulanan 1",
  "Pinjaman Bulanan 5",
  "Pinjaman Billing",
] as const;

const UI = {
  radius: "rounded-[5px]",
  h: "h-[30px]",
  text: "text-[12.5px]",
  gapY: "gap-[15px]",
  input:
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] shadow-sm",
} as const;

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
        "inline-flex h-9 items-center gap-2 rounded-[20px] bg-white px-4 text-[12.5px] font-semibold text-slate-700",
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
    <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
      <div className="text-[13px] font-normal text-slate-900">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function StyledSelect({
  value,
  onValueChange,
  options,
  placeholder,
  contentClassName,
  muted = false,
  className,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  contentClassName?: string;
  muted?: boolean;
  className?: string;
}) {
  const triggerCls = cn(
    "h-[30px] w-full rounded-[5px] border border-slate-200 bg-white px-3 text-[12.5px] font-medium shadow-sm",
    "text-[#596882]",
    "ring-0 ring-transparent",
    "outline-none",
    "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
    "data-[state=open]:ring-0 data-[state=open]:ring-offset-0",
    "focus:border-slate-300 focus-visible:border-slate-300",
    "[&_[data-slot=select-value][data-placeholder]]:text-slate-500",
    "[&_[data-slot=select-value][data-placeholder]]:opacity-100",
    className,
  );

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={triggerCls}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        className={cn(
          "rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
          "[&_[data-radix-select-item-indicator]]:hidden",
          "[&_[data-slot=select-item-indicator]]:hidden",
          "[&>span.absolute.right-2]:hidden",
          "[&_[data-radix-collection-item]]:pl-4",
          "[&_[data-radix-collection-item]]:pr-4",
          contentClassName,
        )}
      >
        {options.map((o) => (
          <SelectItem
            key={o}
            value={o}
            className={cn(
              "rounded-none px-4 py-2.5 text-[14px] font-normal text-black",
              "transition-colors",
              "hover:bg-violet-600 hover:text-white",
              "focus:bg-violet-600 focus:text-white",
              "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
              "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
              "data-[state=checked]:focus:bg-violet-600 data-[state=checked]:focus:text-white",
              "[&_[data-radix-select-item-indicator]]:hidden",
              "[&_[data-slot=select-item-indicator]]:hidden",
              "[&>span.absolute.right-2]:hidden",
            )}
          >
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const seedRows: KolektibilitasRow[] = [
  {
    no: 1,
    noNsb: "N2400026",
    nama: "Hendrianto",
    alamat: "Jl. Sunset APRIL 43",
    aoId: "A01",
    jangkaWaktuBln: 12,
    dari: "18-01-2025",
    sampai: "08-12-2025",
    pinjamanSldPokok: 3822341,
    pinjamanBng: 5.78,
    angsuranPerBln: 370331,
    angsuranSdhHr: 16.2,
    tunggakanBln: 0,
    tunggakanNilai: 0,
    tunggakan1_30: 0,
    tunggakan31_60: 0,
    tunggakan61_90: 0,
    tunggakan90p: 0,
  },
  {
    no: 2,
    noNsb: "N2500010",
    nama: "Gaby",
    alamat: "Jl. Galang",
    aoId: "A01",
    jangkaWaktuBln: 9,
    dari: "03-03-2025",
    sampai: "03-12-2025",
    pinjamanSldPokok: 5000000,
    pinjamanBng: 0.99,
    angsuranPerBln: 650000,
    angsuranSdhHr: 21.0,
    tunggakanBln: 1,
    tunggakanNilai: 150000,
    tunggakan1_30: 150000,
    tunggakan31_60: 0,
    tunggakan61_90: 0,
    tunggakan90p: 0,
  },
  {
    no: 3,
    noNsb: "N2400033",
    nama: "Rika Wastuti",
    alamat: "Jl. Kenanga No. 12",
    aoId: "A02",
    jangkaWaktuBln: 10,
    dari: "12-02-2025",
    sampai: "12-12-2025",
    pinjamanSldPokok: 3500000,
    pinjamanBng: 20.0,
    angsuranPerBln: 420000,
    angsuranSdhHr: 10.5,
    tunggakanBln: 2,
    tunggakanNilai: 220000,
    tunggakan1_30: 220000,
    tunggakan31_60: 0,
    tunggakan61_90: 0,
    tunggakan90p: 0,
  },
  {
    no: 4,
    noNsb: "N2400029",
    nama: "Pangeran Sirait",
    alamat: "Sidakarya",
    aoId: "A03",
    jangkaWaktuBln: 12,
    dari: "01-04-2025",
    sampai: "01-04-2026",
    pinjamanSldPokok: 24000000,
    pinjamanBng: 12.0,
    angsuranPerBln: 2200000,
    angsuranSdhHr: 14.0,
    tunggakanBln: 0,
    tunggakanNilai: 0,
    tunggakan1_30: 0,
    tunggakan31_60: 0,
    tunggakan61_90: 0,
    tunggakan90p: 0,
  },
  {
    no: 5,
    noNsb: "N2500006",
    nama: "Andri Komara",
    alamat: "Jl. Melati No. 8",
    aoId: "A01",
    jangkaWaktuBln: 8,
    dari: "03-12-2025",
    sampai: "03-08-2026",
    pinjamanSldPokok: 5000000,
    pinjamanBng: 0.99,
    angsuranPerBln: 650000,
    angsuranSdhHr: 8.0,
    tunggakanBln: 4,
    tunggakanNilai: 800000,
    tunggakan1_30: 200000,
    tunggakan31_60: 0,
    tunggakan61_90: 0,
    tunggakan90p: 0,
  },
];

export default function LaporanKolektibilitas() {
  const [jenisPinjaman, setJenisPinjaman] = React.useState<string[]>([]);
  const [namaKode, setNamaKode] = React.useState("");

  const [bulan, setBulan] = React.useState<(typeof months)[number]>("April");
  const [tahun, setTahun] = React.useState("2026");
  const [tipe, setTipe] = React.useState<KolektibilitasType>("-- Semua --");
  const [statusAnggota, setStatusAnggota] =
    React.useState<StatusAnggota>("Semua");

  const [submitted, setSubmitted] = React.useState(false);

  function doSearch() {
    if (!bulan) setBulan("April");
    if (!tahun) setTahun("2026");
    if (!tipe) setTipe("-- Semua --");
    if (!statusAnggota) setStatusAnggota("Semua");

    setSubmitted(true);
  }

  const isDefaultBulan = bulan === "April";
  const isDefaultTahun = tahun === "2026";
  const isDefaultTipe = tipe === "-- Semua --";
  const isDefaultStatus = statusAnggota === "Semua";

  const fieldW = "w-full md:max-w-[520px] lg:max-w-[440px]";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Kolektibilitas
          </h1>

          <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
            <ActionPill
              icon={RefreshCw}
              label="Proses Kolektibilitas"
              onClick={() =>
                toast("Proses Kolektibilitas (prototype)", {
                  description: "Proses belum dihubungkan.",
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

        <Card className="mt-5 rounded-3xl border-0 bg-transparent p-0 shadow-none">
          <div className="w-full max-w-[760px]">
            <div className={cn("grid", UI.gapY)}>
              <FieldRow label="Jenis Pinjaman">
                <div className={fieldW}>
                  <LoanTypeMultiSelect
                    options={[...loanOptions]}
                    value={jenisPinjaman}
                    onChange={setJenisPinjaman}
                    placeholder="Pilih pinjaman"
                  />
                </div>
              </FieldRow>

              <FieldRow label="Nama/Kode Pinjaman">
                <Input
                  value={namaKode}
                  onChange={(e) => setNamaKode(e.target.value)}
                  placeholder="Masukkan nama/kode pinjaman.."
                  className={cn(UI.input, fieldW)}
                />
              </FieldRow>

              <FieldRow label="Bulan">
                <div className={fieldW}>
                  <StyledSelect
                    value={bulan}
                    onValueChange={(v) => setBulan(v as (typeof months)[number])}
                    options={[...months]}
                    placeholder="Pilih Bulan"
                    muted={isDefaultBulan}
                    contentClassName={cn(
                      "[&_[data-radix-select-viewport]]:max-h-[240px]",
                      "[&_[data-radix-select-viewport]]:overflow-y-auto",
                      "[&_[data-radix-select-viewport]::-webkit-scrollbar]:w-2",
                      "[&_[data-radix-select-viewport]::-webkit-scrollbar-track]:bg-slate-100",
                      "[&_[data-radix-select-viewport]]:overscroll-contain",
                      "[&_[data-radix-select-viewport]::-webkit-scrollbar-thumb]:bg-slate-400",
                      "[&_[data-radix-select-viewport]::-webkit-scrollbar-thumb]:rounded-full",
                    )}
                  />
                </div>
              </FieldRow>

              <FieldRow label="Tahun">
                <Input
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  className={cn(
                    UI.input,
                    "placeholder:text-slate-500",
                    isDefaultTahun ? "text-slate-500" : "text-black",
                    fieldW,
                  )}
                  placeholder="Pilih Tahun"
                  inputMode="numeric"
                />
              </FieldRow>

              <FieldRow label="Tipe Kolektibilitas">
                <div className={fieldW}>
                  <StyledSelect
                    value={tipe}
                    onValueChange={(v) => setTipe(v as KolektibilitasType)}
                    options={[
                      "-- Semua --",
                      "Lancar",
                      "Dalam Perhatian Khusus",
                      "Kurang Lancar",
                      "Diragukan",
                      "Macet",
                    ]}
                    placeholder="Pilih Tipe Kolektibilitas"
                    muted={isDefaultTipe}
                  />
                </div>
              </FieldRow>

              <FieldRow label="Status Anggota">
                <div className={fieldW}>
                  <StyledSelect
                    value={statusAnggota}
                    onValueChange={(v) => setStatusAnggota(v as StatusAnggota)}
                    options={["Semua", "Anggota", "Calon"]}
                    placeholder="Pilih Jenis Anggota"
                    muted={isDefaultStatus}
                  />
                </div>
              </FieldRow>

              <div className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div />
                <div className={cn(fieldW, "flex justify-end")}>
                  <button
                    type="button"
                    onClick={doSearch}
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

        {submitted ? (
          <KolektibilitasReportTable
            rows={seedRows}
            page={1}
            pageSize={20}
            totalEntries={495}
          />
        ) : null}
      </div>
    </div>
  );
}