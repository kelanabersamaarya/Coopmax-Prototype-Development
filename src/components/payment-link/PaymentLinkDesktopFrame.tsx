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
        <div className="flex h-[46px] shrink-0 items-center gap-3 border-b border-slate-200 bg-slate-100 px-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>

          <div className="mx-auto hidden h-7 min-w-0 max-w-[520px] flex-1 items-center justify-center rounded-full bg-white px-4 text-[12px] font-semibold text-slate-500 ring-1 ring-slate-200 md:flex">
            payment-link.coopmax/status-pembayaran
          </div>

          <div className="hidden w-[72px] md:block" />
        </div>

        <div className="min-h-0 flex-1 bg-white">{children}</div>
      </div>
    </div>
  );
}