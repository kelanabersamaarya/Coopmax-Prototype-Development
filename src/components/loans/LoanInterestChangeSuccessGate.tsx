"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function isInterestChangeConfirmation(target: EventTarget | null) {
  const button = target instanceof Element ? target.closest("button") : null;

  if (!button || (button.textContent ?? "").trim() !== "Yes") {
    return false;
  }

  const dialog = button.closest("[data-radix-dialog-content]");

  return (
    dialog?.textContent?.includes("Yakin untuk melakukan perubahan?") ?? false
  );
}

export default function LoanInterestChangeSuccessGate() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function showSuccessAfterConfirmation(event: MouseEvent) {
      if (!isInterestChangeConfirmation(event.target)) return;

      // Biarkan tombol Yes menjalankan proses simpan asli dari wizard.
      // Popup sukses ditampilkan setelah event klik tersebut selesai diproses.
      window.setTimeout(() => setOpen(true), 0);
    }

    document.addEventListener("click", showSuccessAfterConfirmation, true);

    return () => {
      document.removeEventListener(
        "click",
        showSuccessAfterConfirmation,
        true,
      );
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] sm:w-[519px]",
          "h-[300px] max-w-[519px]",
          "overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col items-center justify-center px-6 py-8 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white ring-2 ring-[#b9dfa2]">
            <Check className="h-12 w-12 text-[#33aa00]" strokeWidth={3} />
          </div>

          <h2 className="mt-6 text-[20px] font-semibold leading-tight tracking-tight text-slate-900">
            Berhasil Melakukan Perubahan Suku Bunga
          </h2>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className={cn(
              "mt-7 h-[60px] w-[190px] rounded-[10px]",
              "bg-[#2f80ed] text-[16px] font-semibold text-white",
              "ring-2 ring-[#2f80ed]/30 transition hover:bg-[#266ed0]",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2f80ed]/25",
            )}
          >
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}