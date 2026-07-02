import { ArrowLeft } from "lucide-react";

type NewMBankingScanPageProps = {
  onBack: () => void;
};

export default function NewMBankingScanPage({
  onBack,
}: NewMBankingScanPageProps) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <header className="shrink-0 bg-[#F9F9F9] px-[31px] pb-[34px] pt-[30px]">
        <div className="flex h-10 items-center gap-3">
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
            Scan
          </h1>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 items-center justify-center bg-white px-6">
        <div className="text-[14px] font-normal text-[#828282]">
          Halaman scan
        </div>
      </main>
    </div>
  );
}