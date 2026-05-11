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

export type PenaltyDetailRow = {
  tanggalKeterlambatan: string;
  nominalDenda: string;
};

function parseIdrLike(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;

  // Format ID umum: 25.000 atau 25.000,50
  // - hapus pemisah ribuan "."
  // - ubah desimal "," jadi "."
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

  const total = React.useMemo(() => {
    return rows.reduce((sum, r) => sum + parseIdrLike(r.nominalDenda), 0);
  }, [rows]);

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
            "w-[calc(100vw-1.25rem)] sm:w-[740px]",
            "max-w-[740px]",
            "max-h-[80vh]",
            "overflow-hidden",
            R,
            "border-slate-200 p-0 shadow-2xl",
            // hide default shadcn close button (biar hanya X custom)
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
                    className={cn("w-64 border-slate-200 p-1", "rounded-[10px]")}
                  >
                    <DropdownMenuItem
                      className="rounded-[8px]"
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
                      className="rounded-[8px]"
                      onClick={() => setAdjustOpen(true)}
                    >
                      <Pencil className="mr-2 h-4 w-4 text-slate-600" />
                      Penyesuaian Denda
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className={cn(
                        "rounded-[8px]",
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
                      "w-full min-w-[640px] table-fixed border-collapse",
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
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {rows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-5 py-10 text-center text-sm text-slate-600"
                          >
                            Tidak ada rincian denda.
                          </td>
                        </tr>
                      ) : (
                        rows.map((r, idx) => {
                          const lateDays =
                            lateDaysPattern[idx % lateDaysPattern.length];

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
                            </tr>
                          );
                        })
                      )}

                      <tr className="border-t border-slate-300 bg-white">
                        <td
                          colSpan={3}
                          className="px-5 py-4 text-[14px] font-extrabold uppercase tracking-wide text-slate-900"
                        >
                          TOTAL DENDA
                        </td>
                        <td className="px-5 py-4 text-right text-[14px] font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
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