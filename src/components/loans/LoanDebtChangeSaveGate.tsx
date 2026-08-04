"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  addLoanInterestAdjustmentHistory,
} from "@/lib/loanInterestAdjustmentHistoryStore";
import {
  clearLoanDebtAdjustmentDraft,
  getLoanDebtAdjustmentDraft,
} from "@/lib/loanDebtAdjustmentDraftStore";

type PendingAdjustment = {
  accountNo: string;
  installmentNo: number;
  interestBefore: string;
  adjustmentType: string;
  adjustmentAmount: string;
  reason: string;
  interestAfter: string;
  totalBefore: string;
  totalAfter: string;
};

function parseIdr(value: string) {
  const normalized = (value ?? "").trim().replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return Math.max(0, value)
    .toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/,/g, ".");
}

function getAdjustedInterest(
  previousInterest: string,
  adjustmentType: string,
  adjustmentAmount: string,
) {
  const previous = parseIdr(previousInterest);
  const adjustment = parseIdr(adjustmentAmount);

  if (adjustmentType === "Pembebasan Seluruh Bunga") return 0;
  if (adjustmentType === "Penambahan Bunga") return previous + adjustment;
  return Math.max(0, previous - adjustment);
}

function parseSaveData(wizard: HTMLElement): PendingAdjustment | null {
  const accountNo =
    (wizard.textContent ?? "").match(
      /No\.\s*Rek\.\s*Pinjaman\s+([A-Z0-9.-]+)/i,
    )?.[1] ?? "SMG260004";

  const adjustedRow = Array.from(
    wizard.querySelectorAll<HTMLTableRowElement>("table tbody tr"),
  ).find((row) =>
    row.querySelector(
      'td.text-\\[\\#2563EB\\], td[class*="text-[#2563EB]"]',
    ),
  );

  if (!adjustedRow) return null;

  const cells = Array.from(adjustedRow.querySelectorAll<HTMLTableCellElement>("td");
  const installmentNo = Number(cells[0]?.textContent?.trim() ?? "0");
  const draft = getLoanDebtAdjustmentDraft();

  if (!installmentNo || !draft) return null;

  const interestBefore = draft.previousInterest || cells[6]?.textContent?.trim() || "0,00";
  const interestAfter = formatIdr(
    getAdjustedInterest(interestBefore, draft.type, draft.amount),
  );
  const totalBefore = cells[5]?.textContent?.trim() ?? "0,00";
  const totalAfter = formatIdr(
    parseIdr(totalBefore) - parseIdr(interestBefore) + parseIdr(interestAfter),
  );

  return {
    accountNo,
    installmentNo,
    interestBefore,
    adjustmentType: draft.type,
    adjustmentAmount: draft.amount || "0,00",
    reason: draft.reason,
    interestAfter,
    totalBefore,
    totalAfter,
  };
}

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
        data-loan-debt-confirm-dialog="true"
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
            Yakin Melakukan Perubahan Nominal Bunga?
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
            Berhasil Melakukan Perubahan Nominal Bunga
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
  const pendingAdjustmentRef = React.useRef<PendingAdjustment | null>(null);

  React.useEffect(() => {
    function handleSaveClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");

      if (!button || button.disabled) return;

      const wizard = button.closest<HTMLElement>('[data-loan-debt-wizard="true"]');
      const label = (button.textContent ?? "").trim().toLowerCase();

      if (
        !wizard ||
        wizard.dataset.loanDebtStep !== "2" ||
        !label.includes("simpan perubahan")
      ) {
        return;
      }

      const adjustment = parseSaveData(wizard);
      if (!adjustment) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      activeWizardRef.current = wizard;
      pendingAdjustmentRef.current = adjustment;
      setConfirmOpen(true);
    }

    document.addEventListener("click", handleSaveClick, true);

    return () => document.removeEventListener("click", handleSaveClick, true);
  }, []);

  function cancelConfirmation() {
    setConfirmOpen(false);
    activeWizardRef.current = null;
    pendingAdjustmentRef.current = null;
  }

  function confirmSave() {
    const adjustment = pendingAdjustmentRef.current;
    if (!adjustment) return;

    addLoanInterestAdjustmentHistory(adjustment.accountNo, {
      installmentNo: adjustment.installmentNo,
      interestBefore: adjustment.interestBefore,
      adjustmentType: adjustment.adjustmentType,
      adjustmentAmount: adjustment.adjustmentAmount,
      reason: adjustment.reason,
      interestAfter: adjustment.interestAfter,
      totalBefore: adjustment.totalBefore,
      totalAfter: adjustment.totalAfter,
    });

    clearLoanDebtAdjustmentDraft();
    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  function closeWizard() {
    setSuccessOpen(false);

    activeWizardRef.current
      ?.querySelector<HTMLButtonElement>('button[aria-label="Tutup"]')
      ?.click();

    activeWizardRef.current = null;
    pendingAdjustmentRef.current = null;
  }

  return (
    <>
      <DebtChangeConfirmDialog
        open={confirmOpen}
        onCancel={cancelConfirmation}
        onConfirm={confirmSave}
      />

      <DebtChangeSuccessDialog open={successOpen} onOk={closeWizard} />
    </>
  );
}