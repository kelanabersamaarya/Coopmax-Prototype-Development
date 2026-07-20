import * as React from "react";
import { ArrowLeft, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingBankSelectionPage from "@/components/mobile/new-mbanking/NewMBankingBankSelectionPage";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingTransferConfirmModal from "@/components/mobile/new-mbanking/NewMBankingTransferConfirmModal";
import NewMBankingPinInputPage from "@/components/mobile/new-mbanking/NewMBankingPinInputPage";
import NewMBankingTransferSuccessPage from "@/components/mobile/new-mbanking/NewMBankingTransferSuccessPage";
import NewMBankingInScreenToast from "@/components/mobile/new-mbanking/NewMBankingInScreenToast";
import NewMBankingRecipientInfoCard, {
  type NewMBankingRecipientInfo,
} from "@/components/mobile/new-mbanking/NewMBankingRecipientInfoCard";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

function TransferField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-[9px]">
      <label className="text-[14px] font-bold leading-none text-black">
        {label}
        {required ? <span className="text-[#EF135D]">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function ClearInputButton({
  onClick,
  label = "Hapus isi field",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        "absolute right-[9px] top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center",
        "rounded-full bg-transparent text-[#8F8F8F] transition active:scale-[0.94]",
      )}
      aria-label={label}
      title="Hapus"
    >
      <X className="h-[18px] w-[18px]" strokeWidth={2.6} />
    </button>
  );
}

function onlyDigits(value: string) {
  return (value ?? "").replace(/[^\d]/g, "");
}

