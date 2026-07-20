import { Copy, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export type NewMBankingRecipientInfo = {
  name: string;
  accountNo: string;
  bank?: string;
};

export default function NewMBankingRecipientInfoCard({
  recipient,
  className,
}: {
  recipient: NewMBankingRecipientInfo;
  className?: string;
}) {
  const subtitle = recipient.bank
    ? `${recipient.bank} • ${recipient.accountNo}`
    : recipient.accountNo;

  return (
    <div className={cn("grid gap-[9px]", className)}>
      <div className="text-[14px] font-bold leading-none text-black">
        Rekening Tujuan
      </div>

      <div
        className={cn(
          "relative min-h-[96px] overflow-hidden rounded-[15px]",
          "bg-[linear-gradient(135deg,#479DF4_0%,#2563EB_50%,#7C3AED_100%)]",
          "px-[18px] py-[12px] text-white",
          "ring-1 ring-white/25",
        )}
      >
        <div className="pointer-events-none absolute -right-[42px] -top-[40px] h-[128px] w-[128px] rounded-full bg-white/16" />
        <div className="pointer-events-none absolute right-[50px] top-[54px] h-[58px] w-[58px] rounded-full bg-cyan-200/16" />
        <div className="pointer-events-none absolute -bottom-[34px] left-[72px] h-[92px] w-[92px] rounded-full bg-violet-950/12" />

        <div className="relative z-10 flex min-h-[72px] items-center gap-[13px]">
          <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#18B7A1] text-white ring-1 ring-white/20">
            <UserRound className="h-[24px] w-[24px] text-white" strokeWidth={2.6} />
          </span>

          <div className="min-w-0 flex-1">
            <div className="truncate text-[17px] font-bold leading-tight text-white">
              {recipient.name}
            </div>

            <div className="mt-[9px] flex min-w-0 items-center gap-2">
              <span className="truncate text-[14px] font-normal leading-none text-white/88">
                {subtitle}
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
    </div>
  );
}