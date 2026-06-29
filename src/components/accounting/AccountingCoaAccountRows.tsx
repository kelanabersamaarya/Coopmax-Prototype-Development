"use client";

import * as React from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const coaAccountOptions = [
  "BANK BRI KSBA CABANG RUTENG 1763-01-000063-56-0",
  "Kas Teller",
  "Kas Besar",
  "Kas Operasional",
  "Bank",
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] font-extrabold uppercase leading-none tracking-wide text-[#72809B]">
      {children}
    </label>
  );
}

function CoaAccountRow({
  value,
  onChange,
  onDelete,
}: {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-[8px]">
      <div className="relative min-w-0 flex-1">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-[31px] w-full appearance-none rounded-[5px] border border-[#CBD5E1] bg-white px-3 pr-9",
            "text-[14px] font-normal text-[#526685] shadow-none outline-none",
            "focus:border-[#CBD5E1] focus:ring-0",
          )}
        >
          <option value=""></option>
          {coaAccountOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#526685]" />
      </div>

      <button
        type="button"
        onClick={onDelete}
        className={cn(
          "inline-flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-[5px]",
          "bg-[#DC3545] text-white transition hover:bg-[#c72f3d]",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
        aria-label="Hapus COA Account"
        title="Hapus"
      >
        <Trash2 className="h-[15px] w-[15px]" strokeWidth={3} />
      </button>
    </div>
  );
}

export default function AccountingCoaAccountRows({
  values,
  onChange,
}: {
  values: string[];
  onChange: (values: string[]) => void;
}) {
  function addCoaAccount() {
    onChange([...values, ""]);
  }

  function updateCoaAccount(index: number, value: string) {
    onChange(values.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function deleteCoaAccount(index: number) {
    if (values.length <= 1) {
      onChange([""]);
      return;
    }

    onChange(values.filter((_item, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="mt-[4px] grid gap-[10px]">
      <div className="flex items-center justify-between gap-3">
        <FieldLabel>COA ACCOUNT</FieldLabel>

        <button
          type="button"
          onClick={addCoaAccount}
          className={cn(
            "h-[29px] rounded-[5px] px-4",
            "bg-[#17A2B8] text-[13px] font-semibold text-white",
            "transition hover:bg-[#148ea1]",
            "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
        >
          Add Item
        </button>
      </div>

      <div className="grid gap-[8px]">
        {values.map((item, index) => (
          <CoaAccountRow
            key={`${index}-${item}`}
            value={item}
            onChange={(value) => updateCoaAccount(index, value)}
            onDelete={() => deleteCoaAccount(index)}
          />
        ))}
      </div>
    </div>
  );
}