function formatThousands(value: string) {
  const digits = onlyDigits(value);
  if (!digits) return "";

  const normalized = digits.replace(/^0+(?=\d)/, "");
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function NewMBankingNewRecipientTransferPage({
  onBack,
  onDone,
  hideBankSelection = false,
  recipient,
}: {
  onBack: () => void;
  onDone?: () => void;
  hideBankSelection?: boolean;
  recipient?: NewMBankingRecipientInfo;
}) {
  const [showBankSelection, setShowBankSelection] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [showPinInput, setShowPinInput] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [bank, setBank] = React.useState(recipient?.bank ?? "");
  const [accountNo, setAccountNo] = React.useState(recipient?.accountNo ?? "");
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState("");
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);

  React.useEffect(() => {
    if (!recipient) return;
    setAccountNo(onlyDigits(recipient.accountNo));
    setBank(recipient.bank ?? "");
  }, [recipient]);

  const pageTitle = hideBankSelection
    ? "Transfer Antar Rekening"
    : "Transfer Antar Bank";

  function showWarning(message: string) {
    setToastMessage("");
    window.setTimeout(() => setToastMessage(message), 0);
  }

  function continueTransfer() {
    if (!hideBankSelection && !bank.trim()) {
      showWarning("Nama Bank wajib dipilih");
      return;
    }

    if (!accountNo.trim()) {
      showWarning("Nomor Rekening Penerima wajib diisi");
      return;
    }

    if (!amount.trim()) {
      showWarning("Nominal Transfer wajib diisi");
      return;
    }

    if (!description.trim()) {
      showWarning("Deskripsi wajib diisi");
      return;
    }

    setConfirmOpen(true);
  }

  if (showSuccess) {
    return (
      <NewMBankingTransferSuccessPage
        recipientName={recipient?.name ?? "Suyatna"}
        recipientAccountNo={accountNo}
        recipientBankName={hideBankSelection ? undefined : bank}
        nominal={amount}
        description={description}
        canSaveRecipient={!recipient}
        onDone={onDone ?? onBack}
      />
    );
  }

  if (showPinInput) {
    return (
      <NewMBankingPinInputPage
        title={pageTitle}
        description="Masukkan 6 digit PIN M-Banking untuk melanjutkan transaksi transfer."
        onBack={() => setShowPinInput(false)}
        onSubmit={() => {
          setShowPinInput(false);
          setShowSuccess(true);
        }}
      />
    );
  }

  if (showBankSelection) {
    return (
      <NewMBankingBankSelectionPage
        onBack={() => setShowBankSelection(false)}
        onSelectBank={(selectedBank) => {
          setBank(selectedBank);
          setToastMessage("");
          setShowBankSelection(false);
        }}
      />
    );
  }

  const fieldClassName = cn(
    "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-4",
    "text-[14px] font-normal text-black shadow-none outline-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
    "focus:border-[#479DF4]",
  );

  const clearableFieldClassName = cn(fieldClassName, "pr-[42px]");

  const descriptionFieldClassName = cn(
    "min-h-[86px] w-full resize-none rounded-[12px] border border-[#CDD4E0] bg-white px-4 py-3 pr-[42px]",
    "text-[14px] font-normal text-black shadow-none outline-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
    "focus:border-[#479DF4]",
  );

  return (
    <div
      data-transfer-input-page="true"
      className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black"
    >
      <style>
        {`
          [data-mobile-screen="true"]:has([data-transfer-input-page="true"])
            [data-input-clear-button="true"] {
            display: none !important;
          }
        `}
      </style>

      <NewMBankingInScreenToast
        message={toastMessage}
        variant="warning"
        onClose={() => setToastMessage("")}
      />

      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <NewMBankingTransferConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        sourceInfo={`${sourceFund.accountNo} - ${sourceFund.productName}`}
        recipientName={recipient?.name ?? "Suyatna"}
        recipientAccountNo={accountNo}
        recipientBankName={hideBankSelection ? undefined : bank}
        description={description}
        nominal={amount}
        hideAdminFee={hideBankSelection}
        onContinue={() => {
          setConfirmOpen(false);
          setShowPinInput(true);
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
            {pageTitle}
          </h1>
        </header>
      </div>

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#F9F9F9] pb-[112px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pt-[24px]">
          <div className="grid gap-[20px]">
            <div className="grid gap-[9px]">
              <div className="flex items-center justify-between gap-3">
                <label className="text-[14px] font-bold leading-none text-black">
                  Sumber Dana<span className="text-[#EF135D]">*</span>
                </label>

                <button
                  type="button"
                  onClick={() => setSourceFundOpen(true)}
                  className="text-[12px] font-semibold leading-none text-[#479DF4] transition active:scale-[0.98]"
                >
                  Ubah
                </button>
              </div>

              <NewMBankingSourceFundGradientCard
                account={sourceFund}
                onClick={() => setSourceFundOpen(true)}
                textSize="compact"
                className="min-h-[104px]"
              />
            </div>

            {recipient ? (
              <NewMBankingRecipientInfoCard recipient={recipient} />
            ) : (
              <>
                {!hideBankSelection ? (
                  <TransferField label="Nama Bank" required>
                    <button
                      type="button"
                      onClick={() => setShowBankSelection(true)}
                      className={cn(
                        fieldClassName,
                        "flex items-center justify-between gap-3 text-left",
                        bank ? "text-black" : "text-[#8F8F8F]",
                      )}
                      aria-label="Pilih Bank Penerima"
                    >
                      <span className="min-w-0 flex-1 truncate">
                        {bank || "Pilih Bank Penerima"}
                      </span>
                      <ChevronDown className="h-[19px] w-[19px] shrink-0 text-[#8F8F8F]" />
                    </button>
                  </TransferField>
                ) : null}

                <TransferField label="Nomor Rekening Penerima" required>
                  <div className="relative">
                    <input
                      value={accountNo}
                      onChange={(event) => {
                        setAccountNo(onlyDigits(event.target.value));
                        setToastMessage("");
                      }}
                      placeholder="Masukkan Nomor Rekening Penerima"
                      inputMode="numeric"
                      className={clearableFieldClassName}
                    />

                    {accountNo.trim() ? (
                      <ClearInputButton onClick={() => setAccountNo("")} />
                    ) : null}
                  </div>
                </TransferField>
              </>
            )}

            <TransferField label="Nominal Transfer" required>
              <div className="relative">
                <input
                  value={amount}
                  onChange={(event) => {
                    setAmount(formatThousands(event.target.value));
                    setToastMessage("");
                  }}
                  placeholder="0,00"
                  inputMode="numeric"
                  className={clearableFieldClassName}
                />

                {amount.trim() ? (
                  <ClearInputButton onClick={() => setAmount("")} />
                ) : null}
              </div>
            </TransferField>

            <TransferField label="Deskripsi" required>
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                    setToastMessage("");
                  }}
                  placeholder="Masukkan Deskripsi Transfer"
                  className={descriptionFieldClassName}
                />

                {description.trim() ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setDescription("");
                    }}
                    className={cn(
                      "absolute right-[9px] top-[10px] inline-flex h-7 w-7 items-center justify-center",
                      "rounded-full bg-transparent text-[#8F8F8F] transition active:scale-[0.94]",
                    )}
                    aria-label="Hapus deskripsi"
                    title="Hapus"
                  >
                    <X className="h-[18px] w-[18px]" strokeWidth={2.6} />
                  </button>
                ) : null}
              </div>
            </TransferField>
          </div>
        </section>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={continueTransfer}
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