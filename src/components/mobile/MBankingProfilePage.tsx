"use client";

import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import MBankingProfileHeader from "@/components/mobile/MBankingProfileHeader";

const accountItems = [
  {
    label: "Ubah Kata Sandi",
    helper: "Ganti Kata Sandi Anda Disini",
  },
  {
    label: "Ubah PIN",
    helper: "Ganti PIN Anda Disini",
  },
  {
    label: "Login Biometrik",
    helper: "Aktifkan Login Biometrik Disini",
  },
  {
    label: "Hapus Akun",
    helper: "Hapus Akun Anda Disini",
  },
];

const generalItems = [
  {
    label: "Petunjuk Penggunaan",
    helper: "",
  },
  {
    label: "Syarat dan Ketentuan",
    helper: "",
  },
  {
    label: "Kebijakan Privasi",
    helper: "",
  },
  {
    label: "Kontak Kami",
    helper: "",
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
}: {
  label: string;
  helper: string;
}) {
  return (
    <button
      type="button"
      className="flex min-h-[58px] w-full flex-col items-start justify-center border-b border-[#E8E8E8] bg-white px-[26px] py-[12px] text-left transition active:scale-[0.99]"
    >
      <span className="text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
        {label}
      </span>
      {helper ? (
        <span className="mt-[5px] text-[12px] font-extrabold leading-tight tracking-tight text-[#8C8C8C]">
          {helper}
        </span>
      ) : null}
    </button>
  );
}

export default function MBankingProfilePage({
  onBack,
}: {
  onBack: () => void;
}) {
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
              />
            ))}
          </div>

          <div className="border-b border-[#E8E8E8] px-[26px] py-[18px] text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Pengaturan
          </div>

          <div className="border-b border-[#E8E8E8] px-[26px] py-[18px] text-[16px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Version 3.5.14.160
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