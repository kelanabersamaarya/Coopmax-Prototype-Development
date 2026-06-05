"use client";

import MBankingHomeHeader from "@/components/mobile/MBankingHomeHeader";
import MBankingQuickActions from "@/components/mobile/MBankingQuickActions";
import MBankingSavingsCard from "@/components/mobile/MBankingSavingsCard";
import MBankingTransactionHistoryEmpty from "@/components/mobile/MBankingTransactionHistoryEmpty";

export default function MBankingHome() {
  return (
    <div className="min-h-full bg-white">
      <MBankingHomeHeader />

      <main className="bg-white pb-8">
        <MBankingSavingsCard />
        <MBankingQuickActions />
        <MBankingTransactionHistoryEmpty />
      </main>
    </div>
  );
}