export type BillingRow = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

export type BillingCalculationRow = Partial<BillingRow>;

export type NumericTotals = {
  pokok: number;
  bunga: number;
  denda: number;
  total: number;
};

export type BillSummaryTotals = {
  pokok: string;
  bunga: string;
  denda: string;
  total: string;
};

export type LoanPaymentMethod = "Tunai" | "Transfer" | "Autodebet" | (string & {});

export type BillingRowState = {
  selected: boolean;
  locked: boolean;
  penalty: number;
};

export type LoanInfo = {
  accountNo: string;
  nasabah: string;
};
