import * as React from "react";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  ChevronRight,
  FileText,
  LogOut,
  MessageSquareText,
  Phone,
  Settings,
  ShieldCheck,
  UserCog,
  UserRound,
  Volume2,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingMemberCard from "@/components/mobile/new-mbanking/NewMBankingMemberCard";
import NewMBankingLogoutConfirmModal from "@/components/mobile/new-mbanking/NewMBankingLogoutConfirmModal";
import ProfileAccountPage from "@/components/mobile/new-mbanking/profile/ProfileAccountPage";
import ProfileAnnouncementPage from "@/components/mobile/new-mbanking/profile/ProfileAnnouncementPage";
import ProfileContactPage from "@/components/mobile/new-mbanking/profile/ProfileContactPage";
import ProfileFeedbackPage from "@/components/mobile/new-mbanking/profile/ProfileFeedbackPage";
import ProfileGuidePage from "@/components/mobile/new-mbanking/profile/ProfileGuidePage";
import ProfileMemberDuesPage from "@/components/mobile/new-mbanking/profile/ProfileMemberDuesPage";
import ProfileOrganizationPage from "@/components/mobile/new-mbanking/profile/ProfileOrganizationPage";
import ProfilePrivacyPage from "@/components/mobile/new-mbanking/profile/ProfilePrivacyPage";
import ProfileSettingsPage from "@/components/mobile/new-mbanking/profile/ProfileSettingsPage";
import ProfileTermsPage from "@/components/mobile/new-mbanking/profile/ProfileTermsPage";

type ProfileScreen =
  | "main"
  | "member-dues"
  | "announcement"
  | "organization"
  | "feedback"
  | "account"
  | "guide"
  | "terms"
  | "privacy"
  | "contact"
  | "settings";

const profileMenus: Array<{
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: "blue" | "green" | "red";
  screen: ProfileScreen;
}> = [
  {
    title: "Iuran Simpanan",
    icon: WalletCards,
    tone: "blue",
    screen: "member-dues",
  },
  {
    title: "Pengumuman",
    icon: Volume2,
    tone: "blue",
    screen: "announcement",
  },
  {
    title: "Struktur Organisasi",
    icon: Building2,
    tone: "green",
    screen: "organization",
  },
  {
    title: "Kritik dan Saran",
    icon: MessageSquareText,
    tone: "blue",
    screen: "feedback",
  },
  {
    title: "Akun",
    icon: UserCog,
    tone: "blue",
    screen: "account",
  },
  {
    title: "Petunjuk Penggunaan",
    icon: BookOpen,
    tone: "green",
    screen: "guide",
  },
  {
    title: "Syarat dan Ketentuan",
    icon: FileText,
    tone: "blue",
    screen: "terms",
  },
  {
    title: "Kebijakan Privasi",
    icon: ShieldCheck,
    tone: "green",
    screen: "privacy",
  },
  {
    title: "Kontak Kami",
    icon: Phone,
    tone: "blue",
    screen: "contact",
  },
  {
    title: "Pengaturan",
    icon: Settings,
    tone: "red",
    screen: "settings",
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

function LogoutMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mt-[18px] flex min-h-[58px] w-full items-center gap-4 rounded-[22px]",
        "bg-white px-[15px] py-[16px] text-left ring-1 ring-[#F8C8D0]",
        "transition active:scale-[0.99]",
      )}
    >
      <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[#DC3545] text-white">
        <LogOut className="h-[23px] w-[23px] text-white" strokeWidth={2.6} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-bold leading-tight text-[#DC3545]">
          Keluar
        </span>
      </span>

      <ChevronRight
        className="h-[22px] w-[22px] shrink-0 text-[#DC3545]"
        strokeWidth={2.6}
      />
    </button>
  );
}

export default function NewMBankingProfilePage({
  onBack,
  onHomeClick,
  onPortfolioClick,
  onHistoryClick,
  onQrisClick,
  onRequireLogin,
  onAccountDeleted,
}: {
  onBack: () => void;
  onHomeClick?: () => void;
  onPortfolioClick?: () => void;
  onHistoryClick?: () => void;
  onQrisClick?: () => void;
  onRequireLogin?: () => void;
  onAccountDeleted?: () => void;
}) {
  const [screen, setScreen] = React.useState<ProfileScreen>("main");
  const [logoutOpen, setLogoutOpen] = React.useState(false);

  function logout() {
    setLogoutOpen(false);

    if (onRequireLogin) {
      onRequireLogin();
      return;
    }

    onBack();
  }

  if (screen === "member-dues") {
    return <ProfileMemberDuesPage onBack={() => setScreen("main")} />;
  }

  if (screen === "announcement") {
    return <ProfileAnnouncementPage onBack={() => setScreen("main")} />;
  }

  if (screen === "organization") {
    return <ProfileOrganizationPage onBack={() => setScreen("main")} />;
  }

  if (screen === "feedback") {
    return <ProfileFeedbackPage onBack={() => setScreen("main")} />;
  }

  if (screen === "account") {
    return (
      <ProfileAccountPage
        onBack={() => setScreen("main")}
        onRequireLogin={onRequireLogin}
        onAccountDeleted={onAccountDeleted}
      />
    );
  }

  if (screen === "guide") {
    return <ProfileGuidePage onBack={() => setScreen("main")} />;
  }

  if (screen === "terms") {
    return <ProfileTermsPage onBack={() => setScreen("main")} />;
  }

  if (screen === "privacy") {
    return <ProfilePrivacyPage onBack={() => setScreen("main")} />;
  }

  if (screen === "contact") {
    return <ProfileContactPage onBack={() => setScreen("main")} />;
  }

  if (screen === "settings") {
    return <ProfileSettingsPage onBack={() => setScreen("main")} />;
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <NewMBankingLogoutConfirmModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onExit={logout}
      />

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
            <span className="grid h-[82px] w-[82px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
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
                onClick={() => setScreen(menu.screen)}
              />
            ))}
          </div>

          <LogoutMenuButton onClick={() => setLogoutOpen(true)} />
        </section>
      </main>

      <NewMBankingHomeMenuSection
        activeTab="profile"
        onHomeClick={onHomeClick ?? onBack}
        onPortfolioClick={onPortfolioClick}
        onQrisClick={onQrisClick}
        onHistoryClick={onHistoryClick}
        onProfileClick={() => {}}
      />
    </div>
  );
}