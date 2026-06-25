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
            "bg-black text-white",
            "ring-1 ring-black/20 shadow-sm",
            "outline-none transition hover:bg-slate-800",
            "focus-visible:ring-4 focus-visible:ring-black/20",
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
          "max-w-[360px] rounded-[5px] border-slate-900 bg-black px-4 py-3",
          "text-[13px] font-normal leading-relaxed text-white shadow-xl",
        )}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}