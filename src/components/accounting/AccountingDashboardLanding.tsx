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
        "relative min-h-[560px] overflow-hidden rounded-[5px] bg-[#edf1f7] shadow-sm ring-1 ring-slate-200/70",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[#eef2f7]" />

      <div className="absolute left-[6%] top-[14%] h-[52%] w-[22%] rounded-[3px] bg-[#d7dde7] shadow-sm">
        <div className="absolute inset-x-4 top-4 h-[42%] rounded-[2px] bg-[#f8fafc]" />
        <div className="absolute inset-x-4 bottom-4 h-[32%] rounded-[2px] bg-[#c7d0dd]" />
      </div>

      <div className="absolute left-[31%] top-[10%] h-[56%] w-[34%] rounded-[3px] bg-[#d5dce7] shadow-sm">
        <div className="absolute left-5 top-5 h-[38%] w-[40%] rounded-[2px] bg-[#f8fafc]" />
        <div className="absolute right-5 top-5 h-[38%] w-[40%] rounded-[2px] bg-[#f8fafc]" />
        <div className="absolute bottom-5 left-5 right-5 h-[28%] rounded-[2px] bg-[#c4cedd]" />
      </div>

      <div className="absolute right-[6%] top-[16%] h-[50%] w-[23%] rounded-[3px] bg-[#d7dde7] shadow-sm">
        <div className="absolute inset-x-4 top-4 h-[40%] rounded-[2px] bg-[#f8fafc]" />
        <div className="absolute inset-x-4 bottom-4 h-[34%] rounded-[2px] bg-[#c7d0dd]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[#d7dde6]" />
      <div className="absolute bottom-[28%] left-0 h-px w-full bg-slate-300/70" />

      <div className="absolute bottom-[10%] left-[14%] h-[96px] w-[22%] rounded-[4px] bg-[#2f3746] shadow-[0_14px_28px_rgba(15,23,42,0.18)]" />
      <div className="absolute bottom-[8%] left-[18%] h-[8px] w-[16%] rounded-full bg-[#202736]" />

      <div className="absolute bottom-[14%] right-[12%] h-[118px] w-[26%] rounded-[4px] bg-[#333b4a] shadow-[0_14px_28px_rgba(15,23,42,0.18)]" />
      <div className="absolute bottom-[11%] right-[17%] h-[8px] w-[18%] rounded-full bg-[#202736]" />

      <div className="absolute bottom-[26%] left-[43%] h-[116px] w-[14px] rounded-full bg-[#556171]" />
      <div className="absolute bottom-[24%] left-[39%] h-[18px] w-[8%] rounded-full bg-[#556171]" />

      <div className="absolute inset-0 bg-white/20" />

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