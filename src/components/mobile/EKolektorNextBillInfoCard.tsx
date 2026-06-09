"use client";

import { Info } from "lucide-react";

export default function EKolektorNextBillInfoCard() {
  return (
    <div className="mb-4 rounded-[12px] border border-[#CDD4E0] bg-white px-4 py-3 shadow-[0_4px_14px_rgba(15,23,42,0.20)]">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#004FC7] text-white">
          <Info className="h-[15px] w-[15px]" strokeWidth={2.8} />
        </span>

        <div className="min-w-0">
          <div className="text-[12px] font-normal leading-snug tracking-tight text-[#63809E]">
            Tagihan berikutnya akan diterbitkan pada{" "}
            <span className="font-extrabold text-[#004FC7]">20 April 2025</span>{" "}
            dan jatuh tempo pada{" "}
            <span className="font-extrabold text-[#004FC7]">5 Mei 2025</span>.
          </div>
        </div>
      </div>
    </div>
  );
}