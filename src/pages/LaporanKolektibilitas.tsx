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
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import LoanTypeRequiredDialog from "@/components/laporan/LoanTypeRequiredDialog";
import KolektibilitasReportTable, {
  type KolektibilitasRow,
} from "@/components/laporan/KolektibilitasReportTable";

type KolektibilitasType =
  | "-- Semua --"
  | "Lancar"
  | "Dalam Perhatian Khusus"
  | "Kurang Lancar"
  | "Diragukan"
  | "Macet";

type StatusAnggota = "Pilih Jenis Anggota" | "Anggota" | "Calon";

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
        "inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[12.5px] font-semibold text-slate-700",
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
      <div className="text-[13px] font-semibold text-slate-900">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function SelectLike({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[12.5px] font-medium text-slate-900",
          "shadow-sm outline-none transition",
          "focus:border-[hsl(var(--app-accent))] focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20",
        )}
      >
        {placeholder ? <option value={placeholder}>{placeholder}</option> : null}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 opacity-80" />
    </div>
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
    tunggakan31_60: 200000,
    tunggakan61_90: 200000,
    tunggakan90p: 200000,
  },
];

export default function LaporanKolektibilitas() {
  const [jenisPinjaman, setJenisPinjaman] =
    React.useState<string>("Pilih pinjaman");
  const [namaKode, setNamaKode] = React.useState("");
  const [bulan, setBulan] = React.useState<(typeof months)[number]>("April");
  const [tahun, setTahun] = React.useState("2026");
  const [tipe, setTipe] = React.useState<KolektibilitasType>("-- Semua --");
  const [statusAnggota, setStatusAnggota] =
    React.useState<StatusAnggota>("Pilih Jenis Anggota");

  const [warnOpen, setWarnOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  function doSearch() {
    if (jenisPinjaman === "Pilih pinjaman") {
      setWarnOpen(true);
      return;
    }

    setSubmitted(true);
    toast.success("Laporan ditampilkan (prototype)", {
      description: `Jenis: ${jenisPinjaman} • ${bulan} ${tahun}`,
    });
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

        {/* Divider dihapus */}

        {/* FORM: tanpa border & divider */}
        <Card className="mt-5 rounded-3xl border-0 bg-transparent p-0 shadow-none">
          <div className="w-full max-w-[920px]">
            <div className="grid gap-3">
              <FieldRow label="Jenis Pinjaman">
                <div className="relative">
                  <select
                    value={jenisPinjaman}
                    onChange={(e) => setJenisPinjaman(e.target.value)}
                    className={cn(
                      "h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[12.5px] font-medium text-slate-900",
                      "shadow-sm outline-none transition",
                      "focus:border-[hsl(var(--app-accent))] focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20",
                    )}
                  >
                    <option value="Pilih pinjaman">Pilih pinjaman</option>
                    {loanOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 opacity-80" />
                </div>
              </FieldRow>

              <FieldRow label="Nama/Kode Pinjaman">
                <Input
                  value={namaKode}
                  onChange={(e) => setNamaKode(e.target.value)}
                  placeholder="Masukkan nama/kode pinjaman.."
                  className="h-9 rounded-md border-slate-200 bg-white text-[12.5px] shadow-sm"
                />
              </FieldRow>

              <FieldRow label="Bulan">
                <SelectLike
                  value={bulan}
                  onChange={(v) => setBulan(v as (typeof months)[number])}
                  options={[...months]}
                />
              </FieldRow>

              <FieldRow label="Tahun">
                <Input
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  className="h-9 rounded-md border-slate-200 bg-white text-[12.5px] shadow-sm"
                  inputMode="numeric"
                />
              </FieldRow>

              <FieldRow label="Tipe Kolektibilitas">
                <SelectLike
                  value={tipe}
                  onChange={(v) => setTipe(v as KolektibilitasType)}
                  options={[
                    "-- Semua --",
                    "Lancar",
                    "Dalam Perhatian Khusus",
                    "Kurang Lancar",
                    "Diragukan",
                    "Macet",
                  ]}
                />
              </FieldRow>

              <FieldRow label="Status Anggota">
                <SelectLike
                  value={statusAnggota}
                  onChange={(v) => setStatusAnggota(v as StatusAnggota)}
                  options={["Pilih Jenis Anggota", "Anggota", "Calon"]}
                />
              </FieldRow>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={doSearch}
                  className={cn(
                    "inline-flex h-9 items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-white",
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