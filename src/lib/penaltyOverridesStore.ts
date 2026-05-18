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

export type PenaltyCancelOverride = {
  id: string;
  dueDateDmy: string;
  rowIndexGlobal: number;
  cancelDateDmy: string;
  reason: string;
  by: string;
  createdAt: string;
};

type State = {
  adds: Record<string, PenaltyAddOverride[]>;
  cancels: Record<string, PenaltyCancelOverride[]>;
};

const STORAGE_KEY = "dyad.penaltyOverrides.v2";

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
  if (!parsed || typeof parsed !== "object") return { adds: {}, cancels: {} };
  return {
    adds: parsed.adds && typeof parsed.adds === "object" ? parsed.adds : {},
    cancels:
      parsed.cancels && typeof parsed.cancels === "object" ? parsed.cancels : {},
  };
}

function writeState(next: State) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function normalizeIdrLike(input: string) {
  const s = (input ?? "").trim();
  if (!s) return "0";
  const digitsOnly = s.replace(/[^\d]/g, "");
  if (!digitsOnly) return "0";
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

// ===== Adds =====
export function getPenaltyAdds(contextKey: string): PenaltyAddOverride[] {
  const key = (contextKey ?? "").trim();
  if (!key) return [];
  const st = readState();
  const arr = st.adds[key];
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
  const current = Array.isArray(st.adds[key]) ? st.adds[key] : [];
  writeState({ ...st, adds: { ...st.adds, [key]: [next, ...current] } });

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

// ===== Cancels =====
export function getPenaltyCancels(contextKey: string): PenaltyCancelOverride[] {
  const key = (contextKey ?? "").trim();
  if (!key) return [];
  const st = readState();
  const arr = st.cancels[key];
  return Array.isArray(arr) ? arr : [];
}

export function cancelPenaltyOverride(
  contextKey: string,
  input: Omit<PenaltyCancelOverride, "id" | "createdAt">,
) {
  const key = (contextKey ?? "").trim();
  if (!key) return null;

  const next: PenaltyCancelOverride = {
    ...input,
    id: nanoid(),
    createdAt: new Date().toISOString(),
  };

  const st = readState();
  const current = Array.isArray(st.cancels[key]) ? st.cancels[key] : [];

  // satu baris cukup punya satu cancel record terbaru (replace)
  const filtered = current.filter(
    (c) =>
      !(
        c.dueDateDmy === next.dueDateDmy &&
        c.rowIndexGlobal === next.rowIndexGlobal
      ),
  );

  writeState({
    ...st,
    cancels: { ...st.cancels, [key]: [next, ...filtered] },
  });

  return next;
}

export function isPenaltyCanceledForRow({
  contextKey,
  dueDateDmy,
  rowIndexGlobal,
}: {
  contextKey: string;
  dueDateDmy: string;
  rowIndexGlobal: number;
}) {
  const cancels = getPenaltyCancels(contextKey);
  return cancels.some(
    (c) => c.dueDateDmy === dueDateDmy && c.rowIndexGlobal === rowIndexGlobal,
  );
}

export function getPenaltyCancelMetaForRow({
  contextKey,
  dueDateDmy,
  rowIndexGlobal,
}: {
  contextKey: string;
  dueDateDmy: string;
  rowIndexGlobal: number;
}) {
  const cancels = getPenaltyCancels(contextKey);
  const found = cancels.find(
    (c) => c.dueDateDmy === dueDateDmy && c.rowIndexGlobal === rowIndexGlobal,
  );
  if (!found) return null;
  return { cancelDateDmy: found.cancelDateDmy, reason: found.reason, by: found.by };
}