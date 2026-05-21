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
        // Pastikan tidak ada ruang/ikon indicator yang mengganggu
        "pl-3 pr-3",
        // Hide Radix/shadcn indicator node apapun yang dipakai versi komponen ini
        "[&_[data-slot=select-item-indicator]]:hidden",
        "[&_[data-radix-select-item-indicator]]:hidden",
        // Fallback: sembunyikan elemen indicator yang biasanya absolute/right-2
        "[&>span.absolute.right-2]:hidden",
        className,
      )}
    >
      {children}
    </SelectItem>
  );
}