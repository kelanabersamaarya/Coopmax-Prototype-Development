"use client";

import EKolektorHomeHeader from "@/components/mobile/EKolektorHomeHeader";
import EKolektorHomeSummaryCards from "@/components/mobile/EKolektorHomeSummaryCards";
import EKolektorSyncInfoCard from "@/components/mobile/EKolektorSyncInfoCard";

export default function EKolektorHome() {
  return (
    <div className="min-h-[980px] bg-white">
      <EKolektorHomeHeader />
      <EKolektorHomeSummaryCards />
      <EKolektorSyncInfoCard />

      <div className="min-h-[720px] bg-white" />
    </div>
  );
}