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
import LoanTypeRequiredDialog from "@/components/laporan/LoanTypeRequiredDialog";
import KolektibilitasReportTable, {
  type KolektibilitasRow,
} from "@/components/laporan/KolektibilitasReportTable";
import LoanTypeMultiSelect from "@/components/laporan/LoanTypeMultiSelect";
import MultiSelectChips from "@/components/laporan/MultiSelectChips";
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

const branchOptions = [
  "Pilih cabang",
  "Cabang Pusat",
  "Cabang Denpasar",
  "Cabang Badung",
  "Cabang Gianyar",
] as const;

const UI = {
  radius: "rounded-[5px]",
  h: "h-[30px]",
  text: "text-[12.5px]",
  gapY: "gap-[15px]",
  input:
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] shadow-sm",
  btn: "h-[30px] rounded-[5px] px-5 text-[13px] font-semibold text-white",
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
        "inline-flex h-9 items-center gap-2 rounded-[5px] bg-white px-4 text-[12.5px] font-semibold text-slate-700",
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
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  contentClassName?: string;
}) {
  const triggerCls = cn(
    "h-[30px] w-full rounded-[5px] border border-slate-200 bg-white px-3 text-[12.5px] font-medium text-slate-900 shadow-sm",
    "ring-0 ring-transparent",
    "outline-none",
    "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
    "data-[state=open]:ring-0 data-[state=open]:ring-offset-0",
    "focus:border-slate-300 focus-visible:border-slate-300",
    // placeholder: samakan seperti "Jenis Pinjaman"
    "[&_[data-slot=select-value][data-placeholder]]:text-slate-500",
    "[&_[data-slot=select-value][data-placeholder]]:opacity-100",
  );

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={triggerCls}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        className={cn(
          "rounded-[12px] border-slate-200 p-1 shadow-xl",
          "[&_[data-state=checked]]:bg-slate-100/80",
          "[&_[data-state=checked]]:text-slate-900",
          "[&_[data-radix-collection-item]]:rounded-[10px]",
          contentClassName,
        )}
      >
        {options.map((o) => (
          <SelectItem
            key={o}
            value={o}
            className={cn(
              "rounded-[10px] py-2 text-[15px] font-medium text-slate-800",
              "focus:bg-violet-600 focus:text-white",
              "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
              "data-[state=checked]:focus:bg-slate-100/80 data-[state=checked]:focus:text-slate-900",
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
  const [cabang, setCabang] = React.useState<string[]>([]);
  const [namaKode, setNamaKode] = React.useState("");

  const [bulan, setBulan] = React.useState<string>("");
  const [tahun, setTahun] = React.useState("");
  const [tipe, setTipe] = React.useState<string>("");
  const [statusAnggota, setStatusAnggota] = React.useState<string>("");

  const [warnOpen, setWarnOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  function doSearch() {
    if (jenisPinjaman.length === 0) {
      setWarnOpen(true);
      return;
    }

    // fallback agar state tetap valid untuk prototype
    if (!bulan) setBulan("April");
    if (!tahun) setTahun("2026");
    if (!tipe) setTipe("-- Semua --");
    if (!statusAnggota) setStatusAnggota("Semua");

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <LoanTypeRequiredDialog open={warnOpen} onOpenChange={setWarnOpen} />

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
          <div className="w-full max-w-[920px]">
            <div className={cn("grid", UI.gapY)}>
              <FieldRow label="Jenis Pinjaman">
                <LoanTypeMultiSelect
                  options={[...loanOptions]}
                  value={jenisPinjaman}
                  onChange={setJenisPinjaman}
                  placeholder="Pilih pinjaman"
                />
              </FieldRow>

              <FieldRow label="Cabang">
                <MultiSelectChips
                  options={branchOptions.filter((b) => b !== "Pilih cabang")}
                  value={cabang}
                  onChange={setCabang}
                  placeholder="Pilih cabang"
                  disabledOptions={[]}
                />
              </FieldRow>

              <FieldRow label="Nama/Kode Pinjaman">
                <Input
                  value={namaKode}
                  onChange={(e) => setNamaKode(e.target.value)}
                  placeholder="Masukkan nama/kode pinjaman.."
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="Bulan">
                <StyledSelect
                  value={bulan}
                  onValueChange={setBulan}
                  options={[...months]}
                  placeholder="Pilih Bulan"
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
              </FieldRow>

              <FieldRow label="Tahun">
                <Input
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  className={cn(UI.input, "placeholder:text-slate-500")}
                  placeholder="Pilih Tahun"
                  inputMode="numeric"
                />
              </FieldRow>

              <FieldRow label="Tipe Kolektibilitas">
                <StyledSelect
                  value={tipe}
                  onValueChange={setTipe}
                  options={[
                    "-- Semua --",
                    "Lancar",
                    "Dalam Perhatian Khusus",
                    "Kurang Lancar",
                    "Diragukan",
                    "Macet",
                  ]}
                  placeholder="Pilih Tipe Kolektibilitas"
                />
              </FieldRow>

              <FieldRow label="Status Anggota">
                <StyledSelect
                  value={statusAnggota}
                  onValueChange={setStatusAnggota}
                  options={["Semua", "Anggota", "Calon"]}
                  placeholder="Pilih Jenis Anggota"
                />
              </FieldRow>

              <div className="flex justify-end pt-0">
                <button
                  type="button"
                  onClick={doSearch}
                  className={cn(
                    UI.btn,
                    "inline-flex items-center gap-2",
                    "bg-green-600 shadow-sm ring-1 ring-green-600/20 transition hover:bg-green-700",
                  )}
                >
                  <Search className="h-4 w-4" />
                  Cari
                </button>
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