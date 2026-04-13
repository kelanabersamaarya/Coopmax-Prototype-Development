"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Item = { label: string; value: React.ReactNode };

export default function InformasiRekeningHeader({
  title = "PINJAMAN BULANAN 9",
  items,
  className,
}: {
  title?: string;
  items: Item[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl bg-[#1aa0b5] text-white shadow-sm ring-1 ring-white/10",
        className,
      )}
    >
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <div className="text-sm font-extrabold tracking-wide">{title}</div>

        <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <div key={`${it.label}-${idx}`} className="min-w-0">
              <div className="text-xs font-semibold text-white/85">
                {it.label}
              </div>
              <div className="mt-0.5 truncate text-sm font-extrabold tracking-tight">
                {it.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}