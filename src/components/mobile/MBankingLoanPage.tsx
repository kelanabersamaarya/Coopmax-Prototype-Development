"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import MBankingLoanDetailPage from "@/components/mobile/MBankingLoanDetailPage";
import MBankingLoanPasswordPage from "@/components/mobile/MBankingLoanPasswordPage";

type LoanScreen = "list" | "password" | "detail";

export default function MBankingLoanPage({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = React.useState<LoanScreen>("list");

  if (screen === "detail") {
    return <MBankingLoanDetailPage onBack={() => setScreen("list")} />;
  }

  if (screen === "password") {
    return (
      <MBankingLoanPasswordPage
        onBack={() => setScreen("list")}
        onSuccess={() => setScreen("detail")}
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
        </button>

        <h1 className="mt-6 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
          Pinjaman
        </h1>

        <section className="pt-7">
          <button
            type="button"
            onClick={() => setScreen("password")}
            className="block w-full text-left transition active:scale-[0.99]"
            aria-label="Buka input password Pinjaman Bulanan"
            title="Buka input password Pinjaman Bulanan"
          >
            <div className="relative h-[147px] w-full overflow-hidden rounded-[14px] bg-[#004FC7] px-5 py-5 text-white shadow-[0_8px_22px_rgba(0,79,199,0.20)]">
              <div className="pointer-events-none absolute -right-[36px] -top-[48px] h-[120px] w-[120px] rounded-full bg-white/12" />
              <div className="pointer-events-none absolute right-[22px] -top-[62px] h-[112px] w-[112px] rounded-full bg-white/10" />
              <div className="pointer-events-none absolute right-[72px] top-[18px] h-[44px] w-[44px] rounded-full bg-white/8" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="text-[16px] font-extrabold leading-tight tracking-tight text-white">
                  Pinjaman Bulanan
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] font-normal leading-none text-[#678DD8]">
                      No. Pinjaman
                    </div>
                    <div className="mt-2 truncate text-[12px] font-semibold leading-none text-white">
                      SMG260004
                    </div>
                  </div>

                  <div className="min-w-0 text-right">
                    <div className="text-[10px] font-normal leading-none text-[#678DD8]">
                      Jangka Waktu
                    </div>
                    <div className="mt-2 truncate text-[12px] font-semibold leading-none text-white">
                      12 Bulan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </section>
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}