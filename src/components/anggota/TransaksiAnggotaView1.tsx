"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ReceiptText,
  ChevronDown,
  History,
  Calculator,
  BookOpenText,
  Printer,
  ScrollText,
  Info,
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
import BillSummaryCard from "@/components/anggota/BillSummaryCard";
import TransactionFormCardView2 from "@/components/anggota/TransactionFormCardView2";
import BillingTable, { type BillingRow } from "@/components/anggota/BillingTable";
import BillingTableView2, {
  type BillingRow as BillingRowView2,
} from "@/components/anggota/BillingTableView2";
import { calcSelectedPenaltyTotal } from "@/components/anggota/penalty-utils";
import { calcKhususTotalsFromRows } from "@/components/anggota/khsus-summary";
import { calcKhususSelectedTotals } from "@/components/anggota/khusus-selected-totals";
import { formatIdr0, formatIdrLike } from "@/components/anggota/anggota-money";
import {
  calcKhususSummary,
  calcPenaltyOnlySummary,
  calcPenurunanBakiDebetSummary,
  calcRegulerSummary,
  calcSelectedBaseTotals,
  calcRowsFieldTotal,
} from "@/components/anggota/anggota-transaction-calculations";
import { useAnggotaTransactionFormState } from "@/components/anggota/useAnggotaTransactionFormState";
import { useAnggotaBillingSelection } from "@/components/anggota/useAnggotaBillingSelection";
import {
  isBungaOnly,
  isFeeOnly,
  isKhusus,
  isPelunasan,
  isPenaltyOnly,
  isPenurunanBakiDebet,
  isPokokOnly,
  isReguler,
  TX,
} from "@/components/anggota/transaction-types";
import { makePenaltyContextKey } from "@/lib/penaltyContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  nasabah: {
    id: string;
    nama: string;
    noIdentitas: string;
    alamat: string;
  };
};

const rows: BillingRow[] = [
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "0,00",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "0,00",
    sisaBunga: "0,00",
    statusTagihan: "Lunas",
  },
  {
    jatuhTempo: "25-01-2026",
    totalBelumDibayar: "0,00",
    tagihanPokok: "833.333",
    tagihanBunga: "83.333",
    sisaPokok: "0,00",
    sisaBunga: "0,00",
    statusTagihan: "Lunas",
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    jatuhTempo: `25-0${(i % 7) + 2}-2026`,
    totalBelumDibayar: "916.667",
    tagihanPokok: "916.667",
    tagihanBunga: "83.333",
    sisaPokok: "833.333",
    sisaBunga: "33.333",
    statusTagihan:
      i === 0 ? "Dibayar Sebagian" : i === 2 ? "Jatuh Tempo" : "Belum Dibayar",
  })),
];

const PELUNASAN_DENDA_FLAT = 215000;

