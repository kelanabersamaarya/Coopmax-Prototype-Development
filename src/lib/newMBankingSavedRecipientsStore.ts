export type NewMBankingSavedRecipientKind = "payment" | "purchase";

export type NewMBankingSavedRecipient = {
  id: string;
  kind: NewMBankingSavedRecipientKind;
  name: string;
  providerName: string;
  customerNo: string;
  numberLabel: string;
  serviceVariant: string;
  createdAt: string;
};

const STORAGE_KEY = "dyad.new-mbanking.saved-recipients.v1";
const CHANGE_EVENT = "dyad.new-mbanking.saved-recipients.changed";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readRecipients(): NewMBankingSavedRecipient[] {
  if (typeof window === "undefined") return [];

  const parsed = safeParse<NewMBankingSavedRecipient[]>(
    window.localStorage.getItem(STORAGE_KEY),
  );

  return Array.isArray(parsed) ? parsed : [];
}

function writeRecipients(recipients: NewMBankingSavedRecipient[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipients));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

function normalizeKey(value: string) {
  return (value ?? "").trim().toLowerCase();
}

function buildRecipientId({
  kind,
  providerName,
  customerNo,
  serviceVariant,
}: {
  kind: NewMBankingSavedRecipientKind;
  providerName: string;
  customerNo: string;
  serviceVariant: string;
}) {
  return [
    kind,
    normalizeKey(serviceVariant),
    normalizeKey(providerName),
    normalizeKey(customerNo),
  ]
    .join("::")
    .replace(/\s+/g, "-");
}

export function inferSavedRecipientKind({
  providerName,
  serviceVariant,
}: {
  providerName: string;
  serviceVariant: string;
}): NewMBankingSavedRecipientKind {
  if (
    serviceVariant === "data-package" ||
    serviceVariant === "token-pln" ||
    serviceVariant === "e-wallet"
  ) {
    return "purchase";
  }

  if (serviceVariant === "postpaid-phone") {
    return providerName.toLowerCase().includes("pascabayar")
      ? "payment"
      : "purchase";
  }

  return "payment";
}

export function getSavedRecipientCategoryLabel({
  providerName,
  serviceVariant,
}: {
  providerName: string;
  serviceVariant: string;
}) {
  if (serviceVariant === "water") return "Air";
  if (serviceVariant === "pbb") return "PBB";
  if (serviceVariant === "internet") return "Internet";
  if (serviceVariant === "finance") return "Finance";
  if (serviceVariant === "tv") return "TV";
  if (serviceVariant === "bpjs") return "BPJS Kesehatan";
  if (serviceVariant === "data-package") return "Paket Data";
  if (serviceVariant === "token-pln") return "Token PLN";
  if (serviceVariant === "e-wallet") return "E-Wallet";
  if (serviceVariant === "postpaid-phone") {
    return providerName.toLowerCase().includes("pascabayar")
      ? "Pulsa Pascabayar"
      : "Pulsa";
  }

  return "Listrik";
}

export function getNewMBankingSavedRecipients(
  kind: NewMBankingSavedRecipientKind,
) {
  return readRecipients().filter((recipient) => recipient.kind === kind);
}

export function isNewMBankingRecipientSaved({
  kind,
  providerName,
  customerNo,
  serviceVariant,
}: {
  kind: NewMBankingSavedRecipientKind;
  providerName: string;
  customerNo: string;
  serviceVariant: string;
}) {
  const id = buildRecipientId({
    kind,
    providerName,
    customerNo,
    serviceVariant,
  });

  return readRecipients().some((recipient) => recipient.id === id);
}

export function saveNewMBankingRecipient(input: {
  kind?: NewMBankingSavedRecipientKind;
  name: string;
  providerName: string;
  customerNo: string;
  numberLabel: string;
  serviceVariant: string;
}) {
  const kind =
    input.kind ??
    inferSavedRecipientKind({
      providerName: input.providerName,
      serviceVariant: input.serviceVariant,
    });

  const id = buildRecipientId({
    kind,
    providerName: input.providerName,
    customerNo: input.customerNo,
    serviceVariant: input.serviceVariant,
  });

  const next: NewMBankingSavedRecipient = {
    id,
    kind,
    name: input.name.trim(),
    providerName: input.providerName.trim(),
    customerNo: input.customerNo.trim(),
    numberLabel: input.numberLabel.trim(),
    serviceVariant: input.serviceVariant.trim(),
    createdAt: new Date().toISOString(),
  };

  const current = readRecipients();
  const withoutDuplicate = current.filter((recipient) => recipient.id !== id);
  writeRecipients([next, ...withoutDuplicate]);

  return next;
}

export function removeNewMBankingSavedRecipient(id: string) {
  const key = (id ?? "").trim();
  if (!key) return;

  writeRecipients(readRecipients().filter((recipient) => recipient.id !== key));
}

export function subscribeNewMBankingSavedRecipients(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function savedRecipientToPaymentItem(recipient: NewMBankingSavedRecipient) {
  const categoryLabel = getSavedRecipientCategoryLabel({
    providerName: recipient.providerName,
    serviceVariant: recipient.serviceVariant,
  });

  return {
    id: recipient.id,
    name: recipient.name || recipient.providerName,
    info: `${categoryLabel} - ${recipient.customerNo}`,
    providerName: recipient.providerName,
    customerNo: recipient.customerNo,
    serviceVariant: recipient.serviceVariant,
    savedKind: recipient.kind,
  };
}