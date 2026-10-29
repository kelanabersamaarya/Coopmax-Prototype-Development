"use client";

import * as React from "react";
import MBankingAllBanners from "@/components/mobile/MBankingAllBanners";
import MBankingBannerDetail from "@/components/mobile/MBankingBannerDetail";
import MBankingBottomNav from "@/components/mobile/MBankingBottomNav";
import MBankingHomeBanner from "@/components/mobile/MBankingHomeBanner";
import MBankingHomeHeader from "@/components/mobile/MBankingHomeHeader";
import MBankingInfoPage from "@/components/mobile/MBankingInfoPage";
import MBankingNotificationsPage from "@/components/mobile/MBankingNotificationsPage";
import MBankingLoanPage from "@/components/mobile/MBankingLoanPage";
import MBankingLoanPasswordPage from "@/components/mobile/MBankingLoanPasswordPage";
import MBankingProfilePage from "@/components/mobile/MBankingProfilePage";
import MBankingQuickActions from "@/components/mobile/MBankingQuickActions";
import MBankingSavingsCard from "@/components/mobile/MBankingSavingsCard";
import MBankingSavingsPage from "@/components/mobile/MBankingSavingsPage";
import MBankingTransactionHistoryEmpty from "@/components/mobile/MBankingTransactionHistoryEmpty";
import MBankingExitConfirmModal from "@/components/mobile/MBankingExitConfirmModal";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

type MBankingHomeScreen = "home" | "info" | "loan" | "profile" | "savings";

export default function MBankingHome({
  onLogout,
  transactions = [],
  onTransactionSaved,
}: {
  onLogout?: () => void;
  transactions?: MBankingTransactionHistoryEntry[];
  onTransactionSaved?: (transaction: MBankingTransactionHistoryEntry) => void;
}) {
  const [screen, setScreen] = React.useState<MBankingHomeScreen>("home");
  const [savingsPinOpen, setSavingsPinOpen] = React.useState(false);
  const [exitOpen, setExitOpen] = React.useState(false);
  const [bannerDetailOpen, setBannerDetailOpen] = React.useState(false);
  const [allBannersOpen, setAllBannersOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [selectedBanner, setSelectedBanner] = React.useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [bannerReturn, setBannerReturn] = React.useState<"home" | "notifications">("home");

  if (notificationsOpen) {
    return (
      <MBankingNotificationsPage
        initialTab={bannerReturn === "notifications" ? "info" : "transfer"}
        onBack={() => {
          setNotificationsOpen(false);
          setBannerReturn("home");
        }}
        onBannerClick={(banner) => {
          setNotificationsOpen(false);
          setBannerReturn("notifications");
          setSelectedBanner(banner);
        }}
      />
    );
  }

  if (selectedBanner) {
    return (
      <MBankingBannerDetail
        bannerSrc={selectedBanner.src}
        bannerTitle={selectedBanner.alt}
        onBack={() => {
          setSelectedBanner(null);
          if (bannerReturn === "notifications") setNotificationsOpen(true);
        }}
      />
    );
  }

  if (allBannersOpen) {
    return (
      <MBankingAllBanners
        onBack={() => setAllBannersOpen(false)}
        onBannerClick={(banner) => {
          setBannerReturn("home");
          setSelectedBanner(banner);
        }}
      />
    );
  }

  if (bannerDetailOpen) {
    return <MBankingBannerDetail onBack={() => setBannerDetailOpen(false)} />;
  }

  if (screen === "profile") {
    return <MBankingProfilePage onBack={() => setScreen("home")} />;
  }

  if (savingsPinOpen) {
    return (
      <MBankingLoanPasswordPage
        onBack={() => setSavingsPinOpen(false)}
        onSuccess={() => {
          setSavingsPinOpen(false);
          setScreen("savings");
        }}
      />
    );
  }

  if (screen === "savings") {
    return <MBankingSavingsPage onBack={() => setScreen("info")} />;
  }

  if (screen === "loan") {
    return (
      <MBankingLoanPage
        transactions={transactions}
        onBack={() => setScreen("info")}
        onPaymentSuccess={onTransactionSaved}
      />
    );
  }

  if (screen === "info") {
    return (
      <MBankingInfoPage
        onBack={() => setScreen("home")}
        onSavingsClick={() => setSavingsPinOpen(true)}
        onLoanClick={() => setScreen("loan")}
      />
    );
  }

  return (
    <div className="relative flex min-h-full flex-col bg-white">
      <main className="min-h-0 flex-1 bg-white">
        <MBankingHomeHeader
          onProfileClick={() => setScreen("profile")}
          onNotificationClick={() => setNotificationsOpen(true)}
        />
        <MBankingSavingsCard />
        <MBankingQuickActions onAccountInfoClick={() => setScreen("info")} />
        <MBankingHomeBanner
          onBannerClick={() => {
            setBannerReturn("home");
            setBannerDetailOpen(true);
          }}
          onViewAll={() => setAllBannersOpen(true)}
        />
        <MBankingTransactionHistoryEmpty transactions={transactions} />
      </main>

      <MBankingBottomNav
        activeTab="home"
        onAndroidBack={() => setExitOpen(true)}
      />

      <MBankingExitConfirmModal
        open={exitOpen}
        onCancel={() => setExitOpen(false)}
        onExit={() => {
          setExitOpen(false);
          onLogout?.();
        }}
      />
    </div>
  );
}