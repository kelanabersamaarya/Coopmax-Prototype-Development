"use client";

import MBankingInfoHeader from "@/components/mobile/MBankingInfoHeader";
import MBankingInfoList from "@/components/mobile/MBankingInfoList";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function MBankingInfoPage({
  onBack,
  onLoanClick,
}: {
  onBack: () => void;
  onLoanClick?: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7]">
      <MBankingInfoHeader onBack={onBack} />

      <div className="relative z-20 -mt-5 min-h-0 flex-1 overflow-hidden rounded-t-[20px] bg-white">
        <main className="h-full min-h-0 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <MBankingInfoList onLoanClick={onLoanClick} />
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}