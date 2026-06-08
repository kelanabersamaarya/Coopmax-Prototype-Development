"use client";

import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

function AmountBlock({
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
      <div className="mt-[5px] text-[14px] font-extrabold leading-tight tracking-tight text-black">
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
    <div className="rounded-[24px] bg-white px-6 py-5 shadow-[0_4px_14px_rgba(15,23,42,0.20)] ring-1 ring-slate-100">
      <div className="grid grid-cols-2 gap-x-5">
        <div className="min-w-0">
          <AmountBlock
            label="Total Bayar"
            value={transaction.amount.replace(/^\+/, "")}
          />

          <div className="mt-[12px] grid gap-[12px]">
            <AmountBlock label="Pokok" value={transaction.principal} />
            <AmountBlock label="Hutang Pokok" value={transaction.principalDebt} />
            <AmountBlock label="Denda" value={transaction.penalty} />
          </div>
        </div>

        <div className="min-w-0 text-right">
          <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
            {transaction.installmentLabel}
          </div>
          <div className="mt-[5px] text-[14px] font-normal leading-tight tracking-tight text-[#9A9A9A]">
            {transaction.date}
          </div>

          <div className="mt-[14px] grid gap-[12px]">
            <AmountBlock
              label="Bunga"
              value={transaction.interest}
              align="right"
            />
            <AmountBlock
              label="Hutang Bunga"
              value={transaction.interestDebt}
              align="right"
            />
            <AmountBlock
              label="Sisa Pinjaman"
              value={transaction.remainingLoan}
              align="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}