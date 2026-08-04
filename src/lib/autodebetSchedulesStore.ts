import type { AutodebetSchedule } from "@/components/savings/AutodebetScheduleDialog";

const STORAGE_KEY = "dyad.autodebet-schedules.v1";
export const AUTODEBET_SCHEDULES_CHANGED_EVENT =
  "dyad.autodebet-schedules.changed";

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
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent(AUTODEBET_SCHEDULES_CHANGED_EVENT));
}

function scheduleUsesLoanProduct(
  schedule: AutodebetSchedule,
  productName: string,
) {
  return (
    schedule.product === "Produk Pinjaman" &&
    schedule.accountNo.toLowerCase().includes(productName.toLowerCase())
  );
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

export function syncLoanProductAutodebetSchedules(
  productName: string,
  enabled: boolean,
) {
  if (typeof window === "undefined" || !productName.trim()) return;

  const state = readState();
  let changed = false;

  const nextState = Object.fromEntries(
    Object.entries(state).map(([accountNo, schedules]) => {
      const nextSchedules = schedules.map((schedule) => {
        if (!scheduleUsesLoanProduct(schedule, productName)) {
          return schedule;
        }

        if (schedule.status === enabled) return schedule;

        changed = true;
        return {
          ...schedule,
          status: enabled,
        };
      });

      return [accountNo, nextSchedules];
    }),
  );

  if (changed) {
    writeState(nextState);
  }
}