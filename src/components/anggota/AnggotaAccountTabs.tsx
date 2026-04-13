"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CreditCard, Landmark, Wallet } from "lucide-react";

type TabId = "simpanan" | "deposito" | "pinjaman";

type Props = {
  active?: TabId;
  className?: string;
  onChange?: (tab: TabId) => void;
};

const tabs: Array<{
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "simpanan", label: "Simpanan", icon: Landmark },
  { id: "deposito", label: "Deposito", icon: CreditCard },
  { id: "pinjaman", label: "Pinjaman", icon: Wallet },
];

export default function AnggotaAccountTabs({
  active = "pinjaman",
  className,
  onChange,
}: Props) {
  return (
    <div className={cn("flex items-center gap-8", className)}>
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = t.id === active;

        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange?.(t.id)}
            className={cn(
              "group inline-flex items-center gap-3 rounded-2xl px-2 py-2 text-base font-semibold transition",
              isActive ? "text-violet-700" : "text-slate-500 hover:text-slate-700",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <span
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition",
                isActive
                  ? "bg-violet-50 text-violet-700 ring-violet-200"
                  : "bg-white text-slate-400 ring-slate-200 group-hover:text-slate-600",
              )}
            >
              <Icon className="h-5 w-5" />
            </span>

            <span className="tracking-tight">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}