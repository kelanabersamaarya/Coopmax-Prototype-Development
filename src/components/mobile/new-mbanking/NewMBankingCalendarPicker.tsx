"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const dayLabels = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

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

function isSameDate(a: Date | null, b: Date) {
  if (!a) return false;

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildCalendarDays(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<Date | null> = [];

  for (let i = 0; i < startDay; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

export default function NewMBankingCalendarPicker({
  value,
  onSave,
}: {
  value: string;
  onSave: (value: string) => void;
}) {
  const initialSelectedDate = React.useMemo(
    () => parseDmyToDate(value) ?? new Date(),
    [value],
  );

  const [viewDate, setViewDate] = React.useState(
    () => new Date(initialSelectedDate.getFullYear(), initialSelectedDate.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    initialSelectedDate,
  );

  React.useEffect(() => {
    const parsed = parseDmyToDate(value);
    if (!parsed) return;

    setSelectedDate(parsed);
    setViewDate(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
  }, [value]);

  const days = React.useMemo(() => buildCalendarDays(viewDate), [viewDate]);

  function moveMonth(direction: -1 | 1) {
    setViewDate(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + direction, 1),
    );
  }

  return (
    <div className="bg-white">
      <div className="rounded-[16px] border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-3">
        <div className="flex h-[44px] items-center justify-between rounded-[12px] bg-white px-2 shadow-sm ring-1 ring-[#E5E7EB]">
          <button
            type="button"
            onClick={() => moveMonth(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-black transition active:scale-[0.96] active:bg-[#EEF0F4]"
            aria-label="Bulan sebelumnya"
            title="Bulan sebelumnya"
          >
            <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.7} />
          </button>

          <div className="text-center text-[16px] font-bold leading-none text-black">
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </div>

          <button
            type="button"
            onClick={() => moveMonth(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-black transition active:scale-[0.96] active:bg-[#EEF0F4]"
            aria-label="Bulan berikutnya"
            title="Bulan berikutnya"
          >
            <ChevronRight className="h-[22px] w-[22px]" strokeWidth={2.7} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1">
          {dayLabels.map((day) => (
            <div
              key={day}
              className="grid h-[30px] place-items-center text-[12px] font-bold text-[#8F8F8F]"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const selected = date ? isSameDate(selectedDate, date) : false;

            return (
              <div key={`${date?.toISOString() ?? "empty"}-${index}`} className="h-[38px]">
                {date ? (
                  <button
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "grid h-[38px] w-full place-items-center rounded-[12px]",
                      "text-[14px] font-semibold transition active:scale-[0.94]",
                      selected
                        ? "bg-[#479DF4] text-white shadow-[0_6px_14px_rgba(71,157,244,0.28)]"
                        : "bg-transparent text-black hover:bg-[#EEF6FF]",
                    )}
                    aria-pressed={selected}
                  >
                    {date.getDate()}
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSave(formatDmy(selectedDate ?? new Date()))}
        className={cn(
          "mt-4 h-[46px] w-full rounded-[10px] bg-[#479DF4]",
          "text-[12px] font-semibold leading-none text-white",
          "transition active:scale-[0.98]",
        )}
      >
        Simpan
      </button>
    </div>
  );
}