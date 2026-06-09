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
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="shrink-0 bg-white px-[26px] pb-[22px] pt-[28px]">
          <button
            type="button"
            onClick={onBack}
            className="-ml-1 inline-flex h-[28px] w-[28px] items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[26px] w-[26px]" strokeWidth={2.5} />
          </button>

          <h1 className="mt-[31px] text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
            Pengaturan
          </h1>
        </header>

        <main className="bg-white pb-8 pt-[8px]">
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