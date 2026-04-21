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
  interestOnlyCols = false,
  penaltyOnlyCols = false,
  className,
}: {
  rows: BillingRow[];
  selected: boolean[];
  setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
  isPelunasan: boolean;
  showGraceHighlight: boolean;
  hideInterestCols: boolean;
  interestOnlyCols?: boolean;
  penaltyOnlyCols?: boolean;
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

  const thClass = "px-3 py-2.5";
  const tdClass = "px-3 py-3";

  const checkboxColW = "w-[44px]";

  // Mode "Bayar Denda": tampilkan hanya kolom denda, tanpa info grace period
  if (penaltyOnlyCols) {
    const colCount = 4;
    const minW = "min-w-[620px]";
    const dateColW = "w-[250px]";
    const dendaColW = "w-[180px]";
    const sisaDendaColW = "w-[190px]";

    // Prototype: isi contoh agar UI tidak selalu 0.
    // Pola sederhana: makin belakang, sisa denda makin kecil.
    const penalties = React.useMemo(() => {
      const base = 25000;
      return rows.map((_, idx) => {
        const total = base + idx * 5000; // 25.000, 30.000, 35.000, ...
        const remaining = Math.max(0, total - 10000); // sisa sedikit lebih kecil
        const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return { total: fmt(total), remaining: fmt(remaining) };
      });
    }, [rows]);

    return (
      <div
        className={cn(
          "mt-3 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200",
          className,
        )}
      >
        <div className="overflow-auto">
          <table className={cn("w-full border-collapse text-[13px]", minW)}>
            <thead className="bg-white">
              <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                <th className={cn(checkboxColW, thClass, "pl-4")}>
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

                <th className={cn(dateColW, thClass)}>
                  Jatuh Tempo Tagihan Pinjaman
                </th>

                <th className={cn(dendaColW, thClass, "text-right")}>
                  Total Tagihan Denda
                </th>

                <th className={cn(sisaDendaColW, thClass, "pr-4 text-right")}>
                  Sisa Tagihan Denda
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <tr>
                <td colSpan={colCount} className="p-0">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="bg-white p-2">
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="overflow-auto">
                          <table
                            className={cn(
                              "w-full border-collapse text-[13px]",
                              minW,
                            )}
                          >
                            <tbody className="bg-white">
                              {rows.map((bill, idx) => (
                                <tr
                                  key={`${bill.jatuhTempo}-${idx}`}
                                  className="border-t border-slate-100 text-sm"
                                >
                                  <td className={cn(checkboxColW, tdClass, "pl-4")}>
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

                                  <td
                                    className={cn(
                                      dateColW,
                                      tdClass,
                                      "font-semibold text-slate-900 tabular-nums whitespace-nowrap",
                                    )}
                                  >
                                    {bill.jatuhTempo}
                                  </td>

                                  <td
                                    className={cn(
                                      dendaColW,
                                      tdClass,
                                      "text-right tabular-nums text-slate-800 whitespace-nowrap",
                                    )}
                                  >
                                    {penalties[idx]?.total ?? "0"}
                                  </td>

                                  <td
                                    className={cn(
                                      sisaDendaColW,
                                      tdClass,
                                      "pr-4 text-right tabular-nums text-slate-800 whitespace-nowrap",
                                    )}
                                  >
                                    {penalties[idx]?.remaining ?? "0"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
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

  // Mode "Bayar Bunga": tampilkan hanya kolom bunga
  if (interestOnlyCols) {
    const colCount = 4;
    const minW = "min-w-[560px]";
    const dateColW = "w-[200px]";
    const bungaColW = "w-[190px]";
    const sisaBungaColW = "w-[200px]";

    return (
      <div
        className={cn(
          "mt-3 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200",
          className,
        )}
      >
        <div className="overflow-auto">
          <table className={cn("w-full border-collapse text-[13px]", minW)}>
            <thead className="bg-white">
              <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                <th className={cn(checkboxColW, thClass, "pl-4")}>
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

                <th className={cn(dateColW, thClass)}>Jatuh Tempo</th>

                <th className={cn(bungaColW, thClass, "text-right")}>
                  Tagihan Bunga
                </th>

                <th className={cn(sisaBungaColW, thClass, "pr-4 text-right")}>
                  Sisa Tagihan Bunga
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <tr>
                <td colSpan={colCount} className="p-0">
                  <div
                    className={cn(
                      "overflow-hidden bg-white",
                      showGraceHighlight
                        ? "rounded-2xl border-2 border-blue-600/70"
                        : "rounded-2xl border border-slate-200",
                    )}
                  >
                    <div className="bg-white p-2">
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="overflow-auto">
                          <table
                            className={cn(
                              "w-full border-collapse text-[13px]",
                              minW,
                            )}
                          >
                            <tbody className="bg-white">
                              {showGraceHighlight ? (
                                <GracePeriodInfoRow colSpan={colCount} />
                              ) : null}

                              {rows.map((bill, idx) => (
                                <tr
                                  key={`${bill.jatuhTempo}-${idx}`}
                                  className="border-t border-slate-100 text-sm"
                                >
                                  <td className={cn(checkboxColW, tdClass, "pl-4")}>
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

                                  <td
                                    className={cn(
                                      dateColW,
                                      tdClass,
                                      "font-semibold text-slate-900 tabular-nums whitespace-nowrap",
                                    )}
                                  >
                                    {bill.jatuhTempo}
                                  </td>

                                  <td
                                    className={cn(
                                      bungaColW,
                                      tdClass,
                                      "text-right tabular-nums text-slate-800 whitespace-nowrap",
                                    )}
                                  >
                                    {bill.tagihanBunga}
                                  </td>

                                  <td
                                    className={cn(
                                      sisaBungaColW,
                                      tdClass,
                                      "pr-4 text-right tabular-nums text-slate-800 whitespace-nowrap",
                                    )}
                                  >
                                    {bill.sisaBunga}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
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

  const colCount = hideInterestCols ? 4 : 7;
  const minW = hideInterestCols ? "min-w-[600px]" : "min-w-[720px]";

  // Mode "Bayar Pokok": kecilkan Jatuh Tempo supaya Tagihan Pokok "geser ke tengah"
  const dateColW = hideInterestCols ? "w-[200px]" : "w-[140px]";
  const pokokColW = hideInterestCols ? "w-[200px]" : "w-[170px]";
  const sisaPokokColW = hideInterestCols ? "w-[200px]" : "w-[180px]";

  const totalColW = "w-[210px]";
  const bungaColW = "w-[150px]";
  const sisaBungaColW = "w-[170px]";

  return (
    <div
      className={cn(
        "mt-3 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200",
        className,
      )}
    >
      <div className="overflow-auto">
        <table className={cn("w-full border-collapse text-[13px]", minW)}>
          <thead className="bg-white">
            <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
              <th className={cn(checkboxColW, thClass, "pl-4")}>
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

              <th className={cn(dateColW, thClass)}>Jatuh Tempo</th>

              {!hideInterestCols ? (
                <th className={cn(totalColW, thClass, "text-right")}>
                  Total Tagihan Belum Dibayar
                </th>
              ) : null}

              <th className={cn(pokokColW, thClass, "text-right")}>
                Tagihan Pokok
              </th>

              {!hideInterestCols ? (
                <th className={cn(bungaColW, thClass, "text-right")}>
                  Tagihan Bunga
                </th>
              ) : null}

              <th className={cn(sisaPokokColW, thClass, "pr-4 text-right")}>
                Sisa Tagihan Pokok
              </th>

              {!hideInterestCols ? (
                <th className={cn(sisaBungaColW, thClass, "pr-4 text-right")}>
                  Sisa Tagihan Bunga
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody className="bg-white">
            <tr>
              <td colSpan={colCount} className="p-0">
                <div
                  className={cn(
                    "overflow-hidden bg-white",
                    showGraceHighlight
                      ? "rounded-2xl border-2 border-blue-600/70"
                      : "rounded-2xl border border-slate-200",
                  )}
                >
                  <div className="bg-white p-2">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <div className="overflow-auto">
                        <table
                          className={cn("w-full border-collapse text-[13px]", minW)}
                        >
                          <tbody className="bg-white">
                            {showGraceHighlight ? (
                              <GracePeriodInfoRow colSpan={colCount} />
                            ) : null}

                            {rows.map((bill, idx) => (
                              <tr
                                key={`${bill.jatuhTempo}-${idx}`}
                                className="border-t border-slate-100 text-sm"
                              >
                                <td className={cn(checkboxColW, tdClass, "pl-4")}>
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

                                <td
                                  className={cn(
                                    dateColW,
                                    tdClass,
                                    "font-semibold text-slate-900 tabular-nums whitespace-nowrap",
                                  )}
                                >
                                  {bill.jatuhTempo}
                                </td>

                                {!hideInterestCols ? (
                                  <td
                                    className={cn(
                                      totalColW,
                                      tdClass,
                                      "text-right tabular-nums text-slate-800 whitespace-nowrap",
                                    )}
                                  >
                                    {bill.totalBelumDibayar}
                                  </td>
                                ) : null}

                                <td
                                  className={cn(
                                    pokokColW,
                                    tdClass,
                                    "text-right tabular-nums text-slate-800 whitespace-nowrap",
                                  )}
                                >
                                  {bill.tagihanPokok}
                                </td>

                                {!hideInterestCols ? (
                                  <td
                                    className={cn(
                                      bungaColW,
                                      tdClass,
                                      "text-right tabular-nums text-slate-800 whitespace-nowrap",
                                    )}
                                  >
                                    {bill.tagihanBunga}
                                  </td>
                                ) : null}

                                <td
                                  className={cn(
                                    sisaPokokColW,
                                    tdClass,
                                    "pr-4 text-right tabular-nums text-slate-800 whitespace-nowrap",
                                  )}
                                >
                                  {bill.sisaPokok}
                                </td>

                                {!hideInterestCols ? (
                                  <td
                                    className={cn(
                                      sisaBungaColW,
                                      tdClass,
                                      "pr-4 text-right tabular-nums text-slate-800 whitespace-nowrap",
                                    )}
                                  >
                                    {bill.sisaBunga}
                                  </td>
                                ) : null}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
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