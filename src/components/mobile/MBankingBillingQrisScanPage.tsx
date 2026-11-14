import * as React from "react";
import { ArrowLeft } from "lucide-react";
import NewMBankingQrisLogo from "@/components/mobile/MBankingBillingQrisLogo";
import NewMBankingPinInputPage from "@/components/mobile/MBankingBillingQrisPinPage";
import NewMBankingQrCodeDisplayPage from "@/components/mobile/MBankingBillingQrisCodePage";
import NewMBankingScanBottomActions from "@/components/mobile/MBankingBillingQrisBottomActions";
import NewMBankingScanningAnimation from "@/components/mobile/MBankingBillingQrisScanningAnimation";
import NewMBankingScanResultPage from "@/components/mobile/MBankingBillingQrisResultPage";
import NewMBankingMediaPickerPopup, {
  type GalleryItem,
} from "@/components/mobile/MBankingBillingQrisMediaPickerPopup";
import NewMBankingMediaScanPreviewPage from "@/components/mobile/MBankingBillingQrisMediaPreviewPage";
import NewMBankingScanQrImage from "@/components/mobile/MBankingBillingQrisScanImage";

type NewMBankingScanPageProps = {
  onBack: () => void;
};

export default function NewMBankingScanPage({
  onBack,
}: NewMBankingScanPageProps) {
  const [showResultPage, setShowResultPage] = React.useState(false);
  const [showPinInput, setShowPinInput] = React.useState(false);
  const [showQrCode, setShowQrCode] = React.useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = React.useState(false);
  const [mediaScanItem, setMediaScanItem] = React.useState<GalleryItem | null>(
    null,
  );

  React.useEffect(() => {
    if (
      showResultPage ||
      showPinInput ||
      showQrCode ||
      mediaPickerOpen ||
      mediaScanItem
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowResultPage(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [mediaPickerOpen, mediaScanItem, showPinInput, showQrCode, showResultPage]);

  if (showQrCode) {
    return (
      <NewMBankingQrCodeDisplayPage
        onBack={() => setShowQrCode(false)}
        onDone={onBack}
      />
    );
  }

  if (showPinInput) {
    return (
      <NewMBankingPinInputPage
        variant="loan-billing"
        onBack={() => setShowPinInput(false)}
        onSubmit={() => {
          setShowPinInput(false);
          setShowQrCode(true);
        }}
      />
    );
  }

  if (mediaScanItem) {
    return (
      <NewMBankingMediaScanPreviewPage
        title={mediaScanItem.title}
        color={mediaScanItem.color}
        onBack={() => setMediaScanItem(null)}
        onComplete={() => {
          setMediaScanItem(null);
          setShowResultPage(true);
        }}
      />
    );
  }

  if (showResultPage) {
    return (
      <NewMBankingScanResultPage
        onBack={() => setShowResultPage(false)}
        onDone={onBack}
      />
    );
  }

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#0758C9] text-black">
      <NewMBankingMediaPickerPopup
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onChoose={(item) => setMediaScanItem(item)}
      />

      <header className="flex h-[128px] shrink-0 flex-col items-start px-[31px] pt-[18px] text-white">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-white transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[25px] w-[25px]" strokeWidth={2.7} />
        </button>

        <h1 className="mt-[12px] text-[25px] font-bold leading-tight text-white">
          Memindai QR
        </h1>
      </header>

      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[30px] bg-white px-6 pb-[26px] pt-[20px]">
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[24px] bg-[#101010]">
          <NewMBankingScanQrImage />
          <NewMBankingScanningAnimation />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center pb-5">
            <div className="rounded-full border border-[#E3E7ED] bg-white px-4 py-2 text-[12px] font-normal text-[#828282] shadow-sm">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#479DF4]" />
              Memproses hasil scan...
            </div>
          </div>
        </div>

        <section className="shrink-0 pt-[24px]">
          <NewMBankingScanBottomActions
            onChange={(value) => {
              if (value === "qr") {
                setShowPinInput(true);
                return;
              }

              if (value === "media") {
                setMediaPickerOpen(true);
              }
            }}
          />
        </section>
      </main>
    </div>
  );
}