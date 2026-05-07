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
};

function getNasabahInfoByAccountNo(accountNo: string): NasabahInfo | null {
  const map: Record<string, NasabahInfo> = {
    "12260006": {
      nama: "Pangeran Sirait",
      alamat: "Gg. Basudewo No. 230, Gorontalo 27811, DIY",
      produk: "Pinjaman Bulanan",
      noSimpananWajib: "87260001",
      saldoSimpananWajib: "30.000,00",
    },
    "12260002": {
      nama: "gaby",
      alamat: "Jl. Galang",
      produk: "Pinjaman Bulanan",
      noSimpananWajib: "87260002",
      saldoSimpananWajib: "30.000,00",
    },
    "12260001": {
      nama: "Rika Wastuti",
      alamat: "Jl. Kenanga No. 12",
      produk: "Pinjaman Bulanan",
      noSimpananWajib: "87260003",
      saldoSimpananWajib: "30.000,00",
    },
    "210260001": {
      nama: "Jenan Aditama",
      alamat: "Denpasar",
      produk: "Pinjaman RC",
      noSimpananWajib: "87260004",
      saldoSimpananWajib: "30.000,00",
    },
    "072260001": {
      nama: "Rika Wastuti",
      alamat: "Jl. Kenanga No. 12",
      produk: "Pinjaman Harian",
      noSimpananWajib: "87260005",
      saldoSimpananWajib: "30.000,00",
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
    <div className="grid gap-1">
      <div className="grid min-w-0 gap-y-1 gap-x-2 [grid-template-columns:62px_minmax(0,1fr)]">
        <div className="pt-0.5 text-[14px] font-normal text-slate-900 whitespace-nowrap">
          No Rek :
        </div>

        <div className="flex min-w-0 items-stretch">
          <Input
            value={accountNo}
            onChange={(e) => onAccountNoChange(e.target.value)}
            placeholder="Cari nasabah"
            className={cn(
              "h-8 min-w-0 rounded-l-[6px] rounded-r-none",
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
      <div className="text-[12px] font-semibold text-slate-600">{label}</div>
      <div className="text-[14px] font-semibold text-slate-900 leading-snug break-words">
        {value}
      </div>
    </div>
  );
}

function SelectedNasabahInfo({ accountNo }: { accountNo: string }) {
  const info = React.useMemo(() => getNasabahInfoByAccountNo(accountNo), [accountNo]);
  if (!info) return null;

  // Sesuai request: hilangkan header biru (nomor rekening)
  return (
    <div className="mt-3 rounded-[6px] bg-white px-4 py-4">
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

export default function LoanInstallmentPaymentV2Table({
  className,
}: {
  className?: string;
}) {
  const fixedPx = 56 + 280;

  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [accountNo, setAccountNo] = React.useState("");

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

              {accountNo ? <SelectedNasabahInfo accountNo={accountNo} /> : null}
            </Td>

            <Td className="bg-white" />
            <Td className="bg-white" />
          </tr>
        </tbody>
      </table>
    </div>
  );
}