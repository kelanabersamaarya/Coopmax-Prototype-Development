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

export type PenaltyAmountMode = "percent" | "rp";
export type PenaltyBase = "Pokok" | "Bunga" | "Hutang Pokok" | "Hutang Bunga";
export type PenaltyFrequency = "Harian" | "Mingguan" | "Bulanan";

export type PenaltyScheduleDraft = {
  amountMode: PenaltyAmountMode;
  amountValue: string;
  base: PenaltyBase;
  frequency: PenaltyFrequency;
  periode: string;
  tanggalTagihanKe1: string;
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
  const amountModeLabel = value.amountMode === "percent" ? "%" : "Rp.";

  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)_64px] md:items-center">
        <FieldLabel>Nominal Denda</FieldLabel>

        <div className="flex min-w-0 items-center gap-2">
          <Select
            value={value.amountMode}
            onValueChange={(v) => onChange({ ...value, amountMode: v as any })}
          >
            <SelectTrigger className="h-11 w-[88px] rounded-xl border-slate-200 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="percent" className="rounded-lg">
                %
              </SelectItem>
              <SelectItem value="rp" className="rounded-lg">
                Rp.
              </SelectItem>
            </SelectContent>
          </Select>

          <Input
            value={value.amountValue}
            onChange={(e) => onChange({ ...value, amountValue: e.target.value })}
            className="h-11 flex-1 rounded-xl border-slate-200 bg-white"
            placeholder={value.amountMode === "percent" ? "0" : "0,00"}
            inputMode="decimal"
            aria-label={`Nominal denda (${amountModeLabel})`}
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
            aria-label="Hapus jadwal denda"
            title="Hapus"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:items-center">
        <FieldLabel>
          Dasar Perhitungan
          <br />
          Denda
        </FieldLabel>

        <SelectLike
          value={value.base}
          onValueChange={(v) => onChange({ ...value, base: v as any })}
          options={["Pokok", "Bunga", "Hutang Pokok", "Hutang Bunga"]}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:items-center">
        <FieldLabel>Frekuensi Denda</FieldLabel>

        <SelectLike
          value={value.frequency}
          onValueChange={(v) => onChange({ ...value, frequency: v as any })}
          options={["Harian", "Mingguan", "Bulanan"]}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:items-center">
        <FieldLabel>Periode</FieldLabel>

        <Input
          value={value.periode}
          onChange={(e) => onChange({ ...value, periode: e.target.value })}
          className="h-11 rounded-xl border-slate-200 bg-white"
          placeholder=""
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:items-center">
        <FieldLabel>
          Tanggal Tagihan
          <br />
          Ke-1
        </FieldLabel>

        <Input
          value={value.tanggalTagihanKe1}
          onChange={(e) =>
            onChange({ ...value, tanggalTagihanKe1: e.target.value })
          }
          className="h-11 rounded-xl border-slate-200 bg-white"
          placeholder="DD-MM-YYYY"
          inputMode="numeric"
        />
      </div>
    </div>
  );
}