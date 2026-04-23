"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";

export type BillingRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

function formatDmy(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

function addMonths(base: Date, months: number) {
  const d = new Date(base);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);

  if (d.getDate() !== day) {
    d.setDate(0);
  }
  return d;
}

function shouldShowPenaltyMarker(idx: number) {
  return idx < 3;
}

function PenaltyIcon({
  show,
  className,
}: {
  show: boolean;
  className?: string;
}) {
  if (!show) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Info denda"
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
              "transition-colors hover:bg-amber-200/70",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40",
              "cursor-help",
              // bigger hitbox (mobile friendly)
              "h-8 w-8",
              className,
            )}
          >
            <AlertTriangle className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="border-slate-200 bg-white text-slate-900 shadow-md">
          Terdapat Tagihan Denda Pada Periode Ini
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

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
  hideSelection = false,
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
  hideSelection?: boolean;
  className?: string;
}) {
  const extraOutsideRows = React.useMemo<BillingRow[]>(() => {
    if (!showGraceHighlight) return [];

    const last = rows[rows.length - 1]?.jatuhTempo ?? "";
    const lastDate = (() => {
      const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(last);
      if (!m) return new Date();
      const dd = Number(m[1]);
      const mm = Number(m[2]);
      const yyyy = Number(m[3]);
      return new Date(yyyy, mm - 1, dd);
    })();

    return Array.from({ length: 5 }).map((_, i) => {
      const due = addMonths(lastDate, i + 1);
      return {
        jatuhTempo: formatDmy(due),
        totalBelumDibayar: "916.667",
        tagihanPokok: "833.333",
        tagihanBunga: "83.333",
        sisaPokok: "783.333",
        sisaBunga: "26.389",
      };
    });
  }, [showGraceHighlight, rows]);

  React.useEffect(() => {
    const needed = rows.length + extraOutsideRows.length;
    if (selected.length === needed) return;

    const defaultValue = isPelunasan ? true : false;

    setSelected((prev) => {
      const next = Array.from({ length: needed }).map(
        (_, idx) => prev[idx] ?? defaultValue,
      );
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length, extraOutsideRows.length, isPelunasan]);

  const displayRows = React.useMemo(() => rows, [rows]);

  const allChecked = React.useMemo(() => {
    const aligned = Array.from({
      length: displayRows.length + extraOutsideRows.length,
    }).map((_, idx) => selected[idx] ?? false);
    return aligned.length > 0 && aligned.every(Boolean);
  }, [displayRows.length, extraOutsideRows.length, selected]);

  const anyChecked = React.useMemo(() => {
    const aligned = Array.from({
      length: displayRows.length + extraOutsideRows.length,
    }).map((_, idx) => selected[idx] ?? false);
    return aligned.some(Boolean);
  }, [displayRows.length, extraOutsideRows.length, selected]);

  const headerCheckboxRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate =
      !isPelunasan && anyChecked && !allChecked;
  }, [allChecked, anyChecked, isPelunasan]);

  const penalties = React.useMemo(() => {
    const base = 25000;
    const fmt = (n: number) =>
      n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return displayRows.map((_, idx) => {
      const total = base + idx * 5000;
      const remaining = Math.max(0, total - 10000);
      return { total: fmt(total), remaining: fmt(remaining) };
    });
  }, [displayRows]);

  const thClass = "px-3 py-3";
  const tdClass = "px-3 py-3";
  const checkboxColW = "w-[44px]";

  const edgeL = "pl-4";
  const edgeR = "pr-4";

  const tableBase = "w-full table-fixed border-collapse text-[13px]";

  const numCell = "text-right tabular-nums whitespace-nowrap";
  const dateCell =
    "text-left font-semibold text-slate-900 tabular-nums whitespace-nowrap";

  const CheckboxCell = ({
    checked,
    disabled,
    onChange,
    "aria-label": ariaLabel,
    className: c,
    refEl,
    size = "md",
    tone = "accent",
  }: {
    checked: boolean;
    disabled?: boolean;
    onChange: (next: boolean) => void;
    "aria-label": string;
    className?: string;
    refEl?: React.RefObject<HTMLInputElement | null>;
    size?: "sm" | "md";
    tone?: "accent" | "blue";
  }) => {
    const sizeClass =
      size === "sm" ? "h-4 w-4 rounded-[5px]" : "h-5 w-5 rounded-md";
    const toneClass =
      tone === "blue"
        ? "accent-blue-600 focus:ring-blue-500/25"
        : "accent-[hsl(var(--app-accent))] focus:ring-[hsl(var(--app-accent))]/25";

    return (
      <div className={cn("flex items-center justify-center", c)}>
        <input
          ref={refEl}
          type="checkbox"
          aria-label={ariaLabel}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className={cn(
            sizeClass,
            toneClass,
            "focus:outline-none focus:ring-2",
            disabled ? "opacity-70" : "",
          )}
        />
      </div>
    );
  };

  // ===== Specialized: Fee only =====
  if (feeOnlyCols) {
    const colCount = hideSelection ? 4 : 5;

    const wJenis = "w-[40%]";
    const wPeriode = "w-[16%]";
    const wTotal = "w-[22%]";
    const wSisa = "w-[22%]";

    const feeRows = displayRows.map((r, idx) => {
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
      <div className={cn("mt-3", className)}>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className={tableBase}>
            <thead className="bg-white">
              <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                {!hideSelection ? (
                  <th className={cn(checkboxColW, thClass, edgeL, "text-center")}>
                    <CheckboxCell
                      refEl={headerCheckboxRef}
                      aria-label="Pilih semua"
                      checked={isPelunasan ? true : allChecked}
                      disabled={isPelunasan}
                      onChange={(next) =>
                        setSelected(
                          Array.from({
                            length: displayRows.length + extraOutsideRows.length,
                          }).map(() => next),
                        )
                      }
                      size="sm"
                      tone="blue"
                    />
                  </th>
                ) : null}

                <th className={cn(wJenis, thClass, hideSelection ? edgeL : "")}>
                  Jenis Biaya Lainnya (Fee)
                </th>
                <th className={cn(wPeriode, thClass)}>Periode</th>

                <th className={cn(wTotal, thClass, "text-right")}>
                  <span className="whitespace-nowrap">
                    Total Tagihan Biaya Lainnya
                  </span>
                </th>

                <th className={cn(wSisa, thClass, "text-right", edgeR)}>
                  <span className="whitespace-nowrap">
                    Sisa Tagihan Biaya Lainnya
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {feeRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={colCount}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                feeRows.map((bill, idx) => (
                  <tr
                    key={`${bill.periode}-${idx}`}
                    className={cn(
                      "border-t border-slate-100 text-sm",
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                    )}
                  >
                    {!hideSelection ? (
                      <td
                        className={cn(checkboxColW, tdClass, edgeL, "text-center")}
                      >
                        <CheckboxCell
                          aria-label="Pilih fee"
                          checked={isPelunasan ? true : (selected[idx] ?? false)}
                          disabled={isPelunasan}
                          onChange={(next) =>
                            setSelected((prev) => {
                              const copy = [...prev];
                              copy[idx] = next;
                              return copy;
                            })
                          }
                          size="sm"
                          tone="blue"
                        />
                      </td>
                    ) : null}

                    <td
                      className={cn(
                        wJenis,
                        tdClass,
                        "text-slate-900",
                        hideSelection ? edgeL : "",
                      )}
                    >
                      <div className="truncate" title={bill.feeName}>
                        {bill.feeName}
                      </div>
                    </td>

                    <td className={cn(wPeriode, tdClass, dateCell)}>
                      {bill.periode}
                    </td>

                    <td className={cn(wTotal, tdClass, "text-slate-800", numCell)}>
                      {bill.total}
                    </td>

                    <td
                      className={cn(wSisa, tdClass, edgeR, "text-slate-800", numCell)}
                    >
                      {bill.sisa}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ===== Specialized: Penalty only =====
  if (penaltyOnlyCols) {
    const colCount = hideSelection ? 4 : 5;

    const angsuranColW = "w-[16%]";
    const dateColW = "w-[32%]";
    const dendaColW = "w-[26%]";
    const sisaDendaColW = "w-[26%]";

    return (
      <div className={cn("mt-3", className)}>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className={tableBase}>
            <thead className="bg-white">
              <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                {!hideSelection ? (
                  <th className={cn(checkboxColW, thClass, edgeL)}>
                    <CheckboxCell
                      refEl={headerCheckboxRef}
                      aria-label="Pilih semua"
                      checked={isPelunasan ? true : allChecked}
                      disabled={isPelunasan}
                      onChange={(next) =>
                        setSelected(
                          Array.from({
                            length: displayRows.length + extraOutsideRows.length,
                          }).map(() => next),
                        )
                      }
                      size="sm"
                      tone="blue"
                    />
                  </th>
                ) : null}

                <th className={cn(angsuranColW, thClass, hideSelection ? edgeL : "")}>
                  <span className="leading-none">ANGSURAN KE-</span>
                </th>

                <th className={cn(dateColW, thClass)}>
                  Jatuh Tempo Tagihan Pinjaman
                </th>

                <th className={cn(dendaColW, thClass, "text-right")}>
                  Total Tagihan Denda
                </th>

                <th className={cn(sisaDendaColW, thClass, edgeR, "text-right")}>
                  Sisa Tagihan Denda
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {displayRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={colCount}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                displayRows.map((bill, idx) => {
                  const showPenalty = idx < 3;
                  return (
                    <tr
                      key={`${bill.jatuhTempo}-${idx}`}
                      className={cn(
                        "border-t border-slate-100 text-sm",
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                      )}
                    >
                      {!hideSelection ? (
                        <td className={cn(checkboxColW, tdClass, edgeL)}>
                          <CheckboxCell
                            aria-label="Pilih tagihan"
                            checked={isPelunasan ? true : (selected[idx] ?? false)}
                            disabled={isPelunasan}
                            onChange={(next) =>
                              setSelected((prev) => {
                                const copy = [...prev];
                                copy[idx] = next;
                                return copy;
                              })
                            }
                            size="sm"
                            tone="blue"
                          />
                        </td>
                      ) : null}

                      <td
                        className={cn(
                          angsuranColW,
                          tdClass,
                          "font-semibold text-slate-900 tabular-nums whitespace-nowrap",
                          hideSelection ? edgeL : "",
                        )}
                      >
                        {idx + 1}
                      </td>

                      <td className={cn(dateColW, tdClass, dateCell)}>{bill.jatuhTempo}</td>

                      <td className={cn(dendaColW, tdClass, "text-slate-800", numCell)}>
                        {showPenalty ? penalties[idx]?.total ?? "0" : "-"}
                      </td>

                      <td
                        className={cn(
                          sisaDendaColW,
                          tdClass,
                          edgeR,
                          "text-slate-800",
                          numCell,
                        )}
                      >
                        {showPenalty ? penalties[idx]?.remaining ?? "0" : "-"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ===== Specialized: Interest only =====
  if (interestOnlyCols) {
    const colCount = hideSelection ? 3 : 4;

    const dateColW = "w-[28%]";
    const bungaColW = "w-[36%]";
    const sisaBungaColW = "w-[36%]";

    return (
      <div
        className={cn(
          "mt-3 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200",
          className,
        )}
      >
        <table className={tableBase}>
          <thead className="bg-white">
            <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
              {!hideSelection ? (
                <th className={cn(checkboxColW, thClass, edgeL)}>
                  <input
                    ref={headerCheckboxRef}
                    type="checkbox"
                    aria-label="Pilih semua"
                    checked={isPelunasan ? true : allChecked}
                    disabled={isPelunasan}
                    onChange={(e) => {
                      const next = e.target.checked;
                      setSelected(
                        Array.from({
                          length: displayRows.length + extraOutsideRows.length,
                        }).map(() => next),
                      );
                    }}
                  />
                </th>
              ) : null}

              <th className={cn(dateColW, thClass, hideSelection ? edgeL : "")}>
                Jatuh Tempo
              </th>

              <th className={cn(bungaColW, thClass, "text-right")}>Tagihan Bunga</th>

              <th className={cn(sisaBungaColW, thClass, edgeR, "text-right")}>
                Sisa Tagihan Bunga
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {showGraceHighlight ? <GracePeriodInfoRow colSpan={colCount} /> : null}

            {displayRows.length === 0 ? (
              <tr>
                <td
                  colSpan={colCount}
                  className="px-4 py-10 text-center text-sm text-slate-600"
                >
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              displayRows.map((bill, idx) => (
                <tr
                  key={`${bill.jatuhTempo}-${idx}`}
                  className={cn(
                    "border-t border-slate-100 text-sm",
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                  )}
                >
                  {!hideSelection ? (
                    <td className={cn(checkboxColW, tdClass, edgeL)}>
                      <input
                        type="checkbox"
                        aria-label="Pilih tagihan"
                        checked={isPelunasan ? true : (selected[idx] ?? false)}
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
                  ) : null}

                  <td
                    className={cn(
                      dateColW,
                      tdClass,
                      dateCell,
                      hideSelection ? edgeL : "",
                    )}
                  >
                    {bill.jatuhTempo}
                  </td>

                  <td className={cn(bungaColW, tdClass, "text-slate-800", numCell)}>
                    {bill.tagihanBunga}
                  </td>

                  <td
                    className={cn(
                      sisaBungaColW,
                      tdClass,
                      edgeR,
                      "text-slate-800",
                      numCell,
                    )}
                  >
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

  // ===== Default (regular) =====
  const showPenaltyCol = !hideInterestCols;

  const colCount = hideInterestCols
    ? hideSelection
      ? 3
      : 4
    : hideSelection
      ? 7
      : 8;

  // Geser/beri ruang lebih lebar untuk kolom nominal agar icon denda besar tidak "kepotong"
  const dateColW = hideInterestCols ? "w-[25%]" : "w-[14%]";
  const totalColW = hideInterestCols ? "" : "w-[18%]";
  const pokokColW = hideInterestCols ? "w-[25%]" : "w-[16%]";
  const bungaColW = hideInterestCols ? "" : "w-[12%]";
  const sisaPokokColW = hideInterestCols ? "w-[25%]" : "w-[16%]";
  const sisaBungaColW = hideInterestCols ? "" : "w-[14%]";
  const dendaColW = hideInterestCols ? "" : "w-[10%]";

  const totalSelectableRows = displayRows.length + extraOutsideRows.length;

  return (
    <div
      className={cn(
        "mt-3 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200",
        className,
      )}
    >
      <table className={tableBase}>
        <thead className="bg-white">
          <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            {!hideSelection ? (
              <th className={cn(checkboxColW, thClass, edgeL)}>
                <CheckboxCell
                  refEl={headerCheckboxRef}
                  aria-label="Pilih semua"
                  checked={isPelunasan ? true : allChecked}
                  disabled={isPelunasan}
                  onChange={(next) =>
                    setSelected(
                      Array.from({ length: totalSelectableRows }).map(() => next),
                    )
                  }
                  size="sm"
                  tone="blue"
                />
              </th>
            ) : null}

            <th className={cn(dateColW, thClass, hideSelection ? edgeL : "")}>
              Jatuh Tempo
            </th>

            {!hideInterestCols ? (
              <th className={cn(totalColW, thClass, "text-right")}>
                Total Tagihan Belum Dibayar
              </th>
            ) : null}

            <th className={cn(pokokColW, thClass, "text-right")}>Tagihan Pokok</th>

            {!hideInterestCols ? (
              <th className={cn(bungaColW, thClass, "text-right")}>Tagihan Bunga</th>
            ) : null}

            <th className={cn(sisaPokokColW, thClass, edgeR, "text-right")}>
              Sisa Tagihan Pokok
            </th>

            {!hideInterestCols ? (
              <th className={cn(sisaBungaColW, thClass, "text-right")}>
                Sisa Tagihan Bunga
              </th>
            ) : null}

            {showPenaltyCol ? (
              <th className={cn(dendaColW, thClass, edgeR, "text-right")}>
                Tagihan Denda
              </th>
            ) : null}
          </tr>
        </thead>

        <tbody className="bg-white">
          {displayRows.length === 0 ? (
            <tr>
              <td
                colSpan={colCount}
                className="px-4 py-10 text-center text-sm text-slate-600"
              >
                Tidak ada data.
              </td>
            </tr>
          ) : (
            <>
              {showGraceHighlight ? <GracePeriodInfoRow colSpan={colCount} /> : null}

              {displayRows.map((bill, idx) => {
                const showPenalty = idx < 3;
                const penaltyValue = showPenalty ? penalties[idx]?.total ?? "0" : "-";

                return (
                  <tr
                    key={`${bill.jatuhTempo}-${idx}`}
                    className={cn(
                      "border-t border-slate-100 text-sm",
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                    )}
                  >
                    {!hideSelection ? (
                      <td className={cn(checkboxColW, tdClass, edgeL)}>
                        <input
                          type="checkbox"
                          aria-label="Pilih tagihan"
                          checked={isPelunasan ? true : (selected[idx] ?? false)}
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
                    ) : null}

                    <td
                      className={cn(
                        dateColW,
                        tdClass,
                        dateCell,
                        hideSelection ? edgeL : "",
                      )}
                    >
                      {bill.jatuhTempo}
                    </td>

                    {!hideInterestCols ? (
                      <td className={cn(totalColW, tdClass, "text-slate-800", numCell)}>
                        {bill.totalBelumDibayar}
                      </td>
                    ) : null}

                    <td className={cn(pokokColW, tdClass, "text-slate-800", numCell)}>
                      {bill.tagihanPokok}
                    </td>

                    {!hideInterestCols ? (
                      <td className={cn(bungaColW, tdClass, "text-slate-800", numCell)}>
                        {bill.tagihanBunga}
                      </td>
                    ) : null}

                    <td
                      className={cn(
                        sisaPokokColW,
                        tdClass,
                        edgeR,
                        "text-slate-800",
                        numCell,
                      )}
                    >
                      {bill.sisaPokok}
                    </td>

                    {!hideInterestCols ? (
                      <td className={cn(sisaBungaColW, tdClass, "text-slate-800", numCell)}>
                        {bill.sisaBunga}
                      </td>
                    ) : null}

                    {showPenaltyCol ? (
                      <td className={cn(dendaColW, tdClass, edgeR, "text-slate-800")}>
                        <div className="flex items-center justify-end gap-2">
                          <span className={cn(numCell)}>{penaltyValue}</span>
                          <PenaltyIcon show={showPenalty} />
                        </div>
                      </td>
                    ) : null}
                  </tr>
                );
              })}

              {extraOutsideRows.map((bill, idx) => {
                const globalIndex = displayRows.length + idx;
                const showPenalty = globalIndex < 3;
                const penaltyValue = showPenalty
                  ? penalties[globalIndex]?.total ?? "0"
                  : "-";

                return (
                  <tr
                    key={`outside-${bill.jatuhTempo}-${globalIndex}`}
                    className={cn(
                      "border-t border-slate-100 text-sm",
                      globalIndex % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                    )}
                  >
                    {!hideSelection ? (
                      <td className={cn(checkboxColW, tdClass, edgeL)}>
                        <input
                          type="checkbox"
                          aria-label="Pilih tagihan"
                          checked={
                            isPelunasan ? true : (selected[globalIndex] ?? false)
                          }
                          disabled={isPelunasan}
                          onChange={(e) => {
                            const next = e.target.checked;
                            setSelected((prev) => {
                              const copy = [...prev];
                              copy[globalIndex] = next;
                              return copy;
                            });
                          }}
                        />
                      </td>
                    ) : null}

                    <td
                      className={cn(
                        dateColW,
                        tdClass,
                        dateCell,
                        hideSelection ? edgeL : "",
                      )}
                    >
                      {bill.jatuhTempo}
                    </td>

                    {!hideInterestCols ? (
                      <td className={cn(totalColW, tdClass, "text-slate-800", numCell)}>
                        {bill.totalBelumDibayar}
                      </td>
                    ) : null}

                    <td className={cn(pokokColW, tdClass, "text-slate-800", numCell)}>
                      {bill.tagihanPokok}
                    </td>

                    {!hideInterestCols ? (
                      <td className={cn(bungaColW, tdClass, "text-slate-800", numCell)}>
                        {bill.tagihanBunga}
                      </td>
                    ) : null}

                    <td
                      className={cn(
                        sisaPokokColW,
                        tdClass,
                        edgeR,
                        "text-slate-800",
                        numCell,
                      )}
                    >
                      {bill.sisaPokok}
                    </td>

                    {!hideInterestCols ? (
                      <td className={cn(sisaBungaColW, tdClass, "text-slate-800", numCell)}>
                        {bill.sisaBunga}
                      </td>
                    ) : null}

                    {showPenaltyCol ? (
                      <td className={cn(dendaColW, tdClass, edgeR, "text-slate-800")}>
                        <div className="flex items-center justify-end gap-2">
                          <span className={cn(numCell)}>{penaltyValue}</span>
                          <PenaltyIcon show={showPenalty} />
                        </div>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}