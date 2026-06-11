import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LoanAccountRow } from "./loan-account-types";

export default function LoanAccountStatusBadge({
  status,
}: {
  status: LoanAccountRow["status"];
}) {
  const map: Record<LoanAccountRow["status"], { className: string; label: string }> = {
    "Aktif / Sudah Dicairkan": {
      className: "bg-emerald-600 text-white hover:bg-emerald-600",
      label: "Aktif / Sudah Dicairkan",
    },
    Lunas: {
      className: "bg-slate-200 text-slate-800 hover:bg-slate-200",
      label: "Lunas",
    },
    Macet: {
      className: "bg-rose-600 text-white hover:bg-rose-600",
      label: "Macet",
    },
  };

  const v = map[status];
  return (
    <Badge
      className={cn(
        "whitespace-nowrap rounded-[5px] px-2.5 py-1 text-[11px] font-normal leading-none",
        v.className,
      )}
    >
      {v.label}
    </Badge>
  );
}
