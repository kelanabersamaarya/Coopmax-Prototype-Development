"use client";

import * as React from "react";
import type { BillingRow } from "@/components/anggota/BillingTableView2";

export function useBillSelection({
  rowsToShow,
  isReguler,
  isKhusus,
  isPelunasan,
  showAllRows,
  isPenurunanBakiDebet,
}: {
  rowsToShow: BillingRow[];
  isReguler: boolean;
  isKhusus: boolean;
  isPelunasan: boolean;
  showAllRows: boolean;
  isPenurunanBakiDebet: boolean;
}) {
  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rowsToShow.map(() => false),
  );

  React.useEffect(() => {
    if (isReguler || isKhusus) {
      setSelected(rowsToShow.map(() => true));
      return;
    }

    if (isPelunasan) {
      setSelected(rowsToShow.map(() => true));
      return;
    }

    if (showAllRows) {
      setSelected(rowsToShow.map(() => true));
      return;
    }

    if (isPenurunanBakiDebet) {
      setSelected((prev) => rowsToShow.map((_, i) => prev[i] ?? false));
      return;
    }

    setSelected(rowsToShow.map(() => true));
  }, [
    isKhusus,
    isPelunasan,
    isPenurunanBakiDebet,
    isReguler,
    rowsToShow,
    showAllRows,
  ]);

  return { selected, setSelected };
}