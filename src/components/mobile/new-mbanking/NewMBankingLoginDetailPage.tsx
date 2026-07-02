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
    "h-[54px] w-full rounded-[10px] border border-[#CDD4E0] bg-white px-4",
    "text-[15px] font-normal text-black shadow-none",
    "placeholder:text-[15px] placeholder:font-normal placeholder:text-[#828282]",
    "outline-none focus:border-[#479DF4]",
  );

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <section className="shrink-0 bg-[#F9F9F9] px-[31px] pb-[34px] pt-[30px]">
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
            Masuk
          </h1>
        </div>
      </section>

      <section className="relative z-10 flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-white px-[31px] pb-[32px] pt-[38px]">
        <div>
          <h2 className="text-[30px] font-bold leading-tight tracking-[-0.04em] text-black">
            Masuk
          </h2>
          <p className="mt-[9px] text-[15px] font-normal leading-relaxed tracking-[-0.02em] text-black/70">
            Silakan masuk menggunakan akun M-Banking Anda.
          </p>
        </div>

        <form onSubmit={submit} className="mt-[34px] grid gap-[18px]">
          <div className="grid gap-[8px]">
            <label className="text-[15px] font-semibold leading-none text-black">
              Username
            </label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Masukkan Username"
              autoComplete="username"
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-[8px]">
            <label className="text-[15px] font-semibold leading-none text-black">
              Password
            </label>

            <div className="relative">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Kata Sandi"
                autoComplete="current-password"
                className={cn(fieldClassName, "pr-[52px]")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-[9px] top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-black transition active:scale-[0.98]"
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
                title={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <Eye className="h-[23px] w-[23px]" strokeWidth={2.7} />
                ) : (
                  <EyeOff className="h-[23px] w-[23px]" strokeWidth={2.7} />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRememberUsername((value) => !value)}
            className="mt-[2px] flex w-fit items-center gap-[12px] text-left"
            aria-pressed={rememberUsername}
          >
            <span
              className={cn(
                "inline-flex h-[26px] w-[26px] items-center justify-center border-2",
                rememberUsername
                  ? "border-[#479DF4] bg-white text-[#479DF4]"
                  : "border-[#CDD4E0] bg-white text-transparent",
              )}
            >
              <Check className="h-[20px] w-[20px]" strokeWidth={2.2} />
            </span>
            <span className="text-[18px] font-normal leading-none text-black">
              Simpan Username
            </span>
          </button>

          <button
            type="submit"
            className={cn(
              "mt-[26px] h-[48px] w-full rounded-[10px] bg-[#479DF4]",
              "text-[13px] font-normal leading-none text-white",
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