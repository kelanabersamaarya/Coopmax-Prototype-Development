import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

export default function NewMBankingSourceFundGradientCard({
  account,
  selected = false,
  onClick,
  showChevron = true,
  showBalance = true,
  sectionLabel,
  iconShape = "circle",
  textSize = "default",
  className,
}: {
  account: SourceFundAccount;
  selected?: boolean;
  onClick?: () => void;
  showChevron?: boolean;
  showBalance?: boolean;
  sectionLabel?: string;
  iconShape?: "rounded" | "circle";
  textSize?: "default" | "compact";
  className?: string;
}) {
  const isCompact = textSize === "compact";

  const content = (
    <div
      className={cn(
        "relative flex min-h-[118px] w-full items-center justify-between gap-4 overflow-hidden rounded-[15px]",
        "bg-gradient-to-br from-[#0758C9] via-[#2563D5] to-[#58B8E8]",
        "px-[18px] py-[16px] text-left text-white",
        onClick ? "transition active:scale-[0.99]" : "",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-[42px] -top-[40px] h-[128px] w-[128px] rounded-full bg-white/20" />
      <div className="pointer-events-none absolute right-[50px] top-[54px] h-[58px] w-[58px] rounded-full bg-white/15" />
      <div className="pointer-events-none absolute -bottom-[34px] left-[72px] h-[92px] w-[92px] rounded-full bg-white/15" />

      <div className="relative z-10 min-w-0 flex-1 pr-14">
        {sectionLabel ? (
          <div
            className={cn(
              "mb-[5px] font-normal leading-none text-white/82",
              isCompact ? "text-[10px]" : "text-[12px]",
            )}
          >
            {sectionLabel}
          </div>
        ) : null}

        <div className="flex min-w-0 items-center gap-[13px]">
          <div className="min-w-0">
            <div className="grid gap-0">
              <div
                className={cn(
                  "font-normal leading-none text-white/82",
                  isCompact ? "text-[10px]" : "text-[12px]",
                )}
              >
                {account.productName}
              </div>
              <div
                className={cn(
                  "mt-0 truncate font-bold leading-none text-white",
                  isCompact ? "text-[14px]" : "text-[17px]",
                )}
              >
                {account.accountNo}
              </div>
            </div>

            {showBalance ? (
              <div className="mt-[7px] grid gap-0">
                <div
                  className={cn(
                    "font-normal leading-none text-white/82",
                    isCompact ? "text-[10px]" : "text-[12px]",
                  )}
                >
                  {account.balanceLabel ?? "Saldo"}
                </div>
                <div
                  className={cn(
                    "mt-0 truncate font-bold leading-none text-white",
                    isCompact ? "text-[14px]" : "text-[17px]",
                  )}
                >
                  {account.balance}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="absolute right-[13px] top-[16px] z-10 flex items-center gap-[3px]">
        {selected ? (
          <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-white text-[#004FC7] shadow-sm">
            <Check className="h-[18px] w-[18px]" strokeWidth={3} />
          </span>
        ) : showChevron ? (
          <>
            <span className="text-[12px] font-semibold leading-none text-white">Ubah</span>
            <ChevronRight className="h-[25px] w-[25px] text-white" strokeWidth={2.8} />
          </>
        ) : null}
      </div>
    </div>
  );

  if (!onClick) return content;

  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full"
      aria-label={`Pilih sumber dana ${account.productName} ${account.accountNo}`}
    >
      {content}
    </button>
  );
}