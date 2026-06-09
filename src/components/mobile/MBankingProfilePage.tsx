"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import MBankingProfileHeader from "@/components/mobile/MBankingProfileHeader";
import MBankingBiometricToggle from "@/components/mobile/MBankingBiometricToggle";

const accountItems = [
  {
    label: "Ubah Kata Sandi",
    helper: "Ganti Kata Sandi Anda Disini",
    type: "link",
  },
  {
    label: "Ubah PIN",
    helper: "Ganti PIN Anda Disini",
    type: "link",
  },
  {
    label: "Login Biometrik",
    helper: "Aktifkan Login Biometrik Disini",
    type: "toggle",
  },
  {
    label: "Hapus Akun",
    helper: "Hapus Akun Anda Disini",
    type: "link",
  },
];

const generalItems = [
  {
    label: "Petunjuk Penggunaan",
    helper: "",
    type: "link",
  },
  {
    label: "Syarat dan Ketentuan",
    helper: "",
    type: "link",
  },
  {
    label: "Kebijakan Privasi",
    helper: "",
    type: "link",
  },
  {
    label: "Kontak Kami",
    helper: "",
    type: "link",
  },
];

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="px-[26px] pb-[10px] pt-[18px] text-[14px] font-extrabold uppercase leading-none tracking-tight text-[#8C8C8C]">
      {children}
    </div>
  );
}

function ProfileMenuRow({
  label,
  helper,
  type = "link",
  biometricEnabled,
  onBiometricChange,
}: {
  label: string;
  helper: string;
  type?: string;
  biometricEnabled?: boolean;
  onBiometricChange?: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="flex min-h-[58px] w-full items-center justify-between gap-4 border-b border-[#E8E8E8] bg-white px-[26px] py-[12px] text-left transition active:scale-[0.99]"
    >
      <span className="min-w-0">
        <span className="block text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
          {label}
        </span>
        {helper ? (
          <span className="mt-[5px] block text-[12px] font-extrabold leading-tight tracking-tight text-[#8C8C8C]">
            {helper}
          </span>
        ) : null}
      </span>

      {type === "toggle" ? (
        <MBankingBiometricToggle
          checked={!!biometricEnabled}
          onChange={(value) => onBiometricChange?.(value)}
        />
      ) : (
        <ChevronRight
          className="h-[22px] w-[22px] shrink-0 text-black"
          strokeWidth={2.6}
        />
      )}
    </button>
  );
}

export default function MBankingProfilePage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <MBankingProfileHeader onBack={onBack} />

        <div className="bg-white pb-8 pt-[22px]">
          <SectionTitle>AKUN</SectionTitle>
          <div className="bg-white">
            {accountItems.map((item) => (
              <ProfileMenuRow
                key={item.label}
                label={item.label}
                helper={item.helper}
                type={item.type}
                biometricEnabled={biometricEnabled}
                onBiometricChange={setBiometricEnabled}
              />
            ))}
          </div>

          <SectionTitle>UMUM</SectionTitle>
          <div className="bg-white">
            {generalItems.map((item) => (
              <ProfileMenuRow
                key={item.label}
                label={item.label}
                helper={item.helper}
                type={item.type}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-[#E8E8E8] px-[26px] py-[18px] text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
            <span>Pengaturan</span>
            <ChevronRight
              className="h-[22px] w-[22px] shrink-0 text-black"
              strokeWidth={2.6}
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-[#E8E8E8] px-[26px] py-[18px] text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
            <span>Version 3.5.14.160</span>
            <ChevronRight
              className="h-[22px] w-[22px] shrink-0 text-black"
              strokeWidth={2.6}
            />
          </div>

          <div className="border-t border-[#E8E8E8] px-[26px] pb-[18px] pt-[28px] text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Keluar
          </div>
        </div>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}