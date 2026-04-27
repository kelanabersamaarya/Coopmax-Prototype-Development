"use client";

import * as React from "react";
import BillingTableView2, {
  type BillingRow,
} from "@/components/anggota/BillingTableView2";
import { cn } from "@/lib/utils";

export default function RegulerBillTableNoBorder({
  rows,
  selected,
  setSelected,
  className,
}: {
  rows: BillingRow[];
  selected: boolean[];
  setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        // Hilangkan border yang muncul di row (ring wrapper + border table wrapper)
        "[&_.ring-1]:ring-0 [&_.ring-2]:ring-0",
        "[&_.border]:border-0 [&_.border-2]:border-0",
        // Pastikan tidak ada outline efek inset
        "[&_*]:outline-none",
      )}
    >
      <BillingTableView2
        rows={rows}
        selected={selected}
        setSelected={setSelected}
        isLocked={true}
        showNextBillInfo={true}
        showGraceInfo={true}
        highlightGraceBlock={true}
        hideSelection={false}
        showPenaltyColumn={false}
      />
    </div>
  );
}