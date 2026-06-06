"use client";

import * as React from "react";
import { ChevronDown, FileText, Info, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function FieldBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="text-[12px] font-normal leading-[18px] text-slate-900">
        {label}
      </div>
      {children}
    </div>
  );
}

function PeriodInfoButton() {
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full",
            "bg-[#2563eb] text-white ring-2 ring-[#2563eb]/20 transition hover:bg-[#1d4ed8]",
            "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          aria-label="Info periode"
          title="Info periode"
        >
          <Info className="h-4 w-4" />
        </button>
      </TooltipTrigger>

      <TooltipContent className="rounded-[10px] border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-800 shadow-xl">
        Periode transaksi pinjaman.
      </TooltipContent>
    </Tooltip>
  );
}

export default function PinjamanBulananTransactionFields({
  disabled,
  nominal,
  onNominalChange,
  bayarBunga,
  onBayarBungaChange,
  denda,
  onDendaChange,
  tabungan,
  onTabunganChange,
  keterangan,
  onKeteranganChange,
  periode,
  onPeriodeChange,
}: {
  disabled: boolean;
  nominal: string;
  onNominalChange: (value: string) => void;
  bayarBunga: string;
  onBayarBungaChange: (value: string) => void;
  denda: string;
  onDendaChange: (value: string) => void;
  tabungan: "Tanpa Tabungan";
  onTabunganChange: (value: "Tanpa Tabungan") => void;
  keterangan: string;
  onKeteranganChange: (value: string) => void;
  periode: string;
  onPeriodeChange: (value: string) => void;
}) {
  const inputClassName = cn(
    "h-[30px] w-full rounded-[5px] border-slate-300 bg-white px-3",
    "text-right text-[14px] font-medium text-slate-900 shadow-none",
    "placeholder:text-[#64748B]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    disabled ? "pointer-events-none opacity-60" : "",
  );

  const readonlyInputClassName = cn(
    inputClassName,
    "bg-slate-200/80 text-slate-800",
  );

  const selectTriggerClassName = cn(
    "h-[30px] w-full rounded-[5px] border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900 shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:hidden",
    disabled ? "pointer-events-none opacity-60" : "",
  );

  return (
    <div className="grid gap-4">
      <FieldBlock label="Nominal">
        <Input
          value={nominal}
          onChange={(event) => onNominalChange(event.target.value)}
          className={inputClassName}
          placeholder="0,00"
          inputMode="decimal"
          disabled={disabled}
        />
      </FieldBlock>

      <FieldBlock label="Bayar Pokok">
        <Input
          value="0,00"
          readOnly
          className={readonlyInputClassName}
          disabled={disabled}
        />
      </FieldBlock>

      <FieldBlock label="Bayar Bunga">
        <Input
          value={bayarBunga}
          onChange={(event) => onBayarBungaChange(event.target.value)}
          className={inputClassName}
          placeholder="0,00"
          inputMode="decimal"
          disabled={disabled}
        />
      </FieldBlock>

      <FieldBlock label="Denda">
        <div className="flex min-w-0 items-stretch">
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "inline-flex h-[30px] w-[38px] shrink-0 items-center justify-center",
              "rounded-l-[5px] rounded-r-none bg-[#E93445] text-white",
              "ring-1 ring-[#E93445]/20 transition hover:bg-[#d82f3f]",
              disabled ? "pointer-events-none opacity-60" : "",
            )}
            aria-label="Kurangi denda"
            title="Kurangi denda"
          >
            <Minus className="h-5 w-5" strokeWidth={3} />
          </button>
          <Input
            value={denda}
            onChange={(event) => onDendaChange(event.target.value)}
            className={cn(inputClassName, "rounded-l-none")}
            placeholder="0,00"
            inputMode="decimal"
            disabled={disabled}
          />
        </div>
      </FieldBlock>

      <FieldBlock label="Sisa Pinjaman Akhir">
        <Input
          value="20.000.000,00"
          readOnly
          className={readonlyInputClassName}
          disabled={disabled}
        />
      </FieldBlock>

      <FieldBlock label="Tabungan">
        <Select
          value={tabungan}
          onValueChange={(value) => onTabunganChange(value as "Tanpa Tabungan")}
          disabled={disabled}
        >
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue />
            <ChevronDown className="h-4 w-4 text-[#526685]" />
          </SelectTrigger>
          <SelectContent className="rounded-[8px] border-slate-200">
            <SelectItem value="Tanpa Tabungan">Tanpa Tabungan</SelectItem>
          </SelectContent>
        </Select>
      </FieldBlock>

      <FieldBlock label="Keterangan">
        <div className="flex min-w-0 items-stretch">
          <Input
            value={keterangan}
            onChange={(event) => onKeteranganChange(event.target.value)}
            className={cn(inputClassName, "rounded-r-none text-left")}
            disabled={disabled}
          />
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "inline-flex h-[30px] w-[38px] shrink-0 items-center justify-center",
              "rounded-l-none rounded-r-[5px] bg-[#6B7A90] text-white",
              "ring-1 ring-[#6B7A90]/20 transition hover:bg-[#5f6d82]",
              disabled ? "pointer-events-none opacity-60" : "",
            )}
            aria-label="Keterangan"
            title="Keterangan"
          >
            <FileText className="h-4.5 w-4.5" />
          </button>
        </div>
      </FieldBlock>

      <FieldBlock label="Periode">
        <div className="flex min-w-0 items-center gap-2">
          <Input
            value={periode}
            onChange={(event) => onPeriodeChange(event.target.value)}
            className={cn(inputClassName, "min-w-0 flex-1 text-left")}
            disabled={disabled}
          />
          <PeriodInfoButton />
        </div>
      </FieldBlock>
    </div>
  );
}