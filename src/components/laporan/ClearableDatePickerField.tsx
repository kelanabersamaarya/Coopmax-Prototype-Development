"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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

export default function ClearableDatePickerField({
  value,
  onChange,
  placeholder,
  className,
  popoverAlign = "start",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  popoverAlign?: "start" | "end" | "center";
}) {
  const [open, setOpen] = React.useState(false);
  const selected = React.useMemo(() => parseDmyToDate(value), [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <button
            type="button"
            className="block w-full text-left"
            aria-label="Pilih tanggal"
            title="Pilih tanggal"
          >
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              inputMode="numeric"
              className={cn(
                "h-[30px] w-full rounded-[5px] border border-slate-200 bg-white px-3 pr-11",
                "text-[12.5px] font-normal text-slate-900 shadow-sm",
                "placeholder:text-[#64748B]",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                className,
              )}
            />
          </button>
        </PopoverTrigger>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange("");
            setOpen(false);
          }}
          className={cn(
            "absolute right-0 top-0 inline-flex h-[30px] w-[38px] items-center justify-center",
            "rounded-r-[5px] rounded-l-none bg-[#77839A] text-white",
            "ring-1 ring-[#77839A]/20 transition hover:bg-[#6b768c]",
            "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          aria-label="Clear tanggal"
          title="Clear"
        >
          <X className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>

      <PopoverContent
        align={popoverAlign}
        className="w-auto rounded-[10px] border-slate-200 bg-white p-2 shadow-xl"
      >
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            if (!date) return;
            onChange(formatDmy(date));
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}