"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatIdrLike, parseAmount } from "@/components/anggota/anggota-money";
import {
  PaymentConfirmModal,
  PaymentSuccessModal,
} from "@/components/anggota/PaymentConfirmModals";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import RequiredMark from "@/components/anggota/RequiredMark";
import { TX, type TransactionType } from "@/components/anggota/transaction-types";

const transactionTypes = [
  TX.REGULER,
  TX.KHUSUS,
  TX.PELUNASAN,
  "Bayar Pokok",
  "Bayar Bunga",
  "Bayar Denda",
  "Bayar Biaya Tambahan",
  "Bayar Biaya Lainnya",
] as const;

function titleForTransaction(t: string | null) {
  if (!t) return "PILIH TRANSAKSI";
  if (t === TX.REGULER) return "PEMBAYARAN REGULER";
  if (t === TX.PENURUNAN_BAKI_DEBET) return "PEMBAYARAN PENURUNAN BAKI DEBET";
  if (t === TX.KHUSUS) return "PEMBAYARAN KHUSUS";
  if (t === TX.PELUNASAN) return "PELUNASAN";
  if (t === "Bayar Pokok" || t === TX.POKOK) return "BAYAR POKOK";
  if (t === "Bayar Bunga" || t === TX.BUNGA) return "BAYAR BUNGA";
  if (t === "Bayar Denda" || t === TX.DENDA) return "BAYAR DENDA";
  if (t === "Bayar Biaya Tambahan") return "BAYAR BIAYA TAMBAHAN";
  if (t === "Bayar Biaya Lainnya" || t === TX.BIAYA_LAINNYA)
    return "BAYAR BIAYA LAINNYA";
  return "PEMBAYARAN";
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
      <SelectTrigger className="h-10 rounded-[5px] border-slate-200 bg-white">
        <SelectValue placeholder={ONLY_TABUNGAN} />
      </SelectTrigger>
      <SelectContent className="rounded-[5px] border-slate-200 p-1">
        <SelectItem
          value={ONLY_TABUNGAN}
          className="rounded-[5px] [&>span.absolute.right-2]:hidden"
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
            "h-10 rounded-[5px] border-slate-200 bg-white",
            hasSelected ? "pl-11" : "",
          )}
        >
          <SelectValue placeholder={KOLEKTOR_PLACEHOLDER} />
        </SelectTrigger>
        <SelectContent className="rounded-[5px] border-slate-200 p-1">
          <SelectItem value={KOLEKTOR_PLACEHOLDER} className="rounded-[5px]">
            {KOLEKTOR_PLACEHOLDER}
          </SelectItem>
          {kolektorOptions.map((k) => (
            <SelectItem key={k} value={k} className="rounded-[5px]">
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
          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-[5px] text-red-600 transition hover:bg-red-50"
        >
          <X className="h-5 w-5" strokeWidth={3} />
        </button>
      ) : null}
    </div>
  );
}

function formatDmy(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = String(date.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}

function parseDmyToDate(value: string): Date | undefined {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec((value ?? "").trim());
  if (!m) return undefined;
  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);
  const d = new Date(yyyy, mm - 1, dd);
  if (
    d.getFullYear() !== yyyy ||
    d.getMonth() !== mm - 1 ||
    d.getDate() !== dd
  ) {
    return undefined;
  }
  return d;
}

function formatNumericInput(value: string) {
  const digits = (value ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return formatIdrLike(Number(digits));
}

function EffectiveDateField({
  label,
  required = false,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const selectedDate = React.useMemo(() => parseDmyToDate(value), [value]);

  return (
    <div className="grid gap-1.5">
      <Label className="text-xs text-slate-600">
        {label}
        {required ? <RequiredMark className="ml-0.5" /> : null}
      </Label>

      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 rounded-[5px] border-slate-200 bg-white pr-11"
          placeholder="DD-MM-YYYY"
          inputMode="numeric"
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-[5px]",
                "text-slate-500 transition hover:bg-slate-100",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-accent))]/25",
              )}
              aria-label="Pilih tanggal"
              title="Pilih tanggal"
            >
              <CalendarDays className="h-4 w-4" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-auto rounded-[5px] border-slate-200 bg-white p-2 shadow-xl"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(d) => {
                if (!d) return;
                onChange(formatDmy(d));
                setOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
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
  onPayPenurunanBakiDebet,
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

  onPayPenurunanBakiDebet?: (nominalPokokInput: string) => void;
}) {
  const isPelunasan = jenisTransaksi === TX.PELUNASAN;
  const isKhusus = jenisTransaksi === TX.KHUSUS;
  const isPenurunanBakiDebet = jenisTransaksi === TX.PENURUNAN_BAKI_DEBET;

  const nominalPelunasan = "5.500.002";

  const isUnset = !jenisTransaksi;

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  React.useEffect(() => {
    if (isUnset) return;
    if (!tabungan || tabungan !== ONLY_TABUNGAN) setTabungan(ONLY_TABUNGAN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnset, isPelunasan, isKhusus, isPenurunanBakiDebet]);

  React.useEffect(() => {
    if (isUnset) return;
    const isValid =
      kolektor === KOLEKTOR_PLACEHOLDER ||
      (kolektorOptions as readonly string[]).includes(kolektor);
    if (!isValid) setKolektor(KOLEKTOR_PLACEHOLDER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnset]);

  React.useEffect(() => {
    if (isUnset) return;
    if (!isKhusus && nominalDenda !== "0") setNominalDenda("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnset, isKhusus]);

  const totalKhususAll = React.useMemo(() => {
    return (
      parseAmount(nominalPokok) +
      parseAmount(nominalBunga) +
      parseAmount(nominalDenda)
    );
  }, [nominalBunga, nominalDenda, nominalPokok]);

  const nominalLabel = isPenurunanBakiDebet
    ? "Nominal Pokok"
    : isPelunasan
      ? "Nominal Pelunasan"
      : "Nominal Pembayaran";

  function handlePayClick() {
    if (isPenurunanBakiDebet) {
      onPayPenurunanBakiDebet?.(nominal);
      setConfirmOpen(true);
      return;
    }

    setConfirmOpen(true);
  }

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

      <Card className="rounded-[5px] border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
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
              <EffectiveDateField
                label={
                  isPelunasan
                    ? "Tanggal Efektif Pelunasan"
                    : "Tanggal Efektif Bayar"
                }
                required
                value={tanggalEfektif}
                onChange={setTanggalEfektif}
              />

              <div className="sr-only">
                <button
                  type="button"
                  onClick={() => setJenisTransaksi(jenisTransaksi)}
                >
                  sync
                </button>
              </div>

              <div className="grid gap-1.5">
                <Label className="text-xs text-slate-600">
                  Kolektor <RequiredMark />
                </Label>
                <KolektorSelect
                  value={(kolektor as KolektorValue) || KOLEKTOR_PLACEHOLDER}
                  onValueChange={(v) => setKolektor(v)}
                  onClear={() => setKolektor(KOLEKTOR_PLACEHOLDER)}
                />
              </div>

              {isKhusus ? (
                <>
                  <div className="grid gap-1.5">
                    <Label className="text-xs text-slate-600">
                      Nominal Pokok <RequiredMark />
                    </Label>
                    <Input
                      value={nominalPokok}
                      onChange={(e) => setNominalPokok(formatNumericInput(e.target.value))}
                      inputMode="numeric"
                      className="h-10 rounded-[5px] border-slate-200 bg-white text-right"
                      placeholder="0"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label className="text-xs text-slate-600">
                      Nominal Bunga <RequiredMark />
                    </Label>
                    <Input
                      value={nominalBunga}
                      onChange={(e) => setNominalBunga(formatNumericInput(e.target.value))}
                      inputMode="numeric"
                      className="h-10 rounded-[5px] border-slate-200 bg-white text-right"
                      placeholder="0"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label className="text-xs text-slate-600">
                      Nominal Denda <RequiredMark />
                    </Label>
                    <Input
                      value={nominalDenda}
                      onChange={(e) => setNominalDenda(formatNumericInput(e.target.value))}
                      inputMode="numeric"
                      className="h-10 rounded-[5px] border-slate-200 bg-white text-right"
                      placeholder="0"
                    />
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
                      className="h-10 rounded-[5px] border-slate-200 bg-white"
                    />
                  </div>

                  <div className="pt-1">
                    <div className="text-xs font-semibold text-slate-600">
                      Total Pembayaran
                    </div>
                    <div className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                      {totalKhususAll.toLocaleString("id-ID")},00
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-1.5">
                    <Label className="text-xs text-slate-600">
                      {nominalLabel} <RequiredMark />
                    </Label>

                    {isPelunasan ? (
                      <div className="flex h-10 items-center justify-end rounded-[5px] bg-slate-200 px-4 text-right text-lg font-semibold text-slate-700 ring-1 ring-slate-200">
                        {nominalPelunasan}
                      </div>
                    ) : (
                      <Input
                        value={nominal}
                        onChange={(e) => setNominal(formatNumericInput(e.target.value))}
                        inputMode="numeric"
                        className="h-10 rounded-[5px] border-slate-200 bg-white text-right"
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
                      className="h-10 rounded-[5px] border-slate-200 bg-white"
                    />
                  </div>
                </>
              )}

              <Button
                type="button"
                onClick={handlePayClick}
                className={cn(
                  "mt-1 h-10 rounded-[5px] bg-emerald-600 text-white hover:bg-emerald-700",
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