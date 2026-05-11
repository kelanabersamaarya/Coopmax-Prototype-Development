"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronDown, X, Clock, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PenaltyAdjustDialog from "@/components/anggota/PenaltyAdjustDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

function deriveStatusForRow(idx: number): Exclude<StatusValue, "Semua"> {
  // ✅ Default: semua Aktif (sesuai request)
  // Tetap sisakan beberapa "Dibatalkan" agar filter bisa didemokan saat dipilih.
  return idx % 7 === 0 ? "Dibatalkan" : "Aktif";
}

function StatusPill({ status }: { status: Exclude<StatusValue, "Semua"> }) {
  const cls =
    status === "Aktif"
      ? "bg-emerald-600 text-white ring-1 ring-emerald-600/20"
      : "bg-rose-600 text-white ring-1 ring-rose-600/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px] px-2.5 py-1 text-[12px] font-semibold leading-none",
        cls,
      )}
    >
      {status}
    </span>
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
  const [adjustOpen, setAdjustOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState<StatusValue>("Semua");

  React.useEffect(() => {
    if (!open) return;
    setStatusFilter("Semua");
  }, [open]);

  const filteredRows = React.useMemo(() => {
    if (statusFilter === "Semua") return rows;
    return rows.filter((_r, idx) => deriveStatusForRow(idx) === statusFilter);
  }, [rows, statusFilter]);

  const total = React.useMemo(() => {
    return filteredRows.reduce((sum, r) => sum + parseIdrLike(r.nominalDenda), 0);
  }, [filteredRows]);

  const totalText = React.useMemo(() => formatIdrLike(total), [total]);

  const lateDaysPattern = [3, 4, 2] as const;

  return (
    <>
      <PenaltyAdjustDialog
        open={adjustOpen}
        onOpenChange={setAdjustOpen}
        basePenalty={total}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "w-[calc(100vw-1.25rem)] sm:w-[820px]",
            "max-w-[820px]",
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
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                Rincian Denda
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "inline-flex h-[30px] items-center gap-2 px-4",
                        "rounded-[5px]",
                        "bg-violet-600 text-white",
                        "ring-1 ring-violet-600/25 shadow-sm transition hover:bg-violet-700",
                        "text-[13px] font-semibold",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600/25",
                      )}
                      aria-label="Aksi denda"
                    >
                      Aksi
                      <ChevronDown className="h-4 w-4 text-white/90" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className={cn("w-64 border-slate-200 p-1", "rounded-[5px]")}
                  >
                    <DropdownMenuItem
                      className="rounded-[5px]"
                      onClick={() =>
                        toast("Riwayat Perubahan (prototype)", {
                          description:
                            "Fitur riwayat perubahan denda belum dihubungkan.",
                        })
                      }
                    >
                      <Clock className="mr-2 h-4 w-4 text-slate-600" />
                      Riwayat Perubahan
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-[5px]"
                      onClick={() => setAdjustOpen(true)}
                    >
                      <Pencil className="mr-2 h-4 w-4 text-slate-600" />
                      Penyesuaian Denda
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className={cn(
                        "rounded-[5px]",
                        "text-rose-700 focus:text-rose-700",
                        "focus:bg-rose-50",
                      )}
                      onClick={() =>
                        toast("Hapus Denda (prototype)", {
                          description: "Fitur hapus denda belum dihubungkan.",
                        })
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4 text-rose-700" />
                      Hapus Denda
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

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
              style={{ maxHeight: "calc(80vh - 64px - 84px)" }}
            >
              <div
                className={cn(
                  "overflow-hidden",
                  R,
                  "bg-white",
                  "ring-1 ring-slate-300",
                )}
              >
                <div className="safe-x-scroll bg-white">
                  <table
                    className={cn(
                      "w-full min-w-[760px] table-fixed border-collapse",
                      "border-l border-slate-300",
                    )}
                  >
                    <thead className="bg-white">
                      <tr className="border-b border-slate-300 text-left">
                        <th className="w-[70px] px-5 py-4 text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                          NO.
                        </th>
                        <th className="w-[200px] px-5 py-4 text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                          KETERLAMBATAN (HARI)
                        </th>
                        <th className="px-5 py-4 text-center text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                          TANGGAL
                        </th>
                        <th className="w-[170px] px-5 py-4 text-right text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                          DENDA
                        </th>

                        <th className="w-[140px] px-4 py-4 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-900">
                          STATUS
                        </th>
                      </tr>

                      <tr className="bg-white">
                        <th className="px-5 py-2" />
                        <th className="px-5 py-2" />
                        <th className="px-5 py-2" />
                        <th className="px-5 py-2" />
                        <th className="px-4 py-2">
                          <Select
                            value={statusFilter}
                            onValueChange={(v) => setStatusFilter(v as StatusValue)}
                          >
                            <SelectTrigger
                              className={cn(
                                "h-9 w-full rounded-[5px] border-slate-200 bg-white",
                                "text-[13px] font-semibold text-slate-700",
                                "shadow-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                              )}
                            >
                              <SelectValue placeholder="-- Semua --" />
                            </SelectTrigger>
                            <SelectContent className="rounded-[5px] border-slate-200">
                              <SelectItem value="Semua">-- Semua --</SelectItem>
                              <SelectItem value="Aktif">Aktif</SelectItem>
                              <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                            </SelectContent>
                          </Select>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {filteredRows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-5 py-10 text-center text-sm text-slate-600"
                          >
                            Tidak ada rincian denda.
                          </td>
                        </tr>
                      ) : (
                        filteredRows.map((r, idx) => {
                          const lateDays =
                            lateDaysPattern[idx % lateDaysPattern.length];

                          const derivedStatus = deriveStatusForRow(idx);

                          return (
                            <tr
                              key={`${r.tanggalKeterlambatan}-${idx}`}
                              className={cn(
                                "border-t border-slate-300/70",
                                idx % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                              )}
                            >
                              <td className="px-5 py-4 text-[14px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                                {idx + 1}
                              </td>
                              <td className="px-5 py-4 text-[14px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                                {lateDays}
                              </td>
                              <td className="px-5 py-4 text-center text-[14px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                                {r.tanggalKeterlambatan}
                              </td>
                              <td className="px-5 py-4 text-right text-[14px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                                {r.nominalDenda}
                              </td>

                              <td className="px-4 py-4 text-[14px] font-normal text-slate-900">
                                <StatusPill status={derivedStatus} />
                              </td>
                            </tr>
                          );
                        })
                      )}

                      <tr className="border-t border-slate-300 bg-white">
                        <td
                          colSpan={4}
                          className="px-5 py-4 text-[14px] font-extrabold uppercase tracking-wide text-slate-900"
                        >
                          TOTAL DENDA
                        </td>
                        <td className="px-4 py-4 text-right text-[14px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                          {totalText}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                    "inline-flex h-11 items-center justify-center px-6 text-sm font-semibold",
                    R,
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