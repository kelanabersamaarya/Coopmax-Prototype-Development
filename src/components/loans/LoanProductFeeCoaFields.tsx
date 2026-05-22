"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FeeCoaValue =
  | "Pilih CoA Biaya Provisi"
  | "Pilih CoA Biaya Administrasi"
  | "Pilih CoA Biaya Asuransi"
  | "Pilih CoA Biaya Aktivasi M-Banking"
  | "PEN. BIAYA PROVISI"
  | "PEN. ADMINISTRASI"
  | "PEN. BIAYA ASURANSI"
  | "PEN. AKTIVASI M-BANKING"
  | "PENDAPATAN LAIN - LAIN";

type FieldConfig = {
  key: "provisi" | "administrasi" | "asuransi" | "mbanking";
  label: string;
  placeholder: FeeCoaValue;
  primaryOption: FeeCoaValue;
};

const fields: FieldConfig[] = [
  {
    key: "provisi",
    label: "CoA Biaya Provisi",
    placeholder: "Pilih CoA Biaya Provisi",
    primaryOption: "PEN. BIAYA PROVISI",
  },
  {
    key: "administrasi",
    label: "CoA Biaya Administrasi",
    placeholder: "Pilih CoA Biaya Administrasi",
    primaryOption: "PEN. ADMINISTRASI",
  },
  {
    key: "asuransi",
    label: "CoA Biaya Asuransi",
    placeholder: "Pilih CoA Biaya Asuransi",
    primaryOption: "PEN. BIAYA ASURANSI",
  },
  {
    key: "mbanking",
    label: "CoA Biaya Aktivasi M-Banking",
    placeholder: "Pilih CoA Biaya Aktivasi M-Banking",
    primaryOption: "PEN. AKTIVASI M-BANKING",
  },
];

export default function LoanProductFeeCoaFields({
  selectTriggerClassName,
  selectContentClassName,
  className,
}: {
  selectTriggerClassName?: string;
  selectContentClassName?: string;
  className?: string;
}) {
  const [values, setValues] = React.useState<Record<FieldConfig["key"], FeeCoaValue>>({
    provisi: "Pilih CoA Biaya Provisi",
    administrasi: "Pilih CoA Biaya Administrasi",
    asuransi: "Pilih CoA Biaya Asuransi",
    mbanking: "Pilih CoA Biaya Aktivasi M-Banking",
  });

  return (
    <div className={cn("grid gap-5", className)}>
      {fields.map((field) => (
        <div
          key={field.key}
          className="grid gap-2 md:grid-cols-[240px_1fr] md:items-start"
        >
          <div className="pt-1">
            <div className="text-sm font-normal text-slate-900">
              {field.label}
            </div>
          </div>

          <div className="min-w-0">
            <Select
              value={values[field.key]}
              onValueChange={(value) =>
                setValues((prev) => ({
                  ...prev,
                  [field.key]: value as FeeCoaValue,
                }))
              }
            >
              <SelectTrigger
                className={cn(
                  "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
                  values[field.key] === field.placeholder
                    ? "text-slate-500"
                    : "text-slate-900",
                  selectTriggerClassName,
                )}
              >
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>

              <SelectContent
                className={cn("rounded-[10px] border-slate-200", selectContentClassName)}
              >
                <SelectItem value={field.placeholder}>{field.placeholder}</SelectItem>
                <SelectItem value={field.primaryOption}>{field.primaryOption}</SelectItem>
                <SelectItem value="PENDAPATAN LAIN - LAIN">
                  PENDAPATAN LAIN - LAIN
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
}