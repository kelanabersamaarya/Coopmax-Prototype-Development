"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { addLoanExtensionHistory } from "@/lib/loanExtensionHistoryStore";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';

type ExtensionSaveData = {
  accountNo: string;
  method: string;
  effectiveDate: string;
  previousTenor: string;
  newTenor: string;
};

function findTextAfterLabel(text: string, label: string) {
  const index = text.indexOf(label);
  if (index < 0) return "";

  const remaining = text.slice(index + label.length);
  const nextLabelIndex = remaining.search(
    /(?:Tenor Baru|Jatuh Tempo Akhir Baru|Tanggal Efektif|Alasan:|Simpan Perubahan)/,
  );

  return (nextLabelIndex >= 0 ? remaining.slice(0, nextLabelIndex) : remaining)
    .trim()
    .replace(/\s+/g, " ");
}

function getSaveData(wizard: HTMLElement): ExtensionSaveData | null {
  const text = (wizard.textContent ?? "").replace(/\s+/g, " ").trim();
  const accountNo =
    text.match(/No\.\s*Rek\.\s*Pinjaman\s+([A-Z0-9.]+)/i)?.[1] ?? "";
  const method = findTextAfterLabel(text, "Metode Perpanjangan");
  const effectiveDate = findTextAfterLabel(text, "Tanggal Efektif");
  const newTenor = findTextAfterLabel(text, "Tenor Baru");

  if (!accountNo || !method || !effectiveDate || !newTenor) return null;

  return {
    accountNo,
    method,
    effectiveDate,
    previousTenor: "12 Bulan",
    newTenor,
  };
}

function ConfirmDialog({
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
          "h-[365px] w-[calc(100vw-1.5rem)] max-w-[580px] overflow-hidden",
          "rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col items-center px-8 pb-[22px] pt-[42px] text-center">
          <div className="grid h-[102px] w-[102px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
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
              onClick={onConfirm}
              className="h-[53px] w-[114px] rounded-[5px] bg-[#3380e8] text-[16px] font-semibold text-white transition hover:bg-[#266ed0]"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={onCancel}
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
          "h-[330px] w-[calc(100vw-2rem)] max-w-[580px] overflow-hidden",
          "rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
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
            className="mt-8 h-[68px] w-[214px] rounded-[10px] bg-[#2f80ed] text-[16px] font-semibold text-white ring-2 ring-[#2f80ed]/30 transition hover:bg-[#266ed0]"
          >
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LoanExtensionStepTwoSaveGate() {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const wizardRef = React.useRef<HTMLElement | null>(null);
  const dataRef = React.useRef<ExtensionSaveData | null>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>("button");

      if (!button || button.disabled) return;

      const wizard = button.closest<HTMLElement>(WIZARD_SELECTOR);
      if (!wizard || wizard.dataset.loanExtensionStep !== "2") return;

      const label = (button.textContent ?? "").trim().toLowerCase();
      const isSaveButton =
        label.includes("lanjutkan") || label.includes("simpan perubahan");

      if (!isSaveButton) return;

      const data = getSaveData(wizard);
      if (!data) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      wizardRef.current = wizard;
      dataRef.current = data;
      setConfirmOpen(true);
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  function cancelConfirmation() {
    setConfirmOpen(false);
    wizardRef.current = null;
    dataRef.current = null;
  }

  function confirmSave() {
    const data = dataRef.current;
    if (!data) return;

    addLoanExtensionHistory(data.accountNo, {
      method: data.method,
      effectiveDate: data.effectiveDate,
      previousTenor: data.previousTenor,
      newTenor: data.newTenor,
    });

    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  function finishSave() {
    setSuccessOpen(false);

    wizardRef.current
      ?.querySelector<HTMLButtonElement>('button[aria-label="Tutup"]')
      ?.click();

    wizardRef.current = null;
    dataRef.current = null;
  }

  return (
    <>
      <ConfirmDialog
        open={confirmOpen}
        onCancel={cancelConfirmation}
        onConfirm={confirmSave}
      />
      <SuccessDialog open={successOpen} onOk={finishSave} />
    </>
  );
}