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
      <td colSpan={colSpan} className="px-1 py-2.5">
        {/* Spacer diperkecil agar jarak banner ke tepi tabel lebih rapat */}
        <div className={cn("bg-white", noBorder ? "px-3 py-2" : "px-3 py-2")}>
          <div
            className={cn(
              "rounded-2xl px-4 py-3 text-xs text-slate-800",
              noBorder ? "bg-blue-50" : "border border-blue-200 bg-blue-50",
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
                )}
              >
                <Info className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="font-semibold">Periode Grace Period</div>
                <div className="mt-0.5 text-slate-700">
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