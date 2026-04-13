semua row tercentang), dengan indeterminate, dan tetap mengunci saat mode pelunasan.">
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
} from "lucide-react";
import AnggotaAccountTabs from "@/components/anggota/AnggotaAccountTabs";
import SectionHighlight from "@/components/anggota/SectionHighlight";

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
    <tr className="border-b border-slate-200">
      <td colSpan={colSpan} className="px-4 py-3">
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

export default function TransaksiAnggotaView3({ nasabah }: Props) {
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
    headerCheckboxRef.current.indeterminate = !isPelunasan && anyChecked && !allChecked;
  }, [allChecked, anyChecked, isPelunasan]);

  const totalRincian = React.useMemo(() => {
    return (
      parseAmount(nominalPokok) +
      parseAmount(nominalBunga) +
      parseAmount(nominalDenda)
    );
  }, [nominalBunga, nominalDenda, nominalPokok]);

  const billingRows = isPelunasan ? rows : rows.slice(0, 1);

  const billingActionBtn =
    "h-9 rounded-xl bg-white text-[#0f8f9f] ring-1 ring-white/70 hover:bg-white/90";

  return (
    <div className="space-y-5">
      <AnggotaAccountTabs
        active="pinjaman"
        onChange={() => {
          /* prototype: tab lain belum dibuat */
        }}
      />

      <div className="grid gap-4 lg:grid-cols-[260px_1fr_320px_180px]">
        {/* PINJAMAN BILLING */}
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
                  Tagihan Diterbitkan Per Periode
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

        {/* INFORMASI TAGIHAN DAN DENDA */}
        <div className="space-y-3">
          <SectionHighlight title="Detail Angsuran" />

          <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold text-slate-900">
              INFORMASI TAGIHAN DAN DENDA
            </div>

            <Separator className="my-3 bg-slate-200/70" />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
              <div className="font-semibold text-slate-900">TAGIHAN</div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Info className="h-4 w-4" />
                  </span>
                  <div className="leading-relaxed text-slate-700">
                    {isPelunasan
                      ? "Mode pelunasan: semua rincian tagihan ditampilkan dan otomatis terpilih."
                      : "Berikut ini merupakan tagihan yang sudah dapat dibayarkan pada periode ini serta harus dibayarkan sebelum tanggal jatuh tempo."}
                  </div>
                </div>
              </div>

              <div className="mt-3 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                <div className="overflow-auto">
                  <table className="w-full min-w-[740px] border-collapse">
                    <thead className="bg-white">
                      <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                        <th className="w-[40px] px-3 py-2.5">
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
                        <th className="w-[120px] px-3 py-2.5">Jatuh Tempo</th>
                        <th className="w-[170px] px-3 py-2.5">
                          Total Tagihan Belum Dibayar
                        </th>
                        <th className="w-[120px] px-3 py-2.5">Tagihan Pokok</th>
                        <th className="w-[120px] px-3 py-2.5">Tagihan Bunga</th>
                        <th className="w-[130px] px-3 py-2.5">
                          Sisa Tagihan Pokok
                        </th>
                        <th className="w-[130px] px-3 py-2.5">
                          Sisa Tagihan Bunga
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      <GracePeriodRow colSpan={7} />

                      {billingRows.map((r, idx) => (
                        <tr
                          key={idx}
                          className="border-t border-slate-200 text-sm"
                        >
                          <td className="px-3 py-2.5">
                            <input
                              type="checkbox"
                              aria-label="Pilih tagihan"
                              checked={isPelunasan ? true : selected[idx] ?? false}
                              disabled={isPelunasan}
                              onChange={(e) => {
                                const next = e.target.checked;
                                setSelected((prev) => {
                                  const copy = [...prev];
                                  copy[idx] = next;
                                  return copy;
                                });
                              }}
                            />
                          </td>
                          <td className="px-3 py-2.5 font-medium text-slate-900">
                            {r.jatuhTempo}
                          </td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-slate-800">
                            {r.totalBelumDibayar}
                          </td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-slate-800">
                            {r.tagihanPokok}
                          </td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-slate-800">
                            {r.tagihanBunga}
                          </td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-slate-800">
                            {r.sisaPokok}
                          </td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-slate-800">
                            {r.sisaBunga}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RINGKASAN + TRANSAKSI */}
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
                <CheckSquare className="mr-2 h-4 w-4" />
                Bayar Tagihan
              </Button>
            </div>
          </Card>
        </div>

        {/* AKSI */}
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

      <div className="sr-only">{cn(nasabah.nama)}</div>
    </div>
  );
}