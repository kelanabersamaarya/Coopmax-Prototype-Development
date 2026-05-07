"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Row = {
  label: string;
  value: React.ReactNode;
};

function MetaRow({ label, value }: Row) {
  return (
    <div className="grid items-start gap-3 py-3 [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0 text-[14px] font-normal text-slate-900">
        <span className="break-words">{label} :</span>
      </div>
      <div className="min-w-0 text-right text-[14px] font-semibold text-slate-900">
        <span className="block break-words leading-snug">{value}</span>
      </div>
    </div>
  );
}

export default function LoanDetailMetaRows({
  rows,
  className,
}: {
  rows: Row[];
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      {rows.map((r) => (
        <MetaRow key={r.label} label={r.label} value={r.value} />
      ))}
    </div>
  );
}