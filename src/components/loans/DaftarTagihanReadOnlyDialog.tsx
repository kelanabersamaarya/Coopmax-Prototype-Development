"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type BillingRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

const seedRows: BillingRow[] = [
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-02-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-03-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-04-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-05-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-06-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-07-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-08-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-09-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
];

type TagihanStatus = "Belum Dibayar" | "Dibayar Sebagian" | "Lunas";

function statusForIndex(i: number): TagihanStatus {
  // Prototype mapping biar bervariasi
  const mod = i % 6;
  if (mod === 0 || mod === 1) return "Belum Dibayar";
  if (mod === 2 || mod === 3) return "Dibayar Sebagian";
  return "Lunas";
}

function StatusPill({ status }: { status: TagihanStatus }) {
  const cls =
    status === "Lunas"
      ? "bg-emerald-600 text-white ring-1 ring-emerald-600/20"
      : status === "Dibayar Sebagian"
        ? "bg-amber-500 text-white ring-1 ring-amber-500/20"
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

const footerH = 72;

const cancelBtnStyle = cn(
  "inline-flex items-center justify-center gap-2",
  "w-[90px] h-[28px] px-2",
  "rounded-[6px]",
  "text-[11px] font-bold tracking-tight text-white",
  "bg-[#77839A] ring-1 ring-[#77839A]/25 transition hover:bg-[#6b768c]",
);

const R = "rounded-[5px]";

export default function DaftarTagihanReadOnlyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const rowsAll = React.useMemo(() => seedRows, []);

  const [pageSize] = React.useState<number>(6);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    if (!open) return;
    setPage(1);
  }, [open]);

  const pageCount = Math.max(1, Math.ceil(rowsAll.length / pageSize));

  const rows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rowsAll.slice(start, start + pageSize);
  }, [page, pageSize, rowsAll]);

  const showingStart = rowsAll.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rowsAll.length, page * pageSize);

  const pagerBtn = (disabled: boolean) =>
    cn(
      "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold",
      "bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm transition",
      disabled ? "opacity-60 pointer-events-none" : "hover:bg-slate-50",
    );

  const thBase =
    "px-4 py-3 text-left text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700";
  const thRight =
    "px-4 py-3 text-right text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700";
  const tdBase = "px-4 py-3 text-[13px] font-medium text-slate-900";
  const tdNum = cn(tdBase, "text-right tabular-nums whitespace-nowrap");
  const tdDate = cn(tdBase, "font-semibold tabular-nums whitespace-nowrap");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[1100px]",
          "max-w-[1100px]",
          "max-h-[85vh]",
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
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              Daftar Tagihan
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
            className="overflow-auto px-5 py-5 sm:px-6"
            style={{ maxHeight: `calc(85vh - 64px - 1px - ${footerH}px)` }}
          >
            <div className={cn("overflow-hidden ring-1 ring-slate-200", R)}>
              <div className="safe-x-scroll bg-white">
                <table className="w-full min-w-[1060px] border-collapse bg-white">
                  <thead className="bg-white">
                    <tr className="border-b border-slate-200">
                      <th className={cn(thBase, "w-[120px]")}>
                        Jatuh
                        <br />
                        Tempo
                      </th>

                      <th className={cn(thRight, "w-[150px]")}>
                        Total Tagihan
                        <br />
                        Belum Dibayar
                      </th>

                      <th className={cn(thRight, "w-[140px]")}>
                        Tagihan
                        <br />
                        Pokok
                      </th>

                      <th className={cn(thRight, "w-[130px]")}>
                        Tagihan
                        <br />
                        Bunga
                      </th>

                      <th className={cn(thRight, "w-[150px]")}>
                        Sisa Tagihan
                        <br />
                        Pokok
                      </th>

                      <th className={cn(thRight, "w-[150px]")}>
                        Sisa Tagihan
                        <br />
                        Bunga
                      </th>

                      <th className={cn(thBase, "w-[190px]")}>
                        Status
                        <br />
                        Tagihan
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-10 text-center text-sm text-slate-600"
                        >
                          Tidak ada data.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r, idx) => {
                        const globalIdx = (page - 1) * pageSize + idx;
                        const status = statusForIndex(globalIdx);

                        return (
                          <tr
                            key={`${r.jatuhTempo}-${globalIdx}`}
                            className={cn(
                              "border-t border-slate-200",
                              idx % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                            )}
                          >
                            <td className={tdDate}>{r.jatuhTempo}</td>
                            <td className={tdNum}>{r.totalBelumDibayar}</td>
                            <td className={tdNum}>{r.tagihanPokok}</td>
                            <td className={tdNum}>{r.tagihanBunga}</td>
                            <td className={cn(tdNum, "pr-6")}>{r.sisaPokok}</td>
                            <td className={cn(tdNum, "pr-6")}>{r.sisaBunga}</td>
                            <td className={cn(tdBase, "whitespace-nowrap")}>
                              <StatusPill status={status} />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[14px] text-slate-900">
                Menampilkan {showingStart} sampai {showingEnd} dari {rowsAll.length} entri
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={pagerBtn(page <= 1)}
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Sebelumnya
                </button>

                <div className="inline-flex h-11 min-w-11 items-center justify-center rounded-2xl bg-violet-600 px-5 text-[14px] font-extrabold text-white">
                  {page}
                </div>

                <button
                  type="button"
                  className={pagerBtn(page >= pageCount)}
                  disabled={page >= pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cancelBtnStyle}
              >
                <X className="h-4 w-4" strokeWidth={3} />
                Tutup
              </button>
            </div>
          </div>

          <div className="sr-only">{R}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}