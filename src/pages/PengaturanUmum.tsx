import PengaturanHeader from "@/components/settings/PengaturanHeader";
import PengaturanPinjamanTab from "@/components/settings/PengaturanPinjamanTab";

export default function PengaturanUmum() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <PengaturanHeader />
        <PengaturanPinjamanTab />
      </div>
    </div>
  );
}