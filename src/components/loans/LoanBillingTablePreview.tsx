"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BillingRow } from "@/components/anggota/BillingTableView2";
import LoanInterestChangeWizard from "@/components/loans/LoanInterestChangeWizard";

const seedRows: BillingRow[] = [
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-02-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  ...Array.from({ length: 8 }).map((_, index) => ({
    jatuhTempo: `25-${String(3 + index).padStart(2, "0")}-2026`,
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  })),
];

const penaltyAmount = "75.000";

function NumericCell({ children }: { children: React.ReactNode }) {
  return (
    <span className="block w-full text-right tabular-nums whitespace-nowrap">
      {children}
    </span>
  );
}

export default function LoanBillingTablePreview({
  className,
  accountNo = "SMG260004",
}: {
  className?: string;
  accountNo?: string;
}) {
  const rows = React.useMemo(() => seedRows, []);
  const pageSize = 6;
  const [page, setPage] = React.useState(1);
  const [interestWizardOpen, setInterestWizardOpen] = React.useState(false);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  const pagedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, rows]);

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);
  const previousDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  return (
    <section
      className={cn(
        "loan-debt-billing-preview overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      <LoanInterestChangeWizard
        open={interestWizardOpen}
        onOpenChange={setInterestWizardOpen}
        accountNo={accountNo}
      />

      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Informasi Tagihan dan Denda
      </div>

      <div className="safe-x-scroll p-4">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
              <th className="w-[110px] px-4 py-3">
                Jatuh
                <br />
                Tempo
              </th>
              <th className="w-[128px] px-4 py-3 text-right">
                Total Tagihan
                <br />
                Belum Dibayar
              </th>
              <th className="w-[130px] px-4 py-3 text-right">
                Tagihan
                <br />
                Pokok
              </th>
              <th className="w-[130px] px-4 py-3 text-right">
                Tagihan
                <br />
                Bunga
              </th>
              <th className="w-[140px] px-4 py-3 text-right">
                Sisa Tagihan
                <br />
                Pokok
              </th>
              <th className="w-[140px] px-4 py-3 text-right">
                Sisa Tagihan
                <br />
                Bunga
              </th>
              <th className="w-[130px] px-4 py-3 text-right">
                Tagihan
                <br />
                Denda
              </th>
            </tr>
          </thead>

          <tbody>
            {pagedRows.map((row, index) => {
              const globalIndex = (page - 1) * pageSize + index;
              const hasPenalty = globalIndex < 3;
              const inGracePeriod = globalIndex < 2;

              return (
                <tr
                  key={`${row.jatuhTempo}-${globalIndex}`}
                  className={cn(
                    "border-t border-slate-200 text-[13px] text-slate-900",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                  )}
                >
                  <td className="px-4 py-3 font-semibold tabular-nums whitespace-nowrap">
                    {row.jatuhTempo}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <NumericCell>{row.totalBelumDibayar}</NumericCell>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <NumericCell>
                      {inGracePeriod ? "0,00" : row.tagihanPokok}
                    </NumericCell>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex w-full items-center justify-end gap-2">
                      <NumericCell>{row.tagihanBunga}</NumericCell>

                      <button
                        type="button"
                        onClick={() => setInterestWizardOpen(true)}
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white transition hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/25"
                        aria-label={`Ubah bunga tagihan ${row.jatuhTempo}`}
                        title="Ubah bunga"
                      >
                        <Pencil className="h-3.5 w-3.5" strokeWidth={2.8} />
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <NumericCell>
                      {inGracePeriod ? "0,00" : row.sisaPokok}
                    </NumericCell>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <NumericCell>{row.sisaBunga}</NumericCell>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <NumericCell>{hasPenalty ? penaltyAmount : "0,00"}</NumericCell>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-slate-600">
          Menampilkan {showingStart} sampai {showingEnd} dari {rows.length} entri
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={previousDisabled}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className={cn(
              "inline-flex h-9 items-center gap-1 rounded-[5px] px-3 text-[12px] font-semibold transition",
              "bg-slate-100 text-slate-600 hover:bg-slate-200",
              previousDisabled ? "cursor-not-allowed opacity-60" : "",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-[5px] bg-[#5B3DF5] px-3 text-[12px] font-extrabold text-white">
            {page}
          </span>

          <button
            type="button"
            disabled={nextDisabled}
            onClick={() =>
              setPage((current) => Math.min(pageCount, current + 1))
            }
            className={cn(
              "inline-flex h-9 items-center gap-1 rounded-[5px] px-3 text-[12px] font-semibold transition",
              "bg-slate-100 text-slate-600 hover:bg-slate-200",
              nextDisabled ? "cursor-not-allowed opacity-60" : "",
            )}
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}