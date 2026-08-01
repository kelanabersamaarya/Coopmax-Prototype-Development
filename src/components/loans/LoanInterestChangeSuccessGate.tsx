"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function isInterestChangeConfirmButton(target: EventTarget | null) {
  const button = target instanceof Element ? target.closest("button") : null;

  if (!button || (button.textContent ?? "").trim() !== "Yes") return false;

  const dialog = button.closest("[data-radix-dialog-content]");
  return dialog?.textContent?.includes("Yakin untuk melakukan perubahan?") ?? false;
}

export default function LoanInterestChangeSuccessGate() {
  const [open, setOpen] = React.useState(false);
  const confirmButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const bypassRef = React.useRef(false);

  React.useEffect(() => {
    function interceptConfirmation(event: MouseEvent) {
      if (bypassRef.current || !isInterestChangeConfirmButton(event.target)) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      confirmButtonRef.current = (event.target as Element).closest(
        "button",
      ) as HTMLButtonElement;
      setOpen(true);
    }

    document.addEventListener("click", interceptConfirmation, true);

    return () => {
      document.removeEventListener("click", interceptConfirmation, true);
    };
  }, []);

  function finishChange() {
    setOpen(false);
    bypassRef.current = true;

    window.requestAnimationFrame(() => {
      confirmButtonRef.current?.click();

      window.setTimeout(() => {
        bypassRef.current = false;
        confirmButtonRef.current = null;
      }, 0);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] sm:w-[519px]",
          "max-w-[519px] h-[300px]",
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
            onClick={finishChange}
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