"use client";

import * as React from "react";
import type { TransactionType } from "@/components/anggota/TransactionFormCardView2";
import type { BillingRow } from "@/components/anggota/BillingTableView2";

const currentBill: BillingRow = {
  jatuhTempo: "25-01-2026",
  totalBelumDibayar: "916.667",
  tagihanPokok: "833.333",
  tagihanBunga: "83.333",
  sisaPokok: "783.333",
  sisaBunga: "26.389",
};

const pelunasanRowsLikeView1: BillingRow[] = [
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
  ...Array.from({ length: 8 }).map((_, i) => ({
    jatuhTempo: `25-0${(i % 7) + 2}-2026`,
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
  })),
];

const upcomingRows: BillingRow[] = [
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
  {
    jatuhTempo: "25-03-2026",
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "783.333",
    sisaBunga: "26.389",
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    jatuhTempo: `25-${String(4 + i).padStart(2, "0")}-2026`,
    totalBelumDibayar: "916.667",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "83.333",
  })),
];

export function useBillingRowsForMode({
  jenisTransaksi,
  pageSize = 6,
}: {
  jenisTransaksi: TransactionType;
  pageSize?: number;
}) {
  const isPelunasan = jenisTransaksi === "Pelunasan";
  const isReguler =
    jenisTransaksi === "Pembayaran Reguler" || (jenisTransaksi as any) === "Bayar Reguler";
  const isKhusus = jenisTransaksi === "Pembayaran Khusus";

  const penaltyOnlyCols = jenisTransaksi === "Pembayaran Denda";
  const feeOnlyCols = jenisTransaksi === "Pembayaran Biaya Lainnya";
  const showAllRows = penaltyOnlyCols || feeOnlyCols;

  const isPenurunanBakiDebet = jenisTransaksi === "Pembayaran Penurunan Baki Debet";

  const [page, setPage] = React.useState<number>(1);

  React.useEffect(() => {
    setPage(1);
  }, [jenisTransaksi]);

  const allRowsForMode: BillingRow[] = isReguler
    ? [currentBill]
    : isKhusus
      ? [currentBill]
      : isPelunasan
        ? pelunasanRowsLikeView1
        : showAllRows
          ? upcomingRows
          : isPenurunanBakiDebet
            ? upcomingRows
            : [currentBill];

  const usePaging = isPenurunanBakiDebet || isPelunasan;

  const pageCount = React.useMemo(() => {
    if (!usePaging) return 1;
    return Math.max(1, Math.ceil(allRowsForMode.length / pageSize));
  }, [allRowsForMode.length, pageSize, usePaging]);

  const rowsToShow: BillingRow[] = React.useMemo(() => {
    if (!usePaging) return allRowsForMode;
    const start = (page - 1) * pageSize;
    return allRowsForMode.slice(start, start + pageSize);
  }, [allRowsForMode, page, pageSize, usePaging]);

  const showingStart = usePaging
    ? allRowsForMode.length === 0
      ? 0
      : (page - 1) * pageSize + 1
    : 0;

  const showingEnd = usePaging ? Math.min(allRowsForMode.length, page * pageSize) : 0;

  return {
    isPelunasan,
    isReguler,
    isKhusus,
    penaltyOnlyCols,
    feeOnlyCols,
    showAllRows,
    isPenurunanBakiDebet,
    page,
    setPage,
    pageCount,
    pageSize,
    usePaging,
    allRowsForMode,
    rowsToShow,
    showingStart,
    showingEnd,
  };
}