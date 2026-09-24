import type { BillingStatus } from "@/domain/loans/types/billing";

const statusStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "text-[#BA7517] bg-[#BA7517]/10",
  Lunas: "text-[#4CAF50] bg-[#4CAF50]/10",
  "Jatuh Tempo": "text-[#FF4C4C] bg-[#FF4C4C]/10",
  Terlambat: "text-[#c2410c] bg-[#c2410c]/10",
  "Dibayar Sebagian": "text-[#FF9800] bg-[#FF9800]/10",
};

export default function BillingStatusBadge({ status }: { status: BillingStatus }) {
  return (
    <span
      className={`mr-2 inline-flex min-h-7 items-center whitespace-nowrap rounded-[5px] px-2.5 py-0.5 text-[12px] font-bold leading-[1.15] ${statusStyles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
