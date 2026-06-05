"use client";

import { ReceiptText } from "lucide-react";

const historyRows = [
  {
    title: "Pembayaran Angsuran",
    date: "25-03-2026",
    amount: "Rp. 991.666",
    status: "Berhasil",
  },
  {
    title: "Pembayaran Angsuran",
    date: "25-02-2026",
    amount: "Rp. 916.666",
    status: "Berhasil",
  },
  {
    title: "Pembayaran Bunga",
    date: "25-01-2026",
    amount: "Rp. 83.333",
    status: "Berhasil",
  },
];

export default function MBankingLoanTransactionHistory() {
  return (
    <section className="-mx-6 mt-7 bg-[#F2F2F2] px-6 pb-8 pt-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[18px] font-extrabold leading-tight tracking-tight text-[#203064]">
          Riwayat Transaksi
        </h2>

        <button
          type="button"
          className="shrink-0 text-[13px] font-semibold leading-tight tracking-tight text-[#004FC7] transition active:scale-[0.98]"
        >
          Lihat Semua
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        {historyRows.map((row, index) => (
          <div
            key={`${row.title}-${row.date}-${index}`}
            className="flex items-center gap-3 rounded-[14px] bg-white px-4 py-3 shadow-sm"
          >
            <span className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[13px] bg-[#004FC7] text-white">
              <ReceiptText className="h-[22px] w-[22px]" strokeWidth={2.5} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
                {row.title}
              </div>
              <div className="mt-1 text-[12px] font-normal leading-tight tracking-tight text-[#9A9A9A]">
                {row.date}
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-[13px] font-extrabold leading-tight tracking-tight text-[#203064]">
                {row.amount}
              </div>
              <div className="mt-1 text-[11px] font-semibold leading-tight tracking-tight text-[#39B54A]">
                {row.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}