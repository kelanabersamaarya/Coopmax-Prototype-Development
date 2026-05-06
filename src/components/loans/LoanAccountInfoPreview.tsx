"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
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
        <div className="flex items-start justify-between gap-4">
          <div className="text-base font-extrabold tracking-tight">
            PINJAMAN BILLING
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-10 items-center gap-2",
              "rounded-[8px] bg-white px-4",
              "text-[13px] font-semibold text-slate-900",
              "ring-1 ring-black/5 shadow-sm transition hover:bg-slate-50",
            )}
            aria-label="Aksi"
            title="Aksi"
            onClick={() => {}}
          >
            Aksi <ChevronDown className="h-4 w-4 text-slate-600" />
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-5">
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

          <div className="min-w-0 md:text-right">
            <div className="text-[12px] font-semibold text-white/85">
              Sisa Pokok Pinjaman
            </div>
            <div className="mt-1 text-[14px] font-extrabold">
              10.000.000,00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}