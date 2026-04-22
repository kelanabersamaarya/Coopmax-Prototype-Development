"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckSquare, X } from "lucide-react";
import { formatIdrLike, parseAmount } from "@/components/anggota/anggota-money";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PaymentConfirmModal,
  PaymentSuccessModal,
} from "@/components/anggota/PaymentConfirmModals";
import { Switch } from "@/components/ui/switch";

const transactionTypes = [
  "Pembayaran Reguler",
  "Pembayaran Rincian Tagihan",
  "Pelunasan",
  "Bayar Pokok",
  "Bayar Bunga",
  "Bayar Denda",
  "Bayar Biaya Tambahan",
  "Bayar Biaya Lainnya",
] as const;

export type TransactionType = (typeof transactionTypes)[number];

function titleForTransaction(t: TransactionType | null) {
  if (!t) return "PILIH TRANSAKSI";
  if (t === "Pembayaran Reguler") return "PEMBAYARAN REGULER";
  if (t === "Pembayaran Rincian Tagihan") return "PEMBAYARAN RINCIAN TAGIHAN";
  if (t === "Pelunasan") return "PELUNASAN";
  if (t === "Bayar Pokok") return "BAYAR POKOK";
  if (t === "Bayar Bunga") return "BAYAR BUNGA";
  if (t === "Bayar Denda") return "BAYAR DENDA";
  if (t === "Bayar Biaya Tambahan") return "BAYAR BIAYA TAMBAHAN";
  return "BAYAR BIAYA LAINNYA";
}

const ONLY_TABUNGAN = "Tanpa Tabungan";
const KOLEKTOR_PLACEHOLDER = "Pilih Kolektor";

const kolektorOptions = [
  "Purwanto Santoso",
  "Kolektor A",
  "Kolektor B",
  "Kolektor C",
] as const;

type KolektorValue =
  | (typeof kolektorOptions)[number]
  | typeof KOLEKTOR_PLACEHOLDER;

function SingleOptionSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white">
        <SelectValue placeholder={ONLY_TABUNGAN} />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-slate-200 p-1">
        <SelectItem
          value={ONLY_TABUNGAN}
          className="rounded-xl [&>span.absolute.right-2]:hidden"
        >
          {ONLY_TABUNGAN}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

function KolektorSelect({
  value,
  onValueChange,
  onClear,
}: {
  value: KolektorValue;
  onValueChange: (v: KolektorValue) => void;
  onClear: () => void;
}) {
  const hasSelected = value !== KOLEKTOR_PLACEHOLDER;

  return (
    <div className="relative">
      <Select
        value={value}
        onValueChange={(v) => onValueChange(v as KolektorValue)}
      >
        <SelectTrigger
          className={cn(
            "h-10 rounded-xl border-slate-200 bg-white",
            hasSelected ? "pl-11" : "",
          )}
        >
          <SelectValue placeholder={KOLEKTOR_PLACEHOLDER} />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-slate-200 p-1">
          <SelectItem value={KOLEKTOR_PLACEHOLDER} className="rounded-xl">
            {KOLEKTOR_PLACEHOLDER}
          </SelectItem>
          {kolektorOptions.map((k) => (
            <SelectItem key={k} value={k} className="rounded-xl">
              {k}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasSelected ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClear();
          }}
          aria-label="Hapus kolektor"
          title="Hapus kolektor"
          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50"
        >
          <X className="h-5 w-5" strokeWidth={3} />
        </button>
      ) : null}
    </div>
  );
}

function allocatePayment({
  payment,
  bungaDue,
  dendaDue,
  pokokDue,
}: {
  payment: number;
  bungaDue: number;
  dendaDue: number;
  pokokDue: number;
}) {
  let remaining = Math.max(0, payment);

  const bunga = Math.min(bungaDue, remaining);
  remaining -= bunga;

  const denda = Math.min(dendaDue, remaining);
  remaining -= denda;

  const pokok = Math.min(pokokDue, remaining);
  remaining -= pokok;

  return { bunga, denda, pokok };
}

export default function TransactionFormCardView2({
  tanggalEfektif,
  setTanggalEfektif,
  jenisTransaksi,
  setJenisTransaksi,
  kolektor,
  setKolektor,
  nominal,
  setNominal,
  nominalPokok,
  setNominalPokok,
  nominalBunga,
  setNominalBunga,
  nominalDenda,
  setNominalDenda,
  tabungan,
  setTabungan,
  keterangan,
  setKeterangan,
}: {
  tanggalEfektif: string;
  setTanggalEfektif: (v: string) => void;

  jenisTransaksi: TransactionType | null;
  setJenisTransaksi: (v: TransactionType | null) => void;

  kolektor: string;
  setKolektor: (v: string) => void;

  nominal: string;
  setNominal: (v: string) => void;

  nominalPokok: string;
  setNominalPokok: (v: string) => void;
  nominalBunga: string;
  setNominalBunga: (v: string) => void;
  nominalDenda: string;
  setNominalDenda: (v: string) => void;

  tabungan: string;
  setTabungan: (v: string) => void;

  keterangan: string;
  setKeterangan: (v: string) => void;
}) {
  const isPelunasan = jenisTransaksi === "Pelunasan";
  const isRincian = jenisTransaksi === "Pembayaran Rincian Tagihan";
  const nominalPelunasan = "9.625.000";

  const isUnset = !jenisTransaksi;

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  // Penalty Pelunasan (baru) — hanya untuk UI (prototype)
  const [penaltyPelunasan, setPenaltyPelunasan] = React.useState("0");

  // RINCIAN TAGIHAN: toggle alokasi manual + nominal pembayaran (auto-allocate)
  const [alokasiManual, setAlokasiManual] = React.useState(false);
  const [nominalPembayaran, setNominalPembayaran] = React.useState("0");

  // Prototype "due" amounts (karena belum ada data real dari tabel)
  const DUE_BUNGA = 83333;
  const DUE_DENDA = 25000;
  const DUE_POKOK = 833333;

  React.useEffect(() => {
    if (!isPelunasan) setPenaltyPelunasan("0");
  }, [isPelunasan]);

  // Reset state khusus rincian saat pindah jenis transaksi
  React.useEffect(() => {
    if (!isRincian) {
      setAlokasiManual(false);
      setNominalPembayaran("0");
      return;
    }
    // default: non-aktif sesuai request
    setAlokasiManual(false);
    setNominalPembayaran("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRincian]);

  // Auto alokasi saat rincian & toggle OFF
  React.useEffect(() => {
    if (!isRincian) return;
    if (alokasiManual) return;

    const payment = parseAmount(nominalPembayaran);
    const allocated = allocatePayment({
      payment,
      bungaDue: DUE_BUNGA,
      dendaDue: DUE_DENDA,
      pokokDue: DUE_POKOK,
    });

    setNominalBunga(String(Math.round(allocated.bunga)));
    setNominalDenda(String(Math.round(allocated.denda)));
    setNominalPokok(String(Math.round(allocated.pokok)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alokasiManual, isRincian, nominalPembayaran]);

  // Tabungan: selalu dropdown, tapi hanya ada opsi "Tanpa Tabungan"
  React.useEffect(() => {
    if (isUnset) return;
    if (!tabungan || tabungan !== ONLY_TABUNGAN) setTabungan(ONLY_TABUNGAN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnset, isPelunasan, isRincian]);

  // Kolektor: enforce dropdown placeholder/values (bukan free text)
  React.useEffect(() => {
    if (isUnset) return;
    const isValid =
      kolektor === KOLEKTOR_PLACEHOLDER ||
      (kolektorOptions as readonly string[]).includes(kolektor);
    if (!isValid) setKolektor(KOLEKTOR_PLACEHOLDER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnset]);

  const totalRincian = React.useMemo(() => {
    return (
      parseAmount(nominalPokok) +
      parseAmount(nominalBunga) +
      parseAmount(nominalDenda)
    );
  }, [nominalBunga, nominalDenda, nominalPokok]);

  const showRincianManualToggle = isRincian;
  const showNominalPembayaran = isRincian && !alokasiManual;

  const rincianFieldsReadOnly = isRincian && !alokasiManual;

  return (
    <>
      <PaymentConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onYes={() => {
          setConfirmOpen(false);
          setSuccessOpen(true);
        }}
      />

      <PaymentSuccessModal
        open={successOpen}
        onOk={() => {
          setSuccessOpen(false);
        }}
      />

      <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
        <div className="text-sm font-semibold tracking-wide text-slate-900">
          {titleForTransaction(jenisTransaksi)}
        </div>

        {isUnset ? (
          <div className="sr-only">
            <Separator />
            <button
              type="button"
              onClick={() => setJenisTransaksi(jenisTransaksi)}
            >
              sync
            </button>
          </div>
        ) : (
          <>
            <Separator className="my-3 bg-slate-200/70" />

            <div className="grid gap-3">
              {/* Selalu tampil */}
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

              {/* Field "Jenis Transaksi*" memang tidak ditampilkan */}
              <div className="sr-only">
                <button
                  type="button"
                  onClick={() => setJenisTransaksi(jenisTransaksi)}
                >
                  sync
                </button>
              </div>

              <div className="grid gap-1.5">
                <Label className="text-xs text-slate-600">Kolektor*</Label>
                <KolektorSelect
                  value={(kolektor as KolektorValue) || KOLEKTOR_PLACEHOLDER}
                  onValueChange={(v) => setKolektor(v)}
                  onClear={() => setKolektor(KOLEKTOR_PLACEHOLDER)}
                />
              </div>

              {showRincianManualToggle ? (
                <div className="mt-1 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900">
                        Alokasi Pembayaran Manual
                      </div>
                      <div className="mt-0.5 text-xs text-slate-600">
                        OFF = otomatis (bunga → denda → pokok)
                      </div>
                    </div>
                    <Switch checked={alokasiManual} onCheckedChange={setAlokasiManual} />
                  </div>
                </div>
              ) : null}

              {showNominalPembayaran ? (
                <div className="grid gap-1.5">
                  <Label className="text-xs text-slate-600">
                    Nominal Pembayaran
                  </Label>
                  <Input
                    value={nominalPembayaran}
                    onChange={(e) => setNominalPembayaran(e.target.value)}
                    inputMode="numeric"
                    className="h-10 rounded-xl border-slate-200 bg-white text-right"
                    placeholder="0"
                  />
                  <div className="text-[11px] text-slate-600">
                    Akan dialokasikan otomatis ke bunga, lalu denda, lalu pokok.
                  </div>
                </div>
              ) : null}

              {/* RINCIAN TAGIHAN: field selalu tampil, tapi read-only saat alokasiManual OFF */}
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
                      readOnly={rincianFieldsReadOnly}
                      className={cn(
                        "h-10 rounded-xl border-slate-200 text-right",
                        rincianFieldsReadOnly ? "bg-slate-200/70 text-slate-800" : "bg-white",
                      )}
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
                      readOnly={rincianFieldsReadOnly}
                      className={cn(
                        "h-10 rounded-xl border-slate-200 text-right",
                        rincianFieldsReadOnly ? "bg-slate-200/70 text-slate-800" : "bg-white",
                      )}
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
                      readOnly={rincianFieldsReadOnly}
                      className={cn(
                        "h-10 rounded-xl border-slate-200 text-right",
                        rincianFieldsReadOnly ? "bg-slate-200/70 text-slate-800" : "bg-white",
                      )}
                    />
                  </div>

                  {/* Saat alokasi manual ON: tampilkan tabungan & keterangan (sesuai request) */}
                  {alokasiManual ? (
                    <>
                      <div className="grid gap-1.5">
                        <Label className="text-xs text-slate-600">Tabungan</Label>
                        <SingleOptionSelect
                          value={tabungan || ONLY_TABUNGAN}
                          onValueChange={setTabungan}
                        />
                      </div>

                      <div className="grid gap-1.5">
                        <Label className="text-xs text-slate-600">Keterangan</Label>
                        <Input
                          value={keterangan}
                          onChange={(e) => setKeterangan(e.target.value)}
                          className="h-10 rounded-xl border-slate-200 bg-white"
                        />
                      </div>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  {isPelunasan ? (
                    <div className="grid gap-1.5">
                      <Label className="text-xs text-slate-600">
                        Penalty Pelunasan
                      </Label>
                      <Input
                        value={penaltyPelunasan}
                        onChange={(e) => setPenaltyPelunasan(e.target.value)}
                        inputMode="numeric"
                        className="h-10 rounded-xl border-slate-200 bg-white text-right"
                        placeholder="0"
                      />
                    </div>
                  ) : null}

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

                  <div className="grid gap-1.5">
                    <Label className="text-xs text-slate-600">Tabungan</Label>
                    <SingleOptionSelect
                      value={tabungan || ONLY_TABUNGAN}
                      onValueChange={setTabungan}
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label className="text-xs text-slate-600">Keterangan</Label>
                    <Input
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                      className="h-10 rounded-xl border-slate-200 bg-white"
                    />
                  </div>
                </>
              )}

              {/* Total Pembayaran: tampil untuk Rincian Tagihan */}
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

              <Button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className={cn(
                  "mt-1 h-10 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700",
                )}
              >
                <CheckSquare className="mr-2 h-4 w-4" />
                Bayar Tagihan
              </Button>
            </div>
          </>
        )}
      </Card>
    </>
  );
}