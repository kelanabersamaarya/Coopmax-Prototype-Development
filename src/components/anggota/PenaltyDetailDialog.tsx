"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { X, Info, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import PenaltyCancelReasonDialog from "@/components/anggota/PenaltyCancelReasonDialog";
import PenaltyCancelDetailDialog from "@/components/anggota/PenaltyCancelDetailDialog";
import PenaltyAddReasonDialog from "@/components/anggota/PenaltyAddReasonDialog";
import PenaltyAddDetailDialog from "@/components/anggota/PenaltyAddDetailDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  addPenaltyOverride,
  getPenaltyAdds,
  parseIdrLikeToNumber,
} from "@/lib/penaltyOverridesStore";

export type PenaltyDetailRow = {
  tanggalKeterlambatan: string;
  nominalDenda: string;
};

function parseIdrLike(input: string) {
  return parseIdrLikeToNumber(input);
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

type InfoRow = Array<{ k: string; v: string }>;

function InfoIconTooltip({
  label,
  rows,
}: {
  label: string;
  rows: InfoRow;
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

function CancelPenaltyButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center justify-center px-3",
        "w-[92px]",
        "rounded-[8px]",
        "bg-rose-600 text-white",
        "ring-1 ring-rose-600/20 transition hover:bg-rose-700",
        "text-[12px] font-semibold",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-600/20",
        "whitespace-nowrap",
      )}
    >
      Batalkan
    </button>
  );
}

