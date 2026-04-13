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
import { FileText, Printer, ReceiptText, ScrollText, CalendarDays } from "lucide-react";
import AnggotaAccountTabs from "@/components/anggota/AnggotaAccountTabs";
import SectionHighlight from "@/components/anggota/SectionHighlight";
import BillingRowsResponsive, {
  type BillingRow,
} from "@/components/anggota/BillingRowsResponsive";

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

  const totalRincian = React.useMemo(() => {
    return (
      parseAmount(nominalPokok) +
      parseAmount(nominalBunga) +
      parseAmount(nominalDenda)
    );
  }, [nominalBunga, nominalDenda, nominalPokok]);

  return (
    <div className="mt-6">
      <AnggotaAccountTabs
        active="pinjaman"
        onChange={() => {
          /* prototype: tab lain belum dibuat */
        }}
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-[260px_1fr]">
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
              <Button className="h-9 rounded-xl bg-white/10 text-white hover:bg-white/15">
                Riwayat Transaksi
              </Button>
              <Button className="h-9 rounded-xl bg-white/10 text-white hover:bg-white/15">
                Simulasi Tunggakan
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Detail + Ringkasan/Transaksi/Aksi */}
        <div className="space-y-4">
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

              <BillingRowsResponsive
                rows={rows}
                selectable
                disableChecks={isPelunasan}
                selectAllChecked={isPelunasan ? true : undefined}
                rowChecked={() => (isPelunasan ? true : false)}
              />
            </Card>
          </div>

          <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
            {/* LEFT COLUMN: Ringkasan + Transaksi */}
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
                      onValueChange={(v) =>
                        setJenisTransaksi(v as TransactionType)
                      }
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

            {/* RIGHT COLUMN: Aksi */}
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

          <div className="mt-5 text-xs text-slate-500">
            Catatan: ini tampilan mock untuk anggota pertama (akan kita perluas
            untuk anggota lainnya).
          </div>

          <div className="sr-only">{nasabah.nama}</div>
        </div>
      </div>
    </div>
  );
}