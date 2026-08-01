"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  ...Array.from({ length: 8 }).map((_, index) => ({
    jatuhTempo: `25-${String(3 + index).padStart(2, "0")}-2026`,
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
  const pageSize = 6;
  const [page, setPage] = React.useState(1);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  const pagedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, rows]);

  const [selected, setSelected] = React.useState<boolean[]>(() =>
    pagedRows.map(() => true),
  );

  React.useEffect(() => {
    setSelected(pagedRows.map(() => true));
  }, [pagedRows]);

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);

  const previousDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  return (
    <section
      className={cn(
        "loan-debt-billing-preview overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Informasi Tagihan dan Denda
      </div>

      <div className="p-4">
        <BillingTableView2
          rows={pagedRows}
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
          penaltyIndexOffset={(page - 1) * pageSize}
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-slate-600">
          Menampilkan {showingStart} sampai {showingEnd} dari {rows.length} entri
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={previousDisabled}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className={cn(
              "inline-flex h-9 items-center gap-1 rounded-[5px] px-3 text-[12px] font-semibold transition",
              "bg-slate-100 text-slate-600 hover:bg-slate-200",
              previousDisabled ? "cursor-not-allowed opacity-60" : "",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-[5px] bg-[#5B3DF5] px-3 text-[12px] font-extrabold text-white">
            {page}
          </span>

          <button
            type="button"
            disabled={nextDisabled}
            onClick={() =>
              setPage((current) => Math.min(pageCount, current + 1))
            }
            className={cn(
              "inline-flex h-9 items-center gap-1 rounded-[5px] px-3 text-[12px] font-semibold transition",
              "bg-slate-100 text-slate-600 hover:bg-slate-200",
              nextDisabled ? "cursor-not-allowed opacity-60" : "",
            )}
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}