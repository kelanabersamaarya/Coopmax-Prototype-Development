import * as React from "react";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Building2,
  ChevronRight,
  FileText,
  MessageSquareText,
  Phone,
  Settings,
  ShieldCheck,
  UserCog,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingMemberCard from "@/components/mobile/new-mbanking/NewMBankingMemberCard";

const profileMenus = [
  {
    title: "Pengumuman",
    icon: Bell,
    tone: "blue" as const,
  },
  {
    title: "Struktur Organisasi",
    icon: Building2,
    tone: "green" as const,
  },
  {
    title: "Kritik dan Saran",
    icon: MessageSquareText,
    tone: "blue" as const,
  },
  {
    title: "Akun",
    icon: UserCog,
    tone: "blue" as const,
  },
  {
    title: "Petunjuk Penggunaan",
    icon: BookOpen,
    tone: "green" as const,
  },
  {
    title: "Syarat dan Ketentuan",
    icon: FileText,
    tone: "blue" as const,
  },
  {
    title: "Kebijakan Privasi",
    icon: ShieldCheck,
    tone: "green" as const,
  },
  {
    title: "Kontak Kami",
    icon: Phone,
    tone: "blue" as const,
  },
  {
    title: "Pengaturan",
    icon: Settings,
    tone: "red" as const,
  },
];

function ProfileMenuRow({
  icon: Icon,
  title,
  onClick,
  tone = "blue",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  onClick?: () => void;
  tone?: "blue" | "green" | "red";
}) {
  const iconFrameClassName =
    tone === "green"
      ? "bg-[#15965A]"
      : tone === "red"
        ? "bg-[#DC3545]"
        : "bg-[#479DF4]";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-[#EEF0F4] px-[15px] py-[16px] text-left transition active:scale-[0.99] last:border-b-0"
    >
      <span
        className={cn(
          "grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full text-white",
          iconFrameClassName,
        )}
      >
        <Icon className="h-[23px] w-[23px] text-white" strokeWidth={2.6} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-bold leading-tight text-black">
          {title}
        </span>
      </span>

      <ChevronRight
        className="h-[22px] w-[22px] shrink-0 text-black"
        strokeWidth={2.6}
      />
    </button>
  );
}

export default function NewMBankingProfilePage({
  onBack,
}: {
  onBack: () => void;
}) {
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

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[184px] pt-[28px]">
          <div className="flex items-center gap-4">
            <span className="grid h-[82px] w-[82px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white shadow-[0_10px_24px_rgba(71,157,244,0.24)]">
              <UserRound className="h-[42px] w-[42px]" strokeWidth={2.4} />
            </span>

            <div className="min-w-0">
              <div className="truncate text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
                Laura Patel
              </div>
            </div>
          </div>

          <NewMBankingMemberCard className="mt-[28px]" />

          <div className="mt-[24px] rounded-[22px] bg-white ring-1 ring-[#EEF0F4]">
            {profileMenus.map((menu) => (
              <ProfileMenuRow
                key={menu.title}
                icon={menu.icon}
                title={menu.title}
                tone={menu.tone}
              />
            ))}
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