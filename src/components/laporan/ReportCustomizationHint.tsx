"use client";

import * as React from "react";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReportCustomizationHint({
  className,
  onChooseReport,
}: {
  className?: string;
  onChooseReport?: () => void;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-none border border-[#14a6d8] bg-transparent px-5 py-4",
        "text-[#0299c6]",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0ea5c6] text-white">
          <Info className="h-3.5 w-3.5" />
        </span>

        <div className="min-w-0">
          <div className="text-[15px] font-extrabold leading-snug text-[#0895bd]">
            Fitur Penyesuaian Laporan
          </div>

          <div className="mt-1 max-w-[720px] text-[14px] font-normal leading-relaxed text-[#0097c2]">
            Anda dapat melakukan kustomisasi tampilan laporan (pengaturan kolom
            dan urutan data) pada laporan ini dengan menggunakan fitur
            penyesuaian laporan. Silahkan klik menu Penyesuaian Laporan untuk
            dapat melakukan pengaturan.
          </div>

          <button
            type="button"
            onClick={onChooseReport}
            className={cn(
              "mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-[5px] px-5",
              "bg-violet-600 text-[14px] font-semibold text-white",
              "ring-1 ring-violet-600/20 transition hover:bg-violet-700",
              "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
          >
            Pilih Laporan
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}