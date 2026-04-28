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
  const radius = size === "compact" ? "rounded-[5px]" : "rounded-2xl";
  const text = size === "compact" ? "text-[12.5px]" : "";

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex w-full items-center gap-2">
        <div className="flex w-[64px] shrink-0 items-center gap-2">
          <Select
            value={mode}
            onValueChange={(v) => handleModeChange(v as PenaltyRateMode)}
          >
            <SelectTrigger
              className={cn(
                h,
                "w-full min-w-0 border-slate-200 bg-white px-2 pr-7",
                radius,
                text,
              )}
            >
              <span className="block min-w-0 truncate">
                <SelectValue />
              </span>
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200">
              <SelectItem value="rp">Rp.</SelectItem>
              <SelectItem value="percent">%</SelectItem>
            </SelectContent>
          </Select>

          {/* debug marker */}
          <span className="text-[10px] font-bold text-fuchsia-700">PRF</span>
        </div>

        <Input
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={cn(h, "w-full border-slate-200 bg-white", radius, text)}
          placeholder={isPercent ? "0%" : "0,00"}
          inputMode="decimal"
        />
      </div>
    </div>
  );
}