export default function TransaksiAnggotaView1({ nasabah }: Props) {
  const penaltyContextKey = React.useMemo(
    () => makePenaltyContextKey(nasabah.id, "anggota-view1"),
    [nasabah.id],
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

  const isPelunasanMode = isPelunasan(jenisTransaksi);
  const isRegulerMode = isReguler(jenisTransaksi);
  const isKhususMode = isKhusus(jenisTransaksi);

  const hideInterestCols = isPokokOnly(jenisTransaksi);
  const interestOnlyCols = isBungaOnly(jenisTransaksi);
  const penaltyOnlyCols = isPenaltyOnly(jenisTransaksi);
  const feeOnlyCols = isFeeOnly(jenisTransaksi);
  const isPenurunanBakiDebetMode = isPenurunanBakiDebet(jenisTransaksi);

  const pageSize = 6;
  const [page, setPage] = React.useState<number>(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [jenisTransaksi]);

  const pagedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, pageSize]);

  const { selected, setSelected, hasAnySelected } = useAnggotaBillingSelection({
    rows: pagedRows,
    jenisTransaksi,
    variant: "view1",
  });

  React.useEffect(() => {
    if (!isKhususMode) return;
    const t = calcKhususSelectedTotals(pagedRows, selected);
    setNominalPokok(formatIdr0(t.pokok));
    setNominalBunga(formatIdr0(t.bunga));
    setNominalDenda(formatIdr0(t.denda));
  }, [
    isKhususMode,
    pagedRows,
    selected,
    setNominalBunga,
    setNominalDenda,
    setNominalPokok,
  ]);

  const showGraceHighlight = !penaltyOnlyCols && !feeOnlyCols && page === 1;

  const selectedPenaltyTotal = React.useMemo(() => {
    if (!(isRegulerMode || isKhususMode || isPelunasanMode)) return 0;
    return calcSelectedPenaltyTotal(selected, pagedRows.length);
  }, [
    isKhususMode,
    isPelunasanMode,
    isRegulerMode,
    pagedRows.length,
    selected,
  ]);

  const penaltyTotalExplicit = React.useMemo(() => {
    if (!penaltyOnlyCols) return 0;
    return calcSelectedPenaltyTotal(selected, pagedRows.length);
  }, [pagedRows.length, penaltyOnlyCols, selected]);

  const computedBaseTotals = React.useMemo(
    () => calcSelectedBaseTotals(pagedRows, selected),
    [pagedRows, selected],
  );

  const computedTotals = React.useMemo(() => {
    const denda = penaltyOnlyCols
      ? penaltyTotalExplicit
      : isPelunasanMode
        ? PELUNASAN_DENDA_FLAT
        : isRegulerMode
          ? selectedPenaltyTotal
          : 0;

    return calcRegulerSummary(computedBaseTotals, denda);
  }, [
    computedBaseTotals,
    isPelunasanMode,
    isRegulerMode,
    penaltyOnlyCols,
    penaltyTotalExplicit,
    selectedPenaltyTotal,
  ]);

  const khususTotals = React.useMemo(() => {
    if (!isKhususMode) return null;
    return calcKhususTotalsFromRows(pagedRows);
  }, [isKhususMode, pagedRows]);

  const penurunanTotalPokok = React.useMemo(() => {
    if (!isPenurunanBakiDebetMode) return 0;
    return calcRowsFieldTotal(pagedRows, "tagihanPokok");
  }, [isPenurunanBakiDebetMode, pagedRows]);

  const penurunanSisaPokokTotal = React.useMemo(() => {
    if (!isPenurunanBakiDebetMode) return 0;
    return calcRowsFieldTotal(pagedRows, "sisaPokok");
  }, [isPenurunanBakiDebetMode, pagedRows]);

  React.useEffect(() => {
    if (!isPenurunanBakiDebetMode) return;
    setNominal("0");
  }, [isPenurunanBakiDebetMode, setNominal]);

  const penurunanTotals = React.useMemo(() => {
    if (!isPenurunanBakiDebetMode) return null;

    return {
      totalPokokText: formatIdrLike(penurunanTotalPokok),
      sisaText: formatIdrLike(penurunanSisaPokokTotal),
    };
  }, [
    isPenurunanBakiDebetMode,
    penurunanSisaPokokTotal,
    penurunanTotalPokok,
  ]);

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);
  const pagedRowsForView2 = pagedRows as unknown as BillingRowView2[];
  const useView2Style = isRegulerMode || isKhususMode || isPelunasanMode;
  const showPenaltyColumnInTable = !isPenurunanBakiDebetMode;
  const compactRowsForView2 = isRegulerMode || isKhususMode || isPelunasanMode;
  const applyCompactOverrides = compactRowsForView2 && !isPenurunanBakiDebetMode;

  return (
    <div className="w-full px-0">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <AnggotaAccountTabs active="pinjaman" onChange={() => {}} />
        </div>

        <div className="space-y-4">
          <SectionHighlight title="Informasi Rekening" />

          <InformasiRekeningHeader
            title="PINJAMAN BILLING"
            items={[
              { label: "No. Rekening Pinjaman", value: "SMG260004" },
              { label: "Skema Tagihan", value: "Tagihan Sesuai Jadwal Angsuran" },
              { label: "Satuan Grace Period", value: "Bulan" },
              { label: "Durasi Grace Period", value: "3" },
              { label: "Tenor Pinjaman", value: "18 Bulan" },
              { label: "Sisa Pokok Pinjaman", value: "10.000.000,00" },
            ]}
          />

          <SectionHighlightWide
            title="Tagihan dan Pembayaran Angsuran"
            customerName={nasabah.nama}
          />

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="min-w-0 rounded-[5px] border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
              <div className="text-sm font-semibold text-slate-900">
                INFORMASI TAGIHAN DAN DENDA
              </div>

              <Separator className="my-3 w-full bg-slate-200/70" />

              <div
                className={cn(
                  "billing-v1-compact-rows",
                  applyCompactOverrides
                    ? "[&_.bg-white.px-3.py-3]:!py-1.5 [&_.px-4.py-4]:!py-2"
                    : "",
                  "[&_.billing-table-compact_td]:py-2.5 [&_.billing-table-compact_th]:py-2.5",
                  "[&_.billing-table-compact_span.text-slate-400]:hidden",
                )}
              >
                {isPenurunanBakiDebetMode ? (
                  <BillingTableView2
                    rows={pagedRowsForView2}
                    selected={selected}
                    setSelected={setSelected}
                    isLocked
                    showNextBillInfo={false}
                    showGraceInfo={page === 1}
                    highlightGraceBlock={page === 1}
                    hideSelection
                    showPenaltyColumn={false}
                    showStatusColumn
                    disableRowRings
                    disableRowActiveRing
                    rowDensity="default"
                    className="anggota-page-two-billing mt-0"
                    contextKey={penaltyContextKey}
                  />
                ) : useView2Style ? (
                  <BillingTableView2
                    rows={pagedRowsForView2}
                    selected={selected}
                    setSelected={setSelected}
                    isLocked={isPelunasanMode}
                    showNextBillInfo={false}
                    showGraceInfo={page === 1}
                    highlightGraceBlock={page === 1}
                    hideSelection={false}
                    showPenaltyColumn={showPenaltyColumnInTable}
                    showStatusColumn
                    penaltyContentEnabled={page === 1}
                    disableRowRings
                    rowDensity="default"
                    className="anggota-page-two-billing mt-0"
                    contextKey={penaltyContextKey}
                  />
                ) : (
                  <div className="billing-table-compact">
                    <BillingTable
                      rows={pagedRows}
                      selected={selected}
                      setSelected={setSelected}
                      isPelunasan={isPelunasanMode}
                      showGraceHighlight={showGraceHighlight}
                      hideInterestCols={hideInterestCols}
                      interestOnlyCols={interestOnlyCols}
                      penaltyOnlyCols={penaltyOnlyCols}
                      feeOnlyCols={feeOnlyCols}
                      hideSelection={false}
                      showPenaltyColumn={showPenaltyColumnInTable}
                      rowDensity="default"
                    />
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-xs text-slate-700">
                  Menampilkan {showingStart} sampai {showingEnd} dari {rows.length} entri
                </div>

                <AnggotaTransactionPagination
                  page={page}
                  pageCount={pageCount}
                  onPage={setPage}
                />
              </div>
            </Card>

            <div className="space-y-4 px-1">
              <BillSummaryCard
                mode={isPelunasanMode ? "pelunasan" : "regular"}
                hasAnySelected={hasAnySelected}
                totals={
                  isKhususMode
                    ? calcKhususSummary(khususTotals)
                    : penaltyOnlyCols
                      ? calcPenaltyOnlySummary(penaltyTotalExplicit)
                      : isPenurunanBakiDebetMode
                        ? calcPenurunanBakiDebetSummary(
                            penurunanTotals?.sisaText ?? "0",
                            false,
                          )
                        : {
                            pokok: computedBaseTotals.pokok.toLocaleString("id-ID"),
                            bunga: computedBaseTotals.bunga.toLocaleString("id-ID"),
                            denda: computedTotals.denda,
                            total: computedTotals.total,
                          }
                }
                installment={{ ke: "1", lunas: "0", seharusnya: "0" }}
                transactionType={jenisTransaksi as any}
                onTransactionTypeChange={(v: any) => setJenisTransaksi(v)}
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