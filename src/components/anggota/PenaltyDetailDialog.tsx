"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export type PenaltyDetailRow = {
  tanggalKeterlambatan: string;
  nominalDenda: string;
};

function parseIdrLike(input: string) {
  const cleaned = (input ?? "").replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatIdrLike(n: number) {
  const s = Math.round(Number.isFinite(n) ? n : 0).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  const total = React.useMemo(() => {
    return rows.reduce((sum, r) => sum + parseIdrLike(r.nominalDenda), 0);
  }, [rows]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.25rem)] sm:w-[560px]",
          "max-w-[560px]",
          "max-h-[80vh]",
          "overflow-hidden",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          // hide default shadcn close button (biar hanya X custom)
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              Rincian Denda
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
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
            <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
              <div className="safe-x-scroll bg-white">
                <table className="w-full min-w-[420px] border-collapse">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
                      <th className="px-4 py-3">Tanggal Keterlambatan</th>
                      <th className="px-4 py-3 text-right">Nominal Denda</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className="px-4 py-10 text-center text-sm text-slate-600"
                        >
                          Tidak ada rincian denda.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r, idx) => (
                        <tr
                          key={`${r.tanggalKeterlambatan}-${idx}`}
                          className="border-t border-slate-100 text-sm"
                        >
                          <td className="px-4 py-3 font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                            {r.tanggalKeterlambatan}
                          </td>
                          <td className="px-4 py-3 text-right font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                            {r.nominalDenda}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <div className="inline-flex items-baseline gap-2 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                <div className="text-sm font-semibold text-slate-700">Total</div>
                <div className="text-sm font-semibold text-slate-400">:</div>
                <div className="text-lg font-extrabold text-slate-900 tabular-nums">
                  {formatIdrLike(total)}
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
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-600 px-6 text-sm font-semibold text-white ring-1 ring-slate-600/20 transition hover:bg-slate-700"
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