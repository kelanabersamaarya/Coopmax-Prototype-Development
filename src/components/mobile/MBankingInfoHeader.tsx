"use client";

import { ArrowLeft } from "lucide-react";

export default function MBankingInfoHeader({
  title = "Informasi",
  onBack,
}: {
  title?: string;
  onBack: () => void;
}) {
  return (
    <header className="shrink-0 border-b border-[#E5E5E5] bg-white px-5 pb-4 pt-6">
      <div className="flex h-[42px] items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#1f2937] transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[23px] w-[23px]" strokeWidth={2.5} />
        </button>

        <h1 className="min-w-0 flex-1 text-center text-[18px] font-extrabold leading-none tracking-tight text-[#111827]">
          {title}
        </h1>

        <div className="h-9 w-9 shrink-0" />
      </div>
    </header>
  );
}