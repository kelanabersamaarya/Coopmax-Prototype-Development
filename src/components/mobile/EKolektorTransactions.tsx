"use client";

import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorTransactionHeader from "@/components/mobile/EKolektorTransactionHeader";

export default function EKolektorTransactions({
  onBackHome,
}: {
  onBackHome: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <EKolektorTransactionHeader onCancel={onBackHome} />

      <div className="min-h-0 flex-1 bg-white" />

      <EKolektorAndroidNavBar onBack={onBackHome} />
    </div>
  );
}