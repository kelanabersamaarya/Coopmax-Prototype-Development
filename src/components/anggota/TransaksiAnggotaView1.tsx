"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ReceiptText,
  Info,
  ChevronDown,
  History,
  Calculator,
  BookOpenText,
  Printer,
  ScrollText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AnggotaAccountTabs from "@/components/anggota/AnggotaAccountTabs";
import SectionHighlight from "@/components/anggota/SectionHighlight";
import SectionHighlightWide from "@/components/anggota/SectionHighlightWide";
import InformasiRekeningHeader from "@/components/anggota/InformasiRekeningHeader";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BillSummaryCard from "@/components/anggota/BillSummaryCard";
import TransactionFormCardView2, {
  type TransactionType,
} from "@/components/anggota/TransactionFormCardView2";
import BillingTable, { type BillingRow } from "@/components/anggota/BillingTable";
import BillingTableView2, {
  type BillingRow as BillingRowView2,
} from "@/components/anggota/BillingTableView2";
import { formatIdrLike } from "@/components/anggota/calc-penalties";
import { calcSelectedPenaltyTotal } from "@/components/anggota/penalty-utils";
import { calcKhususTotalsFromRows } from "@/components/anggota/khsus-summary";
import {
  calcKhususSelectedTotals,
  formatIdr0,
} from "@/components/anggota/khusus-selected-totals";

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

function PaginationLikeExample({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  if (pageCount <= 1) return null;

  const disabledPrev = page <= 1;
  const disabledNext = page >= pageCount;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={cn(
          "inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold",
          "bg-slate-100 text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-200",
          disabledPrev ? "opacity-60 pointer-events-none" : "",
        )}
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={disabledPrev}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Sebelumnya
      </button>

      <div className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-violet-600 px-4 text-sm font-extrabold text-white">
        {page}
      </div>

      <button
        type="button"
        className={cn(
          "inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold",
          "bg-slate-100 text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-200",
          disabledNext ? "opacity-60 pointer-events-none" : "",
        )}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
        disabled={disabledNext}
      >
        Selanjutnya
        <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  );
}

