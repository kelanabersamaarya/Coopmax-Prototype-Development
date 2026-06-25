"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SavingsInterCustomerTransferFields({
  className,
}: {
  className?: string;
}) {
  const [limitMinimal, setLimitMinimal] = React.useState("0,00");
  const [limitMaksimal, setLimitMaksimal] = React.useState("0,00");
  const [limitTransfer, setLimitTransfer] = React.useState("0,00");

  const inputClassName = cn(
    "h-[30px] rounded-[5px] border-slate-300 bg-white px-3",
    "text-[14px] font-normal text-[#334155] shadow-none",
    "placeholder:text-[#64748B]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const labelClassName = "text-[14px] font-normal leading-snug text-[#002060]";
  const requiredMark = <span className="text-rose-600">*</span>;

  return (
    <div className={cn("mt-4 grid gap-[20px]", className)}>
      <div className="grid gap-2 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
        <label className={labelClassName}>
          Minimal Transfer{requiredMark}
        </label>
        <Input
          value={limitMinimal}
          onChange={(event) => setLimitMinimal(event.target.value)}
          className={inputClassName}
          inputMode="decimal"
        />
      </div>

      <div className="grid gap-2 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
        <label className={labelClassName}>
          Maksimal Transfer{requiredMark}
        </label>
        <Input
          value={limitMaksimal}
          onChange={(event) => setLimitMaksimal(event.target.value)}
          className={inputClassName}
          inputMode="decimal"
        />
      </div>

      <div className="grid gap-2 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
        <label className={labelClassName}>
          Limit Transfer{requiredMark}
        </label>
        <Input
          value={limitTransfer}
          onChange={(event) => setLimitTransfer(event.target.value)}
          className={inputClassName}
          inputMode="decimal"
        />
      </div>
    </div>
  );
}