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
        "mx-auto w-full max-w-[720px] rounded-[18px] border-slate-200/70 bg-white/90 p-2 shadow-sm backdrop-blur",
        className,
      )}
    >
      <div className="grid gap-2 sm:grid-cols-3">
        {statusOptions.map((option) => {
          const Icon = option.icon;
          const active = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[12px] px-3 py-2 text-center ring-1 transition",
                active
                  ? option.activeClassName
                  : "bg-white text-slate-800 ring-slate-200 hover:bg-slate-50",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px]",
                  active ? option.iconClassName : "bg-slate-100 text-slate-500",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>

              <span className="text-[12px] font-extrabold leading-tight">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}