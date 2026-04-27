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
  className,
}: {
  mode: PenaltyRateMode;
  onModeChange: (v: PenaltyRateMode) => void;
  value: string;
  onValueChange: (v: string) => void;
  className?: string;
}) {
  const isPercent = mode === "percent";

  function handleModeChange(next: PenaltyRateMode) {
    onModeChange(next);

    // Sesuai permintaan: saat baru memilih persentase, tampilkan 0% di input.
    // Dan saat kembali ke Rp, tampilkan 0,00.
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

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex w-full items-center gap-2">
        <Select value={mode} onValueChange={(v) => handleModeChange(v as PenaltyRateMode)}>
          <SelectTrigger className="h-11 w-[92px] rounded-2xl border-slate-200 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-200">
            <SelectItem value="rp">Rp.</SelectItem>
            <SelectItem value="percent">%</SelectItem>
          </SelectContent>
        </Select>

        <Input
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="h-11 w-full rounded-2xl border-slate-200 bg-white"
          placeholder={isPercent ? "0%" : "0,00"}
          inputMode="decimal"
        />
      </div>

      <div className="text-[11px] text-slate-500">
        {isPercent
          ? "Masukkan tarif denda persentase (contoh: 0%)."
          : "Masukkan tarif denda nominal (Rp)."}
      </div>
    </div>
  );
}