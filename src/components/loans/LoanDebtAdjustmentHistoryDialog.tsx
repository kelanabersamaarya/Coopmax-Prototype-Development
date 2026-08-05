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
  installmentNo: string;
  adjustmentType: string;
  adjustmentAmount: string;
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
      installmentNo: "2",
      adjustmentType: "Pembebasan Seluruh Bunga",
      adjustmentAmount: "83.333",
      reason: "OK",
      interestBefore: "83.333",
      interestAfter: "0",
      changedBy: "Arya Dharma",
      changedAt: "07-04-2026 10:35:20",
    },
    {
      id: "seed-reduction-1",
      installmentNo: "1",
      adjustmentType: "Pengurangan Bunga",
      adjustmentAmount: "50.000",
      reason: "OK",
      interestBefore: "83.333",
      interestAfter: "33.333",
      changedBy: "Arya Dharma",
      changedAt: "07-04-2026 10:32:11",
    },
    {
      id: "seed-forgiveness-1",
      installmentNo: "1",
      adjustmentType: "Pembebasan Seluruh Bunga",
      adjustmentAmount: "83.333",
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  return value || "0";
}

function mapStoredRow(entry: LoanInterestAdjustmentHistoryEntry): HistoryRow {
  return {
    id: entry.id,
    installmentNo: String(entry.installmentNo || "-"),
    adjustmentType: entry.adjustmentType,
    adjustmentAmount: formatAmount(entry.adjustmentAmount || "0,00"),
    reason: entry.reason || "-",
    interestBefore: formatAmount(entry.interestBefore),
    interestAfter: formatAmount(entry.interestAfter),
    changedBy: "Arya Dharma",
    changedAt: entry.adjustedAt.replace(",", ""),
  };
}

function HistoryTable({ rows }: { rows: HistoryRow[] }) {
  return (
    <div className="w-full overflow-hidden rounded-[8px] border border-slate-200 bg-white">
      <div
        className="block w-full overflow-x-auto overflow-y-hidden overscroll-x-contain"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
      >
        <table className="w-[1220px] min-w-[1220px] table-fixed border-collapse text-[12px]">
          <colgroup>
            <col className="w-[150px]" />
            <col className="w-[190px]" />
            <col className="w-[150px]" />
            <col className="w-[260px]" />
            <col className="w-[155px]" />
            <col className="w-[155px]" />
            <col className="w-[150px]" />
            <col className="w-[180px]" />
          </colgroup>

          <thead className="bg-[#F8FAFC]">
            <tr className="border-b border-slate-200 text-left text-[10px] font-extrabold uppercase tracking-wide text-slate-900">
              <th className="px-3 py-4">
                Angsuran yang Dilakukan Penyesuaian
              </th>
              <th className="px-3 py-4">Jenis Penyesuaian</th>
              <th className="px-3 py-4">Nominal Penyesuaian</th>
              <th className="px-3 py-4">Alasan Penyesuaian</th>
              <th className="px-3 py-4 text-right">
                Tagihan Bunga<br />
                Sebelum Penyesuaian
              </th>
              <th className="px-3 py-4 text-right">
                Tagihan Bunga<br />
                Sesudah Penyesuaian
              </th>
              <th className="px-3 py-4">Diubah Oleh</th>
              <th className="px-3 py-4">
                Tanggal & Waktu Perubahan
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-[13px] text-slate-500"
                >
                  Belum ada riwayat perubahan nominal bunga.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-200 text-slate-900 last:border-b-0"
                >
                  <td className="px-3 py-4 align-middle font-semibold tabular-nums">
                    Angsuran ke-{row.installmentNo}
                  </td>
                  <td className="px-3 py-4 align-middle leading-snug">
                    {row.adjustmentType}
                  </td>
                  <td className="px-3 py-4 text-right align-middle tabular-nums">
                    {row.adjustmentAmount}
                  </td>
                  <td className="break-words px-3 py-4 align-middle leading-snug">
                    {row.reason}
                  </td>
                  <td className="px-3 py-4 text-right align-middle tabular-nums">
                    {row.interestBefore}
                  </td>
                  <td className="px-3 py-4 text-right align-middle font-semibold tabular-nums text-[#2563EB]">
                    {row.interestAfter}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 align-middle">
                    {row.changedBy}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 align-middle tabular-nums">
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
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/65 p-2 sm:p-3"
      role="dialog"
      aria-modal="true"
      aria-label="Riwayat perubahan nominal bunga pinjaman"
    >
      <button
        type="button"
        aria-label="Tutup overlay"
        className="absolute inset-0 z-0 cursor-default"
        onClick={() => onOpenChange(false)}
      />

      <section
        className="relative z-10 flex max-h-[96vh] w-full max-w-[1180px] flex-col overflow-hidden rounded-[5px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="min-w-0 text-[16px] font-extrabold tracking-tight text-[#172033] sm:text-[17px]">
            Riwayat Perubahan Nominal Bunga Pinjaman
          </h2>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="relative z-20 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-slate-700 transition hover:bg-slate-100"
            aria-label="Tutup riwayat"
            title="Tutup"
          >
            <X className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto px-5 py-8 sm:px-6 sm:py-9">
          <HistoryTable rows={rows} />
        </main>

        <footer className="flex shrink-0 justify-end border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="relative z-20 inline-flex h-9 min-w-[88px] cursor-pointer items-center justify-center rounded-[5px] bg-[#7D8CA8] px-5 text-[12px] font-bold text-white transition hover:bg-[#6E7D98]"
          >
            Tutup
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}