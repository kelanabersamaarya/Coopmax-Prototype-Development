"use client";

import * as React from "react";
import { ArrowLeft, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";
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
  "Enable Kocek Kolektor?",
  "Reset Transaction Sync Staus?",
];

export default function EKolektorSettingsPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [settings, setSettings] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(settingsItems.map((item) => [item, false])),
  );
  const [showBiometricLogout, setShowBiometricLogout] = React.useState(false);

  function resetSettings() {
    setSettings(Object.fromEntries(settingsItems.map((item) => [item, false])));
  }

  function handleExit() {
    setShowBiometricLogout(true);
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
            onClick={handleExit}
            className="-ml-1 inline-flex h-[28px] w-[28px] items-center justify-center rounded-full text-white transition active:scale-[0.96]"
            aria-label="Keluar"
            title="Keluar"
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
              const isLast = index === settingsItems.length - 1;

              return (
                <div
                  key={item}
                  className={cn(
                    "flex min-h-[58px] w-full items-center justify-between gap-4 bg-white px-[26px] py-[12px]",
                    !isLast ? "border-b border-[#E8E8E8]" : "",
                  )}
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

      <EKolektorAndroidNavBar onBack={handleExit} />

      {showBiometricLogout && (
        <div className="absolute inset-0 z-40 flex items-end bg-[#10234A]/30">
          <button
            type="button"
            aria-label="Tutup opsi login biometrik"
            onClick={() => setShowBiometricLogout(false)}
            className="absolute inset-0 cursor-default"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="biometric-logout-title"
            className="relative w-full rounded-t-[24px] bg-white px-6 pb-7 pt-6 text-center shadow-[0_-8px_24px_rgba(32,48,100,0.16)]"
          >
            <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-[#D8E2F2]" />
            <div className="mx-auto grid h-[68px] w-[68px] place-items-center rounded-full bg-[#EAF2FF] text-[#004FC7]">
              <Fingerprint className="h-[40px] w-[40px]" strokeWidth={1.7} />
            </div>
            <h2 id="biometric-logout-title" className="mt-4 text-[19px] font-extrabold leading-tight text-[#203064]">
              Login dengan Biometrik
            </h2>
            <p className="mx-auto mt-2 max-w-[300px] text-[14px] leading-relaxed text-[#777F91]">
              Gunakan biometrik untuk mengakses aplikasi kembali dengan cepat dan aman.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-5 h-[45px] w-full rounded-[9px] bg-[#004FC7] text-[14px] font-semibold text-white shadow-[0_3px_8px_rgba(0,79,199,0.22)] transition active:scale-[0.99]"
            >
              Login dengan Biometrik
            </button>
            <button
              type="button"
              onClick={() => setShowBiometricLogout(false)}
              className="mt-4 text-[14px] font-semibold text-[#004FC7] transition active:scale-[0.98]"
            >
              Batal
            </button>
          </section>
        </div>
      )}
    </div>
  );
}