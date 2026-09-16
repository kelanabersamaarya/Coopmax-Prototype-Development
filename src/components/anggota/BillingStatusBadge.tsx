import type { BillingStatus } from "@/domain/loans/types/billing";

const statusStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "text-[#BA7517]",
  Lunas: "text-[#4CAF50]",
  Terlambat: "text-[#FF4C4C]",
  "Dibayar Sebagian": "text-[#FF9800]",
};

export default function BillingStatusBadge({ status }: { status: BillingStatus }) {
  return (
    <span
      className={`mr-2 inline-flex min-h-7 items-center whitespace-nowrap px-2.5 py-0.5 text-[11px] font-bold leading-[1.15] ${statusStyles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
