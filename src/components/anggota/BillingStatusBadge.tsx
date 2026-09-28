import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Circle,
  PieChart,
  type LucideIcon,
} from "lucide-react";
import type { BillingStatus } from "@/domain/loans/types/billing";

const statusStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "text-black font-normal",
  Lunas: "text-black font-normal",
  "Jatuh Tempo": "text-black font-normal",
  Terlambat: "text-black font-normal",
  "Dibayar Sebagian": "text-black font-normal",
};

const statusIcons: Record<BillingStatus, LucideIcon> = {
  "Belum Dibayar": Circle,
  Lunas: CheckCircle2,
  "Jatuh Tempo": CalendarClock,
  Terlambat: AlertTriangle,
  "Dibayar Sebagian": PieChart,
};

const statusIconStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "text-slate-700",
  Lunas: "text-emerald-700",
  "Jatuh Tempo": "text-amber-700",
  Terlambat: "text-red-600",
  "Dibayar Sebagian": "text-blue-700",
};

export default function BillingStatusBadge({ status }: { status: BillingStatus }) {
  const StatusIcon = statusIcons[status];

  return (
    <span
      className={`mr-2 inline-flex min-h-7 items-center gap-1.5 whitespace-nowrap rounded-[5px] px-2.5 py-0.5 text-[12px] leading-[1.15] ${statusStyles[status]}`}
    >
      <StatusIcon
        className={`h-3.5 w-3.5 shrink-0 ${statusIconStyles[status]}`}
        strokeWidth={2.25}
        aria-hidden="true"
      />
      {status.toUpperCase()}
    </span>
  );
}
