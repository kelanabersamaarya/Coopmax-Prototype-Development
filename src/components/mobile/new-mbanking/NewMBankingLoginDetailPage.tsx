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
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] text-black">
      <section className="shrink-0 bg-[#F9F9F9] px-[31px] pb-[102px] pt-[30px]">
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

      <section className="relative z-10 -mt-[68px] flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-white px-6 pb-[30px] pt-[30px]">
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