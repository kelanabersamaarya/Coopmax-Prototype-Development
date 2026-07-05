import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

export default function NewMBankingSuccessActionTile({
  label,
  icon: Icon,
  onClick,
  disabled = false,
  active = false,
}: {
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex min-w-0 flex-col items-center text-center transition active:scale-[0.98]",
        disabled ? "cursor-not-allowed opacity-55 active:scale-100" : "",
      )}
      aria-label={label}
      title={label}
    >
      <span
        className={cn(
          "grid h-[72px] w-[72px] place-items-center rounded-[10px]",
          active ? "bg-[#33AA00]" : "bg-[#479DF4]",
          "text-white",
        )}
      >
        <Icon className="h-[28px] w-[28px] text-white" strokeWidth={2.4} />
      </span>

      <span className="mt-[8px] text-[14px] font-normal leading-tight tracking-[-0.02em] text-black">
        {label}
      </span>
    </button>
  );
}