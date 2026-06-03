"use client";

import * as React from "react";
import { CheckSquare, HandCoins } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type ToggleSetting = {
  id: string;
  label: string;
  type: "toggle";
  defaultValue?: boolean;
};

type SelectSetting = {
  id: string;
  label: string;
  type: "select";
  defaultValue: string;
  options: string[];
};

type InputSetting = {
  id: string;
  label: string;
  type: "input";
  defaultValue: string;
  suffix?: string;
};

type SettingItem = ToggleSetting | SelectSetting | InputSetting;

const settings: SettingItem[] = [
  {
    id: "auto-process-bunga-pinjaman-rc",
    label: "Auto Process Bunga Pinjaman RC",
    type: "toggle",
  },
  {
    id: "transaksi-pendapatan-jasa-pinjaman-rc",
    label: "Transaksi Pendapatan Jasa Pinjaman RC",
    type: "toggle",
    defaultValue: true,
  },
  {
    id: "mitra-pada-produk-pinjaman",
    label: "Mitra pada Produk Pinjaman",
    type: "toggle",
  },
  {
    id: "pembayaran-angsuran-melewati-jatuh-tempo",
    label: "Pembayaran angsuran tidak boleh melewati jatuh tempo",
    type: "toggle",
  },
  {
    id: "tanggal-aktif-pinjaman",
    label: "Tanggal Aktif pinjaman",
    type: "select",
    defaultValue: "Tanggal Pencairan",
    options: ["Tanggal Pencairan", "Tanggal Persetujuan", "Tanggal Daftar"],
  },
  {
    id: "acuan-perubahan-tanggal-jatuh-tempo",
    label: "Acuan Perubahan Tanggal Jatuh Tempo Pinjaman",
    type: "select",
    defaultValue: "Tanggal Aktif Pinjaman",
    options: ["Tanggal Aktif Pinjaman", "Tanggal Realisasi", "Tanggal Transaksi"],
  },
  {
    id: "tampilkan-npl-kap-rekapitulasi-kolektibilitas",
    label: "Tampilkan NPL dan KAP pada Rekapitulasi Kolektibilitas",
    type: "toggle",
  },
  {
    id: "tunggakan-pokok-minus",
    label: "Tunggakan Pokok Minus",
    type: "toggle",
  },
  {
    id: "print-cetak-buku-pinjaman",
    label:
      "Pengaturan hasil print cetak buku pinjaman yang digunakan (PrintJs = non aktif, DomPDF = aktif)",
    type: "toggle",
  },
  {
    id: "skema-pemotongan-biaya-admin",
    label:
      "Skema Pemotongan Biaya Admin Pada Pencairan Pinjaman Tunai dan Non-tunai",
    type: "toggle",
  },
  {
    id: "atur-coa-jenis-biaya-produk-pinjaman",
    label: "Atur COA Jenis Biaya pada Produk Pinjaman",
    type: "toggle",
  },
  {
    id: "transaksi-pinjaman-periode-maju",
    label: "Transaksi Pinjaman Periode Maju",
    type: "toggle",
  },
  {
    id: "import-transaksi-pembayaran-angsuran-kolektif",
    label: "Import Transaksi Pembayaran Angsuran Kolektif",
    type: "toggle",
  },
  {
    id: "import-pembukaan-rekening-pinjaman-kolektif",
    label: "Import Pembukaan Rekening Pinjaman Kolektif",
    type: "toggle",
  },
  {
    id: "non-aktif-bunga-periode-0",
    label: "Non Aktif Bunga pada Periode 0",
    type: "toggle",
  },
  {
    id: "persentase-pembagi-pendapatan-bunga",
    label: "Persentase Pembagi Pendapatan Bunga",
    type: "input",
    defaultValue: "0",
    suffix: "%",
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
  const [toggleValues, setToggleValues] = React.useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        settings
          .filter((item): item is ToggleSetting => item.type === "toggle")
          .map((item) => [item.id, item.defaultValue ?? false]),
      ),
  );

  const [selectValues, setSelectValues] = React.useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        settings
          .filter((item): item is SelectSetting => item.type === "select")
          .map((item) => [item.id, item.defaultValue]),
      ),
  );

  const [inputValues, setInputValues] = React.useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        settings
          .filter((item): item is InputSetting => item.type === "input")
          .map((item) => [item.id, item.defaultValue]),
      ),
  );

  function notify(label: string) {
    toast("Pengaturan diperbarui", {
      description: label,
    });
  }

  function updateToggle(id: string, value: boolean) {
    setToggleValues((current) => ({
      ...current,
      [id]: value,
    }));

    const setting = settings.find((item) => item.id === id);
    toast(value ? "Pengaturan diaktifkan" : "Pengaturan dinonaktifkan", {
      description: setting?.label,
    });
  }

  function saveSettings() {
    toast.success("Pengaturan berhasil disimpan", {
      description: "Perubahan pengaturan pinjaman sudah tersimpan di prototype.",
    });
  }

  const selectTriggerClass = cn(
    "h-[30px] w-full rounded-[5px] border-slate-300 bg-white px-3",
    "text-[12px] font-normal text-black shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const selectContentClass = cn(
    "rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.right-2]:hidden",
  );

  const selectItemClass = cn(
    "rounded-none px-4 py-2.5 text-[13px] font-normal text-black",
    "hover:bg-violet-600 hover:text-white",
    "focus:bg-violet-600 focus:text-white",
    "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
    "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
  );

  const inputClass = cn(
    "h-[30px] w-full rounded-[5px] border-slate-300 bg-white px-3",
    "text-[12px] font-normal text-black shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="mt-8 w-full rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
      <div className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white">
        <div className="flex min-h-[55px] items-center gap-4 bg-[#F7F8FC] px-[20px]">
          <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F6BFF] text-white shadow-sm">
            <HandCoins className="h-[18px] w-[18px]" />
          </span>

          <div className="text-[15px] font-bold text-black">
            Pengaturan Pinjaman
          </div>
        </div>

        {settings.map((item) => (
          <div
            key={item.id}
            className={cn(
              "grid min-h-[42px] grid-cols-[minmax(0,1fr)_minmax(72px,220px)] items-center",
              "border-t border-[#D7DEE9] px-[13px] text-[12px] font-normal text-black",
            )}
          >
            <div className="min-w-0 pr-4 leading-snug">{item.label}</div>

            <div className="flex justify-end">
              {item.type === "toggle" ? (
                <TogglePill
                  checked={toggleValues[item.id] ?? false}
                  onChange={(value) => updateToggle(item.id, value)}
                />
              ) : null}

              {item.type === "select" ? (
                <Select
                  value={selectValues[item.id] ?? item.defaultValue}
                  onValueChange={(value) => {
                    setSelectValues((current) => ({
                      ...current,
                      [item.id]: value,
                    }));
                    notify(item.label);
                  }}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {item.options.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className={selectItemClass}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}

              {item.type === "input" ? (
                <div className="relative w-full">
                  <Input
                    value={inputValues[item.id] ?? item.defaultValue}
                    onChange={(event) => {
                      const next = event.target.value.replace(/[^\d.,]/g, "");
                      setInputValues((current) => ({
                        ...current,
                        [item.id]: next,
                      }));
                    }}
                    onBlur={() => notify(item.label)}
                    className={cn(inputClass, item.suffix ? "pr-8 text-right" : "")}
                    inputMode="decimal"
                  />
                  {item.suffix ? (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-normal text-slate-600">
                      {item.suffix}
                    </span>
                  ) : null}
                </div>
              ) : null}
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