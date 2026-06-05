"use client";

import { BarChart3, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorTransactionIcon from "@/components/mobile/EKolektorTransactionIcon";

type EKolektorTab = "home" | "transaction" | "report";

const navItems = [
  {
    id: "home" as const,
    label: "Beranda",
    icon: Home,
    hideLabel: false,
  },
  {
    id: "transaction" as const,
    label: "Transaksi",
    icon: EKolektorTransactionIcon,
    hideLabel: true,
  },
  {
    id: "report" as const,
    label: "Laporan",
    icon: BarChart3,
    hideLabel: false,
  },
];

function AndroidNavigationBar({ onBack }: { onBack?: () => void }) {
  return (
    <div className="h-[32px] bg-[#05070d] px-6">
      <div className="flex h-full items-center justify-center gap-[54px]">
        <button
          type="button"
          onClick={onBack}
          className="grid h-7 w-9 place-items-center rounded-full transition active:bg-white/10"
          aria-label="Kembali"
          title="Kembali"
        >
          <span
            className="block h-0 w-0 border-y-[5px] border-r-[9px] border-y-transparent border-r-[#f8fafc]"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className="grid h-7 w-9 place-items-center rounded-full transition active:bg-white/10"
          aria-label="Home Android"
          title="Home"
        >
          <span
            className="block h-[9px] w-[9px] rounded-full border-[1.6px] border-[#f8fafc]"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className="grid h-7 w-9 place-items-center rounded-full transition active:bg-white/10"
          aria-label="Recent apps"
          title="Recent"
        >
          <span
            className="block h-[9px] w-[9px] rounded-[1.5px] border-[1.6px] border-[#f8fafc]"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}

export default function EKolektorBottomNav({
  activeTab = "home",
  onHomeClick,
  onTransactionClick,
  onReportClick,
  onAndroidBack,
}: {
  activeTab?: EKolektorTab;
  onHomeClick?: () => void;
  onTransactionClick?: () => void;
  onReportClick?: () => void;
  onAndroidBack?: () => void;
}) {
  function handleClick(tab: EKolektorTab) {
    if (tab === "home") onHomeClick?.();
    if (tab === "transaction") onTransactionClick?.();
    if (tab === "report") onReportClick?.();
  }

  return (
    <div className="sticky bottom-0 z-40 shrink-0">
      <nav className="bg-white px-5 pb-[7px] pt-[6px] shadow-[0_-8px_22px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-3 items-end">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;
            const isTransaction = item.id === "transaction";

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleClick(item.id)}
                className={cn(
                  "flex min-w-0 flex-col items-center justify-end",
                  item.hideLabel ? "gap-0 pb-[2px]" : "gap-[3px]",
                  "rounded-[14px] px-1 py-0.5 transition active:scale-[0.98]",
                  isActive ? "text-[#004FC7]" : "text-[#A5A5A5]",
                )}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-full transition",
                    isTransaction
                      ? "h-[47px] w-[47px] bg-transparent"
                      : "h-[27px] w-[27px] bg-transparent",
                  )}
                >
                  <Icon
                    className={cn(
                      isTransaction
                        ? "h-[47px] w-[47px]"
                        : isActive
                          ? "h-[20px] w-[20px] text-[#004FC7]"
                          : "h-[20px] w-[20px] text-[#A5A5A5]",
                    )}
                  />
                </span>

                {!item.hideLabel ? (
                  <span
                    className={cn(
                      "truncate text-[10px] leading-none tracking-tight",
                      isActive ? "font-extrabold" : "font-semibold",
                    )}
                  >
                    {item.label}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </nav>

      <AndroidNavigationBar onBack={onAndroidBack} />
    </div>
  );
}