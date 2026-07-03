import * as React from "react";
import { ArrowLeft, ChevronRight, IdCard, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";
import NewMBankingMembershipPage from "@/components/mobile/new-mbanking/NewMBankingMembershipPage";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingMemberCard from "@/components/mobile/new-mbanking/NewMBankingMemberCard";

function ProfileMenuRow({
  icon: Icon,
  title,
  subtitle,
  onClick,
  tone = "blue",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  subtitle: string;
  onClick?: () => void;
  tone?: "blue" | "green" | "red";
}) {
  const iconClassName =
    tone === "green"
      ? "bg-[#E8F8EF] text-[#15965A]"
      : tone === "red"
        ? "bg-[#FCE4E7] text-[#DC3545]"
        : "bg-[#EEF6FF] text-[#479DF4]";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-[#EEF0F4] py-[16px] text-left transition active:scale-[0.99] last:border-b-0"
    >
      <span className={cn("grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full", iconClassName)}>
        <Icon className="h-[23px] w-[23px]" strokeWidth={2.6} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-bold leading-tight text-black">
          {title}
        </span>
        <span className="mt-[5px] block truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
          {subtitle}
        </span>
      </span>

      <ChevronRight className="h-[22px] w-[22px] shrink-0 text-black" strokeWidth={2.6} />
    </button>
  );
}

export default function NewMBankingProfilePage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [showMembership, setShowMembership] = React.useState(false);

  if (showMembership) {
    return <NewMBankingMembershipPage onBack={() => setShowMembership(false)} />;
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Profil
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[150px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[28px]">
          <div className="flex items-center gap-4">
            <span className="grid h-[82px] w-[82px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white shadow-[0_10px_24px_rgba(71,157,244,0.24)]">
              <UserRound className="h-[42px] w-[42px]" strokeWidth={2.4} />
            </span>

            <div className="min-w-0">
              <div className="truncate text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
                Laura Patel
              </div>
              <div className="mt-[6px] truncate text-[13px] font-normal leading-tight text-[#8F8F8F]">
                Anggota Koperasi
              </div>
              <div className="mt-[10px] inline-flex h-[26px] items-center rounded-full bg-[#E8F8EF] px-3 text-[11px] font-semibold text-[#15965A]">
                Terverifikasi
              </div>
            </div>
          </div>

          <NewMBankingMemberCard className="mt-[28px]" />

          <div className="mt-[24px] rounded-[22px] bg-white px-1 ring-1 ring-[#EEF0F4]">
            <ProfileMenuRow
              icon={IdCard}
              title="Keanggotaan"
              subtitle="Lihat kartu anggota versi penuh"
              onClick={() => setShowMembership(true)}
            />
            <ProfileMenuRow
              icon={ShieldCheck}
              title="Keamanan Akun"
              subtitle="Kelola keamanan akun M-Banking"
              tone="green"
            />
            <ProfileMenuRow
              icon={LogOut}
              title="Keluar"
              subtitle="Keluar dari aplikasi"
              tone="red"
            />
          </div>
        </section>
      </main>

      <NewMBankingHomeMenuSection
        activeTab="profile"
        onHomeClick={onBack}
        onProfileClick={() => {}}
      />
    </div>
  );
}