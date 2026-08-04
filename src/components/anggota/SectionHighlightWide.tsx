"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { CalendarRange, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function LoanChangeInfo() {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const heading = Array.from(document.querySelectorAll<HTMLElement>("div")).find(
      (element) => element.textContent?.trim() === "INFORMASI TAGIHAN DAN DENDA",
    );

    const divider = heading?.nextElementSibling;

    if (!heading || !divider?.parentElement) return;

    const portalTarget = document.createElement("div");
    portalTarget.className = "loan-change-info-target";

    divider.insertAdjacentElement("afterend", portalTarget);
    setTarget(portalTarget);

    return () => {
      portalTarget.remove();
    };
  }, []);

  if (!target) return null;

  return createPortal(
    <div className="mb-4 rounded-[12px] border border-blue-200 bg-blue-50 px-4 py-3">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Info className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-extrabold text-slate-900">
            Informasi Perubahan Pinjaman
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
            Terdapat penyesuaian pada rekening pinjaman, tabel tagihan dibawah
            ini telah disesuaikan dengan perubahan yang dilakuan.
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-[8px] bg-white px-3 py-2 ring-1 ring-blue-100">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[15px] font-extrabold text-blue-700">
                %
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-slate-500">
                  Suku Bunga
                </div>
                <div className="text-[12px] font-extrabold text-slate-900">
                  12,00% → 10,00% per tahun
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-[8px] bg-white px-3 py-2 ring-1 ring-blue-100">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <CalendarRange className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold text-slate-500">
                  Tenor Pinjaman
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-extrabold text-slate-900">
                    12 → 18 bulan
                  </span>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
                        aria-label="Informasi perubahan tenor pinjaman"
                      >
                        <Info className="h-3 w-3" strokeWidth={3} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="z-[9999] max-w-[280px] rounded-[8px] border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold leading-relaxed text-slate-800 shadow-xl">
                      Terdapat penambahan tenor pinjaman dari tenor awal sebesar
                      12 bulan menjadi 18 bulan
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    target,
  );
}

export default function SectionHighlightWide({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const showLoanChangeInfo = title === "Tagihan dan Pembayaran Angsuran";

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full text-center text-[14px] font-semibold tracking-tight text-slate-900">
        {title}
      </div>
      <div className="mt-2 h-px w-full bg-slate-300/70" />

      {showLoanChangeInfo ? <LoanChangeInfo /> : null}
    </div>
  );
}