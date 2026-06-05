"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function getTodayDmy() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = String(today.getFullYear());

  return `${day}-${month}-${year}`;
}

function formatDmy(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
}

function parseDmyToDate(value: string): Date | undefined {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec((value ?? "").trim());
  if (!match) return undefined;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
}

function DateInputField({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
}) {
  const [open, setOpen] = React.useState(false);
  const selectedDate = React.useMemo(() => parseDmyToDate(value), [value]);

  return (
    <div className="relative min-w-0 flex-1">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode="numeric"
        aria-label={ariaLabel}
        className={cn(
          "h-[41px] w-full border-0 bg-transparent px-3 pr-9",
          "text-[13px] font-normal text-black shadow-none",
          "placeholder:text-[13px] placeholder:font-normal placeholder:text-[#9A9A9A]",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center",
              "rounded-full text-[#7B7B7B] transition active:scale-[0.96]",
            )}
            aria-label={`Pilih ${ariaLabel.toLowerCase()}`}
            title="Pilih tanggal"
          >
            <ChevronDown className="h-[18px] w-[18px]" strokeWidth={2.6} />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-auto rounded-[14px] border-slate-200 bg-white p-2 shadow-xl"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;
              onChange(formatDmy(date));
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function MBankingTransactionDateRange() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const todayPlaceholder = React.useMemo(() => getTodayDmy(), []);

  return (
    <section className="mt-7">
      <div className="flex h-[41px] w-full items-center overflow-hidden rounded-[9px] bg-[#F2F2F2]">
        <DateInputField
          value={startDate}
          onChange={setStartDate}
          placeholder={todayPlaceholder}
          ariaLabel="Tanggal awal"
        />

        <div className="h-[24px] w-px shrink-0 bg-[#D8D8D8]" />

        <DateInputField
          value={endDate}
          onChange={setEndDate}
          placeholder={todayPlaceholder}
          ariaLabel="Tanggal akhir"
        />
      </div>
    </section>
  );
}