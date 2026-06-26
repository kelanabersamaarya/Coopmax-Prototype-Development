"use client";

import { CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AccountingDashboardLanding({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative min-h-[560px] overflow-hidden rounded-[5px] bg-white shadow-sm ring-1 ring-slate-200/70",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80)",
        }}
      />

      <div className="absolute inset-0 bg-white/10" />

      <div className="relative z-10 px-5 pt-[104px] md:px-6">
        <div className="w-full max-w-[420px]">
          <label className="text-[14px] font-normal text-[#002060]">
            Tanggal
          </label>

          <div className="mt-2 flex h-[30px] overflow-hidden rounded-[5px] border border-slate-300 bg-white">
            <span className="inline-flex h-full w-[52px] items-center justify-center border-r border-slate-300 bg-slate-100 text-slate-500">
              <CalendarDays className="h-5 w-5" strokeWidth={2.2} />
            </span>

            <Input
              value="26/06/2026"
              readOnly
              className={cn(
                "h-full flex-1 rounded-none border-0 bg-white px-3",
                "text-[14px] font-normal text-[#334155] shadow-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}