"use client";

import * as React from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

function formatDmy(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = String(date.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

function parseDmyToDate(value: string): Date | undefined {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec((value ?? "").trim());
  if (!m) return undefined;
  const date = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  return date.getFullYear() === Number(m[3]) &&
    date.getMonth() === Number(m[2]) - 1 &&
    date.getDate() === Number(m[1])
    ? date
    : undefined;
}

function sameDate(first?: Date, second?: Date) {
  return Boolean(
    first &&
      second &&
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate(),
  );
}

function getCalendarDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const start = new Date(month.getFullYear(), month.getMonth(), 1 - firstDay.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

export default function DatePickerDmyField({
  value,
  onChange,
  className,
  inputClassName,
  popoverAlign = "start",
  placeholder = "DD-MM-YYYY",
  disabled = false,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  inputClassName?: string;
  popoverAlign?: "start" | "end" | "center";
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const selected = React.useMemo(() => parseDmyToDate(value), [value]);
  const [displayMonth, setDisplayMonth] = React.useState(
    () => selected ?? new Date(),
  );
  const days = React.useMemo(() => getCalendarDays(displayMonth), [displayMonth]);
  const years = Array.from({ length: 101 }, (_, index) => 2000 + index);

  React.useEffect(() => {
    if (open && selected) setDisplayMonth(selected);
  }, [open, selected]);

  const moveMonth = (amount: number) => {
    setDisplayMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + amount, 1),
    );
  };

  const selectDate = (date: Date) => {
    onChange(formatDmy(date));
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="block w-full text-left"
            disabled={disabled}
            aria-label="Pilih tanggal"
          >
            <div className="relative">
              <Input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                inputMode="numeric"
                disabled={disabled}
                className={cn("pr-11", inputClassName)}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <CalendarDays className="h-4 w-4" />
              </span>
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent
          align={popoverAlign}
          side="bottom"
          sideOffset={6}
          collisionPadding={12}
          className="z-[100] w-[286px] rounded-[10px] border-slate-200 bg-white p-3 shadow-xl"
        >
          <div className="w-full overflow-hidden rounded-[6px] border border-slate-200 bg-white">
            <div className="relative flex h-10 items-center justify-center gap-1 bg-[#d9dde3] px-9">
              <button
                type="button"
                onClick={() => moveMonth(-1)}
                className="absolute left-1.5 inline-flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#22252b] text-white transition hover:bg-slate-700"
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <select
                value={displayMonth.getMonth()}
                onChange={(event) =>
                  setDisplayMonth(
                    new Date(displayMonth.getFullYear(), Number(event.target.value), 1),
                  )
                }
                className="h-7 w-[112px] rounded-[3px] border border-slate-300 bg-white px-2 text-[13px] text-slate-900 outline-none"
                aria-label="Pilih bulan"
              >
                {MONTHS.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>

              <select
                value={displayMonth.getFullYear()}
                onChange={(event) =>
                  setDisplayMonth(new Date(Number(event.target.value), displayMonth.getMonth(), 1))
                }
                className="h-7 w-[76px] rounded-[3px] border border-slate-300 bg-white px-2 text-[13px] text-slate-900 outline-none"
                aria-label="Pilih tahun"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => moveMonth(1)}
                className="absolute right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#22252b] text-white transition hover:bg-slate-700"
                aria-label="Bulan berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 bg-white">
              {WEEKDAYS.map((weekday) => (
                <div
                  key={weekday}
                  className="flex h-8 items-center justify-center text-[11px] font-semibold text-slate-700"
                >
                  {weekday}
                </div>
              ))}
              {days.map((date) => {
                const isCurrentMonth = date.getMonth() === displayMonth.getMonth();
                const isSelected = sameDate(date, selected);
                const isToday = sameDate(date, new Date());
                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => selectDate(date)}
                    className={cn(
                      "flex h-7 items-center justify-center border border-white bg-[#eef0f2] text-[11px] text-[#17345f] transition hover:bg-slate-200",
                      !isCurrentMonth && "bg-slate-50 text-slate-400",
                      isToday && !isSelected && "font-semibold text-[#6d4aff]",
                      isSelected && "bg-[#6d4aff] font-semibold text-white hover:bg-[#5b3de0]",
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
