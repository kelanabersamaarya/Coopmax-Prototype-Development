"use client";

import { Image, QrCode, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type ScanActionId = "flash" | "qr" | "media";

const actions = [
  {
    id: "flash" as const,
    label: "Nyalakan Flash",
    icon: Zap,
    frameClassName: "bg-[#F59E0B]",
    activeFrameClassName: "bg-[#D97706]",
  },
  {
    id: "qr" as const,
    label: "Kode QR",
    icon: QrCode,
    frameClassName: "bg-[#479DF4]",
    activeFrameClassName: "bg-[#2563EB]",
  },
  {
    id: "media" as const,
    label: "Pilih Dari Media",
    icon: Image,
    frameClassName: "bg-[#8B5CF6]",
    activeFrameClassName: "bg-[#7C3AED]",
  },
];

export default function NewMBankingScanBottomActions({
  active = null,
  onChange,
}: {
  active?: ScanActionId | null;
  onChange?: (value: ScanActionId) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-[12px]">
      {actions.map((action) => {
        const Icon = action.icon;
        const isActive = active === action.id;

        return (
          <div key={action.id} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => onChange?.(action.id)}
              className={cn(
                "grid h-[44px] w-[44px] place-items-center rounded-[14px]",
                "border border-white/30 text-white shadow-[0_8px_18px_rgba(15,23,42,0.12)]",
                "transition active:scale-[0.97]",
                isActive ? action.activeFrameClassName : action.frameClassName,
              )}
              aria-label={action.label}
              aria-current={isActive ? "true" : undefined}
            >
              <Icon className="h-[22px] w-[22px] text-white" strokeWidth={2.7} />
            </button>

            <div className="mt-[8px] text-center text-[12px] font-normal leading-tight text-black">
              {action.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}