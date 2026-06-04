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
        <div className="flex flex-wrap items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Mobile
          </h1>
          <div className="text-base font-semibold text-slate-500">/ E-Kolektor</div>
        </div>

        <MobileMockupFrame
          title="Preview Mobile E-Kolektor"
          subtitle="Mockup layar HP dengan rangkaian flow kunjungan kolektor yang dapat di-scroll di dalam frame."
          screenshots={eKolektorScreenshots}
        />
      </div>
    </div>
  );
}
