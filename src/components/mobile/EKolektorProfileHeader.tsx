"use client";

import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EKolektorProfileHeader({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <header className="shrink-0 bg-white px-[26px] pb-[22px] pt-[28px]">
      <button
        type="button"
        onClick={onBack}
        className="-ml-1 inline-flex h-[28px] w-[28px] items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]"
        aria-label="Kembali"
        title="Kembali"
      >
        <ArrowLeft className="h-[26px] w-[26px]" strokeWidth={2.5} />
      </button>

      <h1 className="mt-[31px] text-[30px] font-extrabold leading-none tracking-tight text-[#004FC7]">
        Pengaturan
      </h1>

      <div className="mt-[31px] flex items-center gap-[24px]">
        <div className="grid h-[126px] w-[126px] shrink-0 place-items-center rounded-full bg-[#004FC7] text-[29px] font-extrabold leading-none text-white">
          A
        </div>

        <div className="flex min-w-0 items-center gap-[9px]">
          <span className="h-[18px] w-[18px] shrink-0 rounded-full bg-[#39B54A]" />
          <span className="text-[22px] font-extrabold leading-none tracking-tight text-[#39B54A]">
            ONLINE
          </span>
        </div>
      </div>

      <div className="mt-[34px] flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-[22px] font-extrabold leading-none tracking-tight text-[#1D2F63]">
            Andrew Rodriguez
          </div>
          <div className="mt-[7px] truncate text-[18px] font-extrabold leading-none tracking-tight text-[#8C8C8C]">
            andrew
          </div>
        </div>

        <button
          type="button"
          className={cn(
            "mb-[-3px] h-[50px] shrink-0 rounded-full px-[20px]",
            "bg-[#004FC7] text-[17px] font-normal leading-none text-white",
            "shadow-[0_4px_10px_rgba(0,79,199,0.20)] transition active:scale-[0.98]",
          )}
        >
          Ubah Profil
        </button>
      </div>
    </header>
  );
}