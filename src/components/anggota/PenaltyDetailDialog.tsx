"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Eye, Plus, X, Info } from "lucide-react";
import { toast } from "sonner";
import PenaltyCancelReasonDialog from "@/components/anggota/PenaltyCancelReasonDialog";
import PenaltyCancelDetailDialog from "@/components/anggota/PenaltyCancelDetailDialog";
import PenaltyAddReasonDialog from "@/components/anggota/PenaltyAddReasonDialog";
import PenaltyAddDetailDialog from "@/components/anggota/PenaltyAddDetailDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  source: "seed" | "added";
  addMetaKey?: string;
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
        "inline-flex items-center rounded-[5px] px-2 py-1 text-[12px] font-semibold leading-none",
        cls,
      )}
    >
      {status}
    </span>
  );
}

function CancelPenaltyButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 items-center justify-center px-3",
        "rounded-[5px]",
        "bg-[#DC3545] text-[12px] font-semibold text-white",
        "whitespace-nowrap",
        "ring-1 ring-[#DC3545]/25 transition hover:bg-[#c72f3d]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC3545]/20",
        disabled ? "opacity-50 pointer-events-none" : "",
      )}
      aria-label={disabled ? "Aksi tidak tersedia" : "Batalkan denda"}
      title={disabled ? "Hanya denda Aktif yang bisa dibatalkan" : "Batalkan denda"}
    >
      Batalkan Denda
    </button>
  );
}

function RowActionEyeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center",
        "rounded-[5px]",
        "bg-transparent text-slate-500",
        "ring-1 ring-slate-200",
        "transition hover:bg-slate-50 hover:text-slate-700",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
      )}
      aria-label="Lihat detail"
      title="Lihat detail"
    >
      <Eye className="h-4.5 w-4.5" strokeWidth={2.5} />
    </button>
  );
}

const DEFAULT_CANCEL_DETAIL = {
  cancelDate: "11-05-2026",
  reason: "Denda dibatalkan berdasarkan hasil penyesuaian transaksi pembayaran.",
  by: "Arya Dharma",
} as const;

function nextOriginalIndex(seedCount: number, addedCount: number) {
  return seedCount + addedCount;
}

type AddedPenaltyMeta = {
  addDate: string;
  reason: string;
  by: string;
};

type CanceledPenaltyMeta = {
  cancelDate: string;
  reason: string;
  by: string;
};

