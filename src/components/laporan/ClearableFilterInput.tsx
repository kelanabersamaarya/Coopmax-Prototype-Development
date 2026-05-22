"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ClearableFilterInput({
  value,
  onChange,
  placeholder,
  className,
  inputMode,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={cn(
          "h-[30px] w-full rounded-[5px] border border-slate-200 bg-white px-3 pr-11",
          "text-[12.5px] font-normal text-slate-900 shadow-sm",
          "placeholder:text-[#64748B]",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          className,
        )}
      />

      <button
        type="button"
        onClick={() => onChange("")}
        className={cn(
          "absolute right-0 top-0 inline-flex h-[30px] w-[38px] items-center justify-center",
          "rounded-r-[5px] rounded-l-none bg-[#77839A] text-white",
          "ring-1 ring-[#77839A]/20 transition hover:bg-[#6b768c]",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        )}
        aria-label="Clear"
        title="Clear"
      >
        <X className="h-4 w-4" strokeWidth={3} />
      </button>
    </div>
  );
}