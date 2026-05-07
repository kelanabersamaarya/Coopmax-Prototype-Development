"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoanAccountPickerDialog from "@/components/loans/LoanAccountPickerDialog";
import { toast } from "sonner";

function Th({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      className={cn(
        "border-b border-slate-300/70 px-4 py-3",
        "text-[12px] font-extrabold uppercase tracking-wide",
        "text-[#64748B]",
        align === "right"
          ? "text-right"
          : align === "center"
            ? "text-center"
            : "text-left",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <td
      className={cn(
        "px-4 py-5 align-top",
        "text-[13px] font-medium text-slate-900",
        align === "right"
          ? "text-right tabular-nums"
          : align === "center"
            ? "text-center"
            : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

type NasabahInfo = {
  nama: string;
  alamat: string;
  produk: string;
  noSimpananWajib: string;
  saldoSimpananWajib: string;

  skemaTagihan?: string;
  satuanGracePeriod?: string;
  durasiGracePeriod?: string;
};

function getNasabahInfoByAccountNo(accountNo: string): NasabahInfo | null {
  const map: Record<string, NasabahInfo> = {
    "12260006": {
      nama: "Pangeran Sirait",
      alamat: "Gg. Basudewo No. 230, Gorontalo 27811, DIY",
      produk: "Pinjaman Bulanan",
      noSimpananWajib: "87260001",
      saldoSimpananWajib: "30.000,00",
      skemaTagihan: "Tagihan Sesuai Jadwal Angsuran",
      satuanGracePeriod: "Bulan",
      durasiGracePeriod: "3",
    },
    "12260002": {
      nama: "gaby",
      alamat: "Jl. Galang",
      produk: "Pinjaman Bulanan",
      noSimpananWajib: "87260002",
      saldoSimpananWajib: "30.000,00",
      skemaTagihan: "Tagihan Sesuai Jadwal Angsuran",
      satuanGracePeriod: "Bulan",
      durasiGracePeriod: "3",
    },
    "12260001": {
      nama: "Rika Wastuti",
      alamat: "Jl. Kenanga No. 12",
      produk: "Pinjaman Bulanan",
      noSimpananWajib: "87260003",
      saldoSimpananWajib: "30.000,00",
      skemaTagihan: "Tagihan Sesuai Jadwal Angsuran",
      satuanGracePeriod: "Bulan",
      durasiGracePeriod: "3",
    },
    "210260001": {
      nama: "Jenan Aditama",
      alamat: "Denpasar",
      produk: "Pinjaman RC",
      noSimpananWajib: "87260004",
      saldoSimpananWajib: "30.000,00",
      skemaTagihan: "Jadwal Fleksibel & Tagihan Berkala",
      satuanGracePeriod: "Hari",
      durasiGracePeriod: "7",
    },
    "072260001": {
      nama: "Rika Wastuti",
      alamat: "Jl. Kenanga No. 12",
      produk: "Pinjaman Harian",
      noSimpananWajib: "87260005",
      saldoSimpananWajib: "30.000,00",
      skemaTagihan: "Tagihan Dihitung Dari Sisa Saldo Pokok",
      satuanGracePeriod: "Hari",
      durasiGracePeriod: "0",
    },
  };

  return map[accountNo] ?? null;
}

function deriveNasabahNameByAccountNo(accountNo: string) {
  return getNasabahInfoByAccountNo(accountNo)?.nama ?? "Nasabah";
}

function NasabahRow({
  accountNo,
  onAccountNoChange,
  onSearchClick,
}: {
  accountNo: string;
  onAccountNoChange: (v: string) => void;
  onSearchClick: () => void;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
        No Rek :
      </div>

      <div className="flex min-w-0 items-stretch">
        <Input
          value={accountNo}
          onChange={(e) => onAccountNoChange(e.target.value)}
          placeholder="Cari nasabah"
          className={cn(
            "h-[30px] min-w-0 rounded-l-[6px] rounded-r-none",
            "border-slate-300 bg-white text-[14px] font-medium text-slate-900",
            "shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            "placeholder:text-slate-500",
          )}
        />
        <button
          type="button"
          onClick={onSearchClick}
          className={cn(
            "inline-flex w-10 shrink-0 items-center justify-center",
            "h-[30px]",
            "rounded-r-[6px] rounded-l-none",
            "bg-[#6B7A90] text-white",
            "ring-1 ring-[#6B7A90]/20 transition hover:bg-[#5f6d82]",
          )}
          aria-label="Cari"
          title="Cari"
        >
          <Search className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}

function InfoStack({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <div className="text-[12px] font-normal text-black">{label}</div>
      <div className="text-[14px] font-semibold text-slate-900 leading-snug break-words">
        {value}
      </div>
    </div>
  );
}

function SelectedNasabahInfo({ accountNo }: { accountNo: string }) {
  const info = React.useMemo(
    () => getNasabahInfoByAccountNo(accountNo),
    [accountNo],
  );
  if (!info) return null;

  return (
    <div className="mt-3 bg-white">
      <div className="grid gap-4">
        <InfoStack label="Nama" value={info.nama} />
        <InfoStack label="Alamat" value={info.alamat} />
        <InfoStack label="Produk" value={info.produk} />
        <InfoStack
          label="No Simpanan Wajib Peminjam"
          value={info.noSimpananWajib}
        />
        <InfoStack
          label="Saldo Simpanan Wajib Peminjam"
          value={info.saldoSimpananWajib}
        />
      </div>
    </div>
  );
}

function SelectedPinjamanInfo({ accountNo }: { accountNo: string }) {
  const info = React.useMemo(
    () => getNasabahInfoByAccountNo(accountNo),
    [accountNo],
  );
  if (!info) return null;

  const topItems: Array<{ label: string; value: React.ReactNode }> = [
    ...(info.skemaTagihan
      ? [{ label: "Skema Tagihan", value: info.skemaTagihan }]
      : []),
    ...(info.satuanGracePeriod
      ? [{ label: "Satuan Grace Period", value: info.satuanGracePeriod }]
      : []),
    ...(info.durasiGracePeriod
      ? [{ label: "Durasi Grace Period", value: info.durasiGracePeriod }]
      : []),
  ];

  if (topItems.length === 0) return null;

  // ✅ blok baru: tepat di bawah Durasi Grace Period (dipisah divider dan terpisah dari blok jangka waktu)
  const installments = [
    { label: "Angsuran Lunas", value: "1" },
    { label: "Angsuran Seharusnya", value: "1" },
  ];

  const extra = [
    { label: "Jangka Waktu", value: "12 Bulan" },
    { label: "Angsuran ke", value: "2" },
    { label: "Tanggal Realisasi", value: "01-03-2026" },
    { label: "Tanggal Jatuh Tempo", value: "16-03-2027" },
    { label: "Tanggal Transaksi Terakhir", value: "25 Maret 2026" },
    { label: "Bunga Per Tahun", value: "10.00%" },
    { label: "Metode Bunga", value: "Bunga Efektif" },
  ];

  return (
    <div className="bg-white">
      <div className="grid gap-4">
        {topItems.map((it) => (
          <InfoStack key={it.label} label={it.label} value={it.value} />
        ))}
      </div>

      {/* divider: setelah durasi grace period */}
      <div className="my-4 h-px w-full bg-slate-200" />

      {/* blok angsuran (layout sama seperti nasabah) */}
      <div className="grid gap-4">
        {installments.map((it) => (
          <InfoStack key={it.label} label={it.label} value={it.value} />
        ))}
      </div>

      {/* divider: pisahkan dari informasi jangka waktu */}
      <div className="my-4 h-px w-full bg-slate-200" />

      <div className="grid gap-4">
        {extra.map((r) => (
          <InfoStack key={r.label} label={r.label} value={r.value} />
        ))}
      </div>
    </div>
  );
}

export default function LoanInstallmentPaymentV2Table({
  className,
}: {
  className?: string;
}) {
  const fixedPx = 56 + 280;

  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [accountNo, setAccountNo] = React.useState("");

  const hasPicked = !!accountNo.trim();

  function openPicker() {
    setPickerOpen(true);
  }

  function onPick(nextAccountNo: string) {
    setAccountNo(nextAccountNo);
    setPickerOpen(false);

    toast.success("Berhasil Menampilkan Tagihan Nasabah", {
      description: `${deriveNasabahNameByAccountNo(nextAccountNo)} • ${nextAccountNo}`,
    });
  }

  return (
    <div className={cn("mt-5 overflow-hidden rounded-2xl bg-white", className)}>
      <LoanAccountPickerDialog
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        query={accountNo}
        onPick={onPick}
      />

      <table className="w-full table-fixed border-collapse bg-white">
        <colgroup>
          <col style={{ width: 56 }} />
          <col style={{ width: 280 }} />
          <col style={{ width: `calc((100% - ${fixedPx}px) * 0.35)` }} />
          <col style={{ width: `calc((100% - ${fixedPx}px) * 0.65)` }} />
        </colgroup>

        <thead className="bg-white">
          <tr>
            <Th className="px-3">
              <div className="text-left">NO</div>
            </Th>

            <Th className="pl-3 pr-4">NASABAH</Th>

            <Th>PINJAMAN</Th>

            <Th>TRANSAKSI</Th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <Td className="px-3">
              <span className="tabular-nums">1.</span>
            </Td>

            <Td className="pl-3 pr-4">
              <NasabahRow
                accountNo={accountNo}
                onAccountNoChange={setAccountNo}
                onSearchClick={openPicker}
              />

              {hasPicked ? <SelectedNasabahInfo accountNo={accountNo} /> : null}
            </Td>

            <Td className="bg-white">
              {hasPicked ? <SelectedPinjamanInfo accountNo={accountNo} /> : null}
            </Td>

            <Td className="bg-white" />
          </tr>
        </tbody>
      </table>
    </div>
  );
}