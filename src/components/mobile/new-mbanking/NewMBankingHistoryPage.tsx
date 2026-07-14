import * as React from "react";
import {
  ArrowLeft,
  Banknote,
  CircleDollarSign,
  Filter,
  HeartPulse,
  Landmark,
  Minus,
  Plus,
  ReceiptText,
  Send,
  ShoppingBasket,
  Smartphone,
  WalletCards,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingTransactionFilterPage, {
  type NewMBankingTransactionFilters,
} from "@/components/mobile/new-mbanking/NewMBankingTransactionFilterPage";
import NewMBankingActiveFilterSummary from "@/components/mobile/new-mbanking/NewMBankingActiveFilterSummary";
import NewMBankingEmptyStateImage from "@/components/mobile/new-mbanking/NewMBankingEmptyStateImage";
import NewMBankingHistoryReceiptPage, {
  type NewMBankingHistoryReceiptData,
} from "@/components/mobile/new-mbanking/NewMBankingHistoryReceiptPage";

type TransactionItem = {
  id: string;
  type: "out" | "in";
  title: string;
  subtitle: string;
  amount: string;
  sourceFund: string;
  method: string;
  dateDmy: string;
};

type TransactionGroup = {
  date: string;
  items: TransactionItem[];
};

const transactionGroups: TransactionGroup[] = [
  {
    date: "20 Juni 2026",
    items: [
      {
        id: "trx-1",
        type: "out",
        title: "Transfer Antar Bank",
        subtitle: "Bank BCA • 8890123441",
        amount: "-Rp. 250.000,00",
        sourceFund: "Simpanan Kaya - 112233111",
        method: "Transfer Keluar Bank Lain",
        dateDmy: "20-06-2026",
      },
      {
        id: "trx-9",
        type: "out",
        title: "Transfer Antar Rekening",
        subtitle: "Simpanan Sukarela • 4260029",
        amount: "-Rp. 100.000,00",
        sourceFund: "Simpanan Kaya - 112233111",
        method: "Transfer Antar Rekening",
        dateDmy: "20-06-2026",
      },
      {
        id: "trx-2",
        type: "in",
        title: "Setoran",
        subtitle: "Simpanan Kaya • Teller Koperasi",
        amount: "+Rp. 500.000,00",
        sourceFund: "Simpanan Kaya - 112233111",
        method: "Setoran",
        dateDmy: "20-06-2026",
      },
      {
        id: "trx-11",
        type: "out",
        title: "Pembayaran Listrik",
        subtitle: "PLN Postpaid • 530000112233",
        amount: "-Rp. 352.500,00",
        sourceFund: "Simpanan Kaya - 112233111",
        method: "Pembayaran",
        dateDmy: "20-06-2026",
      },
      {
        id: "trx-12",
        type: "out",
        title: "Pembelian Pulsa",
        subtitle: "Pulsa XL • 0819987262",
        amount: "-Rp. 52.500,00",
        sourceFund: "Simpanan Kaya - 112233111",
        method: "Pembelian",
        dateDmy: "20-06-2026",
      },
      {
        id: "trx-5",
        type: "out",
        title: "Tarikan",
        subtitle: "Simpanan Kaya • Teller Koperasi",
        amount: "-Rp. 150.000,00",
        sourceFund: "Simpanan Kaya - 112233111",
        method: "Tarikan",
        dateDmy: "20-06-2026",
      },
      {
        id: "trx-6",
        type: "out",
        title: "Pembayaran Pinjaman",
        subtitle: "Pinjaman Billing • SMG260004",
        amount: "-Rp. 991.666,00",
        sourceFund: "Simpanan Kaya - 112233111",
        method: "Angsuran",
        dateDmy: "20-06-2026",
      },
    ],
  },
  {
    date: "19 Juni 2026",
    items: [
      {
        id: "trx-3",
        type: "out",
        title: "Transfer Antar Bank",
        subtitle: "Bank Mandiri • 7001234567",
        amount: "-Rp. 125.000,00",
        sourceFund: "Simpanan Sukarela - 4260029",
        method: "Transfer Keluar Bank Lain",
        dateDmy: "19-06-2026",
      },
      {
        id: "trx-10",
        type: "out",
        title: "Transfer Antar Rekening",
        subtitle: "Simpanan Mapan • 112233222",
        amount: "-Rp. 75.000,00",
        sourceFund: "Simpanan Sukarela - 4260029",
        method: "Transfer Antar Rekening",
        dateDmy: "19-06-2026",
      },
      {
        id: "trx-4",
        type: "in",
        title: "Setoran",
        subtitle: "Simpanan Mapan - 112233222",
        amount: "+Rp. 300.000,00",
        sourceFund: "Simpanan Mapan - 112233222",
        method: "Setoran",
        dateDmy: "19-06-2026",
      },
      {
        id: "trx-13",
        type: "out",
        title: "Pembayaran BPJS Kesehatan",
        subtitle: "BPJS Keluarga • 0001234567890",
        amount: "-Rp. 212.500,00",
        sourceFund: "Simpanan Sukarela - 4260029",
        method: "Pembayaran",
        dateDmy: "19-06-2026",
      },
      {
        id: "trx-14",
        type: "out",
        title: "Pembelian Paket Data",
        subtitle: "Paket Data XL • 0819987262",
        amount: "-Rp. 77.500,00",
        sourceFund: "Simpanan Sukarela - 4260029",
        method: "Pembelian",
        dateDmy: "19-06-2026",
      },
      {
        id: "trx-7",
        type: "out",
        title: "Tarikan",
        subtitle: "Simpanan Sukarela • ATM Koperasi",
        amount: "-Rp. 75.000,00",
        sourceFund: "Simpanan Sukarela - 4260029",
        method: "Tarikan",
        dateDmy: "19-06-2026",
      },
      {
        id: "trx-8",
        type: "out",
        title: "Pembayaran Pinjaman",
        subtitle: "Pinjaman Billing • 12260006",
        amount: "-Rp. 991.666,00",
        sourceFund: "Simpanan Sukarela - 4260029",
        method: "Angsuran",
        dateDmy: "19-06-2026",
      },
    ],
  },
];

const allMonthChips = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function parseDmyToDate(value: string): Date | null {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec((value ?? "").trim());
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function monthLabelFromDate(date: Date) {
  return allMonthChips[date.getMonth()] ?? "";
}

function monthLabelFromDmy(value: string) {
  const date = parseDmyToDate(value);
  return date ? monthLabelFromDate(date) : "";
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function uniqueMonths(months: string[]) {
  return months.filter((month, index) => month && months.indexOf(month) === index);
}

function buildMonthRange(start: Date, end: Date) {
  const startMonth = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  const months: string[] = [];

  let cursor = startMonth;
  while (cursor <= endMonth && months.length < 12) {
    months.push(monthLabelFromDate(cursor));
    cursor = addMonths(cursor, 1);
  }

  return uniqueMonths(months);
}

function getVisibleMonthChips(filters: NewMBankingTransactionFilters | null) {
  if (!filters) return allMonthChips;

  const today = startOfDay(new Date());

  if (filters.period === "Hari Ini") {
    return [monthLabelFromDate(today)];
  }

  if (filters.period === "7 Hari Terakhir") {
    const start = new Date(today);
    start.setDate(start.getDate() - 6);
    return buildMonthRange(start, today);
  }

  if (filters.period === "30 Hari Terakhir") {
    const start = new Date(today);
    start.setDate(start.getDate() - 29);
    return buildMonthRange(start, today);
  }

  if (filters.period === "3 Bulan Terakhir") {
    const start = addMonths(today, -2);
    return buildMonthRange(start, today);
  }

  const start = parseDmyToDate(filters.startDate);
  const end = parseDmyToDate(filters.endDate);

  if (start && end) return buildMonthRange(start, end);
  if (start) return [monthLabelFromDate(start)];
  if (end) return [monthLabelFromDate(end)];

  return allMonthChips;
}

function isWithinPeriod(date: Date, filters: NewMBankingTransactionFilters) {
  const today = startOfDay(new Date());
  const target = startOfDay(date);

  if (filters.period === "Hari Ini") {
    return isSameDay(target, today);
  }

  if (filters.period === "7 Hari Terakhir") {
    const start = new Date(today);
    start.setDate(start.getDate() - 6);
    return target >= start && target <= today;
  }

  if (filters.period === "30 Hari Terakhir") {
    const start = new Date(today);
    start.setDate(start.getDate() - 29);
    return target >= start && target <= today;
  }

  if (filters.period === "3 Bulan Terakhir") {
    const start = addMonths(today, -2);
    return target >= start && target <= today;
  }

  const start = parseDmyToDate(filters.startDate);
  const end = parseDmyToDate(filters.endDate);
  const safeStart = start ? startOfDay(start) : null;
  const safeEnd = end ? startOfDay(end) : null;

  if (safeStart && target < safeStart) return false;
  if (safeEnd && target > safeEnd) return false;

  return true;
}

function filterTransactionGroups(
  groups: TransactionGroup[],
  filters: NewMBankingTransactionFilters | null,
) {
  if (!filters) return groups;

  return groups
    .map((group) => {
      const items = group.items.filter((item) => {
        const transactionDate = parseDmyToDate(item.dateDmy);
        if (!transactionDate) return false;

        const matchesSource =
          filters.sourceFunds.length === 0 ||
          filters.sourceFunds.includes(item.sourceFund);

        const matchesMethod =
          filters.methods.length === 0 || filters.methods.includes(item.method);

        const matchesPeriod = isWithinPeriod(transactionDate, filters);

        return matchesSource && matchesMethod && matchesPeriod;
      });

      return { ...group, items };
    })
    .filter((group) => group.items.length > 0);
}

function filterGroupsByMonth(groups: TransactionGroup[], activeMonth: string) {
  return groups
    .map((group) => {
      const items = group.items.filter(
        (item) => monthLabelFromDmy(item.dateDmy) === activeMonth,
      );

      return { ...group, items };
    })
    .filter((group) => group.items.length > 0);
}

function cleanSignedAmount(amount: string) {
  return amount.replace(/^[+-]/, "").trim();
}

function getCollectorName(item: TransactionItem) {
  if (item.id === "trx-2") return "Kantor Pusat";
  if (item.id === "trx-4") return "Gina Farida M.M.";
  if (item.id === "trx-5") return "Kantor Cabang";
  if (item.id === "trx-7") return "Dinda Sudiati";
  return "Kantor Pusat";
}

function buildReceiptData(item: TransactionItem, groupDate: string): NewMBankingHistoryReceiptData {
  const normalizedTitle = item.title.trim().toLowerCase();
  const subtitleParts = item.subtitle.split("•").map((part) => part.trim());
  const primaryInfo = subtitleParts[0] ?? item.subtitle;
  const secondaryInfo = subtitleParts[1] ?? "-";
  const nominalTransaction = cleanSignedAmount(item.amount);

  if (normalizedTitle.includes("transfer antar bank")) {
    return {
      title: item.title,
      subtitle: item.subtitle,
      amount: item.amount,
      sourceFund: item.sourceFund,
      transactionType: "Transfer Antar Bank",
      date: `${groupDate}, 19:00 WIB`,
      status: "Berhasil",
      detailRows: [
        { label: "Bank Tujuan", value: primaryInfo },
        { label: "No. Rekening Tujuan", value: secondaryInfo },
        { label: "Nominal Transfer", value: nominalTransaction },
        { label: "Biaya Admin", value: "2.500,00" },
        { label: "Deskripsi", value: "Transfer via M-Banking" },
      ],
    };
  }

  if (normalizedTitle.includes("transfer antar rekening")) {
    return {
      title: item.title,
      subtitle: item.subtitle,
      amount: item.amount,
      sourceFund: item.sourceFund,
      transactionType: "Transfer Antar Rekening",
      date: `${groupDate}, 19:00 WIB`,
      status: "Berhasil",
      detailRows: [
        { label: "Produk Tujuan", value: primaryInfo },
        { label: "No. Rekening Tujuan", value: secondaryInfo },
        { label: "Nominal Transfer", value: nominalTransaction },
        { label: "Biaya Admin", value: "0,00" },
        { label: "Deskripsi", value: "Transfer sesama rekening koperasi" },
      ],
    };
  }

  if (normalizedTitle.includes("setoran")) {
    return {
      title: item.title,
      subtitle: item.subtitle,
      amount: item.amount,
      sourceFund: item.sourceFund,
      transactionType: "Setoran",
      date: `${groupDate}, 10:24 WIB`,
      status: "Berhasil",
      hideSourceFund: true,
      detailRows: [
        { label: "Produk Simpanan", value: primaryInfo },
        { label: "Kolektor", value: getCollectorName(item) },
        { label: "Nominal Setoran", value: nominalTransaction },
        { label: "Biaya Admin", value: "0,00" },
        { label: "Deskripsi", value: "Setoran simpanan" },
      ],
    };
  }

  if (normalizedTitle.includes("tarikan")) {
    return {
      title: item.title,
      subtitle: item.subtitle,
      amount: item.amount,
      sourceFund: item.sourceFund,
      transactionType: "Tarikan",
      date: `${groupDate}, 11:15 WIB`,
      status: "Berhasil",
      detailRows: [
        { label: "Produk Simpanan", value: primaryInfo },
        { label: "Kolektor", value: getCollectorName(item) },
        { label: "Nominal Tarikan", value: nominalTransaction },
        { label: "Biaya Admin", value: "0,00" },
        { label: "Deskripsi", value: "Tarikan simpanan" },
      ],
    };
  }

  if (normalizedTitle.includes("pembayaran") && !normalizedTitle.includes("pinjaman")) {
    return {
      title: item.title,
      subtitle: item.subtitle,
      amount: item.amount,
      sourceFund: item.sourceFund,
      transactionType: "Pembayaran",
      date: `${groupDate}, 13:20 WIB`,
      status: "Berhasil",
      detailRows: [
        { label: "Penyedia Layanan", value: primaryInfo },
        { label: "No. Pelanggan", value: secondaryInfo },
        { label: "Nominal Pembayaran", value: nominalTransaction },
        { label: "Biaya Admin", value: "2.500,00" },
        { label: "Deskripsi", value: "Pembayaran tagihan via M-Banking" },
      ],
    };
  }

  if (normalizedTitle.includes("pembelian")) {
    return {
      title: item.title,
      subtitle: item.subtitle,
      amount: item.amount,
      sourceFund: item.sourceFund,
      transactionType: "Pembelian",
      date: `${groupDate}, 13:45 WIB`,
      status: "Berhasil",
      detailRows: [
        { label: "Produk Pembelian", value: primaryInfo },
        { label: "Nomor Tujuan", value: secondaryInfo },
        { label: "Nominal Pembelian", value: nominalTransaction },
        { label: "Biaya Admin", value: "2.500,00" },
        { label: "Deskripsi", value: "Pembelian via M-Banking" },
      ],
    };
  }

  if (normalizedTitle.includes("pinjaman") || normalizedTitle.includes("angsuran")) {
    return {
      title: item.title,
      subtitle: item.subtitle,
      amount: item.amount,
      sourceFund: item.sourceFund,
      transactionType: "Pembayaran Angsuran",
      date: `${groupDate}, 14:18 WIB`,
      status: "Berhasil",
      detailRows: [
        { label: "Produk Pinjaman", value: primaryInfo },
        { label: "No. Rek. Pinjaman", value: secondaryInfo },
        { label: "Pokok", value: "833.333,00" },
        { label: "Bunga", value: "83.333,00" },
        { label: "Denda", value: "75.000,00" },
      ],
    };
  }

  return {
    title: item.title,
    subtitle: item.subtitle,
    amount: item.amount,
    sourceFund: item.sourceFund,
    transactionType: item.method,
    date: `${groupDate}, 10:00 WIB`,
    status: "Berhasil",
    detailRows: [
      { label: "Keterangan", value: item.subtitle },
      { label: "Biaya Admin", value: "0,00" },
    ],
  };
}

function TransactionIcon({ item }: { item: TransactionItem }) {
  const normalizedTitle = item.title.trim().toLowerCase();

  if (normalizedTitle.includes("setoran")) {
    return (
      <span className="relative grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
        <WalletCards className="h-[22px] w-[22px] text-white" strokeWidth={2.35} />
        <span className="absolute right-[5px] top-[5px] grid h-[13px] w-[13px] place-items-center rounded-full bg-[#1D4ED8] text-white">
          <Plus className="h-[8px] w-[8px] text-white" strokeWidth={3.2} />
        </span>
      </span>
    );
  }

  if (normalizedTitle.includes("tarikan")) {
    return (
      <span className="relative grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#EF4444] text-white">
        <WalletCards className="h-[22px] w-[22px] text-white" strokeWidth={2.35} />
        <span className="absolute right-[5px] top-[5px] grid h-[13px] w-[13px] place-items-center rounded-full bg-[#DC2626] text-white">
          <Minus className="h-[8px] w-[8px] text-white" strokeWidth={3.2} />
        </span>
      </span>
    );
  }

  if (normalizedTitle.includes("pembayaran listrik")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#F59E0B] text-white">
        <Zap className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  if (normalizedTitle.includes("pembayaran bpjs")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#22C55E] text-white">
        <HeartPulse className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  if (normalizedTitle.includes("pembayaran internet")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#2563EB] text-white">
        <Wifi className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  if (normalizedTitle.includes("pembayaran") && !normalizedTitle.includes("pinjaman")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#7C3AED] text-white">
        <ReceiptText className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  if (normalizedTitle.includes("pembelian pulsa")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
        <Smartphone className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  if (normalizedTitle.includes("pembelian paket data")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#2563EB] text-white">
        <Smartphone className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  if (normalizedTitle.includes("pembelian")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#06B6D4] text-white">
        <ShoppingBasket className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  if (normalizedTitle.includes("pinjaman") || normalizedTitle.includes("angsuran")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#F59E0B] text-white">
        <CircleDollarSign className="h-[22px] w-[22px] text-white" strokeWidth={2.5} />
      </span>
    );
  }

  if (normalizedTitle.includes("transfer antar bank")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#F59E0B] text-white">
        <Landmark className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  if (normalizedTitle.includes("transfer antar rekening")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#18B7A1] text-white">
        <Send className="h-[20px] w-[20px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  if (normalizedTitle.includes("transfer")) {
    return (
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
        <Send className="h-[20px] w-[20px] text-white" strokeWidth={2.6} />
      </span>
    );
  }

  const Icon = item.type === "out" ? Send : Banknote;

  return (
    <span
      className={cn(
        "grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full text-white",
        item.type === "out" ? "bg-[#479DF4]" : "bg-[#33AA00]",
      )}
    >
      <Icon className="h-[20px] w-[20px] text-white" strokeWidth={2.6} />
    </span>
  );
}

function TransactionRow({
  item,
  groupDate,
  onOpenReceipt,
}: {
  item: TransactionItem;
  groupDate: string;
  onOpenReceipt: (receipt: NewMBankingHistoryReceiptData) => void;
}) {
  const isIncome = item.type === "in";

  return (
    <button
      type="button"
      onClick={() => onOpenReceipt(buildReceiptData(item, groupDate))}
      className="flex w-full items-start justify-between gap-4 py-[14px] text-left transition active:scale-[0.99]"
      aria-label={`Lihat bukti transaksi ${item.title}`}
      title="Lihat bukti transaksi"
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <TransactionIcon item={item} />

        <div className="min-w-0 pt-[2px]">
          <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
            {item.title}
          </div>
          <div className="mt-[5px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
            {item.subtitle}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-[2px] text-right">
        <div
          className={cn(
            "text-[14px] font-bold leading-tight tracking-[-0.02em]",
            isIncome ? "text-[#15965A]" : "text-[#D12C3B]",
          )}
        >
          {item.amount}
        </div>

        <div className="mt-[7px] inline-flex h-[22px] items-center rounded-full bg-[#E8F8EF] px-[10px] text-[11px] font-semibold leading-none text-[#15965A]">
          Berhasil
        </div>
      </div>
    </button>
  );
}

function TransactionGroupCard({
  group,
  onOpenReceipt,
}: {
  group: TransactionGroup;
  onOpenReceipt: (receipt: NewMBankingHistoryReceiptData) => void;
}) {
  return (
    <section className="mt-[22px]">
      <div className="flex items-center gap-3">
        <div className="shrink-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
          {group.date}
        </div>
        <div className="h-px min-w-0 flex-1 bg-[#E5E7EB]" />
      </div>

      <div className="mt-[8px] divide-y divide-[#EEF0F4]">
        {group.items.map((item) => (
          <TransactionRow
            key={item.id}
            item={item}
            groupDate={group.date}
            onOpenReceipt={onOpenReceipt}
          />
        ))}
      </div>
    </section>
  );
}

function EmptyFilterResult() {
  return (
    <div className="flex min-h-[calc(100dvh-260px)] flex-col items-center justify-center px-5 pb-[24px] text-center">
      <NewMBankingEmptyStateImage className="mb-5 h-[154px] w-[154px] object-contain" />

      <div className="text-[15px] font-bold text-black">
        Tidak Ada Transaksi
      </div>
      <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
        Tidak ada riwayat transaksi yang cocok dengan filter yang dipilih.
      </div>
    </div>
  );
}

export default function NewMBankingHistoryPage({
  onBack,
  onHomeClick,
  onPortfolioClick,
  onQrisClick,
  onProfileClick,
}: {
  onBack: () => void;
  onHomeClick: () => void;
  onPortfolioClick: () => void;
  onQrisClick: () => void;
  onProfileClick?: () => void;
}) {
  const [activeMonth, setActiveMonth] = React.useState("Jun");
  const [showFilterPage, setShowFilterPage] = React.useState(false);
  const [filters, setFilters] =
    React.useState<NewMBankingTransactionFilters | null>(null);
  const [selectedReceipt, setSelectedReceipt] =
    React.useState<NewMBankingHistoryReceiptData | null>(null);

  const monthChips = React.useMemo(() => getVisibleMonthChips(filters), [filters]);

  const filteredGroups = React.useMemo(
    () => filterTransactionGroups(transactionGroups, filters),
    [filters],
  );

  React.useEffect(() => {
    if (monthChips.includes(activeMonth)) return;

    const monthWithData = monthChips.find((month) =>
      filteredGroups.some((group) =>
        group.items.some((item) => monthLabelFromDmy(item.dateDmy) === month),
      ),
    );

    setActiveMonth(monthWithData ?? monthChips[0] ?? "Jun");
  }, [activeMonth, filteredGroups, monthChips]);

  const visibleGroups = React.useMemo(
    () => filterGroupsByMonth(filteredGroups, activeMonth),
    [activeMonth, filteredGroups],
  );

  const filterIsActive = !!filters;

  if (selectedReceipt) {
    return (
      <NewMBankingHistoryReceiptPage
        receipt={selectedReceipt}
        onBack={() => setSelectedReceipt(null)}
        onDone={() => setSelectedReceipt(null)}
      />
    );
  }

  if (showFilterPage) {
    return (
      <NewMBankingTransactionFilterPage
        initialFilters={filters}
        onApply={setFilters}
        onBack={() => setShowFilterPage(false)}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="min-w-0 flex-1 truncate text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Riwayat Transaksi
          </h1>

          <button
            type="button"
            onClick={() => setShowFilterPage(true)}
            className={cn(
              "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]",
              filterIsActive ? "text-[#479DF4]" : "text-black",
            )}
            aria-label="Filter riwayat transaksi"
            title="Filter"
          >
            <Filter className="h-[22px] w-[22px]" strokeWidth={2.6} />
            {filterIsActive ? (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#479DF4]" />
            ) : null}
          </button>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[184px] pt-[22px]">
          <div className="flex gap-[9px] overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {monthChips.map((month) => {
              const active = month === activeMonth;

              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => setActiveMonth(month)}
                  className={cn(
                    "h-[34px] shrink-0 rounded-full px-[17px]",
                    "text-[13px] font-semibold leading-none transition active:scale-[0.98]",
                    active
                      ? "bg-[#479DF4] text-white"
                      : "bg-[#F1F3F6] text-black",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {month}
                </button>
              );
            })}
          </div>

          <NewMBankingActiveFilterSummary
            filters={filters}
            onClear={() => setFilters(null)}
          />

          <div className="mt-[6px]">
            {visibleGroups.length > 0 ? (
              visibleGroups.map((group) => (
                <TransactionGroupCard
                  key={group.date}
                  group={group}
                  onOpenReceipt={setSelectedReceipt}
                />
              ))
            ) : (
              <EmptyFilterResult />
            )}
          </div>
        </section>
      </main>

      <NewMBankingHomeMenuSection
        activeTab="history"
        onHomeClick={onHomeClick}
        onPortfolioClick={onPortfolioClick}
        onQrisClick={onQrisClick}
        onProfileClick={onProfileClick}
      />
    </div>
  );
}