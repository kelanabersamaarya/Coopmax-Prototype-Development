import MobileMockupFrame from "@/components/mobile/MobileMockupFrame";
import mBankingOverviewFlow from "@/assets/mobile/m-banking/flow-overview.svg";
import mBankingTransferFlow from "@/assets/mobile/m-banking/flow-transfer.svg";

const mBankingScreenshots = [
  {
    src: mBankingOverviewFlow,
    alt: "Flow beranda Mobile M-Banking",
  },
  {
    src: mBankingTransferFlow,
    alt: "Flow transfer dana Mobile M-Banking",
  },
];

export default function MobileMBanking() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-wrap items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Mobile
          </h1>
          <div className="text-base font-semibold text-slate-500">/ M-Banking</div>
        </div>

        <MobileMockupFrame
          title="Preview Mobile M-Banking"
          subtitle="Mockup layar HP dengan flow layanan perbankan digital yang tersusun vertikal dan dapat di-scroll."
          screenshots={mBankingScreenshots}
        />
      </div>
    </div>
  );
}
