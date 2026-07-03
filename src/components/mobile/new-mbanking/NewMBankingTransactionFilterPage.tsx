import { ArrowLeft } from "lucide-react";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

export default function NewMBankingTransactionFilterPage({
  onBack,
}: {
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

          <h1 className="min-w-0 flex-1 truncate text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Filter Transaksi
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-hidden bg-[#F9F9F9]">
        <section className="min-h-full rounded-t-[30px] bg-white" />
      </main>
    </div>
  );
}