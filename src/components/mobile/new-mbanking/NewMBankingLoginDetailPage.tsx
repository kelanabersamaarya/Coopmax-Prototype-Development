import * as React from "react";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type NewMBankingLoginDetailPageProps = {
  onBack: () => void;
  onLogin: () => void;
};

export default function NewMBankingLoginDetailPage({
  onBack,
  onLogin,
}: NewMBankingLoginDetailPageProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberUsername, setRememberUsername] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin();
  }

  const fieldClassName = cn(
    "h-[41px] w-full rounded-[9px] border border-[#CDD4E0] bg-[#FFFFFF] px-4",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#828282]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const labelClassName = "text-[14px] font-bold leading-none text-black";
  const passwordIconClassName = "h-[22px] w-[22px] text-[#828282]";

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <section className="relative h-[302px] shrink-0 overflow-hidden bg-[#4ba2f5] px-[31px] pt-[30px] text-white">
        <div className="pointer-events-none absolute -left-[98px] -top-[150px] h-[300px] w-[300px] rounded-full bg-[#f56ac8]" />
        <div className="pointer-events-none absolute -left-[36px] -top-[162px] h-[220px] w-[220px] rounded-full bg-[#f044bd]" />

        <div className="pointer-events-none absolute -right-[76px] -top-[54px] h-[178px] w-[178px] rounded-full bg-[#8fc2f3]" />
        <div className="pointer-events-none absolute right-[-8px] top-[-18px] h-[88px] w-[88px] rounded-full bg-[#459cf0]" />

        <div className="pointer-events-none absolute -bottom-[118px] right-[-116px] h-[260px] w-[260px] rounded-full bg-[#8bdcec]" />
        <div className="pointer-events-none absolute -bottom-[88px] right-[-52px] h-[188px] w-[188px] rounded-full bg-[#65d0e8]" />

        <div className="pointer-events-none absolute -bottom-[92px] -left-[48px] h-[168px] w-[168px] rounded-full bg-[#a143ef]" />
        <div className="pointer-events-none absolute -bottom-[58px] -left-[22px] h-[98px] w-[98px] rounded-full bg-[#8c16ea]" />

        <div className="pointer-events-none absolute inset-0 bg-white/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.72))]" />

        <div className="relative z-10">
          <div className="flex h-10 items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-white transition active:scale-[0.98]"
              aria-label="Kembali"
              title="Kembali"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
            </button>

            <h1 className="text-[16px] font-bold leading-tight text-white">
              Masuk
            </h1>
          </div>

          <div className="mt-[58px] max-w-[340px]">
            <h2 className="text-[28px] font-bold leading-[1.12] tracking-[-0.04em] text-white">
              Selamat Datang Kembali
            </h2>
            <p className="mt-[14px] text-[14px] font-normal leading-relaxed tracking-[-0.01em] text-white/90">
              Silakan masuk untuk menikmati seluruh layananan M-Banking
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-[30px] flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-white px-6 pb-[30px] pt-[34px] shadow-[0_-14px_34px_rgba(15,23,42,0.06)]">
        <form
          onSubmit={submit}
          className="mx-auto flex min-h-full w-[345px] max-w-full flex-col justify-between"
        >
          <div className="grid gap-[15px]">
            <div className="grid gap-[9px]">
              <label className={labelClassName}>Username</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Masukkan Username"
                autoComplete="username"
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-[9px]">
              <label className={labelClassName}>Password</label>

              <div className="relative">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Kata Sandi"
                  autoComplete="current-password"
                  className={cn(fieldClassName, "pr-[48px]")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-[6px] top-1/2 inline-flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full text-[#828282] transition active:scale-[0.98]"
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                  title={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
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
              onClick={() => setRememberUsername((value) => !value)}
              className="mt-[1px] flex w-fit items-center gap-[10px] text-left"
              aria-pressed={rememberUsername}
            >
              <span
                className={cn(
                  "inline-flex h-[19px] w-[19px] items-center justify-center border-2",
                  rememberUsername
                    ? "border-[#479DF4] bg-white text-[#479DF4]"
                    : "border-[#CDD4E0] bg-white text-transparent",
                )}
              >
                <Check className="h-[15px] w-[15px]" strokeWidth={2.5} />
              </span>
              <span className="text-[12px] font-normal leading-none text-black">
                Simpan Username
              </span>
            </button>
          </div>

          <button
            type="submit"
            className={cn(
              "h-[46px] w-full rounded-[10px] bg-[#479DF4]",
              "text-[12px] font-normal leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Masuk
          </button>
        </form>
      </section>
    </div>
  );
}