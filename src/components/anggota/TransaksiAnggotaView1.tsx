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

    const totalPokokText = formatIdrLike(penurunanTotalPokok);
    const sisaText = formatIdrLike(penurunanSisaPokokTotal);

    return {
      totalPokokText,
      sisaText,
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

  const alignNumbersForPenurunan = "";

  return (
    <div className="w-full px-0">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <AnggotaAccountTabs active="pinjaman" onChange={() => {}} />
        </div>

        <div className="space-y-4">
          <SectionHighlight title="Informasi Rekening" />

          <div className="relative">
            <InformasiRekeningHeader
              title="PINJAMAN BILLING"
              items={[
                { label: "No. Rekening Pinjaman", value: "SMG260004" },
                { label: "Skema Tagihan", value: "Tagihan Sesuai Jadwal Angsuran" },
                { label: "Satuan Grace Period", value: "Bulan" },
                { label: "Durasi Grace Period", value: "3" },
                {
                  label: "Tenor Pinjaman",
                  value: (
                    <span className="inline-flex items-center gap-2">
                      18 Bulan
                      <Tooltip delayDuration={150}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
                            aria-label="Informasi perubahan tenor"
                          >
                            <Info className="h-3.5 w-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[280px] rounded-xl border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold leading-relaxed text-slate-800 shadow-xl">
                          Terdapat penambahan tenor pinjaman dari tenor awal
                          sebesar 12 bulan menjadi 18 bulan
                        </TooltipContent>
                      </Tooltip>
                    </span>
                  ),
                },
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
                    Aksi <ChevronDown className="ml-1 h-4 w-4 text-slate-600" />
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
                    ? [
                        "[&_.bg-white.px-3.py-3]:!py-1.5",
                        "[&_.px-4.py-4]:!py-2",
                      ].join(" ")
                    : "",
                  "[&_.billing-table-compact_td]:py-2.5 [&_.billing-table-compact_th]:py-2.5",
                  "[&_.billing-table-compact_td]:!py-2.5 [&_.billing-table-compact_th]:!py-2.5",
                  "[&_.billing-table-compact_span.text-slate-400]:hidden",
                  alignNumbersForPenurunan,
                )}
              >
                {isPenurunanBakiDebetMode ? (
                  <BillingTableView2
                    rows={pagedRowsForView2}
                    selected={selected}
                    setSelected={setSelected}
                    isLocked={true}
                    showNextBillInfo={false}
                    showGraceInfo={page === 1}
                    highlightGraceBlock={page === 1}
                    keepGraceShellWithoutInfo={false}
                    hideSelection={true}
                    showPenaltyColumn={false}
                    disableRowRings
                    disableRowActiveRing
                    rowDensity="default"
                    className="mt-0"
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
                    keepGraceShellWithoutInfo={false}
                    hideSelection={false}
                    showPenaltyColumn={showPenaltyColumnInTable}
                    penaltyContentEnabled={page === 1}
                    disableRowRings
                    rowDensity="default"
                    className="mt-0"
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
                  Menampilkan {showingStart} sampai {showingEnd} dari {rows.length}{" "}
                  entri
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
                onPayPenurunanBakiDebet={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="sr-only">{nasabah.nama}</div>
      </div>
    </div>
  );
}