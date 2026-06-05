"use client";

import EKolektorHomeHeader from "@/components/mobile/EKolektorHomeHeader";
import EKolektorHomeSummaryCards from "@/components/mobile/EKolektorHomeSummaryCards";

export default function EKolektorHome() {
  return (
    <div className="min-h-[980px] bg-white">
      <EKolektorHomeHeader />
      <EKolektorHomeSummaryCards />

      <div className="min-h-[720px] bg-white" />
    </div>
  );
}