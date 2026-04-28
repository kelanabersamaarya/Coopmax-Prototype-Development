"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import PenaltyDetailDialog, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialog";
import { Info } from "lucide-react";
import NumericCell from "@/components/anggota/NumericCell";
import BillingTableHeader from "@/components/anggota/BillingTableHeader";

export type BillingRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

const PENALTY_ROWS = 3;
const PENALTY_AMOUNT = 75000;
const PENALTY_DETAIL_DAYS = 3;
const PENALTY_PER_DAY = 25000;

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

  const rows: PenaltyDetailRow[] = Array.from({ length: PENALTY_DETAIL_DAYS }).map(
    (_v, i) => ({
      tanggalKeterlambatan: formatDmy(addDays(due, i + 1)),
      nominalDenda: formatIdrLike(PENALTY_PER_DAY),
    }),
  );

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
        "h-4 w-4 rounded-[4px] border border-slate-300 bg-white",
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
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
        "bg-[#2563eb] text-white ring-2 ring-[#2563eb]/15",
        "transition hover:bg-[#1d4ed8]",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563eb]/20",
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
  showPenaltyColumn = false,
  forceGraceInfo = false,
  rowDensity = "default",
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
  showPenaltyColumn?: boolean;
  forceGraceInfo?: boolean;
  rowDensity?: "default" | "roomy";
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

  function openPenaltyDetailForRow(rowIndex: number) {
    const dueDate =
      rowIndex < displayRows.length
        ? displayRows[rowIndex]?.jatuhTempo ?? ""
        : extraOutsideRows[rowIndex - displayRows.length]?.jatuhTempo ?? "";
    setPenaltyRows(buildPenaltyDetailRows(dueDate));
    setPenaltyOpen(true);
  }

  const tdY = rowDensity === "roomy" ? "py-4" : "py-3";
  const tdBase = `px-3 ${tdY} text-[13px] text-slate-900`;
  const tdDate = cn(tdBase, "font-semibold tabular-nums whitespace-nowrap");

  const tdNum = cn(
    tdBase,
    "text-right whitespace-nowrap",
    "num-sans-tabular tabular-nums",
  );

  const checkboxColW = "w-[40px]";
  const checkboxTd = cn(tdBase, "px-2 text-center");

  const showPenaltyCol = showPenaltyColumn;

  const showAllCols =
    !hideInterestCols && !interestOnlyCols && !penaltyOnlyCols && !feeOnlyCols;

  const colCount = (() => {
    const penalty = showPenaltyCol ? 1 : 0;
    if (feeOnlyCols) return (hideSelection ? 4 : 5) + penalty;
    if (penaltyOnlyCols) return (hideSelection ? 4 : 5) + penalty;
    if (interestOnlyCols) return (hideSelection ? 3 : 4) + penalty;
    return (hideSelection ? 6 : 7) + penalty;
  })();

  const graceEnabled = showGraceHighlight && showAllCols;
  const graceCount = graceEnabled ? Math.min(2, displayRows.length) : 0;

  const graceRows = graceEnabled ? displayRows.slice(0, graceCount) : [];
  const nonGraceRows = graceEnabled ? displayRows.slice(graceCount) : displayRows;

  const penaltyTd = cn(tdNum);
  const penaltyTdEmpty = cn(tdNum);

  const penaltyValueClass = cn("tabular-nums whitespace-nowrap font-normal");

  const shouldShowGraceInfoRow =
    (showGraceHighlight || forceGraceInfo) && showAllCols;

  function NumCell({ value }: { value: string }) {
    if (!hideSelection) return <>{value}</>;
    return (
      <NumericCell align="right" className="w-full">
        {value}
      </NumericCell>
    );
  }

  return (
    <div className={cn("mt-3", className)}>
      <PenaltyDetailDialog
        open={penaltyOpen}
        onOpenChange={setPenaltyOpen}
        rows={penaltyRows}
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full border-collapse">
          <BillingTableHeader
            hideSelection={hideSelection}
            showPenaltyColumn={showPenaltyCol}
          />

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
                {graceEnabled && graceRows.length > 0 ? (
                  <tr className="border-t border-slate-200">
                    <td colSpan={colCount} className="p-0">
                      <div className="bg-white p-0">
                        <div className="overflow-hidden rounded-xl border-2 border-blue-600/70 bg-white">
                          <table className="w-full border-collapse">
                            <tbody className="bg-white">
                              <GracePeriodInfoRow colSpan={colCount} noBorder />

                              {graceRows.map((bill, idx) => {
                                const rowIndex = idx;
                                const showPenaltyValue = rowIndex < PENALTY_ROWS;

                                return (
                                  <tr
                                    key={`grace-${bill.jatuhTempo}-${idx}`}
                                    className={cn(
                                      idx === 0 ? "" : "border-t border-slate-200",
                                      idx % 2 === 0 ? "bg-white" : "bg-white",
                                    )}
                                  >
                                    {!hideSelection ? (
                                      <td className={checkboxTd}>
                                        <TableCheckbox
                                          ariaLabel="Pilih tagihan"
                                          checked={
                                            isPelunasan
                                              ? true
                                              : (selected[rowIndex] ?? false)
                                          }
                                          disabled={isPelunasan}
                                          onChange={(next) =>
                                            setSelected((prev) => {
                                              const copy = [...prev];
                                              copy[rowIndex] = next;
                                              return copy;
                                            })
                                          }
                                        />
                                      </td>
                                    ) : null}

                                    <td className={cn(tdDate, "pl-3")}>
                                      {bill.jatuhTempo}
                                    </td>

                                    {!hideInterestCols ? (
                                      <td className={tdNum}>
                                        <NumCell value={bill.totalBelumDibayar} />
                                      </td>
                                    ) : null}

                                    <td className={tdNum}>
                                      <NumCell value={bill.tagihanPokok} />
                                    </td>

                                    {!hideInterestCols ? (
                                      <td className={tdNum}>
                                        <NumCell value={bill.tagihanBunga} />
                                      </td>
                                    ) : null}

                                    <td className={tdNum}>
                                      <NumCell value={bill.sisaPokok} />
                                    </td>

                                    {!hideInterestCols ? (
                                      <td className={tdNum}>
                                        <NumCell value={bill.sisaBunga} />
                                      </td>
                                    ) : null}

                                    {showPenaltyCol ? (
                                      <td className={penaltyTd}>
                                        {showPenaltyValue ? (
                                          <div className="flex items-center justify-end gap-3">
                                            <span className={penaltyValueClass}>
                                              {formatIdrLike(PENALTY_AMOUNT)}
                                            </span>
                                            <PenaltyInfoButton
                                              onClick={() =>
                                                openPenaltyDetailForRow(rowIndex)
                                              }
                                            />
                                          </div>
                                        ) : null}
                                      </td>
                                    ) : null}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : shouldShowGraceInfoRow ? (
                  <GracePeriodInfoRow colSpan={colCount} />
                ) : null}

                {nonGraceRows.map((bill, idx) => {
                  const rowIndex = graceEnabled ? graceCount + idx : idx;
                  const showPenaltyValue = rowIndex < PENALTY_ROWS;

                  return (
                    <tr
                      key={`${bill.jatuhTempo}-${rowIndex}`}
                      className={cn("border-t border-slate-200", "bg-white")}
                    >
                      {!hideSelection ? (
                        <td className={checkboxTd}>
                          <TableCheckbox
                            ariaLabel="Pilih tagihan"
                            checked={isPelunasan ? true : (selected[rowIndex] ?? false)}
                            disabled={isPelunasan}
                            onChange={(next) =>
                              setSelected((prev) => {
                                const copy = [...prev];
                                copy[rowIndex] = next;
                                return copy;
                              })
                            }
                          />
                        </td>
                      ) : null}

                      <td className={cn(tdDate, "pl-3")}>{bill.jatuhTempo}</td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>
                          <NumCell value={bill.totalBelumDibayar} />
                        </td>
                      ) : null}

                      <td className={tdNum}>
                        <NumCell value={bill.tagihanPokok} />
                      </td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>
                          <NumCell value={bill.tagihanBunga} />
                        </td>
                      ) : null}

                      <td className={tdNum}>
                        <NumCell value={bill.sisaPokok} />
                      </td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>
                          <NumCell value={bill.sisaBunga} />
                        </td>
                      ) : null}

                      {showPenaltyCol ? (
                        <td className={penaltyTd}>
                          {showPenaltyValue ? (
                            <div className="flex items-center justify-end gap-3">
                              <span className={penaltyValueClass}>
                                {formatIdrLike(PENALTY_AMOUNT)}
                              </span>
                              <PenaltyInfoButton
                                onClick={() => openPenaltyDetailForRow(rowIndex)}
                              />
                            </div>
                          ) : null}
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
                      className={cn("border-t border-slate-200", "bg-white")}
                    >
                      {!hideSelection ? (
                        <td className={checkboxTd}>
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

                      <td className={cn(tdDate, "pl-3")}>{bill.jatuhTempo}</td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>
                          <NumCell value={bill.totalBelumDibayar} />
                        </td>
                      ) : null}

                      <td className={tdNum}>
                        <NumCell value={bill.tagihanPokok} />
                      </td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>
                          <NumCell value={bill.tagihanBunga} />
                        </td>
                      ) : null}

                      <td className={tdNum}>
                        <NumCell value={bill.sisaPokok} />
                      </td>

                      {!hideInterestCols ? (
                        <td className={tdNum}>
                          <NumCell value={bill.sisaBunga} />
                        </td>
                      ) : null}

                      {showPenaltyCol ? <td className={penaltyTdEmpty} /> : null}
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="sr-only">{checkboxColW}</div>
    </div>
  );
}