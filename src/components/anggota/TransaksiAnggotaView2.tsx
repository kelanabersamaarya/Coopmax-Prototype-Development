"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  CheckSquare,
  FileText,
  Info,
  Printer,
  ReceiptText,
  ScrollText,
  ChevronUp,
  ChevronDown,
  History,
  Calculator,
  BookOpenText,
} from "lucide-react";
import AnggotaAccountTabs from "@/components/anggota/AnggotaAccountTabs";
import SectionHighlight from "@/components/anggota/SectionHighlight";
import InformasiRekeningHeader from "@/components/anggota/InformasiRekeningHeader";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  nasabah: {
    id: string;
    nama: string;
    noIdentitas: string;
    alamat: string;
  };
};

type Row = {
  jatuhTempo: string;
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
};

const currentBill: Row = {
  jatuhTempo: "25-01-2026",
  totalBelumDibayar: "916.667",
  tagihanPokok: "833.333",
  tagihanBunga: "83.333",
  sisaPokok: "783.333",
  sisaBunga: "26.389",
};

const upcomingRows: Row[] = [
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

const transactionTypes = [
  "Pembayaran Angsuran",
  "Pembayaran Rincian Tagihan",
  "Pelunasan",
] as const;

type TransactionType = (typeof transactionTypes)[number];

function parseAmount(input: string) {
  const cleaned = input.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatIdrLike(n: number) {
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function GracePeriodRow({ colSpan }: { colSpan: number }) {
  return (
    <tr className="border-t border-slate-200">
      <td colSpan={colSpan} className="px-1 py-2.5">
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-slate-800">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Info className="h-4 w-4" />
            </span>
            <div>
              <div className="font-semibold">Periode Grace Period</div>
              <div className="mt-0.5 text-slate-700">
                Berikut ini merupakan periode tagihan pinjaman yang termasuk ke
                dalam grace period. Selama periode grace period nasabah hanya
                membayar bunga.
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

function UpcomingBillsAccordion({ open }: { open: boolean }) {
  if (!open) return null;

  const thClass = "px-1 py-2.5";
  const tdClass = "px-1 py-2.5";
  const edgePadLeft = "pl-3";
  const edgePadRight = "pr-3";

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="p-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Info className="h-4 w-4" />
            </span>
            <div className="leading-relaxed">
              Berikut ini merupakan perkiraan tagihan untuk periode mendatang.
              Nominal tagihan dapat berubah jika ada transaksi pembayaran atau
              terjadi perubahan pada pinjaman.
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full min-w-[520px] border-collapse text-[13px]">
          <thead className="bg-white">
            <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-700">
              <th className={cn("w-[104px]", thClass, edgePadLeft)}>
                Jatuh Tempo
              </th>
              <th className={cn("w-[146px]", thClass)}>
                Total Tagihan Belum Dibayar
              </th>
              <th className={cn("w-[98px]", thClass)}>Tagihan Pokok</th>
              <th className={cn("w-[98px]", thClass)}>Tagihan Bunga</th>
              <th className={cn("w-[108px]", thClass)}>Sisa Tagihan Pokok</th>
              <th className={cn("w-[108px]", thClass, edgePadRight)}>
                Sisa Tagihan Bunga
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            <GracePeriodRow colSpan={6} />
            {upcomingRows.map((r, idx) => (
              <tr key={idx} className="border-t border-slate-200 text-sm">
                <td
                  className={cn(
                    tdClass,
                    edgePadLeft,
                    "font-medium text-slate-900",
                  )}
                >
                  {r.jatuhTempo}
                </td>
                <td
                  className={cn(tdClass, "text-right tabular-nums text-slate-800")}
                >
                  {r.totalBelumDibayar}
                </td>
                <td
                  className={cn(tdClass, "text-right tabular-nums text-slate-800")}
                >
                  {r.tagihanPokok}
                </td>
                <td
                  className={cn(tdClass, "text-right tabular-nums text-slate-800")}
                >
                  {r.tagihanBunga}
                </td>
                <td
                  className={cn(tdClass, "text-right tabular-nums text-slate-800")}
                >
                  {r.sisaPokok}
                </td>
                <td
                  className={cn(
                    tdClass,
                    edgePadRight,
                    "text-right tabular-nums text-slate-800",
                  )}
                >
                  {r.sisaBunga}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
      <Button
        variant="outline"
        className="h-9 rounded-xl border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
        disabled={page === 1}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        Sebelumnya
      </Button>

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

      <Button
        variant="outline"
        className="h-9 rounded-xl border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
        disabled={page === pageCount}
        onClick={() => onPage(Math.min(pageCount, page + 1))}
      >
        Selanjutnya
      </Button>
    </div>
  );
}

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
  const isRincian = jenisTransaksi === "Pembayaran Rincian Tagihan";
  const nominalPelunasan = "9.625.000";

  const totalRincian = React.useMemo(() => {
    return (
      parseAmount(nominalPokok) +
      parseAmount(nominalBunga) +
      parseAmount(nominalDenda)
    );
  }, [nominalBunga, nominalDenda, nominalPokok]);

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

  const billingActionBtn =
    "h-9 rounded-xl bg-white text-[#0f8f9f] ring-1 ring-white/70 hover:bg-white/90";

  const thClass = "px-1 py-2.5";
  const tdClass = "px-1 py-2.5";
  const edgePadLeft = "pl-3";
  const edgePadRight = "pr-3";

  return (
    <div className="space-y-5">
      <AnggotaAccountTabs active="pinjaman" onChange={() => {}} />

      <div className="space-y-4">
        <SectionHighlight title="Informasi Tagihan & Denda" />

        <div className="relative">
          <InformasiRekeningHeader
            title="PINJAMAN BILLING"
            items={[
              { label: "Kode Pinjaman", value: "SMG260004" },
              { label: "Sektor Pinjaman", value: "Umum" },
              { label: "Tujuan Pinjaman", value: "Konsumtif" },
              {
                label: "Kolektor",
                value: kolektor === "Pilih Kolektor" ? "-" : kolektor,
              },
              { label: "Tanggal Dibuat", value: "07 Apr 2026" },
              { label: "Tanggal Jatuh Tempo", value: "07 Apr 2027" },
              { label: "Tanggal Transaksi Terakhir", value: "07 Apr 2026" },
              { label: "Selisih Tanggal Transaksi", value: "6 Hari" },
              { label: "Periode Waktu", value: "12 Bulan" },
              { label: "Metode Bunga Pinjaman", value: "Bunga Efektif" },
              { label: "Sisa Pinjaman", value: "11.000.000,00" },
              { label: "Total Harus Bayar", value: "1.120.000,00" },
            ]}
          />

          <div className="absolute right-4 top-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className={billingActionBtn}>
                  Aksi <ChevronDown className="ml-2 h-4 w-4 text-[#0f8f9f]" />
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

        <div className="grid gap-4 lg:grid-cols-[1fr_320px_180px]">
          <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur">
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
                        Berikut ini merupakan tagihan yang sudah dapat dibayarkan
                        pada periode ini serta harus dibayarkan sebelum tanggal
                        jatuh tempo
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {isPelunasan ? (
                <>
                  <div className="mt-0 overflow-hidden rounded-2xl ring-1 ring-slate-200">
                    <div className="overflow-auto">
                      <table className="w-full min-w-[540px] border-collapse text-[13px]">
                        <thead className="bg-white">
                          <tr className="text-left text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                            <th className={cn("w-[30px]", thClass, edgePadLeft)}>
                              <input
                                ref={headerCheckboxRef}
                                type="checkbox"
                                aria-label="Pilih semua"
                                checked={true}
                                disabled={true}
                                onChange={() => {}}
                              />
                            </th>
                            <th className={cn("w-[104px]", thClass)}>
                              Jatuh Tempo
                            </th>
                            <th className={cn("w-[146px]", thClass)}>
                              Total Tagihan Belum Dibayar
                            </th>
                            <th className={cn("w-[98px]", thClass)}>
                              Tagihan Pokok
                            </th>
                            <th className={cn("w-[98px]", thClass)}>
                              Tagihan Bunga
                            </th>
                            <th className={cn("w-[108px]", thClass)}>
                              Sisa Tagihan Pokok
                            </th>
                            <th
                              className={cn("w-[108px]", thClass, edgePadRight)}
                            >
                              Sisa Tagihan Bunga
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white">
                          <GracePeriodRow colSpan={7} />

                          {pagedBillsInMainTable.map((bill, idx) => {
                            const realIdx = (page - 1) * pageSize + idx;
                            return (
                              <tr
                                key={`${bill.jatuhTempo}-${realIdx}`}
                                className="border-t border-slate-100 text-sm"
                              >
                                <td className={cn(tdClass, edgePadLeft)}>
                                  <input
                                    type="checkbox"
                                    aria-label="Pilih tagihan"
                                    checked={true}
                                    disabled={true}
                                    onChange={() => {}}
                                  />
                                </td>
                                <td
                                  className={cn(
                                    tdClass,
                                    "font-medium text-slate-900",
                                  )}
                                >
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
                    <Pagination page={page} pageCount={pageCount} onPage={setPage} />
                  </div>
                </>
              ) : (
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
                              checked={allChecked}
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
                        <GracePeriodRow colSpan={7} />

                        {pagedBillsInMainTable.map((bill, idx) => {
                          const realIdx = idx;
                          return (
                            <tr
                              key={`${bill.jatuhTempo}-${realIdx}`}
                              className="border-t border-slate-200 text-sm"
                            >
                              <td className={cn(tdClass, edgePadLeft)}>
                                <input
                                  type="checkbox"
                                  aria-label="Pilih tagihan"
                                  checked={selected[realIdx] ?? false}
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
                              <td
                                className={cn(
                                  tdClass,
                                  "font-medium text-slate-900",
                                )}
                              >
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
              )}
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
                  <UpcomingBillsAccordion open={openUpcoming} />
                </div>
              </div>
            ) : null}
          </Card>

          <div className="space-y-4">
            <div className="space-y-3">
              <SectionHighlight title="Pembayaran Angsuran" />
              <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur">
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
            </div>

            <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur">
              <div className="text-sm font-semibold text-slate-900">TRANSAKSI</div>
              <Separator className="my-3 bg-slate-200/70" />

              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label className="text-xs text-slate-600">
                    {isPelunasan
                      ? "Tanggal Efektif Pelunasan*"
                      : "Tanggal Efektif Bayar*"}
                  </Label>
                  <div className="relative">
                    <Input
                      value={tanggalEfektif}
                      onChange={(e) => setTanggalEfektif(e.target.value)}
                      className="h-10 rounded-xl border-slate-200 bg-white pr-10"
                    />
                    <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label className="text-xs text-slate-600">Jenis Transaksi*</Label>
                  <Select
                    value={jenisTransaksi}
                    onValueChange={(v) => setJenisTransaksi(v as TransactionType)}
                  >
                    <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                      {transactionTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label className="text-xs text-slate-600">Kolektor*</Label>
                  <Select value={kolektor} onValueChange={setKolektor}>
                    <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                      <SelectItem value="Pilih Kolektor">Pilih Kolektor</SelectItem>
                      <SelectItem value="Kolektor A">Kolektor A</SelectItem>
                      <SelectItem value="Kolektor B">Kolektor B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isRincian ? (
                  <>
                    <div className="grid gap-1.5">
                      <Label className="text-xs text-slate-600">
                        Nominal Pokok*
                      </Label>
                      <Input
                        value={nominalPokok}
                        onChange={(e) => setNominalPokok(e.target.value)}
                        inputMode="numeric"
                        className="h-10 rounded-xl border-slate-200 bg-white text-right"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label className="text-xs text-slate-600">
                        Nominal Bunga*
                      </Label>
                      <Input
                        value={nominalBunga}
                        onChange={(e) => setNominalBunga(e.target.value)}
                        inputMode="numeric"
                        className="h-10 rounded-xl border-slate-200 bg-white text-right"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label className="text-xs text-slate-600">
                        Nominal Denda*
                      </Label>
                      <Input
                        value={nominalDenda}
                        onChange={(e) => setNominalDenda(e.target.value)}
                        inputMode="numeric"
                        className="h-10 rounded-xl border-slate-200 bg-white text-right"
                      />
                    </div>
                  </>
                ) : (
                  <div className="grid gap-1.5">
                    <Label className="text-xs text-slate-600">
                      {isPelunasan ? "Nominal Pelunasan*" : "Nominal Pembayaran*"}
                    </Label>

                    {isPelunasan ? (
                      <div className="flex h-10 items-center justify-end rounded-xl bg-slate-200 px-4 text-right text-lg font-semibold text-slate-700 ring-1 ring-slate-200">
                        {nominalPelunasan}
                      </div>
                    ) : (
                      <Input
                        value={nominal}
                        onChange={(e) => setNominal(e.target.value)}
                        inputMode="numeric"
                        className="h-10 rounded-xl border-slate-200 bg-white text-right"
                      />
                    )}
                  </div>
                )}

                <div className="grid gap-1.5">
                  <Label className="text-xs text-slate-600">Tabungan</Label>
                  <Select value={tabungan} onValueChange={setTabungan}>
                    <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200">
                      <SelectItem value="Tanpa Tabungan">Tanpa Tabungan</SelectItem>
                      <SelectItem value="Tabungan 01">Tabungan 01</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label className="text-xs text-slate-600">Keterangan</Label>
                  <Input
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className="h-10 rounded-xl border-slate-200 bg-white"
                  />
                </div>

                {isRincian ? (
                  <div className="pt-1">
                    <div className="text-xs font-semibold text-slate-600">
                      Total Pembayaran
                    </div>
                    <div className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                      {formatIdrLike(totalRincian)},00
                    </div>
                  </div>
                ) : null}

                <Button className="mt-1 h-10 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Bayar Tagihan
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            <SectionHighlight title="Aksi" />
            <div className="space-y-2">
              <Button className="h-10 w-full justify-start rounded-xl bg-slate-700 text-white hover:bg-slate-800">
                <ReceiptText className="mr-2 h-4 w-4" />
                Cetak Kwitansi
              </Button>
              <Button className="h-10 w-full justify-start rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                <Printer className="mr-2 h-4 w-4" />
                Cetak Buku
              </Button>
              <Button className="h-10 w-full justify-start rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                <FileText className="mr-2 h-4 w-4" />
                Cetak Buku
              </Button>
              <Button className="h-10 w-full justify-start rounded-xl bg-green-600 text-white hover:bg-green-700">
                <ScrollText className="mr-2 h-4 w-4" />
                Cetak Prima Nota
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">{nasabah.nama}</div>
    </div>
  );
}