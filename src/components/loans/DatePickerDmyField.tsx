"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

function formatDmy(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = String(date.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

function parseDmyToDate(value: string): Date | undefined {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec((value ?? "").trim());
  if (!m) return undefined;
  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);
  const d = new Date(yyyy, mm - 1, dd);
  if (
    d.getFullYear() !== yyyy ||
    d.getMonth() !== mm - 1 ||
    d.getDate() !== dd
  ) {
    return undefined;
  }
  return d;
}

export default function DatePickerDmyField({
  value,
  onChange,
  className,
  inputClassName,
  popoverAlign = "start",
  placeholder = "DD-MM-YYYY",
  disabled = false,
  calendarClassName,
  calendarCaptionLayout = "label",
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  inputClassName?: string;
  popoverAlign?: "start" | "end" | "center";
  placeholder?: string;
  disabled?: boolean;
  calendarClassName?: string;
  calendarCaptionLayout?: "label" | "dropdown";
}) {
  const [open, setOpen] = React.useState(false);
  const selected = React.useMemo(() => parseDmyToDate(value), [value]);

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
                onChange={(e) => onChange(e.target.value)}
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
          className={cn(
          "z-[100] w-auto max-w-[280px] overflow-hidden rounded-[10px] border-slate-200 bg-white p-2 shadow-xl",
          calendarClassName,
        )}
        >
          <Calendar
            mode="single"
            selected={selected}
            captionLayout={calendarCaptionLayout}
            fromYear={2000}
            toYear={2100}
            className="w-[260px] max-w-full overflow-hidden p-1"
            classNames={{
              months: "flex w-full flex-col",
              month: "w-full space-y-2",
              month_caption: "relative flex h-9 w-full items-center justify-center rounded-[4px] bg-[#d9dde3] px-1",
              caption_label: "hidden",
              caption_dropdowns: "flex w-full items-center justify-center gap-1",
              months_dropdown: "w-[108px]",
              years_dropdown: "w-[78px]",
              dropdown: "h-7 rounded-[3px] border border-slate-300 bg-white px-1 text-[14px] text-slate-900 outline-none",
              nav: "pointer-events-none absolute inset-x-2 top-0 z-10 flex h-9 items-center justify-between",
              button_previous: "pointer-events-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-[#22252b] p-0 text-white hover:bg-[#343840]",
              button_next: "pointer-events-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-[#22252b] p-0 text-white hover:bg-[#343840]",
              month_grid: "w-[252px] table-fixed border-collapse",
              weekdays: "table-row",
              weekday: "table-cell h-7 w-[36px] p-0 text-center text-[11px] font-semibold leading-7 text-[#334155]",
              week: "table-row",
              day: "table-cell h-7 w-[36px] border border-white bg-[#eef0f2] p-0 text-center align-middle [&>button]:mx-auto",
              day_button: "inline-flex h-7 w-full items-center justify-center rounded-none p-0 text-[11px] font-normal text-[#17345f] hover:bg-slate-200",
              selected: "bg-transparent text-[#6d4aff] font-semibold",
              today: "bg-[#eef0f2] text-[#6d4aff]",
              outside: "bg-[#f8f9fa] text-slate-400 opacity-100",
            }}
            onSelect={(d) => {
              if (!d) return;
              onChange(formatDmy(d));
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}