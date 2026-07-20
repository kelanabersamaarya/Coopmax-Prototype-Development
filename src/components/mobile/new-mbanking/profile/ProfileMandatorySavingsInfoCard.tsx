import { Copy, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileMandatorySavingsInfoCard({
  label,
  title,
  subtitle,
  balanceLabel,
  balance,
  actionLabel,
  onAction,
  tone = "blue",
}: {
  label: string;
  title: string;
  subtitle: string;
  balanceLabel?: string;
  balance?: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: "blue" | "green";
}) {
  return (
    <div className="grid gap-[8px]">
      <div className="text-[14px] font-bold leading-none text-black">{label}</div>

      <article
        className={cn(
          "relative min-h-[108px] overflow-hidden rounded-[18px] px-4 py-4 text-white",
          tone === "green"
            ? "bg-[linear-gradient(135deg,#18B7A1_0%,#0F766E_58%,#115E59_100%)]"
            : "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_54%,#7C3AED_100%)]",
        )}
      >
        <div className="pointer-events-none absolute -right-[34px] -top-[34px] h-[104px] w-[104px] rounded-full bg-white/16" />
        <div className="pointer-events-none absolute right-[42px] top-[46px] h-[50px] w-[50px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-[30px] left-[62px] h-[78px] w-[78px] rounded-full bg-black/10" />

        <div className="relative z-10 flex items-start gap-3">
          <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-white/18 text-white ring-1 ring-white/20">
            <WalletCards className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-[16px] font-bold leading-tight tracking-[-0.03em] text-white">
                  {title}
                </div>

                <div className="mt-[7px] flex min-w-0 items-center gap-2">
                  <span className="truncate text-[13px] font-normal leading-none text-white/88">
                    {subtitle}
                  </span>
                  <Copy className="h-[13px] w-[13px] shrink-0 text-white/90" strokeWidth={2.5} />
                </div>
              </div>

              {actionLabel && onAction ? (
                <button
                  type="button"
                  onClick={onAction}
                  className="shrink-0 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold leading-none text-[#2563EB] transition active:scale-[0.98]"
                >
                  {actionLabel}
                </button>
              ) : null}
            </div>

            {balanceLabel && balance ? (
              <div className="mt-[14px]">
                <div className="text-[11px] font-normal leading-none text-white/72">
                  {balanceLabel}
                </div>
                <div className="mt-[6px] text-[15px] font-bold leading-tight tracking-[-0.025em] text-white">
                  {balance}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}