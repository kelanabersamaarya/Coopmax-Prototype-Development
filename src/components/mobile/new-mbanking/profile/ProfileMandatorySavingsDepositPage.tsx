import * as React from "react";
import { cn } from "@/lib/utils";
import NewMBankingPinInputPage from "@/components/mobile/new-mbanking/NewMBankingPinInputPage";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import ProfileSubPageShell from "@/components/mobile/new-mbanking/profile/ProfileSubPageShell";
import ProfileMandatorySavingsInfoCard from "@/components/mobile/new-mbanking/profile/ProfileMandatorySavingsInfoCard";
import ProfileMandatorySavingsConfirmModal from "@/components/mobile/new-mbanking/profile/ProfileMandatorySavingsConfirmModal";
import ProfileMandatorySavingsSuccessPage from "@/components/mobile/new-mbanking/profile/ProfileMandatorySavingsSuccessPage";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-[8px]">
      <label className="text-[14px] font-bold leading-none text-black">
        {label}
      </label>

      <input
        value={value}
        readOnly
        aria-readonly="true"
        className={cn(
          "h-[44px] w-full cursor-not-allowed rounded-[12px] border border-[#CDD4E0]",
          "bg-[#F1F3F6] px-4 text-[14px] font-normal text-black shadow-none outline-none",
        )}
      />
    </div>
  );
}

export default function ProfileMandatorySavingsDepositPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [keterangan, setKeterangan] = React.useState("");
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [showPinInput, setShowPinInput] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);

  React.useEffect(() => {
    function handleKeyboardCtaClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const keyboardCta = target?.closest(
        '[data-numeric-keyboard="true"] > button:last-child',
      );
      const activeTextarea = document.querySelector(
        '[data-profile-mandatory-savings-deposit-page="true"] textarea[data-keyboard-active="true"]',
      );

      if (!keyboardCta || !activeTextarea) return;

      setConfirmOpen(true);
    }

    document.addEventListener("click", handleKeyboardCtaClick, true);

    return () => {
      document.removeEventListener("click", handleKeyboardCtaClick, true);
    };
  }, []);

  if (showSuccess) {
    return (
      <ProfileMandatorySavingsSuccessPage
        sourceFund={sourceFund}
        keterangan={keterangan}
        onDone={onBack}
      />
    );
  }

  if (showPinInput) {
    return (
      <NewMBankingPinInputPage
        title="Setor Iuran"
        description="Masukkan 6 digit PIN M-Banking untuk melanjutkan setoran iuran."
        onBack={() => setShowPinInput(false)}
        onSubmit={() => {
          setShowPinInput(false);
          setShowSuccess(true);
        }}
      />
    );
  }

  return (
    <ProfileSubPageShell
      title="Penyetoran Simpanan Wajib"
      onBack={onBack}
      className="flex min-h-full flex-col"
    >
      <style>
        {`
          [data-mobile-screen="true"]:has([data-profile-mandatory-savings-deposit-page="true"])
            [data-input-clear-button="true"] {
            display: none !important;
          }

          [data-mobile-screen="true"]:has([data-profile-mandatory-savings-deposit-page="true"] textarea[data-keyboard-active="true"]):has([data-numeric-keyboard="true"])
            [data-profile-mandatory-savings-cta="true"] {
            display: none !important;
          }

          [data-mobile-screen="true"]:has([data-profile-mandatory-savings-deposit-page="true"] textarea[data-keyboard-active="true"])
            [data-numeric-keyboard="true"]
            > button:last-child {
            font-size: 0 !important;
          }

          [data-mobile-screen="true"]:has([data-profile-mandatory-savings-deposit-page="true"] textarea[data-keyboard-active="true"])
            [data-numeric-keyboard="true"]
            > button:last-child::after {
            content: "Setor Iuran";
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            text-align: center !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            line-height: 1 !important;
          }
        `}
      </style>

      <div data-profile-mandatory-savings-deposit-page="true">
        <NewMBankingSourceFundModal
          open={sourceFundOpen}
          onOpenChange={setSourceFundOpen}
          onSelect={setSourceFund}
        />

        <ProfileMandatorySavingsConfirmModal
          open={confirmOpen}
          sourceFund={sourceFund}
          onSourceFundChange={setSourceFund}
          keterangan={keterangan}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            setShowPinInput(true);
          }}
        />

        <div className="grid gap-[18px]">
          <ReadOnlyField label="Periode" value="Juli 2026" />

          <ProfileMandatorySavingsInfoCard
            label="Sumber Dana"
            title={sourceFund.productName}
            subtitle={sourceFund.accountNo}
            balanceLabel="Saldo"
            balance={sourceFund.balance}
            actionLabel="Pilih sumber dana"
            onAction={() => setSourceFundOpen(true)}
            tone="blue"
          />

          <ProfileMandatorySavingsInfoCard
            label="Tujuan Iuran"
            title="Simpanan Wajib"
            subtitle="SWJ-2600006"
            balanceLabel="Saldo Simpanan Wajib"
            balance="Rp. 100.000,00"
            tone="green"
          />

          <ReadOnlyField label="Nominal Iuran" value="Rp. 50.000,00" />

          <div className="grid gap-[8px]">
            <label className="text-[14px] font-bold leading-none text-black">
              Keterangan
            </label>

            <textarea
              value={keterangan}
              onChange={(event) => setKeterangan(event.target.value)}
              placeholder="Masukkan keterangan"
              className={cn(
                "min-h-[132px] w-full resize-none rounded-[12px] border border-[#CDD4E0]",
                "bg-white px-4 py-3 text-[14px] font-normal text-black shadow-none outline-none",
                "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                "focus:border-[#479DF4]",
              )}
            />
          </div>
        </div>

        <div data-profile-mandatory-savings-cta="true" className="mt-auto pt-6">
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className={cn(
              "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
              "text-[14px] font-semibold leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Setor Iuran
          </button>
        </div>
      </div>
    </ProfileSubPageShell>
  );
}