function showGreenSuccessToast(title: string) {
  toast.custom((t) => (
    <div className="w-[min(520px,calc(100vw-1rem))]">
      <div
        className={cn(
          "rounded-[10px] bg-emerald-600 text-white shadow-xl",
          "ring-1 ring-emerald-700/40",
          "px-4 py-3",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
            <Check className="h-5 w-5 text-white" strokeWidth={3} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold leading-none">
              {title}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full",
              "bg-transparent ring-0 shadow-none",
              "text-white/90 transition hover:text-white",
              "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-4.5 w-4.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  ));
}

export default function PenaltyDetailDialog({
  open,
  onOpenChange,
  rows,
  contextKey,
  dueDateDmy,
  rowIndexGlobal,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  rows: PenaltyDetailRow[];
  /**
   * Context key = nasabahId (sesuai permintaan).
   * Jika tidak ada, dialog tetap berjalan tapi penambahan tidak dipersist.
   */
  contextKey?: string;
  /**
   * due date dari baris billing (jatuh tempo) — dipakai untuk mapping penambahan denda.
   */
  dueDateDmy?: string;
  /**
   * index global baris billing (sudah termasuk offset pagination) — dipakai untuk mapping penambahan denda.
   */
  rowIndexGlobal?: number;
}) {
  const [statusFilter, setStatusFilter] = React.useState<StatusValue>("Aktif");
  const [canceledIds, setCanceledIds] = React.useState<Set<number>>(
    () => new Set(),
  );
  const [cancelMeta, setCancelMeta] = React.useState<
    Record<number, CanceledPenaltyMeta>
  >(() => ({}));

  const [addedPenalties, setAddedPenalties] = React.useState<PenaltyDetailRow[]>(
    [],
  );
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

  const currentUserName = "Arya Dharma";

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

    // ✅ LOAD persisted "added penalties" untuk contextKey+row mapping
    if (contextKey && dueDateDmy && typeof rowIndexGlobal === "number") {
      const stored = getPenaltyAdds(contextKey).filter(
        (a) => a.dueDateDmy === dueDateDmy && a.rowIndexGlobal === rowIndexGlobal,
      );

      setAddedPenalties(
        stored.map((s) => ({
          tanggalKeterlambatan: s.addDateDmy,
          nominalDenda: s.amountIdrLike,
        })),
      );

      setAddedMeta(() => {
        const next: Record<string, AddedPenaltyMeta> = {};
        stored.forEach((s, idx) => {
          next[metaKeyForAddedRow(idx)] = {
            addDate: s.addDateDmy,
            reason: s.reason,
            by: s.by,
          };
        });
        return next;
      });
    } else {
      setAddedPenalties([]);
      setAddedMeta({});
    }

    setAddDetailOpen(false);
    setAddDetailTarget(null);
  }, [contextKey, dueDateDmy, open, rowIndexGlobal]);

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

  const totalDenda = React.useMemo(() => {
    return filteredRows.reduce((sum, r) => sum + parseIdrLike(r.nominalDenda), 0);
  }, [filteredRows]);

  const totalDendaText = React.useMemo(() => formatIdrLike(totalDenda), [totalDenda]);

  const totalSisaDenda = React.useMemo(() => {
    return filteredRows.reduce((sum, r) => {
      if (r.status !== "Aktif") return sum;
      return sum + parseIdrLike(r.nominalDenda);
    }, 0);
  }, [filteredRows]);

  const totalSisaDendaText = React.useMemo(
    () => formatIdrLike(totalSisaDenda),
    [totalSisaDenda],
  );

  const lateDaysPattern = [3, 4, 2] as const;

  const COL = {
    no: 44,
    late: 170,
    tanggal: 120,
    denda: 110,
    sisaDenda: 120,
    status: 116,
    aksi: 88,
  } as const;

  const thBase =
    "px-2 pb-2 pt-2.5 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900";
  const tdBase =
    "px-2 py-2 text-[12px] font-normal text-slate-900 tabular-nums whitespace-nowrap";

  const thNo = cn(thBase, "pl-2 pr-1 w-[44px] max-w-[44px]");
  const tdNo = cn(tdBase, "pl-2 pr-1 w-[44px] max-w-[44px]");

  const thAksi = cn(thBase, "pl-1 pr-2");
  const tdAksi = "pl-1 pr-2 py-2";

  const filterSelectCls = cn(
    "h-8 w-full rounded-[7px] border border-slate-200 bg-white px-2",
    "text-[12px] font-semibold text-slate-700 shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const statusCellPad = "px-1.5 py-2";

  const canPersistAdd =
    !!contextKey && !!dueDateDmy && typeof rowIndexGlobal === "number";

  return (
    <>
      <PenaltyAddReasonDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onConfirm={(reason, date, nominalDenda) => {
          // ✅ persist dulu (kalau punya context)
          if (canPersistAdd) {
            addPenaltyOverride(contextKey!, {
              dueDateDmy: dueDateDmy!,
              rowIndexGlobal: rowIndexGlobal!,
              amountIdrLike: nominalDenda,
              reason,
              addDateDmy: date,
              by: currentUserName,
            });
          }

          // ✅ update UI langsung
          setAddedPenalties((prev) => [
            ...prev,
            { tanggalKeterlambatan: date, nominalDenda },
          ]);

          const key = metaKeyForAddedRow(addedPenalties.length);
          setAddedMeta((prev) => ({
            ...prev,
            [key]: { addDate: date, reason, by: currentUserName },
          }));

          showGreenSuccessToast("Berhasil Menambahkan Denda");
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
        onConfirm={(reason) => {
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
              cancelDate: DEFAULT_CANCEL_DETAIL.cancelDate,
              by: currentUserName,
            },
          }));

          showGreenSuccessToast("Berhasil Membatalkan Denda");
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
            "w-[calc(100vw-1.25rem)] sm:w-[980px]",
            "max-w-[980px]",
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
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!canPersistAdd) {
                      toast("Data nasabah belum tersedia", {
                        description:
                          "Tidak bisa menyimpan denda karena contextKey (ID nasabah) belum terpasang.",
                      });
                      return;
                    }
                    setAddOpen(true);
                  }}
                  className={cn(
                    "inline-flex h-9 items-center justify-center gap-2 px-3.5",
                    "rounded-[5px] bg-[#2563eb] text-white",
                    "ring-1 ring-[#2563eb]/20 transition hover:bg-[#1d4ed8)]",
                    "text-[13px] font-semibold",
                  )}
                >
                  <Plus className="h-4.5 w-4.5" />
                  Tambah Denda
                </button>
              </div>

              <div
                className={cn(
                  "overflow-hidden",
                  R,
                  "bg-white ring-1 ring-slate-300",
                )}
              >
                <table className="w-full table-fixed border-collapse border-l border-slate-300">
                  <colgroup>
                    <col style={{ width: COL.no }} />
                    <col style={{ width: COL.late }} />
                    <col style={{ width: COL.tanggal }} />
                    <col style={{ width: COL.denda }} />
                    <col style={{ width: COL.sisaDenda }} />
                    <col style={{ width: COL.status }} />
                    <col style={{ width: COL.aksi }} />
                  </colgroup>

                  <thead className="bg-white">
                    <tr className="text-left">
                      <th className={thNo}>NO.</th>
                      <th className={cn(thBase)}>KETERLAMBATAN (HARI)</th>
                      <th className={cn(thBase)}>TANGGAL</th>
                      <th className={cn(thBase)}>DENDA</th>
                      <th className={cn(thBase)}>SISA DENDA</th>
                      <th className={cn(thBase, "px-1.5")}>STATUS</th>
                      <th className={thAksi}>AKSI</th>
                    </tr>

                    <tr className="border-b border-slate-300 bg-white">
                      <th className="pl-2 pr-1 py-1.5" />
                      <th className="px-2 py-1.5" />
                      <th className="px-2 py-1.5" />
                      <th className="px-2 py-1.5" />
                      <th className="px-2 py-1.5" />
                      <th className="px-1.5 pt-1 pb-2">
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
                      <th className="pl-1 pr-2 py-1.5" />
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-10 text-center text-[12px] text-slate-600"
                        >
                          Tidak ada rincian denda.
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((r, idx) => {
                        const isAdded = r.source === "added";
                        const lateDays =
                          lateDaysPattern[idx % lateDaysPattern.length];
                        const isCanceled = r.status === "Dibatalkan";

                        const statusInfoRows: InfoRow = (() => {
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

                        const cancelDate =
                          cancelMeta[r.originalIndex]?.cancelDate ??
                          DEFAULT_CANCEL_DETAIL.cancelDate;

                        const keterlambatanText = isAdded
                          ? "Denda Ditambahkan Manual"
                          : isCanceled
                            ? cancelDate
                            : String(lateDays);

                        const dendaValue = r.nominalDenda;
                        const sisaDendaValue = r.status === "Aktif" ? r.nominalDenda : "0";

                        return (
                          <tr
                            key={`${r.tanggalKeterlambatan}-${r.originalIndex}-${r.source}`}
                            className={cn(
                              "border-t border-slate-300/70",
                              idx % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                            )}
                          >
                            <td className={tdNo}>{idx + 1}</td>

                            <td className={cn("px-2 py-2 text-[12px] text-slate-900")}>
                              <div className="truncate" title={keterlambatanText}>
                                {keterlambatanText}
                              </div>
                            </td>

                            <td className={cn(tdBase)}>{r.tanggalKeterlambatan}</td>

                            <td className="px-2 py-2 text-right text-[12px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                              {dendaValue}
                            </td>

                            <td className="px-2 py-2 text-right text-[12px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                              {sisaDendaValue}
                            </td>

                            <td className={cn(statusCellPad, "text-[12px] text-slate-900")}>
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

                            <td className={tdAksi}>
                              <div className="flex justify-start">
                                {r.status === "Aktif" ? (
                                  <CancelPenaltyButton
                                    onClick={() => {
                                      setCancelTarget({
                                        originalIndex: r.originalIndex,
                                        tanggal: r.tanggalKeterlambatan,
                                        nominal: r.nominalDenda,
                                      });
                                      setCancelDialogOpen(true);
                                    }}
                                  />
                                ) : null}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}

                    <tr className="border-t border-slate-300 bg-white">
                      <td
                        colSpan={3}
                        className="px-2 py-2 text-[12px] font-extrabold uppercase tracking-wide text-slate-900"
                      >
                        TOTAL DENDA
                      </td>

                      <td className="px-2 py-2 text-right text-[12px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                        {totalDendaText}
                      </td>

                      <td className="px-2 py-2 text-right text-[12px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                        {totalSisaDendaText}
                      </td>

                      <td className={cn(statusCellPad, "py-2")} />

                      <td className="pl-1 pr-2 py-2" />
                    </tr>
                  </tbody>
                </table>
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
    </>
  );
}