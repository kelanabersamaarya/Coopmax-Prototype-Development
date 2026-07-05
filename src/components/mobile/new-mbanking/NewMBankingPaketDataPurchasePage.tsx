"use client";

import * as React from "react";
import { ArrowLeft, Contact, Smartphone } from "lucide-react";
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

const paketDataOptions = [
  {
    id: "xl-1gb",
    name: "XL Data 1GB / 1 Hari",
    description: "Cocok untuk pemakaian ringan harian",
    price: "Rp. 5.000,00",
  },
  {
    id: "xl-3gb",
    name: "XL Data 3GB / 3 Hari",
    description: "Paket praktis untuk kebutuhan beberapa hari",
    price: "Rp. 15.000,00",
  },
  {
    id: "xl-8gb",
    name: "XL Data 8GB / 7 Hari",
    description: "Kuota mingguan untuk browsing dan chat",
    price: "Rp. 35.000,00",
  },
  {
    id: "xl-15gb",
    name: "XL Data 15GB / 30 Hari",
    description: "Paket bulanan untuk pemakaian rutin",
    price: "Rp. 75.000,00",
  },
];

export default function NewMBankingPaketDataPurchasePage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [selectedPackageId, setSelectedPackageId] = React.useState("");
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastVariant, setToastVariant] =
    React.useState<"success" | "warning">("success");
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const providerName = "Paket Data XL";
  const selectedPackage =
    paketDataOptions.find((item) => item.id === selectedPackageId) ?? null;
  const selectedAmount = selectedPackage?.price ?? "Rp. 0,00";
  const hasPhoneNumber = phoneNumber.trim().length > 0;

  React.useEffect(() => {
    if (hasPhoneNumber) return;
    setSelectedPackageId("");
  }, [hasPhoneNumber]);

  function showToast(message: string, variant: "success" | "warning" = "success") {
    setToastMessage("");
    setToastVariant(variant);
    window.setTimeout(() => setToastMessage(message), 0);
  }

  function chooseContact() {
    setPhoneNumber("0819987262");
    showToast("Nomor dari kontak berhasil dipilih");
  }

  function continuePurchase() {
    if (!phoneNumber.trim()) {
      showToast("Nomor HP wajib diisi", "warning");
      return;
    }

    if (!selectedPackage) {
      showToast("Paket data wajib dipilih", "warning");
      return;
    }

    setConfirmOpen(true);
  }

  if (showSuccess) {
    return (
      <NewMBankingElectricityPaymentSuccessPage
        providerName={providerName}
        customerName=""
        customerNo={phoneNumber}
        amount={selectedAmount}
        adminFee="Rp. 0,00"
        totalTransaction={selectedAmount}
        sourceFund={sourceFund}
        serviceVariant="data-package"
        recipientAlreadySaved={false}
        onSaveRecipient={() => showToast("Penerima Berhasil Tersimpan")}
        onDone={onBack}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
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
        customerNo={phoneNumber}
        amount={selectedAmount}
        sourceFund={sourceFund}
        serviceVariant="data-package"
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
            Beli Paket Data
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[118px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[34px] pt-[30px]">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-[86px] w-[86px] place-items-center rounded-full bg-[#2563EB] text-white">
              <Smartphone
                className="h-[42px] w-[42px] text-white"
                strokeWidth={2.7}
              />
            </span>

            <h2 className="mt-[18px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
              Pembelian Paket Data
            </h2>

            <p className="mt-[8px] max-w-[292px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
              Masukkan nomor handphone, pilih paket data, lalu tentukan sumber
              dana pembayaran.
            </p>
          </div>

          <div className="mt-[38px] grid gap-[9px]">
            <label className="text-[14px] font-bold leading-none text-black">
              Nomor HP<span className="text-[#EF135D]">*</span>
            </label>

            <div className="flex items-stretch gap-[9px]">
              <input
                value={phoneNumber}
                onChange={(event) =>
                  setPhoneNumber(
                    (event.target.value ?? "").replace(/[^\d]/g, ""),
                  )
                }
                placeholder="Masukkan Nomor HP"
                inputMode="numeric"
                className={cn(
                  "h-[44px] min-w-0 flex-1 rounded-[12px] border border-[#CDD4E0] bg-white px-4",
                  "text-[14px] font-normal text-black shadow-none outline-none",
                  "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                  "focus:border-[#479DF4]",
                )}
              />

              <button
                type="button"
                onClick={chooseContact}
                className={cn(
                  "grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[12px]",
                  "bg-[#479DF4] text-white shadow-none",
                  "transition active:scale-[0.96]",
                )}
                aria-label="Pilih dari kontak"
                title="Pilih dari kontak"
              >
                <Contact
                  className="h-[22px] w-[22px] text-white"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>

          {hasPhoneNumber ? (
            <section className="mt-[30px]">
              <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
                Pilih Paket Data
              </div>
              <div className="mt-[12px] h-px w-full bg-[#D8D8D8]" />

              <div className="mt-[18px] grid gap-[12px]">
                {paketDataOptions.map((item) => {
                  const selected = selectedPackageId === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedPackageId(item.id)}
                      className={cn(
                        "flex min-h-[76px] w-full items-center justify-between gap-4 rounded-[14px] border px-4 py-3 text-left",
                        "transition active:scale-[0.98]",
                        selected
                          ? "border-[#479DF4] bg-[#EEF6FF]"
                          : "border-[#D8D8D8] bg-white",
                      )}
                      aria-pressed={selected}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] font-bold leading-tight text-black">
                          {item.name}
                        </span>
                        <span className="mt-[5px] block text-[12px] font-normal leading-snug text-[#8F8F8F]">
                          {item.description}
                        </span>
                      </span>

                      <span
                        className={cn(
                          "shrink-0 text-right text-[14px] font-bold leading-tight",
                          selected ? "text-[#2563EB]" : "text-black",
                        )}
                      >
                        {item.price.replace(",00", "")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

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