"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AnggotaAccountTabs from "@/components/anggota/AnggotaAccountTabs";
import SectionHighlight from "@/components/anggota/SectionHighlight";
import SectionHighlightWide from "@/components/anggota/SectionHighlightWide";
import InformasiRekeningHeader from "@/components/anggota/InformasiRekeningHeader";
import TransactionFormCardView2, {
  type TransactionType,
} from "@/components/anggota/TransactionFormCardView2";
import BillSummaryCard from "@/components/anggota/BillSummaryCard";
import BillingTableView2 from "@/components/anggota/BillingTableView2";
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
import AksiDropdown from "@/components/anggota/view2/AksiDropdown";
import PaginationControls from "@/components/anggota/view2/PaginationControls";
import { useBillingRowsForMode } from "@/components/anggota/view2/useBillingRowsForMode";
import { useBillSelection } from "@/components/anggota/view2/useBillSelection";

type Props = {
  nasabah: {
    id: string;
    nama: string;
    noIdentitas: string;
    alamat: string;
  };
};

function parseNumLikeId(input: string) {
  const cleaned = input.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

const PELUNASAN_DENDA_FLAT = 215000;

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

  const billing = useBillingRowsForMode({ jenisTransaksi, pageSize: 6 });

  const { selected, setSelected } = useBillSelection({
    rowsToShow: billing.rowsToShow,
    isReguler: billing.isReguler,
    isKhusus: billing.isKhusus,
    isPelunasan: billing.isPelunasan,
    showAllRows: billing.showAllRows,
    isPenurunanBakiDebet: billing.isPenurunanBakiDebet,
  });

  React.useEffect(() => {
    if (!billing.isKhusus) return;
    const t = calcKhususSelectedTotals(billing.rowsToShow as any, selected);
    setNominalPokok(formatIdr0(t.pokok));
    setNominalBunga(formatIdr0(t.bunga));
    setNominalDenda(formatIdr0(t.denda));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billing.isKhusus, billing.rowsToShow, selected]);

  const penaltyTotalExplicit = React.useMemo(() => {
    if (!billing.penaltyOnlyCols) return null;
    return calcPenaltyTotal(billing.rowsToShow as any, selected);
  }, [billing.rowsToShow, billing.penaltyOnlyCols, selected]);

  const selectedPenaltyTotal = React.useMemo(() => {
    if (!(billing.isReguler || billing.isKhusus || billing.isPelunasan)) return 0;
    return calcSelectedPenaltyTotal(selected, billing.rowsToShow.length);
  }, [
    billing.isKhusus,
    billing.isPelunasan,
    billing.isReguler,
    billing.rowsToShow.length,
    selected,
  ]);

  const selectedPenaltyText = React.useMemo(
    () => formatIdrLike(selectedPenaltyTotal),
    [selectedPenaltyTotal],
  );

  const khususTotals = React.useMemo(() => {
    if (!billing.isKhusus) return null;
    return calcKhususTotalsFromRows(billing.rowsToShow as any);
  }, [billing.isKhusus, billing.rowsToShow]);

  const penurunanBakiDebetPokokTotal = React.useMemo(() => {
    if (!billing.isPenurunanBakiDebet) return null;

    return billing.rowsToShow.reduce((sum, r, idx) => {
      const checked = selected[idx] ?? false;
      if (!checked) return sum;
      return sum + parseNumLikeId(r.tagihanPokok);
    }, 0);
  }, [billing.isPenurunanBakiDebet, billing.rowsToShow, selected]);

  const penurunanBakiDebetPokokText = React.useMemo(() => {
    if (penurunanBakiDebetPokokTotal === null) return null;
    return formatIdrLike(penurunanBakiDebetPokokTotal);
  }, [penurunanBakiDebetPokokTotal]);

  const highlightGraceBlock =
    billing.isReguler ||
    billing.isKhusus ||
    (jenisTransaksi as any) === "Pembayaran Penurunan Plafon";

  const pelunasanTotals = React.useMemo(() => {
    if (!billing.isPelunasan) return null;

    const sum = billing.rowsToShow.reduce(
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
  }, [billing.isPelunasan, billing.rowsToShow]);

  const useV1ForPenurunanBakiDebet = false;
  const rowsToShowV1 = billing.rowsToShow as unknown as BillingRowV1[];

  const compactRowsForView2 =
    billing.isReguler || billing.isKhusus || billing.isPelunasan;

  // Force smaller vertical padding ONLY for penurunan baki debet
  const penurunanCompactOverride = billing.isPenurunanBakiDebet
    ? [
        // Cell wrappers in BillingTableView2 use "py-4/py-8/py-1.5" patterns.
        // We force any common vertical padding to be tighter.
        "[&_.py-4]:!py-1.5",
        "[&_.py-3]:!py-1.5",
        "[&_.py-2]:!py-1.5",
        // RowShell outer container default is "bg-white px-3 py-*"
        "[&_.bg-white.px-3.py-4]:!py-1.5",
        "[&_.bg-white.px-3.py-3]:!py-1.5",
        "[&_.bg-white.px-3.py-2]:!py-1.5",
      ].join(" ")
    : "";

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
              <AksiDropdown />
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
                  penurunanCompactOverride,
                )}
              >
                {billing.isReguler ? (
                  <BillingTableView2
                    rows={billing.rowsToShow}
                    selected={selected}
                    setSelected={setSelected}
                    isLocked={true}
                    showNextBillInfo={true}
                    showGraceInfo={true}
                    highlightGraceBlock={true}
                    hideSelection={false}
                    showPenaltyColumn={true}
                    disableRowActiveRing={true}
                    showNextBillInfo={true}
                  />
                ) : billing.isKhusus ? (
                  <BillingTableView2
                    rows={billing.rowsToShow}
                    selected={selected}
                    setSelected={setSelected}
                    isLocked={true}
                    showNextBillInfo={true}
                    showGraceInfo={true}
                    highlightGraceBlock={true}
                    hideSelection={false}
                    showPenaltyColumn={true}
                    disableRowActiveRing={true}
                  />
                ) : billing.isPelunasan ? (
                  <BillingTableView2
                    rows={billing.rowsToShow}
                    selected={selected}
                    setSelected={setSelected}
                    isLocked={true}
                    showNextBillInfo={false}
                    showGraceInfo={true}
                    highlightGraceBlock={true}
                    hideSelection={false}
                    showPenaltyColumn={true}
                    disableRowActiveRing={true}
                  />
                ) : billing.isPenurunanBakiDebet ? (
                  <BillingTableView2
                    rows={billing.rowsToShow}
                    selected={selected}
                    setSelected={setSelected}
                    isLocked={true}
                    showNextBillInfo={false}
                    showGraceInfo={true}
                    highlightGraceBlock={true}
                    hideSelection={true}
                    showPenaltyColumn={false}
                    disableRowRings
                    disableRowActiveRing
                    rowDensity="default"
                    tightRows={true}
                  />
                ) : useV1ForPenurunanBakiDebet ? (
                  <div className={cn("billing-table-compact", "[&_.text-slate-400]:hidden")}>
                    <BillingTable
                      rows={rowsToShowV1}
                      selected={selected}
                      setSelected={setSelected}
                      isPelunasan={false}
                      showGraceHighlight={true}
                      hideInterestCols={false}
                      hideSelection={true}
                      showPenaltyColumn={false}
                      rowDensity="roomy"
                      className="mt-0"
                    />
                  </div>
                ) : (
                  <BillingTableView2
                    rows={billing.rowsToShow}
                    selected={selected}
                    setSelected={setSelected}
                    isLocked={false}
                    showNextBillInfo={true}
                    showGraceInfo={true}
                    highlightGraceBlock={highlightGraceBlock}
                    hideSelection={
                      (jenisTransaksi as any) === "Pembayaran Penurunan Plafon"
                    }
                    showPenaltyColumn={false}
                  />
                )}
              </div>

              {billing.usePaging ? (
                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="text-xs text-slate-700">
                    Menampilkan {billing.showingStart} sampai {billing.showingEnd} dari{" "}
                    {billing.allRowsForMode.length} entri
                  </div>
                  <PaginationControls
                    page={billing.page}
                    pageCount={billing.pageCount}
                    onPage={billing.setPage}
                  />
                </div>
              ) : null}
            </Card>

            <div className="space-y-4 px-1">
              <BillSummaryCard
                mode={billing.isPelunasan ? "pelunasan" : "regular"}
                totals={
                  billing.isKhusus
                    ? {
                        pokok: formatIdrLike(khususTotals?.pokok ?? 0),
                        bunga: formatIdrLike(khususTotals?.bunga ?? 0),
                        denda: formatIdrLike(khususTotals?.denda ?? 0),
                        total: formatIdrLike(khususTotals?.total ?? 0),
                      }
                    : billing.isPelunasan
                      ? {
                          pokok: pelunasanTotals?.pokok ?? "0",
                          bunga: pelunasanTotals?.bunga ?? "0",
                          denda: formatIdrLike(PELUNASAN_DENDA_FLAT),
                          total: formatIdrLike(
                            parseNumLikeId(pelunasanTotals?.totalBelumDibayar ?? "0") +
                              PELUNASAN_DENDA_FLAT,
                          ),
                        }
                      : {
                          pokok: billing.isPenurunanBakiDebet
                            ? penurunanBakiDebetPokokText ?? "0"
                            : "2.455.555",
                          bunga: "0",
                          denda: billing.penaltyOnlyCols
                            ? formatIdrLike(penaltyTotalExplicit ?? 0)
                            : billing.isReguler
                              ? selectedPenaltyText
                              : "0",
                          total: billing.isPenurunanBakiDebet
                            ? penurunanBakiDebetPokokText ?? "0"
                            : formatIdrLike(
                                2455555 +
                                  (billing.penaltyOnlyCols
                                    ? penaltyTotalExplicit ?? 0
                                    : billing.isReguler
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