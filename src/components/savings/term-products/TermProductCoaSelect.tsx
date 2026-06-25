"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TermProductCoaSelect({
  value,
  onValueChange,
  placeholder,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}) {
  const hasValue = value.trim().length > 0;

  const options = [
    "1.1.1.3.2 - Simpanan Berjangka",
    "4.1.1.1 - Pendapatan Bunga",
    "4.1.1.2 - Pendapatan Pinalty",
    "2.1.3.1 - Hutang Pajak Bunga",
    "5.1.1.1 - Beban Jasa Simpanan",
  ];

  function clearValue(event: React.MouseEvent | React.PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    onValueChange("");
  }

  return (
    <div className="relative">
      {hasValue ? (
        <button
          type="button"
          onPointerDown={clearValue}
          onClick={clearValue}
          className={cn(
            "absolute left-3 top-1/2 z-20 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center",
            "rounded-[4px] text-red-600 transition hover:bg-red-50",
            "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          aria-label="Hapus pilihan"
          title="Hapus pilihan"
        >
          <X className="h-4 w-4" strokeWidth={3} />
        </button>
      ) : null}

      <Select value={hasValue ? value : undefined} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(
            "h-[30px] rounded-[5px] border-slate-300 bg-white px-3",
            "text-[14px] font-normal shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            hasValue ? "pl-10 text-black" : "text-[#64748B]",
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          className={cn(
            "rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
            "[&_[data-radix-select-item-indicator]]:hidden",
            "[&_[data-slot=select-item-indicator]]:hidden",
            "[&>span.absolute.right-2]:hidden",
            "[&_[data-radix-collection-item]]:pl-4",
            "[&_[data-radix-collection-item]]:pr-4",
          )}
        >
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className={cn(
                "rounded-none px-4 py-2.5 text-[14px] font-normal text-black",
                "hover:bg-violet-600 hover:text-white",
                "focus:bg-violet-600 focus:text-white",
                "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
                "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
              )}
            >
              {option.replace(/^[\d.]+\s*-\s*/, "")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}