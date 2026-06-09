"use client";

import { ArrowLeft, Bell, Lock, Printer, RefreshCw, Smartphone } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

const settingsItems = [
  {
    label: "Notifikasi",
    description: "Atur pemberitahuan transaksi dan sinkronisasi",
    icon: Bell,
  },
  {
    label: "Keamanan",
    description: "Ubah PIN, kata sandi, dan pengamanan akun",
    icon: Lock,
  },
  {
    label: "Printer",
    description: "Kelola printer untuk cetak bukti transaksi",
    icon: Printer,
  },
  {
    label: "Sinkronisasi",
    description: "Atur sinkronisasi data rekening dan transaksi",
    icon: RefreshCw,
  },
  {
    label: "Versi Aplikasi",
    description: "Sakti Kolektor versi 1.5.9.105",
    icon: Smartphone,
  },
];

export default function EKolektorSettingsPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#2cb4dc]">
      <div className="min-h-0 flex-1 overflow-hidden bg-[#2cb4dc]">
        <header className="relative h-[150px] shrink-0 overflow-hidden bg-[#2cb4dc] px-[26px] pt-[28px] text-white">
          <div className="pointer-events-none absolute -left-[48px] -top-[78px] h-[150px] w-[150px] rounded-full bg-white/18" />
          <div className="pointer-events-none absolute right-[18px] -top-[76px] h-[122px] w-[122px] rounded-full bg-white/20" />
          <div className="pointer-events-none absolute -right-[58px] -top-[20px] h-[142px] w-[142px] rounded-full bg-white/20" />

          <button
            type="button"
            onClick={onBack}
            className="-ml-1 inline-flex h-[28px] w-[28px] items-center justify-center rounded-full text-white transition active:scale-[0.96]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[26px] w-[26px]" strokeWidth={2.5} />
          </button>

          <h1 className="relative z-10 mt-[31px] text-[16px] font-extrabold leading-none tracking-tight text-white">
            Pengaturan Fitur
          </h1>
        </header>

        <main className="relative z-20 -mt-[16px] h-[calc(100%-134px)] overflow-y-auto rounded-t-[18px] bg-white pb-8 pt-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="px-[26px] pb-[10px] pt-[18px] text-[14px] font-extrabold uppercase leading-none tracking-tight text-[#8C8C8C]">
            PENGATURAN APLIKASI
          </div>

          <div className="border-t border-[#E8E8E8] bg-white">
            {settingsItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  className="flex min-h-[72px] w-full items-center justify-between gap-4 border-b border-[#E8E8E8] bg-white px-[26px] py-[12px] text-left transition active:scale-[0.99]"
                  aria-label={item.label}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#004FC7] text-white">
                      <Icon className="h-[20px] w-[20px]" strokeWidth={2.7} />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
                        {item.label}
                      </span>
                      <span className="mt-[5px] block text-[12px] font-extrabold leading-tight tracking-tight text-[#8C8C8C]">
                        {item.description}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}