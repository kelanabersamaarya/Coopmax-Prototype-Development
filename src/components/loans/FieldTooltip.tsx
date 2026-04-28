"use client";

import * as React from "react";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FieldTooltip({
  content,
  className,
  iconClassName,
}: {
  content: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "ml-2 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
            "bg-[#2563eb] text-white",
            "ring-1 ring-white shadow-sm",
            "outline-none transition hover:bg-[#1d4ed8]",
            "focus-visible:ring-4 focus-visible:ring-[#2563eb]/25",
            className,
          )}
          aria-label="Info"
          title="Info"
        >
          <HelpCircle className={cn("h-3.5 w-3.5", iconClassName)} />
        </button>
      </TooltipTrigger>

      <TooltipContent
        side="top"
        align="start"
        className={cn(
          "max-w-[360px] rounded-2xl border-slate-200 bg-white px-4 py-3",
          "text-[13px] leading-relaxed text-slate-800 shadow-xl",
        )}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}