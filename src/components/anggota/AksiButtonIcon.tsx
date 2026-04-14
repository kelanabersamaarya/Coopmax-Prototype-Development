"use client";

import * as React from "react";
import { ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AksiButtonIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--app-accent))]/10 text-[hsl(var(--app-accent-2))] ring-1 ring-[hsl(var(--app-accent))]/15",
        className,
      )}
      aria-hidden="true"
    >
      <ListChecks className="h-4 w-4" />
    </span>
  );
}