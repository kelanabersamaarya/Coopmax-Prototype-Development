import * as React from "react";
import PengaturanHeader, {
  type PengaturanTab,
} from "@/components/settings/PengaturanHeader";
import PengaturanPinjamanTab from "@/components/settings/PengaturanPinjamanTab";
import PengaturanSimpananTab from "@/components/settings/PengaturanSimpananTab";
import PengaturanSinkronisasiTab from "@/components/settings/PengaturanSinkronisasiTab";
import PengaturanMobileTab from "@/components/settings/PengaturanMobileTab";
import PengaturanTambahanTab from "@/components/settings/PengaturanTambahanTab";
import "../styles/settings-spacing.css";

export default function PengaturanUmum() {
  const [activeTab, setActiveTab] = React.useState<PengaturanTab>("Pinjaman");

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <PengaturanHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="settings-comfortable-spacing">
          {activeTab === "Sinkronisasi" ? <PengaturanSinkronisasiTab /> : null}
          {activeTab === "Simpanan" ? <PengaturanSimpananTab /> : null}
          {activeTab === "Pinjaman" ? <PengaturanPinjamanTab /> : null}
          {activeTab === "Mobile" ? <PengaturanMobileTab /> : null}
          {activeTab === "Pengaturan Tambahan" ? (
            <PengaturanTambahanTab />
          ) : null}
        </div>
      </div>
    </div>
  );
}