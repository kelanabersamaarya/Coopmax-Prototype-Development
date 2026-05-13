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

export default function PenaltyDetailDialog({
  open,
  onOpenChange,
  rows,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  rows: PenaltyDetailRow[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.25rem)] sm:w-[720px]",
          "max-w-[720px]",
          "max-h-[80vh] overflow-hidden",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
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

          <div className="max-h-[calc(80vh-64px-64px)] overflow-auto px-6 py-5">
            <div className="overflow-hidden rounded-[10px] border border-slate-200 bg-white">
              <table className="w-full border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-700">
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody>
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
                        className="border-b border-slate-100 text-[13px]"
                      >
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {r.tanggalKeterlambatan}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-900">
                          {r.nominalDenda}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="inline-flex h-10 items-center justify-center rounded-[10px] bg-slate-600 px-4 text-[13px] font-semibold text-white ring-1 ring-slate-600/20 transition hover:bg-slate-700"
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