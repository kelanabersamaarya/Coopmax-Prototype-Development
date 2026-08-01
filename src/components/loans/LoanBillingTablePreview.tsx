"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import BillingTableView2, {
  type BillingRow,
} from "@/components/anggota/BillingTableView2";

const seedRows: BillingRow[] = [
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  {
    jatuhTempo: "25-02-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    jatuhTempo: `25-${String(3 + i).padStart(2, "0")}-2026`,
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  })),
];

export default function LoanBillingTablePreview({
  className,
}: {
  className?: string;
}) {
  const rows = React.useMemo(() => seedRows, []);
  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rows.map(() => true),
  );

  React.useEffect(() => {
    setSelected((prev) => rows.map((_, idx) => prev[idx] ?? true));
  }, [rows]);

  return (
    <div className={cn("loan-debt-billing-preview", className)}>
      <BillingTableView2
        rows={rows}
        selected={selected}
        setSelected={setSelected}
        isLocked
        showNextBillInfo={false}
        showGraceInfo={false}
        highlightGraceBlock={false}
        keepGraceShellWithoutInfo={false}
        hideSelection
        showPenaltyColumn
        disableRowActiveRing
        disableRowRings
        rowDensity="default"
        penaltyIndexOffset={0}
      />
    </div>
  );
}