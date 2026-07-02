import * as React from "react";
import { ArrowLeft, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NewMBankingLoginIdentityStepProps = {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  onRegister: () => void;
};

export default function NewMBankingLoginIdentityStep({
  value,
  onChange,
  onBack,
  onNext,
  onRegister,
}: NewMBankingLoginIdentityStepProps) {
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onNext();
  }

  const fieldClassName = cn(
    "h-[41px] w-full rounded-[9px] border border-[#CDD4E0] bg-white px-4",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#828282]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="relative h-[420px] shrink-0 overflow-hidden bg-[#F9F9F9] px-6 pt-8">
        <div className="flex h-10 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="-ml-1 inline-flex h-10 w-10 items-center justify-center bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
          </button>

          <h1 className="text-[16px] font-bold leading-tight text-black">
            Masuk
          </h1>
        </div>

        <div className="mt-[20px] text-center">
          <div className="mx-auto mb-[18px] flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EEF6FF]">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#479DF4] text-white">
              <UserRound className="h-[43px] w-[43px]" strokeWidth={2.6} />
            </div>
          </div>

          <h2 className="text-[16px] font-bold leading-tight text-black">
            Informasi Akun
          </h2>

          <p className="mx-auto mt-[10px] max-w-[345px] text-[12px] font-normal leading-[1.35] text-[#828282]">
            Untuk masuk ke M-Banking, mohon masukkan username atau nomor telepon
            yang sudah terdaftar.
          </p>

          <div className="mt-[20px] h-[14px] w-full overflow-hidden rounded-full bg-[#D8D8D8]">
            <div className="h-full w-1/2 rounded-full bg-[#479DF4]" />
          </div>

          <div className="mt-[10px] text-[10px] font-normal leading-none text-black">
            Langkah 1 dari 2
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-[68px] flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-white px-6 pb-[30px] pt-[30px]">
        <form
          onSubmit={submit}
          className="mx-auto flex min-h-full w-[345px] max-w-full flex-col justify-between"
        >
          <div className="grid gap-[15px]">
            <div className="grid gap-[9px]">
              <label className="text-[14px] font-bold leading-none text-black">
                Username / No. Telepon<span className="text-[#EF135D]">*</span>
              </label>
              <Input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className={fieldClassName}
                placeholder="Masukkan Username / No. Telepon"
                autoComplete="username"
              />
            </div>

            <button
              type="button"
              onClick={onRegister}
              className="mt-1 w-fit text-left text-[12px] font-normal leading-none text-[#479DF4]"
            >
              Belum punya akun? Daftar sekarang
            </button>
          </div>

          <div className="grid grid-cols-2 gap-[10px]">
            <button
              type="button"
              onClick={onBack}
              className={cn(
                "h-[46px] rounded-[10px] border-2 border-[#479DF4] bg-white",
                "text-[12px] font-normal leading-none text-[#479DF4]",
                "transition active:scale-[0.98]",
              )}
            >
              Kembali
            </button>

            <button
              type="submit"
              className={cn(
                "h-[46px] rounded-[10px] bg-[#479DF4]",
                "text-[12px] font-normal leading-none text-white",
                "transition active:scale-[0.98]",
              )}
            >
              Lanjut
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}