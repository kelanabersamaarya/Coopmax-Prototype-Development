"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ScheduleRow = {
  dueDate: string;
  total: number;
  principal: number;
  interest: number;
  remainingPrincipal: number;
  remainingInterest: number;
  penalty: number;
};

function formatIdr(value: number) {
  return Math.max(0, Math.round(value))
    .toLocaleString("id-ID")
    .replace(/,/g, ".");
}

export default function LoanExtensionPaymentSchedule({
  rows,
}: {
  rows: ScheduleRow[];
}) {
  const pageSize = 12;
  const [page, setPage] = React.useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const start = (page - 1) * pageSize;
  const pagedRows = rows.slice(start, start + pageSize);

  return (
    <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Jadwal Pembayaran Baru
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[750px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700">
              <th className="w-[110px] px-3 py-3">
                Jatuh
                <br />
                Tempo
              </th>
              <th className="w-[150px] px-3 py-3 text-right">
                Total Tagihan
                <br />
                Belum Dibayar
              </th>
              <th className="w-[145px] px-3 py-3 text-right">
                Tagihan
                <br />
                Pokok
              </th>
              <th className="w-[145px] px-3 py-3 text-right">
                Tagihan
                <br />
                Bunga
              </th>
              <th className="w-[145px] px-3 py-3 text-right">
                Tagihan
                <br />
                Denda
              </th>
            </tr>
          </thead>

          <tbody>
            {pagedRows.map((row, index) => (
              <tr
                key={row.dueDate}
                className={cn(
                  "border-b border-slate-100 text-[13px] text-black last:border-b-0",
                  index % 2 ? "bg-slate-50/60" : "bg-white",
                )}
              >
                <td className="px-3 py-3 font-semibold tabular-nums whitespace-nowrap">
                  {row.dueDate}
                </td>
                <td className="px-3 py-3 text-right tabular-nums">
                  {formatIdr(row.total)}
                </td>
                <td className="px-3 py-3 text-right tabular-nums">
                  {formatIdr(row.principal)}
                </td>
                <td className="px-3 py-3 text-right font-semibold tabular-nums text-[#2563EB]">
                  {formatIdr(row.interest)}
                </td>
                <td className="px-3 py-3 text-right tabular-nums">
                  {formatIdr(row.penalty)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-slate-600">
          Menampilkan {rows.length ? start + 1 : 0} sampai{" "}
          {Math.min(rows.length, start + pageSize)} dari {rows.length} jadwal
          pembayaran
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="inline-flex h-9 items-center gap-1 rounded-[5px] bg-slate-100 px-3 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-[5px] bg-[#2563EB] px-3 text-[12px] font-extrabold text-white">
            {page}
          </span>

          <button
            type="button"
            disabled={page >= pageCount}
            onClick={() =>
              setPage((current) => Math.min(pageCount, current + 1))
            }
            className="inline-flex h-9 items-center gap-1 rounded-[5px] bg-slate-100 px-3 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}