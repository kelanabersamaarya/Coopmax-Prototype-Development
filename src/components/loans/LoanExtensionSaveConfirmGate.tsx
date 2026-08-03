"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const SAVE_BUTTON_SELECTOR = 'button[data-extension-simulation-save="true"]';

export default function LoanExtensionSaveConfirmGate() {
  const [open, setOpen] = React.useState(false);
  const saveButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const bypassRef = React.useRef(false);

  React.useEffect(() => {
    function handleSaveClick(event: MouseEvent) {
      if (bypassRef.current) return;

      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>(SAVE_BUTTON_SELECTOR);
      const wizard = button?.closest<HTMLElement>(WIZARD_SELECTOR);

      if (!button || !wizard || wizard.dataset.loanExtensionStep !== "2") {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      saveButtonRef.current = button;
      setOpen(true);
    }

    document.addEventListener("click", handleSaveClick, true);

    return () => {
      document.removeEventListener("click", handleSaveClick, true);
    };
  }, []);

  function continueSave() {
    setOpen(false);
    bypassRef.current = true;

    window.requestAnimationFrame(() => {
      saveButtonRef.current?.click();

      window.setTimeout(() => {
        bypassRef.current = false;
        saveButtonRef.current = null;
      }, 0);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setOpen(false);
          saveButtonRef.current = null;
        }
      }}
    >
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.5rem)] sm:w-[580px]",
          "max-w-[580px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="px-8 pb-[22px] pt-[42px] text-center sm:px-10">
          <div className="mx-auto grid h-[102px] w-[102px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <span className="text-[58px] font-light leading-none text-[#f2b98f]">
              !
            </span>
          </div>

          <h2 className="mt-[32px] text-[30px] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#3b4863]">
            Yakin untuk melakukan perubahan?
          </h2>

          <div className="mt-[34px] flex items-center justify-center gap-[9px]">
            <button
              type="button"
              onClick={continueSave}
              className="h-[53px] w-[114px] rounded-[5px] bg-[#3380e8] text-[16px] font-semibold text-white transition hover:bg-[#266ed0]"
            >
              Yes
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                saveButtonRef.current = null;
              }}
              className="h-[53px] w-[138px] rounded-[5px] bg-[#a6a6a6] text-[16px] font-semibold text-white transition hover:bg-[#969696]"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}