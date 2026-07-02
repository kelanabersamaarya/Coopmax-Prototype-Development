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
    "h-[45px] w-full rounded-[11px] border border-[#CDD4E0] bg-white px-4",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9A9A]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="relative h-[415px] shrink-0 overflow-hidden bg-[#f6f7fb]">
        <img
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85"
          alt="M-Banking Koperasi"
          className="h-full w-full object-cover"
          draggable={false}
        />

        <div className="absolute inset-0 bg-black/5" />

        <div className="absolute -bottom-[70px] -left-[74px] h-[172px] w-[252px] rounded-[999px] bg-[#F35FC5]" />

        <div className="absolute left-6 top-8 z-10 flex h-10 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-black shadow-sm transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
          </button>

          <h1 className="rounded-full bg-white/85 px-4 py-2 text-[16px] font-bold leading-tight text-black shadow-sm">
            Masuk
          </h1>
        </div>
      </div>

      <div className="relative z-10 -mt-[34px] flex min-h-0 flex-1 flex-col rounded-t-[34px] bg-white px-6 pb-[30px] pt-[34px] shadow-[0_-14px_35px_rgba(15,23,42,0.08)]">
        <form
          onSubmit={submit}
          className="mx-auto flex min-h-full w-[345px] max-w-full flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#EEF6FF] text-[#479DF4]">
                <UserRound className="h-[27px] w-[27px]" strokeWidth={2.6} />
              </div>

              <div className="min-w-0">
                <h2 className="text-[20px] font-bold leading-tight text-black">
                  Selamat Datang
                </h2>
                <p className="mt-1 text-[12px] font-normal leading-snug text-[#828282]">
                  Masukkan akun M-Banking Anda untuk melanjutkan.
                </p>
              </div>
            </div>

            <div className="mt-[30px] grid gap-[9px]">
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
              className="mt-[14px] w-fit text-left text-[12px] font-normal leading-none text-[#479DF4]"
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