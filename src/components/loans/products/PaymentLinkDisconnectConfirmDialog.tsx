"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function ActionButton({
  children,
  variant,
  onClick,
}: {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-[48px] w-[120px] rounded-[5px] text-[16px] font-semibold transition",
        variant === "primary"
          ? "bg-[#2f80ed] text-white ring-2 ring-[#2f80ed]/30 hover:bg-[#266ed0]"
          : "bg-[#a6a6a6] text-white ring-2 ring-[#a6a6a6]/25 hover:bg-[#969696]",
      )}
    >
      {children}
    </button>
  );
}

export default function PaymentLinkDisconnectConfirmDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? onCancel() : null)}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] sm:w-[528px]",
          "max-w-[528px]",
          "rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "overflow-hidden",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="px-8 pb-5 pt-10 text-center sm:px-10">
          <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6] bg-white">
            <div className="text-[54px] font-light leading-none text-[#f2b98f]">
              !
            </div>
          </div>

          <div className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Yakin memutuskan koneksi Whatsapp?
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <ActionButton variant="primary" onClick={onConfirm}>
              Yes
            </ActionButton>

            <ActionButton variant="secondary" onClick={onCancel}>
              Cancel
            </ActionButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}