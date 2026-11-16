"use client";

import { Image, QrCode, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type ScanActionId = "flash" | "qr" | "media";

const actions = [
  {
    id: "flash" as const,
    label: "Nyalakan Flash",
    icon: Zap,
    frameClassName: "bg-[#084BC8]",
    activeFrameClassName: "bg-[#063A9B]",
  },
  {
    id: "qr" as const,
    label: "Tunjukan Kode QR",
    icon: QrCode,
    frameClassName: "bg-[#084BC8]",
    activeFrameClassName: "bg-[#063A9B]",
  },
  {
    id: "media" as const,
    label: "Unggah QRIS",
    icon: Image,
    frameClassName: "bg-[#084BC8]",
    activeFrameClassName: "bg-[#063A9B]",
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
                "border border-white/30 text-white",
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