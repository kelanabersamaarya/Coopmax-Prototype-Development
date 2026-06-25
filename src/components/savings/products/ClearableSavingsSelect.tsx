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

export default function ClearableSavingsSelect({
  value,
  onValueChange,
  options,
  placeholder,
  triggerClassName,
  contentClassName,
  itemClassName,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder: string;
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
          aria-label="Hapus pilihan"
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
            triggerClassName,
            hasValue ? "!pl-10 !text-black" : "text-[#64748B]",
          )}
        >
          <span
            className={cn(
              "block min-w-0 flex-1 truncate text-left text-[14px] font-normal",
              hasValue ? "text-black" : "text-[#64748B]",
            )}
          >
            {hasValue ? value : placeholder}
          </span>
        </SelectTrigger>

        <SelectContent className={contentClassName}>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className={itemClassName}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}