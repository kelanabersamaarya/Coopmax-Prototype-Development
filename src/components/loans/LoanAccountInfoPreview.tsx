"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import LoanBillingAndSummarySection from "@/components/loans/LoanBillingAndSummarySection";

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

export default function LoanAccountInfoPreview({
  accountNo,
  className,
}: {
  accountNo: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const nasabah = React.useMemo(
    () => ({
      id: "N2600006",
      nama: "Bapak Bagus",
      alamat: "Sidakarya",
    }),
    [],
  );

  return (
    <div className={cn("bg-transparent", className)}>
      {/* Panel atas (tetap) */}
      <div className="overflow-hidden rounded-t-[8px] bg-[#1aa0b5] px-5 py-5 text-white ring-1 ring-white/10">
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
            aria-label={open ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
            title={open ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
          >
            <span className="whitespace-nowrap">
              {open ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
            </span>
            <ChevronDown
              className={cn("h-4 w-4 opacity-90 transition", open ? "rotate-180" : "")}
            />
          </button>
        </div>

        {/* DETAIL REKENING (SELALU TAMPIL) */}
        <div className="mt-7">
          <div className="grid gap-x-10 gap-y-4 md:grid-cols-4">
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
              <div className="text-[16px] font-extrabold tracking-tight text-white">
                INFORMASI NASABAH
              </div>

              <div className="mt-4 grid gap-x-10 gap-y-4 md:grid-cols-4">
                <InfoCol label="ID Nasabah" value={nasabah.id} big />
                <InfoCol label="Nama" value={nasabah.nama} />
                <InfoCol label="Alamat" value={nasabah.alamat} />
                <div className="hidden md:block" />

                <div className="hidden md:block" />
                <div className="hidden md:block" />
                <div className="hidden md:block" />
                <div className="hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian bawah: rounded bawah ditampilkan tanpa mengubah warna panel atas */}
      <div className="overflow-hidden rounded-b-[8px] bg-[hsl(var(--app-bg))] px-2 py-4 ring-1 ring-slate-200/70 sm:px-3">
        <LoanBillingAndSummarySection className="mt-0" />
      </div>
    </div>
  );
}