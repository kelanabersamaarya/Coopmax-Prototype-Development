"use client";

import { cn } from "@/lib/utils";

export default function EKolektorFeatureToggle({
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
        "relative inline-flex h-[30px] w-[54px] shrink-0 items-center rounded-full p-[3px] transition",
        checked ? "bg-[#004FC7]" : "bg-[#D8D8D8]",
      )}
      aria-pressed={checked}
    >
      <span
        className={cn(
          "h-[24px] w-[24px] rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[24px]" : "translate-x-0",
        )}
      />
    </button>
  );
}