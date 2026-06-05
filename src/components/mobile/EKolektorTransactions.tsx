"use client";

import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorTransactionHeader from "@/components/mobile/EKolektorTransactionHeader";

export default function EKolektorTransactions({
  onBackHome,
}: {
  onBackHome: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="shrink-0 pb-[28px]">
        <EKolektorTransactionHeader onCancel={onBackHome} />
      </div>

      <div className="relative z-10 -mt-[30px] min-h-0 flex-1 rounded-t-[30px] bg-white" />

      <EKolektorAndroidNavBar onBack={onBackHome} />
    </div>
  );
}