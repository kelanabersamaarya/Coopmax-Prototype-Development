"use client";

import { CalendarDays, HandCoins, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

const loanAmountItems = [
  {
    label: "Jumlah Pinjaman",
    value: "Rp. 12,000,000.00",
    icon: HandCoins,
  },
  {
    label: "Jangka Waktu",
    value: "12 Bulan",
    icon: CalendarDays,
  },
  {
    label: "Bunga Per Tahun",
    value: "12.00%",
    icon: Percent,
  },
];

export default function MBankingLoanAmountInfo() {
  return (
    <section className="mt-6 grid gap-4">
      {loanAmountItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="flex min-w-0 items-center gap-4 rounded-[16px] bg-white"
          >
            <div className="inline-flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[16px] bg-[#F4F4F4]">
              <Icon
                className="h-[21px] w-[21px] text-[#004FC7]"
                strokeWidth={2.6}
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-extrabold leading-tight tracking-tight text-[#203064]">
                {item.label}
              </div>
              <div
                className={cn(
                  "mt-2 text-[14px] font-normal leading-tight tracking-tight",
                  "text-[#9A9A9A]",
                )}
              >
                {item.value}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}