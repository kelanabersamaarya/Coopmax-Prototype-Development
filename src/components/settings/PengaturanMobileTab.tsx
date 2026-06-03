"use client";

import * as React from "react";
import { CheckSquare, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type ToggleMobileSetting = {
  id: string;
  label: string;
  type: "toggle";
  defaultValue?: boolean;
};

type FieldMobileSetting = {
  id: string;
  label: string;
  type: "field";
  defaultValue?: string;
  placeholder?: string;
};

type MobileSetting = ToggleMobileSetting | FieldMobileSetting;

type MobileSection = {
  id: string;
  title: string;
  settings: MobileSetting[];
};

const mobileSections: MobileSection[] = [
  {
    id: "mobile-banking",
    title: "Pengaturan Mobile Banking",
    settings: [
      {
        id: "versi-m-banking",
        label: "Versi m-Banking",
        type: "field",
        defaultValue: "3.3.0|3.4.0|3.5.0",
      },
      {
        id: "versi-m-banking-ios",
        label: "Versi m-Banking IOS",
        type: "field",
        defaultValue: "3.3.0|3.4.0|3.5.0",
      },
      {
        id: "akumulasi-hutang-pokok-m-banking",
        label: "Akumulasi Hutang Pokok M-Banking",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  {
    id: "e-kolektor",
    title: "Pengaturan E-Kolektor",
    settings: [
      {
        id: "versi-e-collector",
        label: "Versi e-Collector",
        type: "field",
        defaultValue: "3.3.0|3.4.0|3.5.0",
      },
      {
        id: "versi-e-collector-ios",
        label: "Versi e-Collector IOS",
        type: "field",
        defaultValue: "3.3.0|3.4.0|3.5.0",
      },
      {
        id: "akumulasi-hutang-pokok-e-collector",
        label: "Akumulasi Hutang Pokok E-Collector",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  {
    id: "mobile-mitra",
    title: "Pengaturan Mobile Mitra",
    settings: [
      {
        id: "versi-mitra",
        label: "Versi Mitra",
        type: "field",
        defaultValue: "",
        placeholder: "Masukkan Nilai",
      },
      {
        id: "versi-mitra-ios",
        label: "Versi Mitra IOS",
        type: "field",
        defaultValue: "",
        placeholder: "Masukkan Nilai",
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
  const [toggleValues, setToggleValues] = React.useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        mobileSections.flatMap((section) =>
          section.settings
            .filter((setting): setting is ToggleMobileSetting => setting.type === "toggle")
            .map((setting) => [setting.id, setting.defaultValue ?? false]),
        ),
      ),
  );

  const [fieldValues, setFieldValues] = React.useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        mobileSections.flatMap((section) =>
          section.settings
            .filter((setting): setting is FieldMobileSetting => setting.type === "field")
            .map((setting) => [setting.id, setting.defaultValue ?? ""]),
        ),
      ),
  );

  function updateToggle(id: string, value: boolean) {
    setToggleValues((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function updateField(id: string, value: string) {
    setFieldValues((current) => ({
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

  const inputClassName = cn(
    "h-[30px] w-full rounded-[5px] border-slate-300 bg-white px-3",
    "text-[12px] font-normal text-black shadow-none",
    "placeholder:text-[#64748B]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="mt-8 w-full rounded-[5px] bg-white p-[15px] shadow-sm ring-1 ring-[#E4E9F2]">
      <div className="grid gap-[15px]">
        {mobileSections.map((section) => (
          <div
            key={section.id}
            className="overflow-hidden rounded-[5px] border border-[#D7DEE9] bg-white"
          >
            <div className="flex min-h-[55px] items-center gap-4 bg-[#F7F8FC] px-[20px]">
              <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F7DF5] text-white shadow-sm">
                <Smartphone className="h-[20px] w-[20px]" strokeWidth={2.8} />
              </span>

              <div className="text-[15px] font-bold text-black">
                {section.title}
              </div>
            </div>

            {section.settings.map((setting) => (
              <div
                key={setting.id}
                className={cn(
                  "grid min-h-[42px] grid-cols-[minmax(0,1fr)_minmax(300px,380px)] items-center",
                  "border-t border-[#D7DEE9] px-[13px] text-[12px] font-normal text-black",
                )}
              >
                <div className="min-w-0 pr-4 leading-snug">{setting.label}</div>

                <div className="flex min-w-0 justify-end">
                  {setting.type === "toggle" ? (
                    <TogglePill
                      checked={toggleValues[setting.id] ?? false}
                      onChange={(value) => updateToggle(setting.id, value)}
                    />
                  ) : (
                    <Input
                      value={fieldValues[setting.id] ?? ""}
                      onChange={(event) =>
                        updateField(setting.id, event.target.value)
                      }
                      placeholder={setting.placeholder}
                      className={inputClassName}
                    />
                  )}
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