"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import FieldTooltip from "@/components/loans/FieldTooltip";
import SearchableFeeCoaSelect from "@/components/loans/SearchableFeeCoaSelect";
import LoanProductFeeCoaFields from "@/components/loans/LoanProductFeeCoaFields";

export type MainCoaOption =
  | "PINJAMAN YANG DIBERIKAN"
  | "PEND. BUNGA PINJAMAN"
  | "PEND. DENDA"
  | "PENDAPATAN LAIN - LAIN"
  | "PEN. ADMINISTRASI"
  | "PILIH";

type FieldKey =
  | "coaLoan"
  | "coaInterestRevenue"
  | "coaSplitInterestRevenue"
  | "coaPenaltyRevenue"
  | "coaRoundingRevenue"
  | "coaAdminRevenue";

type FieldConfig = {
  key: FieldKey;
  label: React.ReactNode;
  hint?: string;
  placeholder: string;
  options: Exclude<MainCoaOption, "PILIH">[];
};

const fields: FieldConfig[] = [
  {
    key: "coaLoan",
    label: "KP Pinjaman",
    placeholder: "Pilih KP Pinjaman",
    options: ["PINJAMAN YANG DIBERIKAN", "PENDAPATAN LAIN - LAIN"],
  },
  {
    key: "coaInterestRevenue",
    label: "KP Pendapatan Bunga",
    placeholder: "Pilih KP Pendapatan Bunga",
    options: ["PEND. BUNGA PINJAMAN", "PENDAPATAN LAIN - LAIN"],
  },
  {
    key: "coaSplitInterestRevenue",
    label: (
      <span className="inline-flex items-center">
        KP Pembagi Pendapatan Bunga
        <FieldTooltip content="Diisi jika ingin pembukuan pendapatan Bunga dibagi ke KP ini." />
      </span>
    ),
    hint: "Diisi jika ingin pembukuan pendapatan Bunga dibagi ke KP ini.",
    placeholder: "Pilih KP Pendapatan Bunga",
    options: ["PEND. BUNGA PINJAMAN", "PENDAPATAN LAIN - LAIN"],
  },
  {
    key: "coaPenaltyRevenue",
    label: "KP Pendapatan Denda",
    placeholder: "Pilih KP Biaya Denda",
    options: ["PEND. DENDA", "PENDAPATAN LAIN - LAIN"],
  },
  {
    key: "coaRoundingRevenue",
    label: "KP Pendapatan Pembulatan",
    placeholder: "Pilih KP Pembulatan",
    options: ["PENDAPATAN LAIN - LAIN", "PEND. DENDA"],
  },
  {
    key: "coaAdminRevenue",
    label: "KP Pendapatan Admin",
    placeholder: "Pilih KP Biaya Admin",
    options: ["PEN. ADMINISTRASI", "PENDAPATAN LAIN - LAIN"],
  },
];

type Values = Record<FieldKey, MainCoaOption>;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="h-px w-full bg-slate-200/80" />
      <div className="mt-6 text-base font-semibold text-slate-900">
        {children}
      </div>
    </div>
  );
}

function CoaFieldRow({
  field,
  values,
  onChange,
  selectTriggerClassName,
  selectContentClassName,
}: {
  field: FieldConfig;
  values: Values;
  onChange: (key: FieldKey, value: MainCoaOption) => void;
  selectTriggerClassName?: string;
  selectContentClassName?: string;
}) {
  const rawValue = values[field.key];
  const selectedValue = rawValue === "PILIH" ? undefined : rawValue;
  const hasSelected = !!selectedValue;

  return (
    <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-start">
      <div className="pt-1">
        <div className="text-sm font-normal text-slate-900">{field.label}</div>
        {field.hint ? (
          <div className="mt-1 text-xs text-slate-500">{field.hint}</div>
        ) : null}
      </div>

      <div className="relative min-w-0">
        {hasSelected ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(field.key, "PILIH");
            }}
            className={cn(
              "absolute left-2 top-1/2 z-10 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center",
              "rounded-[5px] text-red-600 transition hover:bg-red-50",
              "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
            aria-label={`Hapus ${field.placeholder}`}
            title="Hapus pilihan"
          >
            <X className="h-4.5 w-4.5" strokeWidth={3} />
          </button>
        ) : null}

        <SearchableFeeCoaSelect
          value={selectedValue}
          placeholder={field.placeholder}
          options={field.options}
          onChange={(value) => onChange(field.key, value as MainCoaOption)}
          triggerClassName={cn(
            hasSelected ? "pl-10 text-slate-900" : "text-slate-500",
            selectTriggerClassName,
          )}
          contentClassName={cn(
            "rounded-[5px] border-slate-200 p-0 shadow-xl",
            selectContentClassName,
          )}
        />
      </div>
    </div>
  );
}

export default function LoanProductAccountingCoaFields({
  values,
  onChange,
  aturCoaJenisBiaya,
  onAturCoaJenisBiayaChange,
  selectTriggerClassName,
  selectContentClassName,
  feeSelectTriggerClassName,
  feeSelectContentClassName,
  className,
}: {
  values: Values;
  onChange: (key: FieldKey, value: MainCoaOption) => void;
  aturCoaJenisBiaya: boolean;
  onAturCoaJenisBiayaChange: (checked: boolean) => void;
  selectTriggerClassName?: string;
  selectContentClassName?: string;
  feeSelectTriggerClassName?: string;
  feeSelectContentClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("mt-6", className)}>
      <SectionTitle>Konfigurasi KP (Kode Perkiraan) Biaya Pinjaman</SectionTitle>

      <div className="mt-5 grid gap-5">
        <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
          <div className="pt-1 text-sm font-normal text-slate-900">
            Atur KP Jenis Biaya pada Produk Pinjaman
          </div>
          <Switch
            checked={aturCoaJenisBiaya}
            onCheckedChange={onAturCoaJenisBiayaChange}
          />
        </div>

        {aturCoaJenisBiaya ? (
          <LoanProductFeeCoaFields
            selectTriggerClassName={feeSelectTriggerClassName ?? selectTriggerClassName}
            selectContentClassName={feeSelectContentClassName ?? selectContentClassName}
          />
        ) : null}
      </div>

      <div className="mt-6">
        <SectionTitle>
          Konfigurasi KP (Kode Perkiraan) Pendapatan Pinjaman
        </SectionTitle>

        <div className="mt-5 grid gap-5">
          {fields.map((field) => (
            <CoaFieldRow
              key={field.key}
              field={field}
              values={values}
              onChange={onChange}
              selectTriggerClassName={selectTriggerClassName}
              selectContentClassName={selectContentClassName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}