"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

function getTodayDmy() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = String(today.getFullYear());

  return `${day}-${month}-${year}`;
}

export default function EKolektorLoanTransactionForm() {
  const [jenisTransaksi, setJenisTransaksi] = React.useState("Angsuran Pinjaman");
  const [tanggalEfektifBayar, setTanggalEfektifBayar] = React.useState("");
  const [nominalTransaksi, setNominalTransaksi] = React.useState("");
  const [nominalDenda, setNominalDenda] = React.useState("");

  const todayPlaceholder = React.useMemo(() => getTodayDmy(), []);

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

      <div className="grid w-full gap-2">
        <label className={labelClassName}>Tanggal Efektif Bayar</label>
        <div className="relative">
          <input
            value={tanggalEfektifBayar}
            onChange={(event) => setTanggalEfektifBayar(event.target.value)}
            className={cn(inputClassName, "pr-12")}
            placeholder={todayPlaceholder}
            inputMode="numeric"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7B7B7B]">
            <CalendarDays className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="grid w-full gap-2">
        <label className={labelClassName}>Nominal Transaksi</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-normal text-[#23305A]">
            Rp.
          </span>
          <input
            value={nominalTransaksi}
            onChange={(event) => setNominalTransaksi(event.target.value)}
            className={cn(
              inputClassName,
              "pl-[58px] text-[18px] text-[#23305A] placeholder:text-[18px] placeholder:text-[#23305A]",
            )}
            placeholder="0"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="grid w-full gap-2">
        <label className={labelClassName}>Nominal Denda</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-normal text-[#23305A]">
            Rp.
          </span>
          <input
            value={nominalDenda}
            onChange={(event) => setNominalDenda(event.target.value)}
            className={cn(
              inputClassName,
              "pl-[58px] text-[18px] text-[#23305A] placeholder:text-[18px] placeholder:text-[#23305A]",
            )}
            placeholder="0"
            inputMode="numeric"
          />
        </div>
      </div>
    </div>
  );
}