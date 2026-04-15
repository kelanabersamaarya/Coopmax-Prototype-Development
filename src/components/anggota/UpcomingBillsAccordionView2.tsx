"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import { Info } from "lucide-react";

export type BillRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

export default function UpcomingBillsAccordionView2({
  open,
  rows,
}: {
  open: boolean;
  rows: BillRow[];
}) {
  if (!open) return null;

  const thClass = "px-1 py-2.5";
  const tdClass = "px-1 py-2.5";
  const edgePadLeft = "pl-3";
  const edgePadRight = "pr-3";

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="p-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Info className="h-4 w-4" />
            </span>
            <div className="leading-relaxed">
              Berikut ini merupakan perkiraan tagihan untuk periode mendatang.
              Nominal tagihan dapat berubah jika ada transaksi pembayaran atau
              terjadi perubahan pada pinjaman.
            </div>
          </div>
        </div>
      </div>

      {/* Penting: scroll horizontal hanya di area tabel, tidak mendorong layout/page */}
      <div className="safe-x-scroll">
        <table className="w-full min-w-[540px] border-collapse text-[13px]">
          <thead className="bg-white">
            <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-700">
              <th className={cn("w-[104px]", thClass, edgePadLeft)}>
                Jatuh Tempo
              </th>
              <th className={cn("w-[146px]", thClass)}>
                Total Tagihan Belum Dibayar
              </th>
              <th className={cn("w-[98px]", thClass)}>Tagihan Pokok</th>
              <th className={cn("w-[98px]", thClass)}>Tagihan Bunga</th>
              <th className={cn("w-[108px]", thClass)}>Sisa Tagihan Pokok</th>
              <th className={cn("w-[108px]", thClass, edgePadRight)}>
                Sisa Tagihan Bunga
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            <GracePeriodInfoRow colSpan={6} />
            {rows.map((r, idx) => (
              <tr key={idx} className="border-t border-slate-200 text-sm">
                <td
                  className={cn(
                    tdClass,
                    edgePadLeft,
                    "font-medium text-slate-900",
                  )}
                >
                  {r.jatuhTempo}
                </td>
                <td
                  className={cn(tdClass, "text-right tabular-nums text-slate-800")}
                >
                  {r.totalBelumDibayar}
                </td>
                <td
                  className={cn(tdClass, "text-right tabular-nums text-slate-800")}
                >
                  {r.tagihanPokok}
                </td>
                <td
                  className={cn(tdClass, "text-right tabular-nums text-slate-800")}
                >
                  {r.tagihanBunga}
                </td>
                <td
                  className={cn(tdClass, "text-right tabular-nums text-slate-800")}
                >
                  {r.sisaPokok}
                </td>
                <td
                  className={cn(
                    tdClass,
                    edgePadRight,
                    "text-right tabular-nums text-slate-800",
                  )}
                >
                  {r.sisaBunga}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}