"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorFeatureToggle from "@/components/mobile/EKolektorFeatureToggle";

const settingsItems = [
  "Has Sign Up Member ?",
  "Has Deposit ?",
  "Has Collector Transaction History ?",
  "Has Billing ?",
  "Has Voucher ?",
  "Has Mitra ?",
  "Has Point ?",
  "Has Djoinpay ?",
  "Has Principal Saving ?",
  "Has Mandatory Saving ?",
  "Enable Kocek Mbanking ?",
  "Has Period Saving Due With Input Nominal ?",
  "Has Sign Up ?",
  "Has Sign Up Fee ?",
  "Is Sign Up 2 Step ?",
  "Has Member Card ?",
  "Has Push Notification ?",
  "Has Notification List ?",
  "Only Active Saving On Home Page ?",
  "Has Sign Up Member ?",
  "Has Deposit ?",
  "Has Collector Transaction History ?",
  "Has Sign Up Member ?",
  "Has Deposit ?",
  "Has Collector Transaction History ?",
  "Has Billing ?",
  "Has Voucher ?",
  "Has Mitra ?",
  "Has Point ?",
  "Has Djoinpay ?",
  "Has Principal Saving ?",
  "Has Mandatory Saving ?",
  "Enable Kocek Mbanking ?",
];

export default function MBankingSettingsPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [settings, setSettings] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(settingsItems.map((item, index) => [`${index}-${item}`, false])),
  );

  function resetSettings() {
    setSettings(
      Object.fromEntries(settingsItems.map((item, index) => [`${index}-${item}`, false])),
    );
  }

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

        <main className="relative z-20 -mt-[16px] h-[calc(100%-174px)] overflow-y-auto rounded-t-[18px] bg-white pt-[18px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="bg-white">
            {settingsItems.map((item, index) => {
              const key = `${index}-${item}`;
              const isLast = index === settingsItems.length - 1;

              return (
                <div
                  key={key}
                  className={cn(
                    "flex min-h-[58px] w-full items-center justify-between gap-4 bg-white px-[26px] py-[12px]",
                    !isLast ? "border-b border-[#E8E8E8]" : "",
                  )}
                >
                  <div className="min-w-0 text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
                    {item}
                  </div>

                  <EKolektorFeatureToggle
                    checked={settings[key] ?? false}
                    onChange={(value) =>
                      setSettings((current) => ({
                        ...current,
                        [key]: value,
                      }))
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 z-30 mt-4 bg-white px-[26px] pb-6 pt-4 shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
            <button
              type="button"
              onClick={resetSettings}
              className={cn(
                "h-[43px] w-full rounded-[9px]",
                "bg-[#EF135D] text-[14px] font-semibold text-white",
                "shadow-[0_3px_8px_rgba(239,19,93,0.22)]",
                "transition active:scale-[0.99]",
              )}
            >
              Reset
            </button>
          </div>
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}