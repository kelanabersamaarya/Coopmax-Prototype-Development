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
      <div className="w-full px-2 py-0 md:px-3">
        <MobileMockupFrame screenshots={mBankingScreenshots} />
      </div>
    </div>
  );
}