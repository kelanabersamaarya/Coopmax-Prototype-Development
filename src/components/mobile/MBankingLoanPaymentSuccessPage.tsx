"use client";

import { Check, WalletCards } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function MBankingLoanPaymentSuccessPage({
  loan,
  onDone,
}: {
  loan: { productName: string; accountNo: string };
  onDone: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#F5F7FB]">
      <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-7 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="mx-auto max-w-[390px] rounded-[24px] bg-white px-5 pb-7 pt-8 shadow-[0_12px_34px_rgba(15,23,42,0.12)]">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#EAF8F0]">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#20B400]">
                <Check className="h-10 w-10 text-white" strokeWidth={3.4} />
              </div>
            </div>

            <h1 className="mt-6 text-[18px] font-bold leading-tight text-[#111827]">
              Berhasil Melakukan Transaksi
            </h1>
            <p className="mt-3 text-[13px] leading-relaxed text-[#6B7280]">
              Pembayaran angsuran Pinjaman Billing berhasil diproses.
            </p>
          </div>

          <div className="mt-6 rounded-[18px] bg-[#F4F7FA] px-4 py-5 text-center">
            <div className="text-[12px] text-[#7B8491]">Nominal Transaksi</div>
            <div className="mt-3 text-[22px] font-bold leading-none text-[#111827]">
              Rp. 991.666,00
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-[14px] bg-[#479DF4] px-3 py-4 text-center text-white">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <WalletCards className="h-5 w-5" />
              </div>
              <div className="mt-2 text-[12px] font-semibold">Bukti Transaksi</div>
            </div>
            <div className="rounded-[14px] bg-[#479DF4] px-3 py-4 text-center text-white">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                +
              </div>
              <div className="mt-2 text-[12px] font-semibold">Simpan Penerima</div>
            </div>
          </div>

          <div className="mt-5 rounded-[16px] bg-[#0758C9] px-4 py-4 text-white">
            <div className="text-[12px] text-white/80">Sumber Dana</div>
            <div className="mt-2 text-[14px] font-semibold">Simpanan Kaya</div>
            <div className="mt-1 text-[17px] font-bold">112233111</div>
          </div>

          <div className="mt-4 rounded-[16px] border border-[#D8D8D8] px-4 py-4">
            <div className="text-[12px] text-[#7B8491]">Pembayaran</div>
            <div className="mt-1 text-[14px] font-semibold text-[#111827]">
              {loan.productName}
            </div>
            <div className="mt-1 text-[12px] text-[#6B7280]">
              No. Pinjaman: {loan.accountNo}
            </div>
          </div>

          <button
            type="button"
            onClick={onDone}
            className="mt-7 h-[46px] w-full rounded-[9px] bg-[#479DF4] text-[13px] font-semibold text-white transition active:scale-[0.98]"
          >
            Selesai
          </button>
        </section>
      </main>

      <EKolektorAndroidNavBar onBack={onDone} />
    </div>
  );
}
