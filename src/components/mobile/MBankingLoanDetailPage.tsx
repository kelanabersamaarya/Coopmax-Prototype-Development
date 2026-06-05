"use client";

import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function MBankingLoanDetailPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="shrink-0 bg-white px-6 pb-6 pt-8">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
          </button>

          <h1 className="mt-5 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
            Pinjaman
          </h1>
        </header>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}