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

export default function MBankingTransactionDateRange() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const todayPlaceholder = React.useMemo(() => getTodayDmy(), []);

  const inputClassName = cn(
    "h-[41px] w-full rounded-[9px] border-0 bg-[#F2F2F2] px-4 pr-11",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9A9A]",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

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

      <div className="mt-4 grid gap-4">
        <div className="grid gap-2">
          <label className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
            Tanggal Awal
          </label>

          <div className="relative">
            <input
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              placeholder={todayPlaceholder}
              inputMode="numeric"
              className={inputClassName}
            />

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7B7B7B]">
              <CalendarDays className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
            Tanggal Akhir
          </label>

          <div className="relative">
            <input
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              placeholder={todayPlaceholder}
              inputMode="numeric"
              className={inputClassName}
            />

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7B7B7B]">
              <CalendarDays className="h-5 w-5" />
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={showHistory}
          className={cn(
            "mt-1 inline-flex h-[41px] w-full items-center justify-center gap-2 rounded-[9px]",
            "bg-[#004FC7] text-[14px] font-semibold text-white",
            "shadow-[0_3px_8px_rgba(0,79,199,0.22)]",
            "transition hover:bg-[#0046B3] active:translate-y-px",
          )}
        >
          <Search className="h-4.5 w-4.5" />
          Tampilkan Riwayat
        </button>
      </div>
    </section>
  );
}