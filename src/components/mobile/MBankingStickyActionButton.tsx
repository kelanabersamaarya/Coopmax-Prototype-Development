"use client";

import { cn } from "@/lib/utils";

export default function MBankingStickyActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-30 shrink-0 bg-white px-6 pb-4 pt-3 shadow-[0_-8px_22px_rgba(15,23,42,0.08)]">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "h-[43px] w-full rounded-[9px]",
          "bg-[#004FC7] text-[14px] font-semibold text-white",
          "shadow-[0_3px_8px_rgba(0,79,199,0.22)]",
          "transition hover:bg-[#0046B3] active:translate-y-px",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
        )}
      >
        {label}
      </button>
    </div>
  );
}