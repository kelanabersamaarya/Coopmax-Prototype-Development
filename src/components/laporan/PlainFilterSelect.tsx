"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function PlainFilterSelect({
  value,
  onValueChange,
  options,
  triggerClassName,
  contentClassName,
  itemClassName,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-[30px] w-full items-center justify-between rounded-[5px]",
            "border border-slate-200 bg-white px-3",
            "text-left text-[12.5px] font-normal text-black shadow-sm",
            "transition hover:bg-white",
            "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            triggerClassName,
          )}
        >
          <span className="truncate">{value}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn(
          "w-[--radix-popover-trigger-width] overflow-hidden rounded-[5px]",
          "border-slate-200 bg-white p-0 shadow-xl",
          contentClassName,
        )}
      >
        <div className="py-0">
          {options.map((option) => {
            const active = option === value;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onValueChange(option);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-5 py-3 text-left text-[14px] font-normal transition-colors",
                  active
                    ? "bg-violet-600 text-white"
                    : "bg-white text-black hover:bg-violet-600 hover:text-white",
                  itemClassName,
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}