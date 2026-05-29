"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
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
            "h-[30px] w-full justify-between rounded-[5px] border-slate-200 bg-white px-3 text-left text-[12.5px] font-normal shadow-sm",
            "hover:bg-white hover:text-slate-900",
            "focus:text-slate-900 focus-visible:text-slate-900",
            "data-[state=open]:text-slate-900",
            hasSelected ? "text-slate-900" : "text-slate-500 hover:text-slate-500",
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
          "w-[--radix-popover-trigger-width] rounded-[5px] border-slate-200 p-0 shadow-xl",
          contentClassName,
        )}
      >
        <Command
          className={cn(
            "rounded-[5px]",
            "[&_[cmdk-input-wrapper]_svg]:hidden",
            "[&_[cmdk-input-wrapper]]:px-3",
          )}
        >
          <CommandInput
            placeholder=""
            className="h-9 border-0 text-[13px] focus:ring-0"
          />
          <CommandList className="max-h-[260px]">
            <CommandEmpty>Tidak ada KP yang cocok.</CommandEmpty>
            <CommandGroup>
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
                      "rounded-none px-3 py-2.5 text-[13px] font-normal",
                      "text-slate-900 transition-colors",
                      "hover:bg-violet-600 hover:text-white",
                      "data-[selected=true]:bg-violet-600 data-[selected=true]:text-white",
                      selected ? "bg-slate-100 text-slate-900" : "",
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">{option}</span>
                    {selected ? (
                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0",
                          "text-slate-600 group-data-[selected=true]:text-white",
                        )}
                      />
                    ) : null}
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