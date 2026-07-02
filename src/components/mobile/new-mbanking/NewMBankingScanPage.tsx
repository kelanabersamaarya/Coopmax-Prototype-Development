import { ArrowLeft } from "lucide-react";
import NewMBankingQrisLogo from "@/components/mobile/new-mbanking/NewMBankingQrisLogo";

type NewMBankingScanPageProps = {
  onBack: () => void;
};

export default function NewMBankingScanPage({
  onBack,
}: NewMBankingScanPageProps) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#FFFFFF] text-black">
      <header className="relative h-[92px] shrink-0 rounded-b-[30px] bg-[#F9F9F9] px-[31px] pt-[30px]">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-black transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.6} />
        </button>

        <div className="pointer-events-none absolute left-1/2 top-[38px] -translate-x-1/2">
          <NewMBankingQrisLogo />
        </div>
      </header>

      <main className="min-h-0 flex-1 bg-[#FFFFFF]" />
    </div>
  );
}