"use client";

import * as React from "react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorProfileHeader from "@/components/mobile/EKolektorProfileHeader";
import EKolektorProfileMenu from "@/components/mobile/EKolektorProfileMenu";
import EKolektorSettingsPage from "@/components/mobile/EKolektorSettingsPage";

export default function EKolektorProfilePage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [showSettings, setShowSettings] = React.useState(false);

  if (showSettings) {
    return <EKolektorSettingsPage onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <EKolektorProfileHeader onBack={onBack} />

        <div className="h-[10px] w-full bg-[#F2F2F2]" />

        <EKolektorProfileMenu onOpenSettings={() => setShowSettings(true)} />
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}