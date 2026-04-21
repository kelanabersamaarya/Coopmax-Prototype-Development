"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";

export type BillingRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

export default function BillingTable({
  rows,
  selected,
  setSelected,
  isPelunasan,
  showGraceHighlight,
  hideInterestCols,
  className,
}: {
  rows: BillingRow[];
  selected: boolean[];
  setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
  isPelunasan: boolean;
  showGraceHighlight: boolean;
  hideInterestCols: boolean;
  className?: string;
}) {
  const allChecked = React.useMemo(
    () => selected.length > 0 && selected.every(Boolean),
    [selected],
  );
  const anyChecked = React.useMemo(() => selected.some(Boolean), [selected]);
  const headerCheckboxRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate =
      !isPelunasan && anyChecked && !allChecked;
  }, [allChecked, anyChecked, isPelunasan]);

  const thClass = "px-1 py-2.5";
  const tdClass = "px-1 py-2.5";
  const edgePadLeft = "pl-4";
  const edgePadRight = "pr-4";

  const colCount = hideInterestCols ? 4 : 7;
  const minW = hideInterestCols ? "min-w-[420px]" : "min-w-[540px]";

  return (
    <div
      className={cn(
        "mt-3 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200",
        className,
      )}
    >
      <div className="overflow-auto">
        <table className={cn("w-full border-collapse text-[13px]", minW)}>
          <thead className="bg-white">
            <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
              <th className={cn("w-[30px]", thClass, edgePadLeft)}>
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  aria-label="Pilih semua"
                  checked={isPelunasan ? true : allChecked}
                  disabled={isPelunasan}
                  onChange={(e) => {
                    const next = e.target.checked;
                    setSelected(rows.map(() => next));
                  }}
                />
              </th>

              <th className={cn("w-[104px]", thClass)}>Jatuh Tempo</th>

              {!hideInterestCols ? (
                <th className={cn("w-[146px]", thClass)}>
                  Total Tagihan Belum Dibayar
                </th>
              ) : null}

              <th className={cn("w-[98px]", thClass)}>Tagihan Pokok</th>

              {!hideInterestCols ? (
                <th className={cn("w-[98px]", thClass)}>Tagihan Bunga</th>
              ) : null}

              <th className={cn("w-[108px]", thClass)}>Sisa Tagihan Pokok</th>

              {!hideInterestCols ? (
                <th className={cn("w-[108px]", thClass, edgePadRight)}>
                  Sisa Tagihan Bunga
                </th>
              ) : (
                <th className={cn("w-[12px]", thClass, edgePadRight)}>
                  <span className="sr-only">Spacer</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white">
            <tr>
              <td colSpan={colCount} className="p-0">
                <div
                  className={cn(
                    "overflow-hidden bg-white",
                    showGraceHighlight
                      ? "rounded-xl border-2 border-blue-600/70"
                      : "rounded-xl border border-slate-200",
                  )}
                >
                  <div className="overflow-auto">
                    <table className={cn("w-full border-collapse text-[13px]", minW)}>
                      <tbody className="bg-white">
                        {showGraceHighlight ? (
                          <GracePeriodInfoRow colSpan={colCount} />
                        ) : null}

                        {rows.map((bill, idx) => (
                          <tr
                            key={`${bill.jatuhTempo}-${idx}`}
                            className="border-t border-slate-100 text-sm"
                          >
                            <td className={cn(tdClass, edgePadLeft)}>
                              <input
                                type="checkbox"
                                aria-label="Pilih tagihan"
                                checked={isPelunasan ? true : selected[idx] ?? true}
                                disabled={isPelunasan}
                                onChange={(e) => {
                                  const next = e.target.checked;
                                  setSelected((prev) => {
                                    const copy = [...prev];
                                    copy[idx] = next;
                                    return copy;
                                  });
                                }}
                              />
                            </td>

                            <td className={cn(tdClass, "font-medium text-slate-900")}>
                              {bill.jatuhTempo}
                            </td>

                            {!hideInterestCols ? (
                              <td
                                className={cn(
                                  tdClass,
                                  "text-right tabular-nums text-slate-800",
                                )}
                              >
                                {bill.totalBelumDibayar}
                              </td>
                            ) : null}

                            <td
                              className={cn(
                                tdClass,
                                "text-right tabular-nums text-slate-800",
                              )}
                            >
                              {bill.tagihanPokok}
                            </td>

                            {!hideInterestCols ? (
                              <td
                                className={cn(
                                  tdClass,
                                  "text-right tabular-nums text-slate-800",
                                )}
                              >
                                {bill.tagihanBunga}
                              </td>
                            ) : null}

                            <td
                              className={cn(
                                tdClass,
                                "text-right tabular-nums text-slate-800",
                              )}
                            >
                              {bill.sisaPokok}
                            </td>

                            {!hideInterestCols ? (
                              <td
                                className={cn(
                                  tdClass,
                                  edgePadRight,
                                  "text-right tabular-nums text-slate-800",
                                )}
                              >
                                {bill.sisaBunga}
                              </td>
                            ) : (
                              <td className={cn(tdClass, edgePadRight)} />
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}