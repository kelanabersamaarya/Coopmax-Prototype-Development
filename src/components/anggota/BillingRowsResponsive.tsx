"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export type BillingRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

function GracePeriodCallout() {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-slate-800">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          <Info className="h-4 w-4" />
        </span>
        <div>
          <div className="font-semibold">Periode Grace Period</div>
          <div className="mt-0.5 text-slate-700">
            Berikut ini merupakan periode tagihan pinjaman yang termasuk ke dalam
            grace period. Selama periode grace period nasabah hanya membayar
            bunga.
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyVal({
  k,
  v,
  className,
}: {
  k: string;
  v: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="text-xs font-medium text-slate-600">{k}</div>
      <div className="text-sm font-semibold text-slate-900">{v}</div>
    </div>
  );
}

export default function BillingRowsResponsive({
  rows,
  selectable,
  selectAllChecked,
  rowChecked,
  disableChecks,
  gracePeriod = true,
  compact = false,
}: {
  rows: BillingRow[];
  selectable?: boolean;
  selectAllChecked?: boolean;
  rowChecked?: (row: BillingRow, index: number) => boolean;
  disableChecks?: boolean;
  gracePeriod?: boolean;
  compact?: boolean;
}) {
  const showChecks = !!selectable;

  return (
    <div className="w-full">
      {/* Mobile / small: cards */}
      <div className="grid gap-3 md:hidden">
        {gracePeriod ? <GracePeriodCallout /> : null}

        {rows.map((r, idx) => (
          <Card
            key={`${r.jatuhTempo}-${idx}`}
            className={cn(
              "rounded-2xl border-slate-200/70 bg-white p-4 shadow-sm",
              compact ? "p-3" : "p-4",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Jatuh Tempo
                </div>
                <div className="mt-1 text-base font-extrabold tracking-tight text-slate-900">
                  {r.jatuhTempo}
                </div>
              </div>

              {showChecks ? (
                <input
                  type="checkbox"
                  aria-label="Pilih tagihan"
                  checked={rowChecked ? rowChecked(r, idx) : false}
                  disabled={disableChecks}
                  className="mt-1 h-4 w-4"
                />
              ) : null}
            </div>

            <div className="mt-3 grid gap-2">
              <KeyVal k="Total Belum Dibayar" v={r.totalBelumDibayar} />
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Pokok
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900">
                    {r.tagihanPokok}
                  </div>
                  <div className="mt-2 text-[11px] font-medium text-slate-500">
                    Sisa
                  </div>
                  <div className="mt-0.5 text-xs font-semibold text-slate-800">
                    {r.sisaPokok}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Bunga
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900">
                    {r.tagihanBunga}
                  </div>
                  <div className="mt-2 text-[11px] font-medium text-slate-500">
                    Sisa
                  </div>
                  <div className="mt-0.5 text-xs font-semibold text-slate-800">
                    {r.sisaBunga}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-white">
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  {showChecks ? (
                    <th className="w-[44px] px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label="Pilih semua"
                        checked={selectAllChecked}
                        disabled={disableChecks}
                      />
                    </th>
                  ) : null}
                  <th className="px-4 py-3">Jatuh Tempo</th>
                  <th className="px-4 py-3">Total Tagihan Belum Dibayar</th>
                  <th className="px-4 py-3">Tagihan Pokok</th>
                  <th className="px-4 py-3">Tagihan Bunga</th>
                  <th className="px-4 py-3">Sisa Tagihan Pokok</th>
                  <th className="px-4 py-3">Sisa Tagihan Bunga</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {gracePeriod ? (
                  <tr className="border-t border-slate-200">
                    <td
                      colSpan={showChecks ? 7 : 6}
                      className="px-4 py-3"
                    >
                      <GracePeriodCallout />
                    </td>
                  </tr>
                ) : null}

                {rows.map((r, idx) => (
                  <tr
                    key={`${r.jatuhTempo}-${idx}`}
                    className="border-t border-slate-200 text-sm"
                  >
                    {showChecks ? (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          aria-label="Pilih tagihan"
                          checked={rowChecked ? rowChecked(r, idx) : false}
                          disabled={disableChecks}
                        />
                      </td>
                    ) : null}
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {r.jatuhTempo}
                    </td>
                    <td className="px-4 py-3 text-slate-800">
                      {r.totalBelumDibayar}
                    </td>
                    <td className="px-4 py-3 text-slate-800">{r.tagihanPokok}</td>
                    <td className="px-4 py-3 text-slate-800">{r.tagihanBunga}</td>
                    <td className="px-4 py-3 text-slate-800">{r.sisaPokok}</td>
                    <td className="px-4 py-3 text-slate-800">{r.sisaBunga}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}