import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SavingsProductActionButtonProps = {
  label: string;
  tone?: "slate" | "amber" | "sky" | "rose";
  onClick?: () => void;
  children: ReactNode;
};

export default function SavingsProductActionButton({
  label,
  tone = "slate",
  onClick,
  children,
}: SavingsProductActionButtonProps) {
  const toneCls: Record<string, string> = {
    slate: "text-slate-600 hover:text-slate-900",
    amber: "text-amber-600 hover:text-amber-700",
    sky: "text-sky-600 hover:text-sky-700",
    rose: "text-rose-600 hover:text-rose-700",
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center",
        "rounded-full bg-transparent ring-0 shadow-none",
        "transition-colors hover:bg-slate-900/5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
        toneCls[tone],
      )}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}