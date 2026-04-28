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
        "min-w-0 overflow-hidden rounded-[5px] bg-[#1aa0b5] text-white shadow-sm ring-1 ring-white/10",
        className,
      )}
    >
      <div className="min-w-0 px-6 py-5 sm:px-7 sm:py-6">
        <div className="min-w-0 text-sm font-extrabold tracking-wide">
          <span className="block break-words">{title}</span>
        </div>

        <div
          className={cn(
            "mt-4 grid min-w-0 gap-x-6 gap-y-4 sm:gap-x-10",
            // Lebih fleksibel agar tidak mendorong overflow saat zoom kecil
            "[grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]",
          )}
        >
          {items.map((it, idx) => (
            <div key={`${it.label}-${idx}`} className="min-w-0 max-w-full">
              <div className="text-xs font-semibold text-white/85">
                <span className="block break-words">{it.label}</span>
              </div>

              <div className="mt-0.5 text-sm font-extrabold tracking-tight">
                <span className="block break-words leading-snug">{it.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}