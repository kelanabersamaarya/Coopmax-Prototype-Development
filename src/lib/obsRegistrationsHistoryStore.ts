export type ObsStatus = "Diajukan" | "Diproses" | "Ditolak";

export type ObsStatusHistoryRow = {
  id: string;
  status: ObsStatus;
  tanggal: string; // dd-mm-yyyy
  diubahOleh: string;
  deskripsi: string;
  createdAt: string; // ISO
};

type State = {
  historyById: Record<string, ObsStatusHistoryRow[]>;
};

const STORAGE_KEY = "dyad.obsRegistrations.history.v1";

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
  if (!parsed || typeof parsed !== "object") return { historyById: {} };
  return {
    historyById:
      parsed.historyById && typeof parsed.historyById === "object"
        ? parsed.historyById
        : {},
  };
}

function writeState(next: State) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getObsRegistrationHistory(id: string): ObsStatusHistoryRow[] {
  const key = (id ?? "").trim();
  if (!key) return [];
  const st = readState();
  const rows = st.historyById[key];
  return Array.isArray(rows) ? rows : [];
}

export function appendObsRegistrationHistory(
  id: string,
  row: Omit<ObsStatusHistoryRow, "id" | "createdAt">,
) {
  const key = (id ?? "").trim();
  if (!key) return;

  const nextRow: ObsStatusHistoryRow = {
    ...row,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  const st = readState();
  const current = Array.isArray(st.historyById[key]) ? st.historyById[key] : [];

  // prepend newest
  writeState({
    ...st,
    historyById: { ...st.historyById, [key]: [nextRow, ...current] },
  });
}

export function removeObsRegistrationHistoryRow(id: string, rowId: string) {
  const key = (id ?? "").trim();
  const rid = (rowId ?? "").trim();
  if (!key || !rid) return;

  const st = readState();
  const current = Array.isArray(st.historyById[key]) ? st.historyById[key] : [];
  writeState({
    ...st,
    historyById: { ...st.historyById, [key]: current.filter((r) => r.id !== rid) },
  });
}