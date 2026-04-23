"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";

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
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <div className="bg-white px-3 py-3">
      <div
        className={cn(
          "rounded-2xl bg-white",
          // Jangan pakai border di row agar tidak double border dengan wrapper luar.
          // Aktif cukup pakai ring halus.
          active ? "ring-2 ring-slate-900/5" : "",
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

export default function BillingTableView2({
  rows,
  selected,
  setSelected,
  isLocked = false,
  showNextBillInfo = true,
  showGraceInfo = true,
  highlightGraceBlock = false,
  className,
}: {
  rows: BillingRow[];
  selected: boolean[];
  setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
  isLocked?: boolean; // misalnya pelunasan: disable checklist
  showNextBillInfo?: boolean;
  showGraceInfo?: boolean;
  highlightGraceBlock?: boolean; // border highlight (wrapper) untuk grace rows
  className?: string;
}) {
  const colCount = 7;

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

  return (
    <div className={cn("mt-3", className)}>
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
              <th className="px-4 py-3">Jatuh Tempo</th>
              <th className="px-4 py-3 text-right">Total Tagihan Belum Dibayar</th>
              <th className="px-4 py-3 text-right">Tagihan Pokok</th>
              <th className="px-4 py-3 text-right">Tagihan Bunga</th>
              <th className="px-4 py-3 text-right">Sisa Tagihan Pokok</th>
              <th className="px-4 py-3 text-right">Sisa Tagihan Bunga</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {showGraceInfo && highlightGraceBlock && graceRows.length > 0 ? (
              <>
                <tr className="border-t border-slate-200">
                  <td colSpan={colCount} className="p-0">
                    <div className="bg-white px-3 py-3">
                      <div className="overflow-hidden rounded-2xl border-2 border-blue-600/70 bg-white">
                        <table className="w-full border-collapse text-[13px]">
                          <tbody className="bg-white">
                            <GracePeriodInfoRow colSpan={colCount} noBorder />

                            {graceRows.map((r, idx) => {
                              const rowIndex = idx;
                              const active = selected[rowIndex] === true;

                              return (
                                <tr
                                  key={`${r.jatuhTempo}-grace-${idx}`}
                                  className={cn(
                                    idx === 0 ? "" : "border-t border-slate-200",
                                  )}
                                >
                                  <td colSpan={colCount} className="p-0">
                                    <RowShell active={active}>
                                      <div className="grid items-center gap-0 [grid-template-columns:44px_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)]">
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

                                        <div className="px-4 py-4 text-[15px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                                          {r.jatuhTempo}
                                        </div>

                                        <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                          {r.totalBelumDibayar}
                                        </div>

                                        <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                          {r.tagihanPokok}
                                        </div>

                                        <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                          {r.tagihanBunga}
                                        </div>

                                        <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                          {r.sisaPokok}
                                        </div>

                                        <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                          {r.sisaBunga}
                                        </div>
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
                  const active = selected[rowIndex] === true;

                  return (
                    <tr
                      key={`${r.jatuhTempo}-${rowIndex}`}
                      className="border-t border-slate-200"
                    >
                      <td colSpan={colCount} className="p-0">
                        <RowShell active={active}>
                          <div className="grid items-center gap-0 [grid-template-columns:44px_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)]">
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

                            <div className="px-4 py-4 text-[15px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                              {r.jatuhTempo}
                            </div>

                            <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                              {r.totalBelumDibayar}
                            </div>

                            <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                              {r.tagihanPokok}
                            </div>

                            <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                              {r.tagihanBunga}
                            </div>

                            <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                              {r.sisaPokok}
                            </div>

                            <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                              {r.sisaBunga}
                            </div>
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
                    const active = selected[idx] === true;

                    return (
                      <tr
                        key={`${r.jatuhTempo}-${idx}`}
                        className="border-t border-slate-200"
                      >
                        <td colSpan={colCount} className="p-0">
                          <RowShell active={active}>
                            <div className="grid items-center gap-0 [grid-template-columns:44px_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)]">
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

                              <div className="px-4 py-4 text-[15px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                                {r.jatuhTempo}
                              </div>

                              <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                {r.totalBelumDibayar}
                              </div>

                              <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                {r.tagihanPokok}
                              </div>

                              <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                {r.tagihanBunga}
                              </div>

                              <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                {r.sisaPokok}
                              </div>

                              <div className="px-4 py-4 text-right text-[14px] font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                                {r.sisaBunga}
                              </div>
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
      </div>
    </div>
  );
}