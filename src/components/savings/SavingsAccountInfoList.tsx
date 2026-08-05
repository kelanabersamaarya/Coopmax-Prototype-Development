"use client";

import { cn } from "@/lib/utils";

type SavingsAccountInfoListProps = {
  accountNo: string;
  customerName: string;
  productType: string;
  balance: string;
  className?: string;
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="text-[14px] font-normal leading-[1.35] text-[#1f2937]">
    <span>{label}</span>
    <span className="mx-1">:</span>
    <span>{value}</span>
  </div>
);

export default function SavingsAccountInfoList({
  accountNo,
  customerName,
  productType,
  balance,
  className,
}: SavingsAccountInfoListProps) {
  return (
    <div className={cn("grid gap-[12px] bg-white", className)}>
      <InfoRow label="No. Rekening" value={accountNo} />
      <InfoRow label="Nama Nasabah" value={customerName} />
      <InfoRow label="Tipe Produk" value={productType} />
      <InfoRow label="Saldo" value={balance} />
    </div>
  );
}