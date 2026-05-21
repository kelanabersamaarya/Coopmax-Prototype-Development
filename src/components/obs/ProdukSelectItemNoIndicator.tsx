"use client";

import * as React from "react";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function ProdukSelectItemNoIndicator({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SelectItem
      value={value}
      className={cn(
        "rounded-[5px]",
        // Jangan sisakan padding untuk indicator di kanan
        "pl-3 pr-3",
        // Force: hilangkan indicator Radix/shadcn apapun (berbagai versi)
        "[&_[data-slot=select-item-indicator]]:hidden",
        "[&_[data-radix-select-item-indicator]]:hidden",
        "[&_[data-radix-select-item-indicator]]:opacity-0",
        // Fallback: beberapa versi menaruh indicator sebagai span.absolute.right-2
        "[&>span.absolute.right-2]:hidden",
        "[&>span.absolute.right-2]:opacity-0",
        // Pastikan tidak ada ruang “reserve” untuk indicator
        "[&_[data-slot=select-item-text]]:mr-0",
        className,
      )}
    >
      {children}
    </SelectItem>
  );
}