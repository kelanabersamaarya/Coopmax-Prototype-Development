"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import PenaltyDetailDialog, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialog";
import { Info } from "lucide-react";

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
  if (d.getDate() !== day) d.setDate(0);
  return d;
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function parseDmyToDate(value: string): Date | undefined {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec((value ?? "").trim());
  if (!m) return undefined;
  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);
  const d = new Date(yyyy, mm - 1, dd);
  if (
    d.getFullYear() !== yyyy ||
    d.getMonth() !== mm - 1 ||
    d.getDate() !== dd
  ) {
    return undefined;
  }
  return d;
}

function formatIdrLike(n: number) {
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function buildPenaltyDetailRows(dueDateDmy: string) {
  const due = parseDmyToDate(dueDateDmy) ?? new Date();
  const days = 3;
  const perDay = 25000;

  const rows: PenaltyDetailRow[] = Array.from({ length: days }).map((_, i) => ({
    tanggalKeterlambatan: formatDmy(addDays(due, i + 1)),
    nominalDenda: formatIdrLike(perDay),
  }));

  return rows;
}

function TableCheckbox({
  checked,
  disabled,
  onChange,
  ariaLabel,
  className,
  indeterminate,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  ariaLabel: string;
  className?: string;
  indeterminate?: boolean;
}) {
  const ref = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label={ariaLabel}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.checked)}
      className={cn(
        "h-4 w-4 rounded-[3px] border border-slate-300 bg-white",
        "accent-[#2563eb]",
        "focus:outline-none focus:ring-2 focus:ring-[#2563eb]/25",
        disabled ? "opacity-60" : "",
        className,
      )}
    />
  );
}

function PenaltyInfoButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-full",
        "bg-[#2563eb] text-white ring-1 ring-[#2563eb]/20",
        "transition hover:bg-[#1d4ed8]",
        className,
      )}
      aria-label="Rincian denda"
      title="Rincian denda"
    >
      <Info className="h-4 w-4" />
    </button>
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
  const [penaltyOpen, setPenaltyOpen] = React.useState(false);
  const [penaltyRows, setPenaltyRows] = React.useState<PenaltyDetailRow[]>([]);

  const extraOutsideRows = React.useMemo<BillingRow[]>(() => {
    if (!showGraceHighlight) return [];
    const last = rows[rows.length - 1]?.jatuhTempo ?? "";
    const lastDate = parseDmyToDate(last) ?? new Date();

    return Array.from({ length: 5 }).map((_, i) => {
      const due = addMonths(lastDate, i + 1);
      return {
        jatuhTempo: formatDmy(due),
        totalBelumDibayar: "916.667",
        tagihanPokok: "916.667",
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
  const totalSelectableRows = displayRows.length + extraOutsideRows.length;

  const allChecked = React.useMemo(() => {
    if (hideSelection) return false;
    if (totalSelectableRows === 0) return false;
    return Array.from({ length: totalSelectableRows }).every(
      (_, idx) => selected[idx] === true,
    );
  }, [hideSelection, selected, totalSelectableRows]);

  const anyChecked = React.useMemo(() => {
    if (hideSelection) return false;
    return Array.from({ length: totalSelectableRows }).some(
      (_, idx) => selected[idx] === true,
    );
  }, [hideSelection, selected, totalSelectableRows]);

  const penalties = React.useMemo(() => {
    const perRow = 25000;
    return Array.from({ length: totalSelectableRows }).map(() => ({
      total: formatIdrLike(perRow),
      remaining: formatIdrLike(perRow),
    }));
  }, [totalSelectableRows]);

  function openPenaltyDetailForRow(rowIndex: number) {
    const dueDate =
      rowIndex < displayRows.length
        ? displayRows[rowIndex]?.jatuhTempo ?? ""
        : extraOutsideRows[rowIndex - displayRows.length]?.jatuhTempo ?? "";
    setPenaltyRows(buildPenaltyDetailRows(dueDate));
    setPenaltyOpen(true);
  }

  const th =
    "px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900";
  const thRight =
    "px-4 py-3 text-right text-[11px] font-extrabold uppercase tracking-wide text-slate-900";
  const td = "px-4 py-3 text-[13px] text-slate-900";
  const tdNum = cn(
    td,
    "text-right whitespace-nowrap",
    "num-sans-tabular tabular-nums",
  );
  const tdDate = cn(td, "font-medium tabular-nums whitespace-nowrap");
  const checkboxTh = "w-[44px]";
  const twoLineHeader = "leading-[1.05] whitespace-nowrap";

  const showPenaltyCol = !hideInterestCols && !interestOnlyCols && !feeOnlyCols;
  const showAllCols =
    !hideInterestCols && !interestOnlyCols && !penaltyOnlyCols && !feeOnlyCols;

  const colCount = (() => {
    if (feeOnlyCols) return hideSelection ? 4 : 5;
    if (penaltyOnlyCols) return hideSelection ? 4 : 5;
    if (interestOnlyCols) return hideSelection ? 3 : 4;
    return hideSelection ? 7 : 8;
  })();

  const graceEnabled = showGraceHighlight && showAllCols;

  // FIX: grace period hanya 2 baris (sesuai tampilan referensi)
  const graceCount = graceEnabled ? Math.min(2, displayRows.length) : 0;

  function rowIsGrace(rowIndex: number) {
    return graceEnabled && rowIndex < graceCount;
  }

  function rowBorderClass(isGrace: boolean, isFirstGrace: boolean) {
    if (!isGrace) return "border-t border-slate-200";
    return cn(
      "border-t",
      isFirstGrace ? "border-t-2 border-t-[#2563eb]/60" : "border-t-[#2563eb]/25",
      "bg-white",
    );
  }

  return (
    <div className={cn("mt-3 billing-table-compact", className)}>
      <PenaltyDetailDialog
        open={penaltyOpen}
        onOpenChange={setPenaltyOpen}
        rows={penaltyRows}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className={cn("w-full border-collapse")}>
          <thead className="bg-white">
            <tr className="border-b border-slate-200">
              {!hideSelection ? (
                <th className={cn(checkboxTh, th)}>
                  <div className="flex justify-center">
                    <TableCheckbox
                      ariaLabel="Pilih semua"
                      checked={isPelunasan ? true : allChecked}
                      disabled={isPelunasan}
                      indeterminate={!isPelunasan && anyChecked && !allChecked}
                      onChange={(next) =>
                        setSelected(
                          Array.from({ length: totalSelectableRows }).map(() => next),
                        )
                      }
                    />
                  </div>
                </th>
              ) : null}

              <th className={cn(th, twoLineHeader)}>
                Jatuh
                <br />
                Tempo
              </th>

              {!hideInterestCols ? (
                <th className={cn(thRight, twoLineHeader)}>
                  Total Tagihan
                  <br />
                  Belum Dibayar
                </th>
              ) : null}

              <th className={cn(thRight, twoLineHeader)}>
                Tagihan
                <br />
                Pokok
              </th>

              {!hideInterestCols ? (
                <th className={cn(thRight, twoLineHeader)}>
                  Tagihan
                  <br />
                  Bunga
                </th>
              ) : null}

              <th className={cn(thRight, twoLineHeader)}>
                Sisa Tagihan
                <br />
                Pokok
              </th>

              {!hideInterestCols ? (
                <th className={cn(thRight, twoLineHeader)}>
                  Sisa Tagihan
                  <br />
                  Bunga
                </th>
              ) : null}

              {showPenaltyCol ? (
                <th className={cn(thRight, twoLineHeader)}>
                  Tagihan
                  <br />
                  Denda
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
                  const isGrace = rowIsGrace(idx);
                  const isFirstGrace = isGrace && idx === 0;

                  return (
                    <tr
                      key={`${bill.jatuhTempo}-${idx}`}
                      className={rowBorderClass(isGrace, isFirstGrace)}
                    >
                      {!hideSelection ? (
                        <td className={cn(td, "text-center")}>
                          <TableCheckbox
                            ariaLabel="Pilih tagihan"
                            checked={isPelunasan ? true : (selected[idx] ?? false)}
                            disabled={isPelunasan}
                            onChange={(next) =>
                              setSelected((prev) => {
                                const copy = [...prev];
                                copy[idx] = next;
                                return copy;
                              })
                            }
                          />
                        </td>
                      ) : null}

                      <td className={tdDate}>{bill.jatuhTempo}</td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>{bill.totalBelumDibayar}</td>
                      ) : null}

                      <td className={tdNum}>{bill.tagihanPokok}</td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>{bill.tagihanBunga}</td>
                      ) : null}

                      <td className={tdNum}>{bill.sisaPokok}</td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>{bill.sisaBunga}</td>
                      ) : null}

                      {showPenaltyCol ? (
                        <td className={tdNum}>
                          <div className="flex items-center justify-end gap-3">
                            <span>{penalties[idx]?.total ?? "25.000"}</span>
                            <PenaltyInfoButton
                              onClick={() => openPenaltyDetailForRow(idx)}
                            />
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  );
                })}

                {extraOutsideRows.map((bill, idx) => {
                  const globalIndex = displayRows.length + idx;
                  return (
                    <tr
                      key={`outside-${bill.jatuhTempo}-${globalIndex}`}
                      className="border-t border-slate-200"
                    >
                      {!hideSelection ? (
                        <td className={cn(td, "text-center")}>
                          <TableCheckbox
                            ariaLabel="Pilih tagihan"
                            checked={
                              isPelunasan ? true : (selected[globalIndex] ?? false)
                            }
                            disabled={isPelunasan}
                            onChange={(next) =>
                              setSelected((prev) => {
                                const copy = [...prev];
                                copy[globalIndex] = next;
                                return copy;
                              })
                            }
                          />
                        </td>
                      ) : null}

                      <td className={tdDate}>{bill.jatuhTempo}</td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>{bill.totalBelumDibayar}</td>
                      ) : null}

                      <td className={tdNum}>{bill.tagihanPokok}</td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>{bill.tagihanBunga}</td>
                      ) : null}

                      <td className={tdNum}>{bill.sisaPokok}</td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>{bill.sisaBunga}</td>
                      ) : null}

                      {showPenaltyCol ? (
                        // HILANGKAN angka denda untuk baris "di bawah" (extraOutsideRows)
                        <td className={tdNum}>
                          <span className="text-slate-400">-</span>
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
    </div>
  );
}