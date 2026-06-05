"use client";

import MBankingHomeHeader from "@/components/mobile/MBankingHomeHeader";
import MBankingQuickActions from "@/components/mobile/MBankingQuickActions";
import MBankingSavingsCard from "@/components/mobile/MBankingSavingsCard";

export default function MBankingHome() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <MBankingHomeHeader />

      <main className="min-h-0 flex-1 bg-white">
        <MBankingSavingsCard />
        <MBankingQuickActions />
      </main>
    </div>
  );
}