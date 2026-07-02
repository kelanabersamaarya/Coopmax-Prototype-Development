import * as React from "react";
import { ArrowLeft, UserRound, Wifi } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NewMBankingLoginIdentityStepProps = {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  onRegister: () => void;
};

const cooperativeLogoSources = [
  "/logo koperasi_splash.png",
  "/logo koperasi_splash.jpg",
  "/logo koperasi_splash.jpeg",
  "/logo koperasi_splash.webp",
  "/logo koperasi_splash",
];

const djoinLogoSources = [
  "/logo djoin_splash.png",
  "/logo djoin_splash.jpg",
  "/logo djoin_splash.jpeg",
  "/logo djoin_splash.webp",
  "/logo djoin_splash",
];

export default function NewMBankingLoginIdentityStep({
  value,
  onChange,
  onBack,
  onNext,
  onRegister,
}: NewMBankingLoginIdentityStepProps) {
  const [logoSourceIndex, setLogoSourceIndex] = React.useState(0);
  const [showLogoFallback, setShowLogoFallback] = React.useState(false);
  const [djoinSourceIndex, setDjoinSourceIndex] = React.useState(0);
  const [showDjoinFallback, setShowDjoinFallback] = React.useState(false);

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
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-[#4ba2f5] text-black">
      <div className="absolute -left-[118px] -top-[190px] h-[400px] w-[400px] rounded-full bg-[#f56ac8]" />
      <div className="absolute -left-[48px] -top-[215px] h-[300px] w-[300px] rounded-full bg-[#f044bd]" />

      <div className="absolute -right-[90px] -top-[64px] h-[205px] w-[205px] rounded-full bg-[#8fc2f3]" />
      <div className="absolute right-[-10px] top-[-25px] h-[104px] w-[104px] rounded-full bg-[#459cf0]" />

      <div className="absolute -bottom-[194px] right-[-174px] h-[400px] w-[400px] rounded-full bg-[#8bdcec]" />
      <div className="absolute -bottom-[171px] right-[-92px] h-[296px] w-[296px] rounded-full bg-[#65d0e8]" />

      <div className="absolute -bottom-[112px] -left-[62px] h-[212px] w-[212px] rounded-full bg-[#a143ef]" />
      <div className="absolute -bottom-[74px] -left-[31px] h-[126px] w-[126px] rounded-full bg-[#8c16ea]" />

      <div className="relative z-10 flex h-full min-h-full flex-col">
        <header className="flex h-[76px] shrink-0 items-start justify-between px-[34px] pt-[29px] text-white">
          <div className="text-[28px] font-extrabold leading-none tracking-[-0.03em]">
            11:30
          </div>

          <div className="flex items-center gap-[13px]">
            <div className="flex h-5 items-end gap-[3px]" aria-hidden="true">
              <span className="h-[7px] w-[4px] rounded-full bg-white" />
              <span className="h-[10px] w-[4px] rounded-full bg-white" />
              <span className="h-[14px] w-[4px] rounded-full bg-white" />
              <span className="h-[18px] w-[4px] rounded-full bg-white" />
            </div>

            <Wifi className="h-[23px] w-[23px] text-white" strokeWidth={3.2} />

            <div className="relative h-[22px] w-[44px]" aria-hidden="true">
              <div className="absolute inset-y-[2px] left-0 w-[39px] rounded-[6px] border-[2px] border-white/90 bg-white/10">
                <div className="m-[2px] h-[12px] rounded-[3px] bg-white" />
              </div>
              <div className="absolute right-0 top-[7px] h-[8px] w-[3px] rounded-r-full bg-white/70" />
            </div>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-7 pb-[52px] pt-[8px]">
            <button
              type="button"
              onClick={onBack}
              className="absolute left-6 top-[92px] inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition active:scale-[0.98]"
              aria-label="Kembali"
              title="Kembali"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
            </button>

            <div className="flex animate-in items-center justify-center gap-[12px] fade-in-0 zoom-in-95 duration-700">
              <div className="relative h-[44px] w-[42px] shrink-0 overflow-hidden rounded-full bg-white shadow-[0_4px_12px_rgba(15,23,42,0.16)]">
                {showLogoFallback ? (
                  <div className="grid h-full w-full place-items-center text-[9px] font-extrabold text-[#0B63CE]">
                    KSP
                  </div>
                ) : (
                  <img
                    src={cooperativeLogoSources[logoSourceIndex]}
                    alt="Logo Koperasi"
                    className="h-full w-full object-cover"
                    draggable={false}
                    onError={() => {
                      const nextIndex = logoSourceIndex + 1;

                      if (nextIndex < cooperativeLogoSources.length) {
                        setLogoSourceIndex(nextIndex);
                        return;
                      }

                      setShowLogoFallback(true);
                    }}
                  />
                )}
              </div>

              <div className="whitespace-nowrap text-[31px] font-extrabold leading-none tracking-[-0.055em] text-white">
                M-Banking Koperasi
              </div>
            </div>

            <div className="mt-[35px] flex h-[54px] animate-in items-center justify-center rounded-[16px] bg-white px-[24px] text-[#121826] shadow-[0_8px_22px_rgba(15,23,42,0.12)] fade-in-0 slide-in-from-bottom-2 duration-700 [animation-delay:140ms] [animation-fill-mode:both]">
              {showDjoinFallback ? (
                <span className="text-[19px] font-semibold leading-none tracking-[-0.02em]">
                  By Djoin
                </span>
              ) : (
                <img
                  src={djoinLogoSources[djoinSourceIndex]}
                  alt="By Djoin"
                  className="h-[27px] w-[92px] object-contain"
                  draggable={false}
                  onError={() => {
                    const nextIndex = djoinSourceIndex + 1;

                    if (nextIndex < djoinLogoSources.length) {
                      setDjoinSourceIndex(nextIndex);
                      return;
                    }

                    setShowDjoinFallback(true);
                  }}
                />
              )}
            </div>
          </div>

          <div className="relative z-20 rounded-t-[34px] bg-white px-6 pb-[30px] pt-[30px] shadow-[0_-14px_35px_rgba(15,23,42,0.10)]">
            <form
              onSubmit={submit}
              className="mx-auto flex min-h-[255px] w-[345px] max-w-full flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#EEF6FF] text-[#479DF4]">
                    <UserRound className="h-[27px] w-[27px]" strokeWidth={2.6} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-[20px] font-bold leading-tight text-black">
                      Masuk
                    </h2>
                    <p className="mt-1 text-[12px] font-normal leading-snug text-[#828282]">
                      Masukkan akun M-Banking Anda untuk melanjutkan.
                    </p>
                  </div>
                </div>

                <div className="mt-[24px] grid gap-[9px]">
                  <label className="text-[14px] font-bold leading-none text-black">
                    Username / No. Telepon
                    <span className="text-[#EF135D]">*</span>
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
        </main>
      </div>
    </div>
  );
}