"use client";

import { Image, QrCode, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type ScanActionId = "flash" | "qr" | "media";

const actions = [
  {
    id: "flash" as const,
    label: "Nyalakan Flash",
    icon: Zap,
  },
  {
    id: "qr" as const,
    label: "Kode QR",
    icon: QrCode,
  },
  {
    id: "media" as const,
    label: "Pilih Dari Media",
    icon: Image,
  },
];

export default function NewMBankingScanBottomActions({
  active = "qr",
  onChange,
}: {
  active?: ScanActionId;
  onChange?: (value: ScanActionId) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-[12px]">
      {actions.map((action) => {
        const Icon = action.icon;
        const isActive = active === action.id;

        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onChange?.(action.id)}
            className={cn(
              "flex h-[64px] flex-col items-center justify-center rounded-[16px]",
              "border transition active:scale-[0.97]",
              isActive
                ? "border-[#479DF4] bg-[#EEF6FF]"
                : "border-[#E6EAF0] bg-white",
            )}
            aria-label={action.label}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={cn(
                "grid h-[30px] w-[30px] place-items-center rounded-[10px]",
                isActive ? "bg-[#479DF4] text-white" : "bg-[#F2F4F7] text-[#6B7280]",
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={2.7} />
            </span>

            <span
              className={cn(
                "mt-[6px] text-[10px] font-normal leading-none",
                isActive ? "text-[#479DF4]" : "text-[#8F8F8F]",
              )}
            >
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}