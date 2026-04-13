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
        "min-w-0 overflow-hidden rounded-3xl bg-[#1aa0b5] text-white shadow-sm ring-1 ring-white/10",
        className,
      )}
    >
      <div className="min-w-0 px-5 py-4 sm:px-6 sm:py-5">
        <div className="min-w-0 text-sm font-extrabold tracking-wide">
          <span className="block break-words">{title}</span>
        </div>

        <div
          className={cn(
            "mt-4 grid min-w-0 gap-x-8 gap-y-4",
            // Auto-fit lebih tahan zoom daripada breakpoint kolom fixed
            "[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]",
          )}
        >
          {items.map((it, idx) => (
            <div
              key={`${it.label}-${idx}`}
              className="min-w-0 max-w-full"
            >
              <div className="text-xs font-semibold text-white/85">
                <span className="block break-words">{it.label}</span>
              </div>

              <div className="mt-0.5 text-sm font-extrabold tracking-tight">
                {/* Jangan biarkan value memaksa satu baris panjang */}
                <span className="block break-words leading-snug">
                  {it.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}