"use client";

import { cn } from "@/lib/utils";

export default function SavingsTogglePill({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[27px] w-[62px] shrink-0 items-center rounded-full px-[3px]",
        "transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        checked ? "bg-[#635BFF]" : "bg-[#A89BFF]",
      )}
      aria-pressed={checked}
    >
      <span
        className={cn(
          "absolute text-[10px] font-bold leading-none text-white transition",
          checked ? "left-[9px]" : "right-[9px]",
        )}
      >
        {checked ? "ON" : "OFF"}
      </span>

      <span
        className={cn(
          "relative z-10 h-[21px] w-[21px] rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[35px]" : "translate-x-0",
        )}
      />
    </button>
  );
}