"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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

        {/* Pertahankan maksimal 4 info per baris */}
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-white/85">
              No. Rekening Pinjaman
            </div>
            <div className="mt-1 text-[18px] font-extrabold tracking-tight">
              {accountNo}
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-white/85">
              Produk Pinjaman
            </div>
            <div className="mt-1 text-[14px] font-bold leading-snug">
              Pinjaman Billing
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-white/85">
              Skema Tagihan
            </div>
            <div className="mt-1 text-[14px] font-bold leading-snug">
              Tagihan Sesuai Jadwal Angsuran
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-white/85">
              Satuan Grace Period
            </div>
            <div className="mt-1 text-[14px] font-bold">Bulan</div>
          </div>

          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-white/85">
              Durasi Grace Period
            </div>
            <div className="mt-1 text-[14px] font-bold">3</div>
          </div>

          <div className="min-w-0 md:col-span-3 md:text-right">
            <div className="text-[12px] font-semibold text-white/85">
              Sisa Pokok Pinjaman
            </div>
            <div className="mt-1 text-[14px] font-extrabold">10.000.000,00</div>
          </div>
        </div>
      </div>
    </div>
  );
}