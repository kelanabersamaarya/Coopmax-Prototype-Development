import { ChevronRight, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingAccountSummaryCard({
  className,
}: {
  className?: string;
}) {
  return (
    <section className={cn("mt-[18px]", className)}>
      <div className="relative overflow-hidden rounded-[22px] bg-[#479DF4] px-5 pb-5 pt-5 text-white">
        <div className="pointer-events-none absolute -right-[42px] -top-[44px] h-[136px] w-[136px] rounded-full bg-white/12" />
        <div className="pointer-events-none absolute right-[42px] top-[18px] h-[52px] w-[52px] rounded-full bg-white/10" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[13px] font-normal leading-none text-white/75">
              Rekening Utama
            </div>

            <div className="mt-[9px] text-[19px] font-bold leading-tight tracking-[-0.03em] text-white">
              Simpanan Kaya
            </div>

            <div className="mt-[18px] text-[12px] font-normal leading-none text-white/70">
              Saldo Tersedia
            </div>

            <div className="mt-[8px] text-[22px] font-bold leading-tight tracking-[-0.04em] text-white">
              Rp. 4.000.000,00
            </div>

            <div className="mt-[16px] flex items-center gap-2 text-[12px] font-normal leading-none text-white">
              <span>112233111</span>
              <Copy className="h-[14px] w-[14px]" strokeWidth={2.5} />
            </div>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1 rounded-full text-[12px] font-normal leading-none text-white transition active:scale-[0.98]"
          >
            Detail
            <ChevronRight className="h-[15px] w-[15px]" strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </section>
  );
}