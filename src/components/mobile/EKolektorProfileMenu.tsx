"use client";

import * as React from "react";
import { ChevronRight, RefreshCw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const accountItems = [
  {
    label: "Ubah Kata Sandi",
    helperText: "Ganti Kata Sandi Anda Disini",
    helperTone: "gray" as const,
  },
];

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
    helperText: "Sinkronisasi Belum Dilakuka",
    helperTone: "green" as const,
    icon: RefreshCw,
    tone: "blue" as const,
  },
  {
    label: "Hapus Data Rekening Offline",
    helperText: "Menghapus data rekening pada mode offline",
    helperTone: "gray" as const,
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
  helperText,
  helperTone = "gray",
  onClick,
  trailingIcon,
  iconTone = "blue",
  withDivider = false,
}: {
  label: string;
  helperText?: string;
  helperTone?: "gray" | "green";
  onClick?: () => void;
  trailingIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconTone?: "blue" | "red";
  withDivider?: boolean;
}) {
  const TrailingIcon = trailingIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-[58px] w-full items-center justify-between gap-4 bg-white px-[26px] py-[12px] text-left transition active:scale-[0.99]",
        withDivider ? "border-b border-[#E8E8E8]" : "",
      )}
      aria-label={label}
    >
      <span className="min-w-0">
        <span className="block text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
          {label}
        </span>

        {helperText ? (
          <span
            className={cn(
              "mt-[5px] block text-[12px] font-extrabold leading-tight tracking-tight",
              helperTone === "green" ? "text-[#39B54A]" : "text-[#8C8C8C]",
            )}
          >
            {helperText}
          </span>
        ) : null}
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

export default function EKolektorProfileMenu({
  onOpenSettings,
}: {
  onOpenSettings?: () => void;
}) {
  const [offlineMode, setOfflineMode] = React.useState(false);

  return (
    <div className="bg-white pb-8 pt-[22px]">
      <div>
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
          <MenuRow
            key={item.label}
            label={item.label}
            helperText={item.helperText}
            helperTone={item.helperTone}
            withDivider
          />
        ))}
      </div>

      <SectionTitle>Umum</SectionTitle>
      <div className="bg-white">
        {generalItems.map((item) => (
          <MenuRow
            key={item}
            label={item}
            onClick={item === "Pengaturan" ? onOpenSettings : undefined}
            withDivider
          />
        ))}
      </div>

      <SectionTitle>Data Koperasi</SectionTitle>
      <div className="bg-white">
        {cooperativeDataItems.map((item, index) => (
          <MenuRow
            key={item.label}
            label={item.label}
            helperText={item.helperText}
            helperTone={item.helperTone}
            trailingIcon={item.icon}
            iconTone={item.tone}
            withDivider={index < cooperativeDataItems.length - 1}
          />
        ))}
      </div>

      <div className="border-t border-[#E8E8E8] px-[26px] pb-[18px] pt-[28px] text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
        Keluar
      </div>
    </div>
  );
}