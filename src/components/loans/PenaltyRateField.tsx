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
import { ChevronDown } from "lucide-react";

export type PenaltyRateMode = "rp" | "percent";

function isBlankish(v: string) {
  return (v ?? "").trim() === "";
}

function labelForMode(mode: PenaltyRateMode) {
  return mode === "rp" ? "Rp" : "%";
}

export default function PenaltyRateField({
  mode,
  onModeChange,
  value,
  onValueChange,
  size = "default",
  className,
}: {
  mode: PenaltyRateMode;
  onModeChange: (v: PenaltyRateMode) => void;
  value: string;
  onValueChange: (v: string) => void;
  size?: "default" | "compact";
  className?: string;
}) {
  const isPercent = mode === "percent";

  function handleModeChange(next: PenaltyRateMode) {
    onModeChange(next);

    if (next === "percent") {
      if (isBlankish(value) || value === "0,00" || value === "0") {
        onValueChange("0%");
      }
      return;
    }

    if (next === "rp") {
      if (isBlankish(value) || value === "0%" || value === "0") {
        onValueChange("0,00");
      }
    }
  }

  const h = size === "compact" ? "h-[30px]" : "h-11";
  const radius = size === "compact" ? "rounded-[6px]" : "rounded-2xl";
  const text = size === "compact" ? "text-[12.5px]" : "";

  const selectW = size === "compact" ? "w-[74px]" : "w-[86px]";

  const selectTriggerCls = cn(
    "relative",
    h,
    radius,
    text,
    "w-full",
    "border border-slate-200 bg-white",
    "pl-3 pr-9",
    "font-medium text-slate-900",
    "shadow-sm",
    // hilangkan ring ungu (focus)
    "outline-none",
    "focus:outline-none focus:ring-0 focus:ring-offset-0",
    "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
    // jaga border tetap abu saat focus (bukan ungu)
    "focus:border-slate-300 focus-visible:border-slate-300",
    // juga matikan semua ring yang mungkin diset via data-state
    "data-[state=open]:ring-0 data-[state=open]:ring-offset-0",
    // value jangan kepotong
    "[&_[data-slot=select-value]]:whitespace-nowrap",
    "[&_[data-slot=select-value]]:pr-4",
    "[&_[data-slot=select-value]]:truncate-0",
    // hide chevron bawaan shadcn
    "[&>svg]:hidden",
  );

  const selectContentCls = cn(
    "rounded-[10px] border-slate-200 p-1 shadow-xl",
    "[&_[data-radix-collection-item]]:rounded-[8px]",
    "[&_[data-state=checked]]:bg-slate-100",
  );

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex w-full items-center gap-2">
        <div className={cn("flex shrink-0 items-center", selectW)}>
          <Select
            value={mode}
            onValueChange={(v) => handleModeChange(v as PenaltyRateMode)}
          >
            <SelectTrigger className={selectTriggerCls}>
              <SelectValue aria-label="Mode denda">
                {labelForMode(mode)}
              </SelectValue>

              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                <ChevronDown className="h-4 w-4" />
              </span>
            </SelectTrigger>

            <SelectContent className={selectContentCls}>
              <SelectItem value="rp">Rp</SelectItem>
              <SelectItem value="percent">%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={cn(
            h,
            radius,
            text,
            "w-full border-slate-200 bg-white",
            "placeholder:text-slate-400",
            "shadow-sm",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "focus-visible:border-slate-300",
          )}
          placeholder={isPercent ? "0%" : "0,00"}
          inputMode="decimal"
        />
      </div>
    </div>
  );
}