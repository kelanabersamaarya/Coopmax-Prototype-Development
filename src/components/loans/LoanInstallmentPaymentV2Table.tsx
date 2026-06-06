"use client";

import * as React from "react";
import {
  Check,
  CheckSquare,
  Eye,
  History,
  Plus,
  Printer,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentConfirmModal } from "@/components/anggota/PaymentConfirmModals";
import { cn } from "@/lib/utils";
import { makePenaltyContextKeyForInstallmentV2 } from "@/lib/penaltyContext";
import DaftarTagihanDialog, {
  type DaftarTagihanSavedTotals,
} from "@/components/loans/DaftarTagihanDialog";
import KhususDendaFieldWithInfo from "@/components/loans/KhususDendaFieldWithInfo";
import LoanAccountPickerDialog from "@/components/loans/LoanAccountPickerDialog";
import LoanTransactionHistoryDialog from "@/components/loans/LoanTransactionHistoryDialog";
import LoanTransactionSuccessModal from "@/components/loans/LoanTransactionSuccessModal";
import PinjamanBulananTransactionFields from "@/components/loans/PinjamanBulananTransactionFields";

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

type InfoItem = {
  label: string;
  value: string;
};

type LoanInfo = {
  nama: string;
  alamat: string;
  produk: string;
  isBilling: boolean;
  topItems: InfoItem[];
  firstDividerItems: InfoItem[];
  secondDividerItems: InfoItem[];
  showMonthlyInterestArrears?: boolean;
  monthlyInterestArrearsDefault?: string;
  monthlySettlementItems?: InfoItem[];
};

type TransactionRowState = {
  id: string;
  accountNo: string;
  paymentMethod: PaymentMethod;
  daftarTagihanOpen: boolean;
  savedBillTotals: BillTotals | null;
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
  pinjamanBulananPeriode: string;
};

const REGULER_AUTO_BILL_ACCOUNTS = new Set(["12260002", "12260001"]);

const REGULER_AUTO_BILL: BillTotals = {
  pokok: "833.333",
  bunga: "83.333",
  denda: "75.000",
  total: "991.666",
};

const BILLING_FIRST_DIVIDER_ITEMS: InfoItem[] = [
  { label: "Angsuran ke", value: "2" },
  { label: "Angsuran Lunas", value: "1" },
  { label: "Angsuran Seharusnya", value: "1" },
];

const MONTHLY_FIRST_DIVIDER_ITEMS: InfoItem[] = [
  { label: "Angsuran Ke", value: "1" },
  { label: "Jangka Waktu", value: "24 Bulan" },
  { label: "Tanggal Realisasi", value: "02-06-2026" },
  { label: "Tanggal Jatuh Tempo", value: "27-05-2028" },
  { label: "Tanggal Transaksi Terakhir", value: "-" },
  { label: "Bunga Per Tahun", value: "24,00%" },
  { label: "Metode Bunga", value: "Bunga Efektif" },
];

const MONTHLY_SECOND_DIVIDER_ITEMS: InfoItem[] = [
  { label: "Total Pinjaman", value: "20.000.000,00" },
  { label: "Sisa Pokok Pinjaman", value: "20.000.000,00" },
  { label: "Pokok", value: "833.400,00" },
  { label: "Selisih Tanggal Transaksi", value: "4 Hari" },
  { label: "Bunga", value: "400.000,00" },
  { label: "Angsuran", value: "1.233.400,00" },
];

