"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function RequiredMark({ className }: { className?: string }) {
  return (
    <span className={cn("text-rose-600", className)} aria-hidden="true">
      *
    </span>
  );
}