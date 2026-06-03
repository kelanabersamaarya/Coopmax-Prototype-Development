"use client";

import * as React from "react";
import {
  Banknote,
  Calculator,
  CheckSquare,
  Folder,
  HandCoins,
  Settings,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AdditionalSettingSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

const sections: AdditionalSettingSection[] = [
  {
    id: "deposito",
    title: "Pengaturan Deposito",
    icon: (
      <span className="relative inline-flex h-[20px] w-[20px] items-center justify-center">
        <Banknote className="h-[20px] w-[20px]" strokeWidth={2.8} />
        <TrendingUp
          className="absolute -right-1 -top-1 h-[11px] w-[11px]"
          strokeWidth={3}
        />
      </span>
    ),
  },
  {
    id: "akun",
    title: "Pengaturan Akun",
    icon: <Calculator className="h-[20px] w-[20px]" strokeWidth={2.8} />,
  },
  {
    id: "fee-kolektor",
    title: "Pengaturan Fee Kolektor",
    icon: (
      <span className="relative inline-flex h-[20px] w-[20px] items-center justify-center">
        <HandCoins className="h-[20px] w-[20px]" strokeWidth={2.8} />
        <UserRound
          className="absolute -right-1 -top-1 h-[11px] w-[11px]"
          strokeWidth={3}
        />
      </span>
    ),
  },
  {
    id: "inventaris",
    title: "Pengaturan Inventaris",
    icon: <Folder className="h-[20px] w-[20px]" strokeWidth={2.8} />,
  },
  {
    id: "pegawai",
    title: "Pengaturan Pegawai",
    icon: <UserRound className="h-[20px] w-[20px]" strokeWidth={2.8} />,
  },
  {
    id: "lainnya",
    title: "Pengaturan Lainnya",
    icon: <Settings className="h-[20px] w-[20px]" strokeWidth={2.8} />,
  },
];

export default function PengaturanTambahanTab() {
  function saveSettings() {
    toast.success("Pengaturan tambahan tersimpan", {
      description: "Semua section pengaturan tambahan sudah diperbarui.",
    });
  }

  return (
    <div className="mt-8 w-full rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
      <div className="grid gap-[15px]">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() =>
              toast("Menu pengaturan dipilih", {
                description: section.title,
              })
            }
            className={cn(
              "overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white text-left",
              "transition hover:bg-slate-50 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
          >
            <div className="flex min-h-[55px] items-center gap-4 bg-[#F7F8FC] px-[20px] py-[10px]">
              <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F7DF5] text-white shadow-sm">
                {section.icon}
              </span>

              <div className="text-[15px] font-bold text-black">
                {section.title}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-[15px] flex justify-end">
        <button
          type="button"
          onClick={saveSettings}
          className={cn(
            "inline-flex h-[28px] w-[90px] items-center justify-center gap-1.5 rounded-[6px]",
            "bg-[#2fb300] px-2 text-[11px] font-bold tracking-tight text-white",
            "ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2fb300]/25",
          )}
        >
          <CheckSquare className="h-4 w-4" strokeWidth={3} />
          Simpan
        </button>
      </div>
    </div>
  );
}