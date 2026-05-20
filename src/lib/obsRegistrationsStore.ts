export type ObsStatus = "Diajukan" | "Diproses" | "Ditolak";

type State = {
  statusById: Record<string, ObsStatus>;
};

const STORAGE_KEY = "dyad.obsRegistrations.v1";

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
  if (!parsed || typeof parsed !== "object") return { statusById: {} };
  return {
    statusById:
      parsed.statusById && typeof parsed.statusById === "object"
        ? parsed.statusById
        : {},
  };
}

function writeState(next: State) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getObsRegistrationStatus(id: string): ObsStatus | null {
  const key = (id ?? "").trim();
  if (!key) return null;
  const st = readState();
  return st.statusById[key] ?? null;
}

export function setObsRegistrationStatus(id: string, status: ObsStatus) {
  const key = (id ?? "").trim();
  if (!key) return;
  const st = readState();
  writeState({ ...st, statusById: { ...st.statusById, [key]: status } });
}