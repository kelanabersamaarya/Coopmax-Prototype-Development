"use client";

import { BarChart3, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorTransactionIcon from "@/components/mobile/EKolektorTransactionIcon";

const navItems = [
  {
    label: "Beranda",
    icon: Home,
    active: true,
    hideLabel: false,
  },
  {
    label: "Transaksi",
    icon: EKolektorTransactionIcon,
    active: false,
    hideLabel: true,
  },
  {
    label: "Laporan",
    icon: BarChart3,
    active: false,
    hideLabel: false,
  },
];

export default function EKolektorBottomNav() {
  return (
    <nav className="sticky bottom-0 z-40 shrink-0 bg-white px-5 pb-[14px] pt-[10px] shadow-[0_-8px_22px_rgba(15,23,42,0.08)]">
      <div className="grid grid-cols-3 items-end">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isTransaction = item.label === "Transaksi";

          return (
            <button
              key={item.label}
              type="button"
              className={cn(
                "flex min-w-0 flex-col items-center justify-end",
                item.hideLabel ? "gap-0 pb-[5px]" : "gap-[5px]",
                "rounded-[14px] px-1 py-1 transition",
                item.active ? "text-[#004FC7]" : "text-[#A5A5A5]",
              )}
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-full transition",
                  isTransaction
                    ? "h-[55px] w-[55px] bg-transparent"
                    : "h-[34px] w-[34px]",
                  !isTransaction && item.active
                    ? "bg-[#004FC7] text-white"
                    : !isTransaction
                      ? "bg-transparent"
                      : "",
                )}
              >
                <Icon
                  className={cn(
                    isTransaction
                      ? "h-[55px] w-[55px]"
                      : item.active
                        ? "h-[18px] w-[18px]"
                        : "h-[22px] w-[22px]",
                  )}
                />
              </span>

              {!item.hideLabel ? (
                <span
                  className={cn(
                    "truncate text-[10px] leading-none tracking-tight",
                    item.active ? "font-extrabold" : "font-semibold",
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
  );
}