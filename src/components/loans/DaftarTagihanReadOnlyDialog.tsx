"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import BillingTableView2, {
  type BillingRow,
} from "@/components/anggota/BillingTableView2";

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
    totalBelum DIBayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  } as any,
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

const footerH = 72;

const cancelBtnStyle = cn(
  "inline-flex items-center justify-center gap-2",
  "w-[90px] h-[28px] px-2",
  "rounded-[6px]",
  "text-[11px] font-bold tracking-tight text-white",
  "bg-[#77839A] ring-1 ring-[#77839A]/25 transition hover:bg-[#6b768c]",
);

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

  // read-only (BillingTableView2 tetap butuh selected), tapi checkbox disembunyikan via hideSelection
  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rows.map(() => true),
  );

  React.useEffect(() => {
    setSelected(rows.map(() => true));
  }, [rows]);

  const showingStart = rowsAll.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rowsAll.length, page * pageSize);

  const pagerBtn = (disabled: boolean) =>
    cn(
      "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold",
      "bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm transition",
      disabled ? "opacity-60 pointer-events-none" : "hover:bg-slate-50",
    );

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
            <div
              className={cn(
                "[&_.bg-white.px-3.py-3]:!py-1.5",
                "[&_.px-4.py-4]:!py-2",
              )}
            >
              <BillingTableView2
                rows={rows}
                selected={selected}
                setSelected={setSelected}
                isLocked={true}
                showNextBillInfo={false}
                showGraceInfo={page === 1}
                highlightGraceBlock={page === 1}
                keepGraceShellWithoutInfo={false}
                hideSelection={true}
                showPenaltyColumn={true}
                disableRowRings
                disableRowActiveRing
                penaltyIndexOffset={(page - 1) * pageSize}
                className="mt-0"
              />
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
        </div>
      </DialogContent>
    </Dialog>
  );
}