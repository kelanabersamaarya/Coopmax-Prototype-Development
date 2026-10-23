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
  const outerPad = noBorder ? "px-1.5 py-1" : "px-1.5 py-1.5";
  const boxPad = noBorder ? "px-3 py-2" : "px-2.5 py-2";

  const iconSize = noBorder ? "h-6 w-6" : "h-6 w-6";
  const iconWrap = noBorder ? "h-9 w-9" : "h-9 w-9";

  return (
    <tr className={cn(noBorder ? "" : "border-t border-[#CDD4E0]")}>
      <td colSpan={colSpan} className={cn("py-1.5", noBorder ? "px-0" : "px-0")}>
        <div className={cn("bg-white", outerPad)}>
          <div
            className={cn(
              "rounded-2xl text-xs",
              boxPad,
              noBorder ? "bg-blue-50" : "border border-[#CDD4E0] bg-blue-50",
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full",
                  "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
                  iconWrap,
                )}
              >
                <Info className={cn("h-4 w-4", iconSize)} />
              </span>

              <div className="min-w-0">
                <div className="font-semibold leading-tight text-black">
                  Periode Grace Period
                </div>
                <div className="mt-0.5 leading-snug text-black">
                  Berikut ini merupakan periode tagihan pinjaman yang termasuk ke
                  dalam grace period selama 2 bulan. Selama periode ini nasabah
                  hanya membayar bunga.
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}