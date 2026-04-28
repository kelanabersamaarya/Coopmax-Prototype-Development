"use client";

import * as React from "react";
import { Info } from "lucide-react";
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
            "ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full",
            "bg-[hsl(var(--app-accent))]/10 text-[hsl(var(--app-accent-2))]",
            "ring-1 ring-[hsl(var(--app-accent))]/20 transition hover:bg-[hsl(var(--app-accent))]/15",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--app-accent))]/25",
            className,
          )}
          aria-label="Info"
        >
          <Info className={cn("h-4 w-4", iconClassName)} />
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