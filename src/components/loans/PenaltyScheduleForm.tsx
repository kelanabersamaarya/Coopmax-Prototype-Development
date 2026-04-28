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

export type PenaltyRateMode = "rp" | "percent";
export type PenaltyBase = "Pokok" | "Bunga" | "Hutang Pokok" | "Hutang Bunga";

export type PenaltyScheduleDraft = {
  rateMode: PenaltyRateMode;
  rateValue: string; // contoh: "0%" atau "Rp. 0"
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
          "h-11 w-full rounded-xl border-slate-200 bg-white text-slate-900",
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
    if (v === "" || v === "0" || v === "0,00" || v === "0%" || v === "Rp. 0")
      return "0%";
    if (!v.endsWith("%")) return `${v}%`;
    return v;
  }

  // mode === "rp"
  if (v === "" || v === "0" || v === "0,00" || v === "0%" || v === "Rp. 0")
    return "Rp. 0";
  if (v.toLowerCase().startsWith("rp")) return v;
  return `Rp. ${v}`;
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

  // lebar tombol delete agar semua baris sejajar
  const deleteW = "w-[64px]";

  return (
    <div className={cn("w-full", className)}>
      {/* Metode Denda */}
      <div className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)_64px] md:items-center">
        <FieldLabel>Metode Denda</FieldLabel>

        <div className="grid min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-2">
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
            <SelectTrigger className="h-11 w-[72px] rounded-xl border-slate-200 bg-white px-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="percent" className="rounded-lg">
                %
              </SelectItem>
              <SelectItem value="rp" className="rounded-lg">
                Rp
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            value={value.rateValue}
            onChange={(e) => onChange({ ...value, rateValue: e.target.value })}
            className="h-11 w-full rounded-xl border-slate-200 bg-white"
            placeholder={isPercent ? "0%" : "Rp. 0"}
            inputMode="text"
            aria-label="Metode denda"
          />
        </div>

        <div className={cn("flex justify-end md:justify-center", deleteW)}>
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
      <div className="mt-4 grid gap-4 md:grid-cols-[200px_minmax(0,1fr)_64px] md:items-center">
        <FieldLabel>Dasar Perhitungan Denda</FieldLabel>

        <div className="min-w-0">
          <SelectLike
            value={value.base}
            onValueChange={(v) => onChange({ ...value, base: v as PenaltyBase })}
            options={["Pokok", "Bunga", "Hutang Pokok", "Hutang Bunga"]}
          />
        </div>

        <div className={deleteW} />
      </div>

      {/* Jumlah hari keterlambatan */}
      <div className="mt-4 grid gap-4 md:grid-cols-[200px_minmax(0,1fr)_64px] md:items-center">
        <FieldLabel>Jumlah Hari Keterlambatan</FieldLabel>

        <Input
          value={value.lateDays}
          onChange={(e) => onChange({ ...value, lateDays: e.target.value })}
          className="h-11 w-full rounded-xl border-slate-200 bg-white"
          placeholder="0"
          inputMode="numeric"
        />

        <div className={deleteW} />
      </div>
    </div>
  );
}