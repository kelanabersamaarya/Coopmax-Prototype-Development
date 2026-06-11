import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LoanProductActionButtonProps = {
  label: string;
  tone?: "slate" | "amber" | "sky" | "rose";
  onClick?: () => void;
  children: ReactNode;
};

export default function LoanProductActionButton({
  label,
  tone = "slate",
  onClick,
  children,
}: LoanProductActionButtonProps) {
  const toneCls: Record<string, string> = {
    slate: "text-slate-600 hover:text-slate-900",
    amber: "text-amber-600 hover:text-amber-700",
    sky: "text-sky-600 hover:text-sky-700",
    rose: "text-rose-600 hover:text-rose-700",
  };

  const cls = cn(
    "inline-flex h-8 w-8 items-center justify-center",
    "rounded-full bg-transparent ring-0 shadow-none",
    "transition-colors",
    "hover:bg-slate-900/5",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
    toneCls[tone],
  );

  if (!onClick) {
    return (
      <span className={cls} aria-label={label} title={label}>
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}
