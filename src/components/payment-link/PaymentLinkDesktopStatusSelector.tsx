"use client";

import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PaymentLinkDesktopStatus } from "@/components/payment-link/payment-link-status-types";

const statusOptions: Array<{
  id: PaymentLinkDesktopStatus;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClassName: string;
  iconClassName: string;
}> = [
  {
    id: "berhasil",
    label: "Berhasil",
    description: "Pembayaran angsuran berhasil diproses.",
    icon: CheckCircle2,
    activeClassName: "bg-emerald-50 text-emerald-900 ring-emerald-200",
    iconClassName: "bg-emerald-600 text-white",
  },
  {
    id: "gagal",
    label: "Gagal",
    description: "Pembayaran angsuran gagal diproses.",
    icon: XCircle,
    activeClassName: "bg-rose-50 text-rose-900 ring-rose-200",
    iconClassName: "bg-rose-600 text-white",
  },
  {
    id: "kedaluwarsa",
    label: "Kedaluwarsa",
    description: "Payment Link sudah melewati batas waktu.",
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
        "rounded-3xl border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5",
        className,
      )}
    >
      <div className="text-[15px] font-extrabold tracking-tight text-slate-900">
        Status Pembayaran
      </div>
      <div className="mt-1 text-[13px] font-medium leading-relaxed text-slate-600">
        Pilih status untuk melihat tampilan desktop Payment Link.
      </div>

      <div className="mt-5 grid gap-3">
        {statusOptions.map((option) => {
          const Icon = option.icon;
          const active = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-2xl p-4 text-left ring-1 transition",
                active
                  ? option.activeClassName
                  : "bg-white text-slate-800 ring-slate-200 hover:bg-slate-50",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  active ? option.iconClassName : "bg-slate-100 text-slate-500",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-extrabold leading-tight">
                  {option.label}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[12px] font-medium leading-relaxed",
                    active ? "opacity-80" : "text-slate-500",
                  )}
                >
                  {option.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}