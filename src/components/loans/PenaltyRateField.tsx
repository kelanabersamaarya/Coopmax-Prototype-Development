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

  // Tujuan:
  // 1) Chevron benar-benar di ujung kanan trigger
  // 2) Value tidak boleh ketutup chevron (beri padding kanan pada value)
  // 3) Hilangkan ring ungu luar
  const selectTriggerCls = cn(
    h,
    radius,
    text,
    "w-full",
    "border-slate-200 bg-white",
    "pl-3 pr-9",
    "font-medium text-slate-900",
    "shadow-sm",
    "focus:outline-none focus:ring-0 focus-visible:ring-0",
    "focus-visible:border-slate-300",
    // value: tambah ruang kanan supaya '%' tidak ketutup
    "[&_[data-slot=select-value]]:pr-6",
    "[&>span]:pr-6",
    // chevron: paksa nempel kanan (kalau ada svg icon di trigger)
    "[&>svg]:absolute [&>svg]:right-2.5 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2",
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