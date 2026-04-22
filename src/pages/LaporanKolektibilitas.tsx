import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
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
        "inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-slate-700",
        "ring-1 ring-slate-200 shadow-sm transition hover:bg-slate-50",
      )}
    >
      <Icon className="h-4.5 w-4.5 text-slate-500" />
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
    <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-start">
      <div className="pt-2 text-sm font-semibold text-slate-900">{label}</div>
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
          "h-11 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900",
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

  function doSearch() {
    if (jenisPinjaman === "Pilih pinjaman") {
      setWarnOpen(true);
      return;
    }

    toast.success("Filter diterapkan (prototype)", {
      description: [
        `Jenis: ${jenisPinjaman}`,
        namaKode ? `Query: ${namaKode}` : "Query: (kosong)",
        `Periode: ${bulan} ${tahun}`,
        `Tipe: ${tipe}`,
        `Status: ${statusAnggota}`,
      ].join(" • "),
    });
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <LoanTypeRequiredDialog open={warnOpen} onOpenChange={setWarnOpen} />

      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Laporan Kolektibilitas
          </h1>

          <div className="flex flex-wrap items-center justify-start gap-3 md:justify-end">
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

        <Separator className="my-6 bg-slate-200/70" />

        {/* FORM (tanpa Card / background putih) */}
        <div className="grid gap-4">
          <FieldRow label="Jenis Pinjaman">
            <div className="relative">
              <select
                value={jenisPinjaman}
                onChange={(e) => setJenisPinjaman(e.target.value)}
                className={cn(
                  "h-11 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900",
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
              className="h-11 rounded-md border-slate-200 bg-white shadow-sm"
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
              className="h-11 rounded-md border-slate-200 bg-white shadow-sm"
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
                "inline-flex h-10 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white",
                "bg-green-600 shadow-sm ring-1 ring-green-600/20 transition hover:bg-green-700",
              )}
            >
              <Search className="h-4.5 w-4.5" />
              Cari
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}