"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const bpjsMonthOptions = ["1 Bulan", "2 Bulan", "3 Bulan", "6 Bulan", "12 Bulan"];

export default function NewMBankingBpjsMonthSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const hasValue = value.trim().length > 0;

  React.useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (wrapperRef.current?.contains(target)) return;
      setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex h-[44px] w-full items-center justify-between gap-3 border border-[#CDD4E0] bg-white px-4",
          "text-left text-[14px] font-normal shadow-none outline-none",
          "transition active:scale-[0.99]",
          open
            ? "rounded-t-[12px] rounded-b-none border-b-transparent"
            : "rounded-[12px]",
        )}
        aria-expanded={open}
        aria-label="Pilih jumlah bulan BPJS"
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            hasValue ? "text-black" : "text-[#8F8F8F]",
          )}
        >
          {hasValue ? value : "Pilih Jumlah Bulan"}
        </span>
        <ChevronDown
          className={cn(
            "h-[19px] w-[19px] shrink-0 text-[#8F8F8F] transition-transform duration-200",
            open ? "rotate-180" : "rotate-0",
          )}
          strokeWidth={2.7}
        />
      </button>

      {open ? (
        <div
          className={cn(
            "absolute left-0 right-0 top-full z-30 overflow-hidden",
            "rounded-b-[12px] rounded-t-none border border-t-0 border-[#CDD4E0] bg-white",
            "shadow-[0_14px_28px_rgba(15,23,42,0.10)]",
          )}
        >
          {bpjsMonthOptions.map((option) => {
            const selected = option === value;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={cn(
                  "block h-[42px] w-full px-4 text-left text-[14px] font-normal transition",
                  selected
                    ? "bg-[#EEF6FF] text-[#2563EB]"
                    : "bg-white text-black hover:bg-[#EEF6FF] hover:text-[#2563EB]",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}