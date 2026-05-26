"use client";

import * as React from "react";
import type { TransactionType } from "@/components/anggota/transaction-types";

type UseAnggotaTransactionFormStateConfig = {
  defaultTanggalEfektif: string;
  defaultJenisTransaksi: TransactionType;
  defaultKolektor?: string;
  defaultTabungan?: string;
};

export function useAnggotaTransactionFormState({
  defaultTanggalEfektif,
  defaultJenisTransaksi,
  defaultKolektor = "Pilih Kolektor",
  defaultTabungan = "Tanpa Tabungan",
}: UseAnggotaTransactionFormStateConfig) {
  const [tanggalEfektif, setTanggalEfektif] = React.useState(defaultTanggalEfektif);
  const [jenisTransaksi, setJenisTransaksi] =
    React.useState<TransactionType>(defaultJenisTransaksi);
  const [kolektor, setKolektor] = React.useState<string>(defaultKolektor);

  const [nominal, setNominal] = React.useState("0");
  const [nominalPokok, setNominalPokok] = React.useState("0");
  const [nominalBunga, setNominalBunga] = React.useState("0");
  const [nominalDenda, setNominalDenda] = React.useState("0");

  const [tabungan, setTabungan] = React.useState(defaultTabungan);
  const [keterangan, setKeterangan] = React.useState("");

  return {
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
  };
}
