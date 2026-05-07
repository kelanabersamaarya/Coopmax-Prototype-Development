"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, History, Printer, List } from "lucide-react";
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
        <span className="inline-flex items-center rounded-[6px] bg-[#DC3545] px-3 py-1.5 text-[13px] font-semibold text-white ring-1 ring-[#DC3545]/25">
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
        "inline-flex h-11 w-full items-center justify-center gap-3 rounded-2xl px-4",
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
  canOpenDaftarTagihan,
  onOpenDaftarTagihan,
  hideInstallmentInfo = false,
}: {
  accountNo: string;
  canOpenDaftarTagihan: boolean;
  onOpenDaftarTagihan: () => void;
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

      <div className="grid gap-3">
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
        <LoanActionButton
          icon={List}
          label="Daftar Tagihan"
          onClick={() => {
            if (!canOpenDaftarTagihan) {
              toast("Belum tersedia", {
                description:
                  "Daftar Tagihan pada prototype ini dibuka saat metode pembayaran: Reguler / Penurunan Baki Debet / Khusus.",
              });
              return;
            }
            onOpenDaftarTagihan();
          }}
          className="bg-[#0b5bd3] ring-[#0b5bd3]/25 hover:bg-[#0a52bf]"
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

function RequiredStar() {
  return <span className="ml-1 text-rose-600">*</span>;
}

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

function TransactionPaymentMethodField({
  value,
  onChange,
}: {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
}) {
  const triggerCls = cn(
    "h-[30px] w-full justify-between rounded-[6px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-400",
  );

  return (
    <div className="grid gap-1.5">
      <FieldLabelLikeNasabah>Metode Pembayaran</FieldLabelLikeNasabah>

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
  );
}

function SingleTabunganField({
  tabungan,
  onTabunganChange,
}: {
  tabungan: "Tanpa Tabungan";
  onTabunganChange: (v: "Tanpa Tabungan") => void;
}) {
  const selectTriggerCls = cn(
    "h-[30px] w-full justify-between rounded-[6px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-400",
  );

  return (
    <div className="grid gap-1.5">
      <FieldLabelLikeNasabah>Tabungan</FieldLabelLikeNasabah>
      <Select
        value={tabungan}
        onValueChange={(v) => onTabunganChange(v as "Tanpa Tabungan")}
      >
        <SelectTrigger className={selectTriggerCls}>
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

function KeteranganField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputCls = cn(
    "h-[30px] w-full rounded-[6px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="grid gap-1.5">
      <FieldLabelLikeNasabah>Keterangan</FieldLabelLikeNasabah>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  );
}

function RegularPaymentFields({
  nominal,
  onNominalChange,
  tabungan,
  onTabunganChange,
  keterangan,
  onKeteranganChange,
}: {
  nominal: string;
  onNominalChange: (v: string) => void;
  tabungan: "Tanpa Tabungan";
  onTabunganChange: (v: "Tanpa Tabungan") => void;
  keterangan: string;
  onKeteranganChange: (v: string) => void;
}) {
  const inputCls = cn(
    "h-[30px] w-full rounded-[6px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <FieldLabelLikeNasabah>
          Nominal Pembayaran <RequiredStar />
        </FieldLabelLikeNasabah>
        <Input
          value={nominal}
          onChange={(e) => onNominalChange(e.target.value)}
          className={cn(inputCls, "text-right tabular-nums")}
          inputMode="decimal"
        />
      </div>

      <SingleTabunganField tabungan={tabungan} onTabunganChange={onTabunganChange} />
      <KeteranganField value={keterangan} onChange={onKeteranganChange} />
    </div>
  );
}

function BakiDebetPaymentFields({
  nominalPokok,
  onNominalPokokChange,
  tabungan,
  onTabunganChange,
  keterangan,
  onKeteranganChange,
}: {
  nominalPokok: string;
  onNominalPokokChange: (v: string) => void;
  tabungan: "Tanpa Tabungan";
  onTabunganChange: (v: "Tanpa Tabungan") => void;
  keterangan: string;
  onKeteranganChange: (v: string) => void;
}) {
  const inputCls = cn(
    "h-[30px] w-full rounded-[6px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <FieldLabelLikeNasabah>
          Nominal Pokok <RequiredStar />
        </FieldLabelLikeNasabah>
        <Input
          value={nominalPokok}
          onChange={(e) => onNominalPokokChange(e.target.value)}
          className={cn(inputCls, "text-right tabular-nums")}
          inputMode="decimal"
        />
      </div>

      <SingleTabunganField tabungan={tabungan} onTabunganChange={onTabunganChange} />
      <KeteranganField value={keterangan} onChange={onKeteranganChange} />
    </div>
  );
}

function parseMoneyInput(v: string) {
  const s = (v ?? "").trim();
  if (!s) return 0;

  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatIdr2(n: number) {
  const safe = Number.isFinite(n) ? n : 0;
  return safe.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function SpecialPaymentFields({
  nominalPokok,
  onNominalPokokChange,
  nominalBunga,
  onNominalBungaChange,
  nominalDenda,
  onNominalDendaChange,
  tabungan,
  onTabunganChange,
  keterangan,
  onKeteranganChange,
}: {
  nominalPokok: string;
  onNominalPokokChange: (v: string) => void;
  nominalBunga: string;
  onNominalBungaChange: (v: string) => void;
  nominalDenda: string;
  onNominalDendaChange: (v: string) => void;
  tabungan: "Tanpa Tabungan";
  onTabunganChange: (v: "Tanpa Tabungan") => void;
  keterangan: string;
  onKeteranganChange: (v: string) => void;
}) {
  const inputCls = cn(
    "h-[30px] w-full rounded-[6px]",
    "border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900",
    "shadow-none",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const total = React.useMemo(() => {
    return (
      parseMoneyInput(nominalPokok) +
      parseMoneyInput(nominalBunga) +
      parseMoneyInput(nominalDenda)
    );
  }, [nominalBunga, nominalDenda, nominalPokok]);

  const totalText = React.useMemo(() => formatIdr2(total), [total]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <FieldLabelLikeNasabah>
          Nominal Pokok <RequiredStar />
        </FieldLabelLikeNasabah>
        <Input
          value={nominalPokok}
          onChange={(e) => onNominalPokokChange(e.target.value)}
          className={cn(inputCls, "text-right tabular-nums")}
          inputMode="decimal"
        />
      </div>

      <div className="grid gap-1.5">
        <FieldLabelLikeNasabah>
          Nominal Bunga <RequiredStar />
        </FieldLabelLikeNasabah>
        <Input
          value={nominalBunga}
          onChange={(e) => onNominalBungaChange(e.target.value)}
          className={cn(inputCls, "text-right tabular-nums")}
          inputMode="decimal"
        />
      </div>

      <div className="grid gap-1.5">
        <FieldLabelLikeNasabah>
          Nominal Denda <RequiredStar />
        </FieldLabelLikeNasabah>
        <Input
          value={nominalDenda}
          onChange={(e) => onNominalDendaChange(e.target.value)}
          className={cn(inputCls, "text-right tabular-nums")}
          inputMode="decimal"
        />
      </div>

      <SingleTabunganField tabungan={tabungan} onTabunganChange={onTabunganChange} />
      <KeteranganField value={keterangan} onChange={onKeteranganChange} />

      <div className="grid gap-1.5">
        <FieldLabelLikeNasabah>Total Pembayaran</FieldLabelLikeNasabah>
        <Input
          value={totalText}
          readOnly
          className={cn(
            inputCls,
            "bg-slate-200/70 text-right text-[18px] font-extrabold text-slate-700 tabular-nums",
          )}
        />
      </div>
    </div>
  );
}

function PelunasanFields({
  nominalPelunasan,
  tabungan,
  onTabunganChange,
  keterangan,
  onKeteranganChange,
}: {
  nominalPelunasan: string;
  tabungan: "Tanpa Tabungan";
  onTabunganChange: (v: "Tanpa Tabungan") => void;
  keterangan: string;
  onKeteranganChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <FieldLabelLikeNasabah>
          Nominal Pelunasan <RequiredStar />
        </FieldLabelLikeNasabah>

        <div
          className={cn(
            "h-[30px] w-full rounded-[6px]",
            "border border-slate-300 bg-slate-200/70 px-3",
            "text-right text-[18px] font-extrabold text-slate-700 tabular-nums",
            "flex items-center justify-end",
          )}
        >
          {nominalPelunasan}
        </div>
      </div>

      <SingleTabunganField tabungan={tabungan} onTabunganChange={onTabunganChange} />
      <KeteranganField value={keterangan} onChange={onKeteranganChange} />
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

  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(
    "Pembayaran Reguler",
  );

  const [daftarTagihanOpen, setDaftarTagihanOpen] = React.useState(false);

  const [nominalReguler, setNominalReguler] = React.useState("0");
  const [tabunganReguler, setTabunganReguler] =
    React.useState<"Tanpa Tabungan">("Tanpa Tabungan");
  const [keteranganReguler, setKeteranganReguler] = React.useState("");

  const [nominalPokokBakiDebet, setNominalPokokBakiDebet] = React.useState("0");
  const [tabunganBakiDebet, setTabunganBakiDebet] =
    React.useState<"Tanpa Tabungan">("Tanpa Tabungan");
  const [keteranganBakiDebet, setKeteranganBakiDebet] = React.useState("");

  const [nominalPokokKhusus, setNominalPokokKhusus] = React.useState("0");
  const [nominalBungaKhusus, setNominalBungaKhusus] = React.useState("0");
  const [nominalDendaKhusus, setNominalDendaKhusus] = React.useState("0");
  const [tabunganKhusus, setTabunganKhusus] =
    React.useState<"Tanpa Tabungan">("Tanpa Tabungan");
  const [keteranganKhusus, setKeteranganKhusus] = React.useState("");

  const [tabunganPelunasan, setTabunganPelunasan] =
    React.useState<"Tanpa Tabungan">("Tanpa Tabungan");
  const [keteranganPelunasan, setKeteranganPelunasan] = React.useState("");

  const hasPicked = !!accountNo.trim();
  const isReguler = paymentMethod === "Pembayaran Reguler";
  const isBakiDebet = paymentMethod === "Pembayaran Penurunan Baki Debet";
  const isKhusus = paymentMethod === "Pembayaran Khusus";
  const isPelunasan = paymentMethod === "Pelunasan";

  const totals: BillTotals = React.useMemo(
    () => ({ pokok: "0", bunga: "0", denda: "0", total: "0" }),
    [],
  );

  const totalsLabel = isPelunasan ? "Total Pelunasan" : "Total Tagihan";

  const sisaPinjamanBakiDebet = "9.116.000,00";
  const nominalPelunasan = "5.500.002";

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
      <DaftarTagihanDialog
        open={daftarTagihanOpen}
        onOpenChange={setDaftarTagihanOpen}
        paymentMethod={paymentMethod}
      />

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

            <Th>TAGIHAN & TRANSAKSI</Th>
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
              {hasPicked ? (
                <SelectedPinjamanInfo
                  accountNo={accountNo}
                  canOpenDaftarTagihan={isReguler || isBakiDebet || isKhusus}
                  onOpenDaftarTagihan={() => setDaftarTagihanOpen(true)}
                  hideInstallmentInfo={isBakiDebet}
                />
              ) : null}
            </Td>

            <Td className="bg-white">
              <TransactionPaymentMethodField
                value={paymentMethod}
                onChange={setPaymentMethod}
              />

              <Divider />

              {isBakiDebet ? (
                <RemainingLoanBlock sisaPinjaman={sisaPinjamanBakiDebet} />
              ) : (
                <BillTotalsBlock totals={totals} totalLabel={totalsLabel} />
              )}

              {isReguler ? (
                <>
                  <Divider />
                  <RegularPaymentFields
                    nominal={nominalReguler}
                    onNominalChange={setNominalReguler}
                    tabungan={tabunganReguler}
                    onTabunganChange={setTabunganReguler}
                    keterangan={keteranganReguler}
                    onKeteranganChange={setKeteranganReguler}
                  />
                </>
              ) : null}

              {isBakiDebet ? (
                <>
                  <Divider />
                  <BakiDebetPaymentFields
                    nominalPokok={nominalPokokBakiDebet}
                    onNominalPokokChange={setNominalPokokBakiDebet}
                    tabungan={tabunganBakiDebet}
                    onTabunganChange={setTabunganBakiDebet}
                    keterangan={keteranganBakiDebet}
                    onKeteranganChange={setKeteranganBakiDebet}
                  />
                </>
              ) : null}

              {isKhusus ? (
                <>
                  <Divider />
                  <SpecialPaymentFields
                    nominalPokok={nominalPokokKhusus}
                    onNominalPokokChange={setNominalPokokKhusus}
                    nominalBunga={nominalBungaKhusus}
                    onNominalBungaChange={setNominalBungaKhusus}
                    nominalDenda={nominalDendaKhusus}
                    onNominalDendaChange={setNominalDendaKhusus}
                    tabungan={tabunganKhusus}
                    onTabunganChange={setTabunganKhusus}
                    keterangan={keteranganKhusus}
                    onKeteranganChange={setKeteranganKhusus}
                  />
                </>
              ) : null}

              {isPelunasan ? (
                <>
                  <Divider />
                  <PelunasanFields
                    nominalPelunasan={nominalPelunasan}
                    tabungan={tabunganPelunasan}
                    onTabunganChange={setTabunganPelunasan}
                    keterangan={keteranganPelunasan}
                    onKeteranganChange={setKeteranganPelunasan}
                  />
                </>
              ) : null}

              {/* Status transaksi (selalu tampil, di bagian paling bawah) */}
              <TransactionStatusBadge title="Status Transaksi" status="Belum diproses" />
            </Td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}