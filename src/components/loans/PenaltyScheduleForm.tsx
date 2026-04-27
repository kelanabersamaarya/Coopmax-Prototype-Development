"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PenaltyRateMode = "fix" | "percent";
export type PenaltyBase = "Pokok" | "Bunga" | "Hutang Pokok" | "Hutang Bunga";

export type PenaltyScheduleDraft = {
  rateMode: PenaltyRateMode;
  rateValue: string; // "0,00" atau "0"
  base: PenaltyBase;
  lateDays: string; // numeric string
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-normal text-slate-800">{children}</div>;
}

function SelectLike({
  value,
  onValueChange,
  options,
  className,
  placeholder,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: string[];
  className?: string;
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "h-11 rounded-xl border-slate-200 bg-white text-slate-900",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-slate-200">
        {options.map((o) => (
          <SelectItem key={o} value={o} className="rounded-lg">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function normalizeRateValueForMode(mode: PenaltyRateMode, value: string) {
  const v = (value ?? "").trim();
  if (mode === "percent") {
    if (v === "" || v === "0,00") return "0";
    return v;
  }
  // fix
  if (v === "" || v === "0") return "0,00";
  return v;
}

export default function PenaltyScheduleForm({
  value,
  onChange,
  onDelete,
  className,
}: {
  value: PenaltyScheduleDraft;
  onChange: (next: PenaltyScheduleDraft) => void;
  onDelete?: () => void;
  className?: string;
}) {
  const isPercent = value.rateMode === "percent";

  return (
    <div className={cn("w-full", className)}>
      {/* Tarif Denda */}
      <div className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)_64px] md:items-center">
        <FieldLabel>Tarif Denda</FieldLabel>

        <div className="flex min-w-0 items-center gap-2">
          <Select
            value={value.rateMode}
            onValueChange={(v) => {
              const nextMode = v as PenaltyRateMode;
              onChange({
                ...value,
                rateMode: nextMode,
                rateValue: normalizeRateValueForMode(nextMode, value.rateValue),
              });
            }}
          >
            <SelectTrigger className="h-11 w-[120px] rounded-xl border-slate-200 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="fix" className="rounded-lg">
                Nominal Fix
              </SelectItem>
              <SelectItem value="percent" className="rounded-lg">
                Persentase
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            value={value.rateValue}
            onChange={(e) => onChange({ ...value, rateValue: e.target.value })}
            className="h-11 flex-1 rounded-xl border-slate-200 bg-white"
            placeholder={isPercent ? "0" : "0,00"}
            inputMode="decimal"
            aria-label="Tarif denda"
          />
        </div>

        <div className="flex justify-end md:justify-center">
          <button
            type="button"
            onClick={onDelete}
            disabled={!onDelete}
            className={cn(
              "inline-flex h-11 w-14 items-center justify-center rounded-xl",
              "bg-rose-600 text-white ring-1 ring-rose-600/20 transition hover:bg-rose-700",
              !onDelete ? "opacity-50 pointer-events-none" : "",
            )}
            aria-label="Hapus denda"
            title="Hapus"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Dasar Perhitungan */}
      <div className="mt-4 grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:items-center">
        <FieldLabel>Dasar Perhitungan Denda</FieldLabel>

        <SelectLike
          value={value.base}
          onValueChange={(v) => onChange({ ...value, base: v as PenaltyBase })}
          options={["Pokok", "Bunga", "Hutang Pokok", "Hutang Bunga"]}
        />
      </div>

      {/* Jumlah hari keterlambatan */}
      <div className="mt-4 grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:items-center">
        <FieldLabel>Jumlah Hari Keterlambatan</FieldLabel>

        <Input
          value={value.lateDays}
          onChange={(e) => onChange({ ...value, lateDays: e.target.value })}
          className="h-11 rounded-xl border-slate-200 bg-white"
          placeholder="0"
          inputMode="numeric"
        />
      </div>
    </div>
  );
}