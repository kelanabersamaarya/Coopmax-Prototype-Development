"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function NumericCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "block w-full text-right whitespace-nowrap",
        "num-sans-tabular",
        className,
      )}
    >
      {children}
    </span>
  );
}