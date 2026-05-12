"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { X, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type PenaltyDetailRow = {
  tanggalKeterlambatan: string;
  nominalDenda: string;
};

function parseIdrLike(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;

  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);

  return Number.isFinite(n) ? n : 0;
}

function formatIdrLike(n: number) {
  const s = Math.round(Number.isFinite(n) ? n : 0).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const R = "rounded-[5px]";

type StatusValue = "Semua" | "Aktif" | "Dibatalkan";

type RowWithMeta = PenaltyDetailRow & {
  originalIndex: number;
  status: Exclude<StatusValue, "Semua">;
};

function deriveStatusForRowIndex(
  originalIndex: number,
): Exclude<StatusValue, "Semua"> {
  return originalIndex % 7 === 0 ? "Dibatalkan" : "Aktif";
}

function StatusPill({ status }: { status: Exclude<StatusValue, "Semua"> }) {
  const cls =
    status === "Aktif"
      ? "bg-emerald-600 text-white ring-1 ring-emerald-600/20"
      : "bg-rose-600 text-white ring-1 ring-rose-600/20";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "min-w-[66px]",
        "rounded-[7px] px-2 py-1",
        "text-[12px] font-semibold leading-none",
        cls,
      )}
    >
      {status}
    </span>
  );
}

function InfoIconTooltip({
  label,
  rows,
}: {
  label: string;
  rows: Array<{ k: string; v: string }>;
}) {
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-5 w-5 items-center justify-center rounded-full",
            "bg-[#2563eb] text-white ring-2 ring-[#2563eb]/15",
            "transition hover:bg-[#1d4ed8]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2563eb]/20",
          )}
          aria-label={label}
          title={label}
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>

      <TooltipContent
        portalled
        side="left"
        align="center"
        sideOffset={10}
        avoidCollisions={false}
        className={cn(
          "z-[9999] max-w-[320px] rounded-2xl border-slate-200 bg-white px-4 py-3 shadow-xl",
          "text-[13px] font-normal leading-relaxed text-slate-800",
        )}
      >
        <div className="text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
          Info Denda
        </div>

        <div className="mt-2 space-y-1.5">
          {rows.map((r) => (
            <div
              key={r.k}
              className="grid gap-x-2 [grid-template-columns:140px_minmax(0,1fr)]"
            >
              <div className="text-slate-600">{r.k}</div>
              <div className="font-semibold text-slate-900">{r.v}</div>
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function CellText({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
        className,
      )}
      title={title}
    >
      {children}
    </div>
  );
}

export default function PenaltyDetailDialogReadOnly({
  open,
  onOpenChange,
  rows,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  rows: PenaltyDetailRow[];
}) {
  const [statusFilter, setStatusFilter] = React.useState<StatusValue>("Aktif");

  React.useEffect(() => {
    if (!open) return;
    setStatusFilter("Aktif");
  }, [open]);

  const allRows: RowWithMeta[] = React.useMemo(() => {
    return rows.map((r, originalIndex) => ({
      ...r,
      originalIndex,
      status: deriveStatusForRowIndex(originalIndex),
    }));
  }, [rows]);

  const filteredRows = React.useMemo(() => {
    if (statusFilter === "Semua") return allRows;
    return allRows.filter((it) => it.status === statusFilter);
  }, [allRows, statusFilter]);

  const total = React.useMemo(() => {
    return filteredRows.reduce((sum, r) => sum + parseIdrLike(r.nominalDenda), 0);
  }, [filteredRows]);

  const totalText = React.useMemo(() => formatIdrLike(total), [total]);

  const lateDaysPattern = [3, 4, 2] as const;

  const COL = {
    no: 65,
    late: 200,
    tanggal: 120, // ✅ dari 160 -> 120
    denda: 140,
    status: 170,
  } as const;

  const tableMinWidth =
    COL.no + COL.late + COL.tanggal + COL.denda + COL.status; // 695

  const headerWrapCls =
    "px-2 pb-2 pt-3 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900";
  const bodyWrapCls = "px-2 py-2.5 text-[12px] font-normal text-slate-900";
  const bodyWrapRightCls = "px-2 py-2.5 text-right tabular-nums whitespace-nowrap";

  const thBase = "px-0";
  const tdBase = "px-0";

  const filterSelectCls = cn(
    "h-9 w-full rounded-[10px] border border-slate-200 bg-white px-2.5",
    "text-[12px] font-semibold text-slate-800 shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const colStyle = (w: number) =>
    ({
      width: `${w}px`,
      minWidth: `${w}px`,
      maxWidth: `${w}px`,
    }) as React.CSSProperties;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.25rem)]",
          "sm:w-[780px] sm:max-w-[780px]",
          "max-h-[80vh]",
          "overflow-hidden",
          R,
          "border-slate-200 p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className={cn("bg-white", R)}>
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="min-w-0">
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                Rincian Denda
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center",
                R,
                "text-slate-700 transition hover:bg-slate-100",
              )}
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          <div
            className="overflow-auto px-6 py-5"
            style={{ maxHeight: "calc(80vh - 64px - 76px)" }}
          >
            <div className="w-full">
              <div className="mx-auto inline-block w-fit max-w-full">
                <div
                  className={cn(
                    "inline-block w-fit max-w-full overflow-hidden",
                    R,
                    "bg-white ring-1 ring-slate-300",
                  )}
                >
                  <div className="safe-x-scroll w-full bg-white">
                    <table
                      className="table-fixed border-collapse"
                      style={{
                        width: tableMinWidth,
                        minWidth: tableMinWidth,
                      }}
                    >
                      <colgroup>
                        <col style={colStyle(COL.no)} />
                        <col style={colStyle(COL.late)} />
                        <col style={colStyle(COL.tanggal)} />
                        <col style={colStyle(COL.denda)} />
                        <col style={colStyle(COL.status)} />
                      </colgroup>

                      <thead className="bg-white">
                        <tr className="text-left">
                          <th className={thBase}>
                            <div className={headerWrapCls}>NO.</div>
                          </th>
                          <th className={thBase}>
                            <div className={headerWrapCls}>
                              KETERLAMBATAN (HARI)
                            </div>
                          </th>
                          <th className={thBase}>
                            <div className={headerWrapCls}>TANGGAL</div>
                          </th>
                          <th className={thBase}>
                            <div className={headerWrapCls}>DENDA</div>
                          </th>
                          <th className={thBase}>
                            <div className={headerWrapCls}>STATUS</div>
                          </th>
                        </tr>

                        <tr className="border-t border-slate-200 border-b border-slate-200 bg-white">
                          <th className={thBase}>
                            <div className="px-2 py-2" />
                          </th>
                          <th className={thBase}>
                            <div className="px-2 py-2" />
                          </th>
                          <th className={thBase}>
                            <div className="px-2 py-2" />
                          </th>
                          <th className={thBase}>
                            <div className="px-2 py-2" />
                          </th>
                          <th className={thBase}>
                            <div className="px-2 py-2">
                              <select
                                value={statusFilter}
                                onChange={(e) =>
                                  setStatusFilter(e.target.value as StatusValue)
                                }
                                className={filterSelectCls}
                              >
                                <option value="Semua">-- Semua --</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                              </select>
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white">
                        {filteredRows.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-4 py-10 text-center text-sm text-slate-600"
                            >
                              Tidak ada rincian denda.
                            </td>
                          </tr>
                        ) : (
                          filteredRows.map((r, idx) => {
                            const lateDays =
                              lateDaysPattern[idx % lateDaysPattern.length];

                            const statusInfoRows: Array<{ k: string; v: string }> =
                              r.status === "Dibatalkan"
                                ? [
                                    { k: "Tanggal pembatalan", v: "11-05-2026" },
                                    {
                                      k: "Alasan pembatalan",
                                      v: "Denda dibatalkan berdasarkan hasil penyesuaian transaksi pembayaran.",
                                    },
                                    { k: "Dibatalkan oleh", v: "Arya Dharma" },
                                  ]
                                : [];

                            return (
                              <tr
                                key={`${r.tanggalKeterlambatan}-${r.originalIndex}`}
                                className={cn(
                                  "border-t border-slate-200",
                                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                                )}
                              >
                                <td className={tdBase}>
                                  <div className={bodyWrapCls}>
                                    <CellText>{idx + 1}</CellText>
                                  </div>
                                </td>

                                <td className={tdBase}>
                                  <div className={bodyWrapCls}>
                                    <CellText>{lateDays}</CellText>
                                  </div>
                                </td>

                                <td className={tdBase}>
                                  <div className={bodyWrapCls}>
                                    <CellText>{r.tanggalKeterlambatan}</CellText>
                                  </div>
                                </td>

                                <td className={tdBase}>
                                  <div
                                    className={cn(
                                      bodyWrapRightCls,
                                      "text-[12px] font-normal text-slate-900",
                                    )}
                                  >
                                    <CellText className="text-right">
                                      {r.nominalDenda}
                                    </CellText>
                                  </div>
                                </td>

                                <td className={tdBase}>
                                  <div className={cn(bodyWrapCls, "py-2.5")}>
                                    <div className="flex min-w-0 items-center gap-2">
                                      <StatusPill status={r.status} />
                                      {statusInfoRows.length > 0 ? (
                                        <InfoIconTooltip
                                          label="Info status denda"
                                          rows={statusInfoRows}
                                        />
                                      ) : null}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}

                        <tr className="border-t border-slate-200 bg-white">
                          <td colSpan={3} className={tdBase}>
                            <div className="px-2 py-3 text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                              TOTAL DENDA
                            </div>
                          </td>

                          <td className={tdBase}>
                            <div className="px-2 py-3 text-right text-[12px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                              {totalText}
                            </div>
                          </td>

                          <td className={tdBase}>
                            <div className="px-2 py-3" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex h-10 items-center justify-center px-4 text-[13px] font-semibold",
                  "rounded-[10px]",
                  "bg-slate-600 text-white ring-1 ring-slate-600/20 transition hover:bg-slate-700",
                )}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}