import { FileText, Home, PieChart, ScanLine, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingQrisLogo from "@/components/mobile/new-mbanking/NewMBankingQrisLogo";

type NewMBankingHomeNavTab = "home" | "portfolio" | "history" | "profile";

const menuItems = [
  {
    id: "home" as const,
    label: "Beranda",
    icon: Home,
    center: false,
  },
  {
    id: "portfolio" as const,
    label: "Portofolio",
    icon: PieChart,
    center: false,
  },
  {
    id: "qris" as const,
    label: "QRIS",
    icon: ScanLine,
    center: true,
  },
  {
    id: "history" as const,
    label: "Riwayat Transaksi",
    icon: FileText,
    center: false,
  },
  {
    id: "profile" as const,
    label: "Anggota",
    icon: UserRound,
    center: false,
  },
];

export default function NewMBankingHomeMenuSection({
  className,
  activeTab = "home",
  onHomeClick,
  onPortfolioClick,
  onQrisClick,
  onHistoryClick,
  onProfileClick,
}: {
  className?: string;
  activeTab?: NewMBankingHomeNavTab;
  onHomeClick?: () => void;
  onPortfolioClick?: () => void;
  onQrisClick?: () => void;
  onHistoryClick?: () => void;
  onProfileClick?: () => void;
}) {
  function handleClick(id: (typeof menuItems)[number]["id"]) {
    if (id === "home") onHomeClick?.();
    if (id === "portfolio") onPortfolioClick?.();
    if (id === "qris") onQrisClick?.();
    if (id === "history") onHistoryClick?.();
    if (id === "profile") onProfileClick?.();
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-[18px] z-40 px-3",
        className,
      )}
    >
      <nav className="pointer-events-auto mx-auto h-[72px] w-full max-w-[400px] rounded-[28px] border border-[#BFE0FF] bg-[#EAF4FF] px-[12px]">
        <div className="grid h-full grid-cols-5 items-center gap-[8px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.center) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleClick(item.id)}
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
                onClick={() => handleClick(item.id)}
                className="relative h-full min-w-0 rounded-[14px] transition active:scale-[0.97]"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="absolute left-1/2 top-[12px] flex w-full -translate-x-1/2 flex-col items-center px-0.5">
                  <Icon
                    className={cn(
                      "h-[23px] w-[23px] shrink-0",
                      isActive ? "text-[#479DF4]" : "text-[#8F8F8F]",
                    )}
                    strokeWidth={2.3}
                  />

                  <span
                    className={cn(
                      "mt-[5px] flex h-[24px] max-w-[68px] items-start justify-center overflow-hidden text-center",
                      "text-[10px] font-normal leading-[12px] tracking-[-0.02em]",
                      "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
                      isActive ? "text-[#479DF4]" : "text-[#8F8F8F]",
                    )}
                  >
                    {item.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}