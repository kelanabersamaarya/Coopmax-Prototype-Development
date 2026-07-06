"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  Globe2,
  Info,
  Landmark,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InstructionKey = "mbanking" | "internet" | "atm";

const instructionItems: Array<{
  id: InstructionKey;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  steps: string[];
}> = [
  {
    id: "mbanking",
    title: "M-Banking",
    subtitle: "Gunakan aplikasi mobile banking atau e-wallet.",
    icon: Smartphone,
    steps: [
      "Buka aplikasi mobile banking atau e-wallet pilihan Anda.",
      "Pilih menu Transfer atau Virtual Account.",
      "Masukkan nomor Virtual Account 111222334455.",
      "Pastikan nama penerima adalah Arya dan produk rekening adalah Simpanan Kaya.",
      "Masukkan nominal setoran sesuai total transaksi.",
      "Periksa kembali detail transaksi sebelum melanjutkan.",
      "Konfirmasi pembayaran dan simpan bukti transaksi.",
    ],
  },
  {
    id: "internet",
    title: "Internet Banking",
    subtitle: "Bayar melalui layanan internet banking bank Anda.",
    icon: Globe2,
    steps: [
      "Masuk ke internet banking bank Anda.",
      "Pilih menu Transfer atau Pembayaran Virtual Account.",
      "Masukkan nomor Virtual Account yang tersedia.",
      "Pastikan detail penerima dan nominal sudah benar.",
      "Konfirmasi transaksi dan simpan bukti pembayaran.",
    ],
  },
  {
    id: "atm",
    title: "ATM",
    subtitle: "Gunakan mesin ATM terdekat untuk melakukan setoran.",
    icon: Landmark,
    steps: [
      "Masukkan kartu dan PIN ATM Anda.",
      "Pilih menu Transfer atau Virtual Account.",
      "Masukkan nomor Virtual Account.",
      "Pastikan informasi penerima dan nominal transaksi sudah sesuai.",
      "Selesaikan pembayaran dan simpan struk transaksi.",
    ],
  },
];

function InstructionAccordionItem({
  title,
  subtitle,
  icon: Icon,
  open,
  onToggle,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[16px] border bg-white transition",
        open ? "border-[#479DF4]/45 shadow-sm" : "border-[#E5E7EB]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-4 text-left transition active:scale-[0.99]"
        aria-expanded={open}
      >
        <span
          className={cn(
            "grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[14px]",
            open ? "bg-[#479DF4] text-white" : "bg-[#EEF6FF] text-[#479DF4]",
          )}
        >
          <Icon className="h-[21px] w-[21px]" strokeWidth={2.6} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-bold leading-tight text-black">
            {title}
          </span>
          <span className="mt-[5px] block text-[12px] font-normal leading-snug text-[#8F8F8F]">
            {subtitle}
          </span>
        </span>

        <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-[#F3F6FA] text-black">
          {open ? (
            <ChevronUp className="h-[18px] w-[18px]" strokeWidth={2.7} />
          ) : (
            <ChevronDown className="h-[18px] w-[18px]" strokeWidth={2.7} />
          )}
        </span>
      </button>

      {open ? (
        <div className="border-t border-[#EEF0F4] bg-[#FBFCFE] px-4 pb-4 pt-3">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default function NewMBankingDepositInstructionsCard() {
  const [openItem, setOpenItem] = React.useState<InstructionKey | null>(null);

  function toggleItem(item: InstructionKey) {
    setOpenItem((current) => (current === item ? null : item));
  }

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#CFE4FF] bg-[#F7FBFF] p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[14px] bg-[#479DF4] text-white shadow-sm">
          <Info className="h-[22px] w-[22px]" strokeWidth={2.7} />
        </span>

        <div className="min-w-0">
          <div className="text-[15px] font-bold leading-tight text-black">
            Cara Melakukan Setoran
          </div>
          <div className="mt-[6px] text-[12px] font-normal leading-relaxed text-[#5F6B7A]">
            Gunakan nomor Virtual Account yang tertera, pastikan nama penerima dan
            nominal transaksi sudah sesuai sebelum melakukan konfirmasi pembayaran.
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {instructionItems.map((item) => (
          <InstructionAccordionItem
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            open={openItem === item.id}
            onToggle={() => toggleItem(item.id)}
          >
            <ol className="grid gap-[10px]">
              {item.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-[1px] grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#EAF4FF] text-[11px] font-bold text-[#479DF4]">
                    {index + 1}
                  </span>
                  <span className="min-w-0 text-[12.5px] font-normal leading-relaxed text-[#2F3137]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </InstructionAccordionItem>
        ))}
      </div>
    </div>
  );
}