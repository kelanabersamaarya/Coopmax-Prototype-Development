"use client";

import * as React from "react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorProfileHeader from "@/components/mobile/EKolektorProfileHeader";
import EKolektorProfileMenu from "@/components/mobile/EKolektorProfileMenu";
import EKolektorSettingsPage from "@/components/mobile/EKolektorSettingsPage";
import EKolektorFingerprintLoginPage from "@/components/mobile/EKolektorFingerprintLoginPage";

export default function EKolektorProfilePage({
  onBack,
  onLogout,
}: {
  onBack: () => void;
  onLogout: () => void;
}) {
  const [showSettings, setShowSettings] = React.useState(false);
  const [showFingerprintLogin, setShowFingerprintLogin] = React.useState(false);
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);

  if (showFingerprintLogin) {
    return (
      <EKolektorFingerprintLoginPage
        onBack={() => setShowFingerprintLogin(false)}
        onContinue={() => {
          setBiometricEnabled(true);
          setShowFingerprintLogin(false);
        }}
      />
    );
  }

  if (showSettings) {
    return (
      <EKolektorSettingsPage
        onBack={() => setShowSettings(false)}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <EKolektorProfileHeader onBack={onBack} />

        <div className="h-[10px] w-full bg-[#F2F2F2]" />

        <EKolektorProfileMenu
          onOpenSettings={() => setShowSettings(true)}
          onFingerprintEnable={() => setShowFingerprintLogin(true)}
          onLogout={onLogout}
          biometricEnabled={biometricEnabled}
        />
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}