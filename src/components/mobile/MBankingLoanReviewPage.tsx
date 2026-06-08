"use client";

import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import MBankingLoanReviewInfoCard from "@/components/mobile/MBankingLoanReviewInfoCard";

export default function MBankingLoanReviewPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7]">
      <main className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
        </button>

        <h1 className="mt-6 text-[25px] font-extrabold leading-none tracking-tight text-white">
          Review
        </h1>

        <MBankingLoanReviewInfoCard />
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}