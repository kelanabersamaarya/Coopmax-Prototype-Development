"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckSquare, X } from "lucide-react";
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
];

export default function DaftarTagihanDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const rows = React.useMemo(() => seedRows, []);
  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rows.map(() => false),
  );

  React.useEffect(() => {
    if (!open) return;
    // ✅ saat modal dibuka: default tidak ada yang tercentang
    setSelected(rows.map(() => false));
  }, [open, rows]);

  const footerH = 78;

  const actionBtnBase = cn(
    "inline-flex items-center justify-center gap-1.5",
    "rounded-[6px] px-3",
    "text-[12px] font-bold tracking-tight text-white",
    "focus:outline-none focus-visible:ring-4",
    "w-full h-10 sm:w-[120px] sm:h-[32px]",
  );

  const iconCls = "h-4 w-4";

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
            <div className="text-sm font-semibold text-slate-900">
              INFORMASI TAGIHAN DAN DENDA
            </div>

            <Separator className="my-3 bg-slate-200/70" />

            <div
              className={cn(
                // bikin lebih rapat seperti contoh
                "[&_.bg-white.px-3.py-3]:!py-1.5",
                "[&_.px-4.py-4]:!py-2",
              )}
            >
              <BillingTableView2
                rows={rows}
                selected={selected}
                setSelected={setSelected}
                isLocked={false}
                showNextBillInfo={false}
                showGraceInfo={true}
                highlightGraceBlock={true}
                keepGraceShellWithoutInfo={false}
                hideSelection={false}
                showPenaltyColumn={true}
                disableRowActiveRing={true}
                penaltyIndexOffset={0}
                className="mt-0"
              />
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
                  const count = selected.filter(Boolean).length;
                  if (count === 0) {
                    toast("Pilih minimal 1 tagihan", {
                      description:
                        "Centang tagihan yang ingin dibayar sebelum menyimpan.",
                    });
                    return;
                  }
                  toast.success("Daftar tagihan disimpan (prototype)", {
                    description: `${count} tagihan dipilih.`,
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