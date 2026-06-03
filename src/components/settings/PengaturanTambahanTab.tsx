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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ToggleAdditionalSetting = {
  id: string;
  label: string;
  type: "toggle";
  defaultValue?: boolean;
};

type SelectAdditionalSetting = {
  id: string;
  label: string;
  type: "select";
  defaultValue: string;
  options: string[];
};

type InputAdditionalSetting = {
  id: string;
  label: string;
  type: "input";
  defaultValue: string;
  placeholder?: string;
};

type AdditionalSetting =
  | ToggleAdditionalSetting
  | SelectAdditionalSetting
  | InputAdditionalSetting;

type AdditionalSettingSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  settings: AdditionalSetting[];
};

const accountOptions = [
  "1.1.1.1 - Kas",
  "1.1.1.3.2 - Simpanan Berjangka",
  "5.1.1.1 - Beban Jasa Simpanan Sukarela/Tabungan Dari Anggota",
  "1.3.1 - Tanah",
  "1.1.2. - Giro",
  "1.1.1.2.2 - Tabungan Bank",
];

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
    settings: [
      {
        id: "auto-process-bunga-deposito",
        label: "Auto Process Bunga Deposito",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "auto-process-perpanjangan-rekening-deposito",
        label: "Auto Process Perpanjangan Rekening Deposito",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "periode-deposito-tanpa-akumulasi",
        label: "Periode Deposito Tanpa Akumulasi",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  {
    id: "akun",
    title: "Pengaturan Akun",
    icon: <Calculator className="h-[20px] w-[20px]" strokeWidth={2.8} />,
    settings: [
      {
        id: "akun-kas-operasional",
        label: "Akun Kas Operasional",
        type: "select",
        defaultValue: "1.1.1.1 - Kas",
        options: accountOptions,
      },
      {
        id: "akun-kas-besar-skema-head-teller-teller",
        label: "Akun Kas Besar Skema Head Teller - Teller",
        type: "select",
        defaultValue: "1.1.1.1 - Kas",
        options: accountOptions,
      },
    ],
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
    settings: [
      {
        id: "perpanjangan-deposito-fee-kolektor",
        label: "Perpanjangan Deposito mendapatkan Fee Kolektor",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  {
    id: "inventaris",
    title: "Pengaturan Inventaris",
    icon: <Folder className="h-[20px] w-[20px]" strokeWidth={2.8} />,
    settings: [
      {
        id: "metode-pembulatan-penyusutan-aset",
        label: "Metode Pembulatan Penyusutan Aset",
        type: "select",
        defaultValue: "Tanpa Pembulatan",
        options: [
          "Tanpa Pembulatan",
          "Pembulatan Keatas",
          "Pembulatan Kebawah",
        ],
      },
      {
        id: "tampilkan-nomor-inventaris-pada-agunan",
        label: "Tampilkan Nomor Inventaris pada Agunan",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  {
    id: "pegawai",
    title: "Pengaturan Pegawai",
    icon: <UserRound className="h-[20px] w-[20px]" strokeWidth={2.8} />,
    settings: [
      {
        id: "verifikasi-email-pegawai",
        label: "Verifikasi Email Pegawai",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "enable-edit-field-kode-pegawai",
        label: "Enable Edit Field Kode Pegawai",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  {
    id: "lainnya",
    title: "Pengaturan Lainnya",
    icon: <Settings className="h-[20px] w-[20px]" strokeWidth={2.8} />,
    settings: [
      {
        id: "import-customer",
        label: "Import Customer",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "transaksi-bunga-dan-pajak-terpisah",
        label: "Transaksi Bunga dan Pajak terpisah",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "auth-menggunakan-captcha",
        label: "Auth Menggunakan Captcha",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "disable-perubahan-no-handphone",
        label: "Disable Perubahan No HandPhone",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "total-pada-laporan",
        label: "Total Pada Laporan",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "saldo-terendah-dengan-transaksi",
        label: "Saldo Terendah Dengan Transaksi",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "fitur-retur-pajak-bunga",
        label: "Fitur Retur Pajak Bunga",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "generate-kode-transaksi-menggunakan-job",
        label: "Pengaturan generate kode transaksi menggunakan job",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "tampilkan-jenis-transaksi-pada-kwitansi",
        label: "Tampilkan jenis transaksi pada kwitansi",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "aktivasi-skema-head-teller-teller",
        label: "Aktivasi Skema Head Teller - Teller",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "duplikasi-nomor-handphone",
        label: "Duplikasi Nomor Handphone",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "wajib-isi-wilayah-anggota-calon",
        label:
          "Wajib Isi Wilayah Saat Menambah dan Mengubah Data Anggota atau Calon anggota",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "nominal-default-fee-produk-tagihan-ppob",
        label: "Nominal Default Fee pada Produk Tagihan PPOB",
        type: "input",
        defaultValue: "2.000,00",
        placeholder: "0,00",
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

export default function PengaturanTambahanTab() {
  const [toggleValues, setToggleValues] = React.useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        sections.flatMap((section) =>
          section.settings
            .filter(
              (setting): setting is ToggleAdditionalSetting =>
                setting.type === "toggle",
            )
            .map((setting) => [setting.id, setting.defaultValue ?? false]),
        ),
      ),
  );

  const [selectValues, setSelectValues] = React.useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        sections.flatMap((section) =>
          section.settings
            .filter(
              (setting): setting is SelectAdditionalSetting =>
                setting.type === "select",
            )
            .map((setting) => [setting.id, setting.defaultValue]),
        ),
      ),
  );

  const [inputValues, setInputValues] = React.useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        sections.flatMap((section) =>
          section.settings
            .filter(
              (setting): setting is InputAdditionalSetting =>
                setting.type === "input",
            )
            .map((setting) => [setting.id, setting.defaultValue]),
        ),
      ),
  );

  function updateToggle(id: string, value: boolean) {
    setToggleValues((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function updateSelect(id: string, value: string) {
    setSelectValues((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function updateInput(id: string, value: string) {
    setInputValues((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function saveSettings() {
    toast.success("Pengaturan tambahan tersimpan", {
      description: "Semua section pengaturan tambahan sudah diperbarui.",
    });
  }

  const inputClassName = cn(
    "h-[30px] w-full rounded-[5px] border-slate-300 bg-white px-3",
    "text-[12px] font-normal text-black shadow-none",
    "placeholder:text-[#64748B]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const selectTriggerClassName = cn(
    "h-[30px] w-full rounded-[5px] border-slate-300 bg-white px-3",
    "text-left text-[12px] font-normal text-black shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&_[data-slot=select-value]]:min-w-0",
    "[&_[data-slot=select-value]]:truncate",
    "[&_[data-slot=select-value]]:text-left",
  );

  const selectContentClassName = cn(
    "w-[--radix-select-trigger-width] max-w-[--radix-select-trigger-width]",
    "overflow-hidden rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.left-2]:hidden",
    "[&>span.absolute.right-2]:hidden",
    "[&_[data-radix-collection-item]]:pl-4",
    "[&_[data-radix-collection-item]]:pr-4",
    "[&_[data-radix-collection-item]]:max-w-full",
    "[&_[data-radix-collection-item]]:overflow-hidden",
  );

  const selectItemClassName = cn(
    "rounded-none px-4 py-2.5 text-[13px] font-normal text-black",
    "transition-colors",
    "hover:bg-violet-600 hover:text-white",
    "focus:bg-violet-600 focus:text-white",
    "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
    "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.left-2]:hidden",
    "[&>span.absolute.right-2]:hidden",
  );

  return (
    <div className="mt-8 w-full rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
      <div className="grid gap-[15px]">
        {sections.map((section) => (
          <div
            key={section.id}
            className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white"
          >
            <div className="flex min-h-[55px] items-center gap-4 bg-[#F7F8FC] px-[20px] py-[10px]">
              <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F7DF5] text-white shadow-sm">
                {section.icon}
              </span>

              <div className="text-[15px] font-bold text-black">
                {section.title}
              </div>
            </div>

            {section.settings.map((setting) => (
              <div
                key={setting.id}
                className={cn(
                  "grid min-h-[50px] grid-cols-[minmax(0,1fr)_minmax(300px,380px)] items-center",
                  "border-t border-[#D7DEE9] px-[13px] py-[8px] text-[12px] font-normal text-black",
                )}
              >
                <div className="min-w-0 pr-4 leading-relaxed">
                  {setting.label}
                </div>

                <div className="flex min-w-0 justify-end">
                  {setting.type === "toggle" ? (
                    <TogglePill
                      checked={toggleValues[setting.id] ?? false}
                      onChange={(value) => updateToggle(setting.id, value)}
                    />
                  ) : null}

                  {setting.type === "select" ? (
                    <Select
                      value={selectValues[setting.id] ?? setting.defaultValue}
                      onValueChange={(value) => updateSelect(setting.id, value)}
                    >
                      <SelectTrigger className={selectTriggerClassName}>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className={selectContentClassName}>
                        {setting.options.map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className={selectItemClassName}
                            title={option}
                          >
                            <span className="block max-w-full truncate">
                              {option}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : null}

                  {setting.type === "input" ? (
                    <Input
                      value={inputValues[setting.id] ?? setting.defaultValue}
                      onChange={(event) =>
                        updateInput(setting.id, event.target.value)
                      }
                      placeholder={setting.placeholder}
                      className={inputClassName}
                      inputMode="decimal"
                    />
                  ) : null}
                </div>
              </div>
            ))}
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