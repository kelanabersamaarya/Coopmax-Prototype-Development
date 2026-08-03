"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  getLoanExtensionHistory,
  LOAN_EXTENSION_HISTORY_EVENT,
  type LoanExtensionHistoryEntry,
} from "@/lib/loanExtensionHistoryStore";

type HistoryRow = {
  id: string;
  method: string;
  effectiveDate: string;
  previousTenor: string;
  newTenor: string;
  changedAt: string;
};

const initialHistoryByAccount: Record<string, HistoryRow[]> = {
  SMG260004: [
    {
      id: "initial-extension",
      method: "Tenor Tambahan",
      effectiveDate: "07-04-2026",
      previousTenor: "12 Bulan",
      newTenor: "18 Bulan",
      changedAt: "07-04-2026 10:35:20",
    },
  ],
};

function toHistoryRow(entry: LoanExtensionHistoryEntry): HistoryRow {
  return entry;
}

export default function LoanExtensionHistoryDialog({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [savedRows, setSavedRows] = React.useState<
    LoanExtensionHistoryEntry[]
  >([]);

  React.useEffect(() => {
    function syncHistory() {
      setSavedRows(getLoanExtensionHistory(accountNo));
    }

    if (open) syncHistory();

    window.addEventListener(LOAN_EXTENSION_HISTORY_EVENT, syncHistory);
    window.addEventListener("storage", syncHistory);

    return () => {
      window.removeEventListener(LOAN_EXTENSION_HISTORY_EVENT, syncHistory);
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
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[900px]",
          "max-w-[900px] overflow-hidden rounded-[14px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-[18px] font-extrabold tracking-tight text-slate-900">
            Riwayat Perubahan Perpanjangan Pinjaman
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

        <main className="max-h-[60vh] overflow-auto px-5 py-5 sm:px-6">
          <div className="overflow-hidden rounded-[8px] border border-slate-200">
            <div className="safe-x-scroll">
              <table className="w-full min-w-[760px] border-collapse">
                <thead className="bg-[#F9FAFF]">
                  <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
                    <th className="px-4 py-3">Metode Perpanjangan</th>
                    <th className="px-4 py-3">Tanggal Efektif</th>
                    <th className="px-4 py-3">Tenor Sebelum</th>
                    <th className="px-4 py-3">Tenor Sesudah</th>
                    <th className="px-4 py-3">Tanggal & Waktu Perubahan</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-[13px] text-slate-600"
                      >
                        Belum ada riwayat perpanjangan pinjaman.
                      </td>
                    </tr>
                  ) : (
                    rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-slate-100 text-[12px] text-black last:border-b-0"
                      >
                        <td className="px-4 py-3">{row.method}</td>
                        <td className="px-4 py-3 tabular-nums">
                          {row.effectiveDate}
                        </td>
                        <td className="px-4 py-3">{row.previousTenor}</td>
                        <td className="px-4 py-3 font-semibold text-[#2563EB]">
                          {row.newTenor}
                        </td>
                        <td className="px-4 py-3 tabular-nums whitespace-nowrap">
                          {row.changedAt}
                        </td>
                      </tr>
                    ))
                  )}
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