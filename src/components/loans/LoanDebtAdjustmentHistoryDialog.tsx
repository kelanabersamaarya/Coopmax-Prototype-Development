"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  getLoanInterestAdjustmentHistory,
  LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
  type LoanInterestAdjustmentHistoryEntry,
} from "@/lib/loanInterestAdjustmentHistoryStore";

type HistoryRow = {
  id: string;
  installmentNo: number;
  adjustmentType: string;
  adjustmentAmount: string;
  reason: string;
  interestBefore: string;
  interestAfter: string;
  totalBefore: string;
  totalAfter: string;
  adjustedAt: string;
};

const seedRows: Record<string, HistoryRow[]> = {
  SMG260004: [
    {
      id: "seed-adjustment",
      installmentNo: 3,
      adjustmentType: "Pengurangan Bunga",
      adjustmentAmount: "25.000,00",
      reason: "Penyesuaian bunga sesuai kebijakan koperasi.",
      interestBefore: "83.333,00",
      interestAfter: "58.333,00",
      totalBefore: "916.667,00",
      totalAfter: "891.667,00",
      adjustedAt: "07-07-2026 10:35:20",
    },
  ],
};

function formatRate(value: number) {
  return `${value.toFixed(2).replace(".", ",")}%`;
}

function mapStoredRow(
  entry: LoanInterestAdjustmentHistoryEntry,
): HistoryRow {
  return {
    id: entry.id,
    installmentNo: 0,
    adjustmentType: "Perubahan Suku Bunga",
    adjustmentAmount: formatRate(entry.newRate),
    reason: entry.reason,
    interestBefore: formatRate(entry.previousRate),
    interestAfter: formatRate(entry.newRate),
    totalBefore: "-",
    totalAfter: "-",
    adjustedAt: entry.changedAt.replace(",", ""),
  };
}

export default function LoanDebtAdjustmentHistoryDialog({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [storedRows, setStoredRows] = React.useState<HistoryRow[]>([]);

  React.useEffect(() => {
    if (!open) return;

    const loadRows = () => {
      const entries = getLoanInterestAdjustmentHistory(accountNo);
      setStoredRows(entries.map(mapStoredRow));
    };

    loadRows();
    window.addEventListener(LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT, loadRows);
    window.addEventListener("storage", loadRows);

    return () => {
      window.removeEventListener(
        LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
        loadRows,
      );
      window.removeEventListener("storage", loadRows);
    };
  }, [accountNo, open]);

  const rows = [...storedRows, ...(seedRows[accountNo] ?? [])];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1rem)] max-w-[1180px] overflow-hidden rounded-xl border-slate-200 bg-white p-0">
        <div className="flex max-h-[80vh] flex-col">
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Riwayat Perubahan Nominal Bunga Pinjaman
            </h2>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 overflow-auto px-4 py-4">
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-[1450px] border-collapse text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-800">
                  <tr>
                    <th className="w-20 px-3 py-3">Angsuran Ke</th>
                    <th className="w-40 px-3 py-3">Jenis Penyesuaian</th>
                    <th className="w-36 px-3 py-3">Nominal Penyesuaian</th>
                    <th className="w-56 px-3 py-3">Alasan Penyesuaian</th>
                    <th className="w-44 px-3 py-3">Bunga Sebelum</th>
                    <th className="w-44 px-3 py-3">Total Sebelum</th>
                    <th className="w-44 px-3 py-3">Bunga Sesudah</th>
                    <th className="w-44 px-3 py-3">Total Sesudah</th>
                    <th className="w-36 px-3 py-3">Diubah Oleh</th>
                    <th className="w-48 px-3 py-3">Tanggal Perubahan</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-4 py-10 text-center text-slate-500"
                      >
                        Belum ada riwayat perubahan nominal bunga.
                      </td>
                    </tr>
                  ) : (
                    rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t border-slate-200 text-slate-900"
                      >
                        <td className="px-3 py-3 text-center">
                          {row.installmentNo || "-"}
                        </td>
                        <td className="px-3 py-3">{row.adjustmentType}</td>
                        <td className="px-3 py-3 text-right tabular-nums">
                          {row.adjustmentAmount}
                        </td>
                        <td className="whitespace-normal px-3 py-3">
                          {row.reason}
                        </td>
                        <td className="px-3 py-3 text-right tabular-nums">
                          {row.interestBefore}
                        </td>
                        <td className="px-3 py-3 text-right tabular-nums">
                          {row.totalBefore}
                        </td>
                        <td className="px-3 py-3 text-right font-semibold text-blue-600 tabular-nums">
                          {row.interestAfter}
                        </td>
                        <td className="px-3 py-3 text-right font-semibold text-blue-600 tabular-nums">
                          {row.totalAfter}
                        </td>
                        <td className="px-3 py-3">{row.adjustedAt ? "Arya Dharma" : "-"}</td>
                        <td className="whitespace-nowrap px-3 py-3 tabular-nums">
                          {row.adjustedAt}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-2 text-[11px] text-slate-500">
              Geser tabel ke samping untuk melihat kolom lainnya.
            </div>
          </div>

          <div className="flex shrink-0 justify-end border-t border-slate-200 px-5 py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-9 rounded-md bg-slate-600 px-5 text-xs font-semibold text-white hover:bg-slate-700"
            >
              Tutup
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}