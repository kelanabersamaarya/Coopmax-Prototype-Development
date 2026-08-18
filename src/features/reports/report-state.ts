export type ReportSortDirection = "asc" | "desc";

export type ReportSortState = {
  key: string | null;
  direction: ReportSortDirection;
};

export function toggleReportSort(state: ReportSortState, key: string): ReportSortState {
  if (state.key !== key) return { key, direction: "asc" };
  return { key, direction: state.direction === "asc" ? "desc" : "asc" };
}

export function clearReportFilters<T extends Record<string, unknown>>(filters: T, defaults: T): T {
  return { ...defaults };
}
