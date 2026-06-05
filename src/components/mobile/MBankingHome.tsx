"use client";

import * as React from "react";
import MBankingBottomNav from "@/components/mobile/MBankingBottomNav";
import MBankingHomeHeader from "@/components/mobile/MBankingHomeHeader";
import MBankingInfoPage from "@/components/mobile/MBankingInfoPage";
import MBankingQuickActions from "@/components/mobile/MBankingQuickActions";
import MBankingSavingsCard from "@/components/mobile/MBankingSavingsCard";
import MBankingTransactionHistoryEmpty from "@/components/mobile/MBankingTransactionHistoryEmpty";

type MBankingHomeScreen = "home" | "info";

export default function MBankingHome() {
  const [screen, setScreen] = React.useState<MBankingHomeScreen>("home");

  if (screen === "info") {
    return <MBankingInfoPage onBack={() => setScreen("home")} />;
  }

  return (
    <div className="flex min-h-full flex-col bg-white">
      <main className="min-h-0 flex-1 bg-white">
        <MBankingHomeHeader />
        <MBankingSavingsCard />
        <MBankingQuickActions onAccountInfoClick={() => setScreen("info")} />
        <MBankingTransactionHistoryEmpty />
      </main>

      <MBankingBottomNav activeTab="home" />
    </div>
  );
}