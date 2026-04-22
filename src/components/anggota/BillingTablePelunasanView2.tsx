"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import type { BillingRow } from "@/components/anggota/BillingTable";

export default function BillingTablePelunasanView2({
  rows,
  className,
}: {
  rows: BillingRow[];
  className?: string;
}) {
  // Pelunasan: checkbox selalu checked & disabled
  const thClass = "px-3 py-3";
  const tdClass = "px-3 py-3";
  const checkboxColW = "w-[44px]";
  const edgeL = "pl-4";
  const edgeR = "pr-4";

  const numCell = "text-right tabular-nums whitespace-nowrap";
  const dateCell =
    "text-left font-semibold text-slate-900 tabular-nums whitespace-nowrap";

  const colCount = 7;

  // Samakan dengan View1: grace highlight box muncul di page pertama (di View1 dihitung dari parent),
  // untuk View2 pelunasan kita tampilkan selalu agar konsisten dengan screenshot.
  const showGraceHighlight = true;
  const graceCount = showGraceHighlight ? Math.min(2, rows.length) : 0;
  const graceRows = graceCount > 0 ? rows.slice(0, graceCount) : [];
  const afterGraceRows = graceCount > 0 ? rows.slice(graceCount) : rows;

  return (
    <div
      className={cn(
        "mt-3 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200",
        className,
      )}
    >
      <table className="w-full table-fixed border-collapse text-[13px]">
        <thead className="bg-white">
          <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            <th className={cn(checkboxColW, thClass, edgeL)}>
              <input
                type="checkbox"
                aria-label="Pilih semua"
                checked
                disabled
                className="h-4 w-4 rounded-[5px] accent-blue-600 opacity-70"
              />
            </th>
            <th className={cn("w-[15%]", thClass)}>Jatuh Tempo</th>
            <th className={cn("w-[19%]", thClass, "text-right")}>
              Total Tagihan Belum Dibayar
            </th>
            <th className={cn("w-[17%]", thClass, "text-right")}>Tagihan Pokok</th>
            <th className={cn("w-[12%]", thClass, "text-right")}>Tagihan Bunga</th>
            <th className={cn("w-[18%]", thClass, "text-right")}>
              Sisa Tagihan Pokok
            </th>
            <th className={cn("w-[19%]", thClass, edgeR, "text-right")}>
              Sisa Tagihan Bunga
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {/* Info grace period (sama seperti View1) */}
          <GracePeriodInfoRow colSpan={colCount} />

          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={colCount}
                className="px-4 py-10 text-center text-sm text-slate-600"
              >
                Tidak ada data.
              </td>
            </tr>
          ) : graceRows.length > 0 ? (
            <>
              {/* Highlight box untuk grace period rows (sama seperti View1) */}
              <tr className="border-t border-slate-100">
                <td colSpan={colCount} className="p-0">
                  <div className="bg-white p-2">
                    <div className="overflow-hidden rounded-xl border-2 border-blue-600/70 bg-white">
                      <div>
                        {graceRows.map((bill, idx) => (
                          <div
                            key={`grace-${bill.jatuhTempo}-${idx}`}
                            className={cn(
                              "grid items-center",
                              "grid-cols-[44px_minmax(0,15%)_minmax(0,19%)_minmax(0,17%)_minmax(0,12%)_minmax(0,18%)_minmax(0,19%)]",
                              idx === 0 ? "" : "border-t border-slate-100",
                              idx % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                            )}
                          >
                            <div className={cn("px-3 py-3", edgeL)}>
                              <input
                                type="checkbox"
                                aria-label="Pilih tagihan"
                                checked
                                disabled
                                className="h-4 w-4 rounded-[5px] accent-blue-600 opacity-70"
                              />
                            </div>

                            <div className={cn("px-3 py-3", dateCell)}>
                              {bill.jatuhTempo}
                            </div>
                            <div className={cn("px-3 py-3 text-slate-800", numCell)}>
                              {bill.totalBelumDibayar}
                            </div>
                            <div className={cn("px-3 py-3 text-slate-800", numCell)}>
                              {bill.tagihanPokok}
                            </div>
                            <div className={cn("px-3 py-3 text-slate-800", numCell)}>
                              {bill.tagihanBunga}
                            </div>
                            <div className={cn("px-3 py-3 text-slate-800", numCell)}>
                              {bill.sisaPokok}
                            </div>
                            <div
                              className={cn(
                                "px-3 py-3 text-slate-800",
                                numCell,
                                edgeR,
                              )}
                            >
                              {bill.sisaBunga}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              {afterGraceRows.map((bill, idx) => {
                const globalIndex = graceCount + idx;
                return (
                  <tr
                    key={`${bill.jatuhTempo}-${globalIndex}`}
                    className={cn(
                      "border-t border-slate-100 text-sm",
                      globalIndex % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                    )}
                  >
                    <td className={cn(checkboxColW, tdClass, edgeL)}>
                      <input
                        type="checkbox"
                        aria-label="Pilih tagihan"
                        checked
                        disabled
                        className="h-4 w-4 rounded-[5px] accent-blue-600 opacity-70"
                      />
                    </td>

                    <td className={cn("w-[15%]", tdClass, dateCell)}>
                      {bill.jatuhTempo}
                    </td>

                    <td
                      className={cn("w-[19%]", tdClass, "text-slate-800", numCell)}
                    >
                      {bill.totalBelumDibayar}
                    </td>

                    <td
                      className={cn("w-[17%]", tdClass, "text-slate-800", numCell)}
                    >
                      {bill.tagihanPokok}
                    </td>

                    <td
                      className={cn("w-[12%]", tdClass, "text-slate-800", numCell)}
                    >
                      {bill.tagihanBunga}
                    </td>

                    <td
                      className={cn(
                        "w-[18%]",
                        tdClass,
                        "text-slate-800",
                        numCell,
                      )}
                    >
                      {bill.sisaPokok}
                    </td>

                    <td
                      className={cn(
                        "w-[19%]",
                        tdClass,
                        edgeR,
                        "text-slate-800",
                        numCell,
                      )}
                    >
                      {bill.sisaBunga}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            rows.map((bill, idx) => (
              <tr
                key={`${bill.jatuhTempo}-${idx}`}
                className={cn(
                  "border-t border-slate-100 text-sm",
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                )}
              >
                <td className={cn(checkboxColW, tdClass, edgeL)}>
                  <input
                    type="checkbox"
                    aria-label="Pilih tagihan"
                    checked
                    disabled
                    className="h-4 w-4 rounded-[5px] accent-blue-600 opacity-70"
                  />
                </td>

                <td className={cn("w-[15%]", tdClass, dateCell)}>{bill.jatuhTempo}</td>

                <td className={cn("w-[19%]", tdClass, "text-slate-800", numCell)}>
                  {bill.totalBelumDibayar}
                </td>

                <td className={cn("w-[17%]", tdClass, "text-slate-800", numCell)}>
                  {bill.tagihanPokok}
                </td>

                <td className={cn("w-[12%]", tdClass, "text-slate-800", numCell)}>
                  {bill.tagihanBunga}
                </td>

                <td className={cn("w-[18%]", tdClass, "text-slate-800", numCell)}>
                  {bill.sisaPokok}
                </td>

                <td className={cn("w-[19%]", tdClass, edgeR, "text-slate-800", numCell)}>
                  {bill.sisaBunga}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}