import * as React from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingBankSelectionPage from "@/components/mobile/new-mbanking/NewMBankingBankSelectionPage";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingTransferConfirmModal from "@/components/mobile/new-mbanking/NewMBankingTransferConfirmModal";
import NewMBankingPinInputPage from "@/components/mobile/new-mbanking/NewMBankingPinInputPage";
import NewMBankingTransferSuccessPage from "@/components/mobile/new-mbanking/NewMBankingTransferSuccessPage";

function TransferField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-[9px]">
      <label className="text-[14px] font-bold leading-none text-black">
        {label}
      </label>
      {children}
    </div>
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
}: {
  onBack: () => void;
  onDone?: () => void;
  hideBankSelection?: boolean;
}) {
  const [showBankSelection, setShowBankSelection] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [showPinInput, setShowPinInput] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [bank, setBank] = React.useState("");
  const [accountNo, setAccountNo] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");

  if (showSuccess) {
    return (
      <NewMBankingTransferSuccessPage
        recipientAccountNo={accountNo}
        nominal={amount}
        description={description}
        onDone={onDone ?? onBack}
      />
    );
  }

  if (showPinInput) {
    return (
      <NewMBankingPinInputPage
        title={hideBankSelection ? "Transfer Antar Rekening" : "Transfer Antar Bank"}
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

  const descriptionFieldClassName = cn(
    "min-h-[86px] w-full resize-none rounded-[12px] border border-[#CDD4E0] bg-white px-4 py-3",
    "text-[14px] font-normal text-black shadow-none outline-none",
    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
    "focus:border-[#479DF4]",
  );

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <NewMBankingTransferConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        recipientAccountNo={accountNo}
        description={description}
        nominal={amount}
        onContinue={() => {
          setConfirmOpen(false);
          setShowPinInput(true);
        }}
      />

      <div className="shrink-0 bg-white">
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
            Transfer ke Penerima Baru
          </h1>
        </header>

        <div className="h-px w-full bg-[#EEF0F4]" />
      </div>

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white px-6 pb-[30px] pt-[24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid gap-[20px]">
          {!hideBankSelection ? (
            <TransferField label="Nama Bank">
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

          <TransferField label="Nomor Rekening Penerima">
            <input
              value={accountNo}
              onChange={(event) => setAccountNo(event.target.value)}
              placeholder="Masukkan Nomor Rekening Penerima"
              inputMode="numeric"
              className={fieldClassName}
            />
          </TransferField>

          <TransferField label="Nominal Transfer">
            <input
              value={amount}
              onChange={(event) => setAmount(formatThousands(event.target.value))}
              placeholder="0,00"
              inputMode="numeric"
              className={fieldClassName}
            />
          </TransferField>

          <TransferField label="Deskripsi">
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Masukkan Deskripsi Transfer"
              className={descriptionFieldClassName}
            />
          </TransferField>
        </div>

        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className={cn(
            "mt-auto h-[48px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan
        </button>
      </main>
    </div>
  );
}