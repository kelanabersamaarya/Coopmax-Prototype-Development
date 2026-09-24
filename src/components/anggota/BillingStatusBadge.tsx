import type { BillingStatus } from "@/domain/loans/types/billing";

const statusStyles: Record<BillingStatus, string> = {
  "Belum Dibayar": "text-black",
  Lunas: "text-black",
  "Jatuh Tempo": "text-red-600",
  Terlambat: "text-red-600",
  "Dibayar Sebagian": "text-black",
};

export default function BillingStatusBadge({ status }: { status: BillingStatus }) {
  return (
    <span
      className={`mr-2 inline-flex min-h-7 items-center whitespace-nowrap bg-transparent px-0 py-0.5 text-[12px] font-bold leading-[1.15] ${statusStyles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
