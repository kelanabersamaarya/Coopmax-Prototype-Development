"use client";

import * as React from "react";
import {
  isKhusus,
  isPelunasan,
  isPenaltyOnly,
  isPenurunanBakiDebet,
  isReguler,
} from "@/components/anggota/transaction-types";

type BillingSelectionVariant = "view1" | "view2";

type UseAnggotaBillingSelectionConfig<Row> = {
  rows: Row[];
  jenisTransaksi: string | null | undefined;
  variant: BillingSelectionVariant;
};

export function useAnggotaBillingSelection<Row>({
  rows,
  jenisTransaksi,
  variant,
}: UseAnggotaBillingSelectionConfig<Row>) {
  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rows.map(() => false),
  );

  const rowCount = rows.length;
  const reguler = isReguler(jenisTransaksi);
  const khusus = isKhusus(jenisTransaksi);
  const pelunasan = isPelunasan(jenisTransaksi);
  const penaltyOnly = isPenaltyOnly(jenisTransaksi);
  const feeOnly = variant === "view2" && jenisTransaksi === "Pembayaran Biaya Lainnya";
  const penurunanBakiDebet = isPenurunanBakiDebet(jenisTransaksi);

  React.useEffect(() => {
    if (variant === "view1") {
      if (pelunasan) {
        setSelected(rows.map(() => true));
        return;
      }

      if (reguler) {
        setSelected((prev) => rows.map((_, i) => prev[i] ?? true));
        return;
      }

      if (khusus) {
        setSelected(rows.map(() => false));
        return;
      }

      if (penurunanBakiDebet) {
        setSelected(rows.map(() => true));
        return;
      }

      setSelected(rows.map(() => false));
      return;
    }

    if (reguler || khusus || pelunasan || penaltyOnly || feeOnly || penurunanBakiDebet) {
      setSelected(rows.map(() => true));
      return;
    }

    setSelected(rows.map(() => true));
  }, [
    feeOnly,
    khusus,
    pelunasan,
    penaltyOnly,
    penurunanBakiDebet,
    reguler,
    rowCount,
    rows,
    variant,
  ]);

  const hasAnySelected = React.useMemo(() => selected.some(Boolean), [selected]);

  return { selected, setSelected, hasAnySelected };
}
