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

const defaultTenorTooltip =
  "Terdapat penambahan tenor sebesar 6 bulan, sehingga dari tenor awal 12 bulan menjadi 18 bulan";

const nyomanTenorTooltip =
  "Terdapat pembaruan tenor pinjaman dari 12 bulan menjadi 14 bulan";

const komangTenorTooltip = "April 2027 -> April 2028";

type LoanChangeDisplay = {
  label: string;
  value: string;
  tooltip: string;
};

function getSelectedCustomerName() {
  const customerLabel = Array.from(document.querySelectorAll("span")).find(
    (element) => element.textContent?.trim() === "Nama Nasabah",
  );

  return customerLabel?.parentElement?.textContent?.trim() ?? "";
}

function getLoanChangeDisplay(customerName: string): LoanChangeDisplay {
  if (customerName.includes("Komang Dewa")) {
    return {
      label: "Jatuh Tempo Pinjaman",
      value: "April 2027 → April 2028",
      tooltip: komangTenorTooltip,
    };
  }

  if (customerName.includes("Nyoman Ariana")) {
    return {
      label: "Tenor Pinjaman",
      value: "12 → 14 bulan",
      tooltip: nyomanTenorTooltip,
    };
  }

  return {
    label: "Tenor Pinjaman",
    value: "12 → 18 bulan",
    tooltip: defaultTenorTooltip,
  };
}

function LoanChangeInfo({
  loanChange,
}: {
  loanChange: LoanChangeDisplay;
}) {
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

            <div className="flex items-center justify-between gap-2 rounded-[8px] bg-white px-3 py-2 ring-1 ring-blue-100">
              <div className="flex min-w-0 items-center gap-2">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <CalendarRange className="h-4 w-4" />
                </span>

                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-slate-500">
                    {loanChange.label}
                  </div>
                  <div className="text-[12px] font-extrabold text-slate-900">
                    {loanChange.value}
                  </div>
                </div>
              </div>

              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 transition hover:bg-blue-200"
                    aria-label="Informasi perubahan pinjaman"
                  >
                    <Info className="h-4 w-4" strokeWidth={2.7} />
                  </button>
                </TooltipTrigger>

                <TooltipContent
                  portalled
                  side="top"
                  align="end"
                  sideOffset={8}
                  collisionPadding={12}
                  className="z-[9999] w-[280px] rounded-[8px] border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold leading-relaxed text-slate-800 shadow-xl"
                >
                  {loanChange.tooltip}
                </TooltipContent>
              </Tooltip>
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
  tenorTooltip,
}: {
  title: string;
  className?: string;
  tenorTooltip?: string;
}) {
  const showLoanChangeInfo = title === "Tagihan dan Pembayaran Angsuran";
  const [loanChange, setLoanChange] = React.useState<LoanChangeDisplay>(
    getLoanChangeDisplay(""),
  );

  React.useEffect(() => {
    if (tenorTooltip) {
      setLoanChange({
        label: "Tenor Pinjaman",
        value: "12 → 18 bulan",
        tooltip: tenorTooltip,
      });
      return;
    }

    setLoanChange(getLoanChangeDisplay(getSelectedCustomerName()));
  }, [tenorTooltip]);

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full text-center text-[14px] font-semibold tracking-tight text-slate-900">
        {title}
      </div>
      <div className="mt-2 h-px w-full bg-slate-300/70" />

      {showLoanChangeInfo ? <LoanChangeInfo loanChange={loanChange} /> : null}
    </div>
  );
}