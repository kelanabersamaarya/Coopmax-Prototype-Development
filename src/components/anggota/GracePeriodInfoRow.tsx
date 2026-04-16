"use client";

import * as React from "react";
import { Info } from "lucide-react";

export default function GracePeriodInfoRow({ colSpan }: { colSpan: number }) {
  return (
    <tr className="border-t border-slate-200">
      <td colSpan={colSpan} className="px-1 py-2.5">
        {/* Outer padding supaya box info tidak menempel ke border biru wrapper */}
        <div className="px-3 pt-3">
          <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-slate-800">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Info className="h-4 w-4" />
              </span>
              <div>
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