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

function AndroidNavigationBar() {
  return (
    <div className="h-[27px] bg-[#05070d] px-10">
      <div className="flex h-full items-center justify-between">
        <span
          className="block h-0 w-0 border-y-[5px] border-r-[9px] border-y-transparent border-r-[#f8fafc]"
          aria-hidden="true"
        />
        <span
          className="block h-[9px] w-[9px] rounded-full border-[1.6px] border-[#f8fafc]"
          aria-hidden="true"
        />
        <span
          className="block h-[9px] w-[9px] rounded-[1.5px] border-[1.6px] border-[#f8fafc]"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function EKolektorBottomNav() {
  return (
    <div className="sticky bottom-0 z-40 shrink-0">
      <nav className="bg-white px-5 pb-[7px] pt-[6px] shadow-[0_-8px_22px_rgba(15,23,42,0.08)]">
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
                  item.hideLabel ? "gap-0 pb-[2px]" : "gap-[3px]",
                  "rounded-[14px] px-1 py-0.5 transition",
                  item.active ? "text-[#004FC7]" : "text-[#A5A5A5]",
                )}
                aria-label={item.label}
                aria-current={item.active ? "page" : undefined}
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
                        : item.active
                          ? "h-[20px] w-[20px] text-[#004FC7]"
                          : "h-[20px] w-[20px] text-[#A5A5A5]",
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

      <AndroidNavigationBar />
    </div>
  );
}