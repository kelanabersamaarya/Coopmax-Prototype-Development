"use client";

import MBankingInfoHeader from "@/components/mobile/MBankingInfoHeader";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function MBankingInfoPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7]">
      <MBankingInfoHeader onBack={onBack} />

      <main className="-mt-5 min-h-0 flex-1 overflow-y-auto rounded-t-[20px] bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" />

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}