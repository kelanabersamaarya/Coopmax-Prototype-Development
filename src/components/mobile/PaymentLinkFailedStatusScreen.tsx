"use client";

import { X } from "lucide-react";

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[10px]">
      <div className="min-w-0 text-[13px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div className="max-w-[185px] text-right text-[13px] font-bold leading-tight text-black">
        {value}
      </div>
    </div>
  );
}

export default function PaymentLinkFailedStatusScreen() {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] px-5 py-[28px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center">
        <section className="flex w-full flex-col items-center rounded-[24px] bg-white px-6 py-8 text-center shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
          <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#FCE4E7]">
            <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#DC3545] text-white">
              <X className="h-[50px] w-[50px] text-white" strokeWidth={3.8} />
            </div>
          </div>

          <h1 className="mt-[28px] max-w-[310px] text-[20px] font-bold leading-[1.25] tracking-[-0.025em] text-black">
            Pembayaran Angsuran Pinjaman via Link Gagal Dilakukan
          </h1>

          <div className="mt-[24px] w-full rounded-[18px] bg-[#F6F8FB] px-5 py-5">
            <div className="text-center text-[12px] font-normal leading-none text-[#828282]">
              Nominal Transaksi
            </div>
            <div className="mt-[10px] text-center text-[26px] font-bold leading-tight tracking-[-0.03em] text-black">
              Rp. 991.666,00
            </div>
          </div>

          <div className="mt-[18px] w-full rounded-[16px] border border-[#E5E7EB] bg-white px-4 py-2 text-left">
            <InfoRow label="Tanggal Transaksi" value="03 Juli 2026" />
            <div className="h-px w-full bg-[#EEF0F4]" />
            <InfoRow label="Waktu Transaksi" value="15:16 WIB" />
            <div className="h-px w-full bg-[#EEF0F4]" />
            <InfoRow label="Metode Transaksi" value="Transfer Antar Bank" />
          </div>
        </section>
      </main>
    </div>
  );
}