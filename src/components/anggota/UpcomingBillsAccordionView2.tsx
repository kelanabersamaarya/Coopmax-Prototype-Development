"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import { Info } from "lucide-react";
import AnggotaTablePagination from "@/components/anggota/AnggotaTablePagination";

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
  const [pageSize] = React.useState<number>(6);
  const [page, setPage] = React.useState<number>(1);

  React.useEffect(() => {
    if (open) setPage(1);
  }, [open]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, pageSize, rows]);

  if (!open) return null;

  const thClass = "px-1 py-2.5";
  const tdClass = "px-1 py-2.5";
  const edgePadLeft = "pl-3";
  const edgePadRight = "pr-3";

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);

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

      {/* Scroll horizontal hanya di area tabel */}
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
            {paged.map((r, idx) => (
              <tr key={`${r.jatuhTempo}-${idx}`} className="border-t border-slate-200 text-sm">
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

      <div className="flex flex-col gap-2 border-t border-slate-200 px-3 py-3 md:flex-row md:items-center md:justify-between">
        <div className="text-xs text-slate-600">
          Menampilkan {showingStart} sampai {showingEnd} dari {rows.length} entri
        </div>
        <AnggotaTablePagination page={page} pageCount={pageCount} onPage={setPage} />
      </div>
    </div>
  );
}