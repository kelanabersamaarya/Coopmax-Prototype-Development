import { Check, ChevronRight, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

export default function NewMBankingSourceFundGradientCard({
  account,
  selected = false,
  onClick,
  showChevron = true,
  showBalance = true,
  className,
}: {
  account: SourceFundAccount;
  selected?: boolean;
  onClick?: () => void;
  showChevron?: boolean;
  showBalance?: boolean;
  className?: string;
}) {
  const content = (
    <div
      className={cn(
        "relative flex min-h-[118px] w-full items-center justify-between gap-4 overflow-hidden rounded-[15px]",
        "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_50%,#7C3AED_100%)]",
        "px-[18px] py-[16px] text-left text-white shadow-[0_12px_26px_rgba(37,99,235,0.22)]",
        "ring-1 ring-white/25",
        selected ? "outline outline-2 outline-[#479DF4]" : "",
        onClick ? "transition active:scale-[0.99]" : "",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-[42px] -top-[40px] h-[128px] w-[128px] rounded-full bg-white/16" />
      <div className="pointer-events-none absolute right-[50px] top-[54px] h-[58px] w-[58px] rounded-full bg-cyan-200/16" />
      <div className="pointer-events-none absolute -bottom-[34px] left-[72px] h-[92px] w-[92px] rounded-full bg-violet-950/12" />

      <div className="relative z-10 flex min-w-0 items-center gap-[13px]">
        <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[14px] bg-[#18B7A1] text-white shadow-sm ring-1 ring-white/20">
          <WalletCards className="h-[24px] w-[24px] text-white" strokeWidth={2.6} />
        </span>

        <div className="min-w-0">
          <div className="text-[12px] font-normal leading-none text-white/82">
            {account.productName}
          </div>
          <div className="mt-[7px] truncate text-[17px] font-bold leading-tight text-white">
            {account.accountNo}
          </div>

          {showBalance ? (
            <>
              <div className="mt-[14px] text-[12px] font-normal leading-none text-white/82">
                Saldo
              </div>
              <div className="mt-[7px] truncate text-[17px] font-bold leading-tight text-white">
                {account.balance}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="relative z-10 shrink-0">
        {selected ? (
          <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-white text-[#2563EB] shadow-sm">
            <Check className="h-[18px] w-[18px]" strokeWidth={3} />
          </span>
        ) : showChevron ? (
          <ChevronRight className="h-[28px] w-[28px] text-white" strokeWidth={2.8} />
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