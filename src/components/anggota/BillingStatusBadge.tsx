import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Circle,
  CircleDollarSign,
  type LucideIcon,
} from "lucide-react";
import type { BillingStatus } from "@/domain/loans/types/billing";

const statusStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "text-slate-700 font-normal",
  Lunas: "text-emerald-700 font-semibold",
  "Jatuh Tempo": "text-amber-700 bg-amber-50 font-bold",
  Terlambat: "text-red-600 bg-[#FF4C4C]/10 font-bold",
  "Dibayar Sebagian": "text-blue-700 font-semibold",
};

const statusIcons: Record<BillingStatus, LucideIcon> = {
  "Belum Dibayar": Circle,
  Lunas: CheckCircle2,
  "Jatuh Tempo": CalendarClock,
  Terlambat: AlertTriangle,
  "Dibayar Sebagian": CircleDollarSign,
};

export default function BillingStatusBadge({ status }: { status: BillingStatus }) {
  const StatusIcon = statusIcons[status];

  return (
    <span
      className={`mr-2 inline-flex min-h-7 items-center gap-1.5 whitespace-nowrap rounded-[5px] px-2.5 py-0.5 text-[12px] leading-[1.15] ${statusStyles[status]}`}
    >
      <StatusIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} aria-hidden="true" />
      {status.toUpperCase()}
    </span>
  );
}