function getLoanInfoByAccountNo(accountNo: string): LoanInfo | null {
  const billingBase = {
    isBilling: true,
    firstDividerItems: BILLING_FIRST_DIVIDER_ITEMS,
    secondDividerItems: [],
  };

  const map: Record<string, LoanInfo> = {
    "12260006": {
      ...billingBase,
      nama: "Pangeran Sirait",
      alamat: "Gg. Basudewo No. 230, Gorontalo 27811, DIY",
      produk: "Pinjaman Billing",
      topItems: [
        { label: "Produk", value: "Pinjaman Billing" },
        { label: "Skema Tagihan", value: "Tagihan Sesuai Jadwal Angsuran" },
        { label: "Satuan Grace Period", value: "Bulan" },
        { label: "Durasi Grace Period", value: "3" },
        { label: "Sisa Pokok Pinjaman", value: "10.000.000,00" },
      ],
    },
    "12260002": {
      ...billingBase,
      nama: "gaby",
      alamat: "Jl. Galang",
      produk: "Pinjaman Billing",
      topItems: [
        { label: "Produk", value: "Pinjaman Billing" },
        { label: "Skema Tagihan", value: "Jadwal Fleksibel dan Tagihan Berkala" },
        { label: "Satuan Grace Period", value: "Bulan" },
        { label: "Durasi Grace Period", value: "3" },
        { label: "Sisa Pokok Pinjaman", value: "10.000.000,00" },
      ],
    },
    "12260001": {
      ...billingBase,
      nama: "Rika Wastuti",
      alamat: "Jl. Kenanga No. 12",
      produk: "Pinjaman Billing",
      topItems: [
        { label: "Produk", value: "Pinjaman Billing" },
        { label: "Skema Tagihan", value: "Tagihan Dihitung dari Sisa Saldo Pokok" },
        { label: "Satuan Grace Period", value: "Bulan" },
        { label: "Durasi Grace Period", value: "3" },
        { label: "Sisa Pokok Pinjaman", value: "10.000.000,00" },
      ],
    },
    "072260001": {
      ...billingBase,
      nama: "Rika Wastuti",
      alamat: "Jl. Kenanga No. 12",
      produk: "Pinjaman Billing",
      topItems: [
        { label: "Produk", value: "Pinjaman Billing" },
        { label: "Skema Tagihan", value: "Tagihan Dihitung Dari Sisa Saldo Pokok" },
        { label: "Satuan Grace Period", value: "Hari" },
        { label: "Durasi Grace Period", value: "0" },
        { label: "Sisa Pokok Pinjaman", value: "22.000.000,00" },
      ],
    },
    "210260001": {
      nama: "Jenan Aditama",
      alamat: "Denpasar",
      produk: "Pinjaman Bulanan",
      isBilling: false,
      topItems: [{ label: "Produk", value: "Pinjaman Bulanan" }],
      firstDividerItems: MONTHLY_FIRST_DIVIDER_ITEMS,
      secondDividerItems: MONTHLY_SECOND_DIVIDER_ITEMS,
      showMonthlyInterestArrears: true,
      monthlyInterestArrearsDefault: "0,00",
      monthlySettlementItems: [
        { label: "Total Bayar Bunga", value: "400.000,00" },
        { label: "Nominal Pelunasan", value: "20.400.000,00" },
      ],
    },
  };

  return map[accountNo] ?? null;
}

function makeRow(seed?: Partial<TransactionRowState>): TransactionRowState {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    accountNo: seed?.accountNo ?? "",
    paymentMethod: seed?.paymentMethod ?? "Pembayaran Reguler",
    daftarTagihanOpen: false,
    savedBillTotals: seed?.savedBillTotals ?? null,
    nominalReguler: seed?.nominalReguler ?? "",
    tabunganReguler: "Tanpa Tabungan",
    keteranganReguler: seed?.keteranganReguler ?? "",
    nominalPokokBakiDebet: seed?.nominalPokokBakiDebet ?? "0",
    tabunganBakiDebet: "Tanpa Tabungan",
    keteranganBakiDebet: seed?.keteranganBakiDebet ?? "",
    nominalPokokKhusus: seed?.nominalPokokKhusus ?? "0",
    nominalBungaKhusus: seed?.nominalBungaKhusus ?? "0,00",
    nominalDendaKhusus: seed?.nominalDendaKhusus ?? "0,00",
    tabunganKhusus: "Tanpa Tabungan",
    keteranganKhusus: seed?.keteranganKhusus ?? "",
    tabunganPelunasan: "Tanpa Tabungan",
    keteranganPelunasan: seed?.keteranganPelunasan ?? "",
    pinjamanBulananPeriode: seed?.pinjamanBulananPeriode ?? "June 2026",
  };
}

function Dash() {
  return <span className="font-semibold text-slate-400">-</span>;
}

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
        "border-b border-slate-300/70 px-4 py-3 text-[12px] font-extrabold uppercase tracking-wide text-[#64748B]",
        compact ? "px-4 py-3" : "",
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
        "px-4 py-5 align-top text-[13px] font-medium text-slate-900",
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
          "break-words text-[14px] font-semibold leading-snug text-slate-900",
          strong ? "font-extrabold" : "",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function BaseDivider() {
  return <div className="my-4 h-px w-full bg-slate-200" />;
}

