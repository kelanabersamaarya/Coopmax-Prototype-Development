"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CheckSquare, X } from "lucide-react";
import { toast } from "sonner";

const R = "rounded-[5px]";

export default function PenaltyCancelReasonDialog({
  open,
  onOpenChange,
  tanggal,
  nominal,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tanggal: string;
  nominal: string;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    setReason("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[560px]",
          "max-w-[560px]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="min-w-0">
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                Pembatalan Denda
              </div>
              <div className="mt-1 text-[13px] font-medium text-slate-600">
                {tanggal} • {nominal}
              </div>
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

          <div className="px-6 py-5">
            <div className="text-[14px] font-normal text-slate-900">
              Alasan pembatalan<span className="text-rose-600"> *</span>
            </div>

            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Wajib diisi. Jelaskan alasan pembatalan denda…"
              className={cn(
                "mt-3 min-h-[140px]",
                R,
                "border-slate-200 bg-white text-[14px] font-normal text-slate-900",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
              )}
            />
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex h-9 items-center justify-center px-4 text-[13px] font-semibold",
                  R,
                  "bg-slate-600 text-white ring-1 ring-slate-600/20 transition hover:bg-slate-700",
                )}
              >
                <X className="mr-2 h-4 w-4" strokeWidth={3} />
                Batalkan
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!reason.trim()) {
                    toast("Alasan wajib diisi", {
                      description:
                        "Mohon isi alasan pembatalan denda sebelum menyimpan.",
                    });
                    return;
                  }
                  onConfirm(reason.trim());
                  onOpenChange(false);
                  toast.success("Denda dibatalkan (prototype)", {
                    description: `${tanggal} • ${nominal}`,
                  });
                }}
                className={cn(
                  "inline-flex h-9 items-center justify-center px-4 text-[13px] font-semibold",
                  R,
                  "bg-emerald-600 text-white ring-1 ring-emerald-600/20 transition hover:bg-emerald-700",
                )}
              >
                <CheckSquare className="mr-2 h-4 w-4" strokeWidth={3} />
                Simpan
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}