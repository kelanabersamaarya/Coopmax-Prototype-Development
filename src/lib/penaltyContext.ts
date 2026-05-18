export type PenaltyViewScope =
  | "anggota-view1"
  | "anggota-view2"
  | "anggota-view3"
  | "installment-payment-v2";

export function makePenaltyContextKey(nasabahId: string, scope: PenaltyViewScope) {
  const id = (nasabahId ?? "").trim() || "unknown-nasabah";
  return `${id}::${scope}`;
}

export function makePenaltyContextKeyForInstallmentV2(accountNo: string) {
  const id = (accountNo ?? "").trim() || "unknown-account";
  return makePenaltyContextKey(id, "installment-payment-v2");
}