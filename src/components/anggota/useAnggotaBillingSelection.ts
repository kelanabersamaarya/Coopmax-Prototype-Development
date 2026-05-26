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

function makeSelection(length: number, value: boolean) {
  return Array.from({ length }, () => value);
}

export function useAnggotaBillingSelection<Row>({
  rows,
  jenisTransaksi,
  variant,
}: UseAnggotaBillingSelectionConfig<Row>) {
  const rowCount = rows.length;

  const [selected, setSelected] = React.useState<boolean[]>(() =>
    makeSelection(rowCount, false),
  );

  const reguler = isReguler(jenisTransaksi);
  const khusus = isKhusus(jenisTransaksi);
  const pelunasan = isPelunasan(jenisTransaksi);
  const penaltyOnly = isPenaltyOnly(jenisTransaksi);
  const feeOnly = variant === "view2" && jenisTransaksi === "Pembayaran Biaya Lainnya";
  const penurunanBakiDebet = isPenurunanBakiDebet(jenisTransaksi);

  React.useEffect(() => {
    if (variant === "view1") {
      if (pelunasan) {
        setSelected(makeSelection(rowCount, true));
        return;
      }

      if (reguler) {
        setSelected((prev) =>
          Array.from({ length: rowCount }, (_, i) => prev[i] ?? true),
        );
        return;
      }

      if (khusus) {
        setSelected(makeSelection(rowCount, false));
        return;
      }

      if (penurunanBakiDebet) {
        setSelected(makeSelection(rowCount, true));
        return;
      }

      setSelected(makeSelection(rowCount, false));
      return;
    }

    if (reguler || khusus || pelunasan || penaltyOnly || feeOnly || penurunanBakiDebet) {
      setSelected(makeSelection(rowCount, true));
      return;
    }

    setSelected(makeSelection(rowCount, true));
  }, [
    feeOnly,
    khusus,
    pelunasan,
    penaltyOnly,
    penurunanBakiDebet,
    reguler,
    rowCount,
    variant,
  ]);

  const hasAnySelected = React.useMemo(() => selected.some(Boolean), [selected]);

  return { selected, setSelected, hasAnySelected };
}