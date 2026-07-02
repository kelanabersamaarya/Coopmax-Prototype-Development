import { ArrowLeft } from "lucide-react";
import NewMBankingQrisLogo from "@/components/mobile/new-mbanking/NewMBankingQrisLogo";
import NewMBankingScanBottomActions from "@/components/mobile/new-mbanking/NewMBankingScanBottomActions";
import NewMBankingScanningAnimation from "@/components/mobile/new-mbanking/NewMBankingScanningAnimation";

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
        <NewMBankingScanningAnimation />

        <section className="absolute inset-x-0 bottom-0 z-10 h-[132px] rounded-t-[30px] bg-white px-6 pt-[24px]">
          <NewMBankingScanBottomActions />
        </section>
      </main>
    </div>
  );
}