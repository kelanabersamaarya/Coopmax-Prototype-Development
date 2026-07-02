import { FileText, Home, PieChart, ScanLine, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingQrisLogo from "@/components/mobile/new-mbanking/NewMBankingQrisLogo";

const menuItems = [
  {
    label: "Beranda",
    icon: Home,
    active: true,
  },
  {
    label: "Portofolio",
    icon: PieChart,
    active: false,
  },
  {
    label: "QRIS",
    icon: ScanLine,
    active: false,
    center: true,
  },
  {
    label: "Riwayat",
    icon: FileText,
    active: false,
  },
  {
    label: "Profil",
    icon: UserRound,
    active: false,
  },
];

export default function NewMBankingHomeMenuSection({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 rounded-t-[30px] bg-white px-5 pb-[18px] pt-[12px]",
        "shadow-[0_-12px_30px_rgba(15,23,42,0.10)]",
        className,
      )}
    >
      <nav className="mx-auto w-full max-w-[360px]">
        <div className="grid h-[72px] grid-cols-5 items-end">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.center) {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="flex min-w-0 -translate-y-[18px] flex-col items-center justify-end transition active:scale-[0.97]"
                  aria-label={item.label}
                >
                  <span
                    className={cn(
                      "grid h-[58px] w-[58px] place-items-center rounded-[17px]",
                      "bg-[#479DF4] text-white shadow-[0_10px_22px_rgba(71,157,244,0.28)]",
                    )}
                  >
                    <Icon className="h-[32px] w-[32px] text-white" strokeWidth={2.7} />
                  </span>

                  <span className="mt-[6px] flex h-[13px] items-center justify-center">
                    <NewMBankingQrisLogo />
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                className="flex min-w-0 flex-col items-center justify-end rounded-[14px] pb-[2px] transition active:scale-[0.97]"
                aria-label={item.label}
                aria-current={item.active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "h-[24px] w-[24px]",
                    item.active ? "text-[#479DF4]" : "text-[#9CA3AF]",
                  )}
                  strokeWidth={2.25}
                />

                <span
                  className={cn(
                    "mt-[7px] truncate text-[11px] font-normal leading-none tracking-[-0.02em]",
                    item.active ? "text-[#479DF4]" : "text-[#9CA3AF]",
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}