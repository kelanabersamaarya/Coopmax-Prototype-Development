"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function InfoCol({
  label,
  value,
  align = "left",
  big = false,
}: {
  label: string;
  value: React.ReactNode;
  align?: "left" | "right";
  big?: boolean;
}) {
  return (
    <div className={cn("min-w-0", align === "right" ? "text-right" : "text-left")}>
      <div className={cn("grid", big ? "grid-rows-[18px_30px]" : "grid-rows-[18px_30px]")}>
        <div className="self-start text-[12px] font-semibold leading-none text-white/90">
          {label}
        </div>

        <div
          className={cn(
            "self-start leading-snug text-white",
            big ? "text-[14px] font-extrabold tracking-tight" : "text-[14px] font-bold",
          )}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function DividerLine() {
  return <div className="h-px w-full bg-white/20" />;
}

function NasabahRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-start">
      <div className="text-[12px] font-semibold text-white/85">{label}</div>
      <div className="text-[13px] font-bold text-white">{value}</div>
    </div>
  );
}

export default function LoanAccountInfoPreview({
  accountNo,
  className,
}: {
  accountNo: string;
  className?: string;
}) {
  // Informasi rekening selalu tampil, informasi nasabah hidden by default
  const [open, setOpen] = React.useState(false);

  // Prototype data (silakan nanti dihubungkan ke data dinamis)
  const nasabah = React.useMemo(
    () => ({
      id: "N2600006",
      nama: "Bapak Bagus",
      alamat: "Sidakarya",
    }),
    [],
  );

  return (
    <div className={cn("overflow-hidden rounded-[8px]", className)}>
      <div className="bg-[#1aa0b5] px-5 py-5 text-white ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="min-w-0 text-base font-extrabold tracking-tight">
              INFORMASI REKENING
            </div>

            <span className="inline-flex shrink-0 items-center rounded-full bg-rose-600 px-3 py-1 text-[12px] font-semibold text-white ring-1 ring-rose-600/20">
              Belum Terproses
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2",
              "rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white",
              "ring-1 ring-white/15 transition hover:bg-white/15",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20",
            )}
            aria-expanded={open}
            aria-label="Tampilkan lebih banyak"
            title="Tampilkan lebih banyak"
          >
            <span className="whitespace-nowrap">Tampilkan Lebih Banyak</span>
            <ChevronDown className="h-4 w-4 opacity-90" />
          </button>
        </div>

        {/* INFORMASI REKENING (SELALU TAMPIL) */}
        <div className="mt-4">
          {/* Desktop: 4 kolom per baris. Susun agar "Sisa Pokok Pinjaman" tepat di bawah "Produk Pinjaman". */}
          <div className="grid gap-x-10 gap-y-4 md:grid-cols-4">
            {/* Row 1 */}
            <InfoCol label="No. Rekening Pinjaman" value={accountNo} big />
            <InfoCol label="Produk Pinjaman" value="Pinjaman Billing" />
            <InfoCol
              label="Skema Tagihan"
              value={
                <span className="block">
                  Tagihan Sesuai Jadwal
                  <br />
                  Angsuran
                </span>
              }
            />
            <InfoCol label="Satuan Grace Period" value="Bulan" />

            {/* Row 2 */}
            <InfoCol label="Durasi Grace Period" value="3" />
            <InfoCol label="Sisa Pokok Pinjaman" value="10.000.000,00" />
            <div className="hidden md:block" />
            <div className="hidden md:block" />
          </div>
        </div>

        {/* INFORMASI NASABAH (HIDDEN DEFAULT, MUNCUL SAAT OPEN) */}
        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200",
            open ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <DividerLine />

            <div className="mt-4">
              <div className="text-[13px] font-extrabold tracking-tight text-white">
                INFORMASI NASABAH
              </div>

              <div className="mt-3 grid gap-3">
                <NasabahRow label="ID Nasabah" value={nasabah.id} />
                <NasabahRow label="Nama" value={nasabah.nama} />
                <NasabahRow label="Alamat" value={nasabah.alamat} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}