export type NewMBankingTransferRecipientKind = "internal" | "interbank";

export type NewMBankingTransferRecipient = {
  id: string;
  kind: NewMBankingTransferRecipientKind;
  name: string;
  bank?: string;
  accountNo: string;
  createdAt: string;
};

const STORAGE_KEY = "dyad.new-mbanking.transfer-recipients.v1";
const CHANGE_EVENT = "dyad.new-mbanking.transfer-recipients.changed";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readRecipients(): NewMBankingTransferRecipient[] {
  if (typeof window === "undefined") return [];

  const parsed = safeParse<NewMBankingTransferRecipient[]>(
    window.localStorage.getItem(STORAGE_KEY),
  );

  return Array.isArray(parsed) ? parsed : [];
}

function writeRecipients(recipients: NewMBankingTransferRecipient[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipients));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

function normalizeKey(value: string) {
  return (value ?? "").trim().toLowerCase().replace(/\s+/g, "-");
}

function buildRecipientId({
  kind,
  bank,
  accountNo,
}: {
  kind: NewMBankingTransferRecipientKind;
  bank?: string;
  accountNo: string;
}) {
  return [kind, normalizeKey(bank ?? "koperasi"), normalizeKey(accountNo)].join(
    "::",
  );
}

export function getNewMBankingTransferRecipients(
  kind: NewMBankingTransferRecipientKind,
) {
  return readRecipients().filter((recipient) => recipient.kind === kind);
}

export function saveNewMBankingTransferRecipient(input: {
  kind: NewMBankingTransferRecipientKind;
  name: string;
  bank?: string;
  accountNo: string;
}) {
  const id = buildRecipientId({
    kind: input.kind,
    bank: input.bank,
    accountNo: input.accountNo,
  });

  const next: NewMBankingTransferRecipient = {
    id,
    kind: input.kind,
    name: input.name.trim() || "Penerima",
    bank: input.bank?.trim() || undefined,
    accountNo: input.accountNo.trim(),
    createdAt: new Date().toISOString(),
  };

  const current = readRecipients();
  const withoutDuplicate = current.filter((recipient) => recipient.id !== id);
  writeRecipients([next, ...withoutDuplicate]);

  return next;
}

export function isNewMBankingTransferRecipientSaved(input: {
  kind: NewMBankingTransferRecipientKind;
  bank?: string;
  accountNo: string;
}) {
  const id = buildRecipientId(input);
  return readRecipients().some((recipient) => recipient.id === id);
}

export function subscribeNewMBankingTransferRecipients(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}