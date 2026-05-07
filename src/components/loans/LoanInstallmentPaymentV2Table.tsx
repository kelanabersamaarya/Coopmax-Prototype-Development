"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, History, Printer, Eye, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoanAccountPickerDialog from "@/components/loans/LoanAccountPickerDialog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DaftarTagihanDialog from "@/components/loans/DaftarTagihanDialog";

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

function TransactionStatusBadge({
  title = "Status Transaksi",
  status = "Belum diproses",
}: {
  title?: string;
  status?: string;
}) {
  return (
    <div className="mt-4">
      <div className="text-[12px] font-normal text-slate-900">{title}</div>
      <div className="mt-2">
        <span className="inline-flex items-center rounded-[5px] bg-[#DC3545] px-3 py-1 text-[13px] font-semibold text-white ring-1 ring-[#DC3545]/25">
          {status}
        </span>
      </div>
    </div>
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
        No Rek
      </div>

      <div className="flex min-w-0 items-stretch">
        <Input
          value={accountNo}
          onChange={(e) => onAccountNoChange(e.target.value)}
          placeholder="Cari nasabah"
          className={cn(
            "h-[30px] min-w-0 rounded-l-[5px] rounded-r-none",
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
            "rounded-r-[5px] rounded-l-none",
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
  strong = false,
}: {
  label: string;
  value: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="grid gap-1">
      <div
        className={cn(
          "text-[12px] font-normal text-black",
          strong ? "font-semibold" : "",
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          "text-[14px] leading-snug break-words",
          strong ? "font-extrabold text-slate-900" : "font-semibold text-slate-900",
        )}
      >
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

function LoanActionButton({
  icon: Icon,
  label,
  onClick,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 w-full items-center justify-center gap-3 rounded-[5px] px-4",
        "text-[14px] font-semibold text-white",
        "ring-1 transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
        className,
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="truncate">{label}</span>
    </button>
  );
}

function SelectedPinjamanInfo({
  accountNo,
  hideInstallmentInfo = false,
}: {
  accountNo: string;
  hideInstallmentInfo?: boolean;
}) {
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

  const installmentMeta = hideInstallmentInfo
    ? []
    : [{ label: "Angsuran ke", value: "2" }];

  const installments = hideInstallmentInfo
    ? []
    : [
        { label: "Angsuran Lunas", value: "1" },
        { label: "Angsuran Seharusnya", value: "1" },
      ];

  const extra = [
    { label: "Jangka Waktu", value: "12 Bulan" },
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

      {!hideInstallmentInfo ? (
        <div className="my-4 h-px w-full bg-slate-200" />
      ) : null}

      {!hideInstallmentInfo ? (
        <div className="grid gap-4">
          {installmentMeta.map((it) => (
            <InfoStack key={it.label} label={it.label} value={it.value} />
          ))}
          {installments.map((it) => (
            <InfoStack key={it.label} label={it.label} value={it.value} />
          ))}
        </div>
      ) : null}

      <div className="my-4 h-px w-full bg-slate-200" />

      <div className="grid gap-4">
        {extra.map((r) => (
          <InfoStack key={r.label} label={r.label} value={r.value} />
        ))}
      </div>

      <div className="my-4 h-px w-full bg-slate-200" />

      {/* Tombol di kolom pinjaman: hapus tombol Tagihan & Denda sesuai permintaan */}
      <div className="grid gap-2.5">
        <LoanActionButton
          icon={History}
          label="Riwayat Transaksi"
          onClick={() =>
            toast("Riwayat Transaksi (prototype)", {
              description: `Rekening: ${accountNo}`,
            })
          }
          className="bg-[#1aa0b5] ring-[#1aa0b5]/25 hover:bg-[#168ea0]"
        />
        <LoanActionButton
          icon={Printer}
          label="Simulasi Tunggakan"
          onClick={() =>
            toast("Simulasi Tunggakan (prototype)", {
              description: `Rekening: ${accountNo}`,
            })
          }
          className="bg-[#1aa0b5] ring-[#1aa0b5]/25 hover:bg-[#168ea0]"
        />
      </div>
    </div>
  );
}

const PAYMENT_METHODS = [
  "Pembayaran Reguler",
  "Pembayaran Penurunan Baki Debet",
  "Pembayaran Khusus",
  "Pelunasan",
] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number];

type BillTotals = {
  pokok: string;
  bunga: string;
  denda: string;
  total: string;
};

function FieldLabelLikeNasabah({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-4 h-px w-full bg-slate-200" />;
}

function BillTotalsBlock({
  totals,
  totalLabel = "Total Tagihan",
}: {
  totals: BillTotals;
  totalLabel?: string;
}) {
  return (
    <div className="grid gap-4">
      <InfoStack label="Tagihan Pokok" value={totals.pokok} />
      <InfoStack label="Tagihan Bunga" value={totals.bunga} />
      <InfoStack label="Tagihan Denda" value={totals.denda} />
      <InfoStack label={totalLabel} value={totals.total} strong />
    </div>
  );
}

function RemainingLoanBlock({ sisaPinjaman }: { sisaPinjaman: string }) {
  return (
    <div className="grid gap-4">
      <InfoStack label="Sisa Pinjaman" value={sisaPinjaman} strong />
    </div>
  );
}

function TransactionRowActions({
  onAdd,
  onDelete,
  disableDelete,
}: {
  onAdd: () => void;
  onDelete: () => void;
  disableDelete: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onAdd}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center",
          "rounded-[5px] bg-[#6B7A90] text-white",
          "ring-1 ring-[#6B7A90]/20 transition hover:bg-[#5f6d82]",
        )}
        aria-label="Tambah transaksi"
        title="Tambah transaksi"
      >
        <Plus className="h-5.5 w-5.5" />
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={disableDelete}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center",
          "rounded-[5px] bg-[#DC3545] text-white",
          "ring-1 ring-[#DC3545]/20 transition hover:bg-[#c72f3d]",
          disableDelete ? "opacity-60 pointer-events-none" : "",
        )}
        aria-label="Hapus transaksi"
        title="Hapus transaksi"
      >
        <Trash2 className="h-5.5 w-5.5" />
      </button>
    </div>
  );
}

function DaftarTagihanTopButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="text-[12px] font-normal text-slate-900">
        Daftar Tagihan dan Denda
      </div>

      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "inline-flex h-10 w-full items-center justify-center gap-3 rounded-[5px] px-4",
          "bg-[#0b5bd3] text-[14px] font-semibold text-white",
          "ring-1 ring-[#0b5bd3]/25 transition hover:bg-[#0a52bf]",
          disabled ? "opacity-60 pointer-events-none" : "",
        )}
        aria-label="Lihat Tagihan & Denda"
        title="Lihat Tagihan & Denda"
      >
        <Eye className="h-5 w-5" />
        Lihat Tagihan & Denda
      </button>
    </div>
  );
}

function TransactionPaymentMethodField({
  value,
  onChange,
  rightActions,
}: {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
  rightActions?: React.ReactNode;
}) {
  const triggerCls = cn(
    "h-[30px] w-full justify-between rounded-[5px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-400",
  );

  return (
    <div className="grid gap-1.5">
      <FieldLabelLikeNasabah>Metode Pembayaran</FieldLabelLikeNasabah>

      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <Select value={value} onValueChange={(v) => onChange(v as PaymentMethod)}>
            <SelectTrigger className={triggerCls}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-[10px] border-slate-200">
              {PAYMENT_METHODS.map((m) => (
                <SelectItem key={m} value={m} className="rounded-[8px]">
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {rightActions ? <div className="shrink-0">{rightActions}</div> : null}
      </div>
    </div>
  );
}

type TransactionRowState = {
  id: string;
  accountNo: string;
  paymentMethod: PaymentMethod;

  daftarTagihanOpen: boolean;

  nominalReguler: string;
  tabunganReguler: "Tanpa Tabungan";
  keteranganReguler: string;

  nominalPokokBakiDebet: string;
  tabunganBakiDebet: "Tanpa Tabungan";
  keteranganBakiDebet: string;

  nominalPokokKhusus: string;
  nominalBungaKhusus: string;
  nominalDendaKhusus: string;
  tabunganKhusus: "Tanpa Tabungan";
  keteranganKhusus: string;

  tabunganPelunasan: "Tanpa Tabungan";
  keteranganPelunasan: string;
};

function makeRow(seed?: Partial<TransactionRowState>): TransactionRowState {
  const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    id,
    accountNo: seed?.accountNo ?? "",
    paymentMethod: seed?.paymentMethod ?? "Pembayaran Reguler",

    daftarTagihanOpen: false,

    nominalReguler: seed?.nominalReguler ?? "0",
    tabunganReguler: "Tanpa Tabungan",
    keteranganReguler: seed?.keteranganReguler ?? "",

    nominalPokokBakiDebet: seed?.nominalPokokBakiDebet ?? "0",
    tabunganBakiDebet: "Tanpa Tabungan",
    keteranganBakiDebet: seed?.keteranganBakiDebet ?? "",

    nominalPokokKhusus: seed?.nominalPokokKhusus ?? "0",
    nominalBungaKhusus: seed?.nominalBungaKhusus ?? "0",
    nominalDendaKhusus: seed?.nominalDendaKhusus ?? "0",
    tabunganKhusus: "Tanpa Tabungan",
    keteranganKhusus: seed?.keteranganKhusus ?? "",

    tabunganPelunasan: "Tanpa Tabungan",
    keteranganPelunasan: seed?.keteranganPelunasan ?? "",
  };
}

export default function LoanInstallmentPaymentV2Table({
  className,
}: {
  className?: string;
}) {
  const fixedPx = 56 + 280;

  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [pickerTargetRowId, setPickerTargetRowId] = React.useState<string | null>(
    null,
  );

  const [rows, setRows] = React.useState<TransactionRowState[]>(() => [makeRow()]);

  function openPickerForRow(rowId: string) {
    setPickerTargetRowId(rowId);
    setPickerOpen(true);
  }

  function onPick(nextAccountNo: string) {
    if (!pickerTargetRowId) return;

    setRows((prev) =>
      prev.map((r) =>
        r.id === pickerTargetRowId ? { ...r, accountNo: nextAccountNo } : r,
      ),
    );

    toast.success("Berhasil Menampilkan Tagihan Nasabah", {
      description: `${deriveNasabahNameByAccountNo(nextAccountNo)} • ${nextAccountNo}`,
    });

    setPickerOpen(false);
    setPickerTargetRowId(null);
  }

  function addRow(afterRowId: string) {
    setRows((prev) => {
      const idx = prev.findIndex((r) => r.id === afterRowId);
      const seed = prev[idx] ?? prev[prev.length - 1];
      const next = makeRow({
        accountNo: seed?.accountNo ?? "",
        paymentMethod: seed?.paymentMethod ?? "Pembayaran Reguler",
      });

      if (idx < 0) return [...prev, next];
      return [...prev.slice(0, idx + 1), next, ...prev.slice(idx + 1)];
    });

    toast.success("Transaksi ditambahkan", {
      description: "Baris transaksi baru ditambahkan di bawahnya.",
    });
  }

  function deleteRow(rowId: string) {
    setRows((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((r) => r.id !== rowId);
    });

    toast("Transaksi dihapus", {
      description: "Baris transaksi dihapus.",
    });
  }

  return (
    <div className={cn("mt-5 overflow-hidden rounded-2xl bg-white", className)}>
      <LoanAccountPickerDialog
        open={pickerOpen}
        onOpenChange={(v) => {
          setPickerOpen(v);
          if (!v) setPickerTargetRowId(null);
        }}
        query=""
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

            <Th>TAGIHAN & TRANSAKSI</Th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => {
            const hasPicked = !!row.accountNo.trim();
            const isReguler = row.paymentMethod === "Pembayaran Reguler";
            const isBakiDebet = row.paymentMethod === "Pembayaran Penurunan Baki Debet";
            const isKhusus = row.paymentMethod === "Pembayaran Khusus";
            const isPelunasan = row.paymentMethod === "Pelunasan";

            const canOpenDaftarTagihan = isReguler || isBakiDebet || isKhusus;

            const totals: BillTotals = { pokok: "0", bunga: "0", denda: "0", total: "0" };
            const totalsLabel = isPelunasan ? "Total Pelunasan" : "Total Tagihan";

            const sisaPinjamanBakiDebet = "9.116.000,00";
            const nominalPelunasan = "5.500.002";

            return (
              <tr key={row.id} className={idx === 0 ? "" : "border-t border-slate-200"}>
                <Td className="px-3">
                  <span className="tabular-nums">{idx + 1}.</span>
                </Td>

                <Td className="pl-3 pr-4">
                  <NasabahRow
                    accountNo={row.accountNo}
                    onAccountNoChange={(v) =>
                      setRows((prev) =>
                        prev.map((x) => (x.id === row.id ? { ...x, accountNo: v } : x)),
                      )
                    }
                    onSearchClick={() => openPickerForRow(row.id)}
                  />

                  {hasPicked ? <SelectedNasabahInfo accountNo={row.accountNo} /> : null}
                </Td>

                <Td className="bg-white">
                  {hasPicked ? (
                    <SelectedPinjamanInfo
                      accountNo={row.accountNo}
                      hideInstallmentInfo={isBakiDebet}
                    />
                  ) : null}
                </Td>

                <Td className="bg-white">
                  <DaftarTagihanDialog
                    open={row.daftarTagihanOpen}
                    onOpenChange={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, daftarTagihanOpen: v } : x,
                        ),
                      )
                    }
                    paymentMethod={row.paymentMethod}
                  />

                  <DaftarTagihanTopButton
                    disabled={!canOpenDaftarTagihan}
                    onClick={() => {
                      if (!canOpenDaftarTagihan) {
                        toast("Belum tersedia", {
                          description:
                            "Lihat Tagihan & Denda pada prototype ini dibuka saat metode pembayaran: Reguler / Penurunan Baki Debet / Khusus.",
                        });
                        return;
                      }
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, daftarTagihanOpen: true } : x,
                        ),
                      );
                    }}
                  />

                  <Divider />

                  <TransactionPaymentMethodField
                    value={row.paymentMethod}
                    onChange={(v) =>
                      setRows((prev) =>
                        prev.map((x) => (x.id === row.id ? { ...x, paymentMethod: v } : x)),
                      )
                    }
                    rightActions={
                      <TransactionRowActions
                        onAdd={() => addRow(row.id)}
                        onDelete={() => deleteRow(row.id)}
                        disableDelete={rows.length <= 1}
                      />
                    }
                  />

                  <Divider />

                  {isBakiDebet ? (
                    <RemainingLoanBlock sisaPinjaman={sisaPinjamanBakiDebet} />
                  ) : (
                    <BillTotalsBlock totals={totals} totalLabel={totalsLabel} />
                  )}

                  <div className="sr-only">
                    {row.nominalReguler}
                    {row.nominalPokokBakiDebet}
                    {row.nominalPokokKhusus}
                    {row.nominalBungaKhusus}
                    {row.nominalDendaKhusus}
                    {row.keteranganReguler}
                    {row.keteranganBakiDebet}
                    {row.keteranganKhusus}
                    {row.keteranganPelunasan}
                    {nominalPelunasan}
                  </div>

                  <TransactionStatusBadge title="Status Transaksi" status="Belum diproses" />
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}