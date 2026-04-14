"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Info,
  ChevronUp,
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
import GracePeriodInfoRow from "@/components/anggota/GracePeriodInfoRow";
import AnggotaTablePagination from "@/components/anggota/AnggotaTablePagination";
import UpcomingBillsAccordionView2, {
  type BillRow,
} from "@/components/anggota/UpcomingBillsAccordionView2";
import TransactionFormCardView2, {
  type TransactionType,
} from "@/components/anggota/TransactionFormCardView2";

type Props = {
  nasabah: {
    id: string;
    nama: string;
    noIdentitas: string;
    alamat: string;
  };
};

const currentBill: BillRow = {
  jatuhTempo: "25-01-2026",
  totalBelumDibayar: "916.667",
  tagihanPokok: "833.333",
  tagihanBunga: "83.333",
  sisaPokok: "783.333",
  sisaBunga: "26.389",
};

const upcomingRows: BillRow[] = [
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
  const [jenisTransaksi, setJenisTransaksi] =
    React.useState<TransactionType>("Pembayaran Angsuran");
  const [kolektor, setKolektor] = React.useState<string>("Pilih Kolektor");

  const [nominal, setNominal] = React.useState("0");
  const [nominalPokok, setNominalPokok] = React.useState("0");
  const [nominalBunga, setNominalBunga] = React.useState("0");
  const [nominalDenda, setNominalDenda] = React.useState("0");

  const [tabungan, setTabungan] = React.useState("Tanpa Tabungan");
  const [keterangan, setKeterangan] = React.useState("");

  const [openUpcoming, setOpenUpcoming] = React.useState(false);

  const isPelunasan = jenisTransaksi === "Pelunasan";
  const billsInMainTable = isPelunasan ? upcomingRows : [currentBill];

  const [pageSize] = React.useState<number>(6);
  const [page, setPage] = React.useState<number>(1);
  const pageCount = Math.max(1, Math.ceil(billsInMainTable.length / pageSize));

  React.useEffect(() => {
    setPage(1);
  }, [isPelunasan, pageSize]);

  const pagedBillsInMainTable = React.useMemo(() => {
    if (!isPelunasan) return billsInMainTable;
    const start = (page - 1) * pageSize;
    return billsInMainTable.slice(start, start + pageSize);
  }, [billsInMainTable, isPelunasan, page, pageSize]);

  const [selected, setSelected] = React.useState<boolean[]>(
    () => billsInMainTable.map(() => false),
  );

  React.useEffect(() => {
    if (isPelunasan) {
      setSelected(billsInMainTable.map(() => true));
    } else {
      setSelected(billsInMainTable.map(() => false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPelunasan]);

  React.useEffect(() => {
    setSelected((prev) => {
      const next = billsInMainTable.map((_, idx) => prev[idx] ?? false);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billsInMainTable.length]);

  const allChecked = React.useMemo(
    () => selected.length > 0 && selected.every(Boolean),
    [selected],
  );
  const anyChecked = React.useMemo(() => selected.some(Boolean), [selected]);
  const headerCheckboxRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate =
      !isPelunasan && anyChecked && !allChecked;
  }, [allChecked, anyChecked, isPelunasan]);

  const thClass = "px-1 py-2.5";
  const tdClass = "px-1 py-2.5";
  const edgePadLeft = "pl-3";
  const edgePadRight = "pr-3";

  return (
    <div className="w-full px-0 sm:px-1 md:px-2">
      <div className="space-y-5">
        <AnggotaAccountTabs active="pinjaman" onChange={() => {}} />

        <div className="space-y-4">
          <SectionHighlight title="Informasi Rekening" />

          {/* HEADER: samakan persis seperti View 1 (tanpa max-w) */}
          <div className="relative">
            <InformasiRekeningHeader
              title="PINJAMAN BILLING"
              items={[
                { label: "No. Rekening Pinjaman", value: "SMG260004" },
                {
                  label: "Skema Tagihan",
                  value: "Tagihan Sesuai Jadwal Angsuran",
                },
                { label: "Satuan Grace Period", value: "Bulan" },
                { label: "Durasi Grace Period", value: "3" },
                { label: "Sisa Pokok Pinjaman", value: "10.000.000,00" },
              ]}
            />

            <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-9 rounded-full bg-white px-3 text-slate-900 ring-1 ring-white/60 hover:bg-white/90">
                    Aksi <ChevronDown className="ml-2 h-4 w-4 text-slate-600" />
                  </Button>
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

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
              <div className="text-sm font-semibold text-slate-900">
                INFORMASI TAGIHAN DAN DENDA
              </div>

              <Separator className="my-3 bg-slate-200/70" />

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                {!isPelunasan ? (
                  <>
                    <div className="font-semibold text-slate-900">
                      TAGIHAN SAAT INI
                    </div>

                    <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                          <Info className="h-4 w-4" />
                        </span>
                        <div className="leading-relaxed text-slate-700">
                          Berikut ini merupakan tagihan yang sudah dapat
                          dibayarkan pada periode ini serta harus dibayarkan
                          sebelum tanggal jatuh tempo
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="mt-3 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                  <div className="overflow-auto">
                    <table className="w-full min-w-[540px] border-collapse text-[13px]">
                      <thead className="bg-white">
                        <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                          <th className={cn("w-[30px]", thClass, edgePadLeft)}>
                            <input
                              ref={headerCheckboxRef}
                              type="checkbox"
                              aria-label="Pilih semua"
                              checked={isPelunasan ? true : allChecked}
                              disabled={isPelunasan}
                              onChange={(e) => {
                                const next = e.target.checked;
                                setSelected(billsInMainTable.map(() => next));
                              }}
                            />
                          </th>
                          <th className={cn("w-[104px]", thClass)}>Jatuh Tempo</th>
                          <th className={cn("w-[146px]", thClass)}>
                            Total Tagihan Belum Dibayar
                          </th>
                          <th className={cn("w-[98px]", thClass)}>Tagihan Pokok</th>
                          <th className={cn("w-[98px]", thClass)}>Tagihan Bunga</th>
                          <th className={cn("w-[108px]", thClass)}>
                            Sisa Tagihan Pokok
                          </th>
                          <th className={cn("w-[108px]", thClass, edgePadRight)}>
                            Sisa Tagihan Bunga
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white">
                        <GracePeriodInfoRow colSpan={7} />

                        {pagedBillsInMainTable.map((bill, idx) => {
                          const realIdx = isPelunasan
                            ? (page - 1) * pageSize + idx
                            : idx;

                          return (
                            <tr
                              key={`${bill.jatuhTempo}-${realIdx}`}
                              className="border-t border-slate-100 text-sm"
                            >
                              <td className={cn(tdClass, edgePadLeft)}>
                                <input
                                  type="checkbox"
                                  aria-label="Pilih tagihan"
                                  checked={
                                    isPelunasan ? true : selected[realIdx] ?? false
                                  }
                                  disabled={isPelunasan}
                                  onChange={(e) => {
                                    const next = e.target.checked;
                                    setSelected((prev) => {
                                      const copy = [...prev];
                                      copy[realIdx] = next;
                                      return copy;
                                    });
                                  }}
                                />
                              </td>
                              <td className={cn(tdClass, "font-medium text-slate-900")}>
                                {bill.jatuhTempo}
                              </td>
                              <td
                                className={cn(
                                  tdClass,
                                  "text-right tabular-nums text-slate-800",
                                )}
                              >
                                {bill.totalBelumDibayar}
                              </td>
                              <td
                                className={cn(
                                  tdClass,
                                  "text-right tabular-nums text-slate-800",
                                )}
                              >
                                {bill.tagihanPokok}
                              </td>
                              <td
                                className={cn(
                                  tdClass,
                                  "text-right tabular-nums text-slate-800",
                                )}
                              >
                                {bill.tagihanBunga}
                              </td>
                              <td
                                className={cn(
                                  tdClass,
                                  "text-right tabular-nums text-slate-800",
                                )}
                              >
                                {bill.sisaPokok}
                              </td>
                              <td
                                className={cn(
                                  tdClass,
                                  edgePadRight,
                                  "text-right tabular-nums text-slate-800",
                                )}
                              >
                                {bill.sisaBunga}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {isPelunasan ? (
                  <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="text-xs text-slate-600">
                      Menampilkan{" "}
                      {billsInMainTable.length === 0
                        ? 0
                        : (page - 1) * pageSize + 1}{" "}
                      sampai{" "}
                      {Math.min(billsInMainTable.length, page * pageSize)} dari{" "}
                      {billsInMainTable.length} entri
                    </div>
                    <AnggotaTablePagination
                      page={page}
                      pageCount={pageCount}
                      onPage={setPage}
                    />
                  </div>
                ) : null}
              </div>

              {!isPelunasan ? (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenUpcoming((v) => !v)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-900"
                    aria-expanded={openUpcoming}
                  >
                    <span className="uppercase tracking-wide">
                      Perkiraan Tagihan Mendatang
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition",
                        openUpcoming ? "rotate-0" : "rotate-180",
                      )}
                      aria-hidden="true"
                    >
                      <ChevronUp className="h-4.5 w-4.5" />
                    </span>
                  </button>

                  <div
                    className={cn("px-4 pb-4", openUpcoming ? "block" : "hidden")}
                  >
                    <UpcomingBillsAccordionView2
                      open={openUpcoming}
                      rows={upcomingRows}
                    />
                  </div>
                </div>
              ) : null}
            </Card>

            <div className="space-y-4">
              <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
                <div className="text-sm font-semibold text-slate-900">
                  RINGKASAN TAGIHAN
                </div>
                <Separator className="my-3 bg-slate-200/70" />
                <div className="space-y-2 text-sm">
                  {[
                    ["Total Pokok", "2.500.000"],
                    ["Total Bunga", "208.333"],
                    ["Total Denda", "0"],
                    ["Total Tagihan", "2.708.333"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="text-slate-600">{k}</div>
                      <div className="font-semibold text-slate-900">{v}</div>
                    </div>
                  ))}

                  <Separator className="my-3 bg-slate-200/70" />

                  {[
                    ["Angsuran Ke", "1"],
                    ["Angsuran Lunas", "0"],
                    ["Angsuran Seharusnya", "0"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="text-slate-600">{k}</div>
                      <div className="font-semibold text-slate-900">{v}</div>
                    </div>
                  ))}
                </div>
              </Card>

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