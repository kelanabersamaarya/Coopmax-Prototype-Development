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
    <nav
      className={cn(
        "shrink-0 rounded-t-[24px] bg-[#F9F9F9] px-[14px] pb-[14px] pt-[13px]",
        className,
      )}
    >
      <div className="grid grid-cols-5 items-end gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.center) {
            return (
              <button
                key={item.label}
                type="button"
                className="flex min-w-0 flex-col items-center justify-end rounded-[14px] transition active:scale-[0.97]"
                aria-label={item.label}
              >
                <span className="mb-[7px] grid h-[52px] w-[52px] place-items-center rounded-[16px] bg-[#479DF4] text-white">
                  <Icon className="h-[29px] w-[29px]" strokeWidth={2.7} />
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
              className="flex min-w-0 flex-col items-center justify-end rounded-[14px] py-[4px] transition active:scale-[0.97]"
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "h-[24px] w-[24px]",
                  item.active ? "text-[#479DF4]" : "text-[#8F8F8F]",
                )}
                strokeWidth={2.3}
              />

              <span
                className={cn(
                  "mt-[7px] truncate text-[11px] font-normal leading-none tracking-[-0.02em]",
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
  );
}