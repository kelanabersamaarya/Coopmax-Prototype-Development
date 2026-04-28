"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GracePeriodInfoRow({
  colSpan,
  noBorder = false,
}: {
  colSpan: number;
  noBorder?: boolean;
}) {
  return (
    <tr className={cn(noBorder ? "" : "border-t border-slate-200")}>
      <td colSpan={colSpan} className={cn("p-0")}>
        <div className={cn("bg-white", noBorder ? "px-2 py-2" : "px-3 py-3")}>
          <div
            className={cn(
              "rounded-2xl",
              noBorder ? "bg-blue-50" : "border border-blue-200 bg-blue-50",
              "px-3 py-3",
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full",
                  "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
                  "h-10 w-10",
                )}
              >
                <Info className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <div className="text-[13px] font-extrabold leading-tight text-slate-900">
                  Periode Grace Period
                </div>
                <div className="mt-1 text-[12.5px] leading-snug text-slate-700">
                  Berikut ini merupakan periode tagihan pinjaman yang termasuk ke
                  dalam grace period. Selama periode grace period nasabah hanya
                  membayar bunga.
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}