"use client";

import { Fingerprint } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function EKolektorBiometricAccessPage({
  onCancel,
  onAgree,
}: {
  onCancel: () => void;
  onAgree: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-[34px] pb-[92px] pt-8 text-center">
        <Fingerprint
          className="h-[70px] w-[70px] text-[#2196D3]"
          strokeWidth={1.8}
        />

        <h1 className="mt-[28px] text-[30px] font-extrabold leading-tight tracking-tight text-[#203064]">
          Akses Biometric
        </h1>

        <p className="mt-[32px] max-w-[390px] text-[20px] font-normal leading-[1.28] text-[#203064]">
          Sakti M-Banking memerlukan akses ke fitur biometrik, seperti sidik jari
          atau pemindai wajah, untuk mengamankan akun Anda. Dengan menggunakan
          metode ini, Anda dapat dengan mudah dan aman mengakses aplikasi tanpa
          perlu memasukkan kata sandi setiap kali. Data biometrik Anda tidak akan
          disimpan atau dibagikan kepada pihak ketiga.
        </p>
      </main>

      <div className="absolute inset-x-0 bottom-[34px] flex items-center justify-between px-[46px]">
        <button
          type="button"
          onClick={onCancel}
          className="text-[20px] font-normal text-[#2898D1] transition active:scale-[0.98]"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={onAgree}
          className="text-[20px] font-normal text-[#2898D1] transition active:scale-[0.98]"
        >
          Setuju
        </button>
      </div>

      <EKolektorAndroidNavBar onBack={onCancel} />
    </div>
  );
}
