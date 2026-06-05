"use client";

import { HandCoins } from "lucide-react";

export default function MBankingLoanAmountInfo() {
  return (
    <section className="mt-6 flex items-center gap-4">
      <div className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[16px] bg-[#F4F4F4]">
        <HandCoins className="h-[26px] w-[26px] text-[#004FC7]" strokeWidth={2.7} />
      </div>

      <div className="min-w-0">
        <div className="text-[12px] font-extrabold leading-tight tracking-tight text-[#203064]">
          Jumlah Pinjaman
        </div>
        <div className="mt-2 text-[14px] font-normal leading-tight tracking-tight text-[#9A9A9A]">
          Rp. 12,000,000.00
        </div>
      </div>
    </section>
  );
}