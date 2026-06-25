"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function SavingsInterCustomerTransferFields({
  className,
}: {
  className?: string;
}) {
  const [limitMinimal, setLimitMinimal] = React.useState("0,00");
  const [limitMaksimal, setLimitMaksimal] = React.useState("0,00");
  const [biayaMode, setBiayaMode] = React.useState("rp");
  const [biayaTransfer, setBiayaTransfer] = React.useState("0,00");
  const [minimalSaldo, setMinimalSaldo] = React.useState("0,00");

  const inputClassName = cn(
    "h-[30px] rounded-[5px] border-slate-300 bg-white px-3",
    "text-[14px] font-normal text-[#334155] shadow-none",
    "placeholder:text-[#64748B]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const selectTriggerClassName = cn(
    "h-[30px] rounded-[5px] border-slate-300 bg-white px-3",
    "text-[14px] font-normal text-[#64748B] shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-500",
  );

  const selectContentClassName = cn(
    "rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.right-2]:hidden",
    "[&_[data-radix-collection-item]]:pl-4",
    "[&_[data-radix-collection-item]]:pr-4",
  );

  const selectItemClassName = cn(
    "rounded-none px-4 py-2.5 text-[14px] font-normal text-black",
    "hover:bg-violet-600 hover:text-white",
    "focus:bg-violet-600 focus:text-white",
    "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
    "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
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
          Biaya Transfer{requiredMark}
        </label>
        <div className="flex items-stretch">
          <Select value={biayaMode} onValueChange={setBiayaMode}>
            <SelectTrigger
              className={cn(
                selectTriggerClassName,
                "w-[72px] rounded-r-none border-r-0",
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={selectContentClassName}>
              <SelectItem value="rp" className={selectItemClassName}>
                Rp.
              </SelectItem>
              <SelectItem value="percent" className={selectItemClassName}>
                %
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            value={biayaTransfer}
            onChange={(event) => setBiayaTransfer(event.target.value)}
            className={cn(inputClassName, "rounded-l-none")}
            inputMode="decimal"
          />
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
        <label className={labelClassName}>
          Minimal Saldo{requiredMark}
        </label>
        <Input
          value={minimalSaldo}
          onChange={(event) => setMinimalSaldo(event.target.value)}
          className={inputClassName}
          inputMode="decimal"
        />
      </div>
    </div>
  );
}