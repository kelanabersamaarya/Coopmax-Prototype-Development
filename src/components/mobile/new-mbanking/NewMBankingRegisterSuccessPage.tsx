import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type NewMBankingRegisterSuccessPageProps = {
  onContinue: () => void;
};

export default function NewMBankingRegisterSuccessPage({
  onContinue,
}: NewMBankingRegisterSuccessPageProps) {
  return (
    <div className="flex h-full min-h-full flex-col bg-[#F9F9F9] px-6 py-[30px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center">
        <section className="flex w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white px-7 py-9 text-center">
          <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EEF6FF]">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#479FFE] text-white">
              <Check className="h-[54px] w-[54px]" strokeWidth={3.8} />
            </div>
          </div>

          <h1 className="mt-[30px] max-w-[300px] text-[18px] font-bold leading-[1.25] tracking-[-0.025em] text-black">
            Pendaftaran M-Banking Berhasil Dilakukan
          </h1>

          <p className="mt-[18px] max-w-[305px] text-[14px] font-normal leading-[1.45] tracking-[-0.01em] text-[#828282]">
            Selamat, pendaftaran M-Banking Anda berhasil. Silakan masuk untuk
            mulai menggunakan layanan M-Banking.
          </p>

          <button
            type="button"
            onClick={onContinue}
            className={cn(
              "mt-[30px] h-[46px] w-full rounded-[10px] bg-[#479DF4]",
              "text-[12px] font-normal leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Masuk
          </button>
        </section>
      </main>
    </div>
  );
}