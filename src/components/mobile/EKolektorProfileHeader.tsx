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

      <h1 className="mt-[31px] text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
        Pengaturan
      </h1>

      <div className="mt-[31px] flex items-center gap-[22px]">
        <div className="grid h-[104px] w-[104px] shrink-0 place-items-center rounded-full bg-[#004FC7] text-[25px] font-extrabold leading-none text-white">
          A
        </div>

        <div className="flex min-w-0 items-center gap-[8px]">
          <span className="h-[16px] w-[16px] shrink-0 rounded-full bg-[#39B54A]" />
          <span className="text-[20px] font-extrabold leading-none tracking-tight text-[#39B54A]">
            ONLINE
          </span>
        </div>
      </div>

      <div className="mt-[30px] flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-[18px] font-extrabold leading-none tracking-tight text-[#1D2F63]">
            I Ketut Pasek Jaya Arta
          </div>
          <div className="mt-[7px] truncate text-[14px] font-extrabold leading-none tracking-tight text-[#8C8C8C]">
            pasek
          </div>
        </div>

        <button
          type="button"
          className={cn(
            "mb-[-2px] h-[40px] shrink-0 rounded-full px-[16px]",
            "bg-[#004FC7] text-[14px] font-normal leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Ubah Profil
        </button>
      </div>
    </header>
  );
}