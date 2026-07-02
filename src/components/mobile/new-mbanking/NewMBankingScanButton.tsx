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
        "bg-[#479DF4] text-white shadow-[0_8px_20px_rgba(71,157,244,0.26)]",
        "transition active:scale-[0.96]",
      )}
      aria-label="Scan"
      title="Scan"
    >
      <ScanLine className="h-[35px] w-[35px] text-white" strokeWidth={2.7} />
    </button>
  );
}