"use client";

import { Clock3, Home, ReceiptText, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Beranda",
    icon: Home,
    active: true,
  },
  {
    label: "Transaksi",
    icon: ReceiptText,
    active: false,
  },
  {
    label: "Riwayat",
    icon: Clock3,
    active: false,
  },
  {
    label: "Profil",
    icon: UserRound,
    active: false,
  },
];

export default function EKolektorBottomNav() {
  return (
    <nav className="sticky bottom-0 z-40 shrink-0 border-t border-[#E6EAF1] bg-white px-4 pb-3 pt-2 shadow-[0_-6px_18px_rgba(15,23,42,0.08)]">
      <div className="grid grid-cols-4 items-end gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-1 rounded-[14px] px-1 py-1.5 transition",
                item.active ? "text-[#004FC7]" : "text-[#9A9A9A]",
              )}
              aria-current={item.active ? "page" : undefined}
            >
              <span
                className={cn(
                  "inline-flex h-[28px] w-[28px] items-center justify-center rounded-full transition",
                  item.active ? "bg-[#EAF2FF]" : "bg-transparent",
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.5} />
              </span>

              <span className="truncate text-[10px] font-semibold leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}