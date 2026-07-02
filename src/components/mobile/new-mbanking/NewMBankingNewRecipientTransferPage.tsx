import * as React from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingBankSelectionPage from "@/components/mobile/new-mbanking/NewMBankingBankSelectionPage";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

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

export default function NewMBankingNewRecipientTransferPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [showBankSelection, setShowBankSelection] = React.useState(false);
  const [bank, setBank] = React.useState("");
  const [accountNo, setAccountNo] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");

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

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
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

      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-[118px] pt-[24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid gap-[20px]">
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
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0,00"
              inputMode="decimal"
              className={fieldClassName}
            />
          </TransferField>

          <TransferField label="Deskripsi">
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="0,00"
              className={fieldClassName}
            />
          </TransferField>
        </div>
      </main>

      <div className="sticky bottom-0 shrink-0 bg-white px-6 pb-[30px] pt-4 shadow-[0_-8px_22px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          className={cn(
            "h-[48px] w-full rounded-full bg-[#479DF4]",
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