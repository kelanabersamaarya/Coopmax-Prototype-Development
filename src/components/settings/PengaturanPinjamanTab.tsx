"use client";

import * as React from "react";
import { HandCoins } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SettingItem = {
  id: string;
  label: string;
  defaultValue?: boolean;
};

const settings: SettingItem[] = [
  {
    id: "transaksi-pendapatan-jasa-pinjaman-rc",
    label: "Transaksi Pendapatan Jasa Pinjaman RC",
    defaultValue: true,
  },
  {
    id: "pinjaman",
    label: "Pinjaman",
  },
  {
    id: "pendaftaran-online",
    label: "Pendaftaran Pinjaman Online",
  },
  {
    id: "simulasi-pinjaman",
    label: "Simulasi Pinjaman",
  },
  {
    id: "perpanjangan-pinjaman",
    label: "Perpanjangan Pinjaman",
  },
  {
    id: "restrukturisasi-pinjaman",
    label: "Restrukturisasi Pinjaman",
  },
  {
    id: "ubah-bunga-pinjaman",
    label: "Ubah Bunga Pinjaman",
  },
  {
    id: "ubah-jatuh-tempo",
    label: "Ubah Jatuh Tempo Pinjaman",
  },
  {
    id: "ubah-hutang",
    label: "Ubah Hutang Pinjaman",
  },
  {
    id: "pemutihan-pinjaman",
    label: "Pemutihan Pinjaman",
  },
  {
    id: "riwayat-angsuran",
    label: "Riwayat Angsuran",
  },
  {
    id: "riwayat-transaksi-autodebet",
    label: "Riwayat Transaksi Autodebet",
  },
  {
    id: "analisa-5c",
    label: "Dapatkan Analisa 5C",
  },
  {
    id: "pembayaran-melewati-jatuh-tempo",
    label: "Pembayaran angsuran tidak boleh melewati jatuh tempo",
  },
  {
    id: "print-buku-pinjaman",
    label:
      "Pengaturan hasil print cetak buku pinjaman yang digunakan (PrintJs = non aktif, DomPDF = aktif)",
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

export default function PengaturanPinjamanTab() {
  const [values, setValues] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      settings.map((item) => [item.id, item.defaultValue ?? false]),
    ),
  );

  function updateValue(id: string, value: boolean) {
    setValues((current) => ({
      ...current,
      [id]: value,
    }));

    const setting = settings.find((item) => item.id === id);
    toast(value ? "Pengaturan diaktifkan" : "Pengaturan dinonaktifkan", {
      description: setting?.label,
    });
  }

  return (
    <div className="mt-8 w-full">
      <div className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white">
        <div className="flex min-h-[55px] items-center gap-4 bg-[#F7F8FC] px-[20px]">
          <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F6BFF] text-white shadow-sm">
            <HandCoins className="h-[18px] w-[18px]" />
          </span>

          <div className="text-[13px] font-bold text-black">
            Pengaturan Pinjaman
          </div>
        </div>

        {settings.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "grid min-h-[42px] grid-cols-[minmax(0,1fr)_72px] items-center",
              "px-[13px] text-[12px] font-normal text-black",
              index === 0 ? "border-t border-[#D7DEE9]" : "border-t border-[#D7DEE9]",
            )}
          >
            <div className="min-w-0 pr-4 leading-snug">{item.label}</div>

            <div className="flex justify-end">
              <TogglePill
                checked={values[item.id] ?? false}
                onChange={(value) => updateValue(item.id, value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}