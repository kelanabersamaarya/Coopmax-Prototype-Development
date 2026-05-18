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
import TransactionFormCardView2, {
  type TransactionType,
} from "@/components/anggota/TransactionFormCardView2";
import BillSummaryCard from "@/components/anggota/BillSummaryCard";
import BillingTableView2, {
  type BillingRow,
} from "@/components/anggota/BillingTableView2";
import BillingTable, {
  type BillingRow as BillingRowV1,
} from "@/components/anggota/BillingTable";
import {
  calcPenaltyTotal,
  formatIdrLike,
} from "@/components/anggota/calc-penalties";
import { calcSelectedPenaltyTotal } from "@/components/anggota/penalty-utils";
import { calcKhususTotalsFromRows } from "@/components/anggota/khsus-summary";
import {
  calcKhususSelectedTotals,
  formatIdr0,
} from "@/components/anggota/khusus-selected-totals";
import { TX } from "@/components/anggota/transaction-types";

type Props = {
  nasabah: {
    id: string;
    nama: string;
    noIdentitas: string;
    alamat: string;
  };
  skemaTagihanLabel?: string;
  hideNextBillInfo?: boolean;
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

// FIX: parsing IDR "783.333" harus jadi 783333 (hapus pemisah ribuan '.')
function parseNumLikeId(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;

  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function PaginationLikeView1({
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

const PELUNASAN_DENDA_FLAT = 215000;

export default function TransaksiAnggotaView2({
  nasabah,
  skemaTagihanLabel,
  hideNextBillInfo = false,
}: Props) {
  const [tanggalEfektif, setTanggalEfektif] = React.useState("25-03-2026");
  const [jenisTransaksi, setJenisTransaksi] = React.useState<TransactionType>(
    TX.REGULER,
  );
  const [kolektor, setKolektor] = React.useState<string>("Pilih Kolektor");

  const [nominal, setNominal] = React.useState("0");
  const [nominalPokok, setNominalPokok] = React.useState("0");
  const [nominalBunga, setNominalBunga] = React.useState("0");
  const [nominalDenda, setNominalDenda] = React.useState("0");

  const [tabungan, setTabungan] = React.useState("Tanpa Tabungan");
  const [keterangan, setKeterangan] = React.useState("");

  const isPelunasan = jenisTransaksi === TX.PELUNASAN;
  const isReguler = jenisTransaksi === TX.REGULER;
  const isKhusus = jenisTransaksi === TX.KHUSUS;

  const penaltyOnlyCols = jenisTransaksi === TX.DENDA;
  const feeOnlyCols = jenisTransaksi === TX.BIAYA_LAINNYA;
  const showAllRows = penaltyOnlyCols || feeOnlyCols;

  const isPenurunanPlafon = (jenisTransaksi as any) === "Pembayaran Penurunan Plafon";
  const isPenurunanBakiDebet = jenisTransaksi === TX.PENURUNAN_BAKI_DEBET;

  const pageSize = 6;
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
  const showingEnd = usePaging
    ? Math.min(allRowsForMode.length, page * pageSize)
    : 0;

  const penaltyIndexOffset = usePaging ? (page - 1) * pageSize : 0;

  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rowsToShow.map(() => false),
  );

  React.useEffect(() => {
    if (isReguler) {
      setSelected(rowsToShow.map(() => true));
      return;
    }

    if (isKhusus) {
      // VIEW2/3: Pembayaran Khusus default tercentang
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
      setSelected(rowsToShow.map(() => true));
      return;
    }

    setSelected(rowsToShow.map(() => true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReguler, isKhusus, isPelunasan, showAllRows, isPenurunanBakiDebet, rowsToShow.length]);

  React.useEffect(() => {
    if (!isKhusus) return;
    const t = calcKhususSelectedTotals(rowsToShow, selected);
    setNominalPokok(formatIdr0(t.pokok));
    setNominalBunga(formatIdr0(t.bunga));
    setNominalDenda(formatIdr0(t.denda));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKhusus, rowsToShow, selected]);

  const penaltyTotalExplicit = React.useMemo(() => {
    if (!penaltyOnlyCols) return null;
    return calcPenaltyTotal(rowsToShow as any, selected);
  }, [rowsToShow, penaltyOnlyCols, selected]);

  const selectedPenaltyTotal = React.useMemo(() => {
    if (!(isReguler || isKhusus || isPelunasan)) return 0;
    return calcSelectedPenaltyTotal(selected, rowsToShow.length);
  }, [isKhusus, isPelunasan, isReguler, rowsToShow.length, selected]);

  const selectedPenaltyText = React.useMemo(() => {
    return formatIdrLike(selectedPenaltyTotal);
  }, [selectedPenaltyTotal]);

  const khususTotals = React.useMemo(() => {
    if (!isKhusus) return null;
    return calcKhususTotalsFromRows(rowsToShow);
  }, [isKhusus, rowsToShow]);

  const penurunanBakiDebetSisaPokokTotal = React.useMemo(() => {
    if (!isPenurunanBakiDebet) return null;
    return rowsToShow.reduce((sum, r) => sum + parseNumLikeId(r.sisaPokok), 0);
  }, [isPenurunanBakiDebet, rowsToShow]);

  const penurunanBakiDebetSisaText = React.useMemo(() => {
    if (penurunanBakiDebetSisaPokokTotal === null) return null;
    return formatIdrLike(penurunanBakiDebetSisaPokokTotal);
  }, [penurunanBakiDebetSisaPokokTotal]);

  const showGraceInfo = !usePaging || page === 1;
  const keepGraceShellWithoutInfo = false;

  const highlightGraceBlock =
    (isReguler ||
      isKhusus ||
      isPenurunanPlafon ||
      isPelunasan ||
      isPenurunanBakiDebet) &&
    (!usePaging || page === 1);

  const pelunasanTotals = React.useMemo(() => {
    if (!isPelunasan) return null;

    const sum = rowsToShow.reduce(
      (acc, r) => {
        acc.total += parseNumLikeId(r.totalBelumDibayar);
        acc.pokok += parseNumLikeId(r.tagihanPokok);
        acc.bunga += parseNumLikeId(r.tagihanBunga);
        acc.sisaPokok += parseNumLikeId(r.sisaPokok);
        acc.sisaBunga += parseNumLikeId(r.sisaBunga);
        return acc;
      },
      { total: 0, pokok: 0, bunga: 0, sisaPokok: 0, sisaBunga: 0 },
    );

    return {
      totalBelumDibayar: formatIdrLike(sum.total),
      pokok: formatIdrLike(sum.pokok),
      bunga: formatIdrLike(sum.bunga),
      sisaPokok: formatIdrLike(sum.sisaPokok),
      sisaBunga: formatIdrLike(sum.sisaBunga),
    };
  }, [isPelunasan, rowsToShow]);

  const rowsToShowV1 = rowsToShow as unknown as BillingRowV1[];
  const useV1ForPenurunanBakiDebet = false;
  const alignNumbersForPenurunan = "";
  const compactRowsForView2 = isReguler || isKhusus || isPelunasan;

  const regulerTotals = React.useMemo(() => {
    if (!isReguler) return null;

    const sum = rowsToShow.reduce(
      (acc, r, idx) => {
        if (!(selected[idx] ?? false)) return acc;
        acc.pokok += parseNumLikeId(r.tagihanPokok);
        acc.bunga += parseNumLikeId(r.tagihanBunga);
        return acc;
      },
      { pokok: 0, bunga: 0 },
    );

    return {
      pokok: formatIdrLike(sum.pokok),
      bunga: formatIdrLike(sum.bunga),
    };
  }, [isReguler, rowsToShow, selected]);

  const totalsForSummary = React.useMemo(() => {
    if (isPenurunanBakiDebet) {
      const v = penurunanBakiDebetSisaText ?? "0";
      return { pokok: v, bunga: "0", denda: "0", total: v };
    }

    if (isKhusus) {
      return {
        pokok: formatIdrLike(khususTotals?.pokok ?? 0),
        bunga: formatIdrLike(khususTotals?.bunga ?? 0),
        denda: formatIdrLike(khususTotals?.denda ?? 0),
        total: formatIdrLike(khususTotals?.total ?? 0),
      };
    }

    if (isPelunasan) {
      return {
        pokok: pelunasanTotals?.pokok ?? "0",
        bunga: pelunasanTotals?.bunga ?? "0",
        denda: formatIdrLike(PELUNASAN_DENDA_FLAT),
        total: formatIdrLike(
          parseNumLikeId(pelunasanTotals?.totalBelumDibayar ?? "0") +
            PELUNASAN_DENDA_FLAT,
        ),
      };
    }

    if (isReguler) {
      const pokokN = parseNumLikeId(regulerTotals?.pokok ?? "0");
      const bungaN = parseNumLikeId(regulerTotals?.bunga ?? "0");
      const dendaN = selectedPenaltyTotal;

      return {
        pokok: regulerTotals?.pokok ?? "0",
        bunga: regulerTotals?.bunga ?? "0",
        denda: formatIdrLike(dendaN),
        total: formatIdrLike(pokokN + bungaN + dendaN),
      };
    }

    const denda = penaltyOnlyCols
      ? formatIdrLike(penaltyTotalExplicit ?? 0)
      : "0";

    const total = formatIdrLike(
      2455555 + (penaltyOnlyCols ? penaltyTotalExplicit ?? 0 : 0),
    );

    return { pokok: "0", bunga: "0", denda, total };
  }, [
    isKhusus,
    isPelunasan,
    isPenurunanBakiDebet,
    isReguler,
    khususTotals?.bunga,
    khususTotals?.denda,
    khususTotals?.pokok,
    khususTotals?.total,
    pelunasanTotals?.bunga,
    pelunasanTotals?.pokok,
    pelunasanTotals?.totalBelumDibayar,
    penaltyOnlyCols,
    penaltyTotalExplicit,
    penurunanBakiDebetSisaText,
    regulerTotals?.bunga,
    regulerTotals?.pokok,
    selectedPenaltyTotal,
  ]);

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

              <div
                className={cn(
                  compactRowsForView2
                    ? [
                        "[&_.bg-white.px-3.py-3]:!py-1.5",
                        "[&_.px-4.py-4]:!py-2",
                      ].join(" ")
                    : "",
                )}
              >
                <BillingTableView2
                  rows={rowsToShow}
                  selected={selected}
                  setSelected={setSelected}
                  isLocked={isReguler || isPelunasan || isPenurunanBakiDebet}
                  showNextBillInfo={!hideNextBillInfo}
                  showGraceInfo={showGraceInfo}
                  highlightGraceBlock={highlightGraceBlock}
                  keepGraceShellWithoutInfo={keepGraceShellWithoutInfo}
                  hideSelection={isPenurunanBakiDebet}
                  showPenaltyColumn={!isPenurunanBakiDebet}
                  disableRowActiveRing={true}
                  disableRowRings={isPenurunanBakiDebet}
                  penaltyIndexOffset={penaltyIndexOffset}
                  contextKey={nasabah.id}
                />
              </div>

              {usePaging ? (
                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="text-xs text-slate-700">
                    Menampilkan {showingStart} sampai {showingEnd} dari{" "}
                    {allRowsForMode.length} entri
                  </div>
                  <PaginationLikeView1
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
                mode={isPelunasan ? "pelunasan" : "regular"}
                totals={totalsForSummary}
                installment={{ ke: "10", lunas: "9", seharusnya: "9" }}
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