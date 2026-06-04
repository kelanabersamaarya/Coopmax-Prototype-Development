import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import eKolektorLogin from "@/assets/mobile/e-kolektor/login.svg";
import eKolektorDetailFlow from "@/assets/mobile/e-kolektor/flow-detail.svg";
import eKolektorOverviewFlow from "@/assets/mobile/e-kolektor/flow-overview.svg";

const eKolektorScreenshots = [
  {
    src: eKolektorLogin,
    alt: "Halaman login E-Kolektor",
  },
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
    <div className="h-full min-h-0 overflow-hidden bg-[hsl(var(--app-bg))]">
      <div className="h-full min-h-0 w-full overflow-hidden px-2 py-0 md:px-3">
        <MobileMockupFrame screenshots={eKolektorScreenshots} />
      </div>
    </div>
  );
}