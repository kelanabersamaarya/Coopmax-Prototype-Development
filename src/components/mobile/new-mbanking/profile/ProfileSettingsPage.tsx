import * as React from "react";
import { RotateCcw } from "lucide-react";
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
    <ProfileSubPageShell title="Pengaturan" onBack={onBack}>
      <div className="overflow-hidden rounded-[22px] bg-white ring-1 ring-[#EEF0F4]">
        {settingsItems.map((item, index) => {
          const key = `${index}-${item}`;

          return (
            <div
              key={key}
              className="flex min-h-[58px] w-full items-center justify-between gap-4 border-b border-[#EEF0F4] bg-white px-4 py-[13px]"
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

        <button
          type="button"
          onClick={resetSettings}
          className="flex min-h-[58px] w-full items-center justify-between gap-4 bg-white px-4 py-[13px] text-left transition active:scale-[0.99]"
        >
          <span className="flex min-w-0 items-center gap-4">
            <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#EF135D] text-white">
              <RotateCcw className="h-[23px] w-[23px]" strokeWidth={2.6} />
            </span>

            <span className="min-w-0">
              <span className="block text-[15px] font-bold leading-tight text-black">
                Reset
              </span>
              <span className="mt-[5px] block text-[12px] font-normal leading-snug text-[#8F8F8F]">
                Kembalikan semua pengaturan fitur ke posisi awal.
              </span>
            </span>
          </span>
        </button>
      </div>
    </ProfileSubPageShell>
  );
}