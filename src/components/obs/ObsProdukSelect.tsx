"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ObsProdukSelect({
  value,
  onValueChange,
  options,
  className,
  triggerClassName,
  contentClassName,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: string[];
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}) {
  const noPurpleRing = cn(
    "outline-none",
    "focus:outline-none focus:ring-0 focus:ring-offset-0",
    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
    "data-[state=open]:ring-0 data-[state=open]:ring-offset-0",
    // jaga border tetap netral saat fokus/open
    "focus:border-slate-300 focus-visible:border-slate-300",
  );

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn(noPurpleRing, triggerClassName, className)}>
        <SelectValue />
      </SelectTrigger>

      <SelectContent
        className={cn(
          "rounded-[10px] border-slate-200 p-1 shadow-xl",
          // Pastikan tidak ada checkmark indicator yg muncul/nyisihin space
          "[&_[data-radix-select-item-indicator]]:hidden",
          "[&_[data-slot=select-item-indicator]]:hidden",
          "[&>span.absolute.right-2]:hidden",
          // Pastikan padding item aman (tidak ada ruang reserved di kiri)
          "[&_[data-radix-collection-item]]:pl-3 [&_[data-radix-collection-item]]:pr-3",
          "[&_[data-radix-collection-item]]:rounded-[8px]",
          contentClassName,
        )}
      >
        {options.map((opt) => (
          <SelectItem
            key={opt}
            value={opt}
            className={cn(
              "rounded-[8px]",
              // jangan sisakan ruang indicator
              "pl-3 pr-3",
              "[&_[data-radix-select-item-indicator]]:hidden",
              "[&_[data-slot=select-item-indicator]]:hidden",
              "[&>span.absolute.right-2]:hidden",
            )}
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}