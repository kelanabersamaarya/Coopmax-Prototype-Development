"use client";

import { cn } from "@/lib/utils";

type SavingsAccountInfoListProps = {
  accountNo: string;
  customerName: string;
  productType: string;
  balance: string;
  className?: string;
};

const infoRows = [
  { key: "accountNo", label: "No. Rekening" },
  { key: "customerName", label: "Nama Nasabah" },
  { key: "productType", label: "Tipe Produk" },
  { key: "balance", label: "Saldo" },
] as const;

export default function SavingsAccountInfoList({
  accountNo,
  customerName,
  productType,
  balance,
  className,
}: SavingsAccountInfoListProps) {
  const values = {
    accountNo,
    customerName,
    productType,
    balance,
  };

  return (
    <div
      className={cn(
        "w-full border-t border-slate-200 bg-white py-1",
        className,
      )}
    >
      {infoRows.map((row) => (
        <div
          key={row.key}
          className="grid min-h-[38px] grid-cols-[minmax(150px,220px)_18px_minmax(0,1fr)] items-center gap-2 border-b border-slate-100 py-2 text-[14px]"
        >
          <span className="min-w-0 text-left font-normal leading-snug text-[#002060]">
            {row.label}
          </span>

          <span className="text-center font-normal text-[#64748B]">:</span>

          <span className="min-w-0 break-words text-left font-normal leading-snug text-slate-900">
            {values[row.key]}
          </span>
        </div>
      ))}
    </div>
  );
}