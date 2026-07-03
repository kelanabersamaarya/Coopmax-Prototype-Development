"use client";

import {
  Bolt,
  HeartPulse,
  Smartphone,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  items: PaymentHistoryItem[];
};

const paymentHistoryGroups: PaymentHistoryGroup[] = [
  {
    date: "20 Juni 2026",
    items: [
      {
        id: "history-pln-1",
        title: "PLN Rumah",
        subtitle: "Listrik • 530000112233",
        amount: "-Rp. 150.000,00",
        status: "Berhasil",
        type: "listrik",
      },
      {
        id: "history-indihome-1",
        title: "IndiHome",
        subtitle: "Internet • 122334455667",
        amount: "-Rp. 315.000,00",
        status: "Berhasil",
        type: "internet",
      },
    ],
  },
  {
    date: "19 Juni 2026",
    items: [
      {
        id: "history-xl-1",
        title: "XL Pascabayar",
        subtitle: "Pulsa Pascabayar • 0819987262",
        amount: "-Rp. 95.000,00",
        status: "Berhasil",
        type: "pulsa",
      },
      {
        id: "history-bpjs-1",
        title: "BPJS Keluarga",
        subtitle: "BPJS Kesehatan • 0001234567890",
        amount: "-Rp. 210.000,00",
        status: "Berhasil",
        type: "bpjs",
      },
    ],
  },
];

function getPaymentIcon(type: PaymentHistoryItem["type"]) {
  if (type === "listrik") return Bolt;
  if (type === "internet") return Wifi;
  if (type === "bpjs") return HeartPulse;
  return Smartphone;
}

function getPaymentIconClassName(type: PaymentHistoryItem["type"]) {
  if (type === "listrik") return "bg-[#FFF7E6] text-[#F59E0B]";
  if (type === "internet") return "bg-[#EAF3FF] text-[#2563EB]";
  if (type === "bpjs") return "bg-[#EAF8EF] text-[#22C55E]";
  return "bg-[#EEF6FF] text-[#479DF4]";
}

function PaymentHistoryIcon({ type }: { type: PaymentHistoryItem["type"] }) {
  const Icon = getPaymentIcon(type);

  return (
    <span
      className={cn(
        "grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full",
        getPaymentIconClassName(type),
      )}
    >
      <Icon className="h-[21px] w-[21px]" strokeWidth={2.6} />
    </span>
  );
}

function PaymentHistoryRow({ item }: { item: PaymentHistoryItem }) {
  return (
    <div className="flex items-start justify-between gap-4 py-[14px]">
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
    </div>
  );
}

function PaymentHistoryGroupCard({ group }: { group: PaymentHistoryGroup }) {
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
          <PaymentHistoryRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function NewMBankingPaymentHistoryList() {
  return (
    <div className="mt-[6px]">
      {paymentHistoryGroups.map((group) => (
        <PaymentHistoryGroupCard key={group.date} group={group} />
      ))}
    </div>
  );
}