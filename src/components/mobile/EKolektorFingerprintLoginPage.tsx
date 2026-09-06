"use client";

import * as React from "react";
import { ArrowLeft, Fingerprint, Eye, EyeOff } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function EKolektorFingerprintLoginPage({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  React.useEffect(() => {
    if (!showConfirmation) return;

    const timer = window.setTimeout(() => {
      setShowConfirmation(false);
      setShowPassword(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [showConfirmation]);

  if (showPassword) {
    return (
      <div className="relative flex h-full min-h-0 flex-col bg-white">
        <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <header className="flex items-center gap-4 px-[26px] pb-[18px] pt-[28px]">
            <button
              type="button"
              onClick={() => setShowPassword(false)}
              className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]"
              aria-label="Kembali"
            >
              <ArrowLeft className="h-[26px] w-[26px]" strokeWidth={2.5} />
            </button>
            <h1 className="text-[20px] font-extrabold tracking-tight text-[#004FC7]">
              Aktivasi Login Biometrik
            </h1>
          </header>

          <main className="flex min-h-[calc(100%-74px)] flex-col px-[26px] pb-8 pt-[58px]">
            <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full bg-[#EAF2FF] text-[#004FC7]">
              <Fingerprint className="h-[56px] w-[56px]" strokeWidth={1.7} />
            </div>
            <h2 className="mt-[30px] text-center text-[22px] font-extrabold leading-tight tracking-tight text-[#203064]">
              Masukkan Password
            </h2>
            <p className="mt-3 text-center text-[14px] leading-relaxed text-[#777F91]">
              Masukkan password Anda untuk mengonfirmasi aktivasi login biometrik.
            </p>

            <label className="mt-8 text-[14px] font-semibold text-[#203064]" htmlFor="biometric-password">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="biometric-password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan password"
                className="h-[48px] w-full rounded-[9px] border border-[#D7DFED] bg-white px-4 pr-12 text-[14px] text-[#203064] outline-none transition placeholder:text-[#A1A8B5] focus:border-[#004FC7] focus:ring-2 focus:ring-[#004FC7]/10"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71809A]"
                aria-label={isPasswordVisible ? "Sembunyikan password" : "Tampilkan password"}
              >
                {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <button
              type="button"
              onClick={onContinue}
              disabled={!password.trim()}
              className="mt-auto h-[45px] w-full rounded-[9px] bg-[#004FC7] text-[14px] font-semibold text-white transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#AFC6E8]"
            >
              Aktifkan Login Biometrik
            </button>
          </main>
        </div>
        <EKolektorAndroidNavBar onBack={onBack} />
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="flex items-center gap-4 px-[26px] pb-[18px] pt-[28px]">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-[26px] w-[26px]" strokeWidth={2.5} />
          </button>
          <h1 className="text-[20px] font-extrabold tracking-tight text-[#004FC7]">
            Login dengan Biometrik
          </h1>
        </header>

        <main className="flex min-h-[calc(100%-74px)] flex-col items-center px-[26px] pb-8 pt-[58px] text-center">
          <div className="grid h-[116px] w-[116px] place-items-center rounded-full bg-[#EAF2FF] text-[#004FC7]">
            <Fingerprint className="h-[70px] w-[70px]" strokeWidth={1.7} />
          </div>
          <h2 className="mt-[32px] text-[22px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Aktifkan Login dengan Biometrik
          </h2>
          <p className="mt-[12px] max-w-[360px] text-[14px] leading-relaxed text-[#8C8C8C]">
            Sakti E-Collector memerlukan akses biometrik, seperti sidik jari atau pemindai wajah, untuk mengamankan akun dan memudahkan Anda masuk tanpa kata sandi. Data biometrik Anda tidak disimpan atau dibagikan kepada pihak ketiga.
          </p>
          <div className="mt-auto flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={() => setShowConfirmation(true)}
              className="h-[45px] w-full rounded-[9px] bg-[#004FC7] text-[14px] font-semibold text-white shadow-[0_3px_8px_rgba(0,79,199,0.22)] transition active:scale-[0.99]"
            >
              Aktifkan
            </button>
            <button
              type="button"
              onClick={onBack}
              className="h-[45px] w-full rounded-[9px] border border-[#A8A8A8] bg-white text-[14px] font-semibold text-[#777777] transition active:scale-[0.99]"
            >
              Batal
            </button>
          </div>
        </main>
      </div>
      <EKolektorAndroidNavBar onBack={onBack} />

      {showConfirmation && (
        <div className="absolute inset-0 z-20 flex items-end bg-[#10234A]/25">
          <button
            type="button"
            aria-label="Tutup konfirmasi"
            onClick={() => setShowConfirmation(false)}
            className="absolute inset-0 cursor-default"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="biometric-confirmation-title"
            className="relative w-full rounded-t-[24px] bg-white px-6 pb-7 pt-6 text-center shadow-[0_-8px_24px_rgba(32,48,100,0.12)]"
          >
            <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-[#D8E2F2]" />
            <h2 id="biometric-confirmation-title" className="text-[20px] font-extrabold leading-tight text-[#203064]">
              Konfirmasi Sidik Jari atau Wajah
            </h2>
            <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-relaxed text-[#777F91]">
              Sentuh sensor sidik jari atau arahkan wajah ke kamera depan
            </p>
            <div className="mx-auto mt-5 grid h-[92px] w-[92px] place-items-center rounded-full bg-[#EAF2FF] text-[#004FC7]">
              <Fingerprint className="h-[56px] w-[56px]" strokeWidth={1.7} />
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="mt-5 text-[14px] font-semibold text-[#004FC7] transition active:scale-[0.98]"
            >
              Batal
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
