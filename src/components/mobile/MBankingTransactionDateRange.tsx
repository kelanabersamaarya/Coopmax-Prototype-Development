"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

function getTodayDmy() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = String(today.getFullYear());

  return `${day}-${month}-${year}`;
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

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7B7B7B]">
        <CalendarDays className="h-[18px] w-[18px]" />
      </span>
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