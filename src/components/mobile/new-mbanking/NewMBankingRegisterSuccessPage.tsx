import { cn } from "@/lib/utils";

type NewMBankingRegisterSuccessPageProps = {
  onContinue: () => void;
};

export default function NewMBankingRegisterSuccessPage({
  onContinue,
}: NewMBankingRegisterSuccessPageProps) {
  return (
    <div className="flex h-full min-h-full flex-col bg-white px-6 pb-[30px] pt-[42px] text-black">
      <main className="flex min-h-0 flex-1 items-center justify-center">
        <section className="flex min-h-[315px] w-full max-w-[345px] flex-col items-center justify-center rounded-[24px] bg-[#F9F9F9] px-6 py-8 text-center">
          <h1 className="max-w-[300px] text-[30px] font-bold leading-[1.18] tracking-[-0.04em] text-black">
            Pendaftaran M-Banking Berhasil Dilakukan
          </h1>

          <p className="mt-[45px] max-w-[305px] text-[24px] font-normal leading-[1.35] tracking-[-0.03em] text-black">
            Selamat, pendaftaran M-Banking Anda berhasil dilakukan.
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