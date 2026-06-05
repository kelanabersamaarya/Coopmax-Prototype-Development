"use client";

import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

const loanInfoItems = [
  {
    title: "Nasabah",
    subtitle: "Gaby",
  },
  {
    title: "No. Rekening Pinjaman",
    subtitle: "SMG260004",
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

export default function MBankingLoanDetailPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="shrink-0 bg-white px-6 pb-4 pt-8">
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

        <main className="bg-white px-6 pb-10 pt-3">
          <div className="grid gap-[22px]">
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
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}