import { ArrowLeft, HandCoins } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

type InstallmentHistoryItem = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  status: "Berhasil";
};

const histories: InstallmentHistoryItem[] = [
  {
    id: "history-1",
    title: "Angsuran Pinjaman",
    subtitle: "SMG260004 • Angsuran Ke-1",
    amount: "-Rp. 991.666,00",
    date: "20 Juni 2026",
    status: "Berhasil",
  },
  {
    id: "history-2",
    title: "Angsuran Pinjaman",
    subtitle: "SMG260004 • Angsuran Ke-2",
    amount: "-Rp. 991.666,00",
    date: "18 Juli 2026",
    status: "Berhasil",
  },
];

function HistoryIcon() {
  return (
    <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
      <HandCoins className="h-[22px] w-[22px] text-white" strokeWidth={2.6} />
    </span>
  );
}

function HistoryRow({ item }: { item: InstallmentHistoryItem }) {
  return (
    <div className="flex items-start justify-between gap-4 py-[14px]">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <HistoryIcon />

        <div className="min-w-0 pt-[2px]">
          <div className="truncate text-[15px] font-bold leading-tight tracking-[-0.02em] text-black">
            {item.title}
          </div>
          <div className="mt-[6px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
            {item.subtitle}
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-[2px] text-right">
        <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#D12C3B]">
          {item.amount}
        </div>

        <div className="mt-[9px] inline-flex h-[24px] items-center rounded-full bg-[#E8F8EF] px-[11px] text-[11px] font-semibold leading-none text-[#15965A]">
          {item.status}
        </div>
      </div>
    </div>
  );
}

export default function NewMBankingLoanInstallmentHistoryPage({
  accountNo,
  onBack,
}: {
  accountNo: string;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Riwayat Angsuran
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[24px]">
          <div className="text-[14px] font-normal leading-tight text-[#8F8F8F]">
            No. Pinjaman
          </div>
          <div className="mt-[6px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
            {accountNo}
          </div>

          <div className="mt-[24px] flex items-center gap-3">
            <div className="shrink-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
              Juni 2026
            </div>
            <div className="h-px min-w-0 flex-1 bg-[#E5E7EB]" />
          </div>

          <div className="mt-[8px] divide-y divide-[#EEF0F4]">
            {histories.map((item) => (
              <HistoryRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}