"use client";

import type { EKolektorTodayTransaction } from "@/components/mobile/e-kolektor-types";

const detailItems = [
  {
    label: "Pokok",
    value: "Rp.30.000.000.000",
  },
  {
    label: "Bunga",
    value: "Rp.30.000.000.000",
  },
  {
    label: "Denda",
    value: "Rp. 300.000",
  },
];

export default function EKolektorTodayHistoryItem({
  transaction,
  onClick,
}: {
  transaction: EKolektorTodayTransaction;
  onClick?: () => void;
}) {
  const displayAmount = transaction.amount.trim().startsWith("+")
    ? transaction.amount
    : `+${transaction.amount}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full rounded-[12px] bg-white px-[15px] py-[13px] text-left shadow-[0_3px_12px_rgba(15,23,42,0.08)] transition hover:shadow-[0_5px_16px_rgba(15,23,42,0.12)] active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[16px] font-extrabold leading-tight tracking-tight text-black">
            {transaction.customerName}
          </div>

          <div className="mt-[5px] truncate text-[16px] font-extrabold leading-tight tracking-tight text-black">
            {transaction.accountNo}
          </div>

          <div className="mt-[8px] truncate text-[13px] font-semibold leading-tight tracking-tight text-[#63809E]">
            {transaction.transactionType}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[15px] font-extrabold leading-tight tracking-tight text-[#34B27C]">
            {displayAmount}
          </div>

          <div className="mt-[10px] text-[14px] font-semibold leading-tight tracking-tight text-[#63809E]">
            {transaction.date}
          </div>

          <div className="mt-[10px] text-[14px] font-semibold leading-tight tracking-tight text-[#63809E]">
            {transaction.time}
          </div>
        </div>
      </div>

      <div className="mt-[13px] border-t border-[#E8E8E8] pt-[12px]">
        <div className="grid gap-[11px]">
          {detailItems.map((item) => (
            <div key={item.label} className="min-w-0">
              <div className="text-[12px] font-semibold leading-tight tracking-tight text-black">
                {item.label}
              </div>
              <div className="mt-[4px] text-[12px] font-extrabold leading-tight tracking-tight text-black">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}