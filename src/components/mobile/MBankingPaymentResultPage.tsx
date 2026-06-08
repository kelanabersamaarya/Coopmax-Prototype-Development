"use client";

import { ArrowLeft, Check } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

function InfoPair({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <div className="text-[14px] font-normal leading-tight tracking-tight text-[#8F8F8F]">
        {label}
      </div>
      <div className="mt-1 text-[14px] font-normal leading-tight tracking-tight text-black">
        {value}
      </div>
    </div>
  );
}

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

        <section className="mt-6 overflow-hidden rounded-[26px] bg-white px-6 pb-9 pt-7 shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#EAF8FC]">
              <Check className="h-[42px] w-[42px] text-[#45B9DE]" strokeWidth={3.4} />
            </div>

            <div className="mt-5 text-[14px] font-extrabold leading-none tracking-tight text-[#203064]">
              Sukses
            </div>
          </div>

          <div className="mt-6 rounded-[26px] bg-[#F1F1F1] px-4 py-6 text-center">
            <div className="text-[14px] font-normal leading-none tracking-tight text-[#8F8F8F]">
              Pembayaran Berhasil
            </div>

            <div className="mt-4 text-[14px] font-extrabold leading-none tracking-tight text-[#203064]">
              Rp.408,333.33
            </div>

            <div className="mt-1 text-[14px] font-normal leading-none tracking-tight text-[#8F8F8F]">
              Total Angsuran
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8">
            <InfoPair label="No. Pinjaman" value="9.260.002" />
            <InfoPair label="Angsuran" value="Ke-1" align="right" />

            <InfoPair label="No. Simpanan" value={account || "SK01260002"} />
            <InfoPair label="Status" value="Berhasil" align="right" />

            <InfoPair label="Pokok" value="Rp.208,333.33" />
            <InfoPair label="Bunga" value="Rp.200,000.00" align="right" />

            <InfoPair label="Hutang Bunga" value="Rp.0" />
            <InfoPair label="Denda" value="Rp.0" align="right" />
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-10 h-[48px] w-full rounded-full bg-[#0A4BD8] text-[14px] font-normal text-white transition hover:bg-[#0844C3] active:translate-y-px"
          >
            Oke
          </button>
        </section>
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}