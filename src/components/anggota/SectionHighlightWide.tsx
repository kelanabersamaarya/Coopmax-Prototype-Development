"use client";

import * as React from "react";
import { CalendarRange, CircleAlert, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SectionHighlightWide({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const showLoanChangeInfo = title === "Tagihan dan Pembayaran Angsuran";

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full text-center text-[14px] font-semibold tracking-tight text-slate-900">
        {title}
      </div>
      <div className="mt-2 h-px w-full bg-slate-300/70" />

      {showLoanChangeInfo ? (
        <div className="mt-4 rounded-[12px] border border-blue-200 bg-blue-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
              <CircleAlert className="h-4 w-4" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-extrabold text-slate-900">
                Informasi Perubahan Pinjaman
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
                Terdapat perubahan pada suku bunga dan tenor pinjaman. Rincian
                tagihan di bawah telah disesuaikan dengan perubahan tersebut.
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-[8px] bg-white px-3 py-2 ring-1 ring-blue-100">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <TrendingDown className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-500">
                      Suku Bunga
                    </div>
                    <div className="text-[12px] font-extrabold text-slate-900">
                      12,00% → 10,00% per tahun
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-[8px] bg-white px-3 py-2 ring-1 ring-blue-100">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <CalendarRange className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-500">
                      Tenor Pinjaman
                    </div>
                    <div className="text-[12px] font-extrabold text-slate-900">
                      12 → 18 bulan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}