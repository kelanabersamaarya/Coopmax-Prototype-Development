"use client";

import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

const loanInfoItems = [
  {
    label: "Produk Pinjaman",
    value: "Pinjaman Bulanan",
  },
  {
    label: "Skema Tagihan",
    value: "Tagihan Sesuai Jadwal Angsuran",
  },
  {
    label: "Tanggal Realisasi",
    value: "01-03-2026",
  },
  {
    label: "Tanggal Jatuh Tempo",
    value: "16-03-2027",
  },
  {
    label: "Bunga Per Tahun",
    value: "10,00%",
  },
  {
    label: "Metode Bunga",
    value: "Bunga Efektif",
  },
  {
    label: "Plafond",
    value: "10.000.000,00",
  },
  {
    label: "Sisa Pokok Pinjaman",
    value: "9.116.000,00",
  },
  {
    label: "Satuan Grace Period",
    value: "Bulan",
  },
  {
    label: "Durasi Grace Period",
    value: "3",
  },
];

function DetailInfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#E8E8E8] py-[15px]">
      <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
        {label}
      </div>
      <div className="mt-[8px] text-[16px] font-extrabold leading-tight tracking-tight text-[#23305A]">
        {value}
      </div>
    </div>
  );
}

export default function MBankingLoanDetailPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="shrink-0 bg-white px-6 pb-6 pt-8">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
          </button>

          <h1 className="mt-5 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
            Pinjaman
          </h1>
        </header>

        <main className="bg-white px-6 pb-8 pt-1">
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

          <section className="pt-[28px]">
            <h2 className="text-[20px] font-extrabold leading-tight tracking-tight text-[#203064]">
              Informasi Pinjaman
            </h2>

            <div className="mt-3">
              {loanInfoItems.map((item) => (
                <DetailInfoItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}