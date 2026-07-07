"use client";

import * as React from "react";
import { Check, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-800">
      {children}
    </div>
  );
}

function TealField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-semibold leading-tight text-white/85">
        {label}
      </div>
      <div className="mt-1 text-[13px] font-extrabold leading-snug tracking-tight text-white">
        {value}
      </div>
    </div>
  );
}

function InfoRow({
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
          : "[grid-template-columns:minmax(0,210px)_14px_minmax(0,1fr)]",
      )}
    >
      <div className="text-[13px] font-normal text-[#7987A1]">{label}</div>
      <div className="text-center text-[13px] font-normal text-[#7987A1]">:</div>
      <div className="text-[13px] font-normal text-slate-900">{value}</div>
    </div>
  );
}

function StatusPill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "active" | "danger" | "verified";
}) {
  const cls =
    tone === "danger"
      ? "bg-rose-600 text-white"
      : tone === "verified"
        ? "bg-[#3BB001] text-white"
        : "bg-lime-500 text-white";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-2.5 py-1 text-[11px] font-extrabold leading-none",
        cls,
      )}
    >
      {children}
    </span>
  );
}

function SyncStatusPill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[5px] bg-[#3BB001] px-2.5 py-1 text-[11px] font-extrabold leading-none text-white">
      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
      Berhasil Tersinkron
    </span>
  );
}

export default function PaymentLinkTransactionDetailCard({
  transactionNo,
}: {
  transactionNo: string;
}) {
  return (
    <Card className="mt-5 rounded-3xl border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
      <SectionTitle>INFORMASI REKENING</SectionTitle>

      <div className="mt-4 overflow-hidden rounded-[8px] bg-[#17a2b8] p-5 text-white ring-1 ring-white/10 md:p-6">
        <div className="text-[12px] font-extrabold tracking-wide text-white/90">
          SIMPANAN MULTIGUNA
        </div>

        <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          <TealField
            label="Rek. Pinjaman"
            value={
              <span className="inline-flex items-center gap-2">
                SMG260001
                <ExternalLink className="h-4 w-4 text-white/85" />
              </span>
            }
          />
          <TealField label="Rek. Tabungan" value="-" />
          <TealField label="Sektor Pinjaman" value="-" />
          <TealField label="Kolektor" value="Dinda Sudiati" />

          <TealField label="Tanggal Dibuat" value="03 Jul 2026" />
          <TealField label="Tanggal Jatuh Tempo" value="03 Jul 2028" />
          <TealField label="Periode Waktu" value="24 Bulan" />
          <TealField label="Metode Bunga" value="Bunga Flat" />

          <TealField label="Bunga Per Tahun (%)" value="0.99 %" />
          <TealField label="Jumlah Pinjaman" value="5.000.000,00" />
          <TealField label="Sisa Pinjaman" value="4.019.416,00" />
          <TealField
            label="Status"
            value={<StatusPill tone="active">Aktif / Sudah Dicairkan</StatusPill>}
          />

          <TealField label="Angsuran Pokok" value="208.333,33" />
          <TealField label="Angsuran Bunga" value="4.125,00" />
          <TealField label="Hutang Pokok" value="0" />
          <TealField label="Hutang Bunga" value="0,00" />

          <TealField
            label="Status Loan Platform"
            value={<SyncStatusPill />}
          />
        </div>
      </div>

      <div className="my-6 h-px w-full bg-slate-200/70" />

      <SectionTitle>INFORMASI NASABAH</SectionTitle>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div>
          <InfoRow
            label="ID"
            value={
              <span className="inline-flex items-center gap-2 text-blue-600">
                A24000004 <ExternalLink className="h-4 w-4" />
              </span>
            }
          />
          <InfoRow label="NIP" value="-" />
          <InfoRow label="Nama" value="ardina" />
          <InfoRow label="Tanggal Lahir" value="2000-01-01" />
          <InfoRow label="Kategori Nasabah" value="Anggota" />
          <InfoRow label="Jenis Kelamin" value="Perempuan" />
          <InfoRow label="Alamat" value="tabanan" />
          <InfoRow label="Hubungan dengan Koperasi" value="Anggota" />
          <InfoRow label="Tanggal Daftar" value="2026-07-01" />
          <InfoRow label="Tag" value="-" />
          <InfoRow label="Unit" value="-" />
          <InfoRow
            label="Status Verifikasi KTP"
            value={<StatusPill tone="danger">BELUM TERVERIFIKASI</StatusPill>}
          />
          <InfoRow label="Status" value={<StatusPill tone="verified">Aktif</StatusPill>} />
        </div>

        <div>
          <InfoRow label="Agama" value="Islam" right />
          <InfoRow label="Profesi" value="SWASTA" right />
          <InfoRow label="Jenis Identitas" value="KTP" right />
          <InfoRow label="No. Identitas" value="12341122334445553232" right />
          <InfoRow label="No. Telp/Handphone" value="8199998889900" right />
          <InfoRow label="Alamat Email" value="-" right />
        </div>
      </div>

      <div className="my-6 h-px w-full bg-slate-200/70" />

      <SectionTitle>INFORMASI TRANSAKSI</SectionTitle>

      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div>
          <InfoRow label="No Transaksi" value={transactionNo} />
          <InfoRow label="Rek. Tabungan" value="-" />
          <InfoRow label="Kolektor" value="Gina Farida M.M." />
          <InfoRow label="Tanggal Transaksi" value="07-07-2026" />
          <InfoRow label="Jenis Transaksi" value="Bayar Angsuran" />
          <InfoRow label="Denda" value="0,00" />
          <InfoRow label="Nominal" value="500.000,00" />
          <InfoRow label="Pinjaman Awal" value="4.509.708,00" />
          <InfoRow label="Pinjaman Akhir" value="4.019.416,00" />
          <InfoRow label="Tanggal Dibuat" value="07-07-2026 15:16:17" />
          <InfoRow label="Waktu Transaksi" value="15:16:16" />
        </div>

        <div>
          <InfoRow label="Angsuran Pokok" value="490.292,00" right />
          <InfoRow label="Angsuran Bunga" value="9.708,00" right />
          <InfoRow label="Angsuran Hutang Pokok" value="0,00" right />
          <InfoRow label="Angsuran Hutang Bunga" value="0,00" right />
          <InfoRow label="Deskripsi" value="-" right />
          <InfoRow label="Catatan" value="-" right />
          <InfoRow label="Dibuat Oleh" value="Arya" right />
        </div>
      </div>
    </Card>
  );
}