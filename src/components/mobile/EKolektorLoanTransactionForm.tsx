"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function MoneyField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const inputClassName = cn(
    "h-[41px] w-full rounded-[9px] border-0 bg-[#F2F2F2] px-4",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9A9A]",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="grid w-full gap-2">
      <label className="text-[14px] font-normal leading-none text-[#B8B8B8]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-normal text-[#23305A]">
          Rp.
        </span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            inputClassName,
            "pl-[50px] text-[14px] text-[#23305A] placeholder:text-[14px] placeholder:text-[#9A9A9A]",
          )}
          placeholder="0"
          inputMode="numeric"
        />
      </div>
    </div>
  );
}

export default function EKolektorLoanTransactionForm() {
  const [jenisTransaksi, setJenisTransaksi] = React.useState("Angsuran Pinjaman");
  const [nominalTransaksi, setNominalTransaksi] = React.useState("");
  const [nominalPokok, setNominalPokok] = React.useState("");
  const [nominalBunga, setNominalBunga] = React.useState("");
  const [nominalDenda, setNominalDenda] = React.useState("75.000");

  const inputClassName = cn(
    "h-[41px] w-full rounded-[9px] border-0 bg-[#F2F2F2] px-4",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9A9A]",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const labelClassName = "text-[14px] font-normal leading-none text-[#B8B8B8]";

  return (
    <div className="mt-[18px] grid gap-4">
      <div className="grid w-full gap-2">
        <label className={labelClassName}>Jenis Transaksi</label>
        <select
          value={jenisTransaksi}
          onChange={(event) => setJenisTransaksi(event.target.value)}
          className={cn(inputClassName, "appearance-none")}
        >
          <option value="Angsuran Pinjaman">Angsuran Pinjaman</option>
          <option value="Bayar Pokok">Bayar Pokok</option>
          <option value="Bayar Bunga">Bayar Bunga</option>
          <option value="Bayar Denda">Bayar Denda</option>
        </select>
      </div>

      <MoneyField
        label="Nominal Transaksi"
        value={nominalTransaksi}
        onChange={setNominalTransaksi}
      />

      <MoneyField
        label="Nominal Pokok"
        value={nominalPokok}
        onChange={setNominalPokok}
      />

      <MoneyField
        label="Nominal Bunga"
        value={nominalBunga}
        onChange={setNominalBunga}
      />

      <MoneyField
        label="Nominal Denda"
        value={nominalDenda}
        onChange={setNominalDenda}
      />
    </div>
  );
}