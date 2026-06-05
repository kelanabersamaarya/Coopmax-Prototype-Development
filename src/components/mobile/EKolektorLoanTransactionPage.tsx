"use client";

import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

const loanInfoItems = [
  {
    title: "No. Rekening Pinjaman",
    subtitle: "SMG260004 - Gaby",
  },
  {
    title: "Produk Pinjaman",
    subtitle: "Pinjaman Billing",
  },
  {
    title: "Skema Tagihan",
    subtitle: "Tagihan Sesuai Jadwal Angsuran",
  },
  {
    title: "Satuan Grace Period",
    subtitle: "Bulan",
  },
  {
    title: "Durasi Grace Period",
    subtitle: "3",
  },
  {
    title: "Sisa Pokok Pinjaman",
    subtitle: "10.000.000,00",
  },
];

export default function EKolektorLoanTransactionPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <header className="relative h-[116px] shrink-0 overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
        <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
        <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <h1 className="text-[25px] font-extrabold leading-none tracking-tight text-white">
            Tambah Transaksi
          </h1>

          <button
            type="button"
            onClick={onBack}
            className="rounded-full px-1 text-[14px] font-semibold leading-none text-[#BFD3F5] transition active:scale-[0.98]"
          >
            Batal
          </button>
        </div>
      </header>

      <main className="relative z-10 -mt-[30px] min-h-0 flex-1 overflow-y-auto rounded-t-[30px] bg-white px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#004FC7]">
          Angsuran Pinjaman
        </div>
        <div className="mt-1 text-[14px] font-normal leading-relaxed text-[#9B9B9B]">
          Silakan lengkapi form berikut
        </div>

        <div className="mt-[24px] grid gap-[22px]">
          {loanInfoItems.map((item) => (
            <div key={item.title} className="min-w-0">
              <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
                {item.title}
              </div>
              <div className="mt-[8px] min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-extrabold leading-tight tracking-tight text-[#23305A]">
                {item.subtitle}
              </div>
            </div>
          ))}
        </div>
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}