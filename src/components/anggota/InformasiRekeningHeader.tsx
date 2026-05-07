"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import LoanDetailMetaRows from "@/components/loans/LoanDetailMetaRows";

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
  const asText = (v: React.ReactNode) => {
    if (typeof v === "string" || typeof v === "number") return String(v);
    return "";
  };

  const itemMap = React.useMemo(() => {
    const map = new Map<string, React.ReactNode>();
    items.forEach((it) => map.set(it.label, it.value));
    return map;
  }, [items]);

  const skemaTagihan = itemMap.get("Skema Tagihan");
  const satuanGrace = itemMap.get("Satuan Grace Period");
  const durasiGrace = itemMap.get("Durasi Grace Period");

  const restItems = React.useMemo(
    () =>
      items.filter(
        (it) =>
          it.label !== "Skema Tagihan" &&
          it.label !== "Satuan Grace Period" &&
          it.label !== "Durasi Grace Period",
      ),
    [items],
  );

  const showMeta = !!(skemaTagihan || satuanGrace || durasiGrace);

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
            "[grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]",
          )}
        >
          {restItems.map((it, idx) => (
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

        {showMeta ? (
          <div className="mt-5 rounded-[5px] bg-white/95 px-4 py-2 text-slate-900 ring-1 ring-white/50">
            <LoanDetailMetaRows
              rows={[
                ...(skemaTagihan
                  ? [
                      {
                        label: "Skema Tagihan",
                        value: asText(skemaTagihan) || skemaTagihan,
                      },
                    ]
                  : []),
                ...(satuanGrace
                  ? [
                      {
                        label: "Satuan Grace Period",
                        value: asText(satuanGrace) || satuanGrace,
                      },
                    ]
                  : []),
                ...(durasiGrace
                  ? [
                      {
                        label: "Durasi Grace Period",
                        value: asText(durasiGrace) || durasiGrace,
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}