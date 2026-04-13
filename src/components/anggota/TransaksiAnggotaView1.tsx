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
  FileText,
  Printer,
  ReceiptText,
  ScrollText,
  CalendarDays,
  Info,
} from "lucide-react";
import AnggotaAccountTabs from "@/components/anggota/AnggotaAccountTabs";
import SectionHighlight from "@/components/anggota/SectionHighlight";
import { cn } from "@/lib/utils";

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
    tagihanPokok: "833.333",
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

  // Pagination (Detail Angsuran)
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

  // --- Select all / row selection state (for non-pelunasan) ---
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

  const billingActionBtn =
    "h-9 rounded-xl bg-white text-[#0f8f9f] ring-1 ring-white/70 hover:bg-white/90";

  // More compact table spacing & widths (keep font size unchanged)
  const thClass = "px-1 py-2.5";
  const tdClass = "px-1 py-2.5";
  const edgePadLeft = "pl-3";
  const edgePadRight = "pr-3";

  return (
    <div className="mt-6">
      <AnggotaAccountTabs active="pinjaman" onChange={() => {}} />

      <div className="mt-4 grid gap-4 lg:grid-cols-[260px_1fr_520px]">
        {/* Left: Pinjaman billing */}
        <div className="space-y-3">
          <SectionHighlight title="Informasi Rekening" />

          <Card className="rounded-2xl border-slate-200/70 bg-[#12a3b4] p-4 text-white shadow-sm">
            <div className="text-sm font-extrabold tracking-wide">
              PINJAMAN BILLING
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <div className="text-white/85">No. Rekening Pinjaman</div>
                <div className="mt-0.5 text-base font-extrabold">PB260001</div>
              </div>

              <div>
                <div className="text-white/85">Skema Tagihan</div>
                <div className="mt-0.5 font-semibold">
                  Tagihan Sesuai Jadwal Angsuran
                </div>
              </div>

              <div>
                <div className="text-white/85">Satuan Grace Period</div>
                <div className="mt-0.5 font-semibold">Bulan</div>
              </div>

              <div>
                <div className="text-white/85">Durasi Grace Period</div>
                <div className="mt-0.5 font-semibold">3</div>
              </div>

              <div>
                <div className="text-white/85">Sisa Pokok Pinjaman</div>
                <div className="mt-0.5 text-base font-extrabold">
                  10.000.000,00
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <Button className={billingActionBtn}>Riwayat Transaksi</Button>
              <Button className={billingActionBtn}>Simulasi Tunggakan</Button>
            </div>
          </Card>
        </div>

        {/* Middle: Detail Angsuran */}
        <div className="space-y-3">
          <SectionHighlight title="Detail Angsuran" />

          <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur md:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  INFORMASI TAGIHAN DAN DENDA
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Detail Angsuran (mock sesuai referensi)
                </div>
              </div>

              <Badge className="w-fit rounded-full bg-slate-900 px-3 text-white hover:bg-slate-900">
                Detail Angsuran
              </Badge>
            </div>

            <Separator className="my-4 bg-slate-200/70" />

            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-200">
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
                      <td colSpan={7} className={cn(tdClass, edgePadLeft, edgePadRight)}>
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
                          <td className={cn(tdClass, "text-right tabular-nums text-slate-800")}>
                            {r.totalBelumDibayar}
                          </td>
                          <td className={cn(tdClass, "text-right tabular-nums text-slate-800")}>
                            {r.tagihanPokok}
                          </td>
                          <td className={cn(tdClass, "text-right tabular-nums text-slate-800")}>
                            {r.tagihanBunga}
                          </td>
                          <td className={cn(tdClass, "text-right tabular-nums text-slate-800")}>
                            {r.sisaPokok}
                          </td>
                          <td className={cn(tdClass, edgePadRight, "text-right tabular-nums text-slate-800")}>
                            {r.sisaBunga}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-xs text-slate-600">
                Menampilkan{" "}
                {rows.length === 0 ? 0 : (page - 1) * pageSize + 1} sampai{" "}
                {Math.min(rows.length, page * pageSize)} dari {rows.length} entri
              </div>
              <Pagination page={page} pageCount={pageCount} onPage={setPage} />
            </div>
          </Card>
        </div>

        {/* Right */}
        <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
          <div className="space-y-4">
            <div className="space-y-3">
              <SectionHighlight title="Pembayaran Angsuran" />
              <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur">
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

            <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur">
              <div className="text-sm font-semibold text-slate-900">
                TRANSAKSI
              </div>
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
                  <Label className="text-xs text-slate-600">
                    Jenis Transaksi*
                  </Label>
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
                      <SelectItem value="Pelunasan">
                        Pelunasan Pinjaman
                      </SelectItem>
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
                      <SelectItem value="Pilih Kolektor">
                        Pilih Kolektor
                      </SelectItem>
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
                      {isPelunasan
                        ? "Nominal Pelunasan*"
                        : "Nominal Pembayaran*"}
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
                      <SelectItem value="Tanpa Tabungan">
                        Tanpa Tabungan
                      </SelectItem>
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
                  Bayar Tagihan
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            <SectionHighlight title="Aksi" />
            <div className="grid gap-2">
              <Button className="h-11 w-full justify-start rounded-xl bg-slate-700 text-white hover:bg-slate-800">
                <ReceiptText className="mr-2 h-4 w-4" />
                Cetak Kwitansi Transaksi Terakhir
              </Button>
              <Button className="h-11 w-full justify-start rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                <Printer className="mr-2 h-4 w-4" />
                Cetak Buku Transaksi Terakhir
              </Button>
              <Button className="h-11 w-full justify-start rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                <FileText className="mr-2 h-4 w-4" />
                Cetak Buku
              </Button>
              <Button className="h-11 w-full justify-start rounded-xl bg-green-600 text-white hover:bg-green-700">
                <ScrollText className="mr-2 h-4 w-4" />
                Cetak Prima Nota
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-xs text-slate-500">
        Catatan: ini tampilan mock untuk anggota pertama (akan kita perluas untuk
        anggota lainnya).
      </div>

      <div className="sr-only">{nasabah.nama}</div>
    </div>
  );
}