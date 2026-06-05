"use client";

import * as React from "react";
import { HandCoins, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

type TransactionTab = "simpanan" | "pinjaman";

export default function EKolektorTransactionTabs({
  className,
}: {
  className?: string;
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
    <div className={cn("flex w-full items-start gap-[34px]", className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className="relative flex min-w-0 items-center gap-[9px] pb-[12px] transition active:scale-[0.98]"
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              className={cn(
                "h-[28px] w-[28px] shrink-0",
                isActive ? "text-[#27B4DF]" : "text-black",
              )}
              strokeWidth={3}
            />

            <span
              className={cn(
                "text-[28px] font-extrabold leading-none tracking-tight",
                isActive ? "text-[#27B4DF]" : "text-black",
              )}
            >
              {tab.label}
            </span>

            {isActive ? (
              <span className="absolute bottom-0 left-[70px] h-[6px] w-[43px] rounded-full bg-[#27B4DF]" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}