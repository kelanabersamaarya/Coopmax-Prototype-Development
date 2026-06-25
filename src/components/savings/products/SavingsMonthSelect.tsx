"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const monthOptions = Array.from({ length: 13 }).map((_, index) =>
  String(index),
);

export default function SavingsMonthSelect({
  value,
  onValueChange,
  placeholder = "Pilih Jumlah",
  triggerClassName,
  contentClassName,
  itemClassName,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const hasValue = value.trim().length > 0;

  React.useEffect(() => {
    if (!open) return;
    setSearch("");
  }, [open]);

  const filteredOptions = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return monthOptions;
    return monthOptions.filter((option) => option.toLowerCase().includes(q));
  }, [search]);

  function clearValue(event: React.MouseEvent | React.PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    onValueChange("");
  }

  function chooseValue(next: string) {
    onValueChange(next);
    setOpen(false);
  }

  return (
    <div className="relative">
      <style>
        {`
          .savings-month-scroll::-webkit-scrollbar {
            width: 8px;
          }

          .savings-month-scroll::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 999px;
          }

          .savings-month-scroll::-webkit-scrollbar-thumb {
            background: #94a3b8;
            border-radius: 999px;
            border: 2px solid #f1f5f9;
          }

          .savings-month-scroll::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }

          .savings-month-scroll {
            scrollbar-width: thin;
            scrollbar-color: #94a3b8 #f1f5f9;
          }
        `}
      </style>

      {hasValue ? (
        <button
          type="button"
          onPointerDown={clearValue}
          onClick={clearValue}
          className={cn(
            "absolute left-3 top-1/2 z-20 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center",
            "rounded-[4px] text-red-600 transition hover:bg-red-50",
            "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          aria-label="Hapus pilihan jumlah bulan"
          title="Hapus pilihan"
        >
          <X className="h-4 w-4" strokeWidth={3} />
        </button>
      ) : null}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-[30px] w-full items-center justify-between rounded-[5px] border border-slate-300 bg-white px-3",
              "text-left text-[14px] font-normal shadow-none",
              "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              triggerClassName,
              hasValue ? "!pl-10 !text-black" : "text-[#64748B]",
            )}
          >
            <span className="block min-w-0 flex-1 truncate text-left">
              {hasValue ? value : placeholder}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className={cn(
            "w-[--radix-popover-trigger-width] overflow-hidden rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
            contentClassName,
          )}
        >
          <div className="border-b border-slate-200 bg-white p-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari..."
              className={cn(
                "h-[30px] w-full rounded-[5px] border border-slate-300 bg-white px-3",
                "text-[14px] font-normal text-black shadow-none",
                "placeholder:text-[#64748B]",
                "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              )}
            />
          </div>

          <div className="savings-month-scroll max-h-[170px] overflow-y-auto bg-white py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const active = option === value;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => chooseValue(option)}
                    className={cn(
                      "block w-full px-4 py-2.5 text-left text-[14px] font-normal transition-colors",
                      active
                        ? "bg-violet-600 text-white"
                        : "bg-white text-black hover:bg-violet-600 hover:text-white",
                      itemClassName,
                    )}
                  >
                    {option}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-[13px] font-normal text-slate-500">
                Tidak ada hasil.
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}