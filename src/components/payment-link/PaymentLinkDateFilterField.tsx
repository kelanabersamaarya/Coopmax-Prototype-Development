"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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

export default function PaymentLinkDateFilterField({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const selectedDate = React.useMemo(() => parseDmyToDate(value), [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="block w-full text-left"
          aria-label="Pilih tanggal pengiriman pengingat"
          title="Pilih tanggal"
        >
          <div className="relative">
            <Input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              className={cn(className, "pr-10")}
              placeholder=""
              inputMode="numeric"
            />

            <span className="pointer-events-none absolute right-0 top-0 grid h-8 w-9 place-items-center text-slate-500">
              <CalendarDays className="h-4 w-4" />
            </span>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-auto rounded-[10px] border-slate-200 bg-white p-2 shadow-xl"
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
  );
}