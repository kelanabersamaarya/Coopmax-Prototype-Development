import type { AutodebetSchedule } from "@/components/savings/AutodebetScheduleDialog";

const STORAGE_KEY = "dyad.autodebet-schedules.v1";

type AutodebetSchedulesState = Record<string, AutodebetSchedule[]>;

function safeParse(value: string | null): AutodebetSchedulesState {
  if (!value) return {};

  try {
    const parsed = JSON.parse(value) as AutodebetSchedulesState;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function readState(): AutodebetSchedulesState {
  if (typeof window === "undefined") return {};
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

function writeState(state: AutodebetSchedulesState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getAutodebetSchedules(accountNo: string) {
  const key = accountNo.trim();
  if (!key) return [];

  const schedules = readState()[key];
  return Array.isArray(schedules) ? schedules : [];
}

export function saveAutodebetSchedules(
  accountNo: string,
  schedules: AutodebetSchedule[],
) {
  const key = accountNo.trim();
  if (!key || typeof window === "undefined") return;

  const state = readState();

  writeState({
    ...state,
    [key]: schedules,
  });
}