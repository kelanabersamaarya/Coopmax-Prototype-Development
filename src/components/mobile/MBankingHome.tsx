"use client";

import MBankingHomeHeader from "@/components/mobile/MBankingHomeHeader";
import MBankingQuickActions from "@/components/mobile/MBankingQuickActions";
import MBankingSavingsCard from "@/components/mobile/MBankingSavingsCard";
import MBankingTransactionHistoryEmpty from "@/components/mobile/MBankingTransactionHistoryEmpty";

export default function MBankingHome() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <MBankingHomeHeader />

      <main className="min-h-0 flex-1 overflow-y-auto bg-white pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <MBankingSavingsCard />
        <MBankingQuickActions />
        <MBankingTransactionHistoryEmpty />
      </main>
    </div>
  );
}