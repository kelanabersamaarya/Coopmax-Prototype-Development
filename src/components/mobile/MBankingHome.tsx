"use client";

import MBankingBottomNav from "@/components/mobile/MBankingBottomNav";
import MBankingHomeHeader from "@/components/mobile/MBankingHomeHeader";
import MBankingQuickActions from "@/components/mobile/MBankingQuickActions";
import MBankingSavingsCard from "@/components/mobile/MBankingSavingsCard";
import MBankingTransactionHistoryEmpty from "@/components/mobile/MBankingTransactionHistoryEmpty";

export default function MBankingHome() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <main className="min-h-0 flex-1 bg-white">
        <MBankingHomeHeader />
        <MBankingSavingsCard />
        <MBankingQuickActions />
        <MBankingTransactionHistoryEmpty />
      </main>

      <MBankingBottomNav activeTab="home" />
    </div>
  );
}