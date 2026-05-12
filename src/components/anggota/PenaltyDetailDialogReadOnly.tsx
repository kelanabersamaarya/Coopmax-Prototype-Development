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
        "rounded-[5px] px-2 py-1",
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

  const headerWrapCls =
    "px-4 pb-2 pt-3 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900";
  const bodyWrapCls = "px-4 py-3 text-left text-[12px] font-normal text-slate-900";
  const bodyWrapRightCls =
    "px-4 py-3 text-right text-[12px] font-normal tabular-nums whitespace-nowrap text-slate-900";

  const filterSelectCls = cn(
    "h-10 w-full rounded-[10px] border border-slate-200 bg-white px-3",
    "text-[12px] font-semibold text-slate-800 shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const contentPadX = "px-6";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.25rem)] sm:w-[720px] sm:max-w-[720px]",
          "max-h-[80vh]",
          "overflow-hidden",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
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
                "inline-flex h-9 w-9 items-center justify-center rounded-full",
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
            className={cn("overflow-auto py-5", contentPadX)}
            style={{ maxHeight: "calc(80vh - 64px - 1px - 64px - 1px)" }}
          >
            {/* ✅ border-left dipaksa + ring supaya konsisten across build */}
            <div
              className={cn(
                "w-full overflow-hidden rounded-[5px] bg-white",
                "border border-slate-300 border-l border-l-slate-300",
                "ring-1 ring-slate-300/60 ring-inset",
              )}
            >
              <div className="safe-x-scroll w-full bg-white">
                <table className="w-full min-w-[640px] border-collapse text-[12px]">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <th className={cn(headerWrapCls, "w-[72px]")}>NO.</th>
                      <th className={cn(headerWrapCls, "w-[240px]")}>
                        KETERLAMBATAN (HARI)
                      </th>
                      <th className={cn(headerWrapCls, "w-[140px]")}>TANGGAL</th>
                      <th className={cn(headerWrapCls, "w-[140px]")}>DENDA</th>
                      <th className={cn(headerWrapCls, "min-w-[160px]")}>STATUS</th>
                    </tr>

                    <tr className="border-b border-slate-200 bg-white">
                      <th className="px-4 py-2" />
                      <th className="px-4 py-2" />
                      <th className="px-4 py-2" />
                      <th className="px-4 py-2" />
                      <th className="px-4 py-2">
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
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-10 text-center text-[12px] text-slate-600"
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
                            <td className={bodyWrapCls}>
                              <CellText>{idx + 1}</CellText>
                            </td>

                            <td className={bodyWrapCls}>
                              <CellText>{lateDays}</CellText>
                            </td>

                            <td className={bodyWrapCls}>
                              <CellText>{r.tanggalKeterlambatan}</CellText>
                            </td>

                            <td className={bodyWrapRightCls}>
                              <CellText className="text-right">
                                {r.nominalDenda}
                              </CellText>
                            </td>

                            <td className={bodyWrapCls}>
                              <div className="flex min-w-0 items-center gap-2">
                                <StatusPill status={r.status} />
                                {statusInfoRows.length > 0 ? (
                                  <InfoIconTooltip
                                    label="Info status denda"
                                    rows={statusInfoRows}
                                  />
                                ) : null}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}

                    <tr className="border-t border-slate-200 bg-white">
                      <td
                        colSpan={3}
                        className="px-4 py-3 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900"
                      >
                        TOTAL DENDA
                      </td>

                      <td className="px-4 py-3 text-right text-[12px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                        {totalText}
                      </td>

                      <td className="px-4 py-3" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className={cn("py-4", contentPadX)}>
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