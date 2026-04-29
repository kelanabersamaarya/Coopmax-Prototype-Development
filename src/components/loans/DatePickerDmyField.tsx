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
          className="w-auto rounded-[10px] border-slate-200 bg-white p-2 shadow-xl"
        >
          <Calendar
            mode="single"
            selected={selected}
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