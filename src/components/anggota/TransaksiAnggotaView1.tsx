"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ReceiptText,
  CalendarDays,
  Info,
  ChevronDown,
  History,
  Calculator,
  BookOpenText,
  Printer,
  ScrollText,
  CheckSquare,
} from "lucide-react";
import AnggotaAccountTabs from "@/components/anggota/AnggotaAccountTabs";
import SectionHighlight from "@/components/anggota/SectionHighlight";
import SectionHighlightWide from "@/components/anggota/SectionHighlightWide";
import { cn } from "@/lib/utils";
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

const rows: Row[] = [
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

export default function TransaksiAnggotaView1({ nasabah }: Props) {
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

  const isPelunasan = jenisTransaksi === "Pelunasan";
  const isRincian = jenisTransaksi === "Pembayaran Rincian Tagihan";

  const nominalPelunasan = "9.625.000";

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

  const [selected, setSelected] = React.useState<boolean[]>(
    () => rows.map(() => false),
  );

  React.useEffect(() => {
    if (isPelunasan) {
      setSelected(rows.map(() => true));
    } else {
      setSelected(rows.map(() => false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPelunasan]);

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

  const totalRincian = React.useMemo(() => {
    return (
      parseAmount(nominalPokok) +
      parseAmount(nominalBunga) +
      parseAmount(nominalDenda)
    );
  }, [nominalBunga, nominalDenda, nominalPokok]);

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
                  <Button className="h-9 rounded-full bg-white px-4 text-slate-900 ring-1 ring-white/60 hover:bg-white/90">
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
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    INFORMASI TAGIHAN DAN DENDA
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    Detail Angsuran (mock sesuai referensi)
                  </div>
                </div>

                <Badge className="h-7 rounded-full bg-slate-900 px-3 text-white hover:bg-slate-900">
                  Detail Angsuran
                </Badge>
              </div>

              <Separator className="my-3 w-full bg-slate-200/70" />

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
                              setSelected(rows.map(() => next));
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
                      <tr className="border-t border-slate-200">
                        <td
                          colSpan={7}
                          className={cn(tdClass, edgePadLeft, edgePadRight)}
                        >
                          <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-slate-800">
                            <div className="flex items-start gap-2">
                              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                <Info className="h-4 w-4" />
                              </span>
                              <div>
                                <div className="font-semibold">
                                  Periode Grace Period
                                </div>
                                <div className="mt-0.5 text-slate-700">
                                  Berikut ini merupakan periode tagihan pinjaman
                                  yang termasuk ke dalam grace period. Selama
                                  periode grace period nasabah hanya membayar
                                  bunga.
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>

                      {pagedRows.map((r, idx) => {
                        const realIdx = (page - 1) * pageSize + idx;
                        return (
                          <tr
                            key={`${r.jatuhTempo}-${realIdx}`}
                            className="border-t border-slate-100"
                          >
                            <td className={cn(tdClass, edgePadLeft)}>
                              <input
                                type="checkbox"
                                aria-label={`Pilih row ${realIdx + 1}`}
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
                              {r.jatuhTempo}
                            </td>
                            <td
                              className={cn(
                                tdClass,
                                "text-right tabular-nums text-slate-800",
                              )}
                            >
                              {r.totalBelumDibayar}
                            </td>
                            <td
                              className={cn(
                                tdClass,
                                "text-right tabular-nums text-slate-800",
                              )}
                            >
                              {r.tagihanPokok}
                            </td>
                            <td
                              className={cn(
                                tdClass,
                                "text-right tabular-nums text-slate-800",
                              )}
                            >
                              {r.tagihanBunga}
                            </td>
                            <td
                              className={cn(
                                tdClass,
                                "text-right tabular-nums text-slate-800",
                              )}
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

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
              <div className="space-y-3">
                <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    RINGKASAN TAGIHAN
                  </div>
                  <Separator className="my-3 w-full bg-slate-200/70" />

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

                    <Separator className="my-3 w-full bg-slate-200/70" />

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

              <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
                <div className="text-sm font-semibold text-slate-900">TRANSAKSI</div>
                <Separator className="my-3 w-full bg-slate-200/70" />

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
                        <SelectItem value="Pembayaran Angsuran">
                          Pembayaran Angsuran
                        </SelectItem>
                        <SelectItem value="Pembayaran Rincian Tagihan">
                          Pembayaran Rincian Tagihan
                        </SelectItem>
                        <SelectItem value="Pelunasan">Pelunasan Pinjaman</SelectItem>
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
          </div>
        </div>

        <div className="sr-only">{nasabah.nama}</div>
      </div>
    </div>
  );
}