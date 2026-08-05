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
  installment: string;
  type: string;
  amount: string;
  reason: string;
  interestBefore: string;
  interestAfter: string;
  changedBy: string;
  changedAt: string;
};

const seedRows: Record<string, HistoryRow[]> = {
  SMG260004: [
    {
      id: "seed-forgiveness-2",
      installment: "Angsuran ke-2",
      type: "Pembebasan Seluruh Bunga",
      amount: "83.333",
      reason: "OK",
      interestBefore: "83.333",
      interestAfter: "0",
      changedBy: "Arya Dharma",
      changedAt: "07-04-2026 10:35:20",
    },
    {
      id: "seed-reduction-1",
      installment: "Angsuran ke-1",
      type: "Pengurangan Bunga",
      amount: "50.000",
      reason: "OK",
      interestBefore: "83.333",
      interestAfter: "33.333",
      changedBy: "Arya Dharma",
      changedAt: "07-04-2026 10:32:11",
    },
    {
      id: "seed-forgiveness-1",
      installment: "Angsuran ke-1",
      type: "Pembebasan Seluruh Bunga",
      amount: "83.333",
      reason: "Kebijakan koperasi",
      interestBefore: "83.333",
      interestAfter: "0",
      changedBy: "Arya Dharma",
      changedAt: "07-04-2026 10:28:45",
    },
  ],
};

function formatAmount(value: string | number) {
  if (typeof value === "number") {
    return value.toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    });
  }

  return value || "0";
}

function mapStoredRow(entry: LoanInterestAdjustmentHistoryEntry): HistoryRow {
  return {
    id: entry.id,
    installment: `Angsuran ke-${entry.installmentNo}`,
    type: entry.adjustmentType,
    amount: formatAmount(entry.adjustmentAmount),
    reason: entry.reason || "-",
    interestBefore: formatAmount(entry.interestBefore),
    interestAfter: formatAmount(entry.interestAfter),
    changedBy: "Arya Dharma",
    changedAt: entry.adjustedAt.replace(",", ""),
  };
}

function HistoryTable({ rows }: { rows: HistoryRow[] }) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200">
      <div className="safe-x-scroll">
        <table className="w-full min-w-[1180px] border-collapse">
          <thead className="bg-[#F9FAFF]">
            <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
              <th className="w-[150px] px-4 py-3">Angsuran</th>
              <th className="w-[190px] px-4 py-3">Jenis Penyesuaian</th>
              <th className="w-[150px] px-4 py-3 text-right">
                Nominal Penyesuaian
              </th>
              <th className="w-[260px] px-4 py-3">Alasan Penyesuaian</th>
              <th className="w-[165px] px-4 py-3 text-right">
                Bunga Sebelum
              </th>
              <th className="w-[165px] px-4 py-3 text-right">
                Bunga Sesudah
              </th>
              <th className="w-[150px] px-4 py-3">Diubah Oleh</th>
              <th className="w-[180px] px-4 py-3">
                Tanggal & Waktu
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-[13px] text-slate-600"
                >
                  Belum ada riwayat perubahan nominal bunga.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={`${row.id}-${index}`}
                  className={cn(
                    "border-b border-slate-100 text-[12px] text-black last:border-b-0",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-3 font-semibold">
                    {row.installment}
                  </td>
                  <td className="whitespace-normal px-4 py-3 leading-relaxed">
                    {row.type}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">
                    {row.amount}
                  </td>
                  <td className="whitespace-normal break-words px-4 py-3 leading-relaxed">
                    {row.reason}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">
                    {row.interestBefore}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold tabular-nums text-[#2563EB]">
                    {row.interestAfter}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.changedBy}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                    {row.changedAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
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

    const loadHistory = () => {
      setStoredRows(
        getLoanInterestAdjustmentHistory(accountNo).map(mapStoredRow),
      );
    };

    loadHistory();
    window.addEventListener(LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT, loadHistory);
    window.addEventListener("storage", loadHistory);

    return () => {
      window.removeEventListener(
        LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
        loadHistory,
      );
      window.removeEventListener("storage", loadHistory);
    };
  }, [accountNo, open]);

  const rows = React.useMemo(
    () => [...storedRows, ...(seedRows[accountNo] ?? [])],
    [accountNo, storedRows],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[1180px]",
          "max-w-[1180px]",
          "max-h-[85vh]",
          "overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-[18px] font-extrabold tracking-tight text-slate-900">
              Riwayat Perubahan Nominal Bunga Pinjaman
            </h2>
            <p className="mt-1 text-[12px] text-slate-500">
              Daftar perubahan nominal bunga yang telah disimpan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <main className="min-h-0 overflow-auto px-6 py-5">
          <HistoryTable rows={rows} />
        </main>

        <footer className="flex shrink-0 justify-end border-t border-slate-200 px-6 py-4">
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