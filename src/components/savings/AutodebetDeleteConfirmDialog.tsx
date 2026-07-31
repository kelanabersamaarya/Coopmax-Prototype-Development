import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function AutodebetDeleteConfirmDialog({
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
          "max-w-[528px] rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "overflow-hidden",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="px-8 pb-5 pt-10 text-center sm:px-10">
          <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <span className="text-[54px] font-light leading-none text-[#f2b98f]">
              !
            </span>
          </div>

          <h2 className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Yakin menghapus data ini ?
          </h2>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className="h-[48px] w-[144px] rounded-[5px] bg-[#e56855] text-[16px] font-semibold text-white ring-2 ring-[#2f80ed]/35 transition hover:bg-[#d95a48]"
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="h-[48px] w-[126px] rounded-[5px] bg-[#a6a6a6] text-[16px] font-semibold text-white ring-2 ring-[#a6a6a6]/25 transition hover:bg-[#969696]"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}