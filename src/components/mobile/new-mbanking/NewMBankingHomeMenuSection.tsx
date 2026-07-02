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
    <div className={cn("shrink-0 bg-[#F9F9F9] px-6 pb-[36px] pt-[18px]", className)}>
      <nav className="relative mx-auto h-[110px] w-[344px] max-w-full rounded-[20px] bg-white px-[14px] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <div className="grid h-full grid-cols-5 items-center gap-[21px]">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.center) {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="relative flex min-w-0 flex-col items-center justify-end rounded-[14px] pb-[18px] transition active:scale-[0.97]"
                  aria-label={item.label}
                >
                  <span className="absolute -top-[37px] left-1/2 grid h-[90px] w-[90px] -translate-x-1/2 place-items-center rounded-[16px] bg-[#479DF4] text-white shadow-[0_10px_24px_rgba(71,157,244,0.26)]">
                    <Icon className="h-[38px] w-[38px]" strokeWidth={2.7} />
                  </span>

                  <span className="flex h-[20px] items-center justify-center">
                    <NewMBankingQrisLogo />
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                className="flex min-w-0 flex-col items-center justify-center rounded-[14px] pt-[10px] transition active:scale-[0.97]"
                aria-label={item.label}
                aria-current={item.active ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "h-[28px] w-[28px]",
                    item.active ? "text-[#479DF4]" : "text-[#7F7F7F]",
                  )}
                  strokeWidth={2.5}
                />

                <span
                  className={cn(
                    "mt-[10px] truncate text-center text-[18px] font-normal leading-none tracking-[-0.03em]",
                    item.active ? "text-[#479DF4]" : "text-[#7F7F7F]",
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