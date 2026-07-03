import { Copy, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingDepositDestinationCard({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mt-[18px] min-h-[104px] overflow-hidden rounded-[15px]",
        "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_50%,#7C3AED_100%)]",
        "px-[18px] py-[13px] text-white",
        "shadow-[0_12px_26px_rgba(37,99,235,0.22)] ring-1 ring-white/25",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-[42px] -top-[40px] h-[128px] w-[128px] rounded-full bg-white/16" />
      <div className="pointer-events-none absolute right-[50px] top-[54px] h-[58px] w-[58px] rounded-full bg-cyan-200/16" />
      <div className="pointer-events-none absolute -bottom-[34px] left-[72px] h-[92px] w-[92px] rounded-full bg-violet-950/12" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(15,23,42,0.12))]" />

      <div className="relative z-10 flex h-full min-h-[78px] items-center gap-[13px]">
        <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#18B7A1] text-white shadow-sm ring-1 ring-white/20">
          <UserRound className="h-[22px] w-[22px] text-white" strokeWidth={2.6} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[18px] font-bold leading-tight tracking-[-0.025em] text-white">
            Arya
          </div>

          <div className="mt-[8px] flex min-w-0 items-center gap-2">
            <span className="truncate text-[14px] font-normal leading-none text-white/88">
              11122333311 - Simpanan Kaya
            </span>

            <button
              type="button"
              className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
              aria-label="Salin nomor rekening"
              title="Salin nomor rekening"
            >
              <Copy className="h-[14px] w-[14px]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}