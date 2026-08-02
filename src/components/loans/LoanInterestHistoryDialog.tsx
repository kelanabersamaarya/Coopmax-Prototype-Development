"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  getLoanInterestHistory,
  type LoanInterestHistoryEntry,
} from "@/lib/loanInterestHistoryStore";

type HistoryRow = {
  previousRate: string;
  newRate: string;
  effectiveDate: string;
  reason: string;
  changedAt: string;
};

const historyRows: HistoryRow[] = [
  {
    previousRate: "10,00%",
    newRate: "12,00%",
    effectiveDate: "07-04-2026",
    reason: "Penyesuaian bunga sesuai kebijakan produk pinjaman.",
    changedAt: "07-04-2026 10:35:20",
  },
];

function formatRate(rate: number) {
  return `${rate.toFixed(2).replace(".", ",")}%`;
}

function toHistoryRow(entry: LoanInterestHistoryEntry): HistoryRow {
  return {
    previousRate: formatRate(entry.previousRate),
    newRate: formatRate(entry.newRate),
    effectiveDate: entry.effectiveDate,
    reason: entry.reason,
    changedAt: entry.changedAt.replace(",", ""),
  };
}

export default function LoanInterestHistoryDialog({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [storedHistory, setStoredHistory] = React.useState<
    LoanInterestHistoryEntry[]
  >([]);

  React.useEffect(() => {
    if (!open) return;
    setStoredHistory(getLoanInterestHistory(accountNo));
  }, [accountNo, open]);

  const rows = React.useMemo(
    () => [...storedHistory.map(toHistoryRow), ...historyRows],
    [storedHistory],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[860px]",
          "max-w-[860px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
            Riwayat Perubahan Suku Bunga
          </h2>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="grid h-9 w-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <main className="max-h-[60vh] overflow-auto px-6 py-5">
          <div className="overflow-hidden rounded-[12px] border border-slate-200">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[760px] border-collapse">
                <thead className="bg-[#F9FAFF]">
                  <tr className="border-b border-slate-200 text-left text-[12px] font-bold uppercase tracking-wide text-black">
                    <th className="px-4 py-3">Suku Bunga Lama</th>
                    <th className="px-4 py-3">Suku Bunga Baru</th>
                    <th className="px-4 py-3">Tanggal Efektif</th>
                    <th className="px-4 py-3">Alasan Perubahan</th>
                    <th className="px-4 py-3">Tanggal & Waktu Perubahan</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={`${row.changedAt}-${row.newRate}`}
                      className="border-b border-slate-100 text-[12px] text-black last:border-b-0"
                    >
                      <td className="px-4 py-3 tabular-nums">
                        {row.previousRate}
                      </td>
                      <td className="px-4 py-3 font-semibold tabular-nums text-[#5B3DF5]">
                        {row.newRate}
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        {row.effectiveDate}
                      </td>
                      <td className="px-4 py-3">{row.reason}</td>
                      <td className="px-4 py-3 tabular-nums whitespace-nowrap">
                        {row.changedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <footer className="flex justify-end border-t border-slate-200 px-6 py-4">
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