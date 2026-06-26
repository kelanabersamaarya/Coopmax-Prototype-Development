"use client";

import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { cashFlowOptionGroups } from "@/components/accounting/cash-flow-options";

export default function CashFlowSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
          "text-[14px] font-normal text-[#4B5F7B] shadow-none",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          "[&>svg]:hidden",
        )}
      >
        <SelectValue />
        <span className="ml-auto inline-flex h-4 w-4 items-center justify-center text-[#526685]">
          <ChevronDown className="h-4 w-4" />
        </span>
      </SelectTrigger>

      <SelectContent
        className={cn(
          "max-h-[360px] rounded-[5px] border-slate-200 bg-white p-0 shadow-xl",
          "[&_[data-radix-select-item-indicator]]:hidden",
          "[&_[data-slot=select-item-indicator]]:hidden",
          "[&>span.absolute.right-2]:hidden",
          "[&_[data-radix-collection-item]]:pl-6",
          "[&_[data-radix-collection-item]]:pr-4",
        )}
      >
        <SelectItem
          value="(kosong)"
          className={cn(
            "rounded-none px-4 py-2.5 text-[14px] font-normal text-black",
            "hover:bg-violet-600 hover:text-white",
            "focus:bg-violet-600 focus:text-white",
            "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
            "data-[state=checked]:bg-white data-[state=checked]:text-black",
          )}
        >
          (kosong)
        </SelectItem>

        {cashFlowOptionGroups.map((group) => (
          <div key={group.title}>
            <div className="px-4 pb-1.5 pt-3 text-[15.5px] font-extrabold leading-snug text-black">
              {group.title}
            </div>

            {group.items.map((item) => (
              <SelectItem
                key={item}
                value={item}
                className={cn(
                  "rounded-none py-2.5 pl-7 pr-4 text-[14px] font-normal text-black",
                  "hover:bg-violet-600 hover:text-white",
                  "focus:bg-violet-600 focus:text-white",
                  "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
                  "data-[state=checked]:bg-white data-[state=checked]:text-black",
                  "[&_[data-radix-select-item-indicator]]:hidden",
                  "[&_[data-slot=select-item-indicator]]:hidden",
                  "[&>span.absolute.right-2]:hidden",
                )}
              >
                {item}
              </SelectItem>
            ))}
          </div>
        ))}
      </SelectContent>
    </Select>
  );
}