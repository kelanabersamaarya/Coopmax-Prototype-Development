import type { BillingStatus } from "@/domain/loans/types/billing";

const statusStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "text-black font-normal",
  Lunas: "text-black font-normal",
  "Jatuh Tempo": "text-red-600 font-bold",
  Terlambat: "text-red-600 font-bold",
  "Dibayar Sebagian": "text-black font-normal",
};

export default function BillingStatusBadge({ status }: { status: BillingStatus }) {
  return (
    <span
      className={`mr-2 inline-flex min-h-7 items-center whitespace-nowrap bg-transparent px-0 py-0.5 text-[12px] leading-[1.15] ${statusStyles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
