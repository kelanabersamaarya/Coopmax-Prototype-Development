import * as React from "react";
import PengaturanHeader, {
  type PengaturanTab,
} from "@/components/settings/PengaturanHeader";
import PengaturanPinjamanTab from "@/components/settings/PengaturanPinjamanTab";
import PengaturanSimpananTab from "@/components/settings/PengaturanSimpananTab";
import PengaturanSinkronisasiTab from "@/components/settings/PengaturanSinkronisasiTab";
import PengaturanMobileTab from "@/components/settings/PengaturanMobileTab";

export default function PengaturanUmum() {
  const [activeTab, setActiveTab] = React.useState<PengaturanTab>("Pinjaman");

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <PengaturanHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "Sinkronisasi" ? <PengaturanSinkronisasiTab /> : null}
        {activeTab === "Simpanan" ? <PengaturanSimpananTab /> : null}
        {activeTab === "Pinjaman" ? <PengaturanPinjamanTab /> : null}
        {activeTab === "Mobile" ? <PengaturanMobileTab /> : null}

        {activeTab !== "Sinkronisasi" &&
        activeTab !== "Simpanan" &&
        activeTab !== "Pinjaman" &&
        activeTab !== "Mobile" ? (
          <div className="mt-8 rounded-[5px] bg-white p-[15px] text-[13px] font-normal text-slate-700 shadow-sm ring-1 ring-[#E4E9F2]">
            Tab {activeTab} masih prototype.
          </div>
        ) : null}
      </div>
    </div>
  );
}