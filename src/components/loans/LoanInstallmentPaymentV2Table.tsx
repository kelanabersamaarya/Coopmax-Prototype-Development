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
  Check,
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
import { PaymentConfirmModal } from "@/components/anggota/PaymentConfirmModals";
import { useNavigate } from "react-router-dom";
import LoanTransactionSuccessModal from "@/components/loans/LoanTransactionSuccessModal";

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

  const installmentMeta = hideInstallmentInfo ? [] : [{ label: "Angsuran ke", value: "2" }];
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
            value={it.value ?? <span className="text-slate-400 font-semibold">-</span>}
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
              value={hasInfo ? it.value : <span className="text-slate-400 font-semibold">-</span>}
            />
          ))}
          {installments.map((it) => (
            <InfoStack
              key={it.label}
              label={it.label}
              value={hasInfo ? it.value : <span className="text-slate-400 font-semibold">-</span>}
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
            value={hasInfo ? r.value : <span className="text-slate-400 font-semibold">-</span>}
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

      <div className="sr-only">{hasInfo ? "ok" : "no"}</div>
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
}: any) {
  // (sengaja dibiarkan as any karena tidak terkait perubahan ini)
  return null;
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

function showPaymentInstallmentSavedToast() {
  toast.custom((t) => (
    <div className="pointer-events-none bg-transparent p-0">
      <div className="pointer-events-auto ml-auto w-[min(520px,calc(100vw-1rem))] mr-4 mt-4">
        <div
          className={cn(
            "rounded-[10px] bg-emerald-600 text-white shadow-xl",
            "ring-1 ring-emerald-700/40",
            "px-4 py-3",
            "text-[12px]",
          )}
        >
          <div className="flex items-center gap-3">
            <Check className="h-6 w-6 text-white" strokeWidth={3} />

            <div className="min-w-0 flex-1">
              <div className="font-semibold leading-snug break-words">
                Transaksi Pembayaran Angsuran Berhasil Tersimpan
              </div>
            </div>

            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full",
                "bg-white/15 ring-1 ring-white/20",
                "transition hover:bg-white/20",
              )}
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-4.5 w-4.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
}

function showAccountPickedToast() {
  toast.custom((t) => (
    <div className="pointer-events-none bg-transparent p-0">
      <div className="pointer-events-auto ml-auto w-[min(520px,calc(100vw-1rem))] mr-4 mt-4">
        <div
          className={cn(
            "rounded-[10px] bg-emerald-600 text-white shadow-xl",
            "ring-1 ring-emerald-700/40",
            "px-4 py-3",
          )}
        >
          <div className="flex items-center gap-3">
            <Check className="h-6 w-6 text-white" strokeWidth={3} />

            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold leading-none">
                Data Berhasil Ditampilkan
              </div>
            </div>

            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full",
                "bg-white/15 ring-1 ring-white/20",
                "transition hover:bg-white/20",
              )}
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-4.5 w-4.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
}

export default function LoanInstallmentPaymentV2Table({
  className,
}: {
  className?: string;
}) {
  const navigate = useNavigate();
  const fixedPx = 56 + 280;

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [pickerTargetRowId, setPickerTargetRowId] = React.useState<string | null>(
    null,
  );

  const [rows, setRows] = React.useState<TransactionRowState[]>(() => [makeRow()]);

  const transactionNo = "BA/050526/0001";

  function openPickerForRow(rowId: string) {
    setPickerTargetRowId(rowId);
    setPickerOpen(true);
  }

  function onPick(nextAccountNo: string) {
    if (!pickerTargetRowId) return;

    let didChange = false;

    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== pickerTargetRowId) return r;
        didChange = r.accountNo !== nextAccountNo;
        return { ...r, accountNo: nextAccountNo };
      }),
    );

    setPickerOpen(false);
    setPickerTargetRowId(null);

    if (didChange) showAccountPickedToast();
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
      <PaymentConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onYes={() => {
          setConfirmOpen(false);
          setSuccessOpen(true);
        }}
      />

      <LoanTransactionSuccessModal
        open={successOpen}
        onOpenChange={(v) => setSuccessOpen(v)}
        onBackToList={() => {
          setSuccessOpen(false);
          showPaymentInstallmentSavedToast();
          navigate("/loans/transactions");
        }}
        onViewDetail={() => {
          setSuccessOpen(false);
          toast.success("Transaksi tersimpan (prototype)", {
            description: `No. Transaksi: ${transactionNo}`,
          });
          navigate(
            "/loans/transactions",
            {
              state: { openDetailTransactionNo: transactionNo },
              replace: true,
            },
          );
        }}
      />

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
                        prev.map((x) => (x.id === row.id ? { ...x, accountNo: v } : x)),
                      )
                    }
                    onSearchClick={() => openPickerForRow(row.id)}
                  />
                  {!!row.accountNo.trim() ? (
                    <SelectedNasabahInfo accountNo={row.accountNo} />
                  ) : null}
                </Td>
                <Td className="bg-white">
                  <SelectedPinjamanInfo
                    accountNo={row.accountNo}
                    disabled={!row.accountNo.trim()}
                    hideInstallmentInfo={
                      row.paymentMethod === "Pembayaran Penurunan Baki Debet" ||
                      row.paymentMethod === "Pelunasan"
                    }
                  />
                </Td>
                <Td className="bg-white">
                  <TransactionStatusBadge title="Status Transaksi" status="Belum diproses" />
                  {row.id === lastRowId ? (
                    <div className="pt-[150px]">
                      <div className="grid gap-4">
                        <SummaryRow label="Total Nominal" value={totalNominal} />
                        <SummaryRow label="Total Denda" value={totalDenda} />
                        <SummaryRow label="Grand Total" value={grandTotal} />
                      </div>
                    </div>
                  ) : null}
                </Td>
                <Td align="center" className="px-3">
                  <div className="pt-[26px]">
                    <button
                      type="button"
                      onClick={() => addRow(row.id)}
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
                      onClick={() => deleteRow(row.id)}
                      disabled={rows.length <= 1}
                      className={cn(
                        "mt-2 inline-flex h-10 w-10 items-center justify-center",
                        "rounded-[5px] bg-[#DC3545] text-white",
                        "ring-1 ring-[#DC3545]/20 transition hover:bg-[#c72f3d]",
                        rows.length <= 1 ? "opacity-60 pointer-events-none" : "",
                      )}
                      aria-label="Hapus transaksi"
                      title="Hapus transaksi"
                    >
                      <Trash2 className="h-5.5 w-5.5" />
                    </button>
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

      <div className="sr-only">{deriveNasabahNameByAccountNo("12260006")}</div>
    </div>
  );
}