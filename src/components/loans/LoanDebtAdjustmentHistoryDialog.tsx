"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  getLoanInterestAdjustmentHistory,
  LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
  type LoanInterestAdjustmentHistoryEntry,
} from "@/lib/loanInterestAdjustmentHistoryStore";

type HistoryRow = {
  id: string;
  installmentNo: number;
  interestBefore: string;
  adjustmentType: string;
  adjustmentAmount: string;
  reason: string;
  interestAfter: string;
  totalBefore: string;
  totalAfter: string;
  changedBy: string;
  adjustedAt: string;
};

const initialHistoryByAccount: Record<string, HistoryRow[]> = {
  SMG260004: [
    {
      id: "initial-adjustment",
      installmentNo: 3,
      interestBefore: "83.333,00",
      adjustmentType: "Pengurangan Bunga",
      adjustmentAmount: "25.000,00",
      reason: "Penyesuaian bunga sesuai kebijakan koperasi.",
      interestAfter: "58.333,00",
      totalBefore: "916.667,00",
      totalAfter: "891.667,00",
      changedBy: "Arya Dharma",
      adjustedAt: "07-07-2026 10:35:20",
    },
  ],
};

function formatRate(rate: number) {
  return `${rate.toFixed(2).replace(".", ",")}%`;
}

function toHistoryRow(entry: LoanInterestHistoryEntry): HistoryRow {
  return {
    id: entry.id,
    installmentNo: 0,
    interestBefore: formatRate(entry.previousRate),
    adjustmentType: "Perubahan Suku Bunga",
    adjustmentAmount: formatRate(entry.newRate),
    reason: entry.reason,
    interestAfter: formatRate(entry.newRate),
    totalBefore: "-",
    totalAfter: "-",
    changedBy: "Arya Dharma",
    adjustedAt: entry.changedAt.replace(",", ""),
  };
}

function Cell({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <td
      className={cn(
        "border-b border-slate-200 px-3 py-3 text-[12px] font-normal text-black",
        align === "right"
          ? "whitespace-nowrap text-right tabular-nums"
          : align === "center"
            ? "text-center"
            : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

const columnWidths = [
  "82px",
  "150px",
  "145px",
  "190px",
  "165px",
  "165px",
  "155px",
  "155px",
  "125px",
  "180px",
];

export default function LoanDebtAdjustmentHistoryDialog({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [savedRows, setSavedRows] = React.useState<
    LoanInterestAdjustmentHistoryEntry[]
  >([]);

  React.useEffect(() => {
    function syncHistory() {
      setSavedRows(getLoanInterestAdjustmentHistory(accountNo));
    }

    if (open) syncHistory();

    window.addEventListener(LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT, syncHistory);
    window.addEventListener("storage", syncHistory);

    return () => {
      window.removeEventListener(
        LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
        syncHistory,
      );
      window.removeEventListener("storage", syncHistory);
    };
  }, [accountNo, open]);

  const rows = React.useMemo(
    () => [
      ...savedRows.map(toHistoryRow),
      ...(initialHistoryByAccount[accountNo] ?? []),
    ],
    [accountNo, savedRows],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-loan-debt-history-dialog="true"
        className={cn(
          "w-[calc(100vw-1rem)] max-w-[1180px]",
          "overflow-hidden rounded-[14px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="min-w-0 text-[18px] font-extrabold tracking-tight text-slate-900">
            Riwayat Perubahan Nominal Bunga Pinjaman
          </h2>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="ml-3 grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <main className="max-h-[65vh] min-w-0 overflow-y-auto px-4 py-5 sm:px-6">
          <div
            className="w-full overflow-x-auto rounded-[8px] border border-slate-200"
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
            }}
          >
            <table
              className="border-collapse text-left"
              style={{
                width: "1512px",
                minWidth: "1512px",
                tableLayout: "fixed",
              }}
            >
              <colgroup>
                {columnWidths.map((width, index) => (
                  <col key={index} style={{ width }} />
                ))}
              </colgroup>

              <thead className="bg-[#F9FAFF]">
                <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
                  <th className="px-3 py-3 align-top">Angsuran Ke</th>
                  <th className="px-3 py-3 align-top">Jenis Penyesuaian</th>
                  <th className="px-3 py-3 align-top">
                    Nominal Penyesuaian
                  </th>
                  <th className="px-3 py-3 align-top">
                    Alasan Penyesuaian
                  </th>
                  <th className="px-3 py-3 align-top">
                    Tagihan Bunga
                    <br />
                    Sebelum Penyesuaian
                  </th>
                  <th className="px-3 py-3 align-top">
                    Total Tagihan
                    <br />
                    Sebelum Penyesuaian
                  </th>
                  <th className="px-3 py-3 align-top">
                    Tagihan Bunga
                    <br />
                    Sesudah Penyesuaian
                  </th>
                  <th className="px-3 py-3 align-top">
                    Total Tagihan
                    <br />
                    Sesudah Penyesuaian
                  </th>
                  <th className="px-3 py-3 align-top">Diubah Oleh</th>
                  <th className="px-3 py-3 align-top">
                    Tanggal & Waktu Penyesuaian
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-10 text-center text-[13px] text-slate-600"
                    >
                      Belum ada riwayat perubahan nominal bunga.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-slate-100 text-[12px] text-black last:border-b-0"
                    >
                      <Cell align="center">{row.installmentNo || "-"}</Cell>
                      <Cell>{row.adjustmentType}</Cell>
                      <Cell align="right">{row.adjustmentAmount}</Cell>
                      <Cell className="whitespace-normal break-words">
                        {row.reason}
                      </Cell>
                      <Cell align="right">{row.interestBefore}</Cell>
                      <Cell align="right">{row.totalBefore}</Cell>
                      <Cell
                        align="right"
                        className="font-semibold text-[#2563EB]"
                      >
                        {row.interestAfter}
                      </Cell>
                      <Cell
                        align="right"
                        className="font-semibold text-[#2563EB]"
                      >
                        {row.totalAfter}
                      </Cell>
                      <Cell>{row.changedBy}</Cell>
                      <Cell className="whitespace-nowrap">
                        {row.adjustedAt}
                      </Cell>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-2 text-[11px] text-slate-500 sm:hidden">
            Geser tabel ke kiri atau kanan untuk melihat kolom lainnya.
          </div>
        </main>

        <footer className="flex justify-end border-t border-slate-200 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-10 min-w-[96px] rounded-[5px] bg-[#77839A] px-5 text-[12px] font-semibold text-white transition hover:bg-[#6b768c]"
          >
            Tutup
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}