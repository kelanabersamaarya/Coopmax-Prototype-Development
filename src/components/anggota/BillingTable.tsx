"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import PenaltyDetailDialog, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialog";
import NumericCell from "@/components/anggota/NumericCell";
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

/**
 * Sesuai permintaan:
 * - Selalu 3 baris rincian
 * - Nominal denda per hari = 25.000
 */
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

  // di View1, kita butuh tabel yang terlihat “penuh” (contoh) tapi tetap aman.
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

  // denda selalu 25.000 per baris (prototype)
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

  // ======= Styling helpers (match screenshot) =======
  const th =
    "px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900";
  const thRight =
    "px-4 py-3 text-right text-[11px] font-extrabold uppercase tracking-wide text-slate-900";
  const td = "px-4 py-3 text-[13px] text-slate-900";
  const tdNum = cn(td, "text-right tabular-nums whitespace-nowrap");
  const tdDate = cn(td, "font-medium tabular-nums whitespace-nowrap");
  const checkboxTh = "w-[44px]";
  const tableBase = "w-full border-collapse";

  // Tabel utama selalu punya kolom denda seperti contoh (tapi bisa disembunyikan di mode tertentu)
  const showPenaltyCol = !hideInterestCols && !interestOnlyCols && !feeOnlyCols;
  const showAllCols = !hideInterestCols && !interestOnlyCols && !penaltyOnlyCols && !feeOnlyCols;

  // default columns count (for colSpan calculations)
  const colCount = (() => {
    if (feeOnlyCols) return hideSelection ? 4 : 5;
    if (penaltyOnlyCols) return hideSelection ? 4 : 5;
    if (interestOnlyCols) return hideSelection ? 3 : 4;
    // default layout: 7 columns + checkbox = 8
    return hideSelection ? 7 : 8;
  })();

  // Grace block (contoh) — bungkus beberapa baris pertama + info row
  const graceEnabled = showGraceHighlight && showAllCols;
  const graceCount = graceEnabled ? Math.min(3, displayRows.length) : 0;
  const graceRows = graceCount > 0 ? displayRows.slice(0, graceCount) : [];
  const afterGraceRows =
    graceCount > 0 ? displayRows.slice(graceCount) : displayRows;

  // ===== Specialized: Fee only =====
  if (feeOnlyCols) {
    const colCountFee = hideSelection ? 4 : 5;

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

    const allCheckedFee = !hideSelection && feeRows.length > 0 && feeRows.every((_, i) => selected[i] === true);
    const anyCheckedFee = !hideSelection && feeRows.some((_, i) => selected[i] === true);

    return (
      <div className={cn("mt-3", className)}>
        <PenaltyDetailDialog
          open={penaltyOpen}
          onOpenChange={setPenaltyOpen}
          rows={penaltyRows}
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className={tableBase}>
            <thead className="bg-white">
              <tr>
                {!hideSelection ? (
                  <th className={cn(checkboxTh, th)}>
                    <div className="flex justify-center">
                      <TableCheckbox
                        ariaLabel="Pilih semua"
                        checked={isPelunasan ? true : allCheckedFee}
                        disabled={isPelunasan}
                        indeterminate={!isPelunasan && anyCheckedFee && !allCheckedFee}
                        onChange={(next) =>
                          setSelected(Array.from({ length: feeRows.length }).map(() => next))
                        }
                      />
                    </div>
                  </th>
                ) : null}
                <th className={th}>Jenis Biaya Lainnya (Fee)</th>
                <th className={th}>Periode</th>
                <th className={thRight}>Total Tagihan Biaya Lainnya</th>
                <th className={thRight}>Sisa Tagihan Biaya Lainnya</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {feeRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={colCountFee}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                feeRows.map((r, idx) => (
                  <tr key={`${r.periode}-${idx}`} className="border-t border-slate-200">
                    {!hideSelection ? (
                      <td className={cn(td, "text-center")}>
                        <TableCheckbox
                          ariaLabel="Pilih fee"
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
                    <td className={cn(td, "font-medium")}>{r.feeName}</td>
                    <td className={tdDate}>{r.periode}</td>
                    <td className={tdNum}>{r.total}</td>
                    <td className={tdNum}>
                      <NumericCell align="right">{r.sisa}</NumericCell>
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
    const colCountPenalty = hideSelection ? 4 : 5;

    const allCheckedPenalty =
      !hideSelection && displayRows.length > 0 && displayRows.every((_, i) => selected[i] === true);
    const anyCheckedPenalty =
      !hideSelection && displayRows.some((_, i) => selected[i] === true);

    return (
      <div className={cn("mt-3", className)}>
        <PenaltyDetailDialog
          open={penaltyOpen}
          onOpenChange={setPenaltyOpen}
          rows={penaltyRows}
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className={tableBase}>
            <thead className="bg-white">
              <tr>
                {!hideSelection ? (
                  <th className={cn(checkboxTh, th)}>
                    <div className="flex justify-center">
                      <TableCheckbox
                        ariaLabel="Pilih semua"
                        checked={isPelunasan ? true : allCheckedPenalty}
                        disabled={isPelunasan}
                        indeterminate={!isPelunasan && anyCheckedPenalty && !allCheckedPenalty}
                        onChange={(next) =>
                          setSelected(Array.from({ length: displayRows.length }).map(() => next))
                        }
                      />
                    </div>
                  </th>
                ) : null}
                <th className={th}>Angsuran Ke-</th>
                <th className={th}>Jatuh Tempo Tagihan Pinjaman</th>
                <th className={thRight}>Total Tagihan Denda</th>
                <th className={thRight}>Sisa Tagihan Denda</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {displayRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={colCountPenalty}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                displayRows.map((bill, idx) => (
                  <tr key={`${bill.jatuhTempo}-${idx}`} className="border-t border-slate-200">
                    {!hideSelection ? (
                      <td className={cn(td, "text-center")}>
                        <TableCheckbox
                          ariaLabel="Pilih denda"
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
                    <td className={cn(td, "font-medium tabular-nums")}>{idx + 1}</td>
                    <td className={tdDate}>{bill.jatuhTempo}</td>
                    <td className={tdNum}>
                      <div className="flex items-center justify-end gap-3">
                        <span>{penalties[idx]?.total ?? "25.000"}</span>
                        <PenaltyInfoButton onClick={() => openPenaltyDetailForRow(idx)} />
                      </div>
                    </td>
                    <td className={tdNum}>
                      <NumericCell align="right">{penalties[idx]?.remaining ?? "25.000"}</NumericCell>
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

  // ===== Specialized: Interest only =====
  if (interestOnlyCols) {
    const colCountInterest = hideSelection ? 3 : 4;

    const allCheckedInterest =
      !hideSelection && displayRows.length > 0 && displayRows.every((_, i) => selected[i] === true);
    const anyCheckedInterest =
      !hideSelection && displayRows.some((_, i) => selected[i] === true);

    return (
      <div className={cn("mt-3", className)}>
        <PenaltyDetailDialog
          open={penaltyOpen}
          onOpenChange={setPenaltyOpen}
          rows={penaltyRows}
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className={tableBase}>
            <thead className="bg-white">
              <tr>
                {!hideSelection ? (
                  <th className={cn(checkboxTh, th)}>
                    <div className="flex justify-center">
                      <TableCheckbox
                        ariaLabel="Pilih semua"
                        checked={isPelunasan ? true : allCheckedInterest}
                        disabled={isPelunasan}
                        indeterminate={!isPelunasan && anyCheckedInterest && !allCheckedInterest}
                        onChange={(next) =>
                          setSelected(Array.from({ length: displayRows.length }).map(() => next))
                        }
                      />
                    </div>
                  </th>
                ) : null}
                <th className={th}>Jatuh Tempo</th>
                <th className={thRight}>Tagihan Bunga</th>
                <th className={thRight}>Sisa Tagihan Bunga</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {showGraceHighlight ? <GracePeriodInfoRow colSpan={colCountInterest} /> : null}

              {displayRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={colCountInterest}
                    className="px-4 py-10 text-center text-sm text-slate-600"
                  >
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                displayRows.map((bill, idx) => (
                  <tr key={`${bill.jatuhTempo}-${idx}`} className="border-t border-slate-200">
                    {!hideSelection ? (
                      <td className={cn(td, "text-center")}>
                        <TableCheckbox
                          ariaLabel="Pilih bunga"
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
                    <td className={tdNum}>{bill.tagihanBunga}</td>
                    <td className={tdNum}>
                      <NumericCell align="right">{bill.sisaBunga}</NumericCell>
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

  // ===== Default (match screenshot) =====
  // Header tetap seperti contoh, tapi kolom-kolom tertentu bisa disembunyikan via flags.
  const colDateW = "w-[140px]";
  const colTotalW = "w-[190px]";
  const colPokokW = "w-[150px]";
  const colBungaW = "w-[150px]";
  const colSisaPokokW = "w-[190px]";
  const colSisaBungaW = "w-[170px]";
  const colDendaW = "w-[150px]";

  return (
    <div className={cn("mt-3", className)}>
      <PenaltyDetailDialog
        open={penaltyOpen}
        onOpenChange={setPenaltyOpen}
        rows={penaltyRows}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className={tableBase}>
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
                        setSelected(Array.from({ length: totalSelectableRows }).map(() => next))
                      }
                    />
                  </div>
                </th>
              ) : null}

              <th className={cn(th, colDateW)}>Jatuh Tempo</th>

              {!hideInterestCols ? (
                <th className={cn(thRight, colTotalW)}>Total Tagihan Belum Dibayar</th>
              ) : null}

              <th className={cn(thRight, colPokokW)}>Tagihan Pokok</th>

              {!hideInterestCols ? (
                <th className={cn(thRight, colBungaW)}>Tagihan Bunga</th>
              ) : null}

              <th className={cn(thRight, colSisaPokokW)}>Sisa Tagihan Pokok</th>

              {!hideInterestCols ? (
                <th className={cn(thRight, colSisaBungaW)}>Sisa Tagihan Bunga</th>
              ) : null}

              {showPenaltyCol ? (
                <th className={cn(thRight, colDendaW)}>Tagihan Denda</th>
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
            ) : graceRows.length > 0 ? (
              <>
                {/* Grace block wrapper row */}
                <tr className="border-t border-slate-200">
                  <td colSpan={colCount} className="p-0">
                    <div className="p-2">
                      <div className="overflow-hidden rounded-xl border-2 border-[#2563eb]/60 bg-white">
                        <table className={tableBase}>
                          <tbody>
                            <GracePeriodInfoRow colSpan={colCount} noBorder />
                            {graceRows.map((bill, idx) => {
                              const rowIdx = idx;
                              return (
                                <tr
                                  key={`${bill.jatuhTempo}-grace-${idx}`}
                                  className={cn(
                                    idx === 0 ? "" : "border-t border-slate-200",
                                  )}
                                >
                                  {!hideSelection ? (
                                    <td className={cn(td, "text-center")}>
                                      <TableCheckbox
                                        ariaLabel="Pilih tagihan"
                                        checked={
                                          isPelunasan ? true : (selected[rowIdx] ?? false)
                                        }
                                        disabled={isPelunasan}
                                        onChange={(next) =>
                                          setSelected((prev) => {
                                            const copy = [...prev];
                                            copy[rowIdx] = next;
                                            return copy;
                                          })
                                        }
                                      />
                                    </td>
                                  ) : null}

                                  <td className={cn(tdDate, colDateW)}>{bill.jatuhTempo}</td>

                                  {!hideInterestCols ? (
                                    <td className={cn(tdNum, colTotalW)}>{bill.totalBelumDibayar}</td>
                                  ) : null}

                                  <td className={cn(tdNum, colPokokW)}>{bill.tagihanPokok}</td>

                                  {!hideInterestCols ? (
                                    <td className={cn(tdNum, colBungaW)}>{bill.tagihanBunga}</td>
                                  ) : null}

                                  <td className={cn(tdNum, colSisaPokokW)}>
                                    <NumericCell align="right">{bill.sisaPokok}</NumericCell>
                                  </td>

                                  {!hideInterestCols ? (
                                    <td className={cn(tdNum, colSisaBungaW)}>
                                      <NumericCell align="right">{bill.sisaBunga}</NumericCell>
                                    </td>
                                  ) : null}

                                  {showPenaltyCol ? (
                                    <td className={cn(tdNum, colDendaW)}>
                                      <div className="flex items-center justify-end gap-3">
                                        <span>{penalties[rowIdx]?.total ?? "25.000"}</span>
                                        <PenaltyInfoButton
                                          onClick={() => openPenaltyDetailForRow(rowIdx)}
                                        />
                                      </div>
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

                {/* rows after grace */}
                {afterGraceRows.map((bill, idx) => {
                  const rowIdx = graceCount + idx;
                  return (
                    <tr
                      key={`${bill.jatuhTempo}-${rowIdx}`}
                      className="border-t border-slate-200"
                    >
                      {!hideSelection ? (
                        <td className={cn(td, "text-center")}>
                          <TableCheckbox
                            ariaLabel="Pilih tagihan"
                            checked={isPelunasan ? true : (selected[rowIdx] ?? false)}
                            disabled={isPelunasan}
                            onChange={(next) =>
                              setSelected((prev) => {
                                const copy = [...prev];
                                copy[rowIdx] = next;
                                return copy;
                              })
                            }
                          />
                        </td>
                      ) : null}

                      <td className={cn(tdDate, colDateW)}>{bill.jatuhTempo}</td>

                      {!hideInterestCols ? (
                        <td className={cn(tdNum, colTotalW)}>{bill.totalBelumDibayar}</td>
                      ) : null}

                      <td className={cn(tdNum, colPokokW)}>{bill.tagihanPokok}</td>

                      {!hideInterestCols ? (
                        <td className={cn(tdNum, colBungaW)}>{bill.tagihanBunga}</td>
                      ) : null}

                      <td className={cn(tdNum, colSisaPokokW)}>
                        <NumericCell align="right">{bill.sisaPokok}</NumericCell>
                      </td>

                      {!hideInterestCols ? (
                        <td className={cn(tdNum, colSisaBungaW)}>
                          <NumericCell align="right">{bill.sisaBunga}</NumericCell>
                        </td>
                      ) : null}

                      {showPenaltyCol ? (
                        <td className={cn(tdNum, colDendaW)}>
                          {/* di luar grace block: tampilkan angka saja agar bersih seperti contoh */}
                          {penalties[rowIdx]?.total ?? "25.000"}
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                {showGraceHighlight ? <GracePeriodInfoRow colSpan={colCount} /> : null}

                {displayRows.map((bill, idx) => (
                  <tr key={`${bill.jatuhTempo}-${idx}`} className="border-t border-slate-200">
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

                    <td className={cn(tdDate, colDateW)}>{bill.jatuhTempo}</td>

                    {!hideInterestCols ? (
                      <td className={cn(tdNum, colTotalW)}>{bill.totalBelumDibayar}</td>
                    ) : null}

                    <td className={cn(tdNum, colPokokW)}>{bill.tagihanPokok}</td>

                    {!hideInterestCols ? (
                      <td className={cn(tdNum, colBungaW)}>{bill.tagihanBunga}</td>
                    ) : null}

                    <td className={cn(tdNum, colSisaPokokW)}>
                      <NumericCell align="right">{bill.sisaPokok}</NumericCell>
                    </td>

                    {!hideInterestCols ? (
                      <td className={cn(tdNum, colSisaBungaW)}>
                        <NumericCell align="right">{bill.sisaBunga}</NumericCell>
                      </td>
                    ) : null}

                    {showPenaltyCol ? (
                      <td className={cn(tdNum, colDendaW)}>
                        {penalties[idx]?.total ?? "25.000"}
                      </td>
                    ) : null}
                  </tr>
                ))}

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
                            checked={isPelunasan ? true : (selected[globalIndex] ?? false)}
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

                      <td className={cn(tdDate, colDateW)}>{bill.jatuhTempo}</td>

                      {!hideInterestCols ? (
                        <td className={cn(tdNum, colTotalW)}>{bill.totalBelumDibayar}</td>
                      ) : null}

                      <td className={cn(tdNum, colPokokW)}>{bill.tagihanPokok}</td>

                      {!hideInterestCols ? (
                        <td className={cn(tdNum, colBungaW)}>{bill.tagihanBunga}</td>
                      ) : null}

                      <td className={cn(tdNum, colSisaPokokW)}>
                        <NumericCell align="right">{bill.sisaPokok}</NumericCell>
                      </td>

                      {!hideInterestCols ? (
                        <td className={cn(tdNum, colSisaBungaW)}>
                          <NumericCell align="right">{bill.sisaBunga}</NumericCell>
                        </td>
                      ) : null}

                      {showPenaltyCol ? (
                        <td className={cn(tdNum, colDendaW)}>
                          {penalties[globalIndex]?.total ?? "25.000"}
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