"use client";

import { Check } from "lucide-react";

const checklistItems = [
  {
    label: "Tagihan berhasil dimuat",
    value: "Aktif",
  },
  {
    label: "Grace period berlaku",
    value: "3 Bulan",
  },
  {
    label: "Denda berjalan",
    value: "75.000",
  },
];

export default function MBankingLoanStatusChecklist() {
  return (
    <section className="mt-5 overflow-hidden rounded-[12px] bg-[#1f2937] shadow-[0_8px_20px_rgba(15,23,42,0.14)]">
      <div className="border-b border-white/10 px-4 py-3">
        <div className="text-[14px] font-extrabold leading-tight tracking-tight text-white">
          Status Tagihan
        </div>
      </div>

      <div className="grid">
        {checklistItems.map((item, index) => (
          <div
            key={item.label}
            className={
              index === 0
                ? "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3"
                : "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-white/10 px-4 py-3"
            }
          >
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold leading-tight tracking-tight text-white">
                {item.label}
              </div>
              <div className="mt-1 truncate text-[14px] font-normal leading-tight tracking-tight text-white/70">
                {item.value}
              </div>
            </div>

            <span className="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[5px] bg-[#36E15B] text-[#112318] shadow-sm">
              <Check className="h-[20px] w-[20px]" strokeWidth={3.5} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}