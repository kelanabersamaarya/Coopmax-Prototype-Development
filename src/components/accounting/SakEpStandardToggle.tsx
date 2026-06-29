"use client";

import { cn } from "@/lib/utils";

export default function SakEpStandardToggle({
  checked = true,
}: {
  checked?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex h-[22px] w-[48px] shrink-0 items-center rounded-full px-[2px]",
        checked ? "bg-[#635BFF]" : "bg-[#A89BFF]",
      )}
      aria-label="Tetapkan SAK-EP sebagai standar aktif"
      role="switch"
      aria-checked={checked}
    >
      <span
        className={cn(
          "absolute text-[9px] font-bold leading-none text-white",
          checked ? "left-[7px]" : "right-[6px]",
        )}
      >
        {checked ? "ON" : "OFF"}
      </span>

      <span
        className={cn(
          "relative z-10 h-[18px] w-[18px] rounded-full bg-white shadow-sm",
          checked ? "translate-x-[26px]" : "translate-x-0",
        )}
      />
    </span>
  );
}