import * as React from "react";

const STORAGE_KEY = "dyad.loanInterestRates.v1";
export const LOAN_INTEREST_CHANGED_EVENT = "dyad.loanInterestRates.changed";

type InterestRateState = Record<string, number>;

function readInterestRates(): InterestRateState {
  if (typeof window === "undefined") return {};

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = value ? (JSON.parse(value) as InterestRateState) : {};

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function getLoanInterestRate(accountNo: string, fallback: number) {
  const value = readInterestRates()[accountNo];

  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function saveLoanInterestRate(accountNo: string, rate: number) {
  if (typeof window === "undefined" || !Number.isFinite(rate)) return;

  const current = readInterestRates();

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...current,
      [accountNo]: rate,
    }),
  );

  window.dispatchEvent(new CustomEvent(LOAN_INTEREST_CHANGED_EVENT));
}

export function useLoanInterestRate(accountNo: string, fallback: number) {
  const [rate, setRate] = React.useState(() =>
    getLoanInterestRate(accountNo, fallback),
  );

  React.useEffect(() => {
    const sync = () => setRate(getLoanInterestRate(accountNo, fallback));

    sync();
    window.addEventListener(LOAN_INTEREST_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(LOAN_INTEREST_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [accountNo, fallback]);

  return rate;
}