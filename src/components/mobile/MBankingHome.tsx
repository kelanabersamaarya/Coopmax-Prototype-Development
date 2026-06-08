"use client";

import * as React from "react";
import MBankingBottomNav from "@/components/mobile/MBankingBottomNav";
import MBankingHomeHeader from "@/components/mobile/MBankingHomeHeader";
import MBankingInfoPage from "@/components/mobile/MBankingInfoPage";
import MBankingLoanPage from "@/components/mobile/MBankingLoanPage";
import MBankingQuickActions from "@/components/mobile/MBankingQuickActions";
import MBankingSavingsCard from "@/components/mobile/MBankingSavingsCard";
import MBankingTransactionHistoryEmpty from "@/components/mobile/MBankingTransactionHistoryEmpty";
import MBankingExitConfirmModal from "@/components/mobile/MBankingExitConfirmModal";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

type MBankingHomeScreen = "home" | "info" | "loan";

export default function MBankingHome({
  onLogout,
  transactions = [],
  onTransactionSaved,
}: {
  onLogout?: () => void;
  transactions?: MBankingTransactionHistoryEntry[];
  onTransactionSaved?: (transaction: MBankingTransactionHistoryEntry) => void;
}) {
  const [screen, setScreen] = React.useState<MBankingHomeScreen>("home");
  const [exitOpen, setExitOpen] = React.useState(false);

  if (screen === "loan") {
    return (
      <MBankingLoanPage
        transactions={transactions}
        onBack={() => setScreen("info")}
        onPaymentSuccess={onTransactionSaved}
      />
    );
  }

  if (screen === "info") {
    return (
      <MBankingInfoPage
        onBack={() => setScreen("home")}
        onLoanClick={() => setScreen("loan")}
      />
    );
  }

  return (
    <div className="relative flex min-h-full flex-col bg-white">
      <main className="min-h-0 flex-1 bg-white">
        <MBankingHomeHeader />
        <MBankingSavingsCard />
        <MBankingQuickActions onAccountInfoClick={() => setScreen("info")} />
        <MBankingTransactionHistoryEmpty />
      </main>

      <MBankingBottomNav
        activeTab="home"
        onAndroidBack={() => setExitOpen(true)}
      />

      <MBankingExitConfirmModal
        open={exitOpen}
        onCancel={() => setExitOpen(false)}
        onExit={() => {
          setExitOpen(false);
          onLogout?.();
        }}
      />
    </div>
  );
}