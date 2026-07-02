import { ArrowLeft } from "lucide-react";
import NewMBankingQrisLogo from "@/components/mobile/new-mbanking/NewMBankingQrisLogo";
import NewMBankingScanBottomActions from "@/components/mobile/new-mbanking/NewMBankingScanBottomActions";

type NewMBankingScanPageProps = {
  onBack: () => void;
};

export default function NewMBankingScanPage({
  onBack,
}: NewMBankingScanPageProps) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#101010] text-black">
      <header className="relative z-20 h-[70px] shrink-0 overflow-hidden rounded-b-[20px] bg-[#F9F9F9] px-[31px]">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-[70px] w-10 items-center justify-center rounded-full bg-transparent text-black transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
        </button>

        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NewMBankingQrisLogo />
        </div>
      </header>

      <main className="relative min-h-0 flex-1 overflow-hidden bg-[#101010]">
        <div className="absolute inset-x-0 top-[34%] flex justify-center px-10">
          <div className="relative h-[190px] w-[190px] rounded-[18px] border border-white/25">
            <span className="absolute left-0 top-0 h-10 w-10 rounded-tl-[18px] border-l-[4px] border-t-[4px] border-white" />
            <span className="absolute right-0 top-0 h-10 w-10 rounded-tr-[18px] border-r-[4px] border-t-[4px] border-white" />
            <span className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-[18px] border-b-[4px] border-l-[4px] border-white" />
            <span className="absolute bottom-0 right-0 h-10 w-10 rounded-br-[18px] border-b-[4px] border-r-[4px] border-white" />
          </div>
        </div>

        <section className="absolute inset-x-0 bottom-0 z-10 h-[132px] rounded-t-[30px] bg-white px-6 pt-[24px]">
          <NewMBankingScanBottomActions />
        </section>
      </main>
    </div>
  );
}