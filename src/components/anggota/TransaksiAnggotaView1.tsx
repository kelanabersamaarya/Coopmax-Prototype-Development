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

function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  if (pageCount <= 1) return null;

  const items: Array<number | "ellipsis"> = [];
  const push = (v: number | "ellipsis") => items.push(v);

  const first = 1;
  const last = pageCount;

  push(first);

  const around = 2;
  const left = Math.max(first + 1, page - around);
  const right = Math.min(last - 1, page + around);

  if (left > first + 1) push("ellipsis");
  for (let i = left; i <= right; i++) push(i);
  if (right < last - 1) push("ellipsis");

  if (last !== first) push(last);

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </button>

      <div className="flex items-center gap-1">
        {items.map((it, idx) => {
          if (it === "ellipsis") {
            return (
              <div
                key={`e-${idx}`}
                className="px-2 text-sm font-semibold text-slate-400"
              >
                …
              </div>
            );
          }
          const active = it === page;
          return (
            <button
              key={it}
              type="button"
              onClick={() => onPage(it)}
              className={cn(
                "h-9 w-9 rounded-xl text-sm font-semibold ring-1 transition",
                active
                  ? "bg-[hsl(var(--app-accent))] text-white ring-[hsl(var(--app-accent))]"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
              )}
            >
              {it}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        disabled={page === pageCount}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
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

  const [pageSize] = React.useState<number>(6);
  const [page, setPage] = React.useState<number>(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [jenisTransaksi, pageSize]);

  const pagedRows = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, pageSize]);

  const [selected, setSelected] = React.useState<boolean[]>(() =>
    pagedRows.map(() => false),
  );

  React.useEffect(() => {
    if (isPelunasan) {
      setSelected(pagedRows.map(() => true));
      return;
    }
    setSelected(pagedRows.map(() => false));
  }, [isPelunasan, pagedRows]);

  React.useEffect(() => {
    if (!isKhusus) return;
    const t = calcKhususSelectedTotals(pagedRows, selected);
    setNominalPokok(formatIdr0(t.pokok));
    setNominalBunga(formatIdr0(t.bunga));
    setNominalDenda(formatIdr0(t.denda));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKhusus, pagedRows, selected]);

  const hasAnySelected = React.useMemo(() => selected.some(Boolean), [selected]);

  const showGraceHighlight = !penaltyOnlyCols && !feeOnlyCols && page === 1;

  const selectedPenaltyTotal = React.useMemo(() => {
    if (!(isReguler || isKhusus || isPelunasan)) return 0;
    return calcSelectedPenaltyTotal(selected, pagedRows.length);
  }, [isKhusus, isPelunasan, isReguler, pagedRows.length, selected]);

  const selectedPenaltyText = React.useMemo(() => {
    return formatMoneyIdNoDecimals(selectedPenaltyTotal);
  }, [selectedPenaltyTotal]);

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
      penaltyOnlyCols
        ? penaltyTotalExplicit
        : isReguler
          ? selectedPenaltyTotal
          : 0;

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

  const pelunasanTotals = React.useMemo(() => {
    if (!isPelunasan) return null;

    const sum = pagedRows.reduce(
      (acc, r, idx) => {
        const checked = selected[idx] ?? false;
        if (!checked) return acc;

        acc.total += parseMoneyLikeId(r.totalBelumDibayar);
        acc.pokok += parseMoneyLikeId(r.tagihanPokok);
        acc.bunga += parseMoneyLikeId(r.tagihanBunga);
        acc.sisaPokok += parseMoneyLikeId(r.sisaPokok);
        acc.sisaBunga += parseMoneyLikeId(r.sisaBunga);
        return acc;
      },
      { total: 0, pokok: 0, bunga: 0, sisaPokok: 0, sisaBunga: 0 },
    );

    return {
      totalBelumDibayar: formatMoneyIdNoDecimals(sum.total),
      pokok: formatMoneyIdNoDecimals(sum.pokok),
      bunga: formatMoneyIdNoDecimals(sum.bunga),
      sisaPokok: formatMoneyIdNoDecimals(sum.sisaPokok),
      sisaBunga: formatMoneyIdNoDecimals(sum.sisaBunga),
    };
  }, [isPelunasan, pagedRows, selected]);

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

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_260px]">
            <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
              <div className="text-sm font-semibold text-slate-900">
                INFORMASI TAGIHAN DAN DENDA
              </div>

              <Separator className="my-3 w-full bg-slate-200/70" />

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
              />

              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-xs text-slate-600">
                  Menampilkan{" "}
                  {rows.length === 0 ? 0 : (page - 1) * pageSize + 1} sampai{" "}
                  {Math.min(rows.length, page * pageSize)} dari {rows.length} entri
                </div>
                <Pagination page={page} pageCount={pageCount} onPage={setPage} />
              </div>
            </Card>

            <div className="space-y-4">
              <BillSummaryCard
                mode={isPelunasan ? "pelunasan" : "regular"}
                hasAnySelected={hasAnySelected}
                totals={
                  isKhusus
                    ? {
                        pokok: formatMoneyIdNoDecimals(khususTotals?.pokok ?? 0),
                        bunga: formatMoneyIdNoDecimals(khususTotals?.bunga ?? 0),
                        denda: formatMoneyIdNoDecimals(khususTotals?.denda ?? 0),
                        total: formatMoneyIdNoDecimals(khususTotals?.total ?? 0),
                      }
                    : isPelunasan
                      ? {
                          pokok: pelunasanTotals?.pokok ?? "0",
                          bunga: pelunasanTotals?.bunga ?? "0",
                          denda: selectedPenaltyText,
                          total: formatMoneyIdNoDecimals(
                            parseMoneyLikeId(pelunasanTotals?.totalBelumDibayar ?? "0") +
                              selectedPenaltyTotal,
                          ),
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