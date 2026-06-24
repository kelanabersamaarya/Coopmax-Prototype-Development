"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchableFeeCoaSelect from "@/components/loans/SearchableFeeCoaSelect";

type FeeCoaOption =
  | "PEN. BIAYA PROVISI"
  | "PEN. ADMINISTRASI"
  | "PEN. BIAYA ASURANSI"
  | "PEN. AKTIVASI M-BANKING"
  | "PENDAPATAN LAIN - LAIN";

type FieldConfig = {
  key: "provisi" | "administrasi" | "asuransi" | "mbanking";
  label: string;
  placeholder: string;
  primaryOption: FeeCoaOption;
};

export type FeeCoaValues = Record<FieldConfig["key"], FeeCoaOption | undefined>;

const fields: FieldConfig[] = [
  {
    key: "provisi",
    label: "KP Biaya Provisi",
    placeholder: "Pilih KP Biaya Provisi",
    primaryOption: "PEN. BIAYA PROVISI",
  },
  {
    key: "administrasi",
    label: "KP Biaya Administrasi",
    placeholder: "Pilih KP Biaya Administrasi",
    primaryOption: "PEN. ADMINISTRASI",
  },
  {
    key: "asuransi",
    label: "KP Biaya Asuransi",
    placeholder: "Pilih KP Biaya Asuransi",
    primaryOption: "PEN. BIAYA ASURANSI",
  },
  {
    key: "mbanking",
    label: "KP Biaya Aktivasi M-Banking",
    placeholder: "Pilih KP Biaya Aktivasi M-Banking",
    primaryOption: "PEN. AKTIVASI M-BANKING",
  },
];

const commonCoaOptions: FeeCoaOption[] = [
  "PEN. BIAYA PROVISI",
  "PEN. ADMINISTRASI",
  "PEN. BIAYA ASURANSI",
  "PEN. AKTIVASI M-BANKING",
  "PENDAPATAN LAIN - LAIN",
];

export const emptyFeeCoaValues: FeeCoaValues = {
  provisi: undefined,
  administrasi: undefined,
  asuransi: undefined,
  mbanking: undefined,
};

function uniqueOptions(primaryOption: FeeCoaOption) {
  return Array.from(new Set([primaryOption, ...commonCoaOptions]));
}

export default function LoanProductFeeCoaFields({
  values,
  onChange,
  selectTriggerClassName,
  selectContentClassName,
  className,
}: {
  values?: FeeCoaValues;
  onChange?: (values: FeeCoaValues) => void;
  selectTriggerClassName?: string;
  selectContentClassName?: string;
  className?: string;
}) {
  const [internalValues, setInternalValues] =
    React.useState<FeeCoaValues>(emptyFeeCoaValues);

  const effectiveValues = values ?? internalValues;

  function updateValue(key: FieldConfig["key"], value: FeeCoaOption | undefined) {
    const next = {
      ...effectiveValues,
      [key]: value,
    };

    if (onChange) {
      onChange(next);
      return;
    }

    setInternalValues(next);
  }

  return (
    <div className={cn("loan-product-fee-coa-fields grid gap-5", className)}>
      {fields.map((field) => {
        const selectedValue = effectiveValues[field.key];
        const hasSelected = !!selectedValue;

        return (
          <div
            key={field.key}
            className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center"
          >
            <div className="text-sm font-normal text-slate-900">
              {field.label}
            </div>

            <div className="relative min-w-0">
              {hasSelected ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateValue(field.key, undefined);
                  }}
                  className={cn(
                    "absolute left-2 top-1/2 z-10 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center",
                    "rounded-[5px] text-red-600 transition hover:bg-red-50",
                    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                  )}
                  aria-label={`Hapus ${field.label}`}
                  title="Hapus pilihan"
                >
                  <X className="h-4.5 w-4.5" strokeWidth={3} />
                </button>
              ) : null}

              <SearchableFeeCoaSelect
                value={selectedValue}
                placeholder={field.placeholder}
                options={uniqueOptions(field.primaryOption)}
                onChange={(value) =>
                  updateValue(field.key, value as FeeCoaOption)
                }
                triggerClassName={cn(
                  hasSelected ? "pl-10 text-slate-900" : "text-slate-500",
                  selectTriggerClassName,
                )}
                contentClassName={selectContentClassName}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}