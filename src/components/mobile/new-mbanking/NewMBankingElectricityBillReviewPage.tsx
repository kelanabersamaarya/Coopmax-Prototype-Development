"use client";

import * as React from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import NewMBankingElectricityConfirmModal from "@/components/mobile/new-mbanking/NewMBankingElectricityConfirmModal";
import NewMBankingElectricityPaymentSuccessPage from "@/components/mobile/new-mbanking/NewMBankingElectricityPaymentSuccessPage";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

const customerName = "I Made Wirata";
const billAmount = "Rp. 350.000,00";
const adminFee = "Rp. 2.500,00";

function parseIdrLike(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  const parsed = Number(digits);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return `Rp. ${Math.round(value).toLocaleString("id-ID")},00`;
}

function DetailRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[8px]">
      <div className="min-w-0 text-[14px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div
        className={cn(
          "max-w-[190px] text-right leading-tight text-black",
          strong ? "text-[18px] font-bold" : "text-[14px] font-normal",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function NewMBankingElectricityBillReviewPage({
  providerName,
  customerNo,
  onBack,
}: {
  providerName: string;
  customerNo: string;
  onBack: () => void;
}) {
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);

  const totalTransaction = formatIdr(
    parseIdrLike(billAmount) + parseIdrLike(adminFee),
  );

  if (showSuccess) {
    return (
      <NewMBankingElectricityPaymentSuccessPage
        providerName={providerName}
        customerName={customerName}
        customerNo={customerNo}
        amount={billAmount}
        adminFee={adminFee}
        totalTransaction={totalTransaction}
        sourceFund={sourceFund}
        onDone={onBack}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <NewMBankingElectricityConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        providerName={providerName}
        customerName={customerName}
        customerNo={customerNo}
        amount={billAmount}
        sourceFund={sourceFund}
        onConfirm={() => {
          setConfirmOpen(false);
          setShowSuccess(true);
        }}
      />

      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            Listrik PLN
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[118px] pt-[34px]">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-[86px] w-[86px] place-items-center rounded-full bg-[#479DF4] text-white shadow-[0_10px_24px_rgba(71,157,244,0.24)]">
              <Zap className="h-[42px] w-[42px] text-white" strokeWidth={2.7} />
            </span>

            <h2 className="mt-[18px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
              {providerName}
            </h2>
          </div>

          <div className="mt-[34px] rounded-[20px] border border-[#E5E7EB] bg-white px-5 py-4">
            <DetailRow label="Nama Pelanggan" value={customerName} />
            <DetailRow label="No. Pelanggan" value={customerNo} />
            <div className="my-[8px] h-px w-full bg-[#E5E7EB]" />
            <DetailRow label="Nominal Tagihan" value={billAmount} strong />
          </div>

          <section className="mt-[30px]">
            <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
              Sumber Dana
            </div>

            <div className="mt-[12px]">
              <NewMBankingSourceFundGradientCard
                account={sourceFund}
                onClick={() => setSourceFundOpen(true)}
              />
            </div>
          </section>
        </section>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>
  );
}