"use client";

import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import MBankingLoanAmountInfo from "@/components/mobile/MBankingLoanAmountInfo";
import MBankingLoanInstallmentSummary from "@/components/mobile/MBankingLoanInstallmentSummary";
import MBankingLoanTransactionHistory from "@/components/mobile/MBankingLoanTransactionHistory";
import MBankingStickyActionButton from "@/components/mobile/MBankingStickyActionButton";
import MBankingTransactionDateRange from "@/components/mobile/MBankingTransactionDateRange";

const loanInfoItems = [
  {
    label: "No. Pinjaman",
    value: "SMG260004",
  },
  {
    label: "Produk",
    value: "Pinjaman Billing",
  },
  {
    label: "Skema Tagihan",
    value: "Tagihan Sesuai Jadwal Angsuran",
  },
  {
    label: "Satuan Grace Period",
    value: "Bulan",
  },
  {
    label: "Durasi Grace Period",
    value: "3",
  },
  {
    label: "Tanggal Pencairan",
    value: "01-03-2026",
  },
  {
    label: "Jangka Waktu",
    value: "12 Bulan",
  },
  {
    label: "Jatuh Tempo",
    value: "16-03-2027",
  },
  {
    label: "Bunga",
    value: "10,00%",
  },
];

function LoanInfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3">
      <div className="text-[14px] font-extrabold leading-[1.15] tracking-tight text-[#203064]">
        {label}
      </div>

      <div className="text-right text-[14px] font-normal leading-[1.15] tracking-tight text-black">
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
        <header className="shrink-0 bg-white px-6 pb-3 pt-8">
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
          <div className="grid gap-[18px]">
            {loanInfoItems.map((item) => (
              <LoanInfoRow
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>

          <MBankingLoanAmountInfo />

          <MBankingTransactionDateRange
            className="mt-5"
            containerClassName="bg-[#F2F2F2] shadow-sm"
          />

          <h2 className="mt-6 text-[18px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Tagihan Angsuran
          </h2>

          <MBankingLoanInstallmentSummary />

          <MBankingLoanTransactionHistory />
        </main>
      </div>

      <MBankingStickyActionButton
        label="Bayar Angsuran"
        onClick={() =>
          toast.success("Bayar Angsuran (prototype)", {
            description: "Aksi pembayaran belum dihubungkan.",
          })
        }
      />

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}