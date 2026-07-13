"use client";

import * as React from "react";
import { ArrowLeft, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import NewMBankingInScreenToast from "@/components/mobile/new-mbanking/NewMBankingInScreenToast";
import NewMBankingElectricityConfirmModal from "@/components/mobile/new-mbanking/NewMBankingElectricityConfirmModal";
import NewMBankingElectricityPaymentSuccessPage from "@/components/mobile/new-mbanking/NewMBankingElectricityPaymentSuccessPage";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

const tokenNominalOptions = [
  "Rp. 20.000,00",
  "Rp. 50.000,00",
  "Rp. 100.000,00",
  "Rp. 200.000,00",
  "Rp. 500.000,00",
  "Rp. 1.000.000,00",
];

function parseIdrLike(value: string) {
  const raw = (value ?? "").trim();
  if (!raw) return 0;

  const withoutCurrency = raw.replace(/rp\.?/gi, "").replace(/\s/g, "");
  const integerPart = withoutCurrency.split(",")[0] ?? "";
  const cleaned = integerPart.replace(/[^\d-]/g, "");
  const parsed = Number(cleaned);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return `Rp. ${Math.round(value).toLocaleString("id-ID")},00`;
}

export default function NewMBankingTokenPlnPurchasePage({
  onBack,
  initialMeterNo = "",
}: {
  onBack: () => void;
  initialMeterNo?: string;
}) {
  const [meterNo, setMeterNo] = React.useState(initialMeterNo);
  const [selectedNominal, setSelectedNominal] = React.useState("");
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastVariant, setToastVariant] =
    React.useState<"success" | "warning">("success");
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const providerName = "Token PLN";
  const adminFee = "Rp. 2.500,00";
  const totalTransaction = formatIdr(
    parseIdrLike(selectedNominal) + parseIdrLike(adminFee),
  );

  React.useEffect(() => {
    setMeterNo(initialMeterNo);
  }, [initialMeterNo]);

  function showToast(message: string, variant: "success" | "warning" = "success") {
    setToastMessage("");
    setToastVariant(variant);
    window.setTimeout(() => setToastMessage(message), 0);
  }

  function continuePurchase() {
    if (!meterNo.trim()) {
      showToast("No. Meter/ID Pelanggan wajib diisi", "warning");
      return;
    }

    if (!selectedNominal) {
      showToast("Nominal token wajib dipilih", "warning");
      return;
    }

    setConfirmOpen(true);
  }

  if (showSuccess) {
    return (
      <NewMBankingElectricityPaymentSuccessPage
        providerName={providerName}
        customerName=""
        customerNo={meterNo}
        amount={selectedNominal}
        adminFee={adminFee}
        totalTransaction={totalTransaction}
        sourceFund={sourceFund}
        serviceVariant="token-pln"
        recipientAlreadySaved={false}
        onSaveRecipient={() => showToast("Penerima Berhasil Tersimpan")}
        onDone={onBack}
      />
    );
  }

  return (
    <div
      data-new-mbanking-purchase-input-page="true"
      className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black"
    >
      <NewMBankingInScreenToast
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setToastMessage("")}
      />

      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <NewMBankingElectricityConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        providerName={providerName}
        customerName=""
        customerNo={meterNo}
        amount={selectedNominal}
        sourceFund={sourceFund}
        onSourceFundChange={setSourceFund}
        serviceVariant="token-pln"
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
            Beli Token PLN
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[118px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[30px]">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-[86px] w-[86px] place-items-center rounded-full bg-[#F59E0B] text-white">
              <Zap className="h-[42px] w-[42px] text-white" strokeWidth={2.7} />
            </span>

            <h2 className="mt-[18px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
              Pembelian Token PLN
            </h2>

            <p className="mt-[8px] max-w-[292px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
              Masukkan nomor meter, pilih nominal token, lalu tentukan sumber dana
              pembayaran.
            </p>
          </div>

          <div className="mt-[38px] grid gap-[9px]">
            <label className="text-[14px] font-bold leading-none text-black">
              No. Meter/ID Pelanggan<span className="text-[#EF135D]">*</span>
            </label>

            <div className="relative">
              <input
                value={meterNo}
                onChange={(event) =>
                  setMeterNo(event.target.value.replace(/[^\d]/g, ""))
                }
                placeholder="Masukkan No. Meter/ID Pelanggan"
                inputMode="numeric"
                className={cn(
                  "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-4 pr-[42px]",
                  "text-[14px] font-normal text-black shadow-none outline-none",
                  "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                  "focus:border-[#479DF4]",
                )}
              />

              {meterNo.trim() ? (
                <button
                  type="button"
                  onClick={() => setMeterNo("")}
                  className="absolute right-[9px] top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#8F8F8F] transition active:scale-[0.94]"
                  aria-label="Hapus nomor meter"
                  title="Hapus"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={2.6} />
                </button>
              ) : null}
            </div>
          </div>

          <section className="mt-[30px]">
            <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
              Pilih Nominal Token
            </div>
            <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

            <div className="mt-[18px] grid grid-cols-2 gap-x-[14px] gap-y-[12px]">
              {tokenNominalOptions.map((nominal) => {
                const selected = selectedNominal === nominal;

                return (
                  <button
                    key={nominal}
                    type="button"
                    onClick={() => setSelectedNominal(nominal)}
                    className={cn(
                      "h-[54px] rounded-[8px] border bg-white px-3 text-center",
                      "text-[16px] font-bold leading-none tracking-[-0.02em]",
                      "transition active:scale-[0.98]",
                      selected
                        ? "border-[#479DF4] bg-[#EEF6FF] text-[#2563EB]"
                        : "border-[#D8D8D8] text-black",
                    )}
                    aria-pressed={selected}
                  >
                    {nominal.replace(",00", "")}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-[30px]">
            <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
              Sumber Dana
            </div>
            <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

            <div className="mt-[18px]">
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
          onClick={continuePurchase}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}