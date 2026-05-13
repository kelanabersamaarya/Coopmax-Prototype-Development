"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckSquare, X } from "lucide-react";
import { toast } from "sonner";
import PenaltyCancelConfirmModal from "@/components/anggota/PenaltyCancelConfirmModal";
import PenaltyCancelSuccessModal from "@/components/anggota/PenaltyCancelSuccessModal";

const R = "rounded-[5px]";

function FieldRow({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:items-start">
      <div className="pt-2 text-[14px] font-normal text-slate-900">
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

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
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setReason("");
    setConfirmOpen(false);
    setSuccessOpen(false);
  }, [open]);

  const footerBtnBase = cn(
    "inline-flex items-center justify-center gap-2",
    "w-[90px] h-[28px] px-2",
    "rounded-[6px]",
    "text-[11px] font-bold tracking-tight text-white",
    "ring-1 transition",
    "leading-none",
  );

  function validate() {
    if (!reason.trim()) {
      toast("Alasan wajib diisi", {
        description: "Mohon isi alasan pembatalan denda sebelum menyimpan.",
      });
      return false;
    }
    return true;
  }

  return (
    <>
      <PenaltyCancelConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onYes={() => {
          const ok = validate();
          if (!ok) {
            setConfirmOpen(false);
            return;
          }

          onConfirm(reason.trim());
          setConfirmOpen(false);
          setSuccessOpen(true);
        }}
      />

      <PenaltyCancelSuccessModal
        open={successOpen}
        onOpenChange={setSuccessOpen}
        onOk={() => {
          setSuccessOpen(false);
          onOpenChange(false);
        }}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "w-[calc(100vw-1rem)] sm:w-[760px]",
            "max-w-[760px]",
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

                <div className="sr-only">
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

            <div className="px-6 py-6">
              <div className="grid gap-5">
                <FieldRow label="Alasan pembatalan" required>
                  <Textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Wajib diisi. Jelaskan alasan pembatalan denda..."
                    className={cn(
                      "min-h-[180px] w-full",
                      R,
                      "border-slate-200 bg-white text-[14px] font-normal text-slate-900",
                      "focus-visible:ring-0 focus-visible:ring-offset-0",
                    )}
                  />
                </FieldRow>

                <div className="sr-only">
                  <Input />
                </div>
              </div>
            </div>

            <Separator className="bg-slate-200" />

            <div className="px-6 py-4">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    footerBtnBase,
                    "bg-[#6B7A90] ring-1 ring-[#6B7A90]/25 hover:bg-[#5f6d82]",
                  )}
                >
                  <X className="h-4 w-4" strokeWidth={3} />
                  Batalkan
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!validate()) return;
                    setConfirmOpen(true);
                  }}
                  className={cn(
                    footerBtnBase,
                    "bg-emerald-600 ring-1 ring-emerald-600/20 hover:bg-emerald-700",
                  )}
                >
                  <CheckSquare className="h-4 w-4" strokeWidth={3} />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}