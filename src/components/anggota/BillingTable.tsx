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
  feeOnlyCols = false,
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
  feeOnlyCols?: boolean;
  className?: string;
}) {
  React.useEffect(() => {
    if (selected.length === rows.length) return;
    setSelected((prev) => rows.map((_, idx) => prev[idx] ?? true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length]);

  const allChecked = React.useMemo(() => {
    const aligned = rows.map((_, idx) => selected[idx] ?? true);
    return aligned.length > 0 && aligned.every(Boolean);
  }, [rows, selected]);

  const anyChecked = React.useMemo(() => {
    const aligned = rows.map((_, idx) => selected[idx] ?? true);
    return aligned.some(Boolean);
  }, [rows, selected]);

  const headerCheckboxRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate =
      !isPelunasan && anyChecked && !allChecked;
  }, [allChecked, anyChecked, isPelunasan]);

  const penalties = React.useMemo(() => {
    const base = 25000;
    const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return rows.map((_, idx) => {
      const total = base + idx * 5000;
      const remaining = Math.max(0, total - 10000);
      return { total: fmt(total), remaining: fmt(remaining) };
    });
  }, [rows]);

  const thClass = "px-3 py-2.5";
  const tdClass = "px-3 py-3";
  const checkboxColW = "w-[44px]";

  if (feeOnlyCols) {
    const colCount = 5;

    // Edge padding: kolom pertama & terakhir dibuat lebih lega
    const edgeL = "pl-6";
    const edgeR = "pr-8";

    // Gutter antar kolom (lebih rapi)
    const thMid = "px-4 py-2.5";
    const tdMid = "px-4 py-3";

    // Lebar kolom (dibuat lebih seimbang, kolom terakhir lebih lebar)
    const wJenis = "w-[30%]";
    const wPeriode = "w-[18%]";
    const wTotal = "w-[26%]";
    const wSisa = "w-[26%]";

    const feeRows = rows.map((r, idx) => {
      const feeName =
        idx % 3 === 0
          ? "Biaya Administrasi Lainnya"
          : idx % 3 === 1
            ? "Biaya Materai"
            : "Biaya Layanan";
      const periode = r.jatuhTempo;
      const total = r.totalBelumDibayar;
      const sisa = r.sisaBunga;
      return { feeName, periode, total, sisa };
    });

    return (
      <div
        className={cn(
          "mt-3 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200",
          className,
        )}
      >
        <div className="overflow-hidden">
          <table className="w-full table-fixed border-collapse text-[13px]">
            <thead className="bg-white">
              <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                <th className={cn(checkboxColW, thClass, edgeL)}>
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

                <th className={cn(wJenis, thMid)}>Jenis Fee</th>
                <th className={cn(wPeriode, thMid)}>Periode</th>

                <th className={cn(wTotal, thMid, "text-right")}>
                  <span className="whitespace-nowrap">
                    Total Tagihan Biaya Lainnya
                  </span>
                </th>

                <th className={cn(wSisa, thMid, "text-right", edgeR)}>
                  <span className="whitespace-nowrap">
                    Sisa Tagihan Biaya Lainnya
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <tr>
                <td colSpan={colCount} className="p-0">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="bg-white p-3">
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="overflow-hidden">
                          <table className="w-full table-fixed border-collapse text-[13px]">
                            <tbody className="bg-white">
                              {feeRows.map((bill, idx) => (
                                <tr
                                  key={`${bill.periode}-${idx}`}
                                  className="border-t border-slate-100 text-sm"
                                >
                                  <td className={cn(checkboxColW, tdClass, edgeL)}>
                                    <input
                                      type="checkbox"
                                      aria-label="Pilih fee"
                                      checked={
                                        isPelunasan ? true : (selected[idx] ?? true)
                                      }
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

                                  <td className={cn(wJenis, tdMid, "text-slate-900")}>
                                    <div className="leading-snug">{bill.feeName}</div>
                                  </td>

                                  <td
                                    className={cn(
                                      wPeriode,
                                      tdMid,
                                      "text-slate-800 tabular-nums whitespace-nowrap",
                                    )}
                                  >
                                    {bill.periode}
                                  </td>

                                  <td
                                    className={cn(
                                      wTotal,
                                      tdMid,
                                      "text-right tabular-nums text-slate-800 whitespace-nowrap",
                                    )}
                                  >
                                    {bill.total}
                                  </td>

                                  <td
                                    className={cn(
                                      wSisa,
                                      tdMid,
                                      "text-right tabular-nums text-slate-800 whitespace-nowrap",
                                      edgeR,
                                    )}
                                  >
                                    {bill.sisa}
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

  // ====== BAGIAN LAIN TIDAK DIUBAH (tetap sama seperti sebelumnya) ======

  if (penaltyOnlyCols) {
    const colCount = 5;
    const minW = "min-w-[720px]";
    const angsuranColW = "w-[140px]";
    const dateColW = "w-[260px]";
    const dendaColW = "w-[160px]";
    const sisaDendaColW = "w-[170px]";

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

                <th className={cn(angsuranColW, thClass)}>
                  <span className="leading-none">ANGSURAN KE-</span>
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
                                  <td
                                    className={cn(checkboxColW, tdClass, "pl-4")}
                                  >
                                    <input
                                      type="checkbox"
                                      aria-label="Pilih tagihan"
                                      checked={
                                        isPelunasan ? true : (selected[idx] ?? true)
                                      }
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
                                      angsuranColW,
                                      tdClass,
                                      "font-semibold text-slate-900 tabular-nums whitespace-nowrap",
                                    )}
                                  >
                                    {idx + 1}
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
                                  <td
                                    className={cn(checkboxColW, tdClass, "pl-4")}
                                  >
                                    <input
                                      type="checkbox"
                                      aria-label="Pilih tagihan"
                                      checked={
                                        isPelunasan ? true : (selected[idx] ?? true)
                                      }
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
                                    checked={isPelunasan ? true : (selected[idx] ?? true)}
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