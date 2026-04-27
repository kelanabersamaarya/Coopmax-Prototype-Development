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

type Props = {
  nasabah: {
    id: string;
    nama: string;
    noIdentitas: string;
    alamat: string;
  };
};

const currentBill: BillingRow = {
  jatuhTempo: "25-01-2026",
  totalBelumDibayar: "916.667",
  tagihanPokok: "833.333",
  tagihanBunga: "83.333",
  sisaPokok: "783.333",
  sisaBunga: "26.389",
};

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

function parseNumLikeId(input: string) {
  const cleaned = input.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export default function TransaksiAnggotaView2({ nasabah }: Props) {
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

  const isReguler =
    jenisTransaksi === "Pembayaran Reguler" ||
    (jenisTransaksi as any) === "Bayar Reguler";

  const isKhusus = jenisTransaksi === "Pembayaran Khusus";

  const penaltyOnlyCols = jenisTransaksi === "Pembayaran Denda";
  const feeOnlyCols = jenisTransaksi === "Pembayaran Biaya Lainnya";
  const showAllRows = penaltyOnlyCols || feeOnlyCols;

  const isPenurunanPlafon =
    (jenisTransaksi as any) === "Pembayaran Penurunan Plafon";
  const isPenurunanBakiDebet =
    jenisTransaksi === "Pembayaran Penurunan Baki Debet";

  // Reguler View2/3: hanya 1 tagihan, tetapi tampilannya pakai BillingTableView2 (sesuai contoh).
  const rowsToShow: BillingRow[] = isReguler
    ? [currentBill]
    : isPelunasan
      ? upcomingRows
      : showAllRows
        ? upcomingRows
        : isKhusus
          ? [currentBill]
          : [currentBill];

  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rowsToShow.map(() => false),
  );

  React.useEffect(() => {
    if (isReguler) {
      setSelected(rowsToShow.map(() => true));
      return;
    }
    if (isPelunasan || showAllRows) {
      setSelected(rowsToShow.map(() => true));
      return;
    }
    setSelected(rowsToShow.map(() => true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReguler, isPelunasan, showAllRows, rowsToShow.length]);

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

  const penurunanBakiDebetPokokTotal = React.useMemo(() => {
    if (!isPenurunanBakiDebet) return null;

    return rowsToShow.reduce((sum, r, idx) => {
      const checked = selected[idx] ?? true;
      if (!checked) return sum;
      return sum + parseNumLikeId(r.tagihanPokok);
    }, 0);
  }, [isPenurunanBakiDebet, rowsToShow, selected]);

  const penurunanBakiDebetPokokText = React.useMemo(() => {
    if (penurunanBakiDebetPokokTotal === null) return null;
    return formatIdrLike(penurunanBakiDebetPokokTotal);
  }, [penurunanBakiDebetPokokTotal]);

  const showGraceInfo = true;

  // Reguler sesuai contoh: tampilkan block grace period (highlight) walaupun row cuma 1.
  const highlightGraceBlock = isReguler || isKhusus || isPenurunanPlafon;

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

  const useTableLikeScreenshotForPenurunanBakiDebet = isPenurunanBakiDebet;

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
                  value: "Jadwal Fleksibel & Tagihan Berkala",
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

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_260px]">
            <Card className="min-w-0 rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
              <div className="text-sm font-semibold text-slate-900">
                INFORMASI TAGIHAN DAN DENDA
              </div>

              <Separator className="my-3 bg-slate-200/70" />

              {isReguler ? (
                <BillingTableView2
                  rows={rowsToShow}
                  selected={selected}
                  setSelected={setSelected}
                  isLocked={true}
                  showNextBillInfo={true}
                  showGraceInfo={true}
                  highlightGraceBlock={true}
                  hideSelection={false}
                  showPenaltyColumn={false}
                  disableRowActiveRing={true}
                />
              ) : isPelunasan ? (
                <BillingTable
                  rows={rowsToShowV1}
                  selected={selected}
                  setSelected={setSelected}
                  isPelunasan={true}
                  showGraceHighlight={true}
                  hideInterestCols={false}
                  className="mt-0"
                />
              ) : useTableLikeScreenshotForPenurunanBakiDebet ? (
                <BillingTable
                  rows={rowsToShowV1}
                  selected={selected}
                  setSelected={setSelected}
                  isPelunasan={false}
                  showGraceHighlight={true}
                  hideInterestCols={false}
                  hideSelection={true}
                  className="mt-0"
                />
              ) : isKhusus ? (
                <BillingTable
                  rows={rowsToShowV1}
                  selected={selected}
                  setSelected={setSelected}
                  isPelunasan={false}
                  showGraceHighlight={true}
                  hideInterestCols={false}
                  className="mt-0"
                />
              ) : (
                <BillingTableView2
                  rows={rowsToShow}
                  selected={selected}
                  setSelected={setSelected}
                  isLocked={isPelunasan}
                  showNextBillInfo={true}
                  showGraceInfo={showGraceInfo}
                  highlightGraceBlock={highlightGraceBlock}
                  hideSelection={isPenurunanPlafon || isPenurunanBakiDebet}
                  showPenaltyColumn={false}
                />
              )}

              <div className="sr-only">
                <Info />
              </div>
            </Card>

            <div className="space-y-4">
              <BillSummaryCard
                mode={isPelunasan ? "pelunasan" : "regular"}
                totals={
                  isKhusus
                    ? {
                        pokok: formatIdrLike(khususTotals?.pokok ?? 0),
                        bunga: formatIdrLike(khususTotals?.bunga ?? 0),
                        denda: formatIdrLike(khususTotals?.denda ?? 0),
                        total: formatIdrLike(khususTotals?.total ?? 0),
                      }
                    : isPelunasan
                      ? {
                          pokok: pelunasanTotals?.pokok ?? "0",
                          bunga: pelunasanTotals?.bunga ?? "0",
                          denda: selectedPenaltyText,
                          total: formatIdrLike(
                            parseNumLikeId(pelunasanTotals?.totalBelumDibayar ?? "0") +
                              selectedPenaltyTotal,
                          ),
                        }
                      : {
                          pokok: isPenurunanBakiDebet
                            ? penurunanBakiDebetPokokText ?? "0"
                            : "2.455.555",
                          bunga: "0",
                          denda: penaltyOnlyCols
                            ? formatIdrLike(penaltyTotalExplicit ?? 0)
                            : isReguler
                              ? selectedPenaltyText
                              : "0",
                          total: isPenurunanBakiDebet
                            ? penurunanBakiDebetPokokText ?? "0"
                            : formatIdrLike(
                                2455555 +
                                  (penaltyOnlyCols
                                    ? penaltyTotalExplicit ?? 0
                                    : isReguler
                                      ? selectedPenaltyTotal
                                      : 0),
                              ),
                        }
                }
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