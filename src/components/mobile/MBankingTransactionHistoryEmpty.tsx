"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import MBankingTransactionHistoryCard from "@/components/mobile/MBankingTransactionHistoryCard";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

type HistoryTab = "Pembayaran" | "Kolektor";

export default function MBankingTransactionHistoryEmpty({
  transactions = [],
}: {
  transactions?: MBankingTransactionHistoryEntry[];
}) {
  const [activeTab, setActiveTab] = React.useState<HistoryTab>("Pembayaran");

  const tabs: HistoryTab[] = ["Pembayaran", "Kolektor"];
  const showTransactions = activeTab === "Pembayaran" && transactions.length > 0;

  return (
    <section className="mt-3 bg-[#F2F2F2] px-6 pb-8 pt-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[16px] font-extrabold leading-tight tracking-tight text-black">
          Riwayat Transaksi
        </h2>

        <button
          type="button"
          className="shrink-0 text-[14px] font-semibold leading-tight tracking-tight text-[#004FC7] transition active:scale-[0.98]"
        >
          Lihat Semua
        </button>
      </div>

      <div className="mt-5 flex items-center gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-[34px] rounded-full px-5 text-[14px] font-semibold leading-none transition active:scale-[0.98]",
                isActive
                  ? "bg-[#004FC7] text-white"
                  : "bg-transparent text-[#004FC7]",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {showTransactions ? (
        <div className="mt-6 grid gap-4">
          {transactions.map((transaction) => (
            <MBankingTransactionHistoryCard
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </div>
      ) : (
        <div className="mt-7 flex flex-col items-center text-center">
          <svg
            viewBox="0 0 220 170"
            fill="none"
            className="h-[170px] w-[220px]"
            aria-hidden="true"
          >
            <path d="M48 74L82 46H169L196 74H48Z" fill="#A8A8A8" />
            <path d="M82 46H169L194 72H105L82 46Z" fill="#BDBDBD" />
            <path d="M79 70H170V140H79V70Z" fill="#B9B9B9" />
            <path d="M79 70L105 95H194L170 70H79Z" fill="#6F6F6F" />
            <path d="M105 86H194V96H105V86Z" fill="#9B9B9B" />
            <path d="M82 46L105 70H194L170 46H82Z" fill="#B5B5B5" />

            <circle cx="108" cy="101" r="3.2" fill="#203040" />
            <circle cx="140" cy="101" r="3.2" fill="#203040" />

            <path
              d="M110 124C116 113 132 113 138 124"
              stroke="#7A7A7A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <rect x="164" y="121" width="14" height="18" fill="white" />
          </svg>

          <div className="mt-4 text-[20px] font-extrabold leading-tight tracking-tight text-[#23305A]">
            Tidak Ada Riwayat Transaksi
          </div>
        </div>
      )}
    </section>
  );
}