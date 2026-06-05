"use client";

import { CheckCircle2 } from "lucide-react";
import type { EKolektorTodayTransaction } from "@/components/mobile/e-kolektor-types";

export default function EKolektorTodayHistoryItem({
  transaction,
}: {
  transaction: EKolektorTodayTransaction;
}) {
  return (
    <div className="rounded-[12px] bg-white px-4 py-4 shadow-[0_3px_12px_rgba(15,23,42,0.08)]">
      <div className="flex items-start gap-3">
        <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#004FC7] text-[18px] font-extrabold text-white">
          {transaction.customerName.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-[14px] font-extrabold leading-tight tracking-tight text-[#203064]">
                {transaction.customerName}
              </div>
              <div className="mt-1 truncate text-[12px] font-semibold leading-tight tracking-tight text-[#8E8E8E]">
                {transaction.accountNo}
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-[13px] font-extrabold leading-tight tracking-tight text-[#004FC7]">
                {transaction.amount}
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold leading-none text-[#39B54A]">
                <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                Berhasil
              </div>
            </div>
          </div>

          <div className="mt-3 h-px w-full bg-[#E8E8E8]" />

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="text-[12px] font-semibold leading-tight tracking-tight text-[#203064]">
              {transaction.transactionType}
            </div>
            <div className="shrink-0 text-[11px] font-normal leading-tight tracking-tight text-[#8E8E8E]">
              {transaction.date} • {transaction.time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}