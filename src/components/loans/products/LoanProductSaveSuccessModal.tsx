"use client";

import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function LoanProductSaveSuccessModal({
  open,
  onOk,
  onOpenChange,
  message = "Berhasil menyimpan data",
}: {
  open: boolean;
  onOk: () => void;
  onOpenChange?: (open: boolean) => void;
  message?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] sm:w-[519px]",
          "max-w-[519px]",
          "h-[340px]",
          "rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "overflow-hidden",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col items-center justify-center px-6 py-8 text-center">
          <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-white ring-4 ring-[#dff2d5]">
            <Check className="h-[58px] w-[58px] text-[#9bd77e]" strokeWidth={2.5} />
          </div>

          <div className="mt-7 text-[30px] font-semibold leading-tight tracking-tight text-[#595959]">
            {message}
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={onOk}
              className={cn(
                "h-[48px] w-[104px] rounded-[5px] text-[16px] font-semibold transition",
                "bg-[#2f80ed] text-white ring-2 ring-[#2f80ed]/30 hover:bg-[#266ed0]",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2f80ed]/25",
              )}
            >
              OK
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}