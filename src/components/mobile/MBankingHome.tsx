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
import MBankingBillingTransferPage from "@/components/mobile/MBankingBillingTransferPage";
import MBankingBillingQrisScanPage from "@/components/mobile/MBankingBillingQrisScanPage";
import MBankingBillingQrisReceiptPage from "@/components/mobile/MBankingBillingQrisReceiptPage";
import MBankingTransferChoiceModal from "@/components/mobile/MBankingTransferChoiceModal";
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
  const [exitOpen, setExitOpen] = React.useState(false);
  const [bannerDetailOpen, setBannerDetailOpen] = React.useState(false);
  const [allBannersOpen, setAllBannersOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [selectedBanner, setSelectedBanner] = React.useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [bannerReturn, setBannerReturn] = React.useState<"home" | "notifications">("home");
  const [pinAccount, setPinAccount] = React.useState<string | null>(null);
  const [pinForTopUp, setPinForTopUp] = React.useState(false);
  const [topUpAccount, setTopUpAccount] = React.useState<string | null>(null);
  const [homeDetailAccount, setHomeDetailAccount] = React.useState<string | null>(null);
  const [homeDetailReturn, setHomeDetailReturn] = React.useState<"home">("home");
  const [homeDetailTransferGuide, setHomeDetailTransferGuide] = React.useState(false);
  const [topUpOpen, setTopUpOpen] = React.useState(false);
  const [transferChoiceOpen, setTransferChoiceOpen] = React.useState(false);
  const [transferOpen, setTransferOpen] = React.useState(false);
  const [qrisOpen, setQrisOpen] = React.useState(false);
  const [qrisReceiptOpen, setQrisReceiptOpen] = React.useState(false);

  function openExitConfirmation() {
    setExitOpen(true);
  }

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

  if (pinAccount) {
    return <MBankingLoanPasswordPage onBack={() => setPinAccount(null)} onSuccess={() => { setHomeDetailAccount(pinAccount); setPinAccount(null); }} />;
  }

  if (pinForTopUp) {
    return <MBankingLoanPasswordPage onBack={() => setPinForTopUp(false)} onSuccess={() => { setPinForTopUp(false); setHomeDetailTransferGuide(true); }} />;
  }

  if (homeDetailAccount) {
    return <MBankingSavingsPage onBack={() => { setHomeDetailAccount(null); setScreen(homeDetailReturn); }} initialAccountNo={homeDetailAccount} />;
  }

  if (homeDetailTransferGuide) {
    return <MBankingSavingsPage onBack={() => setHomeDetailTransferGuide(false)} initialAccountNo={topUpAccount ?? undefined} initialTransferGuide />;
  }

  if (topUpOpen) {
    return (
      <MBankingSavingsPage
        onBack={() => setTopUpOpen(false)}
        onAccountSelect={(accountNo) => {
          setTopUpOpen(false);
          setTopUpAccount(accountNo);
          setPinForTopUp(true);
        }}
      />
    );
  }

  if (transferOpen) {
    return <MBankingBillingTransferPage onBack={() => setTransferOpen(false)} />;
  }

  if (qrisOpen) {
    return <MBankingBillingQrisScanPage onBack={() => setQrisOpen(false)} />;
  }

  if (qrisReceiptOpen) {
    return (
      <MBankingBillingQrisReceiptPage
        onBack={() => setQrisReceiptOpen(false)}
        hideDoneButton
      />
    );
  }

  if (screen === "profile") {
    return (
      <MBankingProfilePage
        onBack={() => setScreen("home")}
        onLogout={onLogout}
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
        onSavingsClick={() => setScreen("savings")}
        onLoanClick={() => setScreen("loan")}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <MBankingHomeHeader
          onProfileClick={() => setScreen("profile")}
          onNotificationClick={() => setNotificationsOpen(true)}
        />
        <MBankingSavingsCard onDetail={(accountNo) => setPinAccount(accountNo)} />
        <MBankingQuickActions
          onAccountInfoClick={() => setScreen("info")}
          onTopUpClick={() => setTopUpOpen(true)}
          onTransferClick={() => setTransferChoiceOpen(true)}
        />
        <MBankingHomeBanner
          onBannerClick={() => {
            setBannerReturn("home");
            setBannerDetailOpen(true);
          }}
          onViewAll={() => setAllBannersOpen(true)}
        />
        <MBankingTransactionHistoryEmpty
          transactions={transactions}
          onQrisReceiptClick={() => setQrisReceiptOpen(true)}
        />
      </main>

      <MBankingBottomNav
        activeTab="home"
        onAndroidBack={openExitConfirmation}
        onSettingsClick={() => setScreen("profile")}
        onQrisClick={() => setQrisOpen(true)}
      />

      <MBankingTransferChoiceModal
        open={transferChoiceOpen}
        onClose={() => setTransferChoiceOpen(false)}
        onInterAccount={() => {
          setTransferChoiceOpen(false);
          setTransferOpen(true);
        }}
        onOtherBank={() => {
          setTransferChoiceOpen(false);
        }}
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