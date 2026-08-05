"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
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

const columns = [
  { key: "installment", label: "Angsuran", width: "150px" },
  { key: "type", label: "Jenis Penyesuaian", width: "190px" },
  { key: "amount", label: "Nominal Penyesuaian", width: "150px" },
  { key: "reason", label: "Alasan Penyesuaian", width: "260px" },
  { key: "interestBefore", label: "Bunga Sebelum", width: "165px" },
  { key: "interestAfter", label: "Bunga Sesudah", width: "165px" },
  { key: "changedBy", label: "Diubah Oleh", width: "150px" },
  { key: "changedAt", label: "Tanggal & Waktu", width: "180px" },
] as const;

function HistoryTable({ rows }: { rows: HistoryRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="safe-x-scroll w-full">
        <table className="w-[1410px] min-w-[1410px] table-fixed border-collapse text-left">
          <colgroup>
            {columns.map((column) => (
              <col key={column.key} style={{ width: column.width }} />
            ))}
          </colgroup>

          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-700"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-[13px] text-slate-500"
                >
                  Belum ada riwayat perubahan nominal bunga.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={`${row.id}-${index}`}
                  className="border-b border-slate-100 text-[12px] text-slate-900 last:border-b-0 odd:bg-white even:bg-slate-50/50"
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
                  <td className="whitespace-nowrap px-4 py-3 text-right font-bold tabular-nums text-blue-600">
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
  const [mounted, setMounted] = React.useState(false);
  const [storedRows, setStoredRows] = React.useState<HistoryRow[]>([]);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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

  if (!open || !mounted) return null;

  const rows = [...storedRows, ...(seedRows[accountNo] ?? [])];

  return createPortal(
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/55 p-3 sm:p-5">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup modal riwayat"
        onClick={() => onOpenChange(false)}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="loan-debt-history-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-[1180px] min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id="loan-debt-history-title"
              className="truncate text-[17px] font-extrabold tracking-tight text-slate-900 sm:text-[18px]"
            >
              Riwayat Perubahan Nominal Bunga Pinjaman
            </h2>
            <p className="mt-1 text-[12px] text-slate-500">
              Daftar perubahan bunga yang telah disimpan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
            aria-label="Tutup riwayat"
            title="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <main className="min-h-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <HistoryTable rows={rows} />
        </main>

        <footer className="flex shrink-0 justify-end border-t border-slate-200 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 min-w-[88px] items-center justify-center rounded-[8px] bg-slate-600 px-4 text-[12px] font-bold text-white transition hover:bg-slate-700"
          >
            Tutup
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}