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
        <div className="self-start text-[12px] font-semibold leading-none text-slate-600">
          {label}
        </div>

        <div
          className={cn(
            "self-start leading-snug text-slate-900",
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
  return <div className="h-px w-full bg-slate-200" />;
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
    <div
      className={cn(
        "overflow-hidden rounded-[8px] bg-white ring-1 ring-slate-200/70",
        className,
      )}
    >
      {/* Header (sebelumnya biru) -> sekarang netral */}
      <div className="bg-white px-5 py-5 text-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="min-w-0 text-base font-extrabold tracking-tight text-slate-900">
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
              "rounded-full bg-slate-50 px-3 py-1.5 text-[12px] font-semibold text-slate-700",
              "ring-1 ring-slate-200 transition hover:bg-slate-100",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/10",
            )}
            aria-expanded={open}
            aria-label={open ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
            title={open ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
          >
            <span className="whitespace-nowrap">
              {open ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
            </span>
            <ChevronDown
              className={cn("h-4 w-4 text-slate-500 transition", open ? "rotate-180" : "")}
            />
          </button>
        </div>

        {/* DETAIL REKENING (SELALU TAMPIL) */}
        <div className="mt-5">
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
            <div className="mt-4">
              <DividerLine />

              <div className="mt-4">
                <div className="text-[14px] font-extrabold tracking-tight text-slate-900">
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
      </div>

      {/* Area bawah (tabel) */}
      <div className="bg-[hsl(var(--app-bg))] px-2 py-4 sm:px-3">
        <LoanBillingAndSummarySection className="mt-0" />
      </div>
    </div>
  );
}