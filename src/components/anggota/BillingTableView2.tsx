"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import NumericCell from "@/components/anggota/NumericCell";
import PenaltyDetailDialog, {
  type PenaltyDetailRow,
} from "@/components/anggota/PenaltyDetailDialog";
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
const PENALTY_DETAIL_DAYS = 3; // 3 baris detail
const PENALTY_PER_DAY = 25000; // 75.000 / 3

function RowShell({
  children,
  active,
  disableActiveRing = false,
  disableRowRings = false,
  density = "default",
}: {
  children: React.ReactNode;
  active: boolean;
  disableActiveRing?: boolean;
  disableRowRings?: boolean;
  density?: "default" | "roomy";
}) {
  return (
    <div className={cn("bg-white px-3", density === "roomy" ? "py-4" : "py-3")}>
      <div
        className={cn(
          "rounded-[5px] bg-white",
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
    <div className="rounded-[5px] border border-slate-200 bg-white px-4 py-4">
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
        "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
        "bg-[#2563eb] text-white ring-2 ring-[#2563eb]/15",
        "transition hover:bg-[#1d4ed8]",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563eb]/20",
        className,
      )}
      aria-label="Rincian denda"
      title="Rincian denda"
    >
      <Info className="h-3.5 w-3.5" />
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
  rowDensity = "default",
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
  rowDensity?: "default" | "roomy";
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

  // Khusus mode Penurunan Baki Debet (di app ini): hideSelection + locked + grace block + tanpa kolom denda
  const isBakiDebetMode = hideSelection && isLocked && highlightGraceBlock && !showPenaltyColumn;

  const cellY = isBakiDebetMode ? "py-2.5" : rowDensity === "roomy" ? "py-8" : "py-4";

  const dateTextClass =
    "text-[13px] font-semibold text-slate-900 tabular-nums whitespace-nowrap";

  const numberTextClassBase =
    "text-right text-[13px] font-medium text-slate-900 tabular-nums whitespace-nowrap num-sans-tabular";

  const numberTextClass =
    tone === "khusus" ? numberTextClassBase : numberTextClassBase;

  function openPenaltyDetailForRow(dueDateDmy: string) {
    setPenaltyRows(buildPenaltyDetailRows(dueDateDmy));
    setPenaltyOpen(true);
  }

  function RightNum({ value }: { value: string }) {
    return <NumericCell align="right">{value}</NumericCell>;
  }

  function PenaltyCell({ idx, dueDateDmy }: { idx: number; dueDateDmy: string }) {
    const shouldShow = idx < PENALTY_ROWS;

    if (!shouldShow) {
      return <div className={cn("px-4 pr-1", cellY, numberTextClass)} />;
    }

    return (
      <div className={cn("px-4 pr-1", cellY, numberTextClass)}>
        <div className="flex items-center justify-end gap-2">
          <span className="tabular-nums whitespace-nowrap num-sans-tabular">
            {formatIdrLike(PENALTY_AMOUNT)}
          </span>
          <PenaltyInfoButton onClick={() => openPenaltyDetailForRow(dueDateDmy)} />
        </div>
      </div>
    );
  }

  const rowDividerClass = hideRowDividers ? "" : "border-t border-slate-200";

  function displayTagihanPokok(rowIndex: number, raw: string) {
    if (graceCount > 0 && rowIndex < graceCount) return "0";
    return raw;
  }

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
          "overflow-hidden rounded-[5px] border border-slate-200 bg-white",
        )}
      >
        <table className="w-full border-collapse text-[13px]">
          <BillingTableHeader
            hideSelection={hideSelection}
            showPenaltyColumn={showPenaltyColumn}
          />

          <tbody className="bg-white">
            {showGraceInfo && highlightGraceBlock && graceRows.length > 0 ? (
              <>
                <tr className={cn(rowDividerClass)}>
                  <td colSpan={colCount} className="p-0">
                    <div className="bg-white p-0">
                      <div className="overflow-hidden rounded-[5px] border-2 border-blue-600/70 bg-white">
                        <div className="p-1">
                          <table className="w-full border-collapse text-[13px]">
                            <tbody className="bg-white">
                              <GracePeriodInfoRow colSpan={colCount} noBorder />
                            </tbody>
                          </table>
                        </div>

                        {graceRows.map((r, idx) => {
                          const rowIndex = idx;
                          const active = hideSelection ? false : selected[rowIndex] === true;

                          return (
                            <div
                              key={`${r.jatuhTempo}-grace-flat-${idx}`}
                              className={cn(idx === 0 ? "" : "border-t border-slate-200")}
                            >
                              <RowShell
                                active={active}
                                disableActiveRing={disableRowActiveRing}
                                disableRowRings={disableRowRings}
                                density={rowDensity}
                              >
                                <div className={cn("grid items-center gap-0", gridTemplate)}>
                                  {!hideSelection ? (
                                    <div className={cn("flex items-center justify-center px-4", cellY)}>
                                      <input
                                        type="checkbox"
                                        aria-label="Pilih tagihan"
                                        checked={isLocked ? true : (selected[rowIndex] ?? false)}
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

                                  <div className={cn("px-4", cellY, dateTextClass)}>
                                    {r.jatuhTempo}
                                  </div>

                                  <div className={cn("px-4", cellY, numberTextClass)}>
                                    <RightNum value={r.totalBelumDibayar} />
                                  </div>

                                  <div className={cn("px-4", cellY, numberTextClass)}>
                                    <RightNum
                                      value={displayTagihanPokok(rowIndex, r.tagihanPokok)}
                                    />
                                  </div>

                                  <div className={cn("px-4", cellY, numberTextClass)}>
                                    <RightNum value={r.tagihanBunga} />
                                  </div>

                                  <div className={cn("px-4 pr-6", cellY, numberTextClass)}>
                                    <RightNum value={r.sisaPokok} />
                                  </div>

                                  <div className={cn("px-4 pr-6", cellY, numberTextClass)}>
                                    <RightNum value={r.sisaBunga} />
                                  </div>

                                  {showPenaltyColumn ? (
                                    <PenaltyCell idx={rowIndex} dueDateDmy={r.jatuhTempo} />
                                  ) : null}
                                </div>
                              </RowShell>
                            </div>
                          );
                        })}
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
                          density={rowDensity}
                        >
                          <div className={cn("grid items-center gap-0", gridTemplate)}>
                            {!hideSelection ? (
                              <div className={cn("flex items-center justify-center px-4", cellY)}>
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

                            <div className={cn("px-4", cellY, dateTextClass)}>
                              {r.jatuhTempo}
                            </div>

                            <div className={cn("px-4", cellY, numberTextClass)}>
                              <RightNum value={r.totalBelumDibayar} />
                            </div>

                            <div className={cn("px-4", cellY, numberTextClass)}>
                              <RightNum
                                value={displayTagihanPokok(rowIndex, r.tagihanPokok)}
                              />
                            </div>

                            <div className={cn("px-4", cellY, numberTextClass)}>
                              <RightNum value={r.tagihanBunga} />
                            </div>

                            <div className={cn("px-4 pr-6", cellY, numberTextClass)}>
                              <RightNum value={r.sisaPokok} />
                            </div>

                            <div className={cn("px-4 pr-6", cellY, numberTextClass)}>
                              <RightNum value={r.sisaBunga} />
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
                            density={rowDensity}
                          >
                            <div className={cn("grid items-center gap-0", gridTemplate)}>
                              {!hideSelection ? (
                                <div className={cn("flex items-center justify-center px-4", cellY)}>
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

                              <div className={cn("px-4", cellY, dateTextClass)}>
                                {r.jatuhTempo}
                              </div>

                              <div className={cn("px-4", cellY, numberTextClass)}>
                                <RightNum value={r.totalBelumDibayar} />
                              </div>

                              <div className={cn("px-4", cellY, numberTextClass)}>
                                <RightNum value={displayTagihanPokok(idx, r.tagihanPokok)} />
                              </div>

                              <div className={cn("px-4", cellY, numberTextClass)}>
                                <RightNum value={r.tagihanBunga} />
                              </div>

                              <div className={cn("px-4 pr-6", cellY, numberTextClass)}>
                                <RightNum value={r.sisaPokok} />
                              </div>

                              <div className={cn("px-4 pr-6", cellY, numberTextClass)}>
                                <RightNum value={r.sisaBunga} />
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