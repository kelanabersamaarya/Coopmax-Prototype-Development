"use client";

import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

function DetailPair({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
        {label}
      </div>
      <div className="mt-[6px] text-[14px] font-extrabold leading-tight tracking-tight text-black">
        {value}
      </div>
    </div>
  );
}

export default function MBankingTransactionHistoryCard({
  transaction,
}: {
  transaction: MBankingTransactionHistoryEntry;
}) {
  return (
    <div className="rounded-[24px] bg-white px-5 py-5 shadow-[0_4px_14px_rgba(15,23,42,0.20)] ring-1 ring-slate-100">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
            {transaction.title}
          </div>
          <div className="mt-2 text-[13px] font-normal leading-tight tracking-tight text-[#8F8F8F]">
            {transaction.accountNo}
          </div>
          <div className="mt-2 text-[13px] font-normal leading-tight tracking-tight text-[#8F8F8F]">
            {transaction.date} • {transaction.time}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[15px] font-extrabold leading-tight tracking-tight text-[#34B27C]">
            {transaction.amount}
          </div>
          <div className="mt-2 text-[12px] font-normal leading-tight tracking-tight text-[#8F8F8F]">
            {transaction.status}
          </div>
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-[#E7E7E7]" />

      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-[11px]">
        <DetailPair label="Pokok" value={transaction.principal} />
        <DetailPair label="Bunga" value={transaction.interest} align="right" />

        <DetailPair label="Hutang Pokok" value={transaction.principalDebt} />
        <DetailPair label="Hutang Bunga" value={transaction.interestDebt} align="right" />

        <DetailPair label="Denda" value={transaction.penalty} />
        <DetailPair label="Sisa Pinjaman" value={transaction.remainingLoan} align="right" />
      </div>
    </div>
  );
}