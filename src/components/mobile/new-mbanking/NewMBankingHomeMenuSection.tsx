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
        "pointer-events-none absolute inset-x-0 bottom-[18px] z-40 px-5",
        className,
      )}
    >
      <nav className="pointer-events-auto mx-auto h-[72px] w-full max-w-[354px] rounded-[28px] border border-[#BFE0FF] bg-[#EAF4FF] px-[18px]">
        <div className="grid h-full grid-cols-5 items-center gap-[16px]">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.center) {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="flex min-w-0 -translate-y-[18px] flex-col items-center justify-end rounded-[14px] transition active:scale-[0.97]"
                  aria-label={item.label}
                >
                  <span className="mb-[14px] grid h-[56px] w-[56px] place-items-center rounded-[18px] bg-[#479DF4] text-white">
                    <Icon className="h-[30px] w-[30px]" strokeWidth={2.7} />
                  </span>
                  <span className="flex h-[13px] items-center justify-center">
                    <NewMBankingQrisLogo />
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                className="relative h-full min-w-0 rounded-[14px] transition active:scale-[0.97]"
                aria-label={item.label}
                aria-current={item.active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "absolute left-1/2 top-1/2 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2",
                    item.active ? "text-[#479DF4]" : "text-[#8F8F8F]",
                  )}
                  strokeWidth={2.3}
                />

                <span
                  className={cn(
                    "absolute inset-x-0 bottom-[8px] truncate text-center text-[11px] font-normal leading-none tracking-[-0.02em]",
                    item.active ? "text-[#479DF4]" : "text-[#8F8F8F]",
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