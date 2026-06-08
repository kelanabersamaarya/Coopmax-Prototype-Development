"use client";

import MBankingTransactionEmptyState from "@/components/mobile/MBankingTransactionEmptyState";
import MBankingTransactionHistoryCard from "@/components/mobile/MBankingTransactionHistoryCard";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

export default function MBankingLoanTransactionHistory({
  transactions = [],
}: {
  transactions?: MBankingTransactionHistoryEntry[];
}) {
  const hasTransactions = transactions.length > 0;

  return (
    <section className="-mx-6 -mb-10 mt-7 min-h-[500px] bg-[#F2F2F2] px-6 pb-24 pt-6">
      <h2 className="text-[18px] font-extrabold leading-tight tracking-tight text-[#203064]">
        Riwayat Transaksi
      </h2>

      {hasTransactions ? (
        <div className="mt-6 grid gap-4">
          {transactions.map((transaction) => (
            <MBankingTransactionHistoryCard
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </div>
      ) : (
        <MBankingTransactionEmptyState className="mt-6" />
      )}
    </section>
  );
}