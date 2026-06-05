"use client";

import * as React from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EKolektorLoginHeader from "@/components/mobile/EKolektorLoginHeader";

export default function EKolektorLoginForm({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberUsername, setRememberUsername] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim()) {
      toast("Username wajib diisi", {
        description: "Masukkan username terlebih dahulu.",
      });
      return;
    }

    if (!password.trim()) {
      toast("Password wajib diisi", {
        description: "Masukkan kata sandi terlebih dahulu.",
      });
      return;
    }

    if (rememberUsername) {
      localStorage.setItem("dyad.e-kolektor.username", username.trim());
    } else {
      localStorage.removeItem("dyad.e-kolektor.username");
    }

    onLogin();
  }

  React.useEffect(() => {
    const savedUsername = localStorage.getItem("dyad.e-kolektor.username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberUsername(true);
    }
  }, []);

  const inputClassName = cn(
    "h-[41px] w-full rounded-[9px] border-0 bg-[#F2F2F2] px-4",
    "text-[14px] font-normal text-black shadow-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9A9A]",
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const labelClassName = "text-[14px] font-normal leading-none text-[#B8B8B8]";

  return (
    <div className="h-full min-h-0 overflow-hidden bg-[#0754c9]">
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0754c9]">
        <EKolektorLoginHeader />

        <div className="relative z-30 -mt-[66px] flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[30px] bg-white px-7 pb-8 pt-[42px]">
          <div>
            <h1 className="max-w-[360px] text-[25px] font-extrabold leading-[1.15] tracking-tight text-black">
              Selamat Datang I Ketut Pasek Jaya Artha
            </h1>
            <p className="mt-3 text-[14px] font-normal leading-relaxed text-[#8a8a8a]">
              Halo, silakan masuk untuk melanjutkan
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 grid w-full gap-4">
            <div className="grid w-full gap-2">
              <label className={labelClassName}>Username</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={inputClassName}
                placeholder="Masukkan Username"
                autoComplete="username"
              />
            </div>

            <div className="grid w-full gap-2">
              <label className={labelClassName}>Password</label>
              <div className="relative w-full">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  className={cn(inputClassName, "pr-12")}
                  placeholder="Masukkan Kata Sandi Anda"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[9px] text-[#7B7B7B] transition hover:bg-black/5"
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
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <label className="mt-1 flex w-fit items-center gap-3 text-[14px] font-normal text-[#727272]">
              <button
                type="button"
                onClick={() => setRememberUsername((current) => !current)}
                className={cn(
                  "inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border",
                  rememberUsername
                    ? "border-[#004FC7] bg-white"
                    : "border-[#C9C9C9] bg-white",
                )}
                aria-pressed={rememberUsername}
                aria-label="Simpan Username"
              >
                {rememberUsername ? (
                  <Check className="h-4 w-4 text-[#004FC7]" strokeWidth={3.4} />
                ) : null}
              </button>
              Simpan Username
            </label>

            <button
              type="submit"
              className={cn(
                "mt-2 h-[41px] w-full rounded-[9px]",
                "bg-[#004FC7] text-[14px] font-semibold text-white",
                "shadow-[0_3px_8px_rgba(0,79,199,0.22)]",
                "transition hover:bg-[#0046B3] active:translate-y-px",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
              )}
            >
              Masuk
            </button>
          </form>

          <div className="mt-auto pt-6 text-center">
            <div className="text-[12px] font-normal leading-relaxed text-[#9A9A9A]">
              Powered by
            </div>
            <div className="mt-1 text-[13px] font-semibold leading-relaxed text-[#7A7A7A]">
              Solusi Sakti
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}