import type { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type LoanProductsTableHeaderLabelProps = {
  children: ReactNode;
  sortable?: boolean;
  className?: string;
};

export default function LoanProductsTableHeaderLabel({
  children,
  sortable = true,
  className,
}: LoanProductsTableHeaderLabelProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <div className="leading-[1.05]">{children}</div>
      {sortable ? (
        <span className="inline-flex flex-col leading-none text-slate-900/80">
          <ChevronUp className="-mb-0.5 h-3.5 w-3.5" />
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </div>
  );
}
