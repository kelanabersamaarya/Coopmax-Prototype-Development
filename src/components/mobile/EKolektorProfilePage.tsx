"use client";

import { ArrowLeft, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

function ProfileInfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-[16px] bg-[#F6F8FC] px-4 py-4">
      <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#004FC7] text-white">
        <Icon className="h-[21px] w-[21px]" strokeWidth={2.7} />
      </span>

      <div className="min-w-0">
        <div className="text-[12px] font-semibold leading-tight tracking-tight text-[#8A8A8A]">
          {label}
        </div>
        <div className="mt-1 text-[15px] font-extrabold leading-snug tracking-tight text-[#203064]">
          {value}
        </div>
      </div>
    </div>
  );
}

export default function EKolektorProfilePage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[205px] overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
          <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
          <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-[22px] top-[54px] h-[74px] w-[74px] rounded-full bg-white/8" />

          <div className="relative z-10">
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
              aria-label="Kembali"
              title="Kembali"
            >
              <ArrowLeft className="h-[28px] w-[28px]" strokeWidth={2.7} />
            </button>

            <div className="mt-5 flex items-center gap-4">
              <div className="grid h-[70px] w-[70px] place-items-center rounded-full bg-white text-[30px] font-extrabold leading-none text-[#004FC7] shadow-sm">
                I
              </div>

              <div className="min-w-0">
                <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-white">
                  I Ketut Agus Pasek Jaya Arta
                </h1>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[12px] font-extrabold text-white ring-1 ring-white/20">
                  <span className="h-[8px] w-[8px] rounded-full bg-[#39b54a]" />
                  ONLINE
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 -mt-[24px] min-h-[calc(100%-181px)] rounded-t-[30px] bg-white px-6 pb-8 pt-7">
          <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Profil Kolektor
          </div>
          <div className="mt-1 text-[13px] font-normal leading-relaxed text-[#8A8A8A]">
            Informasi akun kolektor yang sedang digunakan.
          </div>

          <div className="mt-6 grid gap-3">
            <ProfileInfoRow
              icon={UserRound}
              label="Nama Lengkap"
              value="I Ketut Agus Pasek Jaya Arta"
            />
            <ProfileInfoRow
              icon={ShieldCheck}
              label="Role"
              value="Kolektor Lapangan"
            />
            <ProfileInfoRow
              icon={Phone}
              label="No. Handphone"
              value="0812 3456 7890"
            />
            <ProfileInfoRow
              icon={Mail}
              label="Email"
              value="kolektor@saktisolusi.co.id"
            />
            <ProfileInfoRow
              icon={MapPin}
              label="Wilayah"
              value="Denpasar, Bali"
            />
          </div>

          <div className="mt-6 rounded-[18px] bg-[#EEF5FF] px-4 py-4">
            <div className="text-[13px] font-extrabold text-[#004FC7]">
              Status Sinkronisasi
            </div>
            <div className="mt-1 text-[12px] font-normal leading-relaxed text-[#63809E]">
              Semua data transaksi hari ini sudah tersinkron dengan sistem pusat.
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className={cn(
              "mt-7 h-[43px] w-full rounded-[9px]",
              "bg-[#004FC7] text-[14px] font-semibold text-white",
              "shadow-[0_3px_8px_rgba(0,79,199,0.22)]",
              "transition hover:bg-[#0046B3] active:translate-y-px",
            )}
          >
            Kembali ke Beranda
          </button>
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}