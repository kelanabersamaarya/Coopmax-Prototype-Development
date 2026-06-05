"use client";

import EKolektorHomeHeader from "@/components/mobile/EKolektorHomeHeader";
import EKolektorHomeSummaryCards from "@/components/mobile/EKolektorHomeSummaryCards";

export default function EKolektorHome() {
  return (
    <div className="min-h-[980px] bg-[#f4f4f4]">
      <EKolektorHomeHeader />
      <EKolektorHomeSummaryCards />

      <div className="min-h-[720px] rounded-t-[34px] bg-[#f4f4f4]" />
    </div>
  );
}