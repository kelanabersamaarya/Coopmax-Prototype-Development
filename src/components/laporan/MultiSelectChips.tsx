"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function MultiSelectChips({
  options,
  value,
  onChange,
  placeholder = "Pilih",
  className,
  disabledOptions = [],
}: {
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  className?: string;
  disabledOptions?: string[];
}) {
  const [open, setOpen] = React.useState(false);

  function isDisabled(opt: string) {
    return disabledOptions.includes(opt);
  }

  function toggle(opt: string) {
    if (isDisabled(opt)) return;
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt],
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-[30px] w-full items-center justify-between gap-2",
            "rounded-[5px] border border-slate-200 bg-white px-2.5 py-1",
            "text-left text-[12.5px] font-medium text-slate-900 shadow-sm",
            "transition hover:bg-slate-50",
            className,
          )}
          aria-label={placeholder}
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            {value.length === 0 ? (
              <span className="text-slate-500">{placeholder}</span>
            ) : (
              value.map((v) => (
                <span
                  key={v}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "rounded-[5px] bg-violet-600 px-2.5 py-1",
                    "text-[12.5px] font-semibold text-white",
                  )}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onChange(value.filter((x) => x !== v));
                    }}
                    className="inline-flex h-4 w-4 items-center justify-center text-white/90 transition hover:text-white"
                    aria-label={`Hapus ${v}`}
                    title="Hapus"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <span className="max-w-[220px] truncate sm:max-w-[360px]">
                    {v}
                  </span>
                </span>
              ))
            )}
          </div>

          <div className="flex items-center gap-2">
            {value.length > 0 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange([]);
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-[5px] text-slate-500 hover:bg-slate-100"
                aria-label="Clear"
                title="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}

            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[--radix-popover-trigger-width] rounded-[12px] border-slate-200 p-0 shadow-xl"
      >
        <Command className="rounded-[12px]">
          <CommandList>
            <CommandGroup>
              {options.map((opt) => {
                const checked = value.includes(opt);
                const disabled = isDisabled(opt);

                return (
                  <CommandItem
                    key={opt}
                    value={opt}
                    onSelect={() => toggle(opt)}
                    disabled={disabled}
                    className={cn(
                      "rounded-[10px]",
                      checked ? "bg-violet-50 text-violet-800" : "",
                      disabled ? "opacity-60" : "",
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">{opt}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}