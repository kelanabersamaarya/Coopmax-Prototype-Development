"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function InfoBlock({
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
      {/* Pakai grid 2 baris dengan tinggi tetap agar semua label/value sejajar */}
      <div
        className={cn(
          "grid",
          big ? "grid-rows-[18px_28px]" : "grid-rows-[18px_24px]",
        )}
      >
        <div className="self-end text-[12px] font-semibold leading-none text-white/85">
          {label}
        </div>

        <div
          className={cn(
            "self-end font-bold leading-none",
            big ? "text-[18px] font-extrabold tracking-tight" : "text-[14px]",
          )}
        >
          {value}
        </div>
      </div>
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
        </div>

        <div className="mt-4 grid gap-x-8 gap-y-7 md:grid-cols-4">
          <InfoBlock label="No. Rekening Pinjaman" value={accountNo} big />
          <InfoBlock label="Produk Pinjaman" value="Pinjaman Billing" />
          <InfoBlock label="Skema Tagihan" value="Tagihan Sesuai Jadwal Angsuran" />
          <InfoBlock label="Satuan Grace Period" value="Bulan" />

          <InfoBlock label="Durasi Grace Period" value="3" />
          <div className="hidden md:block" />
          <div className="hidden md:block" />
          <InfoBlock
            label="Sisa Pokok Pinjaman"
            value="10.000.000,00"
            align="right"
          />
        </div>
      </div>
    </div>
  );
}