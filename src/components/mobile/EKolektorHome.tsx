"use client";

import * as React from "react";
import { toast } from "sonner";
import EKolektorBottomNav from "@/components/mobile/EKolektorBottomNav";
import EKolektorExitConfirmModal from "@/components/mobile/EKolektorExitConfirmModal";
import EKolektorHomeHeader from "@/components/mobile/EKolektorHomeHeader";
import EKolektorHomeSummaryCards from "@/components/mobile/EKolektorHomeSummaryCards";
import EKolektorSyncInfoCard from "@/components/mobile/EKolektorSyncInfoCard";
import EKolektorTodayHistorySection from "@/components/mobile/EKolektorTodayHistorySection";

export default function EKolektorHome({
  onLogout,
  onOpenTransactions,
}: {
  onLogout: () => void;
  onOpenTransactions: () => void;
}) {
  const [exitOpen, setExitOpen] = React.useState(false);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <EKolektorHomeHeader />
        <EKolektorHomeSummaryCards />
        <EKolektorSyncInfoCard />
        <EKolektorTodayHistorySection />
      </div>

      <EKolektorBottomNav
        activeTab="home"
        onHomeClick={() => {}}
        onTransactionClick={onOpenTransactions}
        onReportClick={() =>
          toast("Laporan (prototype)", {
            description: "Menu laporan E-Kolektor belum dibuat.",
          })
        }
        onAndroidBack={() => setExitOpen(true)}
      />

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