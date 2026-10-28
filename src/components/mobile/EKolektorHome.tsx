"use client";

import * as React from "react";
import EKolektorBottomNav from "@/components/mobile/EKolektorBottomNav";
import EKolektorExitConfirmModal from "@/components/mobile/EKolektorExitConfirmModal";
import EKolektorHomeHeader from "@/components/mobile/EKolektorHomeHeader";
import EKolektorHomeSummaryCards from "@/components/mobile/EKolektorHomeSummaryCards";
import EKolektorProfilePage from "@/components/mobile/EKolektorProfilePage";
import EKolektorSyncInfoCard from "@/components/mobile/EKolektorSyncInfoCard";
import EKolektorTodayHistorySection from "@/components/mobile/EKolektorTodayHistorySection";
import EKolektorTransactionDetailModal from "@/components/mobile/EKolektorTransactionDetailModal";
import type { EKolektorTodayTransaction } from "@/components/mobile/e-kolektor-types";

export default function EKolektorHome({
  onLogout,
  onOpenTransactions,
  onOpenReport,
  onBiometricEnabled,
  biometricEnabled,
  onBiometricChange,
  biometricType = "fingerprint",
  transactions = [],
}: {
  onLogout: () => void;
  onOpenTransactions: () => void;
  onOpenReport: () => void;
  onBiometricEnabled: () => void;
  biometricEnabled: boolean;
  onBiometricChange: (value: boolean) => void;
  biometricType?: "fingerprint" | "face";
  transactions?: EKolektorTodayTransaction[];
}) {
  const [exitOpen, setExitOpen] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<EKolektorTodayTransaction | null>(null);

  if (showProfile) {
    return (
      <EKolektorProfilePage
      onBack={() => setShowProfile(false)}
      onLogout={onLogout}
      onBiometricEnabled={onBiometricEnabled}
      biometricEnabled={biometricEnabled}
      onBiometricChange={onBiometricChange}
      biometricType={biometricType}
    />
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <EKolektorHomeHeader onProfileClick={() => setShowProfile(true)} />
        <EKolektorHomeSummaryCards />
        <EKolektorSyncInfoCard />
        <EKolektorTodayHistorySection
          transactions={transactions}
          onSelectTransaction={setSelectedTransaction}
        />
      </div>

      <EKolektorBottomNav
        activeTab="home"
        onHomeClick={() => {}}
        onTransactionClick={onOpenTransactions}
        onReportClick={onOpenReport}
        onAndroidBack={() => setExitOpen(true)}
      />

      {selectedTransaction ? (
        <EKolektorTransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      ) : null}

      <EKolektorExitConfirmModal
        open={exitOpen}
        onCancel={() => setExitOpen(false)}
        onExit={() => {
          setExitOpen(false);
          onLogout();
        }}
      />
    </div>
  );
}