"use client";

import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function MBankingPaymentResultPage({
  account,
  onBack,
}: {
  account: string;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7]">
      <main className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
        </button>

        <div className="mt-10 overflow-hidden rounded-[26px] bg-white px-6 pb-7 pt-8 text-center shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
          <div className="flex justify-center">
            <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full bg-[#EAF7F1]">
              <Check className="h-[54px] w-[54px] text-[#34B27C]" strokeWidth={3.2} />
            </div>
          </div>

          <h1 className="mt-7 text-[24px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Pembayaran Berhasil
          </h1>

          <p className="mt-3 text-[14px] font-normal leading-relaxed text-[#8F8F8F]">
            Angsuran pinjaman berhasil diproses untuk rekening:
          </p>

          <div className="mt-5 w-full rounded-[18px] bg-[#F1F1F1] px-4 py-4 text-center">
            <div className="text-[16px] font-semibold leading-tight tracking-tight text-[#203064]">
              {account}
            </div>
          </div>

          <div className="mt-7 w-full rounded-[18px] bg-white p-5 text-left shadow-[0_5px_18px_rgba(15,23,42,0.10)] ring-1 ring-slate-100">
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[14px] font-normal text-black">
                  Jenis Transaksi
                </span>
                <span className="text-right text-[14px] font-normal text-black">
                  Angsuran Pinjaman
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[14px] font-normal text-black">Total Bayar</span>
                <span className="text-right text-[14px] font-normal text-black">
                  Rp.408.333,33
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-[14px] font-normal text-black">Status</span>
                <span className="text-right text-[14px] font-semibold text-[#34B27C]">
                  Berhasil
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}