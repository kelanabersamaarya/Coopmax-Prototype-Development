import type { BillingStatus } from "@/domain/loans/types/billing";

const statusStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "bg-[#BA7517] text-white",
  Lunas: "bg-[#4CAF50] text-white",
  Terlambat: "bg-[#FF4C4C] text-white",
  "Dibayar Sebagian": "bg-[#FF9800] text-white",
};

export default function BillingStatusBadge({ status }: { status: BillingStatus }) {
  return (
    <span
      className={`mr-2 inline-flex min-h-7 items-center whitespace-nowrap rounded-[5px] px-2.5 py-0.5 text-[11px] font-bold leading-[1.15] shadow-sm ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
