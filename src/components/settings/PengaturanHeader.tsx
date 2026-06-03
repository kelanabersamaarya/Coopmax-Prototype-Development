"use client";

import * as React from "react";
import { Settings2, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PengaturanHeader({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[5px] bg-[#111827] text-white shadow-sm ring-1 ring-slate-900/10",
        className,
      )}
    >
      <div className="relative px-5 py-5 sm:px-6 md:px-7">
        <div className="absolute inset-y-0 left-0 w-1 bg-violet-500" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/85 ring-1 ring-white/10">
              <Wrench className="h-3.5 w-3.5" />
              Pengaturan Umum
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-white md:text-[30px]">
                Pengaturan
              </h1>
              <span className="text-[14px] font-semibold text-white/60">
                Konfigurasi
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-[13px] font-medium leading-relaxed text-white/70">
              Kelola konfigurasi dasar aplikasi dan pengaturan operasional dari
              menu ini.
            </p>
          </div>

          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[5px] bg-white/10 text-white ring-1 ring-white/15">
            <Settings2 className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}