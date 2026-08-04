import type { InterestAdjustment } from "@/components/loans/LoanInterestAdjustmentDialog";

const STORAGE_KEY = "dyad.loanDebtAdjustmentDraft.v1";

export type LoanDebtAdjustmentDraft = InterestAdjustment & {
  savedAt: string;
};

export function saveLoanDebtAdjustmentDraft(adjustment: InterestAdjustment) {
  if (typeof window === "undefined") return;

  const draft: LoanDebtAdjustmentDraft = {
    ...adjustment,
    savedAt: new Date().toISOString(),
  };

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function getLoanDebtAdjustmentDraft(): LoanDebtAdjustmentDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as LoanDebtAdjustmentDraft;

    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function clearLoanDebtAdjustmentDraft() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}