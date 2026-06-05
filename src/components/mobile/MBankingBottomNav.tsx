"use client";

import { Home, QrCode, Settings } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

type MBankingTab = "home" | "qr" | "settings";

const navItems = [
  {
    id: "home" as const,
    label: "Beranda",
    icon: Home,
    hideLabel: false,
  },
  {
    id: "qr" as const,
    label: "QR",
    icon: QrCode,
    hideLabel: true,
  },
  {
    id: "settings" as const,
    label: "Pengaturan",
    icon: Settings,
    hideLabel: false,
  },
];

export default function MBankingBottomNav({
  activeTab = "home",
  onAndroidBack,
}: {
  activeTab?: MBankingTab;
  onAndroidBack?: () => void;
}) {
  function handleClick(tab: MBankingTab) {
    if (tab === "home") return;

    toast(`${tab === "qr" ? "QR Code" : "Pengaturan"} (prototype)`, {
      description: "Menu ini belum dihubungkan.",
    });
  }

  return (
    <div className="sticky bottom-0 z-40 shrink-0">
      <nav className="bg-white px-5 pb-[7px] pt-[6px] shadow-[0_-8px_22px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-3 items-end">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;
            const isCenter = item.id === "qr";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClick(item.id)}
                className={cn(
                  "flex min-w-0 flex-col items-center justify-end rounded-[14px] px-1 py-0.5 transition active:scale-[0.98]",
                  item.hideLabel ? "gap-0 pb-[2px]" : "gap-[3px]",
                  isActive ? "text-[#004FC7]" : "text-[#A5A5A5]",
                )}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-full transition",
                    isCenter
                      ? "h-[47px] w-[47px] bg-[#004FC7] text-white"
                      : "h-[27px] w-[27px] bg-transparent",
                  )}
                >
                  <Icon
                    className={cn(
                      isCenter
                        ? "h-[25px] w-[25px] text-white"
                        : isActive
                          ? "h-[20px] w-[20px] text-[#004FC7]"
                          : "h-[20px] w-[20px] text-[#A5A5A5]",
                    )}
                    strokeWidth={isCenter ? 2.8 : 2.5}
                  />
                </span>

                {!item.hideLabel ? (
                  <span
                    className={cn(
                      "truncate text-[12px] leading-none tracking-tight",
                      isActive ? "font-extrabold" : "font-semibold",
                    )}
                  >
                    {item.label}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </nav>

      <EKolektorAndroidNavBar onBack={onAndroidBack} />
    </div>
  );
}