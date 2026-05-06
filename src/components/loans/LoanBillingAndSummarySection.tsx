"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BillingTableView2, {
  type BillingRow,
} from "@/components/anggota/BillingTableView2";
import BillSummaryCard from "@/components/anggota/BillSummaryCard";
import { TX, type TransactionType } from "@/components/anggota/transaction-types";

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
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-03-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-04-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
  {
    jatuhTempo: "25-05-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  },
];

export default function LoanBillingAndSummarySection({
  className,
}: {
  className?: string;
}) {
  const rows = React.useMemo(() => seedRows, []);
  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rows.map(() => true),
  );

  const [jenisTransaksi, setJenisTransaksi] = React.useState<TransactionType>(
    TX.REGULER,
  );

  React.useEffect(() => {
    setSelected((prev) => rows.map((_, idx) => prev[idx] ?? true));
  }, [rows]);

  return (
    <div className={cn(className)}>
      <div className="text-center text-[14px] font-semibold tracking-tight text-slate-900">
        Tagihan dan Pembayaran Angsuran
      </div>
      <div className="mt-2 h-px w-full bg-slate-300/70" />

      {/* Samakan grid kolom dengan Transaksi Anggota:
          lg: [minmax(0,1fr)_340px] xl: [minmax(0,1fr)_320px]
      */}
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="min-w-0 rounded-[5px] border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
          <div className="text-sm font-semibold text-slate-900">
            INFORMASI TAGIHAN DAN DENDA
          </div>

          <Separator className="my-3 bg-slate-200/70" />

          <BillingTableView2
            rows={rows}
            selected={selected}
            setSelected={setSelected}
            isLocked={false}
            showNextBillInfo={false}
            showGraceInfo={true}
            highlightGraceBlock={true}
            keepGraceShellWithoutInfo={false}
            hideSelection={false}
            showPenaltyColumn={true}
            disableRowActiveRing={true}
            penaltyIndexOffset={0}
            rowDensity="default"
          />
        </Card>

        <div className="space-y-4 px-1">
          <BillSummaryCard
            mode="regular"
            totals={{ pokok: "0", bunga: "0", denda: "0", total: "0" }}
            installment={{ ke: "1", lunas: "0", seharusnya: "0" }}
            transactionType={jenisTransaksi}
            onTransactionTypeChange={(v) => setJenisTransaksi(v)}
            hasAnySelected={selected.some(Boolean)}
          />
        </div>
      </div>
    </div>
  );
}