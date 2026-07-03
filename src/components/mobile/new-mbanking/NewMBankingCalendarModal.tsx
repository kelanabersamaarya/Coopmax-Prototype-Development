"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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

export default function NewMBankingCalendarModal({
  open,
  title,
  value,
  onClose,
  onSelect,
}: {
  open: boolean;
  title: string;
  value: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const selectedDate = React.useMemo(() => parseDmyToDate(value), [value]);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
  }, [open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[130] flex items-center justify-center bg-black/35 px-5">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup kalender"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-[350px] overflow-hidden rounded-[18px] bg-white",
          "shadow-[0_20px_55px_rgba(15,23,42,0.28)] ring-1 ring-black/5",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#EEF0F4] px-5 py-4">
          <div className="text-[16px] font-bold leading-tight text-black">
            {title}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="flex justify-center px-3 py-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;
              onSelect(formatDmy(date));
              onClose();
            }}
            initialFocus
          />
        </div>
      </div>
    </div>,
    mobileScreen,
  );
}