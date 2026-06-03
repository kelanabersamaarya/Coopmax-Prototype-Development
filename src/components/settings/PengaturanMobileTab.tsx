"use client";

import * as React from "react";
import { CheckSquare, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type MobileSetting = {
  id: string;
  label: string;
  defaultValue?: boolean;
};

type MobileSection = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  settings: MobileSetting[];
};

const mobileSections: MobileSection[] = [
  {
    id: "mobile-banking",
    title: "Pengaturan Mobile Banking",
    icon: Smartphone,
    settings: [
      {
        id: "mobile-banking-active",
        label: "Aktifkan Mobile Banking",
        defaultValue: true,
      },
      {
        id: "mobile-banking-transfer",
        label: "Transfer Antar Rekening",
        defaultValue: true,
      },
      {
        id: "mobile-banking-pembayaran-pinjaman",
        label: "Pembayaran Pinjaman via Mobile Banking",
        defaultValue: true,
      },
      {
        id: "mobile-banking-pendaftaran-online",
        label: "Pendaftaran Nasabah Online",
        defaultValue: false,
      },
    ],
  },
  {
    id: "e-kolektor",
    title: "Pengaturan E-Kolektor",
    icon: Smartphone,
    settings: [
      {
        id: "e-kolektor-active",
        label: "Aktifkan E-Kolektor",
        defaultValue: true,
      },
      {
        id: "e-kolektor-gps",
        label: "Wajib Menggunakan Lokasi GPS Saat Transaksi",
        defaultValue: true,
      },
      {
        id: "e-kolektor-riwayat",
        label: "Tampilkan Riwayat Tagihan Nasabah",
        defaultValue: true,
      },
      {
        id: "e-kolektor-offline",
        label: "Izinkan Transaksi Mode Offline",
        defaultValue: false,
      },
    ],
  },
  {
    id: "mobile-mitra",
    title: "Pengaturan Mobile Mitra",
    icon: Smartphone,
    settings: [
      {
        id: "mobile-mitra-active",
        label: "Aktifkan Mobile Mitra",
        defaultValue: true,
      },
      {
        id: "mobile-mitra-pengajuan",
        label: "Pengajuan Nasabah oleh Mitra",
        defaultValue: true,
      },
      {
        id: "mobile-mitra-verifikasi",
        label: "Verifikasi Data Nasabah oleh Mitra",
        defaultValue: false,
      },
      {
        id: "mobile-mitra-monitoring",
        label: "Monitoring Status Pengajuan Mitra",
        defaultValue: true,
      },
    ],
  },
];

function TogglePill({
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
        "relative inline-flex h-[22px] w-[48px] shrink-0 items-center rounded-full px-[2px]",
        "transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        checked ? "bg-[#635BFF]" : "bg-[#A89BFF]",
      )}
      aria-pressed={checked}
    >
      <span
        className={cn(
          "absolute text-[9px] font-bold leading-none text-white transition",
          checked ? "left-[7px]" : "right-[6px]",
        )}
      >
        {checked ? "ON" : "OFF"}
      </span>

      <span
        className={cn(
          "relative z-10 h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[26px]" : "translate-x-0",
        )}
      />
    </button>
  );
}

export default function PengaturanMobileTab() {
  const [values, setValues] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      mobileSections.flatMap((section) =>
        section.settings.map((setting) => [
          setting.id,
          setting.defaultValue ?? false,
        ]),
      ),
    ),
  );

  function updateValue(id: string, value: boolean) {
    setValues((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function saveSettings() {
    toast.success("Pengaturan mobile tersimpan", {
      description:
        "Pengaturan Mobile Banking, E-Kolektor, dan Mobile Mitra diperbarui.",
    });
  }

  return (
    <div className="mt-8 w-full rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
      <div className="grid gap-[15px]">
        {mobileSections.map((section) => {
          const Icon = section.icon;

          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white"
            >
              <div className="flex min-h-[55px] items-center gap-4 bg-[#F7F8FC] px-[20px]">
                <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F7DF5] text-white shadow-sm">
                  <Icon className="h-[20px] w-[20px]" strokeWidth={2.8} />
                </span>

                <div className="text-[15px] font-bold text-black">
                  {section.title}
                </div>
              </div>

              {section.settings.map((setting) => (
                <div
                  key={setting.id}
                  className={cn(
                    "grid min-h-[42px] grid-cols-[minmax(0,1fr)_minmax(120px,180px)] items-center",
                    "border-t border-[#D7DEE9] px-[13px] text-[12px] font-normal text-black",
                  )}
                >
                  <div className="min-w-0 pr-4 leading-snug">
                    {setting.label}
                  </div>

                  <div className="flex min-w-0 justify-end">
                    <TogglePill
                      checked={values[setting.id] ?? false}
                      onChange={(value) => updateValue(setting.id, value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
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