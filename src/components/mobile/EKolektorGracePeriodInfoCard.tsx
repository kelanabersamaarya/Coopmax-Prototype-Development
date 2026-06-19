"use client";

import { Info } from "lucide-react";

export default function EKolektorGracePeriodInfoCard() {
  return (
    <div className="mb-4 rounded-[15px] border border-[#CDD4E0] bg-white px-4 py-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#004FC7] text-white">
          <Info className="h-[15px] w-[15px]" strokeWidth={2.8} />
        </span>

        <div className="min-w-0">
          <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#23305A]">
            Periode Grace Period
          </div>
          <div className="mt-1 text-[12px] font-extrabold leading-snug tracking-tight text-[#004FC7]">
            Grace Period: 3 Bulan
          </div>
          <div className="mt-1 text-[12px] font-normal leading-snug tracking-tight text-[#63809E]">
            Berikut ini merupakan periode tagihan pinjaman yang termasuk ke dalam
            grace period selama 3 bulan. Selama periode ini nasabah hanya membayar
            bunga.
          </div>
        </div>
      </div>
    </div>
  );
}