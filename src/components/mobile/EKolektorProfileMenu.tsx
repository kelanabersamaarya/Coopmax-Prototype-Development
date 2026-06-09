"use client";

import * as React from "react";
import { ChevronRight, RefreshCw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const accountItems = ["Ubah Kata Sandi"];

const generalItems = [
  "Petunjuk Penggunaan",
  "Syarat dan Ketentuan",
  "Kebijakan Privasi",
  "Kontak Kami",
  "Printer",
  "Pengaturan",
];

const cooperativeDataItems = [
  {
    label: "Data Rekening & Transaksi",
    icon: RefreshCw,
    tone: "blue" as const,
  },
  {
    label: "Hapus Data Rekening Offline",
    icon: Trash2,
    tone: "red" as const,
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-[26px] pb-[10px] pt-[18px] text-[14px] font-extrabold uppercase leading-none tracking-tight text-[#8C8C8C]">
      {children}
    </div>
  );
}

function MenuRow({
  label,
  onClick,
  trailingIcon,
  iconTone = "blue",
}: {
  label: string;
  onClick?: () => void;
  trailingIcon?: React.ComponentType<{ className?: string }>;
  iconTone?: "blue" | "red";
}) {
  const TrailingIcon = trailingIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[58px] w-full items-center justify-between gap-4 border-b border-[#E8E8E8] bg-white px-[26px] text-left transition active:scale-[0.99]"
      aria-label={label}
    >
      <span className="min-w-0 text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
        {label}
      </span>

      {TrailingIcon ? (
        <span
          className={cn(
            "inline-flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full text-white",
            iconTone === "red" ? "bg-[#EF135D]" : "bg-[#004FC7]",
          )}
        >
          <TrailingIcon className="h-[19px] w-[19px]" strokeWidth={2.8} />
        </span>
      ) : (
        <ChevronRight
          className="h-[22px] w-[22px] shrink-0 text-black"
          strokeWidth={2.6}
        />
      )}
    </button>
  );
}

function OfflineToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-[30px] w-[54px] shrink-0 items-center rounded-full p-[3px] transition",
        checked ? "bg-[#004FC7]" : "bg-[#D8D8D8]",
      )}
      aria-pressed={checked}
      aria-label="Mode Offline"
    >
      <span
        className={cn(
          "h-[24px] w-[24px] rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[24px]" : "translate-x-0",
        )}
      />
    </button>
  );
}

export default function EKolektorProfileMenu() {
  const [offlineMode, setOfflineMode] = React.useState(false);

  return (
    <div className="bg-white pb-8 pt-[22px]">
      <div className="border-t border-[#E8E8E8]">
        <div className="flex h-[58px] w-full items-center justify-between gap-4 border-b border-[#E8E8E8] bg-white px-[26px]">
          <span className="min-w-0 text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Mode Offline
          </span>

          <OfflineToggle checked={offlineMode} onChange={setOfflineMode} />
        </div>
      </div>

      <SectionTitle>Akun</SectionTitle>
      <div className="bg-white">
        {accountItems.map((item) => (
          <MenuRow key={item} label={item} />
        ))}
      </div>

      <SectionTitle>Umum</SectionTitle>
      <div className="bg-white">
        {generalItems.map((item) => (
          <MenuRow key={item} label={item} />
        ))}
      </div>

      <SectionTitle>Data Koperasi</SectionTitle>
      <div className="bg-white">
        {cooperativeDataItems.map((item) => (
          <MenuRow
            key={item.label}
            label={item.label}
            trailingIcon={item.icon}
            iconTone={item.tone}
          />
        ))}
      </div>
    </div>
  );
}