import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  RefreshCw,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
  X,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

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

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
      <div className="text-sm font-semibold text-slate-900">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

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
          "h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900",
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
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function LoanTypeChips({
  value,
  onClear,
}: {
  value: string | null;
  onClear: () => void;
}) {
  return (
    <div className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
      <div className="min-w-0">
        {value ? (
          <span className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--app-accent))] px-3 py-1.5 text-sm font-semibold text-white">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-white/15 text-[12px]">
              ×
            </span>
            <span className="truncate">{value}</span>
          </span>
        ) : (
          <div className="text-sm font-medium text-slate-500">
            Pilih jenis pinjaman…
          </div>
        )}
      </div>

      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
          aria-label="Hapus pilihan"
          title="Hapus"
        >
          <X className="h-5 w-5" />
        </button>
      ) : (
        <div className="h-9 w-9" />
      )}
    </div>
  );
}

export default function LaporanKolektibilitas() {
  const [jenisPinjaman, setJenisPinjaman] = React.useState<string | null>(
    "Pinjaman Bulanan 9",
  );
  const [namaKode, setNamaKode] = React.useState("");
  const [bulan, setBulan] = React.useState<(typeof months)[number]>("Februari");
  const [tahun, setTahun] = React.useState("2025");
  const [tipe, setTipe] = React.useState<KolektibilitasType>("-- Semua --");
  const [statusAnggota, setStatusAnggota] =
    React.useState<StatusAnggota>("Pilih Jenis Anggota");

  function doSearch() {
    toast.success("Filter diterapkan (prototype)", {
      description: [
        jenisPinjaman ? `Jenis: ${jenisPinjaman}` : "Jenis: (kosong)",
        namaKode ? `Query: ${namaKode}` : "Query: (kosong)",
        `Periode: ${bulan} ${tahun}`,
        `Tipe: ${tipe}`,
        `Status: ${statusAnggota}`,
      ].join(" • "),
    });
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
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

        <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="grid gap-4">
            <FieldRow label="Jenis Pinjaman">
              <LoanTypeChips
                value={jenisPinjaman}
                onClear={() => setJenisPinjaman(null)}
              />
            </FieldRow>

            <FieldRow label="Nama/Kode Pinjaman">
              <Input
                value={namaKode}
                onChange={(e) => setNamaKode(e.target.value)}
                placeholder="Masukkan nama/kode pinjaman..."
                className="h-11 rounded-xl border-slate-200 bg-white"
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
                className="h-11 rounded-xl border-slate-200 bg-white"
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

            <div className="flex justify-end pt-2">
              <Button
                onClick={doSearch}
                className={cn(
                  "h-11 rounded-xl bg-emerald-600 px-6 text-white hover:bg-emerald-700",
                )}
              >
                <Search className="mr-2 h-4.5 w-4.5" />
                Cari
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}