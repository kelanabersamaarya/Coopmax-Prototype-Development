"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
      {children}
    </div>
  );
}

function InfoHeaderField({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="text-[11px] font-semibold text-white/85">{label}</div>
      <div className="mt-1 text-[13px] font-extrabold tracking-tight text-white">
        <span className="block break-words leading-snug">{value}</span>
      </div>
    </div>
  );
}

function KVRow({
  label,
  value,
  right = false,
}: {
  label: string;
  value: React.ReactNode;
  right?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid items-baseline gap-x-3 gap-y-1 py-1.5",
        right
          ? "[grid-template-columns:minmax(0,170px)_14px_minmax(0,1fr)]"
          : "[grid-template-columns:minmax(0,220px)_14px_minmax(0,1fr)]",
      )}
    >
      <div className="text-[12.5px] text-slate-600">{label}</div>
      <div className="text-center text-[12.5px] font-semibold text-slate-300">
        :
      </div>
      <div className="text-[12.5px] font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function StatusChip({
  children,
  tone = "ok",
}: {
  children: React.ReactNode;
  tone?: "ok" | "danger" | "muted";
}) {
  const cls =
    tone === "danger"
      ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
      : tone === "muted"
        ? "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
        : "bg-emerald-600 text-white ring-1 ring-emerald-600/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-2 py-1 text-[11px] font-extrabold leading-none",
        cls,
      )}
    >
      {children}
    </span>
  );
}

export default function LoanTransactionDetailCard({
  transactionNo,
  className,
}: {
  transactionNo: string;
  className?: string;
}) {
  // Prototype static data mengikuti screenshot
  const rekPinjaman = "12260006";
  const kolektor = "Dinda Sudiati";

  return (
    <Card
      className={cn(
        "rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6",
        className,
      )}
    >
      <SectionTitle>INFORMASI REKENING</SectionTitle>

      <div className="mt-4 overflow-hidden rounded-2xl bg-[#17a2b8] p-5 text-white ring-1 ring-white/10 md:p-6">
        <div className="text-[12px] font-extrabold tracking-wide text-white/90">
          PINJAMAN BULANAN
        </div>

        <div
          className={cn(
            "mt-5 grid gap-x-10 gap-y-5",
            "sm:[grid-template-columns:repeat(2,minmax(0,1fr))]",
            "lg:[grid-template-columns:repeat(4,minmax(0,1fr))]",
          )}
        >
          <InfoHeaderField
            label="Rek. Pinjaman"
            value={
              <span className="inline-flex items-center gap-2">
                {rekPinjaman}
                <ExternalLink className="h-4 w-4 text-white/85" />
              </span>
            }
          />
          <InfoHeaderField label="Rek. Tabungan" value="-" />
          <InfoHeaderField label="Sektor Pinjaman" value="-" />
          <InfoHeaderField label="Kolektor" value={kolektor} />

          <InfoHeaderField label="Tanggal Dibuat" value="30 Apr 2026" />
          <InfoHeaderField label="Tanggal Jatuh Tempo" value="30 Apr 2027" />
          <InfoHeaderField label="Periode Waktu" value="12 Bulan" />
          <InfoHeaderField label="Metode Bunga" value="Bunga Flat" />

          <InfoHeaderField label="Bunga Per Tahun (%)" value="24.00" />
          <InfoHeaderField label="Jumlah Pinjaman" value="2.000.000,00" />
          <InfoHeaderField label="Sisa Pinjaman" value="1.040.000,00" />
          <InfoHeaderField label="Angsuran Pokok" value="166.700,00" />

          <InfoHeaderField label="Angsuran Bunga" value="40.000,00" />
          <InfoHeaderField label="Hutang Pokok" value="0" />
          <InfoHeaderField label="Hutang Bunga" value="0,00" />
          <InfoHeaderField
            label="Status"
            value={
              <span className="inline-flex rounded-[3px] bg-lime-400 px-2 py-1 text-[11px] font-extrabold leading-none text-slate-900">
                Aktif / Sudah Dicairkan
              </span>
            }
          />
        </div>
      </div>

      <Separator className="my-6 bg-slate-200/70" />

      <SectionTitle>INFORMASI NASABAH</SectionTitle>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div>
          <KVRow
            label="ID"
            value={
              <span className="inline-flex items-center gap-2 text-blue-600">
                N2400029 <ExternalLink className="h-4 w-4" />
              </span>
            }
          />
          <KVRow label="NIP" value="2215754055" />
          <KVRow label="Nama" value="Pangeran Sirait" />
          <KVRow label="Tanggal Lahir" value="2024-02-28" />
          <KVRow label="Kategori Nasabah" value="Anggota" />
          <KVRow label="Jenis Kelamin" value="Laki - Laki" />
          <KVRow label="Alamat" value="Gg. Basudewo No. 230, Gorontalo 27811, DIY" />
          <KVRow label="Hubungan dengan Koperasi" value="Calon Anggota" />
          <KVRow label="Tanggal Daftar" value="2024-04-29" />
          <KVRow label="Tag" value="-" />
          <KVRow label="Unit" value="-" />
          <KVRow
            label="Status Verifikasi KTP"
            value={<StatusChip tone="danger">BELUM TERVERIFIKASI</StatusChip>}
          />
          <KVRow label="Status" value={<StatusChip tone="ok">Aktif</StatusChip>} />
        </div>

        <div>
          <KVRow label="Agama" value="Hindu" right />
          <KVRow label="Profesi" value="Asisten Presiden" right />
          <KVRow label="Jenis Identitas" value="KTP" right />
          <KVRow label="No. Identitas" value="1110191003079551" right />
          <KVRow label="No. Telp/Handphone" value="0995 6291 594" right />
          <KVRow label="Alamat Email" value="tugusramal134@gmail.com" right />
        </div>
      </div>

      <Separator className="my-6 bg-slate-200/70" />

      <SectionTitle>INFORMASI TRANSAKSI</SectionTitle>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div>
          <KVRow label="No Transaksi" value={transactionNo} />
          <KVRow label="Rek. Tabungan" value="-" />
          <KVRow label="Kolektor" value={kolektor} />
          <KVRow label="Tanggal Transaksi" value="05-05-2026" />
          <KVRow label="Jenis Transaksi" value="Bayar Angsuran" />
          <KVRow label="Denda" value="0,00" />
          <KVRow label="Nominal" value="500.000,00" />
          <KVRow label="Pinjaman Awal" value="1.540.000,00" />
          <KVRow label="Pinjaman Akhir" value="1.040.000,00" />
          <KVRow label="Tanggal Dibuat" value="05-05-2026 09:40:49" />
          <KVRow label="Waktu Transaksi" value="09:40:48" />
          <KVRow label="Periode Transaksi" value="Mei 2026" />
        </div>

        <div>
          <KVRow label="Angsuran Pokok" value="500.000,00" right />
          <KVRow label="Angsuran Bunga" value="0,00" right />
          <KVRow label="Angsuran Hutang Pokok" value="0,00" right />
          <KVRow label="Angsuran Hutang Bunga" value="0,00" right />
          <KVRow label="Deskripsi" value="-" right />
          <KVRow label="Catatan" value="-" right />
          <KVRow label="Dibuat Oleh" value="Arya Dharma" right />
        </div>
      </div>
    </Card>
  );
}