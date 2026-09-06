"use client";

import * as React from "react";
import { Check, Eye, EyeOff, Fingerprint } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EKolektorLoginHeader from "@/components/mobile/EKolektorLoginHeader";

export default function EKolektorLoginForm({
  onLogin,
  biometricEnabled = false,
}: {
  onLogin: () => void;
  biometricEnabled?: boolean;
}) {
  const [username, setUsername] = React.useState("");
  const [showBiometricPrompt, setShowBiometricPrompt] = React.useState(biometricEnabled);
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setShowBiometricPrompt(biometricEnabled);
  }, [biometricEnabled]);
  const [rememberUsername, setRememberUsername] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (rememberUsername && username.trim()) {
      localStorage.setItem("dyad.e-kolektor.username", username.trim());
    } else if (!rememberUsername) {
      localStorage.removeItem("dyad.e-kolektor.username");
    }

    toast.success("Masuk E-Kolektor (prototype)", {
      description: "Login berhasil tanpa perlu username dan password.",
    });

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
            {!rememberUsername ? (
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
            ) : null}

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
                  "inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border transition",
                  rememberUsername
                    ? "border-[#004FC7] bg-[#004FC7]"
                    : "border-[#C9C9C9] bg-white",
                )}
                aria-pressed={rememberUsername}
                aria-label="Simpan Username"
              >
                {rememberUsername ? (
                  <Check className="h-[15px] w-[15px] text-white" strokeWidth={3.4} />
                ) : null}
              </button>
              Simpan Username
            </label>

            <div className="mt-2 flex w-full gap-3">
              <button
                type="submit"
                className={cn(
                  "h-[41px] flex-1 rounded-[9px]",
                  "bg-[#004FC7] text-[14px] font-semibold text-white",
                  "shadow-[0_3px_8px_rgba(0,79,199,0.22)]",
                  "transition hover:bg-[#0046B3] active:translate-y-px",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
                )}
              >
                Masuk
              </button>
              {biometricEnabled ? (
                <button
                  type="button"
                  onClick={() => setShowBiometricPrompt(true)}
                  className="inline-flex h-[41px] w-[52px] shrink-0 items-center justify-center rounded-[9px] bg-[#004FC7] text-white shadow-[0_3px_8px_rgba(0,79,199,0.22)] transition active:translate-y-px"
                  aria-label="Login dengan Biometrik"
                >
                  <Fingerprint className="h-5 w-5" strokeWidth={2} />
                </button>
              ) : null}
            </div>
          </form>

          {showBiometricPrompt ? (
            <div className="absolute inset-0 z-40 flex items-end justify-center bg-[#10234A]/30 px-4 pb-6">
              <button
                type="button"
                aria-label="Tutup konfirmasi biometrik"
                onClick={() => setShowBiometricPrompt(false)}
                className="absolute inset-0 cursor-default"
              />
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="login-biometric-title"
                className="relative w-full max-w-[390px] rounded-[20px] bg-white px-6 pb-6 pt-6 text-center shadow-[0_12px_34px_rgba(32,48,100,0.28)]"
              >
                <div className="mx-auto grid h-[60px] w-[60px] place-items-center rounded-full bg-[#EAF2FF] text-[#004FC7]">
                  <Fingerprint className="h-[36px] w-[36px]" strokeWidth={1.7} />
                </div>
                <h2 id="login-biometric-title" className="mt-3 text-[17px] font-extrabold leading-tight text-[#203064]">
                  Login Dengan Biometrik
                </h2>
                <p className="mx-auto mt-2 text-[13px] leading-relaxed text-[#777F91]">
                  Gunakan sidik jari atau pemindai wajah untuk masuk.
                </p>
                <button
                  type="button"
                  onClick={() => setShowBiometricPrompt(false)}
                  className="mt-4 text-[13px] font-semibold text-[#004FC7] transition active:scale-[0.98]"
                >
                  Gunakan Password
                </button>
              </section>
            </div>
          ) : null}

          <div className="mt-auto pt-6 text-center">
            <div className="text-[11px] font-normal leading-relaxed text-[#9A9A9A]">
              <div>Dengan masuk, anda telah menyetujui</div>
              <div>Syarat Ketentuan dan Kebijakan Privasi</div>
              <div>Versi 1.5.9.105</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}