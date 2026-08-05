"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  getLoanInterestAdjustmentHistory,
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

const seedRows: HistoryRow[] = [
  {
    id: "seed-1",
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
    id: "seed-2",
    installment: "Angsuran ke-1",
    type: "Pengurangan Bunga",
    amount: "50.000",
    reason: "OK",
    interestBefore: "83.333",
    interestAfter: "33.333",
    changedBy: "Arya Dharma",
    changedAt: "07-04-2026 10:32:11",
  },
];

function formatAmount(value: string | number) {
  if (typeof value === "number") {
    return value.toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    });
  }

  return value || "0";
}

function mapStoredRow(row: LoanInterestAdjustmentHistoryEntry): HistoryRow {
  return {
    id: row.id,
    installment: `Angsuran ke-${row.installmentNo}`,
    type: row.adjustmentType,
    amount: formatAmount(row.adjustmentAmount),
    reason: row.reason || "-",
    interestBefore: formatAmount(row.interestBefore),
    interestAfter: formatAmount(row.interestAfter),
    changedBy: "Arya Dharma",
    changedAt: row.adjustedAt.replace(",", ""),
  };
}

function getAccountNo(button: HTMLButtonElement) {
  const wizard = button.closest<HTMLElement>('[data-loan-debt-wizard="true"]');
  const text = wizard?.textContent ?? "";

  return (
    text.match(/No\.\s*Rek\.\s*Pinjaman\s+([A-Z0-9.-]+)/i)?.[1] ?? "SMG260004"
  );
}

function HistoryModal({
  rows,
  onClose,
}: {
  rows: HistoryRow[];
  onClose: () => void;
}) {
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/55 px-3 py-4">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup modal riwayat"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="loan-debt-history-title"
        className="relative z-10 flex max-h-[88vh] w-full max-w-[1280px] flex-col overflow-hidden rounded-[8px] bg-white shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="loan-debt-history-title"
              className="text-[18px] font-extrabold tracking-tight text-slate-900"
            >
              Riwayat Perubahan Nominal Bunga Pinjaman
            </h2>
            <p className="mt-1 text-[12px] text-slate-500">
              Daftar perubahan bunga yang telah disimpan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <main className="min-h-0 overflow-auto p-4 sm:p-6">
          <div className="safe-x-scroll overflow-hidden rounded-[6px] border border-slate-300">
            <table className="w-full min-w-[1180px] border-collapse text-[12px]">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-300 text-left font-extrabold uppercase tracking-wide text-slate-800">
                  <th className="px-3 py-3">
                    Angsuran yang Dilakukan Penyesuaian
                  </th>
                  <th className="px-3 py-3">Jenis Penyesuaian</th>
                  <th className="px-3 py-3 text-right">
                    Nominal Penyesuaian
                  </th>
                  <th className="px-3 py-3">Alasan Penyesuaian</th>
                  <th className="px-3 py-3 text-right">
                    Tagihan Bunga Sebelum Penyesuaian
                  </th>
                  <th className="px-3 py-3 text-right">
                    Tagihan Bunga Sesudah Penyesuaian
                  </th>
                  <th className="px-3 py-3">Diubah Oleh</th>
                  <th className="px-3 py-3">Tanggal & Waktu Perubahan</th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-12 text-center text-slate-500"
                    >
                      Belum ada riwayat perubahan nominal bunga.
                    </td>
                  </tr>
                ) : (
                  rows.map((row, index) => (
                    <tr
                      key={`${row.id}-${index}`}
                      className="border-b border-slate-200 text-slate-900 last:border-0 odd:bg-white even:bg-slate-50/50"
                    >
                      <td className="px-3 py-3 whitespace-nowrap">
                        {row.installment}
                      </td>
                      <td className="px-3 py-3">{row.type}</td>
                      <td className="px-3 py-3 text-right tabular-nums">
                        {row.amount}
                      </td>
                      <td className="max-w-[240px] px-3 py-3 whitespace-normal">
                        {row.reason}
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums whitespace-nowrap">
                        {row.interestBefore}
                      </td>
                      <td className="px-3 py-3 text-right font-bold tabular-nums text-blue-600 whitespace-nowrap">
                        {row.interestAfter}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {row.changedBy}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {row.changedAt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>

        <footer className="flex shrink-0 justify-end border-t border-slate-200 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 min-w-[88px] items-center justify-center rounded-[5px] bg-slate-600 px-4 text-[12px] font-bold text-white transition hover:bg-slate-700"
          >
            Tutup
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}

export default function LoanDebtAdjustmentHistoryTriggerFix() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState<HistoryRow[]>(seedRows);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>("button");

      if (!button) return;

      const label = (button.textContent ?? "").trim().toLowerCase();
      const isHistoryButton =
        label.includes("lihat riwayat perubahan") ||
        label.includes("lihat riwayat perubahan suku bunga");

      if (!isHistoryButton) return;
      if (!button.closest('[data-loan-debt-wizard="true"]')) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const accountNo = getAccountNo(button);
      const storedRows = getLoanInterestAdjustmentHistory(accountNo).map(
        mapStoredRow,
      );

      setRows([...storedRows, ...seedRows]);
      setOpen(true);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  if (!open) return null;

  return <HistoryModal rows={rows} onClose={() => setOpen(false)} />;
}