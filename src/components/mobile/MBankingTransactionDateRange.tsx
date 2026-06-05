"use client";

import * as React from "react";
import { CalendarDays, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function getTodayDmy() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = String(today.getFullYear());

  return `${day}-${month}-${year}`;
}

function DateInputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="min-w-0">
      <label className="block text-[13px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
        {label}
      </label>

      <div className="relative mt-[9px]">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          inputMode="numeric"
          className={cn(
            "h-[41px] w-full rounded-[9px] border-0 bg-[#F2F2F2] px-3 pr-9",
            "text-[13px] font-normal text-black shadow-none",
            "placeholder:text-[13px] placeholder:font-normal placeholder:text-[#9A9A9A]",
            "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7B7B7B]">
          <CalendarDays className="h-[18px] w-[18px]" />
        </span>
      </div>
    </div>
  );
}

export default function MBankingTransactionDateRange() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const todayPlaceholder = React.useMemo(() => getTodayDmy(), []);

  function showHistory() {
    toast.success("Riwayat transaksi ditampilkan (prototype)", {
      description: `${startDate || todayPlaceholder} sampai ${
        endDate || todayPlaceholder
      }`,
    });
  }

  return (
    <section className="mt-7">
      <div className="text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
        Riwayat Transaksi
      </div>

      <div className="mt-4 grid grid-cols-2 gap-[12px]">
        <DateInputField
          label="Tanggal Awal"
          value={startDate}
          onChange={setStartDate}
          placeholder={todayPlaceholder}
        />

        <DateInputField
          label="Tanggal Akhir"
          value={endDate}
          onChange={setEndDate}
          placeholder={todayPlaceholder}
        />
      </div>

      <button
        type="button"
        onClick={showHistory}
        className={cn(
          "mt-[14px] inline-flex h-[41px] w-full items-center justify-center gap-2 rounded-[9px]",
          "bg-[#004FC7] text-[14px] font-semibold text-white",
          "shadow-[0_3px_8px_rgba(0,79,199,0.22)]",
          "transition hover:bg-[#0046B3] active:translate-y-px",
        )}
      >
        <Search className="h-[17px] w-[17px]" />
        Tampilkan Riwayat
      </button>
    </section>
  );
}