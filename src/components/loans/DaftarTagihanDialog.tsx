"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckSquare, ChevronLeft, ChevronRight, X } from "lucide-react";
import BillingTableView2, {
  type BillingRow,
} from "@/components/anggota/BillingTableView2";
import { toast } from "sonner";

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

type PaymentMethod =
  | "Pembayaran Reguler"
  | "Pembayaran Penurunan Baki Debet"
  | "Pembayaran Khusus"
  | "Pelunasan";

export default function DaftarTagihanDialog({
  open,
  onOpenChange,
  paymentMethod = "Pembayaran Reguler",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  paymentMethod?: PaymentMethod;
}) {
  const isBakiDebet = paymentMethod === "Pembayaran Penurunan Baki Debet";

  const rowsAll = React.useMemo(() => seedRows, []);

  const [pageSize] = React.useState<number>(6);
  const [page, setPage] = React.useState(1);

  const pageCount = Math.max(1, Math.ceil(rowsAll.length / pageSize));

  const rows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rowsAll.slice(start, start + pageSize);
  }, [page, pageSize, rowsAll]);

  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rows.map(() => false),
  );

  React.useEffect(() => {
    if (!open) return;
    setPage(1);
  }, [open]);

  React.useEffect(() => {
    // Default selection:
    // - Reguler: kosong
    // - Baki Debet: locked & dianggap terpilih (tabel tanpa checkbox)
    setSelected(rows.map(() => (isBakiDebet ? true : false)));
  }, [isBakiDebet, rows]);

  const showingStart = rowsAll.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rowsAll.length, page * pageSize);

  const footerH = 78;
  const actionBtnBase = cn(
    "inline-flex items-center justify-center gap-1.5",
    "rounded-[6px] px-3",
    "text-[12px] font-bold tracking-tight text-white",
    "focus:outline-none focus-visible:ring-4",
    "w-full h-10 sm:w-[120px] sm:h-[32px]",
  );
  const iconCls = "h-4 w-4";

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
          // hide default close button
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
                // compact spacing (match reference)
                "[&_.bg-white.px-3.py-3]:!py-1.5",
                "[&_.px-4.py-4]:!py-2",
              )}
            >
              <BillingTableView2
                rows={rows}
                selected={selected}
                setSelected={setSelected}
                isLocked={isBakiDebet ? true : false}
                showNextBillInfo={false}
                showGraceInfo={page === 1}
                highlightGraceBlock={page === 1}
                keepGraceShellWithoutInfo={false}
                hideSelection={isBakiDebet ? true : false}
                showPenaltyColumn={isBakiDebet ? false : true}
                disableRowRings={isBakiDebet ? true : false}
                disableRowActiveRing={isBakiDebet ? true : false}
                penaltyIndexOffset={(page - 1) * pageSize}
                className="mt-0"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[14px] text-slate-900">
                Menampilkan {showingStart} sampai {showingEnd} dari {rowsAll.length}{" "}
                entri
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={pagerBtn(page <= 1)}
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-5 w-5 text-slate-500" />
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
                  <ChevronRight className="h-5 w-5 text-slate-500" />
                </button>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  actionBtnBase,
                  "bg-[#77839A] ring-1 ring-[#77839A]/25 transition hover:bg-[#6b768c]",
                  "focus-visible:ring-[#77839A]/25",
                )}
              >
                <X className={iconCls} strokeWidth={3} />
                Batalkan
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!isBakiDebet) {
                    const count = selected.filter(Boolean).length;
                    if (count === 0) {
                      toast("Pilih minimal 1 tagihan", {
                        description:
                          "Centang tagihan yang ingin dibayar sebelum menyimpan.",
                      });
                      return;
                    }
                    toast.success("Daftar tagihan disimpan (prototype)", {
                      description: `${count} tagihan dipilih (halaman ${page}).`,
                    });
                    onOpenChange(false);
                    return;
                  }

                  toast.success("Daftar tagihan disimpan (prototype)", {
                    description: `Mode: Penurunan Baki Debet • Halaman ${page}`,
                  });
                  onOpenChange(false);
                }}
                className={cn(
                  actionBtnBase,
                  "bg-[#2fb300] ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]",
                  "focus-visible:ring-[#2fb300]/25",
                )}
              >
                <CheckSquare className={iconCls} strokeWidth={3} />
                Simpan
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}