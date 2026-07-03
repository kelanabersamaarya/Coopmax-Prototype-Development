import * as React from "react";
import { RotateCcw, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";
import ProfileToggle from "@/components/mobile/new-mbanking/profile/ProfileToggle";

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

function buildDefaultSettings() {
  return Object.fromEntries(
    settingsItems.map((item, index) => [`${index}-${item}`, false]),
  );
}

export default function ProfileSettingsPage({ onBack }: { onBack: () => void }) {
  const [settings, setSettings] = React.useState<Record<string, boolean>>(
    buildDefaultSettings,
  );

  function resetSettings() {
    setSettings(buildDefaultSettings());
  }

  return (
    <ProfileSubPageShell
      title="Pengaturan"
      onBack={onBack}
      className="pb-[120px]"
    >
      <div className="rounded-[22px] bg-[#F8FAFC] p-4 ring-1 ring-[#EEF0F4]">
        <div className="flex items-start gap-3">
          <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
            <Settings className="h-[23px] w-[23px]" strokeWidth={2.6} />
          </span>

          <div className="min-w-0">
            <div className="text-[16px] font-bold leading-tight text-black">
              Pengaturan Fitur
            </div>
            <p className="mt-2 text-[13px] font-normal leading-relaxed text-[#6B7280]">
              Atur ketersediaan fitur M-Banking sesuai kebutuhan layanan.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[18px] overflow-hidden rounded-[22px] bg-white ring-1 ring-[#EEF0F4]">
        {settingsItems.map((item, index) => {
          const key = `${index}-${item}`;
          const isLast = index === settingsItems.length - 1;

          return (
            <div
              key={key}
              className={cn(
                "flex min-h-[58px] w-full items-center justify-between gap-4 bg-white px-4 py-[13px]",
                !isLast ? "border-b border-[#EEF0F4]" : "",
              )}
            >
              <div className="min-w-0 text-[15px] font-bold leading-tight tracking-[-0.015em] text-black">
                {item}
              </div>

              <ProfileToggle
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

      <div className="absolute inset-x-6 bottom-[26px] z-20 bg-white">
        <button
          type="button"
          onClick={resetSettings}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#EF135D]",
            "text-[14px] font-semibold leading-none text-white",
            "shadow-[0_8px_18px_rgba(239,19,93,0.18)]",
            "transition active:scale-[0.98]",
          )}
        >
          <span className="inline-flex items-center justify-center gap-2">
            <RotateCcw className="h-[18px] w-[18px]" strokeWidth={2.6} />
            Reset
          </span>
        </button>
      </div>
    </ProfileSubPageShell>
  );
}