function InfoGroup({
  items,
  empty = false,
}: {
  items: InfoItem[];
  empty?: boolean;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <InfoStack
          key={item.label}
          label={item.label}
          value={empty ? <Dash /> : item.value}
        />
      ))}
    </div>
  );
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
            "h-[30px] min-w-0 rounded-l-[5px] rounded-r-none border-slate-300",
            "bg-white text-[14px] font-medium text-slate-900 shadow-none",
            "placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
        />
        <button
          type="button"
          onClick={onSearchClick}
          className={cn(
            "inline-flex h-[30px] w-10 shrink-0 items-center justify-center",
            "rounded-l-none rounded-r-[5px] bg-[#6B7A90] text-white",
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

function SelectedNasabahInfo({ accountNo }: { accountNo: string }) {
  const info = React.useMemo(() => getLoanInfoByAccountNo(accountNo), [accountNo]);
  if (!info) return null;

  return (
    <div className="mt-3 grid gap-4 bg-white">
      <InfoStack label="Nama" value={info.nama} />
      <InfoStack label="Alamat" value={info.alamat} />
    </div>
  );
}

function LoanActionButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-10 w-full items-center justify-center gap-3 rounded-[5px] px-4",
        "bg-[#1aa0b5] text-[14px] font-semibold text-white ring-1 ring-[#1aa0b5]/25",
        "transition hover:bg-[#168ea0]",
        disabled ? "pointer-events-none opacity-60" : "",
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
  onOpenHistory,
}: {
  accountNo: string;
  disabled: boolean;
  onOpenHistory: () => void;
}) {
  const isEmptyInitialLayout = accountNo.trim().length === 0;
  const info = React.useMemo(() => getLoanInfoByAccountNo(accountNo), [accountNo]);
  const displayInfo =
    info ??
    ({
      nama: "",
      alamat: "",
      produk: "Pinjaman Bulanan",
      isBilling: false,
      topItems: [{ label: "Produk", value: "Pinjaman Bulanan" }],
      firstDividerItems: MONTHLY_FIRST_DIVIDER_ITEMS,
      secondDividerItems: MONTHLY_SECOND_DIVIDER_ITEMS,
      showMonthlyInterestArrears: true,
      monthlyInterestArrearsDefault: "0,00",
      monthlySettlementItems: [
        { label: "Total Bayar Bunga", value: "400.000,00" },
        { label: "Nominal Pelunasan", value: "20.400.000,00" },
      ],
    } satisfies LoanInfo);

  const [interestArrears, setInterestArrears] = React.useState("0,00");

  React.useEffect(() => {
    setInterestArrears(
      isEmptyInitialLayout
        ? ""
        : displayInfo.monthlyInterestArrearsDefault ?? "0,00",
    );
  }, [
    accountNo,
    displayInfo.monthlyInterestArrearsDefault,
    isEmptyInitialLayout,
  ]);

  return (
    <div className="bg-white">
      <InfoGroup items={displayInfo.topItems} empty={isEmptyInitialLayout} />

      {displayInfo.firstDividerItems.length > 0 ? (
        <>
          <BaseDivider />
          <InfoGroup
            items={displayInfo.firstDividerItems}
            empty={isEmptyInitialLayout}
          />
        </>
      ) : null}

      {displayInfo.secondDividerItems.length > 0 ? (
        <>
          <BaseDivider />
          <InfoGroup
            items={displayInfo.secondDividerItems}
            empty={isEmptyInitialLayout}
          />
        </>
      ) : null}

      {displayInfo.showMonthlyInterestArrears ||
      (displayInfo.monthlySettlementItems?.length ?? 0) > 0 ? (
        <>
          <BaseDivider />

          <div className="grid gap-4">
            {displayInfo.showMonthlyInterestArrears ? (
              <div className="grid gap-1.5">
                <div className="text-[12px] font-normal text-black">
                  Tunggakan Bunga
                </div>
                <Input
                  value={interestArrears}
                  onChange={(e) => setInterestArrears(e.target.value)}
                  className={cn(
                    "h-[30px] w-full rounded-[5px] border border-slate-300 bg-white px-3",
                    "text-right text-[14px] font-semibold text-slate-900 shadow-none",
                    "placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0",
                    disabled ? "pointer-events-none opacity-60" : "",
                  )}
                  inputMode="decimal"
                  placeholder="0,00"
                  disabled={disabled}
                />
              </div>
            ) : null}

            {(displayInfo.monthlySettlementItems ?? []).map((item) => (
              <InfoStack
                key={item.label}
                label={item.label}
                value={isEmptyInitialLayout ? <Dash /> : item.value}
              />
            ))}
          </div>
        </>
      ) : null}

      <BaseDivider />

      <div className="grid gap-2.5">
        <LoanActionButton
          icon={History}
          label="Riwayat Transaksi"
          disabled={disabled}
          onClick={onOpenHistory}
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
        />
      </div>
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
          disabled ? "pointer-events-none opacity-60" : "",
        )}
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
        <SelectTrigger
          className={cn(
            "h-[30px] w-full justify-between rounded-[5px] border border-slate-300",
            "bg-white px-3 text-[14px] font-medium text-slate-900 shadow-none",
            "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            "[&>svg]:text-slate-400",
            disabled ? "pointer-events-none opacity-60" : "",
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-[10px] border-slate-200">
          {PAYMENT_METHODS.map((method) => (
            <SelectItem key={method} value={method} className="rounded-[8px]">
              {method}
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
        <SelectTrigger
          className={cn(
            "h-[30px] w-full justify-between rounded-[5px] border border-slate-300",
            "bg-white px-3 text-[14px] font-medium text-slate-900 shadow-none",
            "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            disabled ? "pointer-events-none opacity-60" : "",
          )}
        >
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

function BillTotalsTitlesOnly({
  totalLabel = "Total Tagihan",
}: {
  totalLabel?: string;
}) {
  return (
    <div className="grid gap-4">
      <InfoStack label="Tagihan Pokok" value={<Dash />} />
      <InfoStack label="Tagihan Bunga" value={<Dash />} />
      <InfoStack label="Tagihan Denda" value={<Dash />} />
      <InfoStack label={totalLabel} value={<Dash />} strong />
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
      <InfoStack label="Sisa Pinjaman" value={<Dash />} strong />
    </div>
  );
}

function PaymentTextInput({
  label,
  value,
  onChange,
  className,
  placeholder,
  inputMode,
  disabled,
}: {
  label: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  className: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
        {label}
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        placeholder={placeholder}
        inputMode={inputMode}
        disabled={disabled}
      />
    </div>
  );
}

function PaymentInputBlock({
  row,
  accountNo,
  disabled,
  onChange,
}: {
  row: TransactionRowState;
  accountNo: string;
  disabled: boolean;
  onChange: (next: Partial<TransactionRowState>) => void;
}) {
  if (!accountNo || accountNo === "210260001") {
    return (
      <PinjamanBulananTransactionFields
        disabled={disabled}
        nominal={row.nominalReguler || "0,00"}
        onNominalChange={(value) => onChange({ nominalReguler: value })}
        bayarBunga={row.nominalBungaKhusus || "0,00"}
        onBayarBungaChange={(value) => onChange({ nominalBungaKhusus: value })}
        denda={row.nominalDendaKhusus || "0,00"}
        onDendaChange={(value) => onChange({ nominalDendaKhusus: value })}
        tabungan={row.tabunganReguler}
        onTabunganChange={(value) => onChange({ tabunganReguler: value })}
        keterangan={row.keteranganReguler}
        onKeteranganChange={(value) => onChange({ keteranganReguler: value })}
        periode={row.pinjamanBulananPeriode}
        onPeriodeChange={(value) => onChange({ pinjamanBulananPeriode: value })}
      />
    );
  }

  const inputCls = cn(
    "h-[30px] w-full rounded-[5px] border border-slate-300 bg-white px-3",
    "text-[14px] font-medium text-slate-900 shadow-none",
    "placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0",
    disabled ? "pointer-events-none opacity-60" : "",
  );
  const required = <span className="text-rose-600"> *</span>;

  if (row.paymentMethod === "Pelunasan") {
    return (
      <div className="grid gap-4">
        <PaymentTextInput
          label={<>Nominal Pelunasan{required}</>}
          value="5.500.002"
          onChange={() => {}}
          className={cn(inputCls, "bg-slate-100")}
          disabled={disabled}
        />

        <TabunganField
          value={row.tabunganPelunasan}
          onChange={(v) => onChange({ tabunganPelunasan: v })}
          disabled={disabled}
        />

        <PaymentTextInput
          label="Keterangan"
          value={row.keteranganPelunasan}
          onChange={(v) => onChange({ keteranganPelunasan: v })}
          className={inputCls}
          disabled={disabled}
        />
      </div>
    );
  }

  if (row.paymentMethod === "Pembayaran Penurunan Baki Debet") {
    return (
      <div className="grid gap-4">
        <PaymentTextInput
          label={<>Nominal Pokok{required}</>}
          value={row.nominalPokokBakiDebet}
          onChange={(v) => onChange({ nominalPokokBakiDebet: v })}
          className={cn(inputCls, "text-right tabular-nums")}
          inputMode="decimal"
          disabled={disabled}
        />

        <TabunganField
          value={row.tabunganBakiDebet}
          onChange={(v) => onChange({ tabunganBakiDebet: v })}
          disabled={disabled}
        />

        <PaymentTextInput
          label="Keterangan"
          value={row.keteranganBakiDebet}
          onChange={(v) => onChange({ keteranganBakiDebet: v })}
          className={inputCls}
          disabled={disabled}
        />
      </div>
    );
  }

  if (row.paymentMethod === "Pembayaran Khusus") {
    return (
      <div className="grid gap-4">
        <PaymentTextInput
          label={<>Nominal Pokok{required}</>}
          value={row.nominalPokokKhusus}
          onChange={(v) => onChange({ nominalPokokKhusus: v })}
          className={cn(inputCls, "text-right tabular-nums")}
          inputMode="decimal"
          disabled={disabled}
        />

        <PaymentTextInput
          label={<>Nominal Bunga{required}</>}
          value={row.nominalBungaKhusus}
          onChange={(v) => onChange({ nominalBungaKhusus: v })}
          className={cn(inputCls, "text-right tabular-nums")}
          inputMode="decimal"
          disabled={disabled}
        />

        <div className="grid gap-1.5">
          <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
            Nominal Denda{required}
          </div>
          <KhususDendaFieldWithInfo
            value={row.nominalDendaKhusus}
            onChange={(v) => onChange({ nominalDendaKhusus: v })}
            disabled={disabled}
            inputClassName={cn(inputCls, "text-right tabular-nums")}
          />
        </div>

        <TabunganField
          value={row.tabunganKhusus}
          onChange={(v) => onChange({ tabunganKhusus: v })}
          disabled={disabled}
        />

        <PaymentTextInput
          label="Keterangan"
          value={row.keteranganKhusus}
          onChange={(v) => onChange({ keteranganKhusus: v })}
          className={inputCls}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <PaymentTextInput
        label={<>Nominal Pembayaran{required}</>}
        value={row.nominalReguler}
        onChange={(v) => onChange({ nominalReguler: v })}
        className={cn(inputCls, "text-right tabular-nums")}
        placeholder="0"
        inputMode="decimal"
        disabled={disabled}
      />

      <TabunganField
        value={row.tabunganReguler}
        onChange={(v) => onChange({ tabunganReguler: v })}
        disabled={disabled}
      />

      <PaymentTextInput
        label="Keterangan"
        value={row.keteranganReguler}
        onChange={(v) => onChange({ keteranganReguler: v })}
        className={inputCls}
        disabled={disabled}
      />
    </div>
  );
}

function TransactionStatusBadge() {
  return (
    <div>
      <div className="text-[12px] font-normal text-slate-900">Status Transaksi</div>
      <div className="mt-2">
        <span className="inline-flex items-center rounded-[5px] bg-[#DC3545] px-3 py-1 text-[13px] font-semibold text-white ring-1 ring-[#DC3545]/25">
          Belum diproses
        </span>
      </div>
    </div>
  );
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
        className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#6B7A90] text-white ring-1 ring-[#6B7A90]/20 transition hover:bg-[#5f6d82]"
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
          "inline-flex h-10 w-10 items-center justify-center rounded-[5px]",
          "bg-[#DC3545] text-white ring-1 ring-[#DC3545]/20 transition hover:bg-[#c72f3d]",
          disableDelete ? "pointer-events-none opacity-60" : "",
        )}
        aria-label="Hapus transaksi"
        title="Hapus transaksi"
      >
        <Trash2 className="h-5.5 w-5.5" />
      </button>
    </div>
  );
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
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="pt-[150px]">
      <div className="grid gap-4">
        <SummaryRow label="Total Nominal" value="0,00" />
        <SummaryRow label="Total Denda" value="0,00" />
        <SummaryRow label="Grand Total" value="0,00" />
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-[28px] w-[90px] items-center justify-center gap-2 rounded-[6px] bg-[#6B7A90] text-[11px] font-bold tracking-tight text-white ring-1 ring-[#6B7A90]/25 transition hover:bg-[#5f6d82]"
        >
          <X className="h-4 w-4" strokeWidth={3} />
          Batalkan
        </button>

        <button
          type="button"
          onClick={onSave}
          className="inline-flex h-[28px] w-[90px] items-center justify-center gap-2 rounded-[6px] bg-[#2fb300] text-[11px] font-bold tracking-tight text-white ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]"
        >
          <CheckSquare className="h-4 w-4" strokeWidth={3} />
          Simpan
        </button>
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

function showPaymentInstallmentSavedToast() {
  toast.custom((t) => (
    <div className="pointer-events-none bg-transparent p-0">
      <div className="pointer-events-auto ml-auto mr-4 mt-4 w-[min(520px,calc(100vw-1rem))]">
        <div className="rounded-[10px] bg-emerald-600 px-4 py-3 text-[12px] text-white shadow-xl ring-1 ring-emerald-700/40">
          <div className="flex items-center gap-3">
            <Check className="h-6 w-6 text-white" strokeWidth={3} />
            <div className="min-w-0 flex-1">
              <div className="break-words font-semibold leading-snug">
                Transaksi Pembayaran Angsuran Berhasil Tersimpan
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.dismiss(t)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 transition hover:bg-white/20"
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
      <div className="pointer-events-auto ml-auto mr-4 mt-4 w-[min(520px,calc(100vw-1rem))]">
        <div className="rounded-[10px] bg-emerald-600 px-4 py-3 text-white shadow-xl ring-1 ring-emerald-700/40">
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
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 transition hover:bg-white/20"
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
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [historyAccountNo, setHistoryAccountNo] = React.useState("");
  const [rows, setRows] = React.useState<TransactionRowState[]>(() => [makeRow()]);

  const lastRowId = rows[rows.length - 1]?.id;
  const transactionNo = "BA/050526/0001";

  function patchRow(rowId: string, patch: Partial<TransactionRowState>) {
    setRows((prev) => prev.map((row) => (row.id === rowId ? { ...row, ...patch } : row)));
  }

  function openPickerForRow(rowId: string) {
    setPickerTargetRowId(rowId);
    setPickerOpen(true);
  }

  function onPick(nextAccountNo: string) {
    if (!pickerTargetRowId) return;

    let didChange = false;

    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== pickerTargetRowId) return row;
        didChange = row.accountNo !== nextAccountNo;

        return {
          ...row,
          accountNo: nextAccountNo,
          savedBillTotals: null,
        };
      }),
    );

    setPickerOpen(false);
    setPickerTargetRowId(null);

    if (didChange) showAccountPickedToast();
  }

  function addRow(afterRowId: string) {
    setRows((prev) => {
      const idx = prev.findIndex((row) => row.id === afterRowId);
      const next = makeRow();

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
      return prev.filter((row) => row.id !== rowId);
    });

    toast("Transaksi dihapus", { description: "Baris transaksi dihapus." });
  }

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
        onOpenChange={setSuccessOpen}
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
          navigate("/loans/transactions", {
            state: { openDetailTransactionNo: transactionNo },
          });
        }}
      />

      <LoanAccountPickerDialog
        open={pickerOpen}
        onOpenChange={(open) => {
          setPickerOpen(open);
          if (!open) setPickerTargetRowId(null);
        }}
        query=""
        onPick={onPick}
      />

      <LoanTransactionHistoryDialog
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        accountNo={historyAccountNo || "-"}
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
            const accountNo = row.accountNo.trim();
            const hasPicked = accountNo.length > 0;
            const lockRowUi = !hasPicked;
            const isPinjamanBulanan = !hasPicked || accountNo === "210260001";
            const isReguler = row.paymentMethod === "Pembayaran Reguler";
            const isBakiDebet = row.paymentMethod === "Pembayaran Penurunan Baki Debet";
            const isKhusus = row.paymentMethod === "Pembayaran Khusus";
            const isPelunasan = row.paymentMethod === "Pelunasan";
            const canOpenDaftarTagihan = hasPicked;
            const totalsLabel = isPelunasan ? "Total Pelunasan" : "Total Tagihan";

            const fallbackTotals: BillTotals =
              isKhusus || isPelunasan
                ? {
                    pokok: "5.333.334",
                    bunga: "499.998",
                    denda: "225.000",
                    total: "6.058.332",
                  }
                : isReguler && REGULER_AUTO_BILL_ACCOUNTS.has(accountNo)
                  ? REGULER_AUTO_BILL
                  : {
                      pokok: "0",
                      bunga: "0",
                      denda: "0",
                      total: "0",
                    };

            const totals = row.savedBillTotals ?? fallbackTotals;
            const penaltyContextKey = accountNo
              ? makePenaltyContextKeyForInstallmentV2(accountNo)
              : undefined;

            const contentRow = (
              <tr key={row.id} className={idx === 0 ? "" : "border-t border-slate-200"}>
                <Td className="px-3">
                  <span className="tabular-nums">{idx + 1}.</span>
                </Td>

                <Td className="pl-3 pr-4">
                  <NasabahRow
                    accountNo={row.accountNo}
                    onAccountNoChange={(value) =>
                      patchRow(row.id, {
                        accountNo: value,
                        savedBillTotals: null,
                      })
                    }
                    onSearchClick={() => openPickerForRow(row.id)}
                  />
                  {hasPicked ? <SelectedNasabahInfo accountNo={row.accountNo} /> : null}
                </Td>

                <Td className="bg-white">
                  <SelectedPinjamanInfo
                    accountNo={row.accountNo}
                    disabled={lockRowUi}
                    onOpenHistory={() => {
                      if (!accountNo) return;
                      setHistoryAccountNo(accountNo);
                      setHistoryOpen(true);
                    }}
                  />
                </Td>

                <Td className="bg-white">
                  {!isPinjamanBulanan ? (
                    <>
                      <DaftarTagihanDialog
                        open={row.daftarTagihanOpen}
                        onOpenChange={(open) =>
                          patchRow(row.id, { daftarTagihanOpen: open })
                        }
                        paymentMethod={row.paymentMethod}
                        accountNo={row.accountNo}
                        contextKey={penaltyContextKey}
                        onSaveTotals={(nextTotals: DaftarTagihanSavedTotals) => {
                          patchRow(row.id, {
                            savedBillTotals: nextTotals,
                            nominalPokokKhusus: isKhusus
                              ? nextTotals.pokok
                              : row.nominalPokokKhusus,
                            nominalBungaKhusus: isKhusus
                              ? nextTotals.bunga
                              : row.nominalBungaKhusus,
                            nominalDendaKhusus: isKhusus
                              ? nextTotals.denda
                              : row.nominalDendaKhusus,
                            nominalPokokBakiDebet: isBakiDebet
                              ? nextTotals.pokok
                              : row.nominalPokokBakiDebet,
                          });
                        }}
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

                          patchRow(row.id, { daftarTagihanOpen: true });
                        }}
                      />

                      <BaseDivider />

                      <TransactionPaymentMethodField
                        value={row.paymentMethod}
                        onChange={(paymentMethod) =>
                          patchRow(row.id, {
                            paymentMethod,
                            savedBillTotals: null,
                          })
                        }
                        disabled={lockRowUi}
                      />

                      <BaseDivider />

                      {lockRowUi ? (
                        isBakiDebet ? (
                          <RemainingLoanTitlesOnly />
                        ) : (
                          <BillTotalsTitlesOnly totalLabel={totalsLabel} />
                        )
                      ) : isBakiDebet ? (
                        <RemainingLoanBlock sisaPinjaman="9.116.000,00" />
                      ) : (
                        <BillTotalsBlock totals={totals} totalLabel={totalsLabel} />
                      )}

                      <BaseDivider />
                    </>
                  ) : null}

                  <PaymentInputBlock
                    row={row}
                    accountNo={accountNo}
                    disabled={lockRowUi}
                    onChange={(patch) => patchRow(row.id, patch)}
                  />

                  <div className="mt-4" />

                  <TransactionStatusBadge />

                  {row.id === lastRowId ? (
                    <SummaryBlock
                      onCancel={() => navigate("/loans/transactions")}
                      onSave={() => setConfirmOpen(true)}
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