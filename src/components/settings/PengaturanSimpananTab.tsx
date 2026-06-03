"use client";

import * as React from "react";
import { CheckSquare, Landmark } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SimpananSetting = {
  id: string;
  label: string;
  defaultValue?: boolean;
};

const simpananSettings: SimpananSetting[] = [
  {
    id: "pengaktifan-fitur-auto-debet",
    label: "Pengaktifan Fitur Auto Debet",
    defaultValue: false,
  },
  {
    id: "auto-debet-tabungan-berjangka",
    label: "Auto Debet Tabungan Berjangka",
    defaultValue: false,
  },
  {
    id: "auto-process-biaya-admin-tabungan",
    label: "Auto Process Biaya Admin Tabungan",
    defaultValue: false,
  },
  {
    id: "auto-process-bunga-tabungan",
    label: "Auto Process Bunga Tabungan",
    defaultValue: false,
  },
  {
    id: "bunga-tabungan-berjangka-diproses-harian",
    label: "Bunga Tabungan Berjangka Diproses Harian",
    defaultValue: false,
  },
  {
    id: "disable-edit-nominal-setoran-berjangka",
    label: "Disable Edit Nominal Setoran Berjangka",
    defaultValue: false,
  },
  {
    id: "validasi-setoran-nominal-kelipatan-berjangka",
    label: "Validasi Setoran Nominal Kelipatan (Berjangka)",
    defaultValue: false,
  },
  {
    id: "disable-kolom-pinalti-autodebet-penutupan-rekening",
    label: "Disable Kolom Pinalti Autodebet Pada Saat Penutupan Rekening",
    defaultValue: false,
  },
  {
    id: "biaya-administrasi-penutupan-rekening-simpanan-anggota",
    label: "Pengenaan Biaya Administrasi Penutupan Rekening Simpanan Anggota",
    defaultValue: false,
  },
  {
    id: "setoran-penarikan-simpanan-teller-terpisah",
    label: "Setoran dan Penarikan Simpanan Pada Halaman Teller Terpisah",
    defaultValue: false,
  },
  {
    id: "import-transaksi-simpanan-kolektif",
    label: "Import Transaksi Simpanan Kolektif",
    defaultValue: false,
  },
  {
    id: "print-cetak-buku-tabungan",
    label:
      "Pengaturan hasil print cetak buku tabungan yang digunakan (PrintJs = non aktif, DomPDF = aktif)",
    defaultValue: false,
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

export default function PengaturanSimpananTab() {
  const [toggleValues, setToggleValues] = React.useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        simpananSettings.map((item) => [item.id, item.defaultValue ?? false]),
      ),
  );

  function saveSettings() {
    toast.success("Pengaturan simpanan tersimpan", {
      description: "Semua pengaturan simpanan berhasil diperbarui.",
    });
  }

  return (
    <div className="mt-8 w-full rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
      <div className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white">
        <div className="flex min-h-[55px] items-center gap-4 bg-[#F7F8FC] px-[20px]">
          <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F6BFF] text-white shadow-sm">
            <Landmark className="h-[18px] w-[18px]" strokeWidth={3} />
          </span>

          <div className="text-[15px] font-bold text-black">
            Pengaturan Simpanan
          </div>
        </div>

        {simpananSettings.map((item) => (
          <div
            key={item.id}
            className={cn(
              "grid min-h-[42px] grid-cols-[minmax(0,1fr)_minmax(120px,180px)] items-center",
              "border-t border-[#D7DEE9] px-[13px] text-[12px] font-normal text-black",
            )}
          >
            <div className="min-w-0 pr-4 leading-snug">{item.label}</div>

            <div className="flex min-w-0 justify-end">
              <TogglePill
                checked={toggleValues[item.id] ?? false}
                onChange={(value) =>
                  setToggleValues((current) => ({
                    ...current,
                    [item.id]: value,
                  }))
                }
              />
            </div>
          </div>
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