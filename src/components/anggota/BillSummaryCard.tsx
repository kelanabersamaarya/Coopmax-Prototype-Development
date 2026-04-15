"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className={cn("text-slate-600", strong ? "font-semibold" : "")}>
        {label}
      </div>
      <div className={cn("text-slate-900", strong ? "font-semibold" : "")}>
        {value}
      </div>
    </div>
  );
}

export default function BillSummaryCard({
  mode,
  totals,
  installment,
  className,
}: {
  mode: "regular" | "pelunasan";
  totals: { pokok: string; bunga: string; denda: string; total: string };
  installment: { ke: string; lunas: string; seharusnya: string };
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4",
        className,
      )}
    >
      <div className="text-sm font-semibold text-slate-900">RINGKASAN TAGIHAN</div>
      <Separator className="my-3 bg-slate-200/70" />

      <div className="space-y-2 text-sm">
        <SummaryRow label="Total Pokok" value={totals.pokok} />
        <SummaryRow label="Total Bunga" value={totals.bunga} />
        <SummaryRow label="Total Denda" value={totals.denda} />

        <SummaryRow
          label={
            mode === "pelunasan" ? (
              <span className="text-slate-900">
                <span className="block">Total</span>
                <span className="block">Pelunasan</span>
              </span>
            ) : (
              "Total Tagihan"
            )
          }
          value={totals.total}
          strong
        />

        <Separator className="my-3 bg-slate-200/70" />

        <SummaryRow label="Angsuran Ke" value={installment.ke} />
        <SummaryRow label="Angsuran Lunas" value={installment.lunas} />
        <SummaryRow label="Angsuran Seharusnya" value={installment.seharusnya} />
      </div>
    </Card>
  );
}