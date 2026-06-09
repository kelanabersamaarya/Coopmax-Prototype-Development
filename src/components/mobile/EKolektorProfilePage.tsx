"use client";

import { Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorProfileHeader from "@/components/mobile/EKolektorProfileHeader";

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
      <span className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#2DB6DD] text-white">
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
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <EKolektorProfileHeader onBack={onBack} />

        <main className="bg-white px-6 pb-8 pt-2">
          <div className="mt-5 grid gap-3">
            <ProfileInfoRow
              icon={UserRound}
              label="Nama Lengkap"
              value="Andrew Rodriguez"
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
              value="andrew@saktisolusi.co.id"
            />
            <ProfileInfoRow
              icon={MapPin}
              label="Wilayah"
              value="Denpasar, Bali"
            />
          </div>

          <div className="mt-6 rounded-[18px] bg-[#EEF8FC] px-4 py-4">
            <div className="text-[13px] font-extrabold text-[#28B7DD]">
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
              "bg-[#2DB6DD] text-[14px] font-semibold text-white",
              "shadow-[0_3px_8px_rgba(45,182,221,0.22)]",
              "transition hover:bg-[#25a8cc] active:translate-y-px",
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