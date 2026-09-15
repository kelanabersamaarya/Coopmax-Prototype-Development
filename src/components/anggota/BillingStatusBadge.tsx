import type { BillingStatus } from "@/domain/loans/types/billing";

const statusStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "bg-[#FF4C4C] text-white",
  Lunas: "bg-[#4CAF50] text-white",
  Terlambat: "bg-[#FF9800] text-white",
  "Dibayar Sebagian": "bg-[#BA7517] text-white",
};

export default function BillingStatusBadge({ status }: { status: BillingStatus }) {
  return (
    <span
      className={`inline-flex min-h-8 items-center whitespace-nowrap rounded-[5px] px-2.5 py-1 text-[13px] font-bold leading-[1.15] shadow-sm ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
