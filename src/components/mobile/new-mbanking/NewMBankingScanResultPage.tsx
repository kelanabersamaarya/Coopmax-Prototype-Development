import { ArrowLeft } from "lucide-react";

type NewMBankingScanResultPageProps = {
  onBack: () => void;
};

export default function NewMBankingScanResultPage({
  onBack,
}: NewMBankingScanResultPageProps) {
  return (
    <div className="h-full min-h-full bg-[#F9F9F9] text-black">
      <header className="flex h-[92px] items-center gap-3 px-[31px] pt-[22px]">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-black transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
        </button>

        <h1 className="text-[16px] font-bold leading-tight text-black">
          Pembayaran QRIS
        </h1>
      </header>
    </div>
  );
}