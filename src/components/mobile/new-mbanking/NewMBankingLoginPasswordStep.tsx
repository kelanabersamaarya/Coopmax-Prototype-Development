import * as React from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NewMBankingLoginPasswordStepProps = {
  username: string;
  password: string;
  onPasswordChange: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export default function NewMBankingLoginPasswordStep({
  username,
  password,
  onPasswordChange,
  onBack,
  onSubmit,
}: NewMBankingLoginPasswordStepProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  const fieldClassName = cn(
    "h-[41px] w-full rounded-[9px] border border-[#CDD4E0] bg-white px-4 pr-[48px]",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#828282]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const passwordIconClassName = "h-[22px] w-[22px] text-[#828282]";

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

        <div className="mt-[26px] text-center">
          <div className="mx-auto mb-[18px] flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EEF6FF]">
            <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#479DF4] text-white">
              <LockKeyhole className="h-[42px] w-[42px]" strokeWidth={2.6} />
            </div>
          </div>

          <h2 className="mx-auto max-w-[310px] text-[18px] font-bold leading-tight text-black">
            Masukkan Kata Sandi
          </h2>

          <p className="mx-auto mt-[12px] max-w-[345px] text-[12px] font-normal leading-[1.4] text-[#828282]">
            Halo {username || "Pengguna"}, masukkan kata sandi akun M-Banking
            Anda untuk masuk.
          </p>

          <div className="mt-[24px] h-[14px] w-full overflow-hidden rounded-full bg-[#D8D8D8]">
            <div className="h-full w-full rounded-full bg-[#479DF4]" />
          </div>

          <div className="mt-[10px] text-[10px] font-normal leading-none text-black">
            Langkah 2 dari 2
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
                Kata Sandi<span className="text-[#EF135D]">*</span>
              </label>

              <div className="relative">
                <Input
                  value={password}
                  onChange={(event) => onPasswordChange(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  className={fieldClassName}
                  placeholder="Masukkan Kata Sandi Anda"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-[6px] top-1/2 inline-flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full text-[#828282] transition active:scale-[0.98]"
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                  title={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  {showPassword ? (
                    <Eye className={passwordIconClassName} strokeWidth={2.8} />
                  ) : (
                    <EyeOff className={passwordIconClassName} strokeWidth={2.8} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="mt-1 w-fit text-left text-[12px] font-normal leading-none text-[#479DF4]"
            >
              Lupa kata sandi?
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
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}