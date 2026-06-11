import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { loanProductOptions, UI } from "./loan-account-edit-options";
import type { LoanProductOption } from "./loan-account-edit-types";

export default function LoanAccountProductCombobox({
  value,
  onChange,
}: {
  value: LoanProductOption | "Pilih Pinjaman";
  onChange: (v: LoanProductOption) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between border border-slate-200 bg-white px-3 text-left font-medium shadow-sm transition hover:bg-slate-50",
            UI.h,
            UI.radius,
            UI.text,
          )}
        >
          <span className={cn(value === "Pilih Pinjaman" ? "text-[#64748B]" : "text-slate-900")}>
            {value}
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn("w-[--radix-popover-trigger-width] border-slate-200 p-0", UI.radius)}
      >
        <Command className={cn(UI.radius)}>
          <CommandInput placeholder="Cari..." />
          <CommandList>
            <CommandEmpty>Tidak ada hasil.</CommandEmpty>
            <CommandGroup>
              {loanProductOptions.map((opt) => (
                <CommandItem
                  key={opt}
                  value={opt}
                  onSelect={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={cn(UI.radius)}
                >
                  <span className="min-w-0 flex-1 truncate">{opt}</span>
                  {value === opt ? (
                    <Check className="h-4 w-4 text-[hsl(var(--app-accent-2))]" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
