"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorFeatureToggle from "@/components/mobile/EKolektorFeatureToggle";

const settingsItems = [
  "Is Mode 2 ?",
  "Has Ppob ?",
  "Show Fee ?",
  "Has Pin ?",
  "Period Saving Has Multiple Input ?",
  "Has Billing ?",
  "Has Offline Mode ?",
  "Has Online Deposit ?",
  "Has Push Notification ?",
  "Has Notification List ?",
  "Use Custom Report Filter ?",
];

export default function EKolektorSettingsPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [settings, setSettings] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(settingsItems.map((item) => [item, false])),
  );

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-hidden bg-[#004FC7]">
        <header className="relative h-[190px] shrink-0 overflow-hidden bg-[#004FC7] px-[26px] pt-[28px] text-white">
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

          <h1 className="relative z-10 mt-[31px] text-[25px] font-extrabold leading-none tracking-tight text-white">
            Pengaturan Fitur
          </h1>
        </header>

        <main className="relative z-20 -mt-[16px] h-[calc(100%-174px)] overflow-y-auto rounded-t-[18px] bg-white pb-8 pt-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="px-[26px] pb-[10px] pt-[18px] text-[14px] font-extrabold uppercase leading-none tracking-tight text-[#8C8C8C]">
            PENGATURAN APLIKASI
          </div>

          <div className="border-t border-[#E8E8E8] bg-white">
            {settingsItems.map((item) => (
              <div
                key={item}
                className="flex min-h-[58px] w-full items-center justify-between gap-4 border-b border-[#E8E8E8] bg-white px-[26px] py-[12px]"
              >
                <div className="min-w-0 text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
                  {item}
                </div>

                <EKolektorFeatureToggle
                  checked={settings[item] ?? false}
                  onChange={(value) =>
                    setSettings((current) => ({
                      ...current,
                      [item]: value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}