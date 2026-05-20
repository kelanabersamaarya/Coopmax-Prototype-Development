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

export default function UpdateStatusDateField({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const selected = React.useMemo(() => parseDmyToDate(value), [value]);

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        {/* ✅ Seluruh field menjadi trigger */}
        <PopoverTrigger asChild>
          <button
            type="button"
            className="block w-full text-left"
            aria-label="Pilih tanggal"
            title="Pilih tanggal"
          >
            <div className="relative">
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                  "h-[30px] rounded-[5px] border-slate-200 bg-white pr-10 text-[12.5px] font-normal text-slate-900 shadow-sm",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
                placeholder="DD-MM-YYYY"
                inputMode="numeric"
              />

              {/* Icon tetap terlihat, tapi bukan satu-satunya trigger */}
              <span className="pointer-events-none absolute right-0 top-0 grid h-[30px] w-10 place-items-center text-slate-500">
                <CalendarDays className="h-4.5 w-4.5" />
              </span>
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-auto rounded-[12px] border-slate-200 bg-white p-2 shadow-xl"
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