function metaKeyForAddedRow(addedIndex: number) {
  return `added-${addedIndex}`;
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

export default function PenaltyDetailDialog({
  open,
  onOpenChange,
  rows,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  rows: PenaltyDetailRow[];
}) {
  const [statusFilter, setStatusFilter] = React.useState<StatusValue>("Aktif");
  const [canceledIds, setCanceledIds] = React.useState<Set<number>>(() => new Set());
  const [cancelMeta, setCancelMeta] = React.useState<Record<number, CanceledPenaltyMeta>>(
    () => ({}),
  );
  const [addedPenalties, setAddedPenalties] = React.useState<PenaltyDetailRow[]>([]);
  const [addedMeta, setAddedMeta] = React.useState<Record<string, AddedPenaltyMeta>>(
    () => ({}),
  );

  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);
  const [cancelTarget, setCancelTarget] = React.useState<{
    originalIndex: number;
    tanggal: string;
    nominal: string;
  } | null>(null);

  const [cancelDetailOpen, setCancelDetailOpen] = React.useState(false);
  const [cancelDetailTarget, setCancelDetailTarget] = React.useState<{
    cancelDate: string;
    reason: string;
  } | null>(null);

  const [addOpen, setAddOpen] = React.useState(false);

  const [addDetailOpen, setAddDetailOpen] = React.useState(false);
  const [addDetailTarget, setAddDetailTarget] = React.useState<{
    addDate: string;
    reason: string;
  } | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setStatusFilter("Aktif");
    setCanceledIds(new Set());
    setCancelMeta({});
    setCancelDialogOpen(false);
    setCancelTarget(null);
    setCancelDetailOpen(false);
    setCancelDetailTarget(null);
    setAddOpen(false);
    setAddedPenalties([]);
    setAddedMeta({});
    setAddDetailOpen(false);
    setAddDetailTarget(null);
  }, [open]);

  const allRows: RowWithMeta[] = React.useMemo(() => {
    const seedWithMeta: RowWithMeta[] = rows.map((r, originalIndex) => {
      const baseStatus = deriveStatusForRowIndex(originalIndex);
      const status: Exclude<StatusValue, "Semua"> = canceledIds.has(originalIndex)
        ? "Dibatalkan"
        : baseStatus;

      return {
        ...r,
        originalIndex,
        status,
        source: "seed",
      };
    });

    const addedWithMeta: RowWithMeta[] = addedPenalties.map((r, idx) => ({
      ...r,
      originalIndex: nextOriginalIndex(rows.length, idx),
      status: "Aktif",
      source: "added",
      addMetaKey: metaKeyForAddedRow(idx),
    }));

    return [...seedWithMeta, ...addedWithMeta];
  }, [addedPenalties, canceledIds, rows]);

  const filteredRows = React.useMemo(() => {
    if (statusFilter === "Semua") return allRows;
    return allRows.filter((it) => it.status === statusFilter);
  }, [allRows, statusFilter]);

  const total = React.useMemo(() => {
    return filteredRows.reduce((sum, r) => sum + parseIdrLike(r.nominalDenda), 0);
  }, [filteredRows]);

  const totalText = React.useMemo(() => formatIdrLike(total), [total]);

  const lateDaysPattern = [3, 4, 2] as const;

  const headerAddBtnCls = cn(
    "inline-flex h-9 items-center gap-2 px-4",
    "rounded-[5px]",
    "bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm",
    "text-[14px] font-semibold",
    "transition hover:bg-slate-50",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
  );

  const ActionSlotSpacer = (
    <span className="inline-block h-8 w-8" aria-hidden="true" />
  );

  const currentUserName = "Arya Dharma";

  return (
    <>
      <PenaltyAddReasonDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onConfirm={(reason, date) => {
          setAddedPenalties((prev) => [
            ...prev,
            { tanggalKeterlambatan: date, nominalDenda: "25.000" },
          ]);

          const key = metaKeyForAddedRow(addedPenalties.length);
          setAddedMeta((prev) => ({
            ...prev,
            [key]: { addDate: date, reason, by: currentUserName },
          }));

          toast.success("Tambah denda tersimpan (prototype)", {
            description: `${date} • ${reason}`,
          });
        }}
      />

      <PenaltyAddDetailDialog
        open={addDetailOpen}
        onOpenChange={(v) => {
          setAddDetailOpen(v);
          if (!v) setAddDetailTarget(null);
        }}
        addDate={addDetailTarget?.addDate ?? "-"}
        reason={addDetailTarget?.reason ?? "-"}
      />

      <PenaltyCancelReasonDialog
        open={cancelDialogOpen}
        onOpenChange={(v) => {
          setCancelDialogOpen(v);
          if (!v) setCancelTarget(null);
        }}
        tanggal={cancelTarget?.tanggal ?? ""}
        nominal={cancelTarget?.nominal ?? ""}
        onConfirm={(reason, cancelDate) => {
          if (!cancelTarget) return;

          setCanceledIds((prev) => {
            const next = new Set(prev);
            next.add(cancelTarget.originalIndex);
            return next;
          });

          setCancelMeta((prev) => ({
            ...prev,
            [cancelTarget.originalIndex]: {
              reason,
              cancelDate,
              by: currentUserName,
            },
          }));

          setCancelTarget(null);
        }}
      />

      <PenaltyCancelDetailDialog
        open={cancelDetailOpen}
        onOpenChange={(v) => {
          setCancelDetailOpen(v);
          if (!v) setCancelDetailTarget(null);
        }}
        cancelDate={cancelDetailTarget?.cancelDate ?? "-"}
        reason={cancelDetailTarget?.reason ?? "-"}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "w-[calc(100vw-1.25rem)] sm:w-[900px]",
            "max-w-[900px]",
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

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAddOpen(true)}
                  className={headerAddBtnCls}
                  aria-label="Tambah denda"
                  title="Tambah denda"
                >
                  <Plus className="h-4.5 w-4.5 text-slate-600" />
                  Tambah Denda
                </button>

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
            </div>

            <Separator className="bg-slate-200" />

            <div
              className="overflow-auto px-6 py-5"
              style={{ maxHeight: "calc(80vh - 64px - 76px)" }}
            >
              <div className={cn("overflow-hidden", R, "bg-white ring-1 ring-slate-300")}>
                <div className="safe-x-scroll bg-white">
                  <table className="w-full min-w-[720px] table-fixed border-collapse border-l border-slate-300">
                    <thead className="bg-white">
                      <tr className="border-b border-slate-300 text-left">
                        <th className="w-[56px] px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900">
                          NO.
                        </th>
                        <th className="w-[190px] px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900">
                          KETERLAMBATAN (HARI)
                        </th>
                        <th className="w-[140px] px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900">
                          TANGGAL
                        </th>
                        <th className="w-[120px] px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900">
                          DENDA
                        </th>
                        <th className="w-[140px] px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900">
                          STATUS
                        </th>
                        <th className="w-[118px] px-3 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-900">
                          AKSI
                        </th>
                      </tr>

                      <tr className="bg-white">
                        <th className="px-4 py-2" />
                        <th className="px-4 py-2" />
                        <th className="px-4 py-2" />
                        <th className="px-4 py-2" />
                        <th className="px-4 py-2">
                          <div className="relative">
                            <select
                              value={statusFilter}
                              onChange={(e) =>
                                setStatusFilter(e.target.value as StatusValue)
                              }
                              className={cn(
                                "h-8 w-full rounded-[5px] border border-slate-200 bg-white px-3",
                                "text-[13px] font-semibold text-slate-700 shadow-none",
                                "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                              )}
                            >
                              <option value="Semua">-- Semua --</option>
                              <option value="Aktif">Aktif</option>
                              <option value="Dibatalkan">Dibatalkan</option>
                            </select>
                          </div>
                        </th>
                        <th className="px-3 py-2" />
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {filteredRows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-4 py-10 text-center text-sm text-slate-600"
                          >
                            Tidak ada rincian denda.
                          </td>
                        </tr>
                      ) : (
                        filteredRows.map((r, idx) => {
                          const isAdded = r.source === "added";
                          const lateDays = lateDaysPattern[idx % lateDaysPattern.length];

                          const canCancel = r.status === "Aktif";
                          const isCanceled = r.status === "Dibatalkan";

                          const statusInfoRows: Array<{ k: string; v: string }> = (() => {
                            if (isAdded) {
                              const meta = r.addMetaKey ? addedMeta[r.addMetaKey] : null;
                              return [
                                { k: "Tanggal penambahan", v: meta?.addDate ?? "-" },
                                { k: "Alasan penambahan", v: meta?.reason ?? "-" },
                                { k: "Ditambahkan oleh", v: meta?.by ?? "-" },
                              ];
                            }

                            if (isCanceled) {
                              const meta = cancelMeta[r.originalIndex];
                              return [
                                {
                                  k: "Tanggal pembatalan",
                                  v: meta?.cancelDate ?? DEFAULT_CANCEL_DETAIL.cancelDate,
                                },
                                {
                                  k: "Alasan pembatalan",
                                  v: meta?.reason ?? DEFAULT_CANCEL_DETAIL.reason,
                                },
                                {
                                  k: "Dibatalkan oleh",
                                  v: meta?.by ?? DEFAULT_CANCEL_DETAIL.by,
                                },
                              ];
                            }

                            return [];
                          })();

                          return (
                            <tr
                              key={`${r.tanggalKeterlambatan}-${r.originalIndex}-${r.source}`}
                              className={cn(
                                "border-t border-slate-300/70",
                                idx % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                              )}
                            >
                              <td className="px-4 py-3 text-[14px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                                {idx + 1}
                              </td>

                              <td
                                className={cn(
                                  "px-4 py-3 text-[14px] font-normal text-slate-900",
                                  isAdded ? "whitespace-normal" : "tabular-nums whitespace-nowrap",
                                )}
                              >
                                {isAdded ? "Denda ditambahkan secara manual" : lateDays}
                              </td>

                              <td className="px-4 py-3 text-left text-[14px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                                {r.tanggalKeterlambatan}
                              </td>

                              <td className="px-4 py-3 text-right text-[14px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                                {r.nominalDenda}
                              </td>

                              <td className="px-4 py-3 text-[14px] font-normal text-slate-900">
                                <div className="flex items-center gap-2">
                                  <StatusPill status={r.status} />
                                  {statusInfoRows.length > 0 ? (
                                    <InfoIconTooltip
                                      label="Info status denda"
                                      rows={statusInfoRows}
                                    />
                                  ) : null}
                                </div>
                              </td>

                              <td className="px-3 py-3">
                                <div className="flex items-center justify-start gap-2">
                                  {isAdded ? (
                                    <>
                                      <CancelPenaltyButton
                                        disabled={!canCancel}
                                        onClick={() => {
                                          setCancelTarget({
                                            originalIndex: r.originalIndex,
                                            tanggal: r.tanggalKeterlambatan,
                                            nominal: r.nominalDenda,
                                          });
                                          setCancelDialogOpen(true);
                                        }}
                                      />
                                      <RowActionEyeButton
                                        onClick={() => {
                                          const meta = r.addMetaKey
                                            ? addedMeta[r.addMetaKey]
                                            : null;

                                          setAddDetailTarget({
                                            addDate:
                                              meta?.addDate ?? r.tanggalKeterlambatan,
                                            reason:
                                              meta?.reason ??
                                              "Denda ditambahkan (prototype) tanpa alasan tersimpan.",
                                          });
                                          setAddDetailOpen(true);
                                        }}
                                      />
                                    </>
                                  ) : isCanceled ? (
                                    <>
                                      {ActionSlotSpacer}
                                      <RowActionEyeButton
                                        onClick={() => {
                                          const meta = cancelMeta[r.originalIndex];

                                          setCancelDetailTarget({
                                            cancelDate:
                                              meta?.cancelDate ??
                                              DEFAULT_CANCEL_DETAIL.cancelDate,
                                            reason:
                                              meta?.reason ??
                                              DEFAULT_CANCEL_DETAIL.reason,
                                          });
                                          setCancelDetailOpen(true);
                                        }}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <CancelPenaltyButton
                                        disabled={!canCancel}
                                        onClick={() => {
                                          setCancelTarget({
                                            originalIndex: r.originalIndex,
                                            tanggal: r.tanggalKeterlambatan,
                                            nominal: r.nominalDenda,
                                          });
                                          setCancelDialogOpen(true);
                                        }}
                                      />
                                      {ActionSlotSpacer}
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}

                      <tr className="border-t border-slate-300 bg-white">
                        <td
                          colSpan={3}
                          className="px-4 py-3 text-[13px] font-extrabold uppercase tracking-wide text-slate-900"
                        >
                          TOTAL DENDA
                        </td>

                        <td className="px-4 py-3 text-right text-[14px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                          {totalText}
                        </td>

                        <td className="px-4 py-3" />
                        <td className="px-3 py-3" />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sr-only">{Object.keys(cancelMeta).length}</div>
            </div>

            <Separator className="bg-slate-200" />

            <div className="px-6 py-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "inline-flex h-9 items-center justify-center px-4 text-[13px] font-semibold",
                    "rounded-[5px]",
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

      <div className="sr-only">
        <button type="button" onClick={() => toast("sync")}>
          sync
        </button>
      </div>
    </>
  );
}