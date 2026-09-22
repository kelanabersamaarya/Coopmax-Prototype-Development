import type { BillingStatus } from "@/domain/loans/types/billing";

const statusStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "text-[#BA7517] bg-[#BA7517]/15",
  Lunas: "text-[#4CAF50] bg-[#4CAF50]/15",
  Terlambat: "text-[#FF4C4C] bg-[#FF4C4C]/15",
  "Dibayar Sebagian": "text-[#FF9800] bg-[#FF9800]/15",
};

export default function BillingStatusBadge({ status }: { status: BillingStatus }) {
  return (
    <span
      className={`mr-2 inline-flex min-h-7 items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-bold leading-[1.15] ${statusStyles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
