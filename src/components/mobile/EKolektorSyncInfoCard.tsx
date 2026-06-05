"use client";

import { Check } from "lucide-react";

export default function EKolektorSyncInfoCard() {
  return (
    <div className="relative z-10 mt-[14px] px-5">
      <div className="relative overflow-hidden rounded-[5px] bg-white px-4 py-[11px] shadow-[0_2px_8px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70">
        <div className="absolute bottom-0 left-0 top-0 w-[6px] rounded-l-[5px] bg-[#39b54a]" />

        <div className="flex items-center justify-between gap-4 pl-2">
          <div className="min-w-0">
            <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#39b54a]">
              0 Transaksi Belum Tersinkron
            </div>
            <div className="mt-0.5 text-[15px] font-normal leading-tight text-[#8a8a8a]">
              Total transaksi hari ini yang sudah tersinkron
            </div>
          </div>

          <div className="grid h-[53px] w-[53px] shrink-0 place-items-center rounded-full bg-[#39b54a] text-white shadow-sm">
            <Check className="h-[30px] w-[30px]" strokeWidth={2.6} />
          </div>
        </div>
      </div>
    </div>
  );
}