function parseMoneyLikeId(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;

  const hasComma = s.includes(",");

  const normalized = hasComma
    ? s.replace(/\./g, "").replace(",", ".")
    : s.replace(/\./g, "");

  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatMoneyIdNoDecimals(n: number) {
  return formatIdrLike(Math.round(Number.isFinite(n) ? n : 0));
}

export default function TransaksiAnggotaView1({ nasabah }: Props) {
  const [tanggalEfektif, setTanggalEfektif] = React.useState("25-03-2026");
  const [jenisTransaksi, setJenisTransaksi] = React.useState<TransactionType>(
    "Pembayaran Reguler",
  );
  const [kolektor, setKolektor] = React.useState<string>("Pilih Kolektor");

  const [nominal, setNominal] = React.useState("0");
  const [nominalPokok, setNominalPokok] = React.useState("0");
  const [nominalBunga, setNominalBunga] = React.useState("0");
  const [nominalDenda, setNominalDenda] = React.useState("0");

  const [tabungan, setTabungan] = React.useState("Tanpa Tabungan");
  const [keterangan, setKeterangan] = React.useState("");

  const isPelunasan = jenisTransaksi === "Pelunasan";
  const isReguler = jenisTransaksi === "Pembayaran Reguler";
  const isKhusus = jenisTransaksi === "Pembayaran Khusus";

  const hideInterestCols = jenisTransaksi === "Pembayaran Pokok";
  const interestOnlyCols = jenisTransaksi === "Pembayaran Bunga";
  const penaltyOnlyCols = jenisTransaksi === "Pembayaran Denda";
  const feeOnlyCols = jenisTransaksi === "Pembayaran Biaya Lainnya";

  const isPenurunanBakiDebet =
    jenisTransaksi === "Pembayaran Penurunan Baki Debet";

  const totalEntriesLocal = 495;

  const pageSize = isReguler ? 20 : 6;
  const [page, setPage] = React.useState<number>(1);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [jenisTransaksi, pageSize]);

  const pagedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, pageSize]);

  // === Persist selection per page (Reguler) ===
  const [selectedByPage, setSelectedByPage] = React.useState<
    Record<number, boolean[]>
  >({});

  // === Persist selection per page (Khusus) ===
  const [selectedByPageKhusus, setSelectedByPageKhusus] = React.useState<
    Record<number, boolean[]>
  >({});

  const [selected, _setSelected] = React.useState<boolean[]>(() =>
    pagedRows.map(() => false),
  );

  const setSelected: React.Dispatch<React.SetStateAction<boolean[]>> =
    React.useCallback(
      (next) => {
        _setSelected((prev) => {
          const resolved = typeof next === "function" ? next(prev) : next;

          if (isReguler) {
            setSelectedByPage((map) => ({
              ...map,
              [page]: resolved,
            }));
          }

          if (isKhusus) {
            setSelectedByPageKhusus((map) => ({
              ...map,
              [page]: resolved,
            }));
          }

          return resolved;
        });
      },
      [isKhusus, isReguler, page],
    );

  // Sync selected when page/rows change:
  React.useEffect(() => {
    if (isPelunasan) {
      _setSelected(pagedRows.map(() => true));
      return;
    }

    if (isKhusus) {
      const fromStore = selectedByPageKhusus[page];
      if (fromStore && fromStore.length === pagedRows.length) {
        _setSelected(fromStore);
      } else {
        _setSelected(pagedRows.map(() => false));
      }
      return;
    }

    if (isReguler) {
      const fromStore = selectedByPage[page];
      if (fromStore && fromStore.length === pagedRows.length) {
        _setSelected(fromStore);
      } else {
        _setSelected(pagedRows.map(() => false));
      }
      return;
    }

    _setSelected(pagedRows.map(() => false));
  }, [
    isPelunasan,
    isKhusus,
    isReguler,
    pagedRows,
    page,
    selectedByPage,
    selectedByPageKhusus,
  ]);

  const hasAnySelected = React.useMemo(() => selected.some(Boolean), [selected]);

  // Pembayaran Khusus: field pembayaran auto-terisi hanya jika ada tagihan yang dicheck
  React.useEffect(() => {
    if (!isKhusus) return;

    if (!hasAnySelected) {
      setNominalPokok("0");
      setNominalBunga("0");
      setNominalDenda("0");
      return;
    }

    const t = calcKhususSelectedTotals(pagedRows, selected);
    setNominalPokok(formatIdr0(t.pokok));
    setNominalBunga(formatIdr0(t.bunga));
    setNominalDenda(formatIdr0(t.denda));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKhusus, hasAnySelected, pagedRows, selected]);

  const showGraceHighlight = !penaltyOnlyCols && !feeOnlyCols && page === 1;

  const selectedPenaltyTotal = React.useMemo(() => {
    if (!(isReguler || isKhusus || isPelunasan)) return 0;
    return calcSelectedPenaltyTotal(selected, pagedRows.length);
  }, [isKhusus, isPelunasan, isReguler, pagedRows.length, selected]);

  const penaltyTotalExplicit = React.useMemo(() => {
    if (!penaltyOnlyCols) return 0;
    return calcSelectedPenaltyTotal(selected, pagedRows.length);
  }, [pagedRows.length, penaltyOnlyCols, selected]);

  const computedBaseTotals = React.useMemo(() => {
    let pokok = 0;
    let bunga = 0;

    for (let i = 0; i < pagedRows.length; i++) {
      if (!(selected[i] ?? false)) continue;
      pokok += parseMoneyLikeId(pagedRows[i]?.tagihanPokok ?? "0");
      bunga += parseMoneyLikeId(pagedRows[i]?.tagihanBunga ?? "0");
    }

    const total = pokok + bunga;

    return {
      pokok,
      bunga,
      total,
    };
  }, [pagedRows, selected]);

  const computedTotals = React.useMemo(() => {
    const denda =
      penaltyOnlyCols ? penaltyTotalExplicit : isReguler ? selectedPenaltyTotal : 0;

    const total = computedBaseTotals.total + denda;

    return {
      pokok: formatMoneyIdNoDecimals(computedBaseTotals.pokok),
      bunga: formatMoneyIdNoDecimals(computedBaseTotals.bunga),
      denda: formatMoneyIdNoDecimals(denda),
      total: formatMoneyIdNoDecimals(total),
    };
  }, [
    computedBaseTotals.bunga,
    computedBaseTotals.pokok,
    computedBaseTotals.total,
    isReguler,
    penaltyOnlyCols,
    penaltyTotalExplicit,
    selectedPenaltyTotal,
  ]);

  const khususTotals = React.useMemo(() => {
    if (!isKhusus) return null;
    return calcKhususTotalsFromRows(pagedRows);
  }, [isKhusus, pagedRows]);

  const penurunanTotalPokok = React.useMemo(() => {
    if (!isPenurunanBakiDebet) return 0;
    return pagedRows.reduce((sum, r) => sum + parseMoneyLikeId(r.tagihanPokok), 0);
  }, [isPenurunanBakiDebet, pagedRows]);

  const [penurunanSisaPinjaman, setPenurunanSisaPinjaman] =
    React.useState<number>(0);

  React.useEffect(() => {
    setPenurunanSisaPinjaman(0);
  }, [jenisTransaksi]);

  const penurunanTotals = React.useMemo(() => {
    if (!isPenurunanBakiDebet) return null;

    const totalPokokText = formatMoneyIdNoDecimals(penurunanTotalPokok);
    const sisaText = formatMoneyIdNoDecimals(penurunanSisaPinjaman);

    return {
      totalPokokText,
      sisaText,
    };
  }, [isPenurunanBakiDebet, penurunanSisaPinjaman, penurunanTotalPokok]);

  const showingStart = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingEnd = Math.min(rows.length, page * pageSize);

  const pagedRowsForView2 = pagedRows as unknown as BillingRowView2[];

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
                { label: "Skema Tagihan", value: "Tagihan Sesuai Jadwal Angsuran" },
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
                    className="inline-flex h-9 items-center rounded-full bg-white px-3 text-sm font-semibold text-slate-900 ring-1 ring-white/60 hover:bg-white/90"
                  >
                    Aksi <ChevronDown className="ml-2 h-4 w-4 text-slate-600" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-72 rounded-2xl border-slate-200 p-1"
                >
                  <DropdownMenuItem
                    className="rounded-xl"
                    onClick={() => toast("Riwayat Transaksi (prototype)")}
                  >
                    <History className="mr-2 h-4 w-4" />
                    Riwayat Transaksi
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-xl"
                    onClick={() => toast("Simulasi Tunggakan (prototype)")}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Simulasi Tunggakan
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    className="rounded-xl"
                    onClick={() => toast("Cetak Kwitansi Terakhir (prototype)")}
                  >
                    <ReceiptText className="mr-2 h-4 w-4" />
                    Cetak Kwitansi Terakhir
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-xl"
                    onClick={() =>
                      toast("Cetak Buku Transaksi Terakhir (prototype)")
                    }
                  >
                    <BookOpenText className="mr-2 h-4 w-4" />
                    Cetak Buku Transaksi Terakhir
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-xl"
                    onClick={() => toast("Cetak Buku (prototype)")}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Cetak Buku
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-xl"
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
            <Card className="min-w-0 rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
              <div className="text-sm font-semibold text-slate-900">
                INFORMASI TAGIHAN DAN DENDA
              </div>

              <Separator className="my-3 w-full bg-slate-200/70" />

              {isReguler || isKhusus ? (
                <BillingTableView2
                  rows={pagedRowsForView2}
                  selected={selected}
                  setSelected={setSelected}
                  isLocked={false} // KHUSUS: bisa check/uncheck (logic), UI tetap sama
                  showNextBillInfo={false}
                  showGraceInfo={true}
                  highlightGraceBlock={true}
                  hideSelection={false}
                  showPenaltyColumn={true}
                  // hilangkan ring/border tebal baris SEPENUHNYA
                  disableRowRings
                  className="mt-0"
                />
              ) : (
                <div className="billing-table-compact">
                  <BillingTable
                    rows={pagedRows}
                    selected={selected}
                    setSelected={setSelected}
                    isPelunasan={isPelunasan}
                    showGraceHighlight={showGraceHighlight}
                    hideInterestCols={hideInterestCols}
                    interestOnlyCols={interestOnlyCols}
                    penaltyOnlyCols={penaltyOnlyCols}
                    feeOnlyCols={feeOnlyCols}
                    hideSelection={isPenurunanBakiDebet}
                    showPenaltyColumn={isPelunasan}
                  />
                </div>
              )}

              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-xs text-slate-700">
                  Menampilkan {showingStart} sampai {showingEnd} dari{" "}
                  {isReguler ? totalEntriesLocal : rows.length} entri
                </div>

                {isReguler ? (
                  <PaginationLikeExample
                    page={page}
                    pageCount={pageCount}
                    onPage={setPage}
                  />
                ) : (
                  <div className="flex justify-end">
                    <div className="sr-only" />
                  </div>
                )}
              </div>
            </Card>

            <div className="space-y-4 px-1">
              <BillSummaryCard
                mode={isPelunasan ? "pelunasan" : "regular"}
                hasAnySelected={hasAnySelected}
                totals={
                  // Ringkasan khusus: tetap otomatis dari tagihan (biarkan angka yang ada / behavior existing)
                  isKhusus
                    ? {
                        pokok: formatMoneyIdNoDecimals(khususTotals?.pokok ?? 0),
                        bunga: formatMoneyIdNoDecimals(khususTotals?.bunga ?? 0),
                        denda: formatMoneyIdNoDecimals(khususTotals?.denda ?? 0),
                        total: formatMoneyIdNoDecimals(khususTotals?.total ?? 0),
                      }
                    : penaltyOnlyCols
                      ? {
                          pokok: "0",
                          bunga: "0",
                          denda: formatMoneyIdNoDecimals(penaltyTotalExplicit),
                          total: formatMoneyIdNoDecimals(penaltyTotalExplicit),
                        }
                      : isPenurunanBakiDebet
                        ? {
                            pokok: penurunanTotals?.totalPokokText ?? "0",
                            bunga: "0",
                            denda: "0",
                            total: penurunanTotals?.sisaText ?? "0",
                          }
                        : {
                            pokok: computedTotals.pokok,
                            bunga: computedTotals.bunga,
                            denda: computedTotals.denda,
                            total: computedTotals.total,
                          }
                }
                installment={{ ke: "1", lunas: "0", seharusnya: "0" }}
                transactionType={jenisTransaksi as any}
                onTransactionTypeChange={(v: any) => {
                  if (jenisTransaksi === "Pembayaran Reguler" && v !== "Pembayaran Reguler") {
                    setSelectedByPage({});
                  }
                  if (jenisTransaksi === "Pembayaran Khusus" && v !== "Pembayaran Khusus") {
                    setSelectedByPageKhusus({});
                    setNominalPokok("0");
                    setNominalBunga("0");
                    setNominalDenda("0");
                  }
                  setJenisTransaksi(v);
                }}
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
                onPayPenurunanBakiDebet={(nominalPokokInput) => {
                  const input = parseMoneyLikeId(nominalPokokInput || "0");
                  const sisa = Math.max(0, penurunanTotalPokok - input);
                  setPenurunanSisaPinjaman(sisa);
                }}
              />
            </div>
          </div>
        </div>

        <div className="sr-only">{nasabah.nama}</div>
      </div>
    </div>
  );
}