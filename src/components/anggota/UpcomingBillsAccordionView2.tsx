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

  const thClass = "px-3 py-2.5";
  const tdClass = "px-3 py-2.5";

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);

  return (
    <div className="mt-3">
      <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          <Info className="h-4 w-4" />
        </span>
        <div className="leading-relaxed">
          Berikut ini merupakan perkiraan tagihan untuk periode mendatang. Nominal
          tagihan dapat berubah jika ada transaksi pembayaran atau terjadi
          perubahan pada pinjaman.
        </div>
      </div>

      {/* Satu blok tabel tanpa horizontal scroll */}
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full table-fixed border-collapse text-[13px]">
          <thead className="bg-white">
            <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-700">
              <th className={cn("w-[86px] sm:w-[110px]", thClass)}>
                <span className="block truncate">Jatuh Tempo</span>
              </th>
              <th className={cn("w-[120px] sm:w-[160px]", thClass)}>
                <span className="block truncate">Total Tagihan</span>
              </th>
              <th className={cn("w-[92px] sm:w-[120px]", thClass)}>
                <span className="block truncate">Pokok</span>
              </th>
              <th className={cn("w-[92px] sm:w-[120px]", thClass)}>
                <span className="block truncate">Bunga</span>
              </th>
              <th className={cn("hidden lg:table-cell", thClass)}>
                <span className="block truncate">Sisa Pokok</span>
              </th>
              <th className={cn("hidden lg:table-cell", thClass)}>
                <span className="block truncate">Sisa Bunga</span>
              </th>
            </tr>
            <tr>
              <th colSpan={6} className="h-px bg-slate-200 p-0" />
            </tr>
          </thead>

          <tbody className="bg-white">
            {/* Baris info tetap ada, tapi pada layar kecil kolom efektif cuma 4 (karena 2 kolom disembunyikan) */}
            <GracePeriodInfoRow colSpan={6} />

            {paged.map((r, idx) => (
              <tr key={`${r.jatuhTempo}-${idx}`} className="border-t border-slate-100 text-sm">
                <td className={cn(tdClass, "font-semibold text-slate-900")}>
                  <span className="block whitespace-nowrap">{r.jatuhTempo}</span>
                </td>
                <td className={cn(tdClass, "text-right tabular-nums text-slate-800")}>
                  <span className="block whitespace-nowrap">{r.totalBelumDibayar}</span>
                </td>
                <td className={cn(tdClass, "text-right tabular-nums text-slate-800")}>
                  <span className="block whitespace-nowrap">{r.tagihanPokok}</span>
                </td>
                <td className={cn(tdClass, "text-right tabular-nums text-slate-800")}>
                  <span className="block whitespace-nowrap">{r.tagihanBunga}</span>
                </td>
                <td
                  className={cn(
                    tdClass,
                    "hidden text-right tabular-nums text-slate-800 lg:table-cell",
                  )}
                >
                  <span className="block whitespace-nowrap">{r.sisaPokok}</span>
                </td>
                <td
                  className={cn(
                    tdClass,
                    "hidden text-right tabular-nums text-slate-800 lg:table-cell",
                  )}
                >
                  <span className="block whitespace-nowrap">{r.sisaBunga}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col gap-2 border-t border-slate-200 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-slate-600">
            Menampilkan {showingStart} sampai {showingEnd} dari {rows.length} entri
          </div>
          <AnggotaTablePagination page={page} pageCount={pageCount} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}