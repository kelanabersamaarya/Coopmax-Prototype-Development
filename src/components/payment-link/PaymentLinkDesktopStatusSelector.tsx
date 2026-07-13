"use client";

import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PaymentLinkDesktopStatus } from "@/components/payment-link/payment-link-status-types";

const statusOptions: Array<{
  id: PaymentLinkDesktopStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClassName: string;
  iconClassName: string;
}> = [
  {
    id: "berhasil",
    label: "Berhasil",
    icon: CheckCircle2,
    activeClassName: "bg-emerald-50 text-emerald-900 ring-emerald-200",
    iconClassName: "bg-emerald-600 text-white",
  },
  {
    id: "gagal",
    label: "Gagal",
    icon: XCircle,
    activeClassName: "bg-rose-50 text-rose-900 ring-rose-200",
    iconClassName: "bg-rose-600 text-white",
  },
  {
    id: "kedaluwarsa",
    label: "Kedaluwarsa",
    icon: Clock3,
    activeClassName: "bg-amber-50 text-amber-950 ring-amber-200",
    iconClassName: "bg-amber-500 text-white",
  },
];

export default function PaymentLinkDesktopStatusSelector({
  value,
  onChange,
  className,
}: {
  value: PaymentLinkDesktopStatus;
  onChange: (value: PaymentLinkDesktopStatus) => void;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "rounded-3xl border-slate-200/70 bg-white/90 p-3 shadow-sm backdrop-blur md:p-4",
        className,
      )}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {statusOptions.map((option) => {
          const Icon = option.icon;
          const active = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "flex min-h-[58px] w-full items-center justify-center gap-3 rounded-2xl px-4 py-3 text-center ring-1 transition",
                active
                  ? option.activeClassName
                  : "bg-white text-slate-800 ring-slate-200 hover:bg-slate-50",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={cn(
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  active ? option.iconClassName : "bg-slate-100 text-slate-500",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>

              <span className="text-[14px] font-extrabold leading-tight">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}