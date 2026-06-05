"use client";

import EKolektorBottomNav from "@/components/mobile/EKolektorBottomNav";
import EKolektorHomeHeader from "@/components/mobile/EKolektorHomeHeader";
import EKolektorHomeSummaryCards from "@/components/mobile/EKolektorHomeSummaryCards";
import EKolektorSyncInfoCard from "@/components/mobile/EKolektorSyncInfoCard";

export default function EKolektorHome() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <EKolektorHomeHeader />
        <EKolektorHomeSummaryCards />
        <EKolektorSyncInfoCard />

        <div className="min-h-[720px] bg-white" />
      </div>

      <EKolektorBottomNav />
    </div>
  );
}