"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function PaymentLinkDesktopFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col overflow-hidden rounded-[30px] bg-slate-950 p-3",
        "shadow-[0_28px_80px_rgba(15,23,42,0.24)]",
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px] bg-white">
        <div className="min-h-0 flex-1 bg-white">{children}</div>
      </div>
    </div>
  );
}