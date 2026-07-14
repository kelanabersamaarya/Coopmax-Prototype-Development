"use client";

import {
  HeartPulse,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

export type PaymentHistoryReceiptData = {
  providerName: string;
  customerName: string;
  customerNo: string;
  amount: string;
  adminFee: string;
  totalTransaction: string;
  sourceFund: SourceFundAccount;
  serviceVariant: "electricity" | "internet" | "postpaid-phone" | "bpjs";
  bpjsMonths?: string;
};

type PaymentHistoryItem = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  status: "Berhasil";
  type: "listrik" | "internet" | "pulsa" | "bpjs";
};

type PaymentHistoryGroup = {
  date: string;
  month: string;
  items: PaymentHistoryItem[];
};

const paymentHistoryGroups: PaymentHistoryGroup[] = [
  {
    date: "20 Juni 2026",
    month: "Jun",
    items: [
      {
        id: "history-pln-1",
        title: "Listrik",
        subtitle: "I Made Wirata • 530000112233",
        amount: "-Rp. 150.000,00",
        status: "Berhasil",
        type: "listrik",
      },
      {
        id: "history-indihome-1",
        title: "Internet",
        subtitle: "I Made Wirata • 122334455667",
        amount: "-Rp. 315.000,00",
        status: "Berhasil",
        type: "internet",
      },
    ],
  },
  {
    date: "19 Juni 2026",
    month: "Jun",
    items: [
      {
        id: "history-xl-1",
        title: "Pulsa Pascabayar",
        subtitle: "Laura Patel • 0819987262",
        amount: "-Rp. 95.000,00",
        status: "Berhasil",
        type: "pulsa",
      },
      {
        id: "history-bpjs-1",
        title: "BPJS Kesehatan",
        subtitle: "Keluarga Laura Patel • 0001234567890",
        amount: "-Rp. 210.000,00",
        status: "Berhasil",
        type: "bpjs",
      },
    ],
  },
  {
    date: "24 Mei 2026",
    month: "Mei",
    items: [
      {
        id: "history-pln-2",
        title: "Listrik",
        subtitle: "I Made Wirata • 530000112233",
        amount: "-Rp. 145.000,00",
        status: "Berhasil",
        type: "listrik",
      },
      {
        id: "history-internet-2",
        title: "Internet",
        subtitle: "I Made Wirata • 122334455667",
        amount: "-Rp. 315.000,00",
        status: "Berhasil",
        type: "internet",
      },
    ],
  },
];

const defaultReceiptSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

function normalizeAmount(value: string) {
  return value.replace(/^-/, "").trim();
}

function parseIdrLike(value: string) {
  const raw = (value ?? "").trim();
  if (!raw) return 0;

  const withoutCurrency = raw.replace(/rp\.?/gi, "").replace(/\s/g, "");
  const integerPart = withoutCurrency.split(",")[0] ?? "";
  const cleaned = integerPart.replace(/[^\d-]/g, "");
  const parsed = Number(cleaned);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return `Rp. ${Math.round(value).toLocaleString("id-ID")},00`;
}

function splitSubtitle(subtitle: string) {
  const parts = subtitle.split("•").map((item) => item.trim());

  return {
    customerName: parts[0] || "Pelanggan",
    customerNo: parts[1] || "-",
  };
}

function getReceiptData(item: PaymentHistoryItem): PaymentHistoryReceiptData {
  const { customerName, customerNo } = splitSubtitle(item.subtitle);
  const amount = normalizeAmount(item.amount);
  const adminFee = "Rp. 2.500,00";
  const totalTransaction = formatIdr(parseIdrLike(amount) + parseIdrLike(adminFee));

  if (item.type === "internet") {
    return {
      providerName: "IndiHome",
      customerName,
      customerNo,
      amount,
      adminFee,
      totalTransaction,
      sourceFund: defaultReceiptSourceFund,
      serviceVariant: "internet",
    };
  }

  if (item.type === "pulsa") {
    return {
      providerName: "XL Pascabayar",
      customerName,
      customerNo,
      amount,
      adminFee,
      totalTransaction,
      sourceFund: defaultReceiptSourceFund,
      serviceVariant: "postpaid-phone",
    };
  }

  if (item.type === "bpjs") {
    return {
      providerName: "BPJS Kesehatan",
      customerName,
      customerNo,
      amount,
      adminFee,
      totalTransaction,
      sourceFund: defaultReceiptSourceFund,
      serviceVariant: "bpjs",
      bpjsMonths: "1 Bulan",
    };
  }

  return {
    providerName: "PLN Postpaid",
    customerName,
    customerNo,
    amount,
    adminFee,
    totalTransaction,
    sourceFund: defaultReceiptSourceFund,
    serviceVariant: "electricity",
  };
}

function getPaymentIcon(type: PaymentHistoryItem["type"]) {
  if (type === "listrik") return Zap;
  if (type === "internet") return Wifi;
  if (type === "bpjs") return HeartPulse;
  return Smartphone;
}

function getPaymentIconClassName(type: PaymentHistoryItem["type"]) {
  if (type === "listrik") return "bg-[#F59E0B]";
  if (type === "internet") return "bg-[#2563EB]";
  if (type === "bpjs") return "bg-[#22C55E]";
  return "bg-[#479DF4]";
}

function PaymentHistoryIcon({ type }: { type: PaymentHistoryItem["type"] }) {
  const Icon = getPaymentIcon(type);

  return (
    <span
      className={cn(
        "grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full text-white",
        getPaymentIconClassName(type),
      )}
    >
      <Icon className="h-[21px] w-[21px] text-white" strokeWidth={2.6} />
    </span>
  );
}

function PaymentHistoryRow({
  item,
  onOpenReceipt,
}: {
  item: PaymentHistoryItem;
  onOpenReceipt?: (receipt: PaymentHistoryReceiptData) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpenReceipt?.(getReceiptData(item))}
      className="flex w-full items-start justify-between gap-4 py-[14px] text-left transition active:scale-[0.99]"
      aria-label={`Lihat bukti transaksi ${item.title}`}
      title="Lihat bukti transaksi"
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <PaymentHistoryIcon type={item.type} />

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
        <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#D12C3B]">
          {item.amount}
        </div>

        <div className="mt-[7px] inline-flex h-[22px] items-center rounded-full bg-[#E8F8EF] px-[10px] text-[11px] font-semibold leading-none text-[#15965A]">
          {item.status}
        </div>
      </div>
    </button>
  );
}

function PaymentHistoryGroupCard({
  group,
  onOpenReceipt,
}: {
  group: PaymentHistoryGroup;
  onOpenReceipt?: (receipt: PaymentHistoryReceiptData) => void;
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
          <PaymentHistoryRow
            key={item.id}
            item={item}
            onOpenReceipt={onOpenReceipt}
          />
        ))}
      </div>
    </section>
  );
}

function EmptyHistoryMonth() {
  return (
    <div className="mt-[42px] rounded-[22px] bg-[#F8FAFC] px-5 py-8 text-center">
      <div className="text-[15px] font-bold text-black">
        Tidak Ada Riwayat Pembayaran
      </div>
      <div className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
        Belum ada pembayaran pada bulan yang dipilih.
      </div>
    </div>
  );
}

export default function NewMBankingPaymentHistoryList({
  activeMonth = "Jun",
  onOpenReceipt,
}: {
  activeMonth?: string;
  onOpenReceipt?: (receipt: PaymentHistoryReceiptData) => void;
}) {
  const filteredGroups = paymentHistoryGroups.filter(
    (group) => group.month === activeMonth,
  );

  if (filteredGroups.length === 0) {
    return <EmptyHistoryMonth />;
  }

  return (
    <div className="mt-[6px]">
      {filteredGroups.map((group) => (
        <PaymentHistoryGroupCard
          key={group.date}
          group={group}
          onOpenReceipt={onOpenReceipt}
        />
      ))}
    </div>
  );
}