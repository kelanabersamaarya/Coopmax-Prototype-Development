"use client";

import { FileText, Home, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Beranda",
    icon: Home,
    active: true,
    hideLabel: false,
  },
  {
    label: "Transaksi",
    icon: ReceiptText,
    active: false,
    hideLabel: true,
  },
  {
    label: "Laporan",
    icon: FileText,
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

          return (
            <button
              key={item.label}
              type="button"
              className={cn(
                "flex min-w-0 flex-col items-center justify-end",
                item.hideLabel ? "gap-0 pb-[15px]" : "gap-[5px]",
                "rounded-[14px] px-1 py-1 transition",
                item.active ? "text-[#004FC7]" : "text-[#A5A5A5]",
              )}
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              <span
                className={cn(
                  "inline-flex h-[34px] w-[34px] items-center justify-center rounded-full transition",
                  item.active ? "bg-[#004FC7] text-white" : "bg-transparent",
                )}
              >
                <Icon
                  className={cn(
                    item.active ? "h-[18px] w-[18px]" : "h-[21px] w-[21px]",
                  )}
                  strokeWidth={item.active ? 2.8 : 2.35}
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