"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const coaFields = [
  "KP Tabungan",
  "KP Bunga",
  "KP Pendapatan Pinalty",
  "KP Pendapatan Biaya Admin",
  "KP Pendapatan Pengendapan",
  "KP Pajak Bunga",
  "KP Tunjangan Dana Pensiun",
  "KP Pengakuan Biaya Bunga",
  "KP Biaya Bunga",
] as const;

const coaOptions = [
  "1.1.1.3.1 - Simpanan Sukarela",
  "1.1.1.3.2 - Simpanan Berjangka",
  "2.1.1.1 - Tabungan Anggota",
  "4.1.1.1 - Pendapatan Bunga",
  "4.1.1.2 - Pendapatan Pinalty",
  "4.1.1.3 - Pendapatan Biaya Admin",
  "4.1.1.4 - Pendapatan Pengendapan",
  "2.1.3.1 - Hutang Pajak Bunga",
  "5.1.1.1 - Tunjangan Dana Pensiun",
  "5.1.1.1 - Beban Jasa Simpanan Sukarela/Tabungan Dari Anggota",
] as const;

type CoaField = (typeof coaFields)[number];

const placeholderByField: Record<CoaField, string> = {
  "KP Tabungan": "Pilih CoA Tabungan",
  "KP Bunga": "Pilih CoA Bunga",
  "KP Pendapatan Pinalty": "Pilih CoA Pinalty",
  "KP Pendapatan Biaya Admin": "Pilih CoA Biaya Admin",
  "KP Pendapatan Pengendapan": "Pilih CoA Pendapatan Pengendapan",
  "KP Pajak Bunga": "Pilih CoA Pajak Bunga",
  "KP Tunjangan Dana Pensiun": "Pilih CoA Tunjangan Dana Pensiun",
  "KP Pengakuan Biaya Bunga": "Pilih CoA Pengakuan Biaya Bunga",
  "KP Biaya Bunga": "Pilih CoA Biaya Bunga",
};

const helperTextByField: Partial<Record<CoaField, string>> = {
  "KP Pengakuan Biaya Bunga":
    "Akun pengakuan biaya bunga sesuai kebijakan akuntansi simpanan pada penerapan SAK EP",
  "KP Biaya Bunga":
    "Akun biaya bunga saat pengakuan sesuai kebijakan akuntansi simpanan pada penerapan SAK EP",
};

function getCoaLabel(option: string) {
  return option.replace(/^[\d.]+\s*-\s*/, "");
}

export default function SavingsProductCoaDropdownFields({
  className,
}: {
  className?: string;
}) {
  const [values, setValues] = React.useState<Record<CoaField, string>>(() =>
    Object.fromEntries(coaFields.map((field) => [field, ""])) as Record<
      CoaField,
      string
    >,
  );

  function clearValue(
    field: CoaField,
    event: React.MouseEvent | React.PointerEvent,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setValues((current) => ({
      ...current,
      [field]: "",
    }));
  }

  const labelClassName =
    "text-[14px] font-normal leading-snug text-[#002060]";

  const helperClassName = "mt-1 text-[13px] font-normal text-[#6479A6]";

  const selectTriggerClassName = cn(
    "relative h-[30px] rounded-[5px] border-slate-300 bg-white px-3 py-0",
    "justify-start text-left text-[14px] font-normal shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:ml-auto [&>svg]:text-slate-500",
  );

  const selectContentClassName = cn(
    "rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.right-2]:hidden",
    "[&_[data-radix-collection-item]]:pl-4",
    "[&_[data-radix-collection-item]]:pr-4",
  );

  const selectItemClassName = cn(
    "rounded-none px-4 py-2.5 text-[14px] font-normal text-black",
    "hover:bg-violet-600 hover:text-white",
    "focus:bg-violet-600 focus:text-white",
    "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
    "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
  );

  return (
    <div className={cn("grid gap-[20px]", className)}>
      <div className="h-px w-full bg-slate-300/80" />

      {coaFields.map((field) => {
        const selectedValue = values[field];
        const hasSelected = selectedValue.trim().length > 0;
        const showSectionDivider = field === "KP Pengakuan Biaya Bunga";
        const showBottomDivider = field === "KP Biaya Bunga";

        return (
          <React.Fragment key={field}>
            {showSectionDivider ? (
              <div className="h-px w-full bg-slate-300/80" />
            ) : null}

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[5px]")}>{field}</label>

              <div>
                <div className="relative">
                  {hasSelected ? (
                    <button
                      type="button"
                      onPointerDown={(event) => clearValue(field, event)}
                      onClick={(event) => clearValue(field, event)}
                      className={cn(
                        "absolute left-[10px] top-[15px] z-20 inline-flex h-4 w-4 -translate-y-1/2 items-center justify-center p-0",
                        "rounded-[3px] text-red-600 transition hover:bg-red-50",
                        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                      )}
                      aria-label={`Hapus ${field}`}
                      title="Hapus pilihan"
                    >
                      <X className="block h-4 w-4" strokeWidth={3} />
                    </button>
                  ) : null}

                  <Select
                    value={values[field]}
                    onValueChange={(value) =>
                      setValues((current) => ({
                        ...current,
                        [field]: value,
                      }))
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        selectTriggerClassName,
                        hasSelected ? "pl-9 text-black" : "text-[#64748B]",
                      )}
                    >
                      {hasSelected ? (
                        <span className="block min-w-0 flex-1 truncate text-left text-[14px] font-normal text-black">
                          {getCoaLabel(selectedValue)}
                        </span>
                      ) : (
                        <SelectValue placeholder={placeholderByField[field]} />
                      )}
                    </SelectTrigger>

                    <SelectContent className={selectContentClassName}>
                      {coaOptions.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className={selectItemClassName}
                        >
                          {getCoaLabel(option)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {helperTextByField[field] ? (
                  <div className={helperClassName}>{helperTextByField[field]}</div>
                ) : null}
              </div>
            </div>

            {showBottomDivider ? (
              <div className="h-px w-full bg-slate-300/80" />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}