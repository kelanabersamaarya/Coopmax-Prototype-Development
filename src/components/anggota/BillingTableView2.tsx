"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import NumericCell from "@/components/anggota/NumericCell";
import PenaltyDetailDialog, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialog";

export type BillingRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

function RowShell({
  children,
  active,
  disableActiveRing = false,
  disableRowRings = false,
}: {
  children: React.ReactNode;
  active: boolean;
  disableActiveRing?: boolean;
  disableRowRings?: boolean;
}) {
  return (
    <div className="bg-white px-3 py-3">
      <div
        className={cn(
          "rounded-2xl bg-white",
          !disableRowRings && active && !disableActiveRing
            ? "ring-2 ring-slate-900/5"
            : "",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function NextBillInfoBanner() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
          <Info className="h-5 w-5" />
        </span>

        <div className="min-w-0 text-sm font-medium text-slate-900">
          Tagihan berikutnya akan diterbitkan pada{" "}
          <span className="font-extrabold text-[#3366FF]">20 April 2025</span>{" "}
          dan jatuh tempo pada{" "}
          <span className="font-extrabold text-[#3366FF]">5 Mei 2025</span>.
        </div>
      </div>
    </div>
  );
}

function formatDmy(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
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

function penaltyForIndex(idx: number) {
  const base = 25000;
  return base + idx * 5000;
}

function buildPenaltyDetailRows(dueDateDmy: string, idx: number) {
  const due = parseDmyToDate(dueDateDmy) ?? new Date();
  const days = 3;

  const perDay = Math.round(penaltyForIndex(idx) / days);

  const rows: PenaltyDetailRow[] = Array.from({ length: days }).map((_, i) => ({
    tanggalKeterlambatan: formatDmy(addDays(due, i + 1)),
    nominalDenda: formatIdrLike(perDay),
  }));

  return rows;
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

export default function BillingTableView2({
  rows,
  selected,
  setSelected,
  isLocked = false,
  showNextBillInfo = true,
  showGraceInfo = true,
  highlightGraceBlock = false,
  hideSelection = false,
  showPenaltyColumn = false,
  tone = "default",
  disableRowActiveRing = false,
  disableRowRings = false,
  hideRowDividers = false,
  className,
}: {
  rows: BillingRow[];
  selected: boolean[];
  setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
  isLocked?: boolean;
  showNextBillInfo?: boolean;
  showGraceInfo?: boolean;
  highlightGraceBlock?: boolean;
  hideSelection?: boolean;
  showPenaltyColumn?: boolean;
  tone?: "default" | "khusus";
  disableRowActiveRing?: boolean;
  disableRowRings?: boolean;
  hideRowDividers?: boolean;
  className?: string;
}) {
  const [penaltyOpen, setPenaltyOpen] = React.useState(false);
  const [penaltyRows, setPenaltyRows] = React.useState<PenaltyDetailRow[]>([]);

  const colCount = hideSelection
    ? showPenaltyColumn
      ? 7
      : 6
    : showPenaltyColumn
      ? 8
      : 7;

  const allChecked = React.useMemo(() => {
    if (rows.length === 0) return false;
    return rows.every((_, idx) => selected[idx] === true);
  }, [rows, selected]);

  const anyChecked = React.useMemo(() => {
    return rows.some((_, idx) => selected[idx] === true);
  }, [rows, selected]);

  const headerCheckboxRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate =
      !isLocked && anyChecked && !allChecked;
  }, [allChecked, anyChecked, isLocked]);

  React.useEffect(() => {
    if (selected.length === rows.length) return;
    setSelected((prev) => rows.map((_, idx) => prev[idx] ?? false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length]);

  const graceCount =
    showGraceInfo && highlightGraceBlock ? Math.min(2, rows.length) : 0;
  const graceRows = graceCount > 0 ? rows.slice(0, graceCount) : [];
  const afterGraceRows = graceCount > 0 ? rows.slice(graceCount) : rows;

  const gridTemplate = (() => {
    if (hideSelection) {
      return showPenaltyColumn
        ? "[grid-template-columns:minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,0.95fr)]"
        : "[grid-template-columns:minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)]";
    }

    return showPenaltyColumn
      ? "[grid-template-columns:44px_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,0.95fr)]"
      : "[grid-template-columns:44px_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)]";
  })();

  const dateTextClass =
    "text-[13px] font-semibold text-slate-900 tabular-nums whitespace-nowrap";

  const numberTextClassBase =
    "text-right text-[13px] font-medium text-slate-900 tabular-nums whitespace-nowrap num-sans-tabular";

  const numberTextClass =
    tone === "khusus" ? numberTextClassBase : numberTextClassBase;

  const sisaPokokNumberCell = cn("px-4 py-4", numberTextClass, "pr-6");
  const sisaBungaNumberCell = cn("px-4 py-4", numberTextClass, "pr-6");

  function openPenaltyDetailForRow(idx: number, dueDateDmy: string) {
    setPenaltyRows(buildPenaltyDetailRows(dueDateDmy, idx));
    setPenaltyOpen(true);
  }

  function PenaltyCell({ idx, dueDateDmy }: { idx: number; dueDateDmy: string }) {
    const nominal = formatIdrLike(penaltyForIndex(idx));

    return (
      <div className={cn("px-4 py-4", numberTextClass)}>
        <div className="flex items-center justify-end gap-3">
          <span className="tabular-nums whitespace-nowrap num-sans-tabular">
            {nominal}
          </span>
          <PenaltyInfoButton
            onClick={() => openPenaltyDetailForRow(idx, dueDateDmy)}
          />
        </div>
      </div>
    );
  }

  const rowDividerClass = hideRowDividers ? "" : "border-t border-slate-200";

  return (
    <div className={cn("mt-3", className)}>
      <PenaltyDetailDialog
        open={penaltyOpen}
        onOpenChange={setPenaltyOpen}
        rows={penaltyRows}
      />

      {showNextBillInfo ? <NextBillInfoBanner /> : null}

      <div
        className={cn(
          showNextBillInfo ? "mt-3" : "",
          "overflow-hidden rounded-2xl border border-slate-200 bg-white",
        )}
      >
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-700">
              {!hideSelection ? (
                <th className="w-[44px] px-4 py-3">
                  <input
                    ref={headerCheckboxRef}
                    type="checkbox"
                    aria-label="Pilih semua"
                    checked={isLocked ? true : allChecked}
                    disabled={isLocked}
                    onChange={(e) => {
                      const next = e.target.checked;
                      setSelected(rows.map(() => next));
                    }}
                    className="h-4 w-4 rounded-[5px] accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
                  />
                </th>
              ) : null}

              <th className="px-4 py-3">Jatuh Tempo</th>
              <th className="px-4 py-3 text-right">Total Tagihan Belum Dibayar</th>
              <th className="px-4 py-3 text-right">Tagihan Pokok</th>
              <th className="px-4 py-3 text-right">Tagihan Bunga</th>
              <th className="px-4 py-3 text-right">Sisa Tagihan Pokok</th>
              <th className="px-4 py-3 text-right">Sisa Tagihan Bunga</th>
              {showPenaltyColumn ? (
                <th className="px-4 py-3 text-right">Tagihan Denda</th>
              ) : null}
            </tr>
          </thead>

          <tbody className="bg-white">
            {showGraceInfo && highlightGraceBlock && graceRows.length > 0 ? (
              <>
                <tr className={cn(rowDividerClass)}>
                  <td colSpan={colCount} className="p-0">
                    <div className="bg-white px-3 py-3">
                      <div className="overflow-hidden rounded-2xl border-2 border-blue-600/70 bg-white">
                        <table className="w-full border-collapse text-[13px]">
                          <tbody className="bg-white">
                            <GracePeriodInfoRow colSpan={colCount} noBorder />

                            {graceRows.map((r, idx) => {
                              const rowIndex = idx;
                              const active = hideSelection
                                ? false
                                : selected[rowIndex] === true;

                              return (
                                <tr
                                  key={`${r.jatuhTempo}-grace-${idx}`}
                                  className={cn(idx === 0 ? "" : rowDividerClass)}
                                >
                                  <td colSpan={colCount} className="p-0">
                                    <RowShell
                                      active={active}
                                      disableActiveRing={disableRowActiveRing}
                                      disableRowRings={disableRowRings}
                                    >
                                      <div
                                        className={cn(
                                          "grid items-center gap-0",
                                          gridTemplate,
                                        )}
                                      >
                                        {!hideSelection ? (
                                          <div className="flex items-center justify-center px-4 py-4">
                                            <input
                                              type="checkbox"
                                              aria-label="Pilih tagihan"
                                              checked={
                                                isLocked
                                                  ? true
                                                  : (selected[rowIndex] ?? false)
                                              }
                                              disabled={isLocked}
                                              onChange={(e) => {
                                                const next = e.target.checked;
                                                setSelected((prev) => {
                                                  const copy = [...prev];
                                                  copy[rowIndex] = next;
                                                  return copy;
                                                });
                                              }}
                                              className="h-4 w-4 rounded-[5px] accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
                                            />
                                          </div>
                                        ) : null}

                                        <div className={cn("px-4 py-4", dateTextClass)}>
                                          {r.jatuhTempo}
                                        </div>

                                        <div
                                          className={cn("px-4 py-4", numberTextClass)}
                                        >
                                          {r.totalBelumDibayar}
                                        </div>

                                        <div
                                          className={cn("px-4 py-4", numberTextClass)}
                                        >
                                          {r.tagihanPokok}
                                        </div>

                                        <div
                                          className={cn("px-4 py-4", numberTextClass)}
                                        >
                                          {r.tagihanBunga}
                                        </div>

                                        <div className={sisaPokokNumberCell}>
                                          <span className="whitespace-nowrap num-sans-tabular tabular-nums">
                                            {r.sisaPokok}
                                          </span>
                                        </div>

                                        <div className={sisaBungaNumberCell}>
                                          <span className="whitespace-nowrap num-sans-tabular tabular-nums">
                                            {r.sisaBunga}
                                          </span>
                                        </div>

                                        {showPenaltyColumn ? (
                                          <PenaltyCell
                                            idx={rowIndex}
                                            dueDateDmy={r.jatuhTempo}
                                          />
                                        ) : null}
                                      </div>
                                    </RowShell>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>

                {afterGraceRows.map((r, idx) => {
                  const rowIndex = graceCount + idx;
                  const active = hideSelection ? false : selected[rowIndex] === true;

                  return (
                    <tr
                      key={`${r.jatuhTempo}-${rowIndex}`}
                      className={cn(rowDividerClass)}
                    >
                      <td colSpan={colCount} className="p-0">
                        <RowShell
                          active={active}
                          disableActiveRing={disableRowActiveRing}
                          disableRowRings={disableRowRings}
                        >
                          <div className={cn("grid items-center gap-0", gridTemplate)}>
                            {!hideSelection ? (
                              <div className="flex items-center justify-center px-4 py-4">
                                <input
                                  type="checkbox"
                                  aria-label="Pilih tagihan"
                                  checked={
                                    isLocked ? true : (selected[rowIndex] ?? false)
                                  }
                                  disabled={isLocked}
                                  onChange={(e) => {
                                    const next = e.target.checked;
                                    setSelected((prev) => {
                                      const copy = [...prev];
                                      copy[rowIndex] = next;
                                      return copy;
                                    });
                                  }}
                                  className="h-4 w-4 rounded-[5px] accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
                                />
                              </div>
                            ) : null}

                            <div className={cn("px-4 py-4", dateTextClass)}>
                              {r.jatuhTempo}
                            </div>

                            <div className={cn("px-4 py-4", numberTextClass)}>
                              {r.totalBelumDibayar}
                            </div>

                            <div className={cn("px-4 py-4", numberTextClass)}>
                              {r.tagihanPokok}
                            </div>

                            <div className={cn("px-4 py-4", numberTextClass)}>
                              {r.tagihanBunga}
                            </div>

                            <div className={sisaPokokNumberCell}>
                              <span className="whitespace-nowrap num-sans-tabular tabular-nums">
                                {r.sisaPokok}
                              </span>
                            </div>

                            <div className={sisaBungaNumberCell}>
                              <span className="whitespace-nowrap num-sans-tabular tabular-nums">
                                {r.sisaBunga}
                              </span>
                            </div>

                            {showPenaltyColumn ? (
                              <PenaltyCell idx={rowIndex} dueDateDmy={r.jatuhTempo} />
                            ) : null}
                          </div>
                        </RowShell>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                {showGraceInfo ? <GracePeriodInfoRow colSpan={colCount} /> : null}

                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={colCount}
                      className="px-4 py-10 text-center text-sm text-slate-600"
                    >
                      Tidak ada data.
                    </td>
                  </tr>
                ) : (
                  rows.map((r, idx) => {
                    const active = hideSelection ? false : selected[idx] === true;

                    return (
                      <tr
                        key={`${r.jatuhTempo}-${idx}`}
                        className={cn(rowDividerClass)}
                      >
                        <td colSpan={colCount} className="p-0">
                          <RowShell
                            active={active}
                            disableActiveRing={disableRowActiveRing}
                            disableRowRings={disableRowRings}
                          >
                            <div className={cn("grid items-center gap-0", gridTemplate)}>
                              {!hideSelection ? (
                                <div className="flex items-center justify-center px-4 py-4">
                                  <input
                                    type="checkbox"
                                    aria-label="Pilih tagihan"
                                    checked={isLocked ? true : (selected[idx] ?? false)}
                                    disabled={isLocked}
                                    onChange={(e) => {
                                      const next = e.target.checked;
                                      setSelected((prev) => {
                                        const copy = [...prev];
                                        copy[idx] = next;
                                        return copy;
                                      });
                                    }}
                                    className="h-4 w-4 rounded-[5px] accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
                                  />
                                </div>
                              ) : null}

                              <div className={cn("px-4 py-4", dateTextClass)}>
                                {r.jatuhTempo}
                              </div>

                              <div className={cn("px-4 py-4", numberTextClass)}>
                                {r.totalBelumDibayar}
                              </div>

                              <div className={cn("px-4 py-4", numberTextClass)}>
                                {r.tagihanPokok}
                              </div>

                              <div className={cn("px-4 py-4", numberTextClass)}>
                                {r.tagihanBunga}
                              </div>

                              <div className={sisaPokokNumberCell}>
                                <span className="whitespace-nowrap num-sans-tabular tabular-nums">
                                  {r.sisaPokok}
                                </span>
                              </div>

                              <div className={sisaBungaNumberCell}>
                                <span className="whitespace-nowrap num-sans-tabular tabular-nums">
                                  {r.sisaBunga}
                                </span>
                              </div>

                              {showPenaltyColumn ? (
                                <PenaltyCell idx={idx} dueDateDmy={r.jatuhTempo} />
                              ) : null}
                            </div>
                          </RowShell>
                        </td>
                      </tr>
                    );
                  })
                )}
              </>
            )}
          </tbody>
        </table>

        <div className="sr-only">
          <NumericCell>0</NumericCell>
        </div>
      </div>
    </div>
  );
}