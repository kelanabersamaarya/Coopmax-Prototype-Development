import { nanoid } from "nanoid";

export type PenaltyAddOverride = {
  id: string;
  dueDateDmy: string;
  rowIndexGlobal: number;
  amountIdrLike: string; // contoh: "25.000" atau "50.000"
  reason: string;
  addDateDmy: string;
  by: string;
  createdAt: string;
};

type State = Record<string, PenaltyAddOverride[]>;

const STORAGE_KEY = "dyad.penaltyOverrides.v1";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readState(): State {
  const parsed = safeParse<State>(localStorage.getItem(STORAGE_KEY));
  if (!parsed || typeof parsed !== "object") return {};
  return parsed;
}

function writeState(next: State) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function normalizeIdrLike(input: string) {
  const s = (input ?? "").trim();
  if (!s) return "0";
  // keep only digits and dot/comma separators; normalize to dot thousands (best effort)
  const digitsOnly = s.replace(/[^\d]/g, "");
  if (!digitsOnly) return "0";
  // we store as thousands-separated dot for display consistency
  return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function parseIdrLikeToNumber(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;
  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function getPenaltyAdds(contextKey: string): PenaltyAddOverride[] {
  const key = (contextKey ?? "").trim();
  if (!key) return [];
  const st = readState();
  const arr = st[key];
  return Array.isArray(arr) ? arr : [];
}

export function addPenaltyOverride(
  contextKey: string,
  input: Omit<PenaltyAddOverride, "id" | "createdAt" | "amountIdrLike"> & {
    amountIdrLike: string;
  },
) {
  const key = (contextKey ?? "").trim();
  if (!key) return null;

  const next: PenaltyAddOverride = {
    ...input,
    id: nanoid(),
    amountIdrLike: normalizeIdrLike(input.amountIdrLike),
    createdAt: new Date().toISOString(),
  };

  const st = readState();
  const current = Array.isArray(st[key]) ? st[key] : [];
  writeState({ ...st, [key]: [next, ...current] });

  return next;
}

export function getPenaltyAddedSumForRow({
  contextKey,
  dueDateDmy,
  rowIndexGlobal,
}: {
  contextKey: string;
  dueDateDmy: string;
  rowIndexGlobal: number;
}) {
  const adds = getPenaltyAdds(contextKey);

  return adds.reduce((sum, a) => {
    if (a.dueDateDmy !== dueDateDmy) return sum;
    if (a.rowIndexGlobal !== rowIndexGlobal) return sum;
    return sum + parseIdrLikeToNumber(a.amountIdrLike);
  }, 0);
}