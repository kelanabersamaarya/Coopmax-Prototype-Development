"use client";

import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import MBankingProfileHeader from "@/components/mobile/MBankingProfileHeader";

const profileItems = [
  {
    label: "Ubah Kata Sandi",
    helper: "Ganti kata sandi Anda di sini",
  },
  {
    label: "Syarat dan Ketentuan",
    helper: "Informasi penggunaan layanan M-Banking",
  },
  {
    label: "Kebijakan Privasi",
    helper: "Ketahui bagaimana data Anda dikelola",
  },
  {
    label: "Kontak Kami",
    helper: "Hubungi koperasi untuk bantuan",
  },
];

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
      <span className="mt-[5px] text-[12px] font-extrabold leading-tight tracking-tight text-[#8C8C8C]">
        {helper}
      </span>
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
          <div className="px-[26px] pb-[10px] pt-[18px] text-[14px] font-extrabold uppercase leading-none tracking-tight text-[#8C8C8C]">
            Akun
          </div>

          <div className="bg-white">
            {profileItems.map((item) => (
              <ProfileMenuRow
                key={item.label}
                label={item.label}
                helper={item.helper}
              />
            ))}
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