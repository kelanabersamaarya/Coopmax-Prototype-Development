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
        "grid h-[50px] w-[50px] place-items-center rounded-[15px]",
        "bg-[#479DF4] text-white",
        "transition active:scale-[0.96]",
      )}
      aria-label="Scan"
      title="Scan"
    >
      <ScanLine className="h-[28px] w-[28px] text-white" strokeWidth={2.7} />
    </button>
  );
}