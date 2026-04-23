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
import BillingTablePelunasanView2 from "@/components/anggota/BillingTablePelunasanView2";
import {
  calcPenaltyTotal,
  formatIdrLike,
} from "@/components/anggota/calc-penalties";

type Props = {
  nasabah: {
    id: string;
    nama: string;
    noIdentitas: string;
    alamat: string;
  };
};

const currentBill: BillingRow = {
  jatuhTempo: "25-03-2026",
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

  const penaltyOnlyCols = jenisTransaksi === "Pembayaran Denda";
  const feeOnlyCols = jenisTransaksi === "Pembayaran Biaya Lainnya";
  const showAllRows = penaltyOnlyCols || feeOnlyCols;

  const isKhusus = jenisTransaksi === "Pembayaran Khusus";
  const isPenurunanPlafon = jenisTransaksi === "Pembayaran Penurunan Plafon";
  const isPenurunanBakiDebet = jenisTransaksi === "Pembayaran Penurunan Baki Debet";

  const rowsToShow: BillingRow[] = isReguler
    ? [currentBill]
    : isPelunasan
      ? upcomingRows
      : showAllRows
        ? upcomingRows
        : [currentBill];

  const [selected, setSelected] = React.useState<boolean[]>(() =>
    rowsToShow.map(() => false),
  );

  React.useEffect(() => {
    // REGULER (View2/3): tagihan langsung tercentang
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

  const penaltyTotal = React.useMemo(() => {
    if (!penaltyOnlyCols) return null;
    return calcPenaltyTotal(rowsToShow as any, selected);
  }, [rowsToShow, penaltyOnlyCols, selected]);

  const showGraceInfo = true;

  // highlight biru di mode-mode ini
  const highlightGraceBlock = isReguler || isKhusus || isPenurunanPlafon;

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

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="min-w-0 rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
              <div className="text-sm font-semibold text-slate-900">
                INFORMASI TAGIHAN DAN DENDA
              </div>

              <Separator className="my-3 bg-slate-200/70" />

              {isPelunasan ? (
                <BillingTablePelunasanView2 rows={rowsToShow as any} />
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
                />
              )}

              <div className="sr-only">
                <Info />
              </div>
            </Card>

            <div className="space-y-4">
              <BillSummaryCard
                mode={isPelunasan ? "pelunasan" : "regular"}
                totals={{
                  pokok: "2.455.555",
                  bunga: "0",
                  denda: penaltyOnlyCols
                    ? formatIdrLike(penaltyTotal ?? 0)
                    : "0",
                  total: "2.455.555",
                }}
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