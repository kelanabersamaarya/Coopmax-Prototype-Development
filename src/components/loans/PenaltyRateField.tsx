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

export default function PenaltyRateField({
  mode,
  onModeChange,
  value,
  onValueChange,
  className,
}: {
  mode: PenaltyRateMode;
  onModeChange: (v: PenaltyRateMode) => void;
  value: string;
  onValueChange: (v: string) => void;
  className?: string;
}) {
  const isPercent = mode === "percent";

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex w-full items-center gap-2">
        <Select value={mode} onValueChange={(v) => onModeChange(v as PenaltyRateMode)}>
          <SelectTrigger className="h-11 w-[92px] rounded-2xl border-slate-200 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-200">
            <SelectItem value="rp">Rp.</SelectItem>
            <SelectItem value="percent">%</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative w-full">
          <Input
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className={cn(
              "h-11 w-full rounded-2xl border-slate-200 bg-white",
              isPercent ? "pr-12" : "",
            )}
            placeholder={isPercent ? "0%" : "0,00"}
            inputMode="decimal"
          />

          {isPercent ? (
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
              %
            </div>
          ) : null}
        </div>
      </div>

      <div className="text-[11px] text-slate-500">
        {isPercent
          ? "Masukkan tarif denda persentase (%)."
          : "Masukkan tarif denda nominal (Rp)."}
      </div>
    </div>
  );
}