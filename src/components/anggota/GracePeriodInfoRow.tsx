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
  const outerPad = noBorder ? "px-2 py-1.5" : "px-3 py-2";
  const boxPad = noBorder ? "px-3.5 py-2.5" : "px-4 py-3";
  const iconSize = noBorder ? "h-6 w-6" : "h-7 w-7";
  const iconWrap = noBorder ? "h-9 w-9" : "h-7 w-7";

  return (
    <tr className={cn(noBorder ? "" : "border-t border-slate-200")}>
      <td colSpan={colSpan} className={cn("py-2", noBorder ? "px-0" : "px-1")}>
        <div className={cn("bg-white", outerPad)}>
          <div
            className={cn(
              "rounded-2xl text-xs text-slate-800",
              boxPad,
              noBorder ? "bg-blue-50" : "border border-blue-200 bg-blue-50",
            )}
          >
            <div className={cn("flex items-start", noBorder ? "gap-3" : "gap-3")}>
              <span
                className={cn(
                  "mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full",
                  noBorder
                    ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                    : "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
                  iconWrap,
                )}
              >
                <Info className={cn(noBorder ? "h-4 w-4" : iconSize)} />
              </span>

              <div className="min-w-0">
                <div className={cn("font-semibold", noBorder ? "leading-tight" : "")}>
                  Periode Grace Period
                </div>
                <div className={cn("text-slate-700", noBorder ? "mt-0.5 leading-snug" : "mt-0.5")}>
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