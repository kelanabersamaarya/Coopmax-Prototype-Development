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
    adjustmentAmount: formatAmount(entry.adjustmentAmount),
    reason: entry.reason || "-",
    interestBefore: formatAmount(entry.interestBefore),
    interestAfter: formatAmount(entry.interestAfter),
    changedBy: "Arya Dharma",
    changedAt: entry.adjustedAt.replace(",", ""),
  };
}

function HistoryTable({ rows }: { rows: HistoryRow[] }) {
  return (
    <div className="history-table-frame">
      <div className="history-table-scroll">
        <table className="history-table">
          <colgroup>
            <col className="history-col-installment" />
            <col className="history-col-type" />
            <col className="history-col-amount" />
            <col className="history-col-reason" />
            <col className="history-col-interest" />
            <col className="history-col-interest" />
            <col className="history-col-user" />
            <col className="history-col-date" />
          </colgroup>

          <thead>
            <tr>
              <th>Angsuran yang Dilakukan Penyesuaian</th>
              <th>Jenis Penyesuaian</th>
              <th className="is-number">Nominal Penyesuaian</th>
              <th>Alasan Penyesuaian</th>
              <th className="is-number">
                Tagihan Bunga
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="is-number">
                Tagihan Bunga
                <br />
                Sesudah Penyesuaian
              </th>
              <th>Diubah Oleh</th>
              <th>Tanggal & Waktu Perubahan</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="history-table-empty">
                  Belum ada riwayat perubahan nominal bunga.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td className="nowrap-cell">
                    Angsuran ke-{row.installmentNo}
                  </td>
                  <td>{row.adjustmentType}</td>
                  <td className="is-number nowrap-cell">
                    {row.adjustmentAmount}
                  </td>
                  <td className="reason-cell">{row.reason}</td>
                  <td className="is-number nowrap-cell">
                    {row.interestBefore}
                  </td>
                  <td className="is-number nowrap-cell interest-after-cell">
                    {row.interestAfter}
                  </td>
                  <td className="nowrap-cell">{row.changedBy}</td>
                  <td className="nowrap-cell">{row.changedAt}</td>
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
    <div className="history-dialog-overlay" role="dialog" aria-modal="true">
      <button
        type="button"
        className="history-dialog-backdrop"
        aria-label="Tutup overlay"
        onClick={() => onOpenChange(false)}
      />

      <section
        className="history-dialog-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="history-dialog-header">
          <h2>Riwayat Perubahan Nominal Bunga Pinjaman</h2>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="history-dialog-close"
            aria-label="Tutup riwayat"
            title="Tutup"
          >
            <X className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </header>

        <main className="history-dialog-body">
          <HistoryTable rows={rows} />
        </main>

        <footer className="history-dialog-footer">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="history-dialog-close-action"
          >
            Tutup
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}