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

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <img
        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
        alt="Background login"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 bg-white/22 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.92)_0_18%,transparent_34%),radial-gradient(circle_at_74%_42%,rgba(255,255,255,0.94)_0_18%,transparent_34%),radial-gradient(circle_at_42%_72%,rgba(255,255,255,0.92)_0_20%,transparent_38%)]" />

      <div className="relative z-10 flex h-full min-h-full flex-col px-[31px] pb-[32px] pt-[30px]">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-black backdrop-blur-sm transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
        </button>

        <div className="mt-[86px]">
          <h1 className="text-[30px] font-bold leading-tight tracking-[-0.04em] text-black">
            Masuk
          </h1>
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
              className={cn(
                "h-[54px] w-full rounded-[10px] border border-[#CDD4E0] bg-white/90 px-4",
                "text-[15px] font-normal text-black shadow-none backdrop-blur-sm",
                "placeholder:text-[15px] placeholder:font-normal placeholder:text-[#828282]",
                "outline-none focus:border-[#479DF4]",
              )}
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
                className={cn(
                  "h-[54px] w-full rounded-[10px] border border-[#CDD4E0] bg-white/90 px-4 pr-[52px]",
                  "text-[15px] font-normal text-black shadow-none backdrop-blur-sm",
                  "placeholder:text-[15px] placeholder:font-normal placeholder:text-[#828282]",
                  "outline-none focus:border-[#479DF4]",
                )}
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
                  ? "border-[#479DF4] bg-white/80 text-[#479DF4]"
                  : "border-[#CDD4E0] bg-white/80 text-transparent",
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
      </div>
    </div>
  );
}