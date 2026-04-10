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
import { cn } from "@/lib/utils";
import {
  CreditCard,
  FileText,
  Printer,
  ReceiptText,
  ScrollText,
  ShieldCheck,
  CalendarDays,
  CheckSquare,
} from "lucide-react";

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

function TabsLike() {
  const items = [
    { label: "Simpanan" },
    { label: "Deposito" },
    { label: "Pinjaman", active: true },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <button
          key={it.label}
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
            it.active
              ? "bg-[hsl(var(--app-accent))] text-white ring-[hsl(var(--app-accent))]"
              : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
          )}
        >
          <CreditCard className="h-4 w-4 opacity-90" />
          {it.label}
        </button>
      ))}
    </div>
  );
}

const transactionTypes = [
  "Pembayaran Angsuran",
  "Pembayaran Rincian Tagihan",
  "Pelunasan",
] as const;

type TransactionType = (typeof transactionTypes)[number];

export default function TransaksiAnggotaView1({ nasabah }: Props) {
  const [tanggalEfektif, setTanggalEfektif] = React.useState("25-03-2026");
  const [jenisTransaksi, setJenisTransaksi] =
    React.useState<TransactionType>("Pembayaran Angsuran");
  const [kolektor, setKolektor] = React.useState<string>("Pilih Kolektor");
  const [nominal, setNominal] = React.useState("0");
  const [tabungan, setTabungan] = React.useState("Tanpa Tabungan");
  const [keterangan, setKeterangan] = React.useState("");

  const isPelunasan = jenisTransaksi === "Pelunasan";

  const nominalPelunasan = "9.625.000";

  return (
    <div className="mt-6">
      <TabsLike />

      <div className="mt-4 grid gap-4 lg:grid-cols-[260px_1fr_320px]">
        {/* Left: Pinjaman billing */}
        <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur">
          <div className="rounded-2xl bg-sky-600 px-4 py-4 text-white shadow-sm ring-1 ring-sky-700/20">
            <div className="text-sm font-extrabold tracking-wide">
              PINJAMAN BILLING
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="text-white/80">No. Rekening Pinjaman</div>
              <div className="text-base font-extrabold">PB260001</div>

              <Separator className="my-3 bg-white/15" />

              <div className="text-white/80">Skema Tagihan</div>
              <div className="font-semibold">Tagihan Sesuai Jadwal Angsuran</div>

              <div className="mt-3 text-white/80">Satuan Grace Period</div>
              <div className="font-semibold">Bulan</div>

              <div className="mt-3 text-white/80">Durasi Grace Period</div>
              <div className="font-semibold">3</div>

              <Separator className="my-3 bg-white/15" />

              <div className="text-white/80">Sisa Pokok Pinjaman</div>
              <div className="text-base font-extrabold">10.000.000,00</div>
            </div>
          </div>

          <div className="mt-3 grid gap-2">
            <Button
              variant="outline"
              className="h-10 rounded-xl border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
            >
              Riwayat Transaksi
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-xl border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
            >
              Simulasi Tunggakan
            </Button>
          </div>
        </Card>

        {/* Middle: Detail Angsuran */}
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

          <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-sky-700" />
              <div>
                <div className="font-semibold text-slate-900">
                  Periode Grace Period
                </div>
                <div className="mt-0.5 leading-relaxed text-slate-700">
                  Berikut ini merupakan periode tagihan pinjaman yang termasuk ke
                  dalam grace period. Selama periode grace period nasabah hanya
                  membayar bunga.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <div className="overflow-auto">
              <table className="w-full min-w-[860px] border-collapse">
                <thead className="bg-white">
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                    <th className="w-[42px] px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label="Pilih semua"
                        checked={isPelunasan ? true : undefined}
                        disabled={isPelunasan}
                      />
                    </th>
                    <th className="w-[150px] px-4 py-3">Jatuh Tempo</th>
                    <th className="w-[190px] px-4 py-3">
                      Total Tagihan Belum Dibayar
                    </th>
                    <th className="w-[140px] px-4 py-3">Tagihan Pokok</th>
                    <th className="w-[140px] px-4 py-3">Tagihan Bunga</th>
                    <th className="w-[140px] px-4 py-3">Sisa Tagihan Pokok</th>
                    <th className="w-[140px] px-4 py-3">Sisa Tagihan Bunga</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {rows.map((r, idx) => (
                    <tr key={idx} className="border-t border-slate-100 text-sm">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          aria-label={`Pilih row ${idx + 1}`}
                          checked={isPelunasan ? true : undefined}
                          disabled={isPelunasan}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {r.jatuhTempo}
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        {r.totalBelumDibayar}
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        {r.tagihanPokok}
                      </td>
                      <td className="px-4 py-3 text-slate-800">
                        {r.tagihanBunga}
                      </td>
                      <td className="px-4 py-3 text-slate-800">{r.sisaPokok}</td>
                      <td className="px-4 py-3 text-slate-800">{r.sisaBunga}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {isPelunasan ? (
            <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckSquare className="mt-0.5 h-4 w-4 text-emerald-700" />
                <div>
                  <div className="font-semibold text-slate-900">
                    Mode Pelunasan
                  </div>
                  <div className="mt-0.5 leading-relaxed text-slate-700">
                    Semua rincian tagihan otomatis dipilih dan tidak bisa diubah.
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Card>

        {/* Right: Ringkasan + Form + Aksi */}
        <div className="space-y-4">
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
                <div key={k} className="flex items-center justify-between gap-3">
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
                <div key={k} className="flex items-center justify-between gap-3">
                  <div className="text-slate-600">{k}</div>
                  <div className="font-semibold text-slate-900">{v}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold text-slate-900">TRANSAKSI</div>
            <Separator className="my-3 bg-slate-200/70" />

            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label className="text-xs text-slate-600">
                  {isPelunasan ? "Tanggal Efektif Pelunasan*" : "Tanggal Efektif Bayar*"}
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

              <div className="grid gap-1.5">
                <Label className="text-xs text-slate-600">
                  {isPelunasan ? "Nominal Pelunasan*" : "Nominal Pembayaran*"}
                </Label>

                {isPelunasan ? (
                  <div className="h-10 rounded-xl bg-slate-200 px-4 text-right text-lg font-semibold text-slate-700 ring-1 ring-slate-200 flex items-center justify-end">
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

              <Button className="mt-1 h-10 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                <CheckSquare className="mr-2 h-4 w-4" />
                Bayar Tagihan
              </Button>
            </div>
          </Card>

          <div className="grid gap-2">
            <Button className="h-10 justify-start rounded-xl bg-slate-700 text-white hover:bg-slate-800">
              <ReceiptText className="mr-2 h-4 w-4" />
              Cetak Kwitansi Transaksi Terakhir
            </Button>
            <Button className="h-10 justify-start rounded-xl bg-blue-600 text-white hover:bg-blue-700">
              <Printer className="mr-2 h-4 w-4" />
              Cetak Buku Transaksi Terakhir
            </Button>
            <Button className="h-10 justify-start rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
              <FileText className="mr-2 h-4 w-4" />
              Cetak Buku
            </Button>
            <Button className="h-10 justify-start rounded-xl bg-green-600 text-white hover:bg-green-700">
              <ScrollText className="mr-2 h-4 w-4" />
              Cetak Prima Nota
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 text-xs text-slate-500">
        Catatan: ini tampilan mock untuk anggota pertama (akan kita perluas untuk
        anggota lainnya).
      </div>
    </div>
  );
}