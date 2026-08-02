"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function DebtChangeConfirmDialog({
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
          "w-[calc(100vw-2rem)] max-w-[580px] overflow-hidden rounded-[5px]",
          "border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="px-8 pb-6 pt-11 text-center sm:px-10">
          <div className="mx-auto grid h-[102px] w-[102px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <span className="text-[58px] font-light leading-none text-[#f2b98f]">
              !
            </span>
          </div>

          <h2 className="mt-8 text-[29px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Yakin untuk melakukan perubahan?
          </h2>

          <div className="mt-9 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className={cn(
                "h-[52px] w-[112px] rounded-[5px] bg-[#2f80ed]",
                "text-[16px] font-semibold text-white",
                "ring-2 ring-[#2f80ed]/35 transition hover:bg-[#266ed0]",
              )}
            >
              Yes
            </button>

            <button
              type="button"
              onClick={onCancel}
              className={cn(
                "h-[52px] w-[138px] rounded-[5px] bg-[#a6a6a6]",
                "text-[16px] font-semibold text-white",
                "ring-2 ring-[#a6a6a6]/25 transition hover:bg-[#969696]",
              )}
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DebtChangeSuccessDialog({
  open,
  onOk,
}: {
  open: boolean;
  onOk: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? onOk() : null)}>
      <DialogContent
        className={cn(
          "h-[330px] w-[calc(100vw-2rem)] max-w-[580px] overflow-hidden rounded-[5px]",
          "border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col items-center justify-center px-6 py-8 text-center">
          <div className="flex h-[102px] w-[102px] items-center justify-center rounded-full bg-white ring-2 ring-[#b9dfa2]">
            <Check className="h-[58px] w-[58px] text-[#33aa00]" strokeWidth={3} />
          </div>

          <h2 className="mt-7 text-[21px] font-semibold leading-tight tracking-tight text-slate-900">
            Berhasil Melakukan Perubahan Bunga
          </h2>

          <button
            type="button"
            onClick={onOk}
            className={cn(
              "mt-8 h-[68px] w-[214px] rounded-[10px] bg-[#2f80ed]",
              "text-[16px] font-semibold text-white",
              "ring-2 ring-[#2f80ed]/30 transition hover:bg-[#266ed0]",
            )}
          >
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LoanDebtChangeSaveGate() {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const activeWizardRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    function handleSaveClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");

      if (!button || button.disabled) return;

      const wizard = button.closest<HTMLElement>('[data-loan-debt-wizard="true"]');
      const buttonLabel = (button.textContent ?? "").trim().toLowerCase();

      const isSecondStepSaveButton =
        wizard?.dataset.loanDebtStep === "2" &&
        buttonLabel.includes("lanjutkan");

      if (!wizard || !isSecondStepSaveButton) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      activeWizardRef.current = wizard;
      setConfirmOpen(true);
    }

    document.addEventListener("click", handleSaveClick, true);

    return () => document.removeEventListener("click", handleSaveClick, true);
  }, []);

  function closeWizard() {
    setSuccessOpen(false);

    activeWizardRef.current
      ?.querySelector<HTMLButtonElement>('button[aria-label="Tutup"]')
      ?.click();

    activeWizardRef.current = null;
  }

  return (
    <>
      <DebtChangeConfirmDialog
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false);
          activeWizardRef.current = null;
        }}
        onConfirm={() => {
          setConfirmOpen(false);
          setSuccessOpen(true);
        }}
      />

      <DebtChangeSuccessDialog open={successOpen} onOk={closeWizard} />
    </>
  );
}