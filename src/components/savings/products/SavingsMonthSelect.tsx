"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const monthOptions = Array.from({ length: 13 }).map((_, index) =>
  String(index),
);

export default function SavingsMonthSelect({
  value,
  onValueChange,
  placeholder = "Pilih Jumlah",
  triggerClassName,
  contentClassName,
  itemClassName,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}) {
  const hasValue = value.trim().length > 0;

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
          aria-label="Hapus pilihan jumlah bulan"
          title="Hapus pilihan"
        >
          <X className="h-4 w-4" strokeWidth={3} />
        </button>
      ) : null}

      <Select
        value={hasValue ? value : undefined}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          className={cn(
            "h-[30px] rounded-[5px] border-slate-300 bg-white px-3",
            "text-[14px] font-normal shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "[&>svg]:text-slate-500",
            triggerClassName,
            hasValue ? "!pl-10 !text-black" : "text-[#64748B]",
          )}
        >
          <span className="block min-w-0 flex-1 truncate text-left">
            {hasValue ? value : placeholder}
          </span>
        </SelectTrigger>

        <SelectContent
          className={cn(
            "rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
            "[&_[data-radix-select-item-indicator]]:hidden",
            "[&_[data-slot=select-item-indicator]]:hidden",
            "[&>span.absolute.right-2]:hidden",
            "[&_[data-radix-collection-item]]:pl-4",
            "[&_[data-radix-collection-item]]:pr-4",
            "[&_[data-radix-select-viewport]]:max-h-[170px]",
            "[&_[data-radix-select-viewport]]:overflow-y-auto",
            "[&_[data-radix-select-viewport]]:[scrollbar-gutter:stable]",
            "[&_[data-radix-select-viewport]::-webkit-scrollbar]:w-2",
            "[&_[data-radix-select-viewport]::-webkit-scrollbar-track]:bg-slate-100",
            "[&_[data-radix-select-viewport]::-webkit-scrollbar-thumb]:rounded-full",
            "[&_[data-radix-select-viewport]::-webkit-scrollbar-thumb]:bg-slate-400",
            "[&_[data-radix-select-viewport]::-webkit-scrollbar-thumb:hover]:bg-slate-500",
            contentClassName,
          )}
        >
          {monthOptions.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className={cn(
                "rounded-none px-4 py-2.5 text-[14px] font-normal text-black",
                "hover:bg-violet-600 hover:text-white",
                "focus:bg-violet-600 focus:text-white",
                "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
                "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
                itemClassName,
              )}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}