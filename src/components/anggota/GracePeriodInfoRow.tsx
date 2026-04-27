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
  // Mode noBorder dipakai di dalam section grace (harus "table-native" dan tidak seperti card besar)
  if (noBorder) {
    return (
      <tr className="border-t border-slate-200 bg-blue-50/40">
        <td colSpan={colSpan} className="px-3 py-2">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
              <Info className="h-4 w-4" />
            </span>

            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold leading-tight text-slate-900">
                Periode Grace Period
              </div>
              <div className="mt-0.5 text-[12px] leading-snug text-slate-700">
                Baris berikut termasuk grace period—nasabah hanya membayar bunga.
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  // Mode biasa (dipakai di luar grace block): boleh lebih besar seperti sebelumnya
  return (
    <tr className="border-t border-slate-200">
      <td colSpan={colSpan} className="px-1 py-2.5">
        <div className="bg-white px-3 py-2">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-slate-800">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
                <Info className="h-5 w-5" />
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