import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type NewMBankingRegisterSuccessPageProps = {
  onContinue: () => void;
};

export default function NewMBankingRegisterSuccessPage({
  onContinue,
}: NewMBankingRegisterSuccessPageProps) {
  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-[#4ba2f5] px-6 py-[30px] text-black">
      <div className="pointer-events-none absolute -left-[118px] -top-[190px] h-[400px] w-[400px] rounded-full bg-[#f56ac8]" />
      <div className="pointer-events-none absolute -left-[48px] -top-[215px] h-[300px] w-[300px] rounded-full bg-[#f044bd]" />

      <div className="pointer-events-none absolute -right-[90px] -top-[64px] h-[205px] w-[205px] rounded-full bg-[#8fc2f3]" />
      <div className="pointer-events-none absolute right-[-10px] top-[-25px] h-[104px] w-[104px] rounded-full bg-[#459cf0]" />

      <div className="pointer-events-none absolute -bottom-[194px] right-[-174px] h-[400px] w-[400px] rounded-full bg-[#8bdcec]" />
      <div className="pointer-events-none absolute -bottom-[171px] right-[-92px] h-[296px] w-[296px] rounded-full bg-[#65d0e8]" />

      <div className="pointer-events-none absolute -bottom-[112px] -left-[62px] h-[212px] w-[212px] rounded-full bg-[#a143ef]" />
      <div className="pointer-events-none absolute -bottom-[74px] -left-[31px] h-[126px] w-[126px] rounded-full bg-[#8c16ea]" />

      <div className="pointer-events-none absolute inset-0 bg-white/10" />

      <main className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
        <section className="flex w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-white/95 px-7 py-9 text-center shadow-[0_20px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/70 backdrop-blur">
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