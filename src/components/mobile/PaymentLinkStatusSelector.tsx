"use client";

import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PaymentLinkMobileStatus = "berhasil" | "gagal" | "kedaluwarsa";

const statusOptions: Array<{
  id: PaymentLinkMobileStatus;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClassName: string;
  iconClassName: string;
}> = [
  {
    id: "berhasil",
    label: "Berhasil",
    description: "Simulasi tampilan pembayaran berhasil.",
    icon: CheckCircle2,
    activeClassName: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    iconClassName: "bg-emerald-600 text-white",
  },
  {
    id: "gagal",
    label: "Gagal",
    description: "Simulasi tampilan pembayaran gagal.",
    icon: XCircle,
    activeClassName: "bg-rose-50 text-rose-800 ring-rose-200",
    iconClassName: "bg-rose-600 text-white",
  },
  {
    id: "kedaluwarsa",
    label: "Kedaluwarsa",
    description: "Simulasi tampilan link sudah kedaluwarsa.",
    icon: Clock3,
    activeClassName: "bg-amber-50 text-amber-900 ring-amber-200",
    iconClassName: "bg-amber-500 text-white",
  },
];

export default function PaymentLinkStatusSelector({
  value,
  onChange,
  className,
}: {
  value: PaymentLinkMobileStatus;
  onChange: (value: PaymentLinkMobileStatus) => void;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "rounded-[5px] border-slate-200/70 bg-white/90 p-3 shadow-sm",
        className,
      )}
    >
      <div className="text-[13px] font-extrabold tracking-tight text-slate-900">
        Status Pembayaran
      </div>
      <div className="mt-1 text-[11px] font-medium leading-relaxed text-slate-600">
        Pilihan ini akan menentukan state tampilan mobile.
      </div>

      <div className="mt-3 grid gap-2">
        {statusOptions.map((option) => {
          const Icon = option.icon;
          const active = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-[5px] p-3 text-left ring-1 transition",
                active
                  ? option.activeClassName
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={cn(
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px]",
                  active ? option.iconClassName : "bg-slate-100 text-slate-500",
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>

              <span className="min-w-0">
                <span className="block text-[13px] font-extrabold leading-tight">
                  {option.label}
                </span>
                <span className="mt-1 block text-[11px] font-medium leading-relaxed opacity-80">
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