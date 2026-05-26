"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Info,
  History,
  Calculator,
  BookOpenText,
  Printer,
  ReceiptText,
  ScrollText,
  ChevronDown,
} from "lucide-react";
import AnggotaAccountTabs from "@/components/anggota/AnggotaAccountTabs";
import SectionHighlight from "@/components/anggota/SectionHighlight";
import SectionHighlightWide from "@/components/anggota/SectionHighlightWide";
import InformasiRekeningHeader from "@/components/anggota/InformasiRekeningHeader";
import AnggotaTransactionPagination from "@/components/anggota/AnggotaTransactionPagination";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TransactionFormCardView2 from "@/components/anggota/TransactionFormCardView2";
import BillSummaryCard from "@/components/anggota/BillSummaryCard";
import BillingTableView2, {
  type BillingRow,
} from "@/components/anggota/BillingTableView2";
import { calcPenaltyTotal } from "@/components/anggota/calc-penalties";
import { calcSelectedPenaltyTotal } from "@/components/anggota/penalty-utils";
import { calcKhususTotalsFromRows } from "@/components/anggota/khsus-summary";
import { formatIdrLike } from "@/components/anggota/anggota-money";
import {
  calcKhususSummary,
  calcPelunasanSummary,
  calcPelunasanTotals,
  calcRegulerSummary,
  calcRowsFieldTotal,
  calcSelectedBaseTotals,
} from "@/components/anggota/anggota-transaction-calculations";
import { useAnggotaTransactionFormState } from "@/components/anggota/useAnggotaTransactionFormState";
import { useAnggotaBillingSelection } from "@/components/anggota/useAnggotaBillingSelection";
import {
  isKhusus,
  isPelunasan,
  isPenaltyOnly,
  isPenurunanBakiDebet,
  isReguler,
  TX,
} from "@/components/anggota/transaction-types";
import { makePenaltyContextKey, type PenaltyViewScope } from "@/lib/penaltyContext";

type Props = {
  nasabah: {
    id: string;
    nama: string;
    noIdentitas: string;
    alamat: string;
  };
  skemaTagihanLabel?: string;
  hideNextBillInfo?: boolean;
  penaltyScope?: PenaltyViewScope;
};

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

const PELUNASAN_DENDA_FLAT = 215000;

export default function TransaksiAnggotaView2({
  nasabah,
  skemaTagihanLabel,
  hideNextBillInfo = false,
  penaltyScope = "anggota-view2",
}: Props) {
  const penaltyContextKey = React.useMemo(
    () => makePenaltyContextKey(nasabah.id, penaltyScope),
    [nasabah.id, penaltyScope],
  );

  const {
    tanggalEfektif,
    setTanggalEfektif,
    jenisTransaksi,
    setJenisTransaksi,
    kolektor,
    setKolektor,
    nominal,
    setNominal,
    nominalPokok,
    setNominalPokok,
    nominalBunga,
    setNominalBunga,
    nominalDenda,
    setNominalDenda,
    tabungan,
    setTabungan,
    keterangan,
    setKeterangan,
  } = useAnggotaTransactionFormState({
    defaultTanggalEfektif: "25-03-2026",
    defaultJenisTransaksi: TX.REGULER,
  });

  const previousTransactionTypeRef = React.useRef(jenisTransaksi);

  const isPelunasanMode = isPelunasan(jenisTransaksi);
  const isRegulerMode = isReguler(jenisTransaksi);
  const isKhususMode = isKhusus(jenisTransaksi);

  const penaltyOnlyCols = isPenaltyOnly(jenisTransaksi);
  const feeOnlyCols = jenisTransaksi === TX.BIAYA_LAINNYA;
  const showAllRows = penaltyOnlyCols || feeOnlyCols;

  const isPenurunanPlafon = (jenisTransaksi as any) === "Pembayaran Penurunan Plafon";
  const isPenurunanBakiDebetMode = isPenurunanBakiDebet(jenisTransaksi);

  const pageSize = 6;
  const [page, setPage] = React.useState<number>(1);

  React.useEffect(() => {
    setPage(1);
  }, [jenisTransaksi]);

  React.useEffect(() => {
    const previous = previousTransactionTypeRef.current;
    previousTransactionTypeRef.current = jenisTransaksi;

    if (!isKhususMode || previous === jenisTransaksi) return;

    setNominalPokok("");
    setNominalBunga("");
    setNominalDenda("");
  }, [
    isKhususMode,
    jenisTransaksi,
    setNominalBunga,
    setNominalDenda,
    setNominalPokok,
  ]);

  const allRowsForMode: BillingRow[] = isRegulerMode
    ? [currentBill]
    : isKhususMode
      ? [currentBill]
      : isPelunasanMode
        ? pelunasanRowsLikeView1
        : showAllRows
          ? upcomingRows
          : isPenurunanBakiDebetMode
            ? upcomingRows
            : [currentBill];

  const usePaging = isPenurunanBakiDebetMode || isPelunasanMode;

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
  const showingEnd = usePaging
    ? Math.min(allRowsForMode.length, page * pageSize)
    : 0;

  const penaltyIndexOffset = usePaging ? (page - 1) * pageSize : 0;

  const { selected, setSelected } = useAnggotaBillingSelection({
    rows: rowsToShow,
    jenisTransaksi,
    variant: "view2",
  });

  const penaltyTotalExplicit = React.useMemo(() => {
    if (!penaltyOnlyCols) return null;
    return calcPenaltyTotal(rowsToShow as any, selected);
  }, [rowsToShow, penaltyOnlyCols, selected]);

  const selectedPenaltyTotal = React.useMemo(() => {
    if (!(isRegulerMode || isKhususMode || isPelunasanMode)) return 0;
    return calcSelectedPenaltyTotal(selected, rowsToShow.length);
  }, [isKhususMode, isPelunasanMode, isRegulerMode, rowsToShow.length, selected]);

  const selectedPenaltyText = React.useMemo(() => {
    return formatIdrLike(selectedPenaltyTotal);
  }, [selectedPenaltyTotal]);

  const khususTotals = React.useMemo(() => {
    if (!isKhususMode) return null;
    return calcKhususTotalsFromRows(rowsToShow);
  }, [isKhususMode, rowsToShow]);

  const penurunanBakiDebetSisaPokokTotal = React.useMemo(() => {
    if (!isPenurunanBakiDebetMode) return null;
    return calcRowsFieldTotal(rowsToShow, "sisaPokok");
  }, [isPenurunanBakiDebetMode, rowsToShow]);

  const penurunanBakiDebetSisaText = React.useMemo(() => {
    if (penurunanBakiDebetSisaPokokTotal === null) return null;
    return formatIdrLike(penurunanBakiDebetSisaPokokTotal);
  }, [penurunanBakiDebetSisaPokokTotal]);

  const showGraceInfo = !usePaging || page === 1;
  const keepGraceShellWithoutInfo = false;

  const highlightGraceBlock =
    (isRegulerMode ||
      isKhususMode ||
      isPenurunanPlafon ||
      isPelunasanMode ||
      isPenurunanBakiDebetMode) &&
    (!usePaging || page === 1);

  const pelunasanTotals = React.useMemo(() => {
    if (!isPelunasanMode) return null;
    return calcPelunasanTotals(rowsToShow);
  }, [isPelunasanMode, rowsToShow]);

  const regulerBaseTotals = React.useMemo(() => {
    if (!isRegulerMode) return null;
    return calcSelectedBaseTotals(rowsToShow, selected);
  }, [isRegulerMode, rowsToShow, selected]);

  const totalsForSummary = React.useMemo(() => {
    if (isPenurunanBakiDebetMode) {
      const v = penurunanBakiDebetSisaText ?? "0";
      return { pokok: v, bunga: "0", denda: "0", total: v };
    }

    if (isKhususMode) {
      return calcKhususSummary(khususTotals);
    }

    if (isPelunasanMode) {
      return calcPelunasanSummary(pelunasanTotals, PELUNASAN_DENDA_FLAT);
    }

    if (isRegulerMode) {
      return calcRegulerSummary(
        regulerBaseTotals ?? { pokok: 0, bunga: 0, total: 0 },
        selectedPenaltyTotal,
      );
    }

    const denda = penaltyOnlyCols
      ? formatIdrLike(penaltyTotalExplicit ?? 0)
      : "0";

    const total = formatIdrLike(
      2455555 + (penaltyOnlyCols ? penaltyTotalExplicit ?? 0 : 0),
    );

    return { pokok: "0", bunga: "0", denda, total };
  }, [
    isKhususMode,
    isPelunasanMode,
    isPenurunanBakiDebetMode,
    isRegulerMode,
    khususTotals,
    pelunasanTotals,
    penaltyOnlyCols,
    penaltyTotalExplicit,
    penurunanBakiDebetSisaText,
    regulerBaseTotals,
    selectedPenaltyTotal,
  ]);

  const disableRowChrome = !isPenurunanBakiDebetMode;

  const compactTableWrap = cn(
    "[&_.bg-white.px-3.py-3]:!py-1.5",
    "[&_.px-4.py-4]:!py-2",
    "[&_.billing-table-compact_td]:!py-2.5 [&_.billing-table-compact_th]:!py-2.5",
  );

  return (
    <div className="w-full px-0">
      <div className="space-y-5">
        <AnggotaAccountTabs active="pinjaman" onChange={() => {}} />

        <div className="space-y-4">
          <SectionHighlight title="Informasi Rekening" />

          <div className="relative">
            <InformasiRekeningHeader
              title="PINJAMAN BILLING"
              items={[
                { label: "No. Rekening Pinjaman", value: "SMG260004" },
                {
                  label: "Skema Tagihan",
                  value: skemaTagihanLabel ?? "Jadwal Fleksibel & Tagihan Berkala",
                },
                { label: "Satuan Grace Period", value: "Bulan" },
                { label: "Durasi Grace Period", value: "3" },
                { label: "Sisa Pokok Pinjaman", value: "10.000.000,00" },
              ]}
            />

            <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center rounded-[5px] bg-white px-3 text-sm font-semibold text-slate-900 ring-1 ring-white/60 hover:bg-white/90"
                  >
                    Aksi <ChevronDown className="ml-2 h-4 w-4 text-slate-600" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-72 rounded-[5px] border-slate-200 p-1"
                >
                  <DropdownMenuItem
                    className="rounded-[5px]"
                    onClick={() => toast("Riwayat Transaksi (prototype)")}
                  >
                    <History className="mr-2 h-4 w-4" />
                    Riwayat Transaksi
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-[5px]"
                    onClick={() => toast("Simulasi Tunggakan (prototype)")}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Simulasi Tunggakan
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    className="rounded-[5px]"
                    onClick={() => toast("Cetak Kwitansi Terakhir (prototype)")}
                  >
                    <ReceiptText className="mr-2 h-4 w-4" />
                    Cetak Kwitansi Terakhir
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-[5px]"
                    onClick={() =>
                      toast("Cetak Buku Transaksi Terakhir (prototype)")
                    }
                  >
                    <BookOpenText className="mr-2 h-4 w-4" />
                    Cetak Buku Transaksi Terakhir
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-[5px]"
                    onClick={() => toast("Cetak Buku (prototype)")}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Cetak Buku
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-[5px]"
                    onClick={() => toast("Cetak Prima Nota (prototype)")}
                  >
                    <ScrollText className="mr-2 h-4 w-4" />
                    Cetak Prima Nota
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <SectionHighlightWide title="Tagihan dan Pembayaran Angsuran" />

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="min-w-0 rounded-[5px] border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
              <div className="text-sm font-semibold text-slate-900">
                INFORMASI TAGIHAN DAN DENDA
              </div>

              <Separator className="my-3 bg-slate-200/70" />

              <div className={compactTableWrap}>
                <BillingTableView2
                  rows={rowsToShow}
                  selected={selected}
                  setSelected={setSelected}
                  isLocked={isRegulerMode || isPelunasanMode || isPenurunanBakiDebetMode}
                  showNextBillInfo={!hideNextBillInfo}
                  showGraceInfo={showGraceInfo}
                  highlightGraceBlock={highlightGraceBlock}
                  keepGraceShellWithoutInfo={keepGraceShellWithoutInfo}
                  hideSelection={isPenurunanBakiDebetMode}
                  showPenaltyColumn={!isPenurunanBakiDebetMode}
                  disableRowActiveRing={true}
                  disableRowRings={disableRowChrome}
                  penaltyIndexOffset={penaltyIndexOffset}
                  contextKey={penaltyContextKey}
                />
              </div>

              {usePaging ? (
                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="text-xs text-slate-700">
                    Menampilkan {showingStart} sampai {showingEnd} dari{" "}
                    {allRowsForMode.length} entri
                  </div>
                  <AnggotaTransactionPagination
                    page={page}
                    pageCount={pageCount}
                    onPage={setPage}
                  />
                </div>
              ) : null}

              <div className="sr-only">
                <Info />
                {selectedPenaltyText}
              </div>
            </Card>

            <div className="space-y-4 px-1">
              <BillSummaryCard
                mode={isPelunasanMode ? "pelunasan" : "regular"}
                totals={totalsForSummary}
                installment={{ ke: "10", lunas: "9", seharusnya: "9" }}
                transactionType={jenisTransaksi as any}
                onTransactionTypeChange={(v: any) => setJenisTransaksi(v)}
                hasAnySelected={selected.some(Boolean)}
              />

              <TransactionFormCardView2
                tanggalEfektif={tanggalEfektif}
                setTanggalEfektif={setTanggalEfektif}
                jenisTransaksi={jenisTransaksi}
                setJenisTransaksi={setJenisTransaksi}
                kolektor={kolektor}
                setKolektor={setKolektor}
                nominal={nominal}
                setNominal={setNominal}
                nominalPokok={nominalPokok}
                setNominalPokok={setNominalPokok}
                nominalBunga={nominalBunga}
                setNominalBunga={setNominalBunga}
                nominalDenda={nominalDenda}
                setNominalDenda={setNominalDenda}
                tabungan={tabungan}
                setTabungan={setTabungan}
                keterangan={keterangan}
                setKeterangan={setKeterangan}
              />
            </div>
          </div>

          <div className="sr-only">{nasabah.nama}</div>
        </div>
      </div>
    </div>
  );
}