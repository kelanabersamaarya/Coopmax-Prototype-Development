import { ChevronRight, Copy, WalletCards } from "lucide-react";
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
          "relative min-h-[114px] overflow-hidden rounded-[14px] px-4 py-4 text-white",
          tone === "green"
            ? "bg-[linear-gradient(135deg,#18B7A1_0%,#0F766E_58%,#115E59_100%)]"
            : "bg-[linear-gradient(135deg,#3D98FF_0%,#2563EB_54%,#6D4CEB_100%)]",
        )}
      >
        <div className="pointer-events-none absolute -right-[36px] -top-[36px] h-[116px] w-[116px] rounded-full bg-white/12" />
        <div className="pointer-events-none absolute right-[54px] top-[54px] h-[54px] w-[54px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-[28px] left-[62px] h-[76px] w-[76px] rounded-full bg-black/8" />

        <div className="relative z-10 flex min-h-[82px] items-center gap-3">
          <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#18B7A1] text-white">
            <WalletCards className="h-[24px] w-[24px]" strokeWidth={2.5} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-normal leading-none text-white/82">
              {title}
            </div>

            <div className="mt-[6px] flex min-w-0 items-center gap-2">
              <span className="truncate text-[16px] font-bold leading-none tracking-[-0.02em] text-white">
                {subtitle}
              </span>

              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                className="inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
                aria-label={`Salin ${label}`}
                title="Salin"
              >
                <Copy className="h-[12px] w-[12px]" strokeWidth={2.5} />
              </button>
            </div>

            {balanceLabel && balance ? (
              <div className="mt-[12px]">
                <div className="text-[11px] font-normal leading-none text-white/82">
                  {balanceLabel}
                </div>
                <div className="mt-[7px] text-[17px] font-bold leading-none tracking-[-0.025em] text-white">
                  {balance}
                </div>
              </div>
            ) : null}
          </div>

          {onAction ? (
            <button
              type="button"
              onClick={onAction}
              className="grid h-[44px] w-[34px] shrink-0 place-items-center rounded-[10px] text-white transition active:scale-[0.96]"
              aria-label={actionLabel || `Pilih ${label}`}
              title={actionLabel || `Pilih ${label}`}
            >
              <ChevronRight className="h-[34px] w-[34px] text-white" strokeWidth={3.2} />
            </button>
          ) : null}
        </div>
      </article>
    </div>
  );
}