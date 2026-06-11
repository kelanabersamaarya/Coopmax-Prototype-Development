import * as React from "react";
import { cn } from "@/lib/utils";
import { UI } from "./loan-account-edit-options";

export default function LoanAccountEditActionIconButton({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex w-11 items-center justify-center rounded-r-[5px] bg-slate-600 text-white ring-1 ring-slate-600/20 transition hover:bg-slate-700",
        UI.h,
      )}
    >
      {icon}
    </button>
  );
}
