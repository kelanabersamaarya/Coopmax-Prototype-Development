import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceFundAccount } from "@/components/mobile/MBankingBillingQrisSourceFundModal";

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
        "relative flex min-h-[151px] w-full items-start justify-between gap-4 overflow-hidden rounded-[15px]",
        "bg-[#084FC7]",
        "px-[20px] py-[20px] text-left text-white",
        onClick ? "transition active:scale-[0.99]" : "",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-[42px] -top-[78px] h-[128px] w-[128px] rounded-full bg-white/12" />
      <div className="pointer-events-none absolute right-[52px] top-[58px] h-[58px] w-[58px] rounded-full bg-cyan-200/10" />

      <div className="relative z-10 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "font-bold leading-none text-white",
              isCompact ? "text-[14px]" : "text-[16px]",
            )}
          >
            {account.productName}
          </div>
          <span className="shrink-0 text-[11px] font-normal text-white">
            Detail &gt;
          </span>
        </div>

        <div className="mt-[56px] grid gap-0">
          <div className="text-[10px] font-normal leading-none text-white/60">
            No Rekening
          </div>
          <div className="mt-[8px] flex items-center gap-2">
            <div className="truncate text-[12px] font-bold leading-none text-white">
              {account.accountNo}
            </div>
            <span className="text-[13px] text-white" aria-hidden="true">▢</span>
          </div>
          {showBalance ? (
            <div className="mt-[8px] text-[11px] font-normal leading-none text-white/80">
              {account.balanceLabel ?? "Saldo"}: {account.balance}
            </div>
          ) : null}
        </div>
      </div>

      {selected ? (
        <span className="relative z-10 grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-white text-[#2563EB] shadow-sm">
          <Check className="h-[18px] w-[18px]" strokeWidth={3} />
        </span>
      ) : null}
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