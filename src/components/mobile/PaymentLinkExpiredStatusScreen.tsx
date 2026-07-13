"use client";

import { Clock3 } from "lucide-react";

export default function PaymentLinkExpiredStatusScreen() {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] px-5 py-[28px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center">
        <section className="flex w-full flex-col items-center justify-center rounded-[24px] bg-white px-6 py-8 text-center shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
          <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-amber-50">
            <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-amber-500 text-white">
              <Clock3
                className="h-[48px] w-[48px] text-white"
                strokeWidth={2.2}
              />
            </div>
          </div>

          <h1 className="mt-[28px] max-w-[310px] text-[20px] font-bold leading-[1.25] tracking-[-0.025em] text-black">
            Pembayaran Via Link Telah Kedaluwarsa
          </h1>
        </section>
      </main>
    </div>
  );
}