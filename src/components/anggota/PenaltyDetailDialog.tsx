"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

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

export default function PenaltyDetailDialog({
  open,
  onOpenChange,
  rows,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  rows: PenaltyDetailRow[];
}) {
  const total = React.useMemo(() => {
    return rows.reduce((sum, r) => sum + parseIdrLike(r.nominalDenda), 0);
  }, [rows]);

  const totalText = React.useMemo(() => formatIdrLike(total), [total]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="penalty-detail-desc"
        className={cn(
          "w-[calc(100vw-1.25rem)] sm:w-[640px]",
          "max-w-[640px]",
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
        <VisuallyHidden>
          <DialogTitle>Rincian Denda</DialogTitle>
          <DialogDescription id="penalty-detail-desc">
            Rincian per hari keterlambatan dan total nominal denda.
          </DialogDescription>
        </VisuallyHidden>

        <div className={cn("bg-white", R)}>
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              Rincian Denda
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
                    "w-full min-w-[520px] table-fixed border-collapse",
                    "border-l border-slate-300",
                  )}
                >
                  <thead className="bg-white">
                    <tr className="border-b border-slate-300 text-left">
                      <th className="w-[140px] px-5 py-4 text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
                        HARI
                      </th>
                      <th className="px-5 py-4 text-center text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
                        TANGGAL
                      </th>
                      <th className="w-[180px] px-5 py-4 text-right text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
                        DENDA HARIAN
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-5 py-10 text-center text-sm text-slate-600"
                        >
                          Tidak ada rincian denda.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r, idx) => (
                        <tr
                          key={`${r.tanggalKeterlambatan}-${idx}`}
                          className={cn(
                            "border-t border-slate-300/70",
                            idx % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                          )}
                        >
                          <td className="px-5 py-4 text-[14px] font-normal text-slate-900 whitespace-nowrap">
                            Hari ke-{idx + 1}
                          </td>
                          <td className="px-5 py-4 text-center text-[14px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                            {r.tanggalKeterlambatan}
                          </td>
                          <td className="px-5 py-4 text-right text-[14px] font-normal text-slate-900 tabular-nums whitespace-nowrap">
                            {r.nominalDenda}
                          </td>
                        </tr>
                      ))
                    )}

                    <tr className="border-t border-slate-300 bg-white">
                      <td
                        colSpan={2}
                        className="px-5 py-4 text-[14px] font-extrabold uppercase tracking-wide text-slate-900"
                      >
                        TOTAL NOMINAL DENDA
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
  );
}