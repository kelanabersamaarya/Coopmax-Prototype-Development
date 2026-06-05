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
    <header className="shrink-0 bg-[#004FC7] px-5 pb-6 pt-8 text-white">
      <div className="flex flex-col items-start">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.7} />
        </button>

        <h1 className="mt-3 text-[25px] font-extrabold leading-none tracking-tight text-white">
          {title}
        </h1>
      </div>
    </header>
  );
}