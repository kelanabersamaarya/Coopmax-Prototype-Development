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
import {
  formatIdr,
  getAdjustedInterest,
  parseIdr,
} from "@/components/loans/loan-adjustment-utils";

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


function parseSaveData(wizard: HTMLElement): PendingAdjustment | null {
  const accountNo =
    (wizard.textContent ?? "").match(
      /No\.\s*Rek\.\s*Pinjaman\s+([A-Z0-9.-]+)/i,
    )?.[1] ?? "SMG260004";

const adjustedRow = wizard.querySelector<HTMLTableRowElement>(
  'table tbody tr[data-interest-adjusted="true"]',
);

  if (!adjustedRow) {
    const draft = getLoanDebtAdjustmentDraft();
    if (!draft) return null;

    return {
      accountNo,
      installmentNo: 1,
      interestBefore: draft.previousInterest || "0,00",
      adjustmentType: draft.type,
      adjustmentAmount: draft.amount || "0,00",
      reason: draft.reason,
      interestAfter: formatIdr(
        getAdjustedInterest(draft.previousInterest || "0,00", draft.type, draft.amount),
      ),
      totalBefore: "0,00",
      totalAfter: "0,00",
    };
  }

  const cells = Array.from(
    adjustedRow.querySelectorAll<HTMLTableCellElement>("td"),
  );
  const installmentNo = Number(adjustedRow.dataset.interestInstallment ?? "1");
  const draft = getLoanDebtAdjustmentDraft();

  if (!draft) return null;

  const interestBefore =
    draft.previousInterest || cells[3]?.textContent?.trim() || "0,00";
  const interestAfter = formatIdr(
    getAdjustedInterest(interestBefore, draft.type, draft.amount),
  );
  const totalBefore = cells[1]?.textContent?.trim() ?? "0,00";
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
          "h-[338px] w-[calc(100vw-1.5rem)] max-w-[528px] overflow-hidden",
          "rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col items-center px-8 pb-[20px] pt-[41px] text-center">
          <div className="grid h-[90px] w-[90px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <span className="text-[56px] font-light leading-none text-[#f2b98f]">
              !
            </span>
          </div>

          <h2 className="mt-[32px] max-w-[460px] text-[30px] font-extrabold leading-[1.18] tracking-[-0.03em] text-[#3b4863]">
            Yakin Melakukan Penyesuaian
            <br />
            Bunga?
          </h2>

          <div className="mt-[34px] flex items-center justify-center gap-[8px]">
            <button
              type="button"
              onClick={onConfirm}
              className="h-[48px] w-[104px] rounded-[5px] border-2 border-[#9fc5e8] bg-[#338bd3] text-[16px] font-semibold text-white shadow-[0_0_0_1px_#338bd3] transition hover:bg-[#2779bd]"
            >
              Yes
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="h-[48px] w-[126px] rounded-[5px] bg-[#a6a6a6] text-[16px] font-semibold text-white transition hover:bg-[#969696]"
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
    function handleSaveRequest(event: Event) {
      const requestedWizard = (event as CustomEvent<{ wizard?: HTMLElement }>).detail?.wizard;
      const wizard =
        requestedWizard ??
        document.querySelector<HTMLElement>(
          '[data-loan-debt-wizard="true"][data-loan-debt-step="2"]',
        );
      if (!wizard || wizard.dataset.loanDebtStep !== "2") return;

      const adjustment = parseSaveData(wizard);
      if (!adjustment) return;

      event.preventDefault();
      event.stopPropagation();
      activeWizardRef.current = wizard;
      pendingAdjustmentRef.current = adjustment;
      setConfirmOpen(true);
    }

    window.addEventListener("loan-debt-save-request", handleSaveRequest, true);

    return () =>
      window.removeEventListener("loan-debt-save-request", handleSaveRequest, true);
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