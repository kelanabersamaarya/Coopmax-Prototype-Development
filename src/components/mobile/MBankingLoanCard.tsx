"use client";

import { cn } from "@/lib/utils";

export default function MBankingLoanCard({
  productName,
  accountNo,
  tenor,
  onClick,
}: {
  productName: string;
  accountNo: string;
  tenor: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left transition active:scale-[0.99]"
      aria-label={`Buka input password ${productName}`}
      title={`Buka input password ${productName}`}
    >
      <div className="relative h-[147px] w-full overflow-hidden rounded-[14px] bg-[#004FC7] px-5 py-5 text-white shadow-[0_8px_22px_rgba(0,79,199,0.20)]">
        <div className="pointer-events-none absolute -right-[36px] -top-[48px] h-[120px] w-[120px] rounded-full bg-white/12" />
        <div className="pointer-events-none absolute right-[22px] -top-[62px] h-[112px] w-[112px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute right-[72px] top-[18px] h-[44px] w-[44px] rounded-full bg-white/8" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="text-[16px] font-extrabold leading-tight tracking-tight text-white">
            {productName}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="min-w-0">
              <div className="text-[10px] font-normal leading-none text-[#678DD8]">
                No. Pinjaman
              </div>
              <div className="mt-2 truncate text-[12px] font-semibold leading-none text-white">
                {accountNo}
              </div>
            </div>

            <div className="min-w-0 text-right">
              <div className="text-[10px] font-normal leading-none text-[#678DD8]">
                Jangka Waktu
              </div>
              <div className="mt-2 truncate text-[12px] font-semibold leading-none text-white">
                {tenor}
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-[5px]",
            "bg-white/20",
          )}
        />
      </div>
    </button>
  );
}