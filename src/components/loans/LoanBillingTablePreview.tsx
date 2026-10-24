"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import BillingStatusBadge from "@/components/anggota/BillingStatusBadge";
import type { BillingRow } from "@/components/anggota/BillingTableView2";
import LoanInterestAdjustmentDialog, {
  type InterestAdjustment,
  type InterestAdjustmentBillingRow,
} from "@/components/loans/LoanInterestAdjustmentDialog";

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

type AdjustmentMap = Record<string, InterestAdjustment>;
const wizardAdjustmentsByAccount: Record<string, AdjustmentMap> = {};

export type SavedBillingInterestAdjustment = {
  dueDate: string;
  installmentNo: number;
  adjustment: InterestAdjustment;
};

function parseIdr(value: string) {
  const normalized = (value ?? "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return Math.max(0, Math.round(value))
    .toLocaleString("id-ID")
    .replace(/,/g, ".");
}

function NumericCell({ children }: { children: React.ReactNode }) {
  return (
    <span className="block w-full text-right font-normal tabular-nums whitespace-nowrap">
      {children}
    </span>
  );
}

function getInitialAdjustments(accountNo: string): AdjustmentMap {
  return wizardAdjustmentsByAccount[accountNo] ?? {};
}

export default function LoanBillingTablePreview({
  className,
  accountNo = "SMG260004",
  onInterestAdjustmentSaved,
}: {
  className?: string;
  accountNo?: string;
  onInterestAdjustmentSaved?: (value: SavedBillingInterestAdjustment) => void;
}) {
  const rows = React.useMemo(() => seedRows, []);
  const pageSize = 6;
  const [page, setPage] = React.useState(1);
  const [adjustmentDueDate, setAdjustmentDueDate] = React.useState<string | null>(
    null,
  );
  const [interestAdjustments, setInterestAdjustments] =
    React.useState<AdjustmentMap>(() => getInitialAdjustments(accountNo));

  React.useEffect(() => {
    setInterestAdjustments(getInitialAdjustments(accountNo));
  }, [accountNo]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const pagedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, rows]);

  function getAdjustedInterest(row: BillingRow) {
    const adjustment = interestAdjustments[row.jatuhTempo];
    const baseInterest = adjustment?.previousInterest
      ? parseIdr(adjustment.previousInterest)
      : parseIdr(row.tagihanBunga);

    if (!adjustment) return baseInterest;
    if (adjustment.type === "Pembebasan Seluruh Bunga") return 0;

    const adjustmentAmount = parseIdr(adjustment.amount);

    return adjustment.type === "Penambahan Bunga"
      ? baseInterest + adjustmentAmount
      : Math.max(0, baseInterest - adjustmentAmount);
  }

  const selectedRow = React.useMemo(
    () => rows.find((row) => row.jatuhTempo === adjustmentDueDate) ?? null,
    [adjustmentDueDate, rows],
  );

  const currentInterest = selectedRow
    ? formatIdr(getAdjustedInterest(selectedRow))
    : "0,00";

  const currentTotal = selectedRow
    ? formatIdr(
        parseIdr(selectedRow.totalBelumDibayar) -
          parseIdr(selectedRow.tagihanBunga) +
          getAdjustedInterest(selectedRow),
      )
    : "0,00";

  const currentBillingRow = React.useMemo<
    InterestAdjustmentBillingRow | undefined
  >(() => {
    if (!selectedRow) return undefined;

    const selectedRowIndex = rows.findIndex(
      (row) => row.jatuhTempo === selectedRow.jatuhTempo,
    );
    const hasPenalty = selectedRowIndex >= 0 && selectedRowIndex < 3;

    return {
      totalBelumDibayar: currentTotal,
      tagihanPokok: selectedRow.tagihanPokok,
      tagihanBunga: currentInterest,
      sisaPokok: selectedRow.sisaPokok,
      sisaBunga: selectedRow.sisaBunga,
      tagihanDenda: hasPenalty ? penaltyAmount : "0,00",
    };
  }, [currentInterest, currentTotal, rows, selectedRow]);

  function saveInterestAdjustment(adjustment: InterestAdjustment) {
    if (!adjustmentDueDate) return;

    const installmentNo =
      rows.findIndex((row) => row.jatuhTempo === adjustmentDueDate) + 1;

    const nextAdjustments = {
      ...interestAdjustments,
      [adjustmentDueDate]: adjustment,
    };

    wizardAdjustmentsByAccount[accountNo] = nextAdjustments;
    setInterestAdjustments(nextAdjustments);

    if (installmentNo > 0) {
      onInterestAdjustmentSaved?.({
        dueDate: adjustmentDueDate,
        installmentNo,
        adjustment,
      });
    }
  }

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);
  const previousDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  function getRowTotals(rowList: BillingRow[]) {
    return rowList.reduce(
      (totals, row, index) => {
        const globalIndex = rows.findIndex(
          (currentRow) => currentRow.jatuhTempo === row.jatuhTempo,
        );
        const adjustedInterest = getAdjustedInterest(row);

        totals.totalBelumDibayar +=
          parseIdr(row.totalBelumDibayar) -
          parseIdr(row.tagihanBunga) +
          adjustedInterest;
        totals.tagihanPokok += inGracePeriodForIndex(globalIndex)
          ? 0
          : parseIdr(row.tagihanPokok);
        totals.tagihanBunga += parseIdr(row.tagihanBunga);
        totals.sisaPokok += inGracePeriodForIndex(globalIndex)
          ? 0
          : parseIdr(row.sisaPokok);
        totals.sisaBunga += parseIdr(row.sisaBunga);
        totals.adjustedInterest += adjustedInterest;
        totals.tagihanDenda += globalIndex < 3 ? parseIdr(penaltyAmount) : 0;
        return totals;
      },
      {
        totalBelumDibayar: 0,
        tagihanPokok: 0,
        tagihanBunga: 0,
        sisaPokok: 0,
        sisaBunga: 0,
        adjustedInterest: 0,
        tagihanDenda: 0,
      },
    );
  }

  function inGracePeriodForIndex(index: number) {
    return index < 2;
  }

  const pageTotals = getRowTotals(pagedRows);
  const overallTotals = getRowTotals(rows);

  return (
    <section
      className={cn(
        "loan-debt-billing-preview overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      <LoanInterestAdjustmentDialog
        open={adjustmentDueDate !== null}
        onOpenChange={(open) => {
          if (!open) setAdjustmentDueDate(null);
        }}
        dueDate={adjustmentDueDate ?? ""}
        currentInterest={currentInterest}
        currentTotal={currentTotal}
        billingRow={currentBillingRow}
        onSave={saveInterestAdjustment}
      />

      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Informasi Tagihan dan Denda
      </div>

      <div className="safe-x-scroll p-4">
        <table key="billing-table-without-current-interest" className="loan-debt-billing-table w-full min-w-[870px] table-fixed border-collapse">
          <colgroup>
            <col style={{ width: "85px", minWidth: "85px", maxWidth: "85px" }} />
            <col style={{ width: "100px", minWidth: "100px", maxWidth: "100px" }} />
            <col style={{ width: "105px", minWidth: "105px", maxWidth: "105px" }} />
            <col style={{ width: "115px", minWidth: "115px", maxWidth: "115px" }} />
            <col style={{ width: "110px", minWidth: "110px", maxWidth: "110px" }} />
            <col style={{ width: "120px", minWidth: "120px", maxWidth: "120px" }} />
            <col style={{ width: "120px", minWidth: "120px", maxWidth: "120px" }} />
            <col style={{ width: "100px", minWidth: "100px", maxWidth: "100px" }} />
            <col style={{ width: "145px", minWidth: "145px", maxWidth: "145px" }} />
          </colgroup>
          <thead>
            <tr className="border-b border-slate-200 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
              <th className="px-2 py-2 text-left">Jatuh Tempo</th>
              <th className="px-2 py-2 text-left">
                Total Tagihan
                <br />
                Belum Dibayar
              </th>
              <th className="px-2 py-2 text-left">
                Tagihan
                <br />
                Pokok
              </th>
              <th className="px-2 py-2 text-left">
                Tagihan
                <br />
                Bunga
              </th>
              <th className="px-2 py-2 text-left">
                Sisa Tagihan
                <br />
                Pokok
              </th>
              <th className="px-2 py-2 text-left leading-tight">
                Sisa Tagihan
                <br />
                Bunga Sebelum
                <br />
                Penyesuaian
              </th>
              <th className="px-2 py-2 text-left leading-tight">
                Sisa Tagihan
                <br />
                Bunga Sesudah
                <br />
                Penyesuaian
              </th>
              <th className="px-2 py-2 text-left">
                Tagihan
                <br />
                Denda
              </th>
              <th className="px-2 py-2 text-left">
                Status
                <br />
                Tagihan
              </th>
            </tr>
          </thead>

          <tbody>
            {pagedRows.map((row, index) => {
              const globalIndex = (page - 1) * pageSize + index;
              const hasPenalty = globalIndex < 3;
              const inGracePeriod = globalIndex < 2;
              const adjustedInterest = getAdjustedInterest(row);
              const adjustedTotal =
                parseIdr(row.totalBelumDibayar) -
                parseIdr(row.tagihanBunga) +
                adjustedInterest;

              return (
                <tr
                  key={`${row.jatuhTempo}-${globalIndex}`}
                  className="border-t border-slate-200 bg-white text-[13px] font-normal text-slate-900"
                >
                  <td className="px-2 py-2 text-left font-normal tabular-nums whitespace-nowrap">
                    {row.jatuhTempo}
                  </td>
                  <td className="px-2 py-2 text-right">
                    <NumericCell>{formatIdr(adjustedTotal)}</NumericCell>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <NumericCell>
                      {inGracePeriod ? "0,00" : row.tagihanPokok}
                    </NumericCell>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <NumericCell>{row.tagihanBunga}</NumericCell>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <NumericCell>
                      {inGracePeriod ? "0,00" : row.sisaPokok}
                    </NumericCell>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <div className="flex w-full items-center justify-end gap-1">
                      <NumericCell>{row.sisaBunga}</NumericCell>
                      <button
                        type="button"
                        onClick={() => setAdjustmentDueDate(row.jatuhTempo)}
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white transition hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/25"
                        aria-label={`Penyesuaian bunga tagihan ${row.jatuhTempo}`}
                        title="Penyesuaian bunga"
                      >
                        <Pencil className="h-3 w-3" strokeWidth={2.8} />
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <NumericCell>{formatIdr(adjustedInterest)}</NumericCell>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <NumericCell>{hasPenalty ? penaltyAmount : "0,00"}</NumericCell>
                  </td>
                  <td className="px-2 py-2">
                    <BillingStatusBadge status="Belum Dibayar" />
                  </td>
                </tr>
              );
            })}
            {[
              { label: "Total Tagihan per Halaman", totals: pageTotals },
              { label: "Total Tagihan Keseluruhan", totals: overallTotals },
            ].map(({ label, totals }) => (
              <tr key={label} className="border-t border-slate-200 bg-white text-[12px] font-bold text-slate-800">
                <td className="px-2 py-2 text-left leading-tight">
                  {label === "Total Tagihan per Halaman" ? (
                    <>
                      Total Tagihan
                      <br />
                      per Halaman
                    </>
                  ) : (
                    <>
                      Total Tagihan
                      <br />
                      Keseluruhan
                    </>
                  )}
                </td>
                <td className="px-2 py-2 text-right">{formatIdr(totals.totalBelumDibayar)}</td>
                <td className="px-2 py-2 text-right">{formatIdr(totals.tagihanPokok)}</td>
                <td className="px-2 py-2 text-right">{formatIdr(totals.tagihanBunga)}</td>
                <td className="px-2 py-2 text-right">{formatIdr(totals.sisaPokok)}</td>
                <td className="px-2 py-2 text-right">{formatIdr(totals.sisaBunga)}</td>
                <td className="px-2 py-2 text-right">{formatIdr(totals.adjustedInterest)}</td>
                <td className="px-2 py-2 text-right">{formatIdr(totals.tagihanDenda)}</td>
                <td className="px-2 py-2" />
              </tr>
            ))}
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

          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-[5px] bg-[#2563EB] px-3 text-[12px] font-extrabold text-white">
            {page}
          </span>

          <button
            type="button"
            disabled={nextDisabled}
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
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

      <span className="sr-only">{accountNo}</span>
    </section>
  );
}