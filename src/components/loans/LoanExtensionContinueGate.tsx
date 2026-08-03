"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const SAVE_ATTRIBUTE = "data-extension-simulation-save";

function isFormComplete(wizard: HTMLElement) {
  const methodTrigger = wizard.querySelector<HTMLElement>(
    'button[role="combobox"]',
  );
  const methodValue = methodTrigger?.textContent?.trim() ?? "";

  if (!methodValue || methodValue.includes("Pilih Metode")) {
    return false;
  }

  const inputs = Array.from(wizard.querySelectorAll<HTMLInputElement>("input"));
  const reason = wizard.querySelector<HTMLTextAreaElement>("textarea");

  return (
    inputs.length > 0 &&
    inputs.every((input) => input.value.trim().length > 0) &&
    Boolean(reason?.value.trim())
  );
}

function syncWizardButton() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard) return;

  const footer = wizard.querySelector<HTMLElement>("footer");
  if (!footer) return;

  const primaryButton = Array.from(footer.querySelectorAll("button")).find(
    (button) => {
      const label = button.textContent?.trim().toLowerCase() ?? "";

      return (
        label === "lanjutkan" ||
        label === "simpan perubahan" ||
        label === "simpan perpanjangan"
      );
    },
  );

  if (!primaryButton) return;

  const isSimulationStep = wizard.dataset.loanExtensionStep === "2";

  if (isSimulationStep) {
    primaryButton.disabled = false;
    primaryButton.setAttribute(SAVE_ATTRIBUTE, "true");

    if (primaryButton.textContent?.trim() !== "Simpan Perubahan") {
      primaryButton.textContent = "Simpan Perubahan";
    }

    return;
  }

  primaryButton.removeAttribute(SAVE_ATTRIBUTE);

  if (primaryButton.textContent?.trim() === "Lanjutkan") {
    primaryButton.disabled = !isFormComplete(wizard);
  }
}

function ConfirmationDialog({
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
          "max-w-[528px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="px-8 pb-5 pt-10 text-center sm:px-10">
          <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <span className="text-[54px] font-light leading-none text-[#f2b98f]">
              !
            </span>
          </div>

          <h2 className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Yakin untuk menyimpan perubahan?
          </h2>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className="h-[48px] w-[104px] rounded-[5px] bg-[#2f80ed] text-[16px] font-semibold text-white ring-2 ring-[#2f80ed]/35 transition hover:bg-[#266ed0]"
            >
              Yes
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

function SuccessDialog({
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
            Berhasil Melakukan Perpanjangan Pinjaman
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

export default function LoanExtensionContinueGate() {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const activeWizardRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const syncAfterRender = () => {
      window.setTimeout(syncWizardButton, 0);
    };

    const observer = new MutationObserver(syncAfterRender);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    document.addEventListener("input", syncAfterRender, true);
    document.addEventListener("change", syncAfterRender, true);

    const handleSaveClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>("button");
      const wizard = button?.closest<HTMLElement>(WIZARD_SELECTOR);

      if (
        !button ||
        button.disabled ||
        !wizard ||
        wizard.dataset.loanExtensionStep !== "2" ||
        button.getAttribute(SAVE_ATTRIBUTE) !== "true"
      ) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      activeWizardRef.current = wizard;
      setConfirmOpen(true);
    };

    document.addEventListener("click", handleSaveClick, true);
    syncAfterRender();

    return () => {
      observer.disconnect();
      document.removeEventListener("input", syncAfterRender, true);
      document.removeEventListener("change", syncAfterRender, true);
      document.removeEventListener("click", handleSaveClick, true);
    };
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
      <ConfirmationDialog
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

      <SuccessDialog open={successOpen} onOk={closeWizard} />

      <style>
        {`
          [data-loan-extension-wizard="true"] footer {
            justify-content: flex-start !important;
            gap: 10px !important;
          }

          [data-loan-extension-wizard="true"] footer > button.bg-\\[\\#77839A\\] {
            order: 0 !important;
          }

          [data-loan-extension-wizard="true"]
            footer
            > button[data-extension-simulation-save="true"] {
            order: 2 !important;
            display: inline-flex !important;
            min-width: 172px !important;
            height: 40px !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 10px !important;
            margin-left: auto !important;
            border: 0 !important;
            border-radius: 5px !important;
            background-color: #2fb300 !important;
            color: #ffffff !important;
            font-size: 12px !important;
            font-weight: 700 !important;
            box-shadow: none !important;
          }

          [data-loan-extension-wizard="true"]
            footer
            > button[data-extension-simulation-save="true"]:hover {
            background-color: #279800 !important;
          }

          [data-loan-extension-wizard="true"]
            footer
            > button[data-extension-simulation-save="true"]
            svg {
            display: none !important;
          }

          [data-loan-extension-wizard="true"]
            footer
            > button[data-extension-simulation-save="true"]::before {
            content: "";
            display: inline-block;
            width: 20px;
            height: 20px;
            flex: 0 0 auto;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='3' y='3' width='26' height='26' rx='3.5' stroke='white' stroke-width='4'/%3E%3Cpath d='M8.5 15.5L14 21L25 9' stroke='white' stroke-width='4.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }
        `}
      </style>
    </>
  );
}