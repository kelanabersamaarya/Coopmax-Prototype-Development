"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckSquare } from "lucide-react";
import { formatIdrLike, parseAmount } from "@/components/anggota/anggota-money";
import { cn } from "@/lib/utils";

const transactionTypes = [
  "Pembayaran Reguler",
  "Pembayaran Rincian Tagihan",
  "Pelunasan",
] as const;

export type TransactionType = (typeof transactionTypes)[number];

function titleForTransaction(t: TransactionType | null) {
  if (!t) return "PILIH TRANSAKSI";
  if (t === "Pembayaran Reguler") return "PEMBAYARAN REGULER";
  if (t === "Pembayaran Rincian Tagihan") return "PEMBAYARAN RINCIAN TAGIHAN";
  return "PELUNASAN";
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

  const totalRincian = React.useMemo(() => {
    return (
      parseAmount(nominalPokok) +
      parseAmount(nominalBunga) +
      parseAmount(nominalDenda)
    );
  }, [nominalBunga, nominalDenda, nominalPokok]);

  const isUnset = !jenisTransaksi;

  return (
    <Card className="rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
      <div className="text-sm font-semibold tracking-wide text-slate-900">
        {titleForTransaction(jenisTransaksi)}
      </div>

      {/* Saat transaksi belum dipilih: hilangkan seluruh konten di bawah judul */}
      {isUnset ? (
        <div className="sr-only">
          <Separator />
          <button type="button" onClick={() => setJenisTransaksi(jenisTransaksi)}>
            sync
          </button>
        </div>
      ) : (
        <>
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

            {/* Field "Jenis Transaksi*" dihilangkan sesuai permintaan */}

            {/* tetap terima setter untuk kompatibilitas */}
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
              {/* Select dari shadcn tidak diperlukan di sini; tetap gunakan pola sebelumnya via Input? */}
              {/* Karena view memakai Select shadcn sebelumnya, kita pertahankan API dengan input sederhana agar file tetap mandiri */}
              <Input
                value={kolektor}
                onChange={(e) => setKolektor(e.target.value)}
                className="h-10 rounded-xl border-slate-200 bg-white"
                placeholder="Pilih Kolektor"
              />
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
              <Input
                value={tabungan}
                onChange={(e) => setTabungan(e.target.value)}
                className="h-10 rounded-xl border-slate-200 bg-white"
                placeholder="Tanpa Tabungan"
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
              className={cn("mt-1 h-10 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700")}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Bayar Tagihan
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}