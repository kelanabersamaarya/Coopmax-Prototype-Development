export type PenaltyViewScope = "anggota-view1" | "anggota-view2" | "anggota-view3";

export function makePenaltyContextKey(nasabahId: string, scope: PenaltyViewScope) {
  const id = (nasabahId ?? "").trim() || "unknown-nasabah";
  return `${id}::${scope}`;
}