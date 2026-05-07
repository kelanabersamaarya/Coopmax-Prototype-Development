"use client";

import * as React from "react";
import {
  Search,
  History,
  Printer,
  Eye,
  Plus,
  Trash2,
  CheckSquare,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import LoanAccountPickerDialog from "@/components/loans/LoanAccountPickerDialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DaftarTagihanDialog from "@/components/loans/DaftarTagihanDialog";
import KhususDendaFieldWithInfo from "@/components/loans/KhususDendaFieldWithInfo";

function Th({
  children,
  className,
  align = "left",
  compact = false,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  compact?: boolean;
}) {
  return (
    <th
      className={cn(
        "border-b border-slate-300/70",
        compact ? "px-4 py-3" : "px-4 py-3",
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
  className,
}: {
  title?: string;
  status?: string;
  className?: string;
}) {
  return (
    <div className={className}>
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
  const info = React.useMemo(() => getNasabahInfoByAccountNo(accountNo), [accountNo]);
  if (!info) return null;

  return (
    <div className="mt-3 bg-white">
      <div className="grid gap-4">
        <InfoStack label="Nama" value={info.nama} />
        <InfoStack label="Alamat" value={info.alamat} />
        <InfoStack label="Produk" value={info.produk} />
        <InfoStack label="No Simpanan Wajib Peminjam" value={info.noSimpananWajib} />
        <InfoStack label="Saldo Simpanan Wajib Peminjam" value={info.saldoSimpananWajib} />
      </div>
    </div>
  );
}

function LoanActionButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-10 w-full items-center justify-center gap-3 rounded-[5px] px-4",
        "text-[14px] font-semibold text-white",
        "ring-1 transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
        disabled ? "opacity-60 pointer-events-none" : "",
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
  disabled,
  hideInstallmentInfo = false,
}: {
  accountNo: string;
  disabled: boolean;
  hideInstallmentInfo?: boolean;
}) {
  const info = React.useMemo(() => getNasabahInfoByAccountNo(accountNo), [accountNo]);
  const hasInfo = !!info;

  const topItems: Array<{ label: string; value?: React.ReactNode }> = hasInfo
    ? [
        ...(info.skemaTagihan
          ? [{ label: "Skema Tagihan", value: info.skemaTagihan }]
          : [{ label: "Skema Tagihan" }]),
        ...(info.satuanGracePeriod
          ? [{ label: "Satuan Grace Period", value: info.satuanGracePeriod }]
          : [{ label: "Satuan Grace Period" }]),
        ...(info.durasiGracePeriod
          ? [{ label: "Durasi Grace Period", value: info.durasiGracePeriod }]
          : [{ label: "Durasi Grace Period" }]),
      ]
    : [
        { label: "Skema Tagihan" },
        { label: "Satuan Grace Period" },
        { label: "Durasi Grace Period" },
      ];

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
          <InfoStack
            key={it.label}
            label={it.label}
            value={
              it.value ?? <span className="text-slate-400 font-semibold">-</span>
            }
          />
        ))}
      </div>

      {!hideInstallmentInfo ? <div className="my-4 h-px w-full bg-slate-200" /> : null}

      {!hideInstallmentInfo ? (
        <div className="grid gap-4">
          {installmentMeta.map((it) => (
            <InfoStack
              key={it.label}
              label={it.label}
              value={
                hasInfo ? it.value : <span className="text-slate-400 font-semibold">-</span>
              }
            />
          ))}
          {installments.map((it) => (
            <InfoStack
              key={it.label}
              label={it.label}
              value={
                hasInfo ? it.value : <span className="text-slate-400 font-semibold">-</span>
              }
            />
          ))}
        </div>
      ) : null}

      <div className="my-4 h-px w-full bg-slate-200" />

      <div className="grid gap-4">
        {extra.map((r) => (
          <InfoStack
            key={r.label}
            label={r.label}
            value={
              hasInfo ? r.value : <span className="text-slate-400 font-semibold">-</span>
            }
          />
        ))}
      </div>

      <div className="my-4 h-px w-full bg-slate-200" />

      <div className="grid gap-2.5">
        <LoanActionButton
          icon={History}
          label="Riwayat Transaksi"
          disabled={disabled}
          onClick={() =>
            toast("Riwayat Transaksi (prototype)", {
              description: `Rekening: ${accountNo || "-"}`,
            })
          }
          className="bg-[#1aa0b5] ring-[#1aa0b5]/25 hover:bg-[#168ea0]"
        />
        <LoanActionButton
          icon={Printer}
          label="Simulasi Tunggakan"
          disabled={disabled}
          onClick={() =>
            toast("Simulasi Tunggakan (prototype)", {
              description: `Rekening: ${accountNo || "-"}`,
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

function BillTotalsBlock({
  totals,
  totalLabel = "Total Tagihan",
  pokokLabel = "Tagihan Pokok",
  bungaLabel = "Tagihan Bunga",
  dendaLabel = "Tagihan Denda",
}: {
  totals: BillTotals;
  totalLabel?: string;
  pokokLabel?: string;
  bungaLabel?: string;
  dendaLabel?: string;
}) {
  return (
    <div className="grid gap-4">
      <InfoStack label={pokokLabel} value={totals.pokok} />
      <InfoStack label={bungaLabel} value={totals.bunga} />
      <InfoStack label={dendaLabel} value={totals.denda} />
      <InfoStack label={totalLabel} value={totals.total} strong />
    </div>
  );
}

function BillTotalsTitlesOnly({
  totalLabel = "Total Tagihan",
  pokokLabel = "Tagihan Pokok",
  bungaLabel = "Tagihan Bunga",
  dendaLabel = "Tagihan Denda",
}: {
  totalLabel?: string;
  pokokLabel?: string;
  bungaLabel?: string;
  dendaLabel?: string;
}) {
  const dash = <span className="text-slate-400 font-semibold">-</span>;

  return (
    <div className="grid gap-4">
      <InfoStack label={pokokLabel} value={dash} />
      <InfoStack label={bungaLabel} value={dash} />
      <InfoStack label={dendaLabel} value={dash} />
      <InfoStack label={totalLabel} value={dash} strong />
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

function RemainingLoanTitlesOnly() {
  return (
    <div className="grid gap-4">
      <InfoStack
        label="Sisa Pinjaman"
        value={<span className="text-slate-400 font-semibold">-</span>}
        strong
      />
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
  disabled = false,
}: {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
  disabled?: boolean;
}) {
  const triggerCls = cn(
    "h-[30px] w-full justify-between rounded-[5px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-400",
    disabled ? "opacity-60 pointer-events-none" : "",
  );

  return (
    <div className="grid gap-1.5">
      <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
        Metode Pembayaran
      </div>

      <Select
        value={value}
        onValueChange={(v) => onChange(v as PaymentMethod)}
        disabled={disabled}
      >
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
  );
}

function TabunganField({
  value,
  onChange,
  disabled,
}: {
  value: "Tanpa Tabungan";
  onChange: (v: "Tanpa Tabungan") => void;
  disabled: boolean;
}) {
  const triggerCls = cn(
    "h-[30px] w-full justify-between rounded-[5px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-400",
    disabled ? "opacity-60 pointer-events-none" : "",
  );

  return (
    <div className="grid gap-1.5">
      <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
        Tabungan
      </div>

      <Select
        value={value}
        onValueChange={(v) => onChange(v as "Tanpa Tabungan")}
        disabled={disabled}
      >
        <SelectTrigger className={triggerCls}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-[10px] border-slate-200">
          <SelectItem value="Tanpa Tabungan" className="rounded-[8px]">
            Tanpa Tabungan
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function PaymentInputBlock({
  paymentMethod,
  disabled,
  nominalReguler,
  onNominalReguler,
  tabunganReguler,
  onTabunganReguler,
  keteranganReguler,
  onKeteranganReguler,
  nominalPokokBakiDebet,
  onNominalPokokBakiDebet,
  tabunganBakiDebet,
  onTabunganBakiDebet,
  keteranganBakiDebet,
  onKeteranganBakiDebet,
  nominalPokokKhusus,
  onNominalPokokKhusus,
  nominalBungaKhusus,
  onNominalBungaKhusus,
  nominalDendaKhusus,
  onNominalDendaKhusus,
  tabunganKhusus,
  onTabunganKhusus,
  keteranganKhusus,
  onKeteranganKhusus,
  tabunganPelunasan,
  onTabunganPelunasan,
  keteranganPelunasan,
  onKeteranganPelunasan,
}: {
  paymentMethod: PaymentMethod;
  disabled: boolean;

  nominalReguler: string;
  onNominalReguler: (v: string) => void;
  tabunganReguler: "Tanpa Tabungan";
  onTabunganReguler: (v: "Tanpa Tabungan") => void;
  keteranganReguler: string;
  onKeteranganReguler: (v: string) => void;

  nominalPokokBakiDebet: string;
  onNominalPokokBakiDebet: (v: string) => void;
  tabunganBakiDebet: "Tanpa Tabungan";
  onTabunganBakiDebet: (v: "Tanpa Tabungan") => void;
  keteranganBakiDebet: string;
  onKeteranganBakiDebet: (v: string) => void;

  nominalPokokKhusus: string;
  onNominalPokokKhusus: (v: string) => void;
  nominalBungaKhusus: string;
  onNominalBungaKhusus: (v: string) => void;
  nominalDendaKhusus: string;
  onNominalDendaKhusus: (v: string) => void;
  tabunganKhusus: "Tanpa Tabungan";
  onTabunganKhusus: (v: "Tanpa Tabungan") => void;
  keteranganKhusus: string;
  onKeteranganKhusus: (v: string) => void;

  tabunganPelunasan: "Tanpa Tabungan";
  onTabunganPelunasan: (v: "Tanpa Tabungan") => void;
  keteranganPelunasan: string;
  onKeteranganPelunasan: (v: string) => void;
}) {
  const inputCls = cn(
    "h-[30px] w-full rounded-[5px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "placeholder:text-slate-500",
    disabled ? "opacity-60 pointer-events-none" : "",
  );

  const required = <span className="text-rose-600"> *</span>;

  if (paymentMethod === "Pelunasan") {
    return (
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
            Nominal Pelunasan{required}
          </div>
          <Input
            value="5.500.002"
            readOnly
            className={cn(inputCls, "bg-slate-100")}
          />
        </div>

        <TabunganField
          value={tabunganPelunasan}
          onChange={onTabunganPelunasan}
          disabled={disabled}
        />

        <div className="grid gap-1.5">
          <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
            Keterangan
          </div>
          <Input
            value={keteranganPelunasan}
            onChange={(e) => onKeteranganPelunasan(e.target.value)}
            className={inputCls}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }

  if (paymentMethod === "Pembayaran Penurunan Baki Debet") {
    return (
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
            Nominal Pokok{required}
          </div>
          <Input
            value={nominalPokokBakiDebet}
            onChange={(e) => onNominalPokokBakiDebet(e.target.value)}
            className={cn(inputCls, "text-right tabular-nums")}
            placeholder="0"
            inputMode="decimal"
            disabled={disabled}
          />
        </div>

        <TabunganField
          value={tabunganBakiDebet}
          onChange={onTabunganBakiDebet}
          disabled={disabled}
        />

        <div className="grid gap-1.5">
          <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
            Keterangan
          </div>
          <Input
            value={keteranganBakiDebet}
            onChange={(e) => onKeteranganBakiDebet(e.target.value)}
            className={inputCls}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }

  if (paymentMethod === "Pembayaran Khusus") {
    return (
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
            Nominal Pokok{required}
          </div>
          <Input
            value={nominalPokokKhusus}
            onChange={(e) => onNominalPokokKhusus(e.target.value)}
            className={cn(inputCls, "text-right tabular-nums")}
            placeholder="0"
            inputMode="decimal"
            disabled={disabled}
          />
        </div>

        <div className="grid gap-1.5">
          <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
            Nominal Bunga{required}
          </div>
          <Input
            value={nominalBungaKhusus}
            onChange={(e) => onNominalBungaKhusus(e.target.value)}
            className={cn(inputCls, "text-right tabular-nums")}
            placeholder="0"
            inputMode="decimal"
            disabled={disabled}
          />
        </div>

        <div className="grid gap-1.5">
          <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
            Nominal Denda{required}
          </div>
          <KhususDendaFieldWithInfo
            value={nominalDendaKhusus}
            onChange={onNominalDendaKhusus}
            disabled={disabled}
            inputClassName={cn(inputCls, "text-right tabular-nums")}
          />
        </div>

        <TabunganField
          value={tabunganKhusus}
          onChange={onTabunganKhusus}
          disabled={disabled}
        />

        <div className="grid gap-1.5">
          <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
            Keterangan
          </div>
          <Input
            value={keteranganKhusus}
            onChange={(e) => onKeteranganKhusus(e.target.value)}
            className={inputCls}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
          Nominal Pembayaran{required}
        </div>
        <Input
          value={nominalReguler}
          onChange={(e) => onNominalReguler(e.target.value)}
          className={cn(inputCls, "text-right tabular-nums")}
          placeholder="0"
          inputMode="decimal"
          disabled={disabled}
        />
      </div>

      <TabunganField
        value={tabunganReguler}
        onChange={onTabunganReguler}
        disabled={disabled}
      />

      <div className="grid gap-1.5">
        <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
          Keterangan
        </div>
        <Input
          value={keteranganReguler}
          onChange={(e) => onKeteranganReguler(e.target.value)}
          className={inputCls}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function InlineTableHeaderRow() {
  return (
    <tr className="bg-white">
      <Th className="px-3" compact>
        <div className="text-left">NO</div>
      </Th>
      <Th className="pl-3 pr-4" compact>
        NASABAH
      </Th>
      <Th compact>PINJAMAN</Th>
      <Th compact>TAGIHAN & TRANSAKSI</Th>
      <Th align="center" compact>
        AKSI
      </Th>
    </tr>
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

function RowActionButtons({
  onAdd,
  onDelete,
  disableDelete,
}: {
  onAdd: () => void;
  onDelete: () => void;
  disableDelete: boolean;
}) {
  return (
    <div className="grid place-items-center gap-2">
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

function BaseDivider() {
  return <div className="my-4 h-px w-full bg-slate-200" />;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-[14px] font-normal text-slate-900">{label} :</div>
      <div className="text-[14px] font-normal text-slate-900 tabular-nums">
        {value}
      </div>
    </div>
  );
}

function SummaryBlock({
  totalNominal,
  totalDenda,
  grandTotal,
  onCancel,
  onSave,
}: {
  totalNominal: string;
  totalDenda: string;
  grandTotal: string;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="pt-[150px]">
      <div className="grid gap-4">
        <SummaryRow label="Total Nominal" value={totalNominal} />
        <SummaryRow label="Total Denda" value={totalDenda} />
        <SummaryRow label="Grand Total" value={grandTotal} />
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "h-[28px] w-[90px] rounded-[6px]",
            "bg-[#6B7A90] text-[11px] font-bold tracking-tight text-white",
            "ring-1 ring-[#6B7A90]/25 transition hover:bg-[#5f6d82]",
          )}
        >
          <X className="h-4 w-4" strokeWidth={3} />
          Batalkan
        </button>

        <button
          type="button"
          onClick={onSave}
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "h-[28px] w-[90px] rounded-[6px]",
            "bg-[#2fb300] text-[11px] font-bold tracking-tight text-white",
            "ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]",
          )}
        >
          <CheckSquare className="h-4 w-4" strokeWidth={3} />
          Simpan
        </button>
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
      const next = makeRow({ accountNo: "", paymentMethod: "Pembayaran Reguler" });
      if (idx < 0) return [...prev, next];
      return [...prev.slice(0, idx + 1), next, ...prev.slice(idx + 1)];
    });

    toast.success("Transaksi ditambahkan", {
      description: "Baris transaksi baru ditambahkan (belum pilih rekening).",
    });
  }

  function deleteRow(rowId: string) {
    setRows((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((r) => r.id !== rowId);
    });

    toast("Transaksi dihapus", { description: "Baris transaksi dihapus." });
  }

  const totalNominal = "0,00";
  const totalDenda = "0,00";
  const grandTotal = "0,00";

  const lastRowId = rows[rows.length - 1]?.id;

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
          <col style={{ width: `calc((100% - ${fixedPx}px) * 0.65 - 100px)` }} />
          <col style={{ width: 100 }} />
        </colgroup>

        <thead className="bg-white">
          <tr>
            <Th className="px-3">
              <div className="text-left">NO</div>
            </Th>
            <Th className="pl-3 pr-4">NASABAH</Th>
            <Th>PINJAMAN</Th>
            <Th>TAGIHAN & TRANSAKSI</Th>
            <Th align="center">AKSI</Th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => {
            const hasPicked = !!row.accountNo.trim();
            const lockRowUi = !hasPicked;

            const isReguler = row.paymentMethod === "Pembayaran Reguler";
            const isBakiDebet =
              row.paymentMethod === "Pembayaran Penurunan Baki Debet";
            const isKhusus = row.paymentMethod === "Pembayaran Khusus";
            const isPelunasan = row.paymentMethod === "Pelunasan";

            const canOpenDaftarTagihan =
              (isReguler || isBakiDebet || isKhusus || isPelunasan) && hasPicked;

            const totals: BillTotals = { pokok: "0", bunga: "0", denda: "0", total: "0" };

            const totalsLabel = isPelunasan ? "Total Pelunasan" : "Total Tagihan";
            const pokokLabel = isPelunasan ? "Total Tagihan Pokok" : "Tagihan Pokok";
            const bungaLabel = isPelunasan ? "Total Tagihan Bunga" : "Tagihan Bunga";
            const dendaLabel = isPelunasan ? "Total Tagihan Denda" : "Tagihan Denda";

            const sisaPinjamanBakiDebet = "9.116.000,00";
            const isLast = row.id === lastRowId;

            const contentRow = (
              <tr key={row.id} className={idx === 0 ? "" : "border-t border-slate-200"}>
                <Td className="px-3">
                  <span className="tabular-nums">{idx + 1}.</span>
                </Td>

                <Td className="pl-3 pr-4">
                  <NasabahRow
                    accountNo={row.accountNo}
                    onAccountNoChange={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, accountNo: v } : x,
                        ),
                      )
                    }
                    onSearchClick={() => openPickerForRow(row.id)}
                  />
                  {hasPicked ? <SelectedNasabahInfo accountNo={row.accountNo} /> : null}
                </Td>

                <Td className="bg-white">
                  <SelectedPinjamanInfo
                    accountNo={row.accountNo}
                    disabled={lockRowUi}
                    hideInstallmentInfo={isBakiDebet || isPelunasan}
                  />
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
                        toast("Rekening belum dipilih", {
                          description: "Silakan pilih rekening terlebih dahulu.",
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

                  <BaseDivider />

                  <TransactionPaymentMethodField
                    value={row.paymentMethod}
                    onChange={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, paymentMethod: v } : x,
                        ),
                      )
                    }
                    disabled={lockRowUi}
                  />

                  <BaseDivider />

                  {lockRowUi ? (
                    isBakiDebet ? (
                      <RemainingLoanTitlesOnly />
                    ) : (
                      <BillTotalsTitlesOnly
                        totalLabel={totalsLabel}
                        pokokLabel={pokokLabel}
                        bungaLabel={bungaLabel}
                        dendaLabel={dendaLabel}
                      />
                    )
                  ) : isBakiDebet ? (
                    <RemainingLoanBlock sisaPinjaman={sisaPinjamanBakiDebet} />
                  ) : (
                    <BillTotalsBlock
                      totals={totals}
                      totalLabel={totalsLabel}
                      pokokLabel={pokokLabel}
                      bungaLabel={bungaLabel}
                      dendaLabel={dendaLabel}
                    />
                  )}

                  <BaseDivider />

                  <PaymentInputBlock
                    paymentMethod={row.paymentMethod}
                    disabled={lockRowUi}
                    nominalReguler={row.nominalReguler}
                    onNominalReguler={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, nominalReguler: v } : x,
                        ),
                      )
                    }
                    tabunganReguler={row.tabunganReguler}
                    onTabunganReguler={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, tabunganReguler: v } : x,
                        ),
                      )
                    }
                    keteranganReguler={row.keteranganReguler}
                    onKeteranganReguler={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, keteranganReguler: v } : x,
                        ),
                      )
                    }
                    nominalPokokBakiDebet={row.nominalPokokBakiDebet}
                    onNominalPokokBakiDebet={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, nominalPokokBakiDebet: v } : x,
                        ),
                      )
                    }
                    tabunganBakiDebet={row.tabunganBakiDebet}
                    onTabunganBakiDebet={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, tabunganBakiDebet: v } : x,
                        ),
                      )
                    }
                    keteranganBakiDebet={row.keteranganBakiDebet}
                    onKeteranganBakiDebet={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, keteranganBakiDebet: v } : x,
                        ),
                      )
                    }
                    nominalPokokKhusus={row.nominalPokokKhusus}
                    onNominalPokokKhusus={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, nominalPokokKhusus: v } : x,
                        ),
                      )
                    }
                    nominalBungaKhusus={row.nominalBungaKhusus}
                    onNominalBungaKhusus={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, nominalBungaKhusus: v } : x,
                        ),
                      )
                    }
                    nominalDendaKhusus={row.nominalDendaKhusus}
                    onNominalDendaKhusus={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, nominalDendaKhusus: v } : x,
                        ),
                      )
                    }
                    tabunganKhusus={row.tabunganKhusus}
                    onTabunganKhusus={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, tabunganKhusus: v } : x,
                        ),
                      )
                    }
                    keteranganKhusus={row.keteranganKhusus}
                    onKeteranganKhusus={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, keteranganKhusus: v } : x,
                        ),
                      )
                    }
                    tabunganPelunasan={row.tabunganPelunasan}
                    onTabunganPelunasan={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, tabunganPelunasan: v } : x,
                        ),
                      )
                    }
                    keteranganPelunasan={row.keteranganPelunasan}
                    onKeteranganPelunasan={(v) =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === row.id ? { ...x, keteranganPelunasan: v } : x,
                        ),
                      )
                    }
                  />

                  <div className="mt-4" />

                  <TransactionStatusBadge title="Status Transaksi" status="Belum diproses" />

                  {isLast ? (
                    <SummaryBlock
                      totalNominal={totalNominal}
                      totalDenda={totalDenda}
                      grandTotal={grandTotal}
                      onCancel={() =>
                        toast("Batalkan (prototype)", {
                          description: "Aksi batalkan belum dihubungkan di V2.",
                        })
                      }
                      onSave={() =>
                        toast.success("Simpan (prototype)", {
                          description: "Transaksi disimpan (dummy).",
                        })
                      }
                    />
                  ) : null}
                </Td>

                <Td align="center" className="px-3">
                  <div className="pt-[26px]">
                    <RowActionButtons
                      onAdd={() => addRow(row.id)}
                      onDelete={() => deleteRow(row.id)}
                      disableDelete={rows.length <= 1}
                    />
                  </div>
                </Td>
              </tr>
            );

            if (idx === 0) return contentRow;

            return (
              <React.Fragment key={row.id}>
                <InlineTableHeaderRow />
                {contentRow}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}