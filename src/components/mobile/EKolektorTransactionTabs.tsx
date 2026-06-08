"use client";

import * as React from "react";
import { HandCoins, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorSimpananAsset from "@/components/mobile/EKolektorSimpananAsset";
import EKolektorPinjamanInfo from "@/components/mobile/EKolektorPinjamanInfo";

type TransactionTab = "simpanan" | "pinjaman";

export default function EKolektorTransactionTabs({
  className,
  onSelectLoan,
}: {
  className?: string;
  onSelectLoan?: (accountNo: string) => void;
}) {
  const [activeTab, setActiveTab] = React.useState<TransactionTab>("simpanan");

  const tabs = [
    {
      id: "simpanan" as const,
      label: "Simpanan",
      icon: PiggyBank,
    },
    {
      id: "pinjaman" as const,
      label: "Pinjaman",
      icon: HandCoins,
    },
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="flex w-full items-start gap-[28px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const colorClass = isActive ? "text-[#004FC7]" : "text-black";

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="relative flex min-w-0 items-center gap-[6px] pb-[8px] transition active:scale-[0.98]"
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn("h-[18px] w-[18px] shrink-0", colorClass)}
                strokeWidth={2.8}
              />

              <span
                className={cn(
                  "text-[12px] font-extrabold leading-none tracking-tight",
                  colorClass,
                )}
              >
                {tab.label}
              </span>

              {isActive ? (
                <span className="absolute bottom-0 left-1/2 h-[3px] w-[24px] -translate-x-1/2 rounded-full bg-[#004FC7]" />
              ) : null}
            </button>
          );
        })}
      </div>

      {activeTab === "simpanan" ? <EKolektorSimpananAsset /> : null}
      {activeTab === "pinjaman" ? (
        <EKolektorPinjamanInfo onSelect={onSelectLoan} />
      ) : null}
    </div>
  );
}