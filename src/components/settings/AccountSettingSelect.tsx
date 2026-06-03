"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function AccountSettingSelect({
  value,
  onValueChange,
  options,
  placeholder = "Pilih Akun",
  triggerClassName,
  contentClassName,
  itemClassName,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
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
    <Select value={hasValue ? value : undefined} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "relative h-[44px] w-full rounded-[8px] border-slate-300 bg-white px-3 pr-12 text-left shadow-none",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          "[&>svg]:hidden",
          triggerClassName,
        )}
      >
        {hasValue ? (
          <>
            <span className="flex min-w-0 max-w-[calc(100%-2.75rem)] items-center">
              <span
                className={cn(
                  "inline-flex h-[28px] max-w-full items-center gap-2",
                  "rounded-none bg-[#635BFF] px-3 text-white",
                )}
              >
                <span
                  role="button"
                  tabIndex={-1}
                  onPointerDown={clearValue}
                  onClick={clearValue}
                  className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-white/65 transition hover:text-white"
                  aria-label="Hapus akun"
                  title="Hapus akun"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                </span>

                <span className="truncate text-[12px] font-normal leading-none">
                  {value}
                </span>
              </span>
            </span>

            <span
              role="button"
              tabIndex={-1}
              onPointerDown={clearValue}
              onClick={clearValue}
              className={cn(
                "absolute bottom-0 right-0 top-0",
                "inline-flex h-full w-11 items-center justify-center",
                "rounded-r-[8px] px-0 pb-0 pt-[9px]",
                "text-[#002060] transition hover:bg-slate-100",
              )}
              aria-label="Clear"
              title="Clear"
            >
              <X className="h-5 w-5" strokeWidth={3} />
            </span>
          </>
        ) : (
          <>
            <span className="truncate text-[12px] font-normal text-[#64748B]">
              {placeholder}
            </span>

            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 shrink-0 text-slate-500" />
          </>
        )}
      </SelectTrigger>

      <SelectContent
        className={cn(
          "w-[--radix-select-trigger-width] max-w-[--radix-select-trigger-width]",
          "overflow-hidden rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
          "[&_[data-radix-select-item-indicator]]:hidden",
          "[&_[data-slot=select-item-indicator]]:hidden",
          "[&>span.absolute.left-2]:hidden",
          "[&>span.absolute.right-2]:hidden",
          "[&_[data-radix-collection-item]]:pl-4",
          "[&_[data-radix-collection-item]]:pr-4",
          "[&_[data-radix-collection-item]]:max-w-full",
          "[&_[data-radix-collection-item]]:overflow-hidden",
          contentClassName,
        )}
      >
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className={cn(
              "rounded-none px-4 py-2.5 text-[13px] font-normal text-black",
              "transition-colors",
              "hover:bg-violet-600 hover:text-white",
              "focus:bg-violet-600 focus:text-white",
              "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
              "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
              "[&_[data-radix-select-item-indicator]]:hidden",
              "[&_[data-slot=select-item-indicator]]:hidden",
              "[&>span.absolute.left-2]:hidden",
              "[&>span.absolute.right-2]:hidden",
              itemClassName,
            )}
            title={option}
          >
            <span className="block max-w-full truncate">{option}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}