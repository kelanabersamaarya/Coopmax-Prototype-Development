"use client";

import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function SearchableFeeCoaSelect({
  value,
  placeholder,
  options,
  onChange,
  triggerClassName,
  contentClassName,
}: {
  value?: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  triggerClassName?: string;
  contentClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const hasSelected = !!value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-[30px] w-full justify-between rounded-[5px] border-slate-200 bg-white px-3 text-left text-[12.5px] font-normal shadow-sm hover:bg-white",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            hasSelected ? "text-slate-900" : "text-slate-500",
            triggerClassName,
          )}
        >
          <span className="min-w-0 flex-1 truncate text-left">
            {value || placeholder}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-slate-500" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "w-[--radix-popover-trigger-width] overflow-hidden rounded-[5px] border border-slate-200 bg-white p-0 shadow-xl",
          "border-t-4 border-t-violet-600",
          contentClassName,
        )}
      >
        <Command className="rounded-none bg-white">
          <div className="border-b border-slate-100 bg-white px-3 py-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <CommandInput
                placeholder="Cari CoA..."
                className={cn(
                  "h-9 rounded-[5px] border border-slate-200 bg-white pl-9 pr-3",
                  "text-[13px] font-normal text-slate-900 placeholder:text-slate-400",
                  "focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              />
            </div>
          </div>

          <CommandList className="max-h-[280px] bg-white py-2">
            <CommandEmpty className="px-4 py-6 text-center text-[13px] text-slate-500">
              Tidak ada CoA yang cocok.
            </CommandEmpty>

            <CommandGroup className="p-0">
              {options.map((option) => {
                const selected = value === option;

                return (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer rounded-none px-5 py-4 text-[14px] font-normal text-slate-900",
                      "transition-colors hover:bg-slate-50",
                      "data-[selected=true]:bg-slate-50 data-[selected=true]:text-slate-900",
                      selected ? "bg-slate-50 text-slate-900" : "",
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">{option}</span>
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