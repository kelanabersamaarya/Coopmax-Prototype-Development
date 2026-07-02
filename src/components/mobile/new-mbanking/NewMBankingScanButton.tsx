"use client";

import { ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingScanButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "grid h-[64px] w-[64px] place-items-center rounded-[15px]",
        "bg-white text-[#479DF4] shadow-[0_8px_22px_rgba(15,23,42,0.12)]",
        "ring-1 ring-white/70",
        "transition active:scale-[0.96]",
      )}
      aria-label="Scan"
      title="Scan"
    >
      <ScanLine className="h-[35px] w-[35px] text-[#479DF4]" strokeWidth={2.7} />
    </button>
  );
}