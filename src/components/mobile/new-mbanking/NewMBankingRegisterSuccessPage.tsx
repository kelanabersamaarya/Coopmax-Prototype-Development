import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type NewMBankingRegisterSuccessPageProps = {
  onContinue: () => void;
};

export default function NewMBankingRegisterSuccessPage({
  onContinue,
}: NewMBankingRegisterSuccessPageProps) {
  return (
    <div className="flex h-full min-h-full flex-col bg-[#F9F9F9] px-6 pb-[30px] pt-[42px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center">
        <section className="flex min-h-[365px] w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white px-7 py-9 text-center">
          <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#EAF7EF]">
            <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#33AA00]">
              <Check className="h-[36px] w-[36px] text-white" strokeWidth={3.5} />
            </div>
          </div>

          <h1 className="mt-[34px] max-w-[300px] text-[28px] font-bold leading-[1.18] tracking-[-0.04em] text-black">
            Pendaftaran M-Banking Berhasil Dilakukan
          </h1>

          <p className="mt-[25px] max-w-[305px] text-[18px] font-normal leading-[1.45] tracking-[-0.02em] text-[#828282]">
            Selamat, pendaftaran M-Banking Anda berhasil dilakukan. Silakan masuk
            untuk mulai menggunakan layanan M-Banking.
          </p>
        </section>
      </main>

      <button
        type="button"
        onClick={onContinue}
        className={cn(
          "h-[46px] w-full rounded-[10px] bg-[#479DF4]",
          "text-[12px] font-normal leading-none text-white",
          "transition active:scale-[0.98]",
        )}
      >
        Masuk
      </button>
    </div>
  );
}