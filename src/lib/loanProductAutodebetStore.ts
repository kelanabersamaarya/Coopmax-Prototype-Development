const STORAGE_KEY = "dyad.loanProductAutodebetSettings.v1";
export const LOAN_PRODUCT_AUTODEBET_CHANGED_EVENT =
  "dyad.loanProductAutodebetSettings.changed";

type AutodebetSettings = Record<string, boolean>;

function normalizeProductName(productName: string) {
  return productName.trim().toLowerCase();
}

function readSettings(): AutodebetSettings {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as AutodebetSettings) : {};

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function isLoanProductAutodebetEnabled(
  productName: string,
  defaultValue = true,
) {
  const key = normalizeProductName(productName);
  if (!key) return defaultValue;

  const settings = readSettings();
  return settings[key] ?? defaultValue;
}

export function setLoanProductAutodebetEnabled(
  productName: string,
  enabled: boolean,
) {
  if (typeof window === "undefined") return;

  const key = normalizeProductName(productName);
  if (!key) return;

  const settings = readSettings();

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...settings,
      [key]: enabled,
    }),
  );

  window.dispatchEvent(
    new CustomEvent(LOAN_PRODUCT_AUTODEBET_CHANGED_EVENT),
  );
}