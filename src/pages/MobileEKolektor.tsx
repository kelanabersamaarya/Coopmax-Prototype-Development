import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import eKolektorDetailFlow from "@/assets/mobile/e-kolektor/flow-detail.svg";
import eKolektorOverviewFlow from "@/assets/mobile/e-kolektor/flow-overview.svg";

const eKolektorScreenshots = [
  {
    src: eKolektorOverviewFlow,
    alt: "Flow daftar kunjungan E-Kolektor",
  },
  {
    src: eKolektorDetailFlow,
    alt: "Flow detail nasabah dan form kunjungan E-Kolektor",
  },
];

export default function MobileEKolektor() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <MobileMockupFrame screenshots={eKolektorScreenshots} />
      </div>
    </div>
  );
}