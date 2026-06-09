"use client";

import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorProfileHeader from "@/components/mobile/EKolektorProfileHeader";
import EKolektorProfileMenu from "@/components/mobile/EKolektorProfileMenu";

export default function EKolektorProfilePage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <EKolektorProfileHeader onBack={onBack} />
        <EKolektorProfileMenu />
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}