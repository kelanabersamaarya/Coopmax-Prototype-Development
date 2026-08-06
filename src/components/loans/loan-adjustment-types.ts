export type InterestAdjustmentType =
  | "Pengurangan Bunga"
  | "Pembebasan Seluruh Bunga"
  | "Penambahan Bunga";

export type InterestAdjustment = {
  type: InterestAdjustmentType;
  amount: string;
  effectiveDate: string;
  interestPeriod: string;
  reason: string;
  previousInterest?: string;
};

export type InterestAdjustmentBillingRow = {
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
  tagihanDenda